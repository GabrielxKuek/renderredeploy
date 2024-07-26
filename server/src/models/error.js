module.exports.TABLE_ALREADY_EXISTS_ERROR = class TABLE_ALREADY_EXISTS_ERROR extends (
  Error
) {
  constructor(tableName) {
    super(`Table ${tableName} already exists!`);
  }
};

module.exports.EMPTY_RESULT_ERROR = class EMPTY_RESULT_ERROR extends Error {};
module.exports.DUPLICATE_ENTRY_ERROR = class DUPLICATE_ENTRY_ERROR extends (
  Error
) {};

// See more: https://www.postgresql.org/docs/current/errcodes-appendix.html
module.exports.SQL_ERROR_CODE = {
  TABLE_ALREADY_EXISTS: "42P07",
  DUPLICATE_ENTRY: "23000",
};
