/*
ALL THIS DATA IS DUMMY. hardcoded outputs so we can test the front end. just change directory in routes to the correct 
controllers file to use the correct code
*/

import fakedb from './fakedb.js';

export async function createCreation(req, res) {
    try {
        // const { user_id, site_id, table_name, record_id } = req.body;

        // if (!user_id || !site_id || !table_name || !record_id) {
        //     return res.status(400).json({ error: 'Missing required fields' });
        // }

        // const result = await creationModel.insertCreation(user_id, site_id, table_name, record_id);
        // res.status(200).json({ message: 'Creation logged successfully', result });
        res.send("broken please stay on hold. beep beep boop.");
    } catch (error) {
        console.error('Error logging creation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
} // dummy create doesnt work. just wanna test displaying logs only, just change if uw work on this one

/*
    gabriel note
    im just assuming we get all our values from the body. will work on this later
*/

// read

// export async function readCreationByAll(req, res) {
//   try {
//     const site_id = 2;
//     console.log(site_id)

//     const result = fakedb.um_creation_log.filter((element) => {
//       return element.site_id == site_id;
//     })

//     res.status(200).send(result)
//   } catch (error) {
//     console.error('Error reading creation logs:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

export async function readCreationByAll(req, res) {
  try {
    // Check for the forwarded IP address
    console.log(req)
    const forwarded = req.headers['x-forwarded-for'];
    let ip;

    console.log(forwarded)
    console.log()

    if (forwarded) {
      console.log("shy ip:")
      console.log(ip)
      console.log()
      ip = forwarded.split(',')[0]; // Get the first IP in the list
    } else {
      console.log("guy ip:")
      console.log(ip)
      console.log()
      ip = req.ip === '::1' ? '127.0.0.1' : req.ip; // Fallback to req.ip
    }

    console.log(`
      ======================
      = NEW ENTRY DETECTED =
      ======================

      Local IP: ${req.ip}
      Remote IP: ${req.connection.remoteAddress}
      Forwarded IP: ${forwarded}
      Client IP: ${ip}

      ======================
    `);

    res.json({
      message: ip,
    });
  } catch (error) {
    console.error('Error reading creation logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readCreationByDate (req, res) {
  try {
    const { site_id } = req.params;
    const { date } = req.body;

    const result = fakedb.um_creation_log.filter((element) => {
      return element.site_id == site_id && element.created_at >= date;
    })

    res.status(200).send(result)
  } catch (error) {
    console.error('Error reading creation logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ignore this la because we need ot figure out ip and os

export async function readCreationByIp (req, res) {
  try {
    
  } catch (error) {
    console.error('Error selecting creation logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readCreationByOs (req, res) {
  try {
    const { site_id } = req.params;
    const { os } = req.body;

    const result = fakedb.um_creation_log.filter((element) => {
      return element.site_id == site_id && element.os == os;
    })

    res.send()
  } catch (error) {
    console.error('Error selecting creation logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}