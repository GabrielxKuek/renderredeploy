import * as modificationModel from '../models/modificationModel.js';

// create - deprecated

// export async function createModification(req, res) {
//     try {
//       const { user_id, site_id, table_name, record_id, field_names, old_values } = req.body;
  
//       if (!user_id || !site_id || !table_name || !record_id || !field_names || !old_values) {
//         return res.status(400).json({ error: 'Missing required fields' });
//       }
  
//       const result = await modificationModel.insertModification(user_id, site_id, table_name, record_id, field_names, old_values);
//       res.status(200).json({ message: 'Modification logged successfully', result });
//     } catch (error) {
//       console.error('Error logging modification:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   }

// read

export async function readModificationByAll(req, res) {
  try {
    const site_id = res.locals.site_id;
//    const site_id = 1;

    const result = await modificationModel.selectModificationByAll(site_id);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.json(sanitizedResult);
  } catch (error) {
    console.error('Error reading modification logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readModificationByDate(req, res) {
  try {
    const site_id = res.locals.site_id;
//    const site_id = 1;
    const { date } = req.body;
    const result = await modificationModel.selectModificationByDate(site_id, date);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.json(sanitizedResult);
  } catch (error) {
    console.error('Error reading modification logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ========================
// deprecated
// ========================

// export async function readModificationByIp(req, res) {
//   try {
//     const { ip } = req.body;
//     const result = await modificationModel.selectModificationByIp(ip);
        
//     const sanitizedResult = result.map(log => {
//         return {
//             ...log,
//             fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
//         };
//     }); 
//     res.json(sanitizedResult);
//   } catch (error) {
//     console.error('Error selecting modification logs by IP:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// export async function readModificationByOs(req, res) {
//   try {
//     const { os } = req.body;
//     const result = await modificationModel.selectModificationByOs(os);
        
//     const sanitizedResult = result.map(log => {
//         return {
//             ...log,
//             fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
//         };
//     }); 
//     res.json(sanitizedResult);
//   } catch (error) {
//     console.error('Error selecting modification logs by OS:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }