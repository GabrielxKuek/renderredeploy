import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import mainRoutes from './routes/mainRoutes.js';
import { logRequestMiddleware } from './middlewares/logRequestMiddleware.js';

const secret = 'your_jwt_secret'; // Replace with your JWT secret

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to attach log data and extract JWT information
app.use((req, res, next) => {
  req.logData = {
    request_method: req.method,
    api_requested: req.originalUrl,
    user_ip: req.headers['x-forwarded-for'] || req.ip,
    user_os: req.get('User-Agent') || 'UNKNOWN_USER_OS',
    headers: req.headers,
    body: req.body
  };

  // Extract and decode JWT
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, secret);
      req.user_id = decoded.user_id || 'UNKNOWN_USER_ID';
      req.site_id = decoded.site_id || 'UNKNOWN_SITE_ID';
    } catch (error) {
      console.error('Invalid token:', error.message);
      req.user_id = 'UNKNOWN_USER_ID';
      req.site_id = 'UNKNOWN_SITE_ID';
    }
  }

  next();
});

// Main routes
app.use('/api', mainRoutes);

export default app;