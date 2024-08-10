import express from 'express';
import { createLogger, transports, format } from 'winston';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import mainRoutes from './routes/mainRoutes.js';
import cors from 'cors';
import helmet from 'helmet';

const secret = 'your_jwt_secret'; // Replace with your JWT secret

const app = express();
app.use(cors());
app.use(helmet());

// Middleware to attach log data and extract JWT information
app.use((req, res, next) => {
  req.logData = {
    request_method: req.method,
    api_requested: req.originalUrl,
    user_ip: req.headers['x-forwarded-for'],
    user_os: req.get('User-Agent')
  };

  // // Extract and decode JWT
  // const token = req.headers['authorization']?.split(' ')[1];
  // if (token) {
  //   try {
  //     const decoded = jwt.verify(token, secret);
  //     req.user_id = decoded.user_id;
  //     req.site_id = decoded.site_id;
  //   } catch (error) {
  //     console.error('Invalid token:', error);
  //   }
  // }

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
morgan.token('fullurl', (req) => {
  const domain = req.headers.host;
  const url = req.originalUrl || req.url;
  return domain ? `${domain}${url}` : url;
});

// Custom format string including the custom tokens
const morganFormat = ':user_id :site_id :method :fullurl :remote-addr :user-agent';

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

      const [user_id, site_id, method, fullurl, remote_addr, user_agent] = parts;

      // Log to Winston
      logger.info('Request logged', {
        user_id: user_id,
        site_id: site_id,
        request_method: method,
        api_requested: fullurl, // Gabriel Update
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

export default app;