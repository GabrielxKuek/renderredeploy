import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const logRequestMiddleware = async (req, res, next) => {
  // Function to log request details
  try {
    const { request_method, api_requested, user_ip, user_os } = req.logData;
    await prisma.um_request_log.create({
      data: {
        request_method: request_method || 'UNKNOWN_METHOD',
        api_requested: api_requested || 'UNKNOWN_API',
        user_ip: user_ip || 'UNKNOWN_IP',
        user_os: user_os || 'UNKNOWN_OS',
        created_at: new Date(),
        error_message: 'NO_ERROR',
        site_id: req.site_id !== undefined ? parseInt(req.site_id, 10) : null,
        user_id: req.user_id !== undefined ? parseInt(req.user_id, 10) : null
      }
    });
    next();
    console.log('Request logged to the database successfully');
  } catch (dbError) {
    console.error('Failed to log request to database:', dbError);
  }
}

export {logRequestMiddleware} ;