/*
ALL THIS DATA IS DUMMY. hardcoded outputs so we can test the front end. just change directory in routes to the correct 
controllers file to use the correct code
*/

import fakedb from './fakedb.js';

// create

export async function createDeletion(req, res) {
    try {
      res.send("broken please stay on hold. beep beep boop.");
    } catch (error) {
        console.error('Error logging deletion:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
} // dummy create doesnt work. just wanna test displaying logs only, just change if uw work on this one

/*
    gabriel note
    im just assuming we get all our values from the body. will work on this later
*/

// read

export async function readDeletionByAll(req, res) {
  try {
    const { site_id } = req.body;

    const result = fakedb.um_deletion_log.filter((element) => {
      return element.site_id == site_id;
    })

    res.status(200).send(result);
  } catch (error) {
    console.error('Error reading deletion logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readDeletionByDate(req, res) {
  try {
    const { site_id } = req.params;
    const { date } = req.body;

    const result = fakedb.um_deletion_log.filter((element) => {
      return element.site_id == site_id && element.created_at >= date;
    })

    res.status(200).send(result);
  } catch (error) {
    console.error('Error reading deletion logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ignore this la because we need ot figure out ip and os

export async function readDeletionByIp(req, res) {
  try {
    const { ip } = req.params;
    const result = await deletionModel.selectDeletionByIp(ip);
    res.json(result);
  } catch (error) {
    console.error('Error selecting deletion logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readDeletionByOs(req, res) {
  try {
    const { os } = req.params;
    const result = await deletionModel.selectDeletionByOs(os);
    res.json(result);
  } catch (error) {
    console.error('Error selecting deletion logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
