import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// insert

export const insertDeletion = async (user_id, site_id, table_name, record_id, field_names, values) => {
    const sql = `
      CALL log_deletion($1, $2, $3, $4, $5, $6);
    `;
  
    try {
      const result = await prisma.$executeRaw(sql, user_id, site_id, table_name, record_id, field_names, values);
      return result;
    } catch (error) {
      console.error('Error executing logRemove:', error);
      throw error;
    }
};

// select

export const selectDeletionByAll = async (site_id) => {
  try {
    const result = await prisma.um_deletion_log.findMany({
      where: {
        site_id,
      },
      include: {
        um_deletion_log_detail: true,
      },
    });
    return result;
  } catch (error) {
    console.error('Error selecting deletion logs:', error);
    throw error;
  }
};

export const selectDeletionByDate = async (site_id, date) => {
  try {
    const result = await prisma.um_deletion_log.findMany({
      where: {
        site_id,
        date: {
          gte: date,
        },
      },
    });
    return result;
  } catch (error) {
    console.error('Error selecting deletion logs by date:', error);
    throw error;
  }
};

export const selectDeletionByIp = async (ip) => {
  try {
    const result = await prisma.um_deletion_log.findMany({
      where: {
        user_ip: ip,
      },
      include: {
        um_deletion_log_detail: true,
      },
    });
    return result;
  } catch (error) {
    console.error('Error selecting deletion logs by IP:', error);
    throw error;
  }
};

export const selectDeletionByOs = async (os) => {
  try {
    const result = await prisma.um_deletion_log.findMany({
      where: {
        os,
      },
      include: {
        um_deletion_log_detail: true,
      },
    });
    return result;
  } catch (error) {
    console.error('Error selecting deletion logs by OS:', error);
    throw error;
  }
};