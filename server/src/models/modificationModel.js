import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// insert

export const insertModification = async (user_id, site_id, table_name, record_id, field_names, old_values) => {
    try {
      const result = await prisma.$queryRaw`CALL log_modification(${user_id}, ${site_id}, ${table_name}, ${record_id}, ${field_names}, ${old_values});`
      return result;
    } catch (error) {
      console.error('Error executing logChange:', error);
      throw error;
    }
  };

// select

export const selectModification = async (site_id) => {
  try {
    const result = await prisma.$queryRaw`SELECT * FROM viewModification(${site_id});`
    return result;
  } catch (error) {
    console.error('Error reading modification logs:', error);
    throw error;
  }
};

export const selectModificationByDate = async (site_id, date) => {
  try {
    const result = await prisma.$queryRaw`SELECT * FROM viewModificationByDate(${site_id}, ${date});`
    return result;
  } catch (error) {
    console.error('Error reading modification logs by date:', error);
    throw error;
  }
};

export const selectModificationIp = async (ip) => {
  try {
    const result = await prisma.$queryRaw`SELECT * FROM viewModificationByIp(${ip});`
    return result;
  } catch (error) {
    console.error('Error selecting modification logs by IP:', error);
    throw error;
  }
};

export const selectModificationOs = async (os) => {
  try {
    const result = await prisma.$queryRaw`SELECT * FROM viewModificationByOs(${os});`
    return result;
  } catch (error) {
    console.error('Error selecting modification logs by OS:', error);
    throw error;
  }
};