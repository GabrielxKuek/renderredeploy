const model = require(`../models/logModel`)

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