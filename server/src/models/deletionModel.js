// select all from deletion log table
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