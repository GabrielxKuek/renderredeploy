
import winston from 'winston'
import { createLogger, transports, format } from 'winston';
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

export default logger;