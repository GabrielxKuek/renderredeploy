import * as creationModel from '../models/creationModel.js';
import 'dotenv/config';

import logger from '../logger.js'
import validator from 'validator';

// create 

export async function createCreation(req, res, next) {
  const { user_id, site_id, table_name, record_id } = req.body;
    try {
        if (!user_id || !site_id || !table_name || !record_id) {
            logger.info('Request logged', {
              request_method: req.method,
              api_requested: req.originalUrl,
              body: req.body,
              headers: req.headers,
              user_ip: req.headers['x-forwarded-for'] || req.ip,
              user_os: req.headers['user-agent'] || 'UNKNOWN_USER_OS', // Provide a fallback value if undefined
              error_message: "Missing Parameters", // Ensure error_message is defined
              site_id: req.site_id !== undefined ? parseInt(req.site_id, 10) : null,
              user_id: req.user_id !== undefined ? parseInt(req.user_id, 10) : null,
          });
            return res.status(400).json({ error: 'Missing required fields' });

        }

        const result = await creationModel.insertCreation(user_id, site_id, table_name, record_id);
        res.status(200).json({ message: 'Creation logged successfully', result });
        next();
      } catch (error) {

        logger.info('Request logged', {
          request_method: req.method,
          api_requested: req.originalUrl,
          body: req.body,
          headers: req.headers,
          user_ip: req.headers['x-forwarded-for'] || req.ip,
          user_os: req.headers['user-agent'] || 'UNKNOWN_USER_OS', // Provide a fallback value if undefined
          error_message: error || 'No error', // Ensure error_message is defined
          site_id: req.site_id !== undefined ? parseInt(req.site_id, 10) : null,
          user_id: req.user_id !== undefined ? parseInt(req.user_id, 10) : null,
      });
        
        res.status(500).json({ error: 'Internal server error' });
    }
}

// read

export async function readCreationByAll (req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;

    const result = await creationModel.selectCreationByAll(site_id);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.json(sanitizedResult);
    
  } catch (error) {
    console.error('Error reading creation logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readCreationByDate (req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;
    const { date } = req.body;

    date = validator.escape(date);

    const result = await creationModel.selectCreationByDate(site_id, date);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.json(sanitizedResult);
  } catch (error) {
    console.error('Error reading creation logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ========================
// deprecated
// ========================

// export async function readCreationByIp (req, res) {
//   try {
//     const { ip } = req.body;
//     const result = await creationModel.selectCreationByIp(ip);
        
//     const sanitizedResult = result.map(log => {
//         return {
//             ...log,
//             fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
//         };
//     }); 
//     res.json(sanitizedResult);
//   } catch (error) {
//     console.error('Error selecting creation logs by IP:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// export async function readCreationByOs (req, res) {
//   try {
//     const { os } = req.body;
//     const result = await creationModel.selectCreationByOs(os);
        
//     const sanitizedResult = result.map(log => {
//         return {
//             ...log,
//             fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
//         };
//     }); 
//     res.json(sanitizedResult);
//   } catch (error) {
//     console.error('Error selecting creation logs by OS:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

