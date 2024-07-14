const {query} = require('../database')

// read all
module.exports.readAll = (site_id) => {
    let finalResult = {}

    // SQL statement for retrieving all UM_Modification_Log with UM_Modification_Log_Detail
    const modificationSQL = `
    SELECT * 
    FROM "um_modification_log" modLog
    INNER JOIN "um_modification_log_detail" modDetail
    ON modLog.log_id = modDetail.log_id
    WHERE modLog.site_id = ?;
    `
    // SQL statement for retrieving all UM_Deletion_Log with UM_Deletion_Log_Detail
    const deletionSQL  = `
    SELECT * 
    FROM "um_deletion_log" deletionLog
    INNER JOIN "um_deletion_log_detail" deletionDetail
    ON deletionLog.log_id = deletionDetail.log_id
    WHERE deletionLog.site_id = ?;
    `
    // SQL statement for retrieving all UM_Creation_Log
    const createSQL = `
    SELECT *
    FROM "um_creation_log"
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
    FROM "um_modification_log" modLog
    INNER JOIN "um_modification_log_detail" modDetail
    ON modLog.log_id = modDetail.log_id
    WHERE modLog.site_id = ?
    AND modLog.creation_at >= ?;
    `
    // retrieve from deletion table
    const deletionSQL  = `
    SELECT * 
    FROM "um_deletion_log" deletionLog
    INNER JOIN "um_deletion_log_detail" deletionDetail
    ON deletionLog.log_id = deletionDetail.log_id
    WHERE deletionLog.site_id = ?
    AND deletionLog.date >= ?;
    `
    // retrieve from creation table
    const createSQL = `
    SELECT *
    FROM "um_creation_log"
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
    FROM "um_creation_log"
    WHERE site_id = ?
    AND date >= ?;
    `

    return query(sql, [site_id, date])
} // might have errors. table selection need to fix. discuss with teacher

// view logs by date - modification table
module.exports.readModificationByDate = (site_id, date) => {
    const sql = `
    SELECT *
    FROM "um_modification_log"
    WHERE site_id = ?
    AND date >= ?;
    `

    return query(sql, [site_id, date])
}

// view logs by date - deletion table
module.exports.readDeletionByDate = (site_id, date) => {
    const sql = `
    SELECT *
    FROM "um_deletion_log"
    WHERE site_id = ?
    AND date >= ?;
    `

    return query(sql, [site_id, date])
}

// Create
module.exports.logNew = (table_name, user_id, site_id, record_id, user_ip, user_os) => {
    const sql = `
    INSERT INTO um_creation_log (table_name, user_id, site_id, record_id, user_ip, user_os)
    VALUES (?, ?, ?, ?, ?, ?)
    `;

    return query(sql, [table_name, user_id, site_id, record_id, user_ip, user_os]);
}

module.exports.logChange = (table_name, user_id, site_id, record_id, user_ip, user_os) => {
    const sql = `
    INSERT INTO um_modification_log (table_name, user_id, site_id, record_id, user_ip, user_os)
    VALUES (?, ?, ?, ?, ?, ?)
    `;

    return query(sql, [table_name, user_id, site_id, record_id, user_ip, user_os]);
}

module.exports.logChangeDetails = (log_id, field_name, old_value) => {
    const sql = `
    INSERT INTO um_modification_log_detail (log_id, field_name, old_value)
    VALUES (?, ?, ?)
    `;

    return query(sql, [log_id, field_name, old_value]);
}

module.exports.logRemoveDetails = (log_id, field_name, value) => {
    const sql = `
    INSERT INTO um_deletion_log (log_id, field_name, value)
    VALUES (?, ?, ?)
    `;

    return query(sql, [log_id, field_name, value]);
}
