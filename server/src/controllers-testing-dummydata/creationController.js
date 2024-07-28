/*
ALL THIS DATA IS DUMMY. hardcoded outputs so we can test the front end. just change directory in routes to the correct 
controllers file to use the correct code
*/

let fake_db = {
  um_request_log: [
    {
      log_id: 1,
      user_id: 100,
      site_id: 2,
      user_ip: '2'
    }
  ],

  um_creation_log: [
    {
      log_id: 1,
      user_id: 100,
      site_id: 2,
      table_name: 'um_user',
      record_id: 3,
      created_at: '2021-08-01',
    },
    {
      log_id: 2,
      user_id: 101,
      site_id: 2,
      table_name: 'um_user',
      record_id: 4,
      created_at: '2021-08-01',
    },
    {
      log_id: 3,
      user_id: 102,
      site_id: 2,
      table_name: 'um_user',
      record_id: 5,
      created_at: '2021-08-01',
    },
  ],

  um_deletion_log: [
    {
      log_id: 1,
      user_id: 100,
      site_id: 2,
      table_name: 'um_user',
      record_id: 3,
      created_at: '2021-08-01',
    },
    {
      log_id: 2,
      user_id: 101,
      site_id: 2,
      table_name: 'um_user',
      record_id: 4,
      created_at: '2021-08-01',
    },
    {
      log_id: 3,
      user_id: 102,
      site_id: 2,
      table_name: 'um_user',
      record_id: 5,
      created_at: '2021-08-01',
    }
  ],

  um_modification_log: [
    {
      log_id: 1,
      user_id: 100,
      site_id: 2,
      table_name: 'um_user',
      record_id: 3,
      created_at: '2021-08-01',
    },
    {
      log_id: 2,
      user_id: 101,
      site_id: 2,
      table_name: 'um_user',
      record_id: 4,
      created_at: '2021-08-01',
    },
    {
      log_id: 3,
      user_id: 102,
      site_id: 2,
      table_name: 'um_user',
      record_id: 5,
      created_at: '2021-08-01',
    }
  ],

  um_deletion_log_detail: [
    {
      field_modification_id: 1,
      log_id: 1,
      field_name: 'deleteFirstField',
      old_value: "sight",
    },
    {
      field_modification_id: 2,
      log_id: 2,
      field_name: 'deleteSecondField',
      old_value: "smell",
    },
    {
      field_modification_id: 3,
      log_id: 3,
      field_name: 'deleteFirstField',
      old_value: "sound",
    }
  ],

  um_modification_log_detail: [
    {
      field_modification_id: 1,
      log_id: 1,
      field_name: 'modificationFieldOne',
      old_value: 'John Doe',
    },
    {
      field_modification_id: 2,
      log_id: 2,
      field_name: 'modificationFieldTwo',
      old_value: 'Jane Doe',
    },
    {
      field_modification_id: 3,
      log_id: 3,
      field_name: 'modificationFieldThree',
      old_value: 'Tae Kwon Do',
    }
  ]
}

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

export async function readCreationByAll(req, res) {
  try {
    // Check for the forwarded IP address
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