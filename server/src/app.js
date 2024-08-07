import express from 'express';
import { createLogger, transports, format } from 'winston';
import { PrismaClient } from '@prisma/client';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import mainRoutes from './routes/mainRoutes.js';
import { logRequestMiddleware } from './middleware/logRequestMiddleware.js';
import cors from 'cors';

const secret = 'your_jwt_secret'; // Replace with your JWT secret

const app = express();
app.use(cors());
const prisma = new PrismaClient();

// Middleware to attach log data and extract JWT information
app.use((req, res, next) => {
  req.logData = {
    request_method: req.method,
    api_requested: req.originalUrl,
    user_ip: req.headers['x-forwarded-for'],
    user_os: req.get('User-Agent')
  };

  // Extract and decode JWT
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, secret);
      req.user_id = decoded.user_id;
      req.site_id = decoded.site_id;
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  next();
});

// Logger configuration
const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' })
  ]
});

// Custom Morgan tokens
morgan.token('user_id', (req) => req.user_id || 'UNKNOWN_USER_ID');
morgan.token('site_id', (req) => req.site_id || 'UNKNOWN_SITE_ID');
morgan.token('os', (req) => req.get('User-Agent') || 'UNKNOWN_OS');

morgan.token('remote-addr', (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  let ip = forwardedFor ? forwardedFor.split(',')[0].trim() : req.ip;
  if (ip === '::1') {
    ip = 'UNKNOWN_IP';
  }
  return ip;
});

// Custom format string including the custom tokens
const morganFormat = ':user_id :site_id :method :url :remote-addr :os';

// Morgan middleware with custom stream to log requests
const morganMiddleware = morgan(morganFormat, {
  stream: {
    write: async (message) => {
      const parts = message.trim().split(' ');

      // Ensure the parts array has the expected number of elements
      if (parts.length < 6) {
        console.error('Malformed log message:', message);
        return;
      }

      const [user_id, site_id, method, url, remote_addr, user_agent] = parts;

      // Log to Winston
      logger.info('Request logged', {
        user_id,
        site_id,
        request_method: method,
        api_requested: url,
        user_ip: remote_addr,
        user_os: user_agent
      });
    }
  }
});

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the Morgan middleware before your routes
app.use(morganMiddleware);

// Main routes
app.use('/api', mainRoutes);

app.use(logRequestMiddleware);

// Function to log request details
export async function logRequest(req, res, next, error) {
  try {
    const { request_method, api_requested, user_ip, user_os } = req.logData;
    const domain = req.headers.host;
    const fullApiRequested = domain ? `${domain}${api_requested}` : api_requested;

    await prisma.um_request_log.create({
      data: {
        request_method: request_method || 'UNKNOWN_METHOD',
        api_requested: fullApiRequested || 'UNKNOWN_API',
        user_ip: user_ip || 'UNKNOWN_IP',
        user_os: user_os || 'UNKNOWN_OS',
        created_at: new Date(),
        error_message: error ? error.message : 'NO_ERROR',
        site_id: req.site_id !== undefined ? parseInt(req.site_id, 10) : null,
        user_id: req.user_id !== undefined ? parseInt(req.user_id, 10) : null
      }
    });
    console.log('Request logged to the database successfully');
  } catch (dbError) {
    console.error('Failed to log request to database:', dbError);
  }
}

export default app;