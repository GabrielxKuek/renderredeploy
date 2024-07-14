const {query} = require('../database')

module.exports.readAll = () => {
    // SQL statement for retrieving all UM_Creation_Log
    const sql = `SELECT * FROM "UM_Creation_Log";`

    return query(sql, []).then(result => {
        return result.rows
    })
}