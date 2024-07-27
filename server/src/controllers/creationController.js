import * as creationModel from '../models/creationModel.js';

// create

export async function createCreation(req, res) {
    try {
        const { user_id, site_id, table_name, record_id } = req.body;

        if (!user_id || !site_id || !table_name || !record_id) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await creationModel.insertCreation(user_id, site_id, table_name, record_id);
        res.status(200).json({ message: 'Creation logged successfully', result });
    } catch (error) {
        console.error('Error logging creation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/*
    gabriel note
    im just assuming we get all our values from the body. will work on this later
*/

// read

export async function readCreationByAll (req, res) {
  try {
    const { site_id } = req.params;
    const result = await creationModel.selectCreationByAll(site_id);
    res.json(result);
  } catch (error) {
    console.error('Error reading creation logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readCreationByDate (req, res) {
  try {
    const { site_id, date } = req.params;
    const result = await creationModel.selectCreationByDate(site_id, date);
    res.json(result);
  } catch (error) {
    console.error('Error reading creation logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readCreationByIp (req, res) {
  try {
    const { ip } = req.params;
    const result = await creationModel.selectCreationByIp(ip);
    res.json(result);
  } catch (error) {
    console.error('Error selecting creation logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readCreationByOs (req, res) {
  try {
    const { os } = req.params;
    const result = await creationModel.selectCreationByOs(os);
    res.json(result);
  } catch (error) {
    console.error('Error selecting creation logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}