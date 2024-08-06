// import { createLogger, format, transports } from "winston";
// const { combine, timestamp, json, colorize } = format;

// Custom format for console logging with colors


// // Create a Winston logger
// const logger = createLogger({
//   level: "info",
//   format: combine(colorize(), timestamp(), json()),
//   transports: [
//     new transports.Console({
//       format: consoleLogFormat,
//     }),
//     new transports.File({ filename: "app.log" }),
//   ],
// });


// export default logger;

// const winston = require('winston');
// const { combine, timestamp, json } = winston.format;

// const logger = winston.createLogger({
//     level: 'info', // Set minimum log level (info, debug, etc.)
//     format: combine(timestamp(), json()), // Combine timestamp and JSON format
//     transports: [
//         new winston.transports.Console({ // Log to console
//             format: winston.format.combine(
//                 winston.format.colorize({ all: true }), // Colorize console logs
//                 winston.format.simple() // Simplified console output format
//             )
//         }),
//         new winston.transports.File({ // Log to file (optional)
//             filename: 'api.log', // Customize filename
//             level: 'error' // Write only errors to the file (optional)
//         })
//     ]
// });

////////////////////////////////////// PostGres Version //////////////////////////////////

// const { createLogger, format, transports } = require('winston');

// class PostgreSQLTransport extends transports.Stream {
//     log(info, callback) {
//         setImmediate(() => this.emit('logged', info));

//         const query = `
//             INSERT INTO request_log (user_id, site_id, request_method, api_requested, user_ip, user_os, created_at, error_message)
//             VALUES ($1, $2, $3, $4, $5, $6, NOW(), $7)
//         `;
//         const values = [
//             info.user_id,
//             info.site_id,
//             info.request_method,
//             info.api_requested,
//             info.user_ip,
//             info.user_os,
//             info.error_message,
//         ];

//         client.query(query, values, (err, res) => {
//             if (err) {
//                 console.error('Error saving log to PostgreSQL', err);
//             }
//             callback();
//         });
//     }
// }

// const logger = createLogger({
//     format: format.json(),
//     transports: [
//         new PostgreSQLTransport()
//     ]
// });

// const { createLogger, format, transports } = require('winston');
import winston from 'winston'
import { createLogger, transports, format } from 'winston';

const { combine, timestamp, json, errors } = winston.format;
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PrismaTransport extends transports.Stream {
  constructor(options) {
    super(options);
    this.stream = options.stream;
  }

  log(info, callback) {
    // Ensure the necessary fields are present
    const {
      message,
      request_method = 'UNKNOWN_METHOD',
      api_requested = 'UNKNOWN_API',
      user_ip = 'UNKNOWN_IP',
      user_os = 'UNKNOWN_OS',
      error_message = 'NO_ERROR',
      site_id = null,
      user_id = null
    } = info;

    setImmediate(() => this.emit('logged', info));

    // Use Prisma to insert log data into the database
    prisma.um_request_log.create({
      data: {
        request_method,
        api_requested,
        user_ip,
        user_os,
        created_at: new Date(),
        error_message: error_message ? JSON.stringify({ name: error_message.name, message: error_message.message }) : null,
        site_id: site_id !== undefined ? parseInt(site_id, 10) : null,
        user_id: user_id !== undefined ? parseInt(user_id, 10) : null
      }
    }).catch((error) => {
      console.error('Failed to log request to database:', error);
    });

    callback();
  }
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new PrismaTransport({ stream: process.stdout }) // Configure PrismaTransport
  ]
});


// const logger = createLogger({
//   level: 'info',
//   format: format.json(),
//   transports: [
//     new transports.Console(),
//     new transports.File({ filename: 'combined.log' })
//   ]
// });

// const logRequest = async (method, url, status) => {
//   try {
//     await prisma.request.create({
//       data: { method, url, status },
//     });
//   } catch (error) {
//     logger.error('Failed to log request to database:', error);
//   }
// };



export default logger;