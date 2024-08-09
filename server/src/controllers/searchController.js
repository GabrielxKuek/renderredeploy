import * as searchModel from '../models/searchModel.js';
import 'dotenv/config';

import validator from 'validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


// Search logs for creation
export async function searchLogsCreate(req, res) {
    const { searchValue } = req.query; // Use req.query for GET request
    const sanitizedValue = validator.escape(searchValue)
    try {
      const result = await searchModel.searchCreationLogs(sanitizedValue);
      res.json(result);
    } catch (error) {
      console.error('Error searching creation logs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}
  
// Search logs for modification
export async function searchLogsModification(req, res) {
    const { searchValue } = req.query; // Use req.query for GET request
    const sanitizedValue = validator.escape(searchValue)
    try {
        const result = await searchModel.searchModificationLogs(sanitizedValue);
        res.json(result);
    } catch (error) {
        console.error('Error searching modification logs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Search logs for deletion
export async function searchLogsDelete(req, res) {
    const { searchValue } = req.query; // Use req.query for GET request
    const sanitizedValue = validator.escape(searchValue)
    try {
        const result = await searchModel.searchDeletionLogs(sanitizedValue);
        res.json(result);
    } catch (error) {
        console.error('Error searching deletion logs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}