import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const readDeletion = async (site_id) => {
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
    console.error('Error reading deletion logs:', error);
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
    console.error('Error reading deletion logs by date:', error);
    throw error;
  }
};

export const selectDeletionIp = async (ip) => {
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

export const selectDeletionOs = async (os) => {
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
