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
module.exports.readAllByDate = (req, res) => { // need to config so i combine the select models for read all values instead of a model that does it all at once
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

// read all values ip
module.exports.readAllByip = (req, res) => {
    const ip = req.params.type

    // read all logs by ip
    return model.readAllByip(ip)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
} 

// read creation table values by ip
module.exports.readCreationByip = (req, res) => {
    const ip = req.params.type

    // read specific table by ip
    return model.readCreationByip(ip)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// read modification table values by ip
module.exports.readModificationByip = (req, res) => {
    const ip = req.params.type

    // read specific modification table by ip
    return model.readModificationByip(ip)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// read deletion table values by ip
module.exports.readDeletionByip = (req, res) => {
    const ip = req.params.type

    // read specific modification table by ip
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

    // read all logs by Os
    return model.readAllByOs(Os)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// read creation table values by Os
module.exports.readCreationByOs = (req, res) => {
    const Os = req.params.type

    // read specific table by Os
    return model.readCreationByOs(Os)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// read modification table values by Os
module.exports.readModificationByOs = (req, res) => {
    const Os = req.params.type

    // read specific modification table by Os
    return model.readModificationByOs(Os)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}

// read deletion table values by Os
module.exports.readDeletionByOs = (req, res) => {
    const Os = req.params.type

    // read specific modification table by Os
    return model.readDeletionByOs(Os)
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.message})
        })
}