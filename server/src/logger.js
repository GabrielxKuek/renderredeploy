import winston from 'winston';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PrismaTransport extends winston.transports.Stream {
  constructor(options) {
    super(options);
  }

  log(info, callback) {
    const {
      request_method = 'UNKNOWN_METHOD',
      api_requested = 'UNKNOWN_URL',
      user_ip = 'UNKNOWN_IP',
      user_os = 'UNKNOWN_OS',
      headers = {},
      body = {},
      error_message,
      site_id = null,
      user_id = null
    } = info;

    setImmediate(() => this.emit('logged', info));

    let errorData = null;
    if (error_message && typeof error_message === 'object') {
      errorData = JSON.stringify({
        name: error_message.name || 'UNKNOWN_ERROR_NAME',
        message: error_message.message || 'UNKNOWN_ERROR_MESSAGE'
      });
    } else if (error_message) {
      errorData = JSON.stringify({ message: error_message });
    }

    // Use Prisma to insert log data into the database
    prisma.um_request_log.create({
      data: {
        request_method,
        api_requested,
        headers: JSON.stringify(headers), // Store headers as a JSON string
        body: JSON.stringify(body), // Store body as a JSON string
        user_ip,
        user_os,
        created_at: new Date(),
        error_message: errorData,
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
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new PrismaTransport({ stream: process.stdout }) // Configure PrismaTransport
  ]
});

export default logger;