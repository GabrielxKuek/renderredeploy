import * as deletionModel from '../models/deletionModel.js';

// create

export async function createDeletion(req, res) {
    try {
        const { user_id, site_id, table_name, record_id, field_name, values } = req.body;

        if (!user_id || !site_id || !table_name || !record_id || !field_name || !values) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await deletionModel.insertDeletion(user_id, site_id, table_name, record_id, field_name, values);
        res.status(200).json({ message: 'Deletion logged successfully', result });
    } catch (error) {
        console.error('Error logging deletion:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// read

export async function readDeletionByAll(req, res) {
  try {
    const site_id = res.locals.site_id;
  //  const site_id = 1;

    const result = await deletionModel.selectDeletionByAll(site_id);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.json(sanitizedResult);
  } catch (error) {
    console.error('Error reading deletion logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readDeletionByDate(req, res) {
  try {
    const site_id = res.locals.site_id;
   //const site_id = 1;
    const { date } = req.body;

    date = validator.escape(date);

    const result = await deletionModel.selectDeletionByDate(site_id, date);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.json(sanitizedResult);
  } catch (error) {
    console.error('Error reading deletion logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ========================
// deprecated
// ========================

// export async function readDeletionByIp(req, res) {
//   try {
//     const { ip } = req.body;
//     const result = await deletionModel.selectDeletionByIp(ip);
        
//     const sanitizedResult = result.map(log => {
//         return {
//             ...log,
//             fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
//         };
//     }); 
//     res.json(sanitizedResult);
//   } catch (error) {
//     console.error('Error selecting deletion logs by IP:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// export async function readDeletionByOs(req, res) {
//   try {
//     const { os } = req.body;
//     const result = await deletionModel.selectDeletionByOs(os);
        
//     const sanitizedResult = result.map(log => {
//         return {
//             ...log,
//             fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
//         };
//     }); 
//     res.json(sanitizedResult);
//   } catch (error) {
//     console.error('Error selecting deletion logs by OS:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }
