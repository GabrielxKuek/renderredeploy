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

import express from 'express'
import logger from "./logger.js";
import morgan from "morgan";
import cors from 'cors';

import mainRoutes from './routes/mainRoutes.js';

const app = express();
app.use(cors());

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use main routes for API endpoints
app.use('/api', mainRoutes);

const morganFormat = ":method :url :status :remote-addr :response-time ms";


app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[4],
          ip: message.split(" ")[3]
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

const morganMiddleware = morgan((tokens, req, res) => {
  const logObject = {
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    responseTime: tokens['response-time'](req, res),
  };

  req.logData = logObject;

  return null; // Prevent morgan from outputting to console directly
});

app.use(morganMiddleware);

export default app;