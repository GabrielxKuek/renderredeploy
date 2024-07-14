const {query} = require('../database')

// read all
module.exports.readAll = (site_id) => {
    let finalResult = {}

    // SQL statement for retrieving all UM_Modification_Log with UM_Modification_Log_Detail
    const modificationSQL = `
    SELECT * 
    FROM "UM_Modification_Log" modLog
    INNER JOIN "UM_Modification_Log_Detail" modDetail
    ON modLog.log_id = modDetail.log_id
    WHERE modLog.site_id = ?;
    `
    // SQL statement for retrieving all UM_Deletion_Log with UM_Deletion_Log_Detail
    const deletionSQL  = `
    SELECT * 
    FROM "UM_Deletion_Log" deletionLog
    INNER JOIN "UM_Deletion_Log_Detail" deletionDetail
    ON deletionLog.log_id = deletionDetail.log_id
    WHERE deletionLog.site_id = ?;
    `
    // SQL statement for retrieving all UM_Creation_Log
    const createSQL = `
    SELECT *
    FROM "UM_Creation_Log"
    WHERE site_id = ?;
    `

    return query(modificationSQL, [site_id])
    .then(result => {
        finalResult.modification_log = result.rows

        return query(deletionSQL, [site_id])
        .then(result => {
            finalResult.deletion_log = result.rows

            return query(createSQL, [site_id])
            .then(result => {
                finalResult.creation_log = result.rows
                return finalResult
            })
        })
    })
}

// view logs by date - all tables
module.exports.readAllByDate = (site_id, date) => {
    let finalResult = {
        modification_log: [],
        deletion_log: [],
        creation_log: []
    }

    // retrieve from modification table
    const modificationSQL = `
    SELECT * 
    FROM "UM_Modification_Log" modLog
    INNER JOIN "UM_Modification_Log_Detail" modDetail
    ON modLog.log_id = modDetail.log_id
    WHERE modLog.site_id = ?
    AND modLog.creation_at >= ?;
    `
    // retrieve from deletion table
    const deletionSQL  = `
    SELECT * 
    FROM "UM_Deletion_Log" deletionLog
    INNER JOIN "UM_Deletion_Log_Detail" deletionDetail
    ON deletionLog.log_id = deletionDetail.log_id
    WHERE deletionLog.site_id = ?
    AND deletionLog.date >= ?;
    `
    // retrieve from creation table
    const createSQL = `
    SELECT *
    FROM "UM_Creation_Log"
    WHERE site_id = ?
    AND date >= ?;
    `

    return query(modificationSQL, [site_id, date])
        .then(result => {
            finalResult.modification_log.push(...result.rows)

            query(deletionSQL, [site_id, date])
                .then(result => {
                    finalResult.deletion_log.push(...result.rows)

                    query(createSQL, [site_id, date])
                        .then(result => {
                            finalResult.creation_log.push(...result.rows)
                        })
                })
        })
}

// view logs by date - creation table
module.exports.readCreationByDate = (site_id, date) => {
    const sql = `
    SELECT *
    FROM "UM_Creation_Log"
    WHERE site_id = ?
    AND date >= ?;
    `

    return query(sql, [site_id, date])
} // might have errors. table selection need to fix. discuss with teacher

// view logs by date - modification table
module.exports.readModificationByDate = (site_id, date) => {
    const sql = `
    SELECT *
    FROM "UM_Modification_Log"
    WHERE site_id = ?
    AND date >= ?;
    `

    return query(sql, [site_id, date])
}

// view logs by date - deletion table
module.exports.readDeletionByDate = (site_id, date) => {
    const sql = `
    SELECT *
    FROM "UM_Deletion_Log"
    WHERE site_id = ?
    AND date >= ?;
    `

    return query(sql, [site_id, date])
}