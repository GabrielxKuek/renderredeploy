const creationModel = require('../models/creationModel');

async function readCreation(req, res) {
  try {
    const { site_id } = req.params;
    const result = await creationModel.readCreation(site_id);
    res.json(result);
  } catch (error) {
    console.error('Error reading creation logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readCreationByDate(req, res) {
  try {
    const { site_id, date } = req.params;
    const result = await creationModel.readCreationByDate(site_id, date);
    res.json(result);
  } catch (error) {
    console.error('Error reading creation logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function selectCreationIp(req, res) {
  try {
    const { ip } = req.params;
    const result = await creationModel.selectCreationIp(ip);
    res.json(result);
  } catch (error) {
    console.error('Error selecting creation logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function selectCreationOs(req, res) {
  try {
    const { os } = req.params;
    const result = await creationModel.selectCreationOs(os);
    res.json(result);
  } catch (error) {
    console.error('Error selecting creation logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  readCreation,
  readCreationByDate,
  selectCreationIp,
  selectCreationOs,
};
