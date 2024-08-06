
////////////////////////////////////// 1st Version //////////////////////////////////

// const express = require('express');
// const createHttpError = require('http-errors');

// const authRoute = require('./routes/auth');z
// const mainRoutes = require('./routes/mainRoutes');

// //////////////////////////
// // Task 2 Related Routers
// //////////////////////////
// const logRoute = require('./routes/logRoutes')

// const app = express();
// app.use(express.json()); // to process JSON in request body


// app.use(express.static('public'));

// app.use("/task6", mainRoutes);

// app.use('/modules', modulesRoute);
// app.use('/reports', reportsRoute);
// app.use('/students', studentsRoute);
// app.use('/staff', staffRoute);
// app.use('/auth', authRoute);

// /////////////////////////
// // Task 2 Related Routes
// /////////////////////////
// app.use('/task6/logs/:siteid', logRoute)

// app.use(function (req, res, next) {
//     return next(createHttpError(404, `Unknown Resource ${req.method} ${req.originalUrl}`));
// });

// // eslint-disable-next-line no-unused-vars
// app.use(function (err, req, res, next) {
//     return res.status(err.status || 500).json({ error: err.message || 'Unknown Server Error!' });
// });

// module.exports = app;

////////////////////////////////////// 2nd Version //////////////////////////////////

// import express from 'express'
// import logger from "./logger.js";
// import morgan from "morgan";
// import cors from 'cors';

// const app = express();
// app.use(cors());

// // Middleware to parse JSON and urlencoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Use main routes for API endpoints

// const morganFormat = ":method :url :status :remote-addr :response-time ms";


// app.use(
//   morgan(morganFormat, {
//     stream: {
//       write: (message) => {
//         const logObject = {
//           method: message.split(" ")[0],
//           url: message.split(" ")[1],
//           status: message.split(" ")[2],
//           responseTime: message.split(" ")[4],
//           ip: message.split(" ")[3]
//         };
//         logger.info(JSON.stringify(logObject));
//       },
//     },
//   })
// );

// const morganMiddleware = morgan((tokens, req, res) => {
//   const logObject = {
//     method: tokens.method(req, res),
//     url: tokens.url(req, res),
//     status: tokens.status(req, res),
//     responseTime: tokens['response-time'](req, res),
//   };

//   req.logData = logObject;

//   return null; // Prevent morgan from outputting to console directly
// });

// app.use(morganMiddleware);

////////////////////////////////////// 3rd Version //////////////////////////////////
// import express from 'express';
// import { createLogger, transports, format } from 'winston';
// import { PrismaClient } from '@prisma/client';
// import morgan from 'morgan';
// import useragent from 'useragent';
// import mainRoutes from './routes/mainRoutes.js';
// import { PrismaTransport, logger } from './logger.js'; // Import PrismaTransport as a named export



// const app = express();
// const prisma = new PrismaClient();

// // Middleware to parse JSON and URL-encoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Custom Morgan tokens
// morgan.token('user_id', (req) => req.body.user_id || req.headers['user_id']);
// morgan.token('site_id', (req) => req.body.site_id || req.headers['site_id']);
// morgan.token('user_os', (req) => req.logData?.user_os || 'unknown');
// morgan.token('user_ip', (req) => req.ip);

// // Middleware to extract OS information
// const osExtractor = (req, res, next) => {
//   const userAgentString = req.headers['user-agent'];
//   const agent = useragent.parse(userAgentString);
//   req.logData = {
//     user_os: agent.os.toString(), // Extract OS information
//   };
//   next();
// };

// // Morgan format string including the custom tokens
// const morganFormat = ':user_id :site_id :method :url :remote-addr :user_os :response-time ms';

// // Morgan middleware with custom stream to log requests
// const morganMiddleware = morgan(morganFormat, {
//   stream: {
//     write: async (message) => {
//       const [user_id, site_id, method, url, remote_addr, user_os, response_time] = message.trim().split(' ');

//       // Log to Winston
//       logger.info('Request logged', {
//         user_id,
//         site_id,
//         request_method: method,
//         api_requested: url,
//         user_ip: remote_addr,
//         user_os,
//         response_time: parseFloat(response_time),
//         error_message: null
//       });

//       try {
//         // Insert request into the database
//         await prisma.um_request_log.create({
//           data: {
//             user_id: parseInt(user_id, 10) || null,
//             site_id: parseInt(site_id, 10) || null,
//             request_method: method,
//             api_requested: url,
//             user_ip: remote_addr,
//             user_os,
//             response_time: parseFloat(response_time) || null,
//             error_message: null
//           }
//         });
//       } catch (error) {
//         // Log the error with Winston
//         logger.error('Failed to log request to database', {
//           error: {
//             message: error.message,
//             stack: error.stack,
//             code: error.code,
//             meta: error.meta
//           }
//         });

//         // Attempt to log the error to the database
//         try {
//           await prisma.um_request_log.create({
//             data: {
//               user_id: parseInt(user_id, 10) || null,
//               site_id: parseInt(site_id, 10) || null,
//               request_method: method,
//               api_requested: url,
//               user_ip: remote_addr,
//               user_os,
//               error_message: error.message
//             }
//           });
//         } catch (dbError) {
//           // If the second insertion fails, log the error with Winston
//           logger.error('Failed to log error to database', {
//             error: {
//               message: dbError.message,
//               stack: dbError.stack,
//               code: dbError.code,
//               meta: dbError.meta
//             }
//           });
//         }
//       }
//     }
//   }
// });



// function logRequest(user_id, site_id, request_method, api_requested, user_ip, user_os, error) {
//   // Prepare log info object
//   const logInfo = {
//     request_method,
//     api_requested,
//     user_ip,
//     user_os,
//     site_id,
//     user_id,
//     error_message: error ? error.message : null
//   };

//   // Log to Prisma using the Winston logger
//   logger.info('Request logged', logInfo);
// }

// // Use middleware to extract OS information
// app.use(osExtractor);

// app.use(logRequest);

// app.use(morganMiddleware);

// // Main routes
// app.use('/api', mainRoutes);

// export default app;
import express from 'express';
import { createLogger, transports, format } from 'winston';
import { PrismaClient } from '@prisma/client';
import morgan from 'morgan';
import jwt from 'jsonwebtoken';
import mainRoutes from './routes/mainRoutes.js';

const secret = 'your_jwt_secret'; // Replace with your JWT secret

const app = express();
const prisma = new PrismaClient();

// Middleware to attach log data and extract JWT information
app.use((req, res, next) => {
  req.logData = {
    request_method: req.method,
    api_requested: req.originalUrl,
    user_ip: req.ip,
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

// Function to log request details
async function logRequest(req, user_id, site_id, error) {
  try {
    const { request_method, api_requested, user_ip, user_os } = req.logData;
    await prisma.um_request_log.create({
      data: {
        request_method: request_method || 'UNKNOWN_METHOD',
        api_requested: api_requested || 'UNKNOWN_API',
        user_ip: user_ip || 'UNKNOWN_IP',
        user_os: user_os || 'UNKNOWN_OS',
        created_at: new Date(),
        error_message: error ? error.message : 'NO_ERROR',
        site_id: site_id !== undefined ? parseInt(site_id, 10) : null,
        user_id: user_id !== undefined ? parseInt(user_id, 10) : null
      }
    });
    console.log('Request logged to the database successfully');
  } catch (dbError) {
    console.error('Failed to log request to database:', dbError);
  }
}

app.use(morganMiddleware);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Main routes
app.use('/api', mainRoutes);

export { logRequest };
export default app;