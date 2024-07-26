
// select all modification log
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