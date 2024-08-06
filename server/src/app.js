
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

import express from 'express';
import { createLogger, transports, format } from 'winston';
import { PrismaClient } from '@prisma/client';
import morgan from 'morgan';
import mainRoutes from './routes/mainRoutes.js';

const app = express();
const prisma = new PrismaClient();

// Logger configuration
const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' })
  ]
});

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Morgan tokens
morgan.token('user_id', (req) => req.body.user_id || req.headers['user_id']);
morgan.token('site_id', (req) => req.body.site_id || req.headers['site_id']);
morgan.token('os', (req) => req.headers['user-agent']);

// Custom format string including the custom tokens
const morganFormat = ':user_id :site_id :method :url :remote-addr :os';

// Morgan middleware with custom stream to log requests
const morganMiddleware = morgan(morganFormat, {
  stream: {
    write: async (message) => {
      const [user_id, site_id, method, url, remote_addr, user_agent] = message.trim().split(' ');

      // Log to Winston
      logger.info('Request logged', {
        user_id,
        site_id,
        request_method: method,
        api_requested: url,
        user_ip: remote_addr,
        user_os: user_agent, // Assuming user_agent contains OS info
        error_message: null
      });

      try {
        // Insert request into the database
        await prisma.umrequest_log.create({
          data: {
            user_id: parseInt(user_id, 10) || null, // Convert to integer or null if undefined
            site_id: parseInt(site_id, 10) || null,
            request_method: method,
            api_requested: url,
            user_ip: remote_addr,
            user_os: user_agent,
            error_message: null // Assuming no error message is captured here
          }
        });
      } catch (error) {
        logger.error('Failed to log request to database', { error });
      }
    }
  }
});

app.use(morganMiddleware);

// Main routes
app.use('/api', mainRoutes);

export default app;