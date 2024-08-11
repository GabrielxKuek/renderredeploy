import * as requestModel from '../models/requestModel.js';
// import { logger } from '../logger.js';

// ========================
// insert request
// ========================

// export async function createRequest(req, res, next) {
//   try {
//     // Ensure req.logData and req.user are correctly set up before this middleware
//     const { method: request_method, url: api_requested, status, responseTime, remoteAddr: user_ip, error_message } = req.logData || {};
//     const user_id = req.user ? req.user.id : null; // Ensure req.user is set after authentication
//     const site_id = req.body.site_id;
//     const user_os = res.locals.user_os;

//     if (!user_id || !site_id || !request_method || !api_requested || !user_ip || !user_os) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // Log request data using Winston
//     logger.info('Request received', {
//       user_id,
//       site_id,
//       request_method,
//       api_requested,
//       user_ip,
//       user_os,
//       error_message: error_message || null, // Include error_message if available
//       timestamp: new Date().toISOString(),
//     });

//     // Insert request into the database
//     const result = await requestModel.insertRequest(user_id, site_id, request_method, api_requested, user_ip, user_os, error_message);
//     res.status(200).json({ message: 'Request logged successfully', result });

//     // Proceed to the next middleware or route handler
//     // next();
//   } catch (error) {
//     console.error('Error logging request:', error);
//     // Log the error message to Winston
//     logger.error('Error logging request', {
//       user_id: req.user ? req.user.id : null,
//       site_id: req.body.site_id,
//       request_method: req.logData?.method || null,
//       api_requested: req.logData?.url || null,
//       user_ip: req.logData?.remoteAddr || null,
//       user_os: res.locals.user_os || null,
//       error_message: error.message,
//       timestamp: new Date().toISOString(),
//     });
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

export async function createRequest(req, res) { // note: logger i comment out cause theres no export
  try {
    const { 
      user_id, 
      site_id, 
      request_method, 
      api_requested, 
      ip, 
      os,
      error_message, 
      body, 
      headers 
    } = req.body;

    if (!user_id || !site_id || !request_method || !api_requested || !ip || !os) {
      console.log({ error: 'Missing fields' });
    }
    
    // logger.info('Request received', {
    //   user_id,
    //   site_id,
    //   request_method,
    //   api_requested,
    //   ip,
    //   os,
    //   error_message: error_message || null, 
    //   timestamp: new Date().toISOString(),
    // });

    // Pass each field explicitly to the insertRequest function
    const result = await requestModel.insertRequest(
      user_id,
      site_id,
      request_method,
      ip,
      os,
      api_requested,
      error_message || null,
      body || {},
      headers || {}
    );

        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error logging request:', error);

    // // Log the error message to Winston
    // logger.error('Error logging request', {
    //   user_id: req.user ? req.user.id : null,
    //   site_id: req.body.site_id,
    //   request_method: req.logData?.method || null,
    //   api_requested: req.logData?.url || null,
    //   user_ip: req.logData?.remoteAddr || null,
    //   user_os: res.locals.user_os || null,
    //   error_message: error.message,
    //   timestamp: new Date().toISOString(),
    // });

    res.status(500).json({ error: 'Internal server error' });
  }
}

// ========================
// select all request
// ========================

export async function readAllRequestBySite(req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;

    if (!site_id) {
      return res.status(400).json({ error: 'Missing site_id' });
    }

    const result = await requestModel.selectAllRequestBySite(site_id);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error selecting all logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readAllRequestByDate(req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;
    const { searchValue } = req.query;

    if (!site_id || !date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await requestModel.selectAllRequestByDate(site_id, searchValue);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error selecting logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readAllRequestByIp(req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;
    const { searchValue } = req.query;

    if (!searchValue) {
      return res.status(400).json({ error: 'Missing IP address' });
    }

    const result = await requestModel.selectAllRequestByIp(site_id, searchValue);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error selecting logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readAllRequestByOs(req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;
    const { searchValue } = req.query;

    if (!searchValue) {
      return res.status(400).json({ error: 'Missing OS' });
    }

    const result = await requestModel.selectAllRequestByOs(site_id, searchValue);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error selecting logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ========================
// select get request
// ========================

export async function readGetRequestByDate(req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;
    const { searchValue } = req.query;

    if (!site_id || !searchValue) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await requestModel.selectGetRequestByDate(site_id, searchValue);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error selecting get logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readGetRequestByIp(req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;
    const { searchValue } = req.query;

    if (!searchValue) {
      return res.status(400).json({ error: 'Missing IP address' });
    }

    const result = await requestModel.selectGetRequestByIp(site_id, searchValue);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error selecting get logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readGetRequestByOs(req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;
    const { searchValue } = req.query;
    console.log(searchValue)

    if (!searchValue) {
      return res.status(400).json({ error: 'Missing OS' });
    }

    const result = await requestModel.selectGetRequestByOs(site_id, searchValue);
    console.log(result)
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    console.log(sanitizedResult)
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error selecting get logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ========================
// select post request
// ========================

export async function readPostRequestByDate(req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;
    const { searchValue } = req.query;

    if (!site_id || !searchValue) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await requestModel.selectPostRequestByDate(site_id, searchValue);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error selecting post logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readPostRequestByIp(req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;
    const { searchValue } = req.query;

    if (!searchValue) {
      return res.status(400).json({ error: 'Missing IP address' });
    }

    const result = await requestModel.selectPostRequestByIp(site_id, searchValue);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error selecting post logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readPostRequestByOs(req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;
    const { searchValue } = req.query;

    if (!searchValue) {
      return res.status(400).json({ error: 'Missing OS' });
    }

    const result = await requestModel.selectPostRequestByOs(site_id, searchValue);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error selecting post logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ========================
// select put request
// ========================

export async function readPutRequestByDate(req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;
    const { searchValue } = req.query;

    if (!site_id || !searchValue) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await requestModel.selectPutRequestByDate(site_id, searchValue);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error selecting put logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readPutRequestByIp(req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;
    const { searchValue } = req.query;

    if (!searchValue) {
      return res.status(400).json({ error: 'Missing IP address' });
    }

    const result = await requestModel.selectPutRequestByIp(site_id, searchValue);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error selecting put logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readPutRequestByOs(req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;
    const { searchValue } = req.query;

    if (!searchValue) {
      return res.status(400).json({ error: 'Missing OS' });
    }

    const result = await requestModel.selectPutRequestByOs(site_id, searchValue);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error selecting put logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// ========================
// select delete request
// ========================

export async function readDeleteRequestByDate(req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;
    const { searchValue } = req.query;

    if (!site_id || !searchValue) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await requestModel.selectDeleteRequestByDate(site_id, searchValue);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error selecting delete logs by date:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readDeleteRequestByIp(req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;
    const { searchValue } = req.query;

    if (!searchValue) {
      return res.status(400).json({ error: 'Missing IP address' });
    }

    const result = await requestModel.selectDeleteRequestByIp(site_id, searchValue);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error selecting delete logs by IP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function readDeleteRequestByOs(req, res) {
  try {
    // const site_id = res.locals.site_id;
    const site_id = 1;
    const { searchValue } = req.query;

    if (!searchValue) {
      return res.status(400).json({ error: 'Missing OS' });
    }

    const result = await requestModel.selectDeleteRequestByOs(site_id, searchValue);
        
    const sanitizedResult = result.map(log => {
        return {
            ...log,
            fieldName: log.fieldName ? validator.escape(log.fieldName) : log.fieldName,
        };
    }); 
    res.status(200).json(sanitizedResult);
  } catch (error) {
    console.error('Error selecting delete logs by OS:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}