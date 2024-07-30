import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// insert

export const insertCreation = async (user_id, site_id, table_name, record_id) => {
  const sql = `
  CALL log_creation($1, $2, $3, $4, $5, $6);
  `;

  try {
    const result = await prisma.$executeRaw`CALL log_creation(${user_id}, ${site_id}, ${table_name}, ${record_id});`
    return result;
  } catch (error) {
    console.error('Error executing logRemove:', error);
    throw error;
  }
};

// select

export const selectCreationByAll = async (site_id) => {
  try {
    const result = await prisma.$executeRaw`SELECT * FROM viewCreation(${site_id});`
    return result;
  } catch (error) {
    console.error('Error selecting creation logs:', error);
    throw error;
  }
};

export const selectCreationByDate = async (site_id, date) => {
  try {
    const result = await prisma.$executeRaw`SELECT * FROM viewCreationByDate(${site_id, date});`
    return result;
  } catch (error) {
    console.error('Error selecting creation logs by date:', error);
    throw error;
  }
};

export const selectCreationByIp = async (site_id, ip) => {
  try {
    const result = await prisma.$executeRaw`SELECT * FROM viewCreationByIp(${site_id, ip});`
    return result;
  } catch (error) {
    console.error('Error selecting creation logs by IP:', error);
    throw error;
  }
};

export const selectCreationByOs = async (site_id, os) => {
  try {
    const result = await prisma.$executeRaw`SELECT * FROM viewCreationByOs(${site_id}, ${os});`
    return result;
  } catch (error) {
    console.error('Error selecting creation logs by OS:', error);
    throw error;
  }
};