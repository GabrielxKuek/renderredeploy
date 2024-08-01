import * as modificationModel from '../models/modificationModel.js';

// create

export async function createModification(req, res) {
    try {
      const { user_id, site_id, table_name, record_id, field_names, old_values } = req.body;
  
      if (!user_id || !site_id || !table_name || !record_id || !field_names || !old_values) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const result = await modificationModel.insertModification(user_id, site_id, table_name, record_id, field_names, old_values);
      res.status(200).json({ message: 'Modification logged successfully', result });
    } catch (error) {
      console.error('Error logging modification:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

// read

export async function readModificationByAll(req, res) {
  try {
    const { site_id } = req.body;
    const result = await modificationModel.selectModificationByAll(site_id);
    res.json(result);
  } catch (error) {
    console.error('Error reading modification logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readModificationByDate(req, res) {
  try {
    const { site_id, date } = req.body;
    const result = await modificationModel.selectModificationByDate(site_id, date);
    res.json(result);
  } catch (error) {
    console.error('Error reading modification logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readModificationByIp(req, res) {
  try {
    const { ip } = req.body;
    const result = await modificationModel.selectModificationByIp(ip);
    res.json(result);
  } catch (error) {
    console.error('Error selecting modification logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readModificationByOs(req, res) {
  try {
    const { os } = req.body;
    const result = await modificationModel.selectModificationByOs(os);
    res.json(result);
  } catch (error) {
    console.error('Error selecting modification logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}