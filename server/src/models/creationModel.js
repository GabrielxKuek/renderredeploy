import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// insert

// export const insertCreation = async (user_id, site_id, table_name, record_id) => {
//   const sql = `
//   CALL log_creation($1, $2, $3, $4);
//   `;

//   try {
//     const result = await prisma.$executeRaw`
//       CALL log_creation(${user_id}, ${site_id}, ${table_name}, ${record_id});
//     `;
//     return result;
//   } catch (error) {
//     console.error('Error executing logRemove:', error);
//     throw error;
//   }
// };

// export const insertCreation = async (user_id, site_id, table_name, record_id) => {
//   try {
//     const result = await prisma.$executeRaw`
//       INSERT INTO um_creation_log (user_id, site_id, table_name, record_id)
//       VALUES (${user_id}, ${site_id}, ${table_name}, ${record_id});
//     `;
//     return result;
//   } catch (error) {
//     console.error('Error inserting creation log:', error);
//     throw error;
//   }
// };

export const insertCreation = async (user_id, site_id, table_name, record_id) => {
  try {
    const result = await prisma.$executeRaw`
      CALL log_creation(${user_id}::INT, ${site_id}::INT, ${table_name}::VARCHAR(50), ${record_id}::VARCHAR(50)); 
    `;
    return result;
  } catch (error) {
    console.error('Error inserting creation log:', error);
    throw error;
  }
};

// select

export const selectCreationByAll = async (site_id) => {
  try {
    const result = await prisma.$queryRaw`SELECT * FROM viewCreation(${site_id}::INT);`
    return result;
  } catch (error) {
    console.error('Error selecting creation logs:', error);
    throw error;
  }
};

// // wanna ask about the function
// export const selectCreationByAll = async () => {
//   try {
//     const result = await prisma.$queryRaw`
//       SELECT * FROM um_creation_log
//       ORDER BY created_at DESC;
//     `

//     return result;
//   } catch (error) {
//     console.error('Error selecting creation logs:', error);
//     throw error;
//   }
// };

export const selectCreationByDate = async (site_id, date) => {
  try {
    const result = await prisma.$queryRaw`SET custom.user_id=1;`
    return result;
  } catch (error) {
    console.error('Error selecting creation logs by date:', error);
    throw error;
  }
};

// export const selectCreationByIp = async (site_id, ip) => {
//   try {
//     const result = await prisma.$queryRaw`SELECT * FROM viewCreationByIp(${site_id, ip});`
//     return result;
//   } catch (error) {
//     console.error('Error selecting creation logs by IP:', error);
//     throw error;
//   }
// };

// export const selectCreationByOs = async (site_id, os) => {
//   try {
//     const result = await prisma.$queryRaw`SELECT * FROM viewCreationByOs(${site_id}, ${os});`
//     return result;
//   } catch (error) {
//     console.error('Error selecting creation logs by OS:', error);
//     throw error;
//   }
// };