const requestModel = require('../models/requestModel');

// create

async function createRequest(req, res) {
  try {
    const { user_id, site_id, request_method, api_requested, user_ip, user_os, request_success } = req.body;

    if (!user_id || !site_id || !request_method || !api_requested || !user_ip || !user_os || request_success === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await requestModel.insertRequest(user_id, site_id, request_method, api_requested, user_ip, user_os, request_success);
    res.status(200).json({ message: 'Request logged successfully', result });
  } catch (error) {
    console.error('Error logging request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// read

async function readAll(req, res) {
  try {
    const { site_id } = req.body;

    if (!site_id) {
      return res.status(400).json({ error: 'Missing site_id' });
    }

    const result = await requestModel.selectAll(site_id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting all logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readAllByDate(req, res) {
  try {
    const { site_id, date } = req.body;

    if (!site_id || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await requestModel.selectAllByDate(site_id, date);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readCreationByDate(req, res) {
  try {
    const { site_id, date } = req.body;

    if (!site_id || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await requestModel.selectCreationByDate(site_id, date);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting creation logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readModificationByDate(req, res) {
  try {
    const { site_id, date } = req.body;

    if (!site_id || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await requestModel.selectModificationByDate(site_id, date);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting modification logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readDeletionByDate(req, res) {
  try {
    const { site_id, date } = req.body;

    if (!site_id || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await requestModel.selectDeletionByDate(site_id, date);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting deletion logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readAllByIp(req, res) {
  try {
    const { ip } = req.body;

    if (!ip) {
      return res.status(400).json({ error: 'Missing IP address' });
    }

    const result = await requestModel.selectAllByIp(ip);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readCreationByIp(req, res) {
  try {
    const { ip } = req.body;

    if (!ip) {
      return res.status(400).json({ error: 'Missing IP address' });
    }

    const result = await requestModel.selectCreationByIp(ip);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting creation logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readModificationByIp(req, res) {
  try {
    const { ip } = req.body;

    if (!ip) {
      return res.status(400).json({ error: 'Missing IP address' });
    }

    const result = await requestModel.selectModificationByIp(ip);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting modification logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readDeletionByIp(req, res) {
  try {
    const { ip } = req.body;

    if (!ip) {
      return res.status(400).json({ error: 'Missing IP address' });
    }

    const result = await requestModel.selectDeletionByIp(ip);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting deletion logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readAllByOs(req, res) {
  try {
    const { os } = req.body;

    if (!os) {
      return res.status(400).json({ error: 'Missing OS' });
    }

    const result = await requestModel.selectAllByOs(os);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readCreationByOs(req, res) {
  try {
    const { os } = req.body;

    if (!os) {
      return res.status(400).json({ error: 'Missing OS' });
    }

    const result = await requestModel.selectCreationByOs(os);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting creation logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readModificationByOs(req, res) {
  try {
    const { os } = req.body;

    if (!os) {
      return res.status(400).json({ error: 'Missing OS' });
    }

    const result = await requestModel.selectModificationByOs(os);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting modification logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function readDeletionByOs(req, res) {
  try {
    const { os } = req.body;

    if (!os) {
      return res.status(400).json({ error: 'Missing OS' });
    }

    const result = await requestModel.selectDeletionByOs(os);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting deletion logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createRequest,
  readAll,
  readAllByDate,
  readCreationByDate,
  readModificationByDate,
  readDeletionByDate,
  readAllByIp,
  readCreationByIp,
  readModificationByIp,
  readDeletionByIp,
  readAllByOs,
  readCreationByOs,
  readModificationByOs,
  readDeletionByOs
};
