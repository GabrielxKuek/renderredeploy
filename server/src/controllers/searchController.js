import * as searchModel from '../models/searchModel.js';
import 'dotenv/config';
import validator from 'validator';

// Search logs for creation
export async function searchLogsCreate(req, res) {
    const { searchValue } = req.query; // Use req.query for GET request
       const site_id = res.locals.site_id;
    //const site_id = 1;
    console.log(site_id);
    console.log(searchValue);

    searchValue = validator.escape(searchValue);
    
    try {
        const cleanedSearchValue = validator.trim(searchValue);
        const result = await searchModel.searchCreationLogs(cleanedSearchValue, site_id);
        const sanitizedResult = result.map(log => {
            return {
                ...log,
                fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
            };
        }); 
        res.json(sanitizedResult);
    } catch (error) {
      console.log('Error searching creation logs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}
  
// Search logs for modification
export async function searchLogsModification(req, res) {
    const { searchValue } = req.query; // Use req.query for GET request
       const site_id = res.locals.site_id;
    //const site_id = 1;
    console.log(searchValue);

    searchValue = validator.escape(searchValue);
    
    try {
        const cleanedSearchValue = validator.trim(searchValue);
        const result = await searchModel.searchModificationLogs(cleanedSearchValue, site_id);
        const sanitizedResult = result.map(log => ({
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        }));
        res.json(sanitizedResult);
    } catch (error) {
        console.log('Error searching modification logs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Search logs for deletion
export async function searchLogsDelete(req, res) {
    const { searchValue } = req.query; // Use req.query for GET request
       const site_id = res.locals.site_id;
    //const site_id = 1;
    console.log(site_id);
    console.log(searchValue);

    searchValue = validator.escape(searchValue);

    try {
        const cleanedSearchValue = validator.trim(searchValue);
        const result = await searchModel.searchDeletionLogs(cleanedSearchValue, site_id);
        const sanitizedResult = result.map(log => ({
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        }));

        res.json(sanitizedResult);
    } catch (error) {
        console.log('Error searching deletion logs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Search request logs
export async function searchLogsRequest(req, res) {
    const { searchValue } = req.query; // Use req.query for GET request
       const site_id = res.locals.site_id;
    //const site_id = 1;
    console.log(site_id);
    console.log(searchValue);

    searchValue = validator.escape(searchValue);

    try {
        const cleanedSearchValue = validator.trim(searchValue);
        const result = await searchModel.searchRequestLogs(cleanedSearchValue, site_id);
        const sanitizedResult = result.map(log => ({
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        }));
        res.json(sanitizedResult);
    } catch (error) {
        console.log('Error searching deletion logs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// ======================
// poop
// ======================

// Controller to handle creation logs
export const getCreationLogs = async (req, res) => {
  try {
       const site_id = res.locals.site_id;
    //const site_id = 1;
    let { searchValue, selectedSearchOption } = req.query;
    searchValue = searchValue.trim();
    selectedSearchOption = selectedSearchOption.trim();

    if (!searchValue || !selectedSearchOption) {
        throw new Error('Missing search parameters');
    }

    searchValue = validator.escape(searchValue);
    selectedSearchOption = validator.escape(selectedSearchOption);

    const logs = await searchModel.queryCreationLogs(searchValue, site_id, selectedSearchOption);
    const sanitizedResult = logs.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error fetching creation logs:', error);
    res.status(500).json({ error: 'Failed to fetch creation logs' });
  }
};

// Controller to handle modification logs
export const getModificationLogs = async (req, res) => {
  try {
       const site_id = res.locals.site_id;
    //const site_id = 1;
    let { searchValue, selectedSearchOption } = req.query;
    searchValue = searchValue.trim();
    selectedSearchOption = selectedSearchOption.trim();

    if (!searchValue || !selectedSearchOption) {
        throw new Error('Missing search parameters');
    }

    searchValue = validator.escape(searchValue);
    selectedSearchOption = validator.escape(selectedSearchOption);

    const logs = await searchModel.queryModificationLogs(searchValue, site_id, selectedSearchOption);
    const sanitizedResult = logs.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error fetching modification logs:', error);
    res.status(500).json({ error: 'Failed to fetch modification logs' });
  }
};

// Controller to handle deletion logs
export const getDeletionLogs = async (req, res) => {
  try {
       const site_id = res.locals.site_id;
    //const site_id = 1;
    let { searchValue, selectedSearchOption } = req.query;
    searchValue = searchValue.trim();
    selectedSearchOption = selectedSearchOption.trim();

    if (!searchValue || !selectedSearchOption) {
        throw new Error('Missing search parameters');
    }

    searchValue = validator.escape(searchValue);
    selectedSearchOption = validator.escape(selectedSearchOption);

    const logs = await searchModel.queryDeletionLogs(searchValue, site_id, selectedSearchOption);    
    const sanitizedResult = logs.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error fetching deletion logs:', error);
    res.status(500).json({ error: 'Failed to fetch deletion logs' });
  }
};

// Controller to handle request logs
export const getRequestLogs = async (req, res) => {
    try {
        const site_id = res.locals.site_id;
        // const site_id = 1;
        let { searchValue, selectedSearchOption, selectedMethod } = req.query;
        searchValue = searchValue.trim();
        selectedSearchOption = selectedSearchOption.trim();
        selectedMethod = selectedMethod ? selectedMethod.trim() : null;

        if (!searchValue || !selectedSearchOption || !selectedMethod) {
            throw new Error('Missing search parameters');
        }

        let logs;
        
        if (selectedMethod) {
            logs = await searchModel.queryRequestLogs(searchValue, site_id, selectedSearchOption, selectedMethod);
        } else {
            throw new Error('Invalid search method provided.');
        }

        const sanitizedResult = logs.map(log => {
            return {
                ...log,
                fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
            };
        });

        res.status(200).json(sanitizedResult);
    } catch (error) {
        console.error('Error fetching request logs:', error);
        res.status(500).json({ error: 'Failed to fetch request logs' });
    }
};