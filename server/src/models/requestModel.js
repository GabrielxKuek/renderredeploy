// imports
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// insert
module.exports.logRequest = async (user_id, site_id, request_method, api_requested, user_ip, user_os, request_success) => {
  const sql = `
    CALL log_request($1, $2, $3, $4, $5, $6, $7);
  `;

  try {
    const result = await prisma.$executeRaw(sql, user_id, site_id, request_method, api_requested, user_ip, user_os, request_success);
    return result;
  } catch (error) {
    console.error('Error executing logRequest:', error);
    throw error;
  }
};

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