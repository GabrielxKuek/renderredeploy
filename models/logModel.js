const {query} = require('../database')

// =========================
//      READ ALL
// =========================
module.exports.readAll = (site_id) => {
    let finalResult = {
        creation_log: [],
        modification_log: [],
        deletion_log: []
    }

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

module.exports.readCreation = (site_id) => {
    const sql = `
    SELECT * FROM "UM_Creation_Log" WHERE site_id = ?;
    `
    return query(sql, [site_id]).then(result => {
        return result.rows
    })
}

module.exports.readModification = (site_id) => {
    const sql = `
    SELECT * 
    FROM "um_modification_log" modLog
    INNER JOIN "um_modification_log_detail" modDetail
    ON modLog.log_id = modDetail.log_id
    WHERE modLog.site_id = ?;
    `
    return query(sql, [site_id]).then(result => {
        return result.rows
    })
}

module.exports.readDeletion = (site_id) => {
    const sql = `
    SELECT * 
    FROM "um_deletion_log" deletionLog
    INNER JOIN "um_deletion_log_detail" deletionDetail
    ON deletionLog.log_id = deletionDetail.log_id
    WHERE deletionLog.site_id = ?;
    `
    return query(sql, [site_id]).then(result => {
        return result.rows
    })
}

// ===================
//         DATE
// ===================

// view logs by date - all tables
module.exports.selectAllByDate = (site_id, date) => {
    let finalResult = {
        creation_log: [],
        modification_log: [],
        deletion_log: []
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
module.exports.selectCreationByDate = (site_id, date) => {
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
module.exports.selectDeletionByDate = (site_id, date) => {
    const sql = `
    SELECT *
    FROM "um_deletion_log"
    WHERE site_id = ?
    AND date >= ?;
    `

    return query(sql, [site_id, date])
}

// ===================
//         IP
// ===================

// view all logs user_ip
module.exports.selectAllIp = (ip) => {
    let finalResult = {
        creation_log: [],
        modification_log: [],
        deletion_log: []
    }

    // retrieve from modification table
    const modificationSQL = `
    SELECT modLog.log_id, modLog.user_id, modLog.site_id, modLog.user_ip, modDetail.*
    FROM "UM_Modification_Log" modLog
    INNER JOIN "UM_Modification_Log_Detail" modDetail
    ON modLog.log_id = modDetail.log_id;
    `
    // retrieve from deletion table
    const deletionSQL  = `
    SELECT deletionLog.log_id, deletionLog.user_id, deletionLog.site_id, deletionLog.user_ip, deletionDetail.*
    FROM "UM_Deletion_Log" deletionLog
    INNER JOIN "UM_Deletion_Log_Detail" deletionDetail
    ON deletionLog.log_id = deletionDetail.log_id;
    `
    // retrieve from creation table
    const createSQL = `
    SELECT log_id, user_id, site_id, user_ip
    FROM "UM_Creation_Log";
    `

    return query(modificationSQL, [ip])
        .then(result => {
            finalResult.modification_log.push(...result.rows)

            query(deletionSQL, [ip])
                .then(result => {
                    finalResult.deletion_log.push(...result.rows)

                    query(createSQL, [ip])
                        .then(result => {
                            finalResult.creation_log.push(...result.rows)
                        })
                })
        })
}

// select creation logs user_ip
module.exports.selectCreationIp = (ip) => {
    const sql = `
    SELECT log_id, user_id, site_id, user_ip
    FROM "UM_Creation_Log";
    `

    return query(sql, [ip])
}

// select modification logs user_ip
module.exports.selectModificationIp = (ip) => {
    const sql = `
    SELECT modLog.log_id, modLog.user_id, modLog.site_id, modLog.user_ip, modDetail.*
    FROM "UM_Modification_Log" modLog
    INNER JOIN "UM_Modification_Log_Detail" modDetail
    ON modLog.log_id = modDetail.log_id;
    `

    return query(sql, [ip])
}

// select deletion logs user_ip
module.exports.selectDeletionIp = (ip) => {
    const sql = `
    SELECT deletionLog.log_id, deletionLog.user_id, deletionLog.site_id, deletionLog.user_ip, deletionDetail.*
    FROM "UM_Deletion_Log" deletionLog
    INNER JOIN "UM_Deletion_Log_Detail" deletionDetail
    ON deletionLog.log_id = deletionDetail.log_id;
    `

    return query(sql, [ip])
}

// ===================
//         OS
// ===================

// read all values os
module.exports.selectAllOs = (os) => {
    let finalResult = {
        creation_log: [],
        modification_log: [],
        deletion_log: []
    }

    // retrieve from modification table
    const modificationSQL = `
    SELECT *
    FROM "UM_Modification_Log" modLog
    INNER JOIN "UM_Modification_Log_Detail" modDetail
    ON modLog.log_id = modDetail.log_id
    WHERE modLog.os = ?;
    `
    // retrieve from deletion table
    const deletionSQL  = `
    SELECT *
    FROM "UM_Deletion_Log" deletionLog
    INNER JOIN "UM_Deletion_Log_Detail" deletionDetail
    ON deletionLog.log_id = deletionDetail.log_id
    WHERE deletionLog.os = ?;
    `
    // retrieve from creation table
    const createSQL = `
    SELECT *
    FROM "UM_Creation_Log"
    WHERE os = ?;
    `

    return query(modificationSQL, [os])
        .then(result => {
            finalResult.modification_log.push(...result.rows)

            query(deletionSQL, [os])
                .then(result => {
                    finalResult.deletion_log.push(...result.rows)

                    query(createSQL, [os])
                        .then(result => {
                            finalResult.creation_log.push(...result.rows)
                        })
                })
        })
}

// select creation logs os
module.exports.selectCreationOs = (os) => {
    const sql = `
    SELECT log_id, user_id, site_id, os
    FROM "UM_Creation_Log"
    WHERE os = ?;
    `

    return query(sql, [os])
}

// select modification logs os
module.exports.selectModificationOs = (os) => {
    const sql = `
    SELECT *
    FROM "UM_Modification_Log" modLog
    INNER JOIN "UM_Modification_Log_Detail" modDetail
    ON modLog.log_id = modDetail.log_id
    WHERE modLog.os = ?;
    `

    return query(sql, [os])
}

// select deletion logs os
module.exports.selectDeletionOs = (os) => {
    const sql = `
    SELECT *
    FROM "UM_Deletion_Log" deletionLog
    INNER JOIN "UM_Deletion_Log_Detail" deletionDetail
    ON deletionLog.log_id = deletionDetail.log_id
    WHERE deletionLog.os = ?;
    `

    return query(sql, [os])
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
