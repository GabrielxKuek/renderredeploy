import * as searchModel from '../models/searchModel.js';
import 'dotenv/config';

import validator from 'validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// Search logs for creation
export async function searchLogsCreate(req, res) {
    const { searchValue } = req.query; // Use req.query for GET request
    const { site_id } = res.locals.site_id;
    const sanitizedValue = validator.escape(searchValue);
    console.log(site_id);
    console.log(sanitizedValue);
    try {
      const result = await searchModel.searchCreationLogs(sanitizedValue, site_id);
      res.json(result);
    } catch (error) {
      console.log('Error searching creation logs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}
  
// Search logs for modification
export async function searchLogsModification(req, res) {
    const { searchValue } = req.query; // Use req.query for GET request
    const { site_id } = res.locals.site_id;
    const sanitizedValue = validator.escape(searchValue)
    console.log(sanitizedValue);
    try {
        const result = await searchModel.searchModificationLogs(sanitizedValue, site_id);
        res.json(result);
    } catch (error) {
        console.log('Error searching modification logs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Search logs for deletion
export async function searchLogsDelete(req, res) {
    const { searchValue } = req.query; // Use req.query for GET request
    const { site_id } = res.locals.site_id;
    const sanitizedValue = validator.escape(searchValue)
    console.log(site_id);
    console.log(sanitizedValue);
    try {
        const result = await searchModel.searchDeletionLogs(sanitizedValue, site_id);
        res.json(result);
    } catch (error) {
        console.log('Error searching deletion logs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Search request logs
export async function searchLogsRequest(req, res) {
    const { searchValue } = req.query; // Use req.query for GET request
    const { site_id } = res.locals.site_id;
    const sanitizedValue = validator.escape(searchValue)
    console.log(site_id);
    console.log(sanitizedValue);
    try {
        const result = await searchModel.searchRequestLogs(sanitizedValue, site_id);
        res.json(result);
    } catch (error) {
        console.log('Error searching deletion logs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}