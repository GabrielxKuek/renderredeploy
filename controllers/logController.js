const model = require(`../models/logModel`)

// read all values from tables controller
module.exports.readAll = (req, res) => {
    const site_id = req.params.siteid
    // Get all from UM_Creation_Log
    return model.readAll(site_id)
    .then( rows => {
        return res.status(200).json({creationLogs: rows})
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

    // read all logs by date
    return model.readAllByDate(site_id, date)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// read creation table values by date
module.exports.readCreationByDate = (req, res) => {
    const site_id = req.params.site_id
    const date = req.params.date

    // read specific table by date
    return model.readCreationByDate(site_id, date)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
} // we have a middleware that checks site_id and endpoints availability -> check with other guy

// read modification table values by date
module.exports.readModificationByDate = (req, res) => {
    const site_id = req.params.site_id
    const date = req.params.date

    // read specific modification table by date
    return model.readModificationByDate(site_id, date)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// read deletion table values by date
module.exports.readDeletionByDate = (req, res) => {
    const site_id = req.params.site_id
    const date = req.params.date

    // read specific modification table by date
    return model.readDeletionByDate(site_id, date)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// Create log
module.exports.newCreationLog = (req, res, next) => {
    const table_name = req.params.table_name
    const user_id = req.body.user_id
    const site_id = req.body.site_id
    const record_id = req.body.record_id
    const user_ip = req.body.user_ip
    const user_os = req.body.user_os

    // read specific modification table by date
    return model.logNew(table_name, user_id, site_id, record_id, user_ip, user_os)
        .then(result => {
            next()
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
    })
};

module.exports.newModificationLog = (req, res, next) => {
    const table_name = req.params.table_name
    const user_id = req.body.user_id
    const site_id = req.body.site_id
    const record_id = req.body.record_id
    const user_ip = req.body.user_ip
    const user_os = req.body.user_os

    // read specific modification table by date
    return model.logChange(table_name, user_id, site_id, record_id, user_ip, user_os)
        .then(result => {
            next()
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
    })
};

module.exports.newModificationLogDetail = (req, res, next) => {
    const log_id = req.body.log_id
    const field_name = req.body.field_name
    const old_value = req.body.old_value

    // read specific modification table by date
    return model.logChangeDetails(log_id, field_name, old_value)
        .then(result => {
            next()
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
    })
};

module.exports.newDeletionLogDetail = (req, res, next) => {
    const log_id = req.body.log_id
    const field_name = req.body.field_name
    const value = req.body.value

    // read specific modification table by date
    return model.logChangeDetails(log_id, field_name, value)
        .then(result => {
            next()
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
    })
};