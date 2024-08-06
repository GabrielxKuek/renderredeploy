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


import { createLogger, transports, format } from 'winston';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PrismaTransport extends transports.Stream {
  constructor(options) {
    super(options);
    this.stream = options.stream;
  }

  log(info, callback) {
    setImmediate(() => this.emit('logged', info));

    prisma.request.create({
      data: {
        level: info.level,
        message: info.message,
        timestamp: new Date(),
      }
    }).catch((error) => {
      console.error('Failed to log request to database:', error);
    });

    callback();
  }
}

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new PrismaTransport({
      stream: process.stdout,
    }),
    new transports.Console(),
    new transports.File({ filename: 'combined.log' }),
  ],
});

// const logger = createLogger({
//   level: 'info',
//   format: format.json(),
//   transports: [
//     new transports.Console(),
//     new transports.File({ filename: 'combined.log' })
//   ]
// });

const logRequest = async (method, url, status) => {
  try {
    await prisma.request.create({
      data: { method, url, status },
    });
  } catch (error) {
    logger.error('Failed to log request to database:', error);
  }
};


export { logger, logRequest };
export default logger;