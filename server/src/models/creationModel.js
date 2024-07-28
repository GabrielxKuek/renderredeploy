import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// insert

export const insertCreation = async (user_id, site_id, table_name, record_id) => {

  
    try {
      const result = await prisma.um_creation_log.create({
        data: {
          user_id: user_id,
          site_id: site_id,
          table_name: table_name,
          record_id: record_id
        }
      })
      return result;
    } catch (error) {
      console.error('Error executing insertCreation:', error);
      throw error;
    }
  };

// select

export const selectCreationByAll = async (site_id) => {
  try {
    const result = await prisma.um_creation_log.findMany({
      where: {
        site_id: site_id,
      },
    });
    return result;
  } catch (error) {
    console.error('Error selecting creation logs:', error);
    throw error;
  }
};

export const selectCreationByDate = async (site_id, date) => {
  try {
    const result = await prisma.um_creation_log.findMany({
      where: {
        site_id,
        created_at: {
          gte: date,
        },
      },
    });
    return result;
  } catch (error) {
    console.error('Error selecting creation logs by date:', error);
    throw error;
  }
};

export const selectCreationByIp = async (site_id, ip) => {
  try {
    const result = await prisma.um_creation_log.findMany({
      where: {
        site_id: site_id,
        user_ip: ip,
      },
      // select: {
      //   log_id: true,
      //   user_id: true,
      //   site_id: true,
      //   user_ip: true,
      // },
    });
    return result;
  } catch (error) {
    console.error('Error selecting creation logs by IP:', error);
    throw error;
  }
};

export const selectCreationByOs = async (site_id, os) => {
  try {
    const result = await prisma.um_creation_log.findMany({
      where: {
        site_id: site_id,
        os: os,
      },
      // select: {
      //   log_id: true,
      //   user_id: true,
      //   site_id: true,
      //   os: true,
      // },
    });
    return result;
  } catch (error) {
    console.error('Error selecting creation logs by OS:', error);
    throw error;
  }
};