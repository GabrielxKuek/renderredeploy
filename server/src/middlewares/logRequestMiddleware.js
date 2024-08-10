import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const logRequestMiddleware = async (req, res, next) => {
    try {
        // Safely access the properties from req.logData
        const {
            request_method = 'UNKNOWN_METHOD',
            api_requested = 'UNKNOWN_URL',
            user_ip = 'UNKNOWN_IP',
            user_os = 'UNKNOWN_USER_OS',
            headers = {},
            body = {}
        } = req.logData || {};

        const { user_id, site_id } = req;

        await prisma.um_request_log.create({
            data: {
                request_method,
                api_requested,
                user_ip,
                user_os,
                created_at: new Date(),
                error_message: 'NO_ERROR', // Include any error message if present
                site_id: site_id !== undefined ? parseInt(site_id, 10) : null,
                user_id: user_id !== undefined ? parseInt(user_id, 10) : null,
                headers: JSON.stringify(headers),  // Store headers as a separate column
                body: JSON.stringify(body)         // Store body as a separate column
            }
        });

        console.log('Request logged to the database successfully');
    } catch (dbError) {
        console.error('Failed to log request to database:', dbError);
    }

    next();
};

export { logRequestMiddleware };
