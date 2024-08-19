import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

await prisma.$disconnect();
await prisma.$connect();

// insert

export const insertModification = async (user_id, site_id, table_name, record_id, field_names, old_values) => {
    try {
      const result = await prisma.$queryRaw`CALL log_modification(${user_id}::INT, ${site_id}::INT, ${table_name}::VARCHAR(50), ${record_id}::VARCHAR(50), ${field_names}::VARCHAR(50), ${old_values}::text::jsonb);`
      return result;
    } catch (error) {
      console.error('Error executing logChange:', error);
      throw error;
    }
  };

// select

export const selectModificationByAll = async (site_id) => {
  try {
    const result = await prisma.$queryRaw`SELECT * FROM viewModification(${site_id}::INT);`
    return result;
  } catch (error) {
    console.error('Error reading modification logs:', error);
    throw error;
  }
};

// export const selectModificationByAll = async (site_id) => {
//   try {
//     const result = await prisma.$queryRaw`
//       SELECT * FROM um_modification_log
//       ORDER BY created_at DESC;
//     `
//     return result;
//   } catch (error) {
//     console.error('Error reading modification logs:', error);
//     throw error;
//   }
// };

export const selectModificationByDate = async (site_id, date) => {
  try {
    const result = await prisma.$queryRaw`SELECT * FROM viewModificationByDate(${site_id}::INT, ${date}::text::TIMESTAMP);`
    return result;
  } catch (error) {
    console.error('Error reading modification logs by date:', error);
    throw error;
  }
};

// export const selectModificationIp = async (ip) => {
//   try {
//     const result = await prisma.$queryRaw`SELECT * FROM viewModificationByIp(${ip});`
//     return result;
//   } catch (error) {
//     console.error('Error selecting modification logs by IP:', error);
//     throw error;
//   }
// };

// export const selectModificationOs = async (os) => {
//   try {
//     const result = await prisma.$queryRaw`SELECT * FROM viewModificationByOs(${os});`
//     return result;
//   } catch (error) {
//     console.error('Error selecting modification logs by OS:', error);
//     throw error;
//   }
// };