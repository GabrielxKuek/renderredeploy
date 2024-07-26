import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const readCreation = async (site_id) => {
  try {
    const result = await prisma.um_creation_log.findMany({
      where: {
        site_id,
      },
    });
    return result;
  } catch (error) {
    console.error('Error reading creation logs:', error);
    throw error;
  }
};

export const readCreationByDate = async (site_id, date) => {
  try {
    const result = await prisma.um_creation_log.findMany({
      where: {
        site_id,
        date: {
          gte: date,
        },
      },
    });
    return result;
  } catch (error) {
    console.error('Error reading creation logs by date:', error);
    throw error;
  }
};

export const selectCreationIp = async (ip) => {
  try {
    const result = await prisma.um_creation_log.findMany({
      where: {
        user_ip: ip,
      },
      select: {
        log_id: true,
        user_id: true,
        site_id: true,
        user_ip: true,
      },
    });
    return result;
  } catch (error) {
    console.error('Error selecting creation logs by IP:', error);
    throw error;
  }
};

export const selectCreationOs = async (os) => {
  try {
    const result = await prisma.um_creation_log.findMany({
      where: {
        os,
      },
      select: {
        log_id: true,
        user_id: true,
        site_id: true,
        os: true,
      },
    });
    return result;
  } catch (error) {
    console.error('Error selecting creation logs by OS:', error);
    throw error;
  }
};
