import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// import {logRequest} from '../app.js'


export const insertCreation = async (user_id, site_id, table_name, record_id) => {
  try {
    // const result = await prisma.$executeRaw`
    //   INSERT INTO um_creation_log (user_id, site_id, table_name, record_id)
    //   VALUES (${user_id}, ${site_id}, ${table_name}, ${record_id});
    // `;
    prisma.um_creation_log.create({
      data: {
        user_id,
        site_id,
        table_name,
        record_id,
        created_at: new Date()
      }
    })
  } catch (error) {
    console.error('Error inserting creation log:', error);
    throw error;
  }
};

// select

export const selectCreationByAll = async (site_id) => {
  try {
    const result = await prisma.$queryRaw`SELECT * FROM viewCreation(${site_id});`
    return result;
  } catch (error) {
    console.error('Error selecting creation logs:', error);
    throw error;
  }
};

export const selectCreationByDate = async (site_id, date) => {
  try {
    const result = await prisma.$queryRaw`SELECT * FROM viewCreationByDate(${site_id, date});`
    return result;
  } catch (error) {
    console.error('Error selecting creation logs by date:', error);
    throw error;
  }
};

export const selectCreationByIp = async (site_id, ip) => {
  try {
    const result = await prisma.$queryRaw`SELECT * FROM viewCreationByIp(${site_id, ip});`
    return result;
  } catch (error) {
    console.error('Error selecting creation logs by IP:', error);
    throw error;
  }
};

export const selectCreationByOs = async (site_id, os) => {
  try {
    const result = await prisma.$queryRaw`SELECT * FROM viewCreationByOs(${site_id}, ${os});`
    return result;
  } catch (error) {
    console.error('Error selecting creation logs by OS:', error);
    throw error;
  }
};