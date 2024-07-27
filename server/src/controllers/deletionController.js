const deletionModel = require('../models/deletionModel');

// create

async function createDeletion(req, res) {
    try {
        const { user_id, site_id, table_name, record_id, field_names, values } = req.body;

        if (!user_id || !site_id || !table_name || !record_id || !field_names || !values) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const result = await deletionModel.insertDeletion(user_id, site_id, table_name, record_id, field_names, values);
        res.status(200).json({ message: 'Deletion logged successfully', result });
    } catch (error) {
        console.error('Error logging deletion:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/*
    gabriel note
    im just assuming we get all our values from the body. will work on this later
*/

// read

async function readDeletionByAll(req, res) {
  try {
    const { site_id } = req.params;
    const result = await deletionModel.selectDeletionByAll(site_id);
    res.json(result);
  } catch (error) {
    console.error('Error reading deletion logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readDeletionByDate(req, res) {
  try {
    const { site_id, date } = req.params;
    const result = await deletionModel.selectDeletionByDate(site_id, date);
    res.json(result);
  } catch (error) {
    console.error('Error reading deletion logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readDeletionByIp(req, res) {
  try {
    const { ip } = req.params;
    const result = await deletionModel.selectDeletionByIp(ip);
    res.json(result);
  } catch (error) {
    console.error('Error selecting deletion logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readDeletionByOs(req, res) {
  try {
    const { os } = req.params;
    const result = await deletionModel.selectDeletionByOs(os);
    res.json(result);
  } catch (error) {
    console.error('Error selecting deletion logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export {
    createDeletion,
    readDeletionByAll,
    readDeletionByDate,
    readDeletionByIp,
    readDeletionByOs,
};
