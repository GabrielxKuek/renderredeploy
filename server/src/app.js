// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import jwt from 'jsonwebtoken';
// import mainRoutes from './routes/mainRoutes.js';

// const secret = 'your_jwt_secret'; // Replace with your JWT secret

// const app = express();
// app.use(cors());
// app.use(helmet());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Middleware to attach log data and extract JWT information
// app.use((req, res, next) => {
//   req.logData = {
//     request_method: req.method,
//     api_requested: req.originalUrl,
//     user_ip: req.headers['x-forwarded-for'] || req.ip,
//     user_os: req.get('User-Agent') || 'UNKNOWN_USER_OS',
//     headers: req.headers,
//     body: req.body
//   };

//   // Extract and decode JWT
//   const token = req.headers['authorization']?.split(' ')[1];
//   if (token) {
//     try {
//       const decoded = jwt.verify(token, secret);
//       req.user_id = decoded.user_id || 'UNKNOWN_USER_ID';
//       req.site_id = decoded.site_id || 'UNKNOWN_SITE_ID';
//     } catch (error) {
//       console.error('Invalid token:', error.message);
//       req.user_id = 'UNKNOWN_USER_ID';
//       req.site_id = 'UNKNOWN_SITE_ID';
//     }
//   }

//   next();
// });

// // Main routes
// app.use('/api', mainRoutes);

// export default app;

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import path from 'path'; 
import { fileURLToPath } from 'url';
import mainRoutes from './routes/mainRoutes.js';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// app.use(cors()); 

app.use(express.static(path.join(__dirname, 'public'), {
  dotfiles: 'deny',
  index: false,
  extensions: ['html', 'htm']
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2000 // limit each IP to 2000 requests per windowMs
});
app.use(limiter);

// =========testing==========
const corsOptions = {
  origin: [
    process.env.LOCAL_FRONTEND_URL,
    process.env.RENDER_FRONTEND_URL,
    process.env.CUSTOM_DOMAN_FRONTEND_URL,
    "http://localhost:8081",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "site-api-key",
    "Set-Cookie",
    'X-Requested-With'
  ],
  credentials: true,
  maxAge: 600,
  optionsSuccessStatus: 204 // Some legacy browsers choke on 204
  };

app.use(cors(corsOptions));
// ==========================
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');

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