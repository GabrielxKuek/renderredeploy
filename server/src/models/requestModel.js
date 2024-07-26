const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ========================
// insert request
// ========================

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

// ========================
// select all request
// ========================

module.exports.selectAllRequestBySite = async (site_id) => {
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

module.exports.selectAllRequestByDate = async (site_id, date) => {
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

module.exports.selectAllRequestByIp = async (ip) => {
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

module.exports.selectAllRequestByOs = async (os) => {
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

// ========================
// select post request
// ========================

module.exports.selectPostRequestByDate = async (site_id, date) => {
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


module.exports.selectPostRequestByIp = async (ip) => {
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

module.exports.selectPostRequestByOs = async (os) => {
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

// ========================
// select put request
// ========================

module.exports.selectPutRequestByDate = async (site_id, date) => {
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

module.exports.selectPutRequestByIp = async (ip) => {
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

module.exports.selectPutRequestByOs = async (os) => {
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

// ========================
// select delete request
// ========================

module.exports.selectDeleteRequestByDate = async (site_id, date) => {
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

module.exports.selectDeleteRequestByIp = async (ip) => {
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

module.exports.selectDeleteRequestByOs = async (os) => {
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