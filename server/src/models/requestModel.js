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

// ================================= //
// cast into oblivion                //
// ================================= //

// const {query} = require('../database')

// // =================================
// //  READ ALL
// // =================================
// module.exports.readAll = (site_id) => {
//     const sql = `
//     SELECT * FROM "um_request_log" WHERE site_id = ?;`

//     return query(sql,[site_id]).then(result => {
//         return result.rows
//     })
// }

// module.exports.readAllByDate = (site_id, date) => {
//     const sql = `
//     SELECT * FROM "um_request_log" WHERE site_id = ?
//     AND created_at >= ?;
//     `

//     return query(sql, [site_id, date]).then(result => {
//         return result.rows
//     })
// }

// module.exports.readCreationByDate = (site_id, date) => {
//     const sql = `
//     SELECT * FROM "um_request_log" WHERE site_id = ?
//     AND created_at >= ?
//     AND request_method = 'POST';`

//     return query(sql, [site_id, date]).then(result => {
//         return result.rows
//     })
// }

// module.exports.readModificationByDate = (site_id, date) => {
//     const sql = `
//     SELECT * FROM "um_request_log" WHERE site_id = ?
//     AND created_at >= ?
//     AND request_method = 'PUT';`

//     return query(sql, [site_id, date]).then(result => {
//         return result.rows
//     })
// }

// module.exports.readDeletionByDate = (site_id, date) => {
//     const sql = `
//     SELECT * FROM "um_request_log" WHERE site_id = ?
//     AND created_at >= ?
//     AND request_method = 'DELETE';`

//     return query(sql, [site_id, date]).then(result => {
//         return result.rows
//     })
// }

// module.exports.readAllByip = (ip) => {
//     const sql = `
//     SELECT * FROM "um_request_log" WHERE user_ip = ?;
//     `

//     return query(sql, [ip]).then(result => {
//         return result.rows
//     })
// }

// module.exports.readCreationByip = (ip) => {
//     const sql = `
//     SELECT * FROM "um_request_log" WHERE user_ip = ?
//     AND request_method = 'POST';
//     `

//     return query(sql, [ip]).then(result => {
//         return result.rows
//     })
// }

// module.exports.readModificationByip = (ip) => {
//     const sql = `
//     SELECT * FROM "um_request_log" WHERE user_ip = ?
//     AND request_method = 'PUT';
//     `

//     return query(sql, [ip]).then(result => {
//         return result.rows
//     })
// }

// module.exports.readDeletionByip = (ip) => {
//     const sql = `
//     SELECT * FROM "um_request_log" WHERE user_ip = ?
//     AND request_method = 'DELETE';
//     `

//     return query(sql, [ip]).then(result => {
//         return result.rows
//     })
// }

// module.exports.readAllByOs = (Os) => {
//     const sql = `
//     SELECT * FROM "um_request_log" WHERE user_os = ?;
//     `

//     return query(sql, [Os]).then(result => {
//         return result.rows
//     })
// }

// module.exports.readCreationByOs = (Os) => {
//     const sql = `
//     SELECT * FROM "um_request_log" WHERE user_os = ?
//     AND request_method = 'POST';
//     `

//     return query(sql, [Os]).then(result => {
//         return result.rows
//     })
// }

// module.exports.readModificationByOs = (Os) => {
//     const sql = `
//     SELECT * FROM "um_request_log" WHERE user_os = ?
//     AND request_method = 'PUT';
//     `

//     return query(sql, [Os]).then(result => {
//         return result.rows
//     })
// }

// module.exports.readDeletionByOs = (Os) => {
//     const sql = `
//     SELECT * FROM "um_request_log" WHERE user_os = ?
//     AND request_method = 'DELETE';
//     `

//     return query(sql, [Os]).then(result => {
//         return result.rows
//     })
// }

// module.exports.logRequest = (user_id, site_id, request_method,api_requested, user_ip, user_os, request_success) => {
//     const sql = `
//     INSERT INTO "um_request_log" 
//     (user_id, site_id, request_method, api_requested, user_ip, user_os, request_success)
//     VALUES
//     (?,?,?,?,?,?,?);
//     `
//     const data = [user_id, site_id, request_method, api_requested, user_ip, user_os, request_success]

//     return query(sql, data).then(result => {
//         return result
//     })
// }