import * as creationModel from '../models/creationModel.js';
import 'dotenv/config';

import logger from '../logger.js'

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
              error_message: "Missing Parameters" || 'No error', // Ensure error_message is defined
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

/*
    gabriel note
    im just assuming we get all our values from the body. will work on this later
*/

// read

export async function readCreationByAll (req, res) {
  const { site_id } = req.body;
  try {
    const result = await creationModel.selectCreationByAll(site_id);
    res.json(result);
    
  } catch (error) {
    console.error('Error reading creation logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readCreationByDate (req, res) {
  try {
    const { site_id, date } = req.body;
    const result = await creationModel.selectCreationByDate(site_id, date);
    res.json(result);
  } catch (error) {
    console.error('Error reading creation logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readCreationByIp (req, res) {
  try {
    const { ip } = req.body;
    const result = await creationModel.selectCreationByIp(ip);
    res.json(result);
  } catch (error) {
    console.error('Error selecting creation logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readCreationByOs (req, res) {
  try {
    const { os } = req.body;
    const result = await creationModel.selectCreationByOs(os);
    res.json(result);
  } catch (error) {
    console.error('Error selecting creation logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}