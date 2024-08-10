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

// this one doesnt matter we have triggers to handle it
export const insertRequest = async (user_id = null, site_id = null, request_method = null, user_ip = null, user_os = null, api_requested = null, error_message = null, body = null, headers = null) => {
    try {
      const result = await prisma.$executeRaw`
        CALL log_request(
            ${user_id}::INT,
            ${site_id}::INT,
            ${request_method}::VARCHAR,
            ${user_ip}::VARCHAR,
            ${user_os}::VARCHAR,
            ${api_requested}::VARCHAR,
            ${error_message}::JSONB,
            ${body}::JSONB,
            ${headers}::JSONB
        )
      `;
      return result;
    } catch (error) {
      console.error('Error inserting request:', error);
      throw error;
    }
};  

// ========================
// select all request
// ========================

// export const selectAllRequestBySite = async (site_id) => {
//     try {
//         const result = await prisma.$queryRaw`SELECT * FROM viewRequest(${site_id});`
//         return result;
//     } catch (error) {
//         console.error('Error selecting all logs:', error);
//         throw error;
//     }
// };

export const selectAllRequestBySite = async (site_id) => {
    try {
        const result = await prisma.$queryRaw`
            SELECT * FROM viewRequestBySite(${site_id}::INT)
            ORDER BY created_at DESC;
        `
        return result;
    } catch (error) {
        console.error('Error selecting all logs:', error);
        throw error;
    }
};

export const selectAllRequestByDate = async (site_id, date) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestByDate(${site_id}::INT, ${date}::TIMESTAMP);`
        return result;
    } catch (error) {
        console.error('Error selecting logs by date:', error);
        throw error;
    }
};

export const selectAllRequestByIp = async (site_id, ip) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestByIp(${site_id}::INT, ${ip}::VARCHAR);`
        return result;
    } catch (error) {
        console.error('Error selecting logs by IP:', error);
        throw error;
    }
};

export const selectAllRequestByOs = async (site_id, os) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestByOs(${site_id}::INT, ${os}::VARCHAR);`
        return result;
    } catch (error) {
        console.error('Error selecting logs by OS:', error);
        throw error;
    }
};

// ========================
// select get request
// ========================

export const selectGetRequestByDate = async (site_id, date) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByDate(${site_id}::INT, ${date}::TIMESTAMP, 'GET'::VARCHAR);`
        return result;
    } catch (error) {
        console.error('Error selecting get logs by date:', error);
        throw error;
    }
};

export const selectGetRequestByIp = async (site_id, ip) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByIp(${site_id}::INT, ${ip}::VARCHAR, 'GET');`
        return result;
    } catch (error) {
        console.error('Error selecting get logs by IP:', error);
        throw error;
    }
};

export const selectGetRequestByOs = async (site_id, os) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByOs(${site_id}::INT, ${os}::VARCHAR, 'GET');`
        return result;
    } catch (error) {
        console.error('Error selecting get logs by OS:', error);
        throw error;
    }
};

// ========================
// select post request
// ========================

export const selectPostRequestByDate = async (site_id, date) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByDate(${site_id}::INT, ${date}::TIMESTAMP, 'POST');`
        return result;
    } catch (error) {
        console.error('Error selecting post logs by date:', error);
        throw error;
    }
};


export const selectPostRequestByIp = async (site_id, ip) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByIp(${site_id}::INT, ${ip}::VARCHAR, 'POST');`
        return result;
    } catch (error) {
        console.error('Error selecting post logs by IP:', error);
        throw error;
    }
};

export const selectPostRequestByOs = async (site_id, os) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByOs(${site_id}::INT, ${os}::VARCHAR, 'POST');`
        return result;
    } catch (error) {
        console.error('Error selecting post logs by OS:', error);
        throw error;
    }
};

// ========================
// select put request
// ========================

export const selectPutRequestByDate = async (site_id, date) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByDate(${site_id}::INT, ${date}::TIMESTAMP, 'PUT');`
        return result;
    } catch (error) {
        console.error('Error selecting put logs by date:', error);
        throw error;
    }
};

export const selectPutRequestByIp = async (site_id, ip) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByIp(${site_id}::INT, ${ip}::VARCHAR, 'PUT');`
        return result;
    } catch (error) {
        console.error('Error selecting put logs by IP:', error);
        throw error;
    }
};

export const selectPutRequestByOs = async (site_id, os) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByOs(${site_id}::INT, ${os}::VARCHAR, 'PUT');`
        return result;
    } catch (error) {
        console.error('Error selecting put logs by OS:', error);
        throw error;
    }
};

// ========================
// select delete request
// ========================

export const selectDeleteRequestByDate = async (site_id, date) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByDate(${site_id}::INT, ${date}::TIMESTAMP, 'DELETE');`
        return result;
    } catch (error) {
        console.error('Error selecting delete logs by date:', error);
        throw error;
    }
};

export const selectDeleteRequestByIp = async (site_id, ip) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByIp(${site_id}::INT, ${ip}::VARCHAR, 'DELETE');`
        return result;
    } catch (error) {
        console.error('Error selecting delete logs by IP:', error);
        throw error;
    }
};

export const selectDeleteRequestByOs = async (site_id, os) => {
    try {
        const result = await prisma.$queryRaw`SELECT * FROM viewRequestTypeByOs(${site_id}::INT, ${os}::VARCHAR, 'DELETE');`
        return result;
    } catch (error) {
        console.error('Error selecting delete logs by OS:', error);
        throw error;
    }
};