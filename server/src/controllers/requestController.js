import * as requestModel from '../models/requestModel.js';
import logger from '../logger.js'

export async function createRequest(req, res, next) {
  try {
    const { method: request_method, url: api_requested, status, responseTime, remoteAddr: user_ip } = req.logData;
    const user_id = req.user.id; // Assuming req.user is set after JWT authentication
    const site_id = req.params.site_id;a
    const user_os = res.locals.user_os;

    if (!user_id || !site_id || !request_method || !api_requested || !user_ip || !user_os) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Log request data using Winston
    logger.info('Request received', {
      user_id,
      site_id,
      request_method,
      api_requested,
      user_ip,
      user_os,
      timestamp: new Date().toISOString(),
    });

    // Insert request into the database
    const result = await requestModel.insertRequest(user_id, site_id, request_method, api_requested, user_ip, user_os);
    res.status(200).json({ message: 'Request logged successfully', result });
 // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error logging request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ========================
// insert request
// ========================

// export async function createRequest(req, res) {
//   try {

//     const { user_id, site_id, request_method, api_requested, user_ip, user_os, request_success } = req.body;

//     if (!user_id || !site_id || !request_method || !api_requested || !user_ip || !user_os || request_success === undefined) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     const result = await requestModel.insertRequest(user_id, site_id, request_method, api_requested, user_ip, user_os, request_success);
//     res.status(200).json({ message: 'Request logged successfully', result });
//   } catch (error) {
//     console.error('Error logging request:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// ========================
// select all request
// ========================

export async function readAllRequestBySite(req, res) {
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

export async function readAllRequestByDate(req, res) {
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

export async function readAllRequestByIp(req, res) {
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

export async function readAllRequestByOs(req, res) {
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

export async function readPostRequestByDate(req, res) {
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

export async function readPostRequestByIp(req, res) {
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

export async function readPostRequestByOs(req, res) {
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

export async function readPutRequestByDate(req, res) {
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

export async function readPutRequestByIp(req, res) {
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

export async function readPutRequestByOs(req, res) {
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

export async function readDeleteRequestByDate(req, res) {
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

export async function readDeleteRequestByIp(req, res) {
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

export async function readDeleteRequestByOs(req, res) {
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