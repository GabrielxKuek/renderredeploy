const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// insert

module.exports.insertRequest = async (user_id, site_id, request_method, api_requested, user_ip, user_os, request_success) => {
    const sql = `
      CALL log_request($1, $2, $3, $4, $5, $6, $7);
    `;
  
    try {
      const result = await prisma.$executeRaw(sql, user_id, site_id, request_method, api_requested, user_ip, user_os, request_success);
      return result;
    } catch (error) {
      console.error('Error executing logRequest:', error);
      throw error;
    }
  };

// select

module.exports.selectAll = async (site_id) => {
    try {
        const result = await prisma.um_request_log.findMany({
            where: { site_id },
        });
        return result;
    } catch (error) {
        console.error('Error selecting all logs:', error);
        throw error;
    }
};

module.exports.selectAllByDate = async (site_id, date) => {
    try {
        const result = await prisma.um_request_log.findMany({
            where: {
            site_id,
            created_at: { gte: new Date(date) },
            },
        });
        return result;
    } catch (error) {
        console.error('Error selecting logs by date:', error);
        throw error;
    }
};

module.exports.selectCreationByDate = async (site_id, date) => {
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
        console.error('Error selecting creation logs by date:', error);
        throw error;
    }
};

module.exports.selectModificationByDate = async (site_id, date) => {
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
        console.error('Error selecting modification logs by date:', error);
        throw error;
    }
};

module.exports.selectDeletionByDate = async (site_id, date) => {
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
        console.error('Error selecting deletion logs by date:', error);
        throw error;
    }
};

module.exports.selectAllByIp = async (ip) => {
    try {
        const result = await prisma.um_request_log.findMany({
            where: { user_ip: ip },
        });
        return result;
    } catch (error) {
        console.error('Error selecting logs by IP:', error);
        throw error;
    }
};

module.exports.selectCreationByIp = async (ip) => {
    try {
        const result = await prisma.um_request_log.findMany({
            where: {
            user_ip: ip,
            request_method: 'POST',
            },
        });
        return result;
    } catch (error) {
        console.error('Error selecting creation logs by IP:', error);
        throw error;
    }
};

module.exports.selectModificationByIp = async (ip) => {
    try {
        const result = await prisma.um_request_log.findMany({
            where: {
            user_ip: ip,
            request_method: 'PUT',
            },
        });
        return result;
    } catch (error) {
        console.error('Error selecting modification logs by IP:', error);
        throw error;
    }
};

module.exports.selectDeletionByIp = async (ip) => {
    try {
        const result = await prisma.um_request_log.findMany({
            where: {
            user_ip: ip,
            request_method: 'DELETE',
            },
        });
        return result;
    } catch (error) {
        console.error('Error selecting deletion logs by IP:', error);
        throw error;
    }
};

module.exports.selectAllByOs = async (os) => {
    try {
        const result = await prisma.um_request_log.findMany({
            where: { user_os: os },
        });
        return result;
    } catch (error) {
        console.error('Error selecting logs by OS:', error);
        throw error;
    }
};

module.exports.selectCreationByOs = async (os) => {
    try {
        const result = await prisma.um_request_log.findMany({
            where: {
            user_os: os,
            request_method: 'POST',
            },
        });
        return result;
    } catch (error) {
        console.error('Error selecting creation logs by OS:', error);
        throw error;
    }
};

module.exports.selectModificationByOs = async (os) => {
    try {
        const result = await prisma.um_request_log.findMany({
            where: {
            user_os: os,
            request_method: 'PUT',
            },
        });
        return result;
    } catch (error) {
        console.error('Error selecting modification logs by OS:', error);
        throw error;
    }
};

module.exports.selectDeletionByOs = async (os) => {
    try {
        const result = await prisma.um_request_log.findMany({
            where: {
            user_os: os,
            request_method: 'DELETE',
            },
        });
        return result;
    } catch (error) {
        console.error('Error selecting deletion logs by OS:', error);
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
