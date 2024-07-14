const model = require(`../models/creationLog`)

module.exports.readAll = (req, res) => {
    // Get all from UM_Creation_Log
    return model.readAll()
    .then( rows => {
        return res.status(200).json({creationLogs: rows})
    })
    .catch( error => {
        console.log(error)
        return res.status(500).json({error: error.message})
    })
}