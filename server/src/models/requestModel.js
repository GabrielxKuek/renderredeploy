import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ========================
// insert request
// ========================

// export const insertRequest = async (user_id, site_id, request_method, api_requested, user_ip, user_os, error_message) => {
//   try {
//     const result = await prisma.$executeRaw`CALL log_request(${user_id}, ${site_id}, ${request_method}, ${api_requested}, ${user_ip}, ${user_os}, ${error_message});`;
//     return result;
//   } catch (error) {
//     console.error('Error executing logRequest:', error);
//     throw error;
//   }
// };

// export const insertRequest = async (user_id, site_id, request_method, api_requested, user_ip, user_os) => {
//     try {
//       const result = await prisma.um_request_log.create({
//         data: {
//           user_id,
//           site_id,
//           request_method,
//           api_requested,
//           user_ip,
//           user_os,
//         }
//       });
//       return result;
//     } catch (error) {
//       console.error('Error inserting request:', error);
//       throw error;
//     }
//   };

export const insertRequest = async (user_id, site_id, request_method, api_requested, user_ip, user_os) => {
    try {
      const result = await prisma.$queryRaw`
        CALL log_request(${user_id}, ${site_id}, ${request_method}, ${api_requested}, ${user_ip}, ${user_os}, ${null})
      `;
      return result;
    } catch (error) {
    logRequest(user_id, site_id, error);
      console.error('Error inserting request:', error);
      throw error;
    }
  };

// ========================
// select all request
// ========================

export const selectAllRequestBySite = async (site_id) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequest(${site_id});`
        return result;
    } catch (error) {
        console.error('Error selecting all logs:', error);
        throw error;
    }
};

export const selectAllRequestByDate = async (site_id, date) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestByDate(${site_id}, ${date});`
        return result;
    } catch (error) {
        console.error('Error selecting logs by date:', error);
        throw error;
    }
};

export const selectAllRequestByIp = async (ip) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestByIp(${ip});`
        return result;
    } catch (error) {
        console.error('Error selecting logs by IP:', error);
        throw error;
    }
};

export const selectAllRequestByOs = async (os) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestByOs(${os});`
        return result;
    } catch (error) {
        console.error('Error selecting logs by OS:', error);
        throw error;
    }
};

// ========================
// select post request
// ========================

export const selectPostRequestByDate = async (site_id, date) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByDate(${site_id}, ${date}, 'POST');`
        return result;
    } catch (error) {
        console.error('Error selecting creation logs by date:', error);
        throw error;
    }
};


export const selectPostRequestByIp = async (ip) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByIp(${ip}, 'POST');`
        return result;
    } catch (error) {
        console.error('Error selecting creation logs by IP:', error);
        throw error;
    }
};

export const selectPostRequestByOs = async (os) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByOs(${os}, 'POST');`
        return result;
    } catch (error) {
        console.error('Error selecting creation logs by OS:', error);
        throw error;
    }
};

// ========================
// select put request
// ========================

export const selectPutRequestByDate = async (site_id, date) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByDate(${site_id}, ${date}, 'PUT');`
        return result;
    } catch (error) {
        console.error('Error selecting modification logs by date:', error);
        throw error;
    }
};

export const selectPutRequestByIp = async (ip) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByIp(${ip}, 'PUT');`
        return result;
    } catch (error) {
        console.error('Error selecting modification logs by IP:', error);
        throw error;
    }
};

export const selectPutRequestByOs = async (os) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByOs(${os}, 'PUT');`
        return result;
    } catch (error) {
        console.error('Error selecting modification logs by OS:', error);
        throw error;
    }
};

// ========================
// select delete request
// ========================

export const selectDeleteRequestByDate = async (site_id, date) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByDate(${site_id}, ${date}, 'DELETE');`
        return result;
    } catch (error) {
        console.error('Error selecting deletion logs by date:', error);
        throw error;
    }
};

export const selectDeleteRequestByIp = async (ip) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByIp(${ip}, 'DELETE');`
        return result;
    } catch (error) {
        console.error('Error selecting deletion logs by IP:', error);
        throw error;
    }
};

export const selectDeleteRequestByOs = async (os) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByOs(${os}, 'DELETE');`
        return result;
    } catch (error) {
        console.error('Error selecting deletion logs by OS:', error);
        throw error;
    }
};