// select all from creation log table
module.exports.readCreation = (site_id) => {
    const sql = `
    SELECT * FROM "UM_Creation_Log" WHERE site_id = ?;
    `
    return query(sql, [site_id]).then(result => {
        return result.rows
    })
}

// select all from creation log detail table by date
module.exports.readCreationByDate = (site_id, date) => {
    const sql = `
    SELECT *
    FROM "um_creation_log"
    WHERE site_id = ?
    AND date >= ?;
    `

    return query(sql, [site_id, date])
}

// select creation logs user_ip
module.exports.selectCreationIp = (ip) => {
    const sql = `
    SELECT log_id, user_id, site_id, user_ip
    FROM "UM_Creation_Log";
    `

    return query(sql, [ip])
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