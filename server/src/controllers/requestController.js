const requestModel = require('../models/requestModel');

async function insertRequest(req, res) {
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

// ========================
// select all request
// ========================

async function selectAllRequestBySite(req, res) {
  try {
    const { site_id } = req.body;

    if (!site_id) {
      return res.status(400).json({ error: 'Missing site_id' });
    }

    const result = await requestModel.selectAllRequestBySite(site_id);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting all logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function selectAllRequestByDate(req, res) {
  try {
    const { site_id, date } = req.body;

    if (!site_id || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await requestModel.selectAllRequestByDate(site_id, date);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function selectAllRequestByIp(req, res) {
  try {
    const { ip } = req.body;

    if (!ip) {
      return res.status(400).json({ error: 'Missing IP address' });
    }

    const result = await requestModel.selectAllRequestByIp(ip);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function selectAllRequestByOs(req, res) {
  try {
    const { os } = req.body;

    if (!os) {
      return res.status(400).json({ error: 'Missing OS' });
    }

    const result = await requestModel.selectAllRequestByOs(os);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ========================
// select post request
// ========================

async function selectPostRequestByDate(req, res) {
  try {
    const { site_id, date } = req.body;

    if (!site_id || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await requestModel.selectPostRequestByDate(site_id, date);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting creation logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function selectPostRequestByIp(req, res) {
  try {
    const { ip } = req.body;

    if (!ip) {
      return res.status(400).json({ error: 'Missing IP address' });
    }

    const result = await requestModel.selectPostRequestByIp(ip);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting creation logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function selectPostRequestByOs(req, res) {
  try {
    const { os } = req.body;

    if (!os) {
      return res.status(400).json({ error: 'Missing OS' });
    }

    const result = await requestModel.selectPostRequestByOs(os);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting creation logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ========================
// select put request
// ========================

async function selectPutRequestByDate(req, res) {
  try {
    const { site_id, date } = req.body;

    if (!site_id || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await requestModel.selectPutRequestByDate(site_id, date);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting modification logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function selectPutRequestByIp(req, res) {
  try {
    const { ip } = req.body;

    if (!ip) {
      return res.status(400).json({ error: 'Missing IP address' });
    }

    const result = await requestModel.selectPutRequestByIp(ip);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting modification logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function selectPutRequestByOs(req, res) {
  try {
    const { os } = req.body;

    if (!os) {
      return res.status(400).json({ error: 'Missing OS' });
    }

    const result = await requestModel.selectPutRequestByOs(os);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting modification logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ========================
// select delete request
// ========================

async function selectDeleteRequestByDate(req, res) {
  try {
    const { site_id, date } = req.body;

    if (!site_id || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await requestModel.selectDeleteRequestByDate(site_id, date);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting deletion logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function selectDeleteRequestByIp(req, res) {
  try {
    const { ip } = req.body;

    if (!ip) {
      return res.status(400).json({ error: 'Missing IP address' });
    }

    const result = await requestModel.selectDeleteRequestByIp(ip);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting deletion logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function selectDeleteRequestByOs(req, res) {
  try {
    const { os } = req.body;

    if (!os) {
      return res.status(400).json({ error: 'Missing OS' });
    }

    const result = await requestModel.selectDeleteRequestByOs(os);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error selecting deletion logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  insertRequest,
  selectAllRequestBySite,
  selectAllRequestByDate,
  selectAllRequestByIp,
  selectAllRequestByOs,
  selectPostRequestByDate,
  selectPostRequestByIp,
  selectPostRequestByOs,
  selectPutRequestByDate,
  selectPutRequestByIp,
  selectPutRequestByOs,
  selectDeleteRequestByDate,
  selectDeleteRequestByIp,
  selectDeleteRequestByOs,
};
