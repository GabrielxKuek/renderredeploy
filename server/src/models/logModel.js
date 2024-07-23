const {query} = require('../database')

// =========================
//      READ ALL
// =========================
module.exports.readAll = async (site_id) => {
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

    try {
        const modResult = await query(modificationSQL, [site_id])
        finalResult.modification_log = modResult.rows

        const delResult = await query(deletionSQL, [site_id])
        finalResult.deletion_log = delResult.rows

        const createResult = await query(createSQL, [site_id])
        finalResult.creation_log = createResult.rows

        return finalResult
    } catch (err) {
        throw new Error(`Error fetching logs: ${err.message}`)
    }
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
module.exports.selectAllByDate = async (site_id, date) => {
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

    try {
        const modResult = await query(modificationSQL, [site_id])
        finalResult.modification_log = modResult.rows

        const delResult = await query(deletionSQL, [site_id])
        finalResult.deletion_log = delResult.rows

        const createResult = await query(createSQL, [site_id])
        finalResult.creation_log = createResult.rows

        return finalResult
    } catch (err) {
        throw new Error(`Error fetching logs: ${err.message}`)
    }
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
}

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
module.exports.selectAllIp = async (ip) => {
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

    try {
        const modResult = await query(modificationSQL, [site_id])
        finalResult.modification_log = modResult.rows

        const delResult = await query(deletionSQL, [site_id])
        finalResult.deletion_log = delResult.rows

        const createResult = await query(createSQL, [site_id])
        finalResult.creation_log = createResult.rows

        return finalResult
    } catch (err) {
        throw new Error(`Error fetching logs: ${err.message}`)
    }
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
module.exports.selectAllOs = async (os) => {
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

    try {
        const modResult = await query(modificationSQL, [site_id])
        finalResult.modification_log = modResult.rows

        const delResult = await query(deletionSQL, [site_id])
        finalResult.deletion_log = delResult.rows

        const createResult = await query(createSQL, [site_id])
        finalResult.creation_log = createResult.rows

        return finalResult
    } catch (err) {
        throw new Error(`Error fetching logs: ${err.message}`)
    }
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

// Request
module.exports.logRequest = (user_id, site_id, request_method, api_requested, user_ip, user_os, request_success) => {
    const sql = `
    CALL log_request(?, ?, ?, ?, ?, ?, ?);
    `;

    return query(sql, [user_id, site_id, request_method, api_requested, user_ip, user_os, request_success]);
}

// Create
module.exports.logNew = (user_id, site_id, table_name, record_id) => {
    const sql = `
    CALL log_creation(?, ?, ?, ?);
    `;

    return query(sql, [user_id, site_id, table_name, record_id]);
}

// Update
module.exports.logChange = (user_id, site_id, table_name, record_id, field_names, old_values) => {
    const sql = `
    CALL log_modification(?, ?, ?, ?, ?, ?);
    `;
    return query(sql, [user_id, site_id, table_name, record_id, field_names, old_values]);
}

// Delete
module.exports.logRemove = (user_id, site_id, table_name, record_id, field_names , values) => {
    const sql = `
    CALL log_deletion(?, ?, ?, ?, ?, ?);
    `;

    return query(sql, [user_id, site_id, table_name, record_id, field_names, values]);
}
