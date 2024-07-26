import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// insert

export const insertModification = async (user_id, site_id, table_name, record_id, field_names, old_values) => {
    const sql = `
      CALL log_modification($1, $2, $3, $4, $5, $6);
    `;
  
    try {
      const result = await prisma.$executeRaw(sql, user_id, site_id, table_name, record_id, field_names, old_values);
      return result;
    } catch (error) {
      console.error('Error executing logChange:', error);
      throw error;
    }
};

// select

export const selectModification = async (site_id) => {
  try {
    const result = await prisma.um_modification_log.findMany({
      where: {
        site_id,
      },
      include: {
        um_modification_log_detail: true,
      },
    });
    return result;
  } catch (error) {
    console.error('Error selecting modification logs:', error);
    throw error;
  }
};

export const selectModificationByDate = async (site_id, date) => {
  try {
    const result = await prisma.um_modification_log.findMany({
      where: {
        site_id,
        date: {
          gte: date,
        },
      },
    });
    return result;
  } catch (error) {
    console.error('Error selecting modification logs by date:', error);
    throw error;
  }
};

export const selectModificationIp = async (ip) => {
  try {
    const result = await prisma.um_modification_log.findMany({
      where: {
        user_ip: ip,
      },
      include: {
        um_modification_log_detail: true,
      },
      select: {
        log_id: true,
        user_id: true,
        site_id: true,
        user_ip: true,
        um_modification_log_detail: true,
      },
    });
    return result;
  } catch (error) {
    console.error('Error selecting modification logs by IP:', error);
    throw error;
  }
};

export const selectModificationOs = async (os) => {
  try {
    const result = await prisma.um_modification_log.findMany({
      where: {
        os,
      },
      include: {
        um_modification_log_detail: true,
      },
    });
    return result;
  } catch (error) {
    console.error('Error selecting modification logs by OS:', error);
    throw error;
  }
};
