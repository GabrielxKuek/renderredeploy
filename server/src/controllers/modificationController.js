const modificationModel = require('../models/modificationModel');

async function readModification(req, res) {
  try {
    const { site_id } = req.params;
    const result = await modificationModel.readModification(site_id);
    res.json(result);
  } catch (error) {
    console.error('Error reading modification logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readModificationByDate(req, res) {
  try {
    const { site_id, date } = req.params;
    const result = await modificationModel.readModificationByDate(site_id, date);
    res.json(result);
  } catch (error) {
    console.error('Error reading modification logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function selectModificationIp(req, res) {
  try {
    const { ip } = req.params;
    const result = await modificationModel.selectModificationIp(ip);
    res.json(result);
  } catch (error) {
    console.error('Error selecting modification logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function selectModificationOs(req, res) {
  try {
    const { os } = req.params;
    const result = await modificationModel.selectModificationOs(os);
    res.json(result);
  } catch (error) {
    console.error('Error selecting modification logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  readModification,
  readModificationByDate,
  selectModificationIp,
  selectModificationOs,
};
