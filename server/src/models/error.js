export class TABLE_ALREADY_EXISTS_ERROR extends Error {
  constructor(tableName) {
    super(`Table ${tableName} already exists!`);
  }
}

export class EMPTY_RESULT_ERROR extends Error {}

export class DUPLICATE_ENTRY_ERROR extends Error {}

// See more: https://www.postgresql.org/docs/current/errcodes-appendix.html
export const SQL_ERROR_CODE = {
  TABLE_ALREADY_EXISTS: "42P07",
  DUPLICATE_ENTRY: "23000",
};
