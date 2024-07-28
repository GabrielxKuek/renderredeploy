/*
ALL THIS DATA IS DUMMY. hardcoded outputs so we can test the front end. just change directory in routes to the correct 
controllers file to use the correct code
*/

import { fakedb } from './fakedb.js';

// create

export async function createModification(req, res) {
  try {
    // const { user_id, site_id, table_name, record_id, field_names, old_values } = req.body;

    // if (!user_id || !site_id || !table_name || !record_id || !field_names || !old_values) {
    //   return res.status(400).json({ error: 'Missing required fields' });
    // }

    // const result = await modificationModel.insertModification(user_id, site_id, table_name, record_id, field_names, old_values);
    // res.status(200).json({ message: 'Modification logged successfully', result });
    res.send("broken please stay on hold. beep beep boop.");
  } catch (error) {
    console.error('Error logging modification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}  // dummy create doesnt work. just wanna test displaying logs only, just change if uw work on this one

// read

export async function readModificationByAll(req, res) {
  try {
    const { site_id } = req.params;
    
    const result = fakedb.modificationlogs.filter((element) => {
      return element.site_id == site_id;
    })

    res.status(200).send(result);
  } catch (error) {
    console.error('Error reading modification logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readModificationByDate(req, res) {
  try {
    const { site_id } = req.params;
    const { date } = req.body;

    const result = fakedb.modificationlogs.filter((element) => {
      return element.site_id == site_id && element.created_at >= date;
    })

    res.status(200).send(result);
  } catch (error) {
    console.error('Error reading modification logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ignore this la because we need ot figure out ip and os

export async function readModificationByIp(req, res) {
  try {
    // const { ip } = req.params;
    // const result = await modificationModel.selectModificationByIp(ip);
    // res.json(result);
    res.send("broken please stay on hold. beep beep boop.");
  } catch (error) {
    console.error('Error selecting modification logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readModificationByOs(req, res) {
  try {
    // const { os } = req.params;
    // const result = await modificationModel.selectModificationByOs(os);
    // res.json(result);
    res.send("broken please stay on hold. beep beep boop.");
  } catch (error) {
    console.error('Error selecting modification logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}