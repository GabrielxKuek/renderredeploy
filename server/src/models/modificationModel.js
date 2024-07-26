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

// read

module.exports.readAll = async (site_id) => {
  try {
    const result = await prisma.um_request_log.findMany({
      where: { site_id },
    });
    return result;
  } catch (error) {
    console.error('Error reading all logs:', error);
    throw error;
  }
};

module.exports.readAllByDate = async (site_id, date) => {
  try {
    const result = await prisma.um_request_log.findMany({
      where: {
        site_id,
        created_at: { gte: new Date(date) },
      },
    });
    return result;
  } catch (error) {
    console.error('Error reading logs by date:', error);
    throw error;
  }
};

module.exports.readCreationByDate = async (site_id, date) => {
  try {
    const result = await prisma.um_request_log.findMany({
      where: {
        site_id,
        created_at: { gte: new Date(date) },
        request_method: 'POST',
      },
    });
    return result;
  } catch (error) {
    console.error('Error reading creation logs by date:', error);
    throw error;
  }
};

module.exports.readModificationByDate = async (site_id, date) => {
  try {
    const result = await prisma.um_request_log.findMany({
      where: {
        site_id,
        created_at: { gte: new Date(date) },
        request_method: 'PUT',
      },
    });
    return result;
  } catch (error) {
    console.error('Error reading modification logs by date:', error);
    throw error;
  }
};

module.exports.readDeletionByDate = async (site_id, date) => {
  try {
    const result = await prisma.um_request_log.findMany({
      where: {
        site_id,
        created_at: { gte: new Date(date) },
        request_method: 'DELETE',
      },
    });
    return result;
  } catch (error) {
    console.error('Error reading deletion logs by date:', error);
    throw error;
  }
};

module.exports.readAllByIp = async (ip) => {
  try {
    const result = await prisma.um_request_log.findMany({
      where: { user_ip: ip },
    });
    return result;
  } catch (error) {
    console.error('Error reading logs by IP:', error);
    throw error;
  }
};

module.exports.readCreationByIp = async (ip) => {
  try {
    const result = await prisma.um_request_log.findMany({
      where: {
        user_ip: ip,
        request_method: 'POST',
      },
    });
    return result;
  } catch (error) {
    console.error('Error reading creation logs by IP:', error);
    throw error;
  }
};

module.exports.readModificationByIp = async (ip) => {
  try {
    const result = await prisma.um_request_log.findMany({
      where: {
        user_ip: ip,
        request_method: 'PUT',
      },
    });
    return result;
  } catch (error) {
    console.error('Error reading modification logs by IP:', error);
    throw error;
  }
};

module.exports.readDeletionByIp = async (ip) => {
  try {
    const result = await prisma.um_request_log.findMany({
      where: {
        user_ip: ip,
        request_method: 'DELETE',
      },
    });
    return result;
  } catch (error) {
    console.error('Error reading deletion logs by IP:', error);
    throw error;
  }
};

module.exports.readAllByOs = async (os) => {
  try {
    const result = await prisma.um_request_log.findMany({
      where: { user_os: os },
    });
    return result;
  } catch (error) {
    console.error('Error reading logs by OS:', error);
    throw error;
  }
};

module.exports.readCreationByOs = async (os) => {
  try {
    const result = await prisma.um_request_log.findMany({
      where: {
        user_os: os,
        request_method: 'POST',
      },
    });
    return result;
  } catch (error) {
    console.error('Error reading creation logs by OS:', error);
    throw error;
  }
};

module.exports.readModificationByOs = async (os) => {
  try {
    const result = await prisma.um_request_log.findMany({
      where: {
        user_os: os,
        request_method: 'PUT',
      },
    });
    return result;
  } catch (error) {
    console.error('Error reading modification logs by OS:', error);
    throw error;
  }
};

module.exports.readDeletionByOs = async (os) => {
  try {
    const result = await prisma.um_request_log.findMany({
      where: {
        user_os: os,
        request_method: 'DELETE',
      },
    });
    return result;
  } catch (error) {
    console.error('Error reading deletion logs by OS:', error);
    throw error;
  }
};

module.exports.logRequest = async (user_id, site_id, request_method, api_requested, user_ip, user_os, request_success) => {
  try {
    const result = await prisma.um_request_log.create({
      data: {
        user_id,
        site_id,
        request_method,
        api_requested,
        user_ip,
        user_os,
        request_success,
      },
    });
    return result;
  } catch (error) {
    console.error('Error logging request:', error);
    throw error;
  }
};
