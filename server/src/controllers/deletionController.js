const deletionModel = require('../models/deletionModel');

async function readDeletion(req, res) {
  try {
    const { site_id } = req.params;
    const result = await deletionModel.readDeletion(site_id);
    res.json(result);
  } catch (error) {
    console.error('Error reading deletion logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function selectDeletionByDate(req, res) {
  try {
    const { site_id, date } = req.params;
    const result = await deletionModel.selectDeletionByDate(site_id, date);
    res.json(result);
  } catch (error) {
    console.error('Error reading deletion logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function selectDeletionIp(req, res) {
  try {
    const { ip } = req.params;
    const result = await deletionModel.selectDeletionIp(ip);
    res.json(result);
  } catch (error) {
    console.error('Error selecting deletion logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function selectDeletionOs(req, res) {
  try {
    const { os } = req.params;
    const result = await deletionModel.selectDeletionOs(os);
    res.json(result);
  } catch (error) {
    console.error('Error selecting deletion logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  readDeletion,
  selectDeletionByDate,
  selectDeletionIp,
  selectDeletionOs,
};
