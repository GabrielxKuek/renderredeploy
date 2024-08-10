import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// insert

export const insertDeletion = async (user_id, site_id, table_name, record_id, field_names, values) => { 
    try {
      const result = await prisma.$queryRaw`CALL log_deletion(${user_id}::INT, ${site_id}::INT, ${table_name}::VARCHAR(50), ${record_id}::VARCHAR(50), ${field_names}::VARCHAR(50), ${values}::text::jsonb);`
      return result;
    } catch (error) {
      console.error('Error executing logRemove:', error);
      throw error;
    }
};

// select

// export const selectDeletionByAll = async (site_id) => {
//   try {
//     const result = await prisma.um_deletion_log.findMany({
//       where: {
//         site_id: site_id,
//       },
//       include: {
//         um_deletion_log_detail: true,
//       },
//     });
//     return result;
//   } catch (error) {
//     console.error('Error selecting deletion logs:', error);
//     throw error;
//   }
// };

export const selectDeletionByAll = async (site_id) => {
  try {
    const result = await prisma.$queryRaw`SELECT * FROM viewDeletion(${site_id}::INT);`
    return result;
  } catch (error) {
    console.error('Error selecting deletion logs:', error);
    throw error;
  }
}

// export const selectDeletionByAll = async (site_id) => {
//   try {
//     const result = await prisma.$queryRaw`
//       SELECT * FROM um_deletion_log
//       ORDER BY created_at DESC;
//     `
//     return result;
//   } catch (error) {
//     console.error('Error selecting deletion logs:', error);
//     throw error;
//   }
// }

export const selectDeletionByDate = async (site_id, date) => {
  try {
    const result = await prisma.$queryRaw`SELECT * FROM viewDeletionByDate(${site_id}::INT, ${date}::TIMESTAMP);`
    return result;
  } catch (error) {
    console.error('Error selecting deletion logs by date:', error);
    throw error;
  }
};

// export const selectDeletionByIp = async (ip) => {
//   try {
//     const result = await prisma.$queryRaw`SELECT * FROM viewDeletionByIp(${ip});`
//     return result;
//   } catch (error) {
//     console.error('Error selecting deletion logs by IP:', error);
//     throw error;
//   }
// };

// export const selectDeletionByOs = async (os) => {
//   try {
//     const result = await prisma.$queryRaw`SELECT * FROM viewDeletionByOs(${os});`
//     return result;
//   } catch (error) {
//     console.error('Error selecting deletion logs by OS:', error);
//     throw error;
//   }
// };