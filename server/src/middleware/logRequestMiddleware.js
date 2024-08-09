import { logRequest } from '../app.js';

const logRequestMiddleware = async (req, res, next) => {
    try {
      await logRequest(req, null); // Pass null for error if no error occurred
    } catch (error) {
      console.error('Failed to log request to database:', error.message);
      logger.error('Failed to log request to database', { error });
    }
    next();
  };

export { logRequestMiddleware };