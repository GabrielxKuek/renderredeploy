const model = require(`../models/log`)

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