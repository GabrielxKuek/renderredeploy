// const model = require(`../models/logModel`)

// // read all values from tables controller
// module.exports.readAll = (req, res) => {
//     const site_id = req.body.siteid
//     // Get all logs from all 3 tables
//     return model.readAll(site_id)
//     .then( result => {
//         return res.status(200).json(result)
//     })
//     .catch( error => {
//         console.log(error)
//         return res.status(500).json({error: error.message})
//     })
// }

// // read all from creation table
// module.exports.readAllCreation = (req,res) => {
//     const site_id = req.body.siteid
//     // Get all creation logs from chosen site
//     return model.readCreation(site_id)
//     .then( result => {
//         return res.status(200).json(result)
//     })
//     .catch( error => {
//         console.log(error)
//         return res.status(500).json({error: error.message})
//     })
// }

// // read all from modification table
// module.exports.readAllModification = (req,res) => {
//     const site_id = req.body.siteid
//     // Get all modification logs from chosen site
//     return model.readModification(site_id)
//     .then( result => {
//         return res.status(200).json(result)
//     })
//     .catch( error => {
//         console.log(error)
//         return res.status(500).json({error: error.message})
//     })
// }

// // read all from deletion table
// module.exports.readAllDeletion = (req,res) => {
//     const site_id = req.body.siteid
//     // Get all deletion logs from chosen site
//     return model.readDeletion(site_id)
//     .then( result => {
//         return res.status(200).json(result)
//     })
//     .catch( error => {
//         console.log(error)
//         return res.status(500).json({error: error.message})
//     })
// }

// // read all values by date
// module.exports.readAllByDate = (req, res) => { // need to config so i combine the select models for read all values instead of a model that does it all at once
//     const site_id = req.body.siteid
//     const date = req.body.date

//     // read all logs by date
//     return model.readAllByDate(site_id, date)
//         .then(result => {
//             return res.status(200).json(result)
//         })
//         .catch(error => {
//             console.error(error)
//             return res.status(500).json({error: error.message})
//         })
// }

// // read creation table values by date
// module.exports.readCreationByDate = (req, res) => {
//     const site_id = req.body.site_id
//     const date = req.body.date

//     // read specific table by date
//     return model.readCreationByDate(site_id, date)
//         .then(result => {
//             return res.status(200).json(result)
//         })
//         .catch(error => {
//             console.error(error)
//             return res.status(500).json({error: error.message})
//         })
// } // we have a middleware that checks site_id and endpoints availability -> check with other guy

// // read modification table values by date
// module.exports.readModificationByDate = (req, res) => {
//     const site_id = req.body.site_id
//     const date = req.body.date

//     // read specific modification table by date
//     return model.readModificationByDate(site_id, date)
//         .then(result => {
//             return res.status(200).json(result)
//         })
//         .catch(error => {
//             console.error(error)
//             return res.status(500).json({error: error.message})
//         })
// }

// // read deletion table values by date
// module.exports.readDeletionByDate = (req, res) => {
//     const site_id = req.body.site_id
//     const date = req.body.date

//     // read specific modification table by date
//     return model.readDeletionByDate(site_id, date)
//         .then(result => {
//             return res.status(200).json(result)
//         })
//         .catch(error => {
//             console.error(error)
//             return res.status(500).json({error: error.message})
//         })
// }

// // read all values ip
// module.exports.readAllByip = (req, res) => {
//     const ip = req.body.type

//     // read all logs by ip
//     return model.readAllByip(ip)
//         .then(result => {
//             return res.status(200).json(result)
//         })
//         .catch(error => {
//             console.error(error)
//             return res.status(500).json({error: error.message})
//         })
// } 

// // read creation table values by ip
// module.exports.readCreationByip = (req, res) => {
//     const ip = req.body.type

//     // read specific table by ip
//     return model.readCreationByip(ip)
//         .then(result => {
//             return res.status(200).json(result)
//         })
//         .catch(error => {
//             console.error(error)
//             return res.status(500).json({error: error.message})
//         })
// }

// // read modification table values by ip
// module.exports.readModificationByip = (req, res) => {
//     const ip = req.body.type

//     // read specific modification table by ip
//     return model.readModificationByip(ip)
//         .then(result => {
//             return res.status(200).json(result)
//         })
//         .catch(error => {
//             console.error(error)
//             return res.status(500).json({error: error.message})
//         })
// }

// // read deletion table values by ip
// module.exports.readDeletionByip = (req, res) => {
//     const ip = req.body.type

//     // read specific modification table by ip
//     return model.readDeletionByip(ip)
//         .then(result => {
//             return res.status(200).json(result)
//         })
//         .catch(error => {
//             console.error(error)
//             return res.status(500).json({error: error.message})
//         })
// }

// // read all values Os
// module.exports.readAllByOs = (req, res) => {
//     const Os = req.body.type

//     // read all logs by Os
//     return model.readAllByOs(Os)
//         .then(result => {
//             return res.status(200).json(result)
//         })
//         .catch(error => {
//             console.error(error)
//             return res.status(500).json({error: error.message})
//         })
// }

// // read creation table values by Os
// module.exports.readCreationByOs = (req, res) => {
//     const Os = req.body.type

//     // read specific table by Os
//     return model.readCreationByOs(Os)
//         .then(result => {
//             return res.status(200).json(result)
//         })
//         .catch(error => {
//             console.error(error)
//             return res.status(500).json({error: error.message})
//         })
// }

// // read modification table values by Os
// module.exports.readModificationByOs = (req, res) => {
//     const Os = req.body.type

//     // read specific modification table by Os
//     return model.readModificationByOs(Os)
//         .then(result => {
//             return res.status(200).json(result)
//         })
//         .catch(error => {
//             console.error(error)
//             return res.status(500).json({error: error.message})
//         })
// }

// // read deletion table values by Os
// module.exports.readDeletionByOs = (req, res) => {
//     const Os = req.body.type

//     // read specific modification table by Os
//     return model.readDeletionByOs(Os)
//         .then(result => {
//             return res.status(200).json(result)
//         })
//         .catch(error => {
//             console.error(error)
//             return res.status(500).json({error: error.message})
//         })
// }

// // Create log
// module.exports.newCreationLog = (req, res, next) => {
//     const table_name = req.body.table_name
//     const user_id = req.body.user_id
//     const site_id = req.body.site_id
//     const record_id = req.body.record_id

//     // read specific modification table by date
//     return model.logNew(user_id, site_id, table_name, record_id)
//         .then(result => {
//             next()
//         })
//         .catch(error => {
//             console.error(error)
//             return res.status(500).json({error: error.message})
//     })
// };

// module.exports.newModificationLog = (req, res, next) => {
//     const table_name = req.body.table_name
//     const user_id = req.body.user_id
//     const site_id = req.body.site_id
//     const record_id = req.body.record_id
//     const field_names = req.body.field_names
//     const old_values = req.body.old_values

//     // read specific modification table by date
//     return model.logChange(user_id, site_id, table_name, record_id, field_names, old_values)
//         .then(result => {
//             next()
//         })
//         .catch(error => {
//             console.error(error)
//             return res.status(500).json({error: error.message})
//     })
// };

// module.exports.newDeletionLog = (req, res, next) => {
//     const user_id = req.body.user_id
//     const site_id = req.body.site_id
//     const table_name = req.body.table_name
//     const record_id = req.body.record_id
//     const field_name = req.body.field_name
//     const values = req.body.values

//     // read specific modification table by date
//     return model.logChangeDetails(user_id, site_id, table_name, record_id, field_name, values)
//         .then(result => {
//             next()
//         })
//         .catch(error => {
//             console.error(error)
//             return res.status(500).json({error: error.message})
//     })
// };