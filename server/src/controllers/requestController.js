import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, colorize } = format;
const model = require(`../models/requestModel`)

// Custom format for console logging with colors
const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${level}: ${message}`;
  })
);

// Create a Winston logger
const logger = createLogger ({
    level: 'info', format: combine( colorize(),
    timestamp(),
    json()
    ),
    transports: [
    new transports.Console({
    format: consoleLogFormat
    }),
    new transports.File({ filename}) 
    ],
});

export default logger;

// read all values from tables controller
module.exports.readAll = (req, res) => {
    const site_id=req.params.siteid
    // Get all requests
    return model.readAll(site_id)
    .then( result => {
        return res.status(200).json(result)
    })
    .catch( error => {
        console.log(error)
        return res.status(500).json({error: error.message})
    })
}

// read all values by date
module.exports.readAllByDate = (req, res) => { 
    const site_id = req.params.siteid
    const date = req.params.date

    // read all requests by date
    return model.readAllByDate(site_id, date)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// read create requests values by date
module.exports.readCreationByDate = (req, res) => { 
    const site_id = req.params.site_id
    const date = req.params.date

    // read by date
    return model.readCreationByDate(site_id, date)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
} // we have a middleware that checks site_id and endpoints availability -> check with other guy

// read update requests values by date
module.exports.readModificationByDate = (req, res) => {
    const site_id = req.params.site_id
    const date = req.params.date

    // read by date
    return model.readModificationByDate(site_id, date)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// read delete requests values by date
module.exports.readDeletionByDate = (req, res) => {
    const site_id = req.params.site_id
    const date = req.params.date

    // read by date
    return model.readDeletionByDate(site_id, date)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// read all values ip
module.exports.readAllByip = (req, res) => {
    const ip = req.params.type

    // read all requests by ip
    return model.readAllByip(ip)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
} 

// read create requests values by ip
module.exports.readCreationByip = (req, res) => {
    const ip = req.params.type

    // read by ip
    return model.readCreationByip(ip)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// read update requests values by ip
module.exports.readModificationByip = (req, res) => {
    const ip = req.params.type

    // read by ip
    return model.readModificationByip(ip)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// read delete requests values by ip
module.exports.readDeletionByip = (req, res) => {
    const ip = req.params.type

    // read by ip
    return model.readDeletionByip(ip)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// read all values Os
module.exports.readAllByOs = (req, res) => {
    const Os = req.params.type

    // read all requests by Os
    return model.readAllByOs(Os)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// read create requests values by Os
module.exports.readCreationByOs = (req, res) => {
    const Os = req.params.type

    // read by Os
    return model.readCreationByOs(Os)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// read update requests values by Os
module.exports.readModificationByOs = (req, res) => {
    const Os = req.params.type

    // read by Os
    return model.readModificationByOs(Os)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// read delete requests values by Os
module.exports.readDeletionByOs = (req, res) => {
    const Os = req.params.type

    // read by Os
    return model.readDeletionByOs(Os)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// Create reuqests
module.exports.newRequestLog = (req, res, next) => {
    const user_id = req.body.user_id
    const site_id = req.body.site_id
    const request_method = req.body.request_method
    const api_requested = req.body.api_requested
    const user_ip = req.body.user_ip
    const user_os = req.body.user_os
    const request_success = req.body.request_success

    // read specific modification table by date
    return model.logRequest(user_id, site_id, request_method,api_requested, user_ip, user_os, request_success)
        .then(result => {
            next()
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
    })
};