import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Search in creation logs
export async function searchCreationLogs(searchValue, site_id) {
  const isNumeric = !isNaN(parseInt(searchValue));

  return await prisma.um_creation_log.findMany({
    where: {
      AND: [
        { site_id: parseInt(site_id) },
        {
          OR: isNumeric ? [
            { log_id: parseInt(searchValue) },
            { user_id: parseInt(searchValue) }
          ] : [
            { record_id: { equals: searchValue } },
            { table_name: { equals: searchValue } } 
          ]
        }
      ]
    },
    include: {
      um_user: {
        select: {
          email: true,
        },
      },
    },
  });
}

// Search in modification logs
export async function searchModificationLogs(searchValue, site_id) {
  const isNumeric = !isNaN(parseInt(searchValue));

  return await prisma.um_modification_log.findMany({
    where: {
      AND: [
        { site_id: parseInt(site_id) },
        {
          OR: isNumeric ? [
            { log_id: parseInt(searchValue) },
            { user_id: parseInt(searchValue) }
          ] : [
            { record_id: { equals: searchValue } },
            { table_name: { equals: searchValue } } 
          ]
        }
      ]
    },
    include: {
      um_user: {
        select: {
          email: true,
        },
      },
    },
  });
}

// Search in deletion logs
export async function searchDeletionLogs(searchValue, site_id) {
  const isNumeric = !isNaN(parseInt(searchValue));

  return await prisma.um_deletion_log.findMany({
    where: {
      AND: [
        { site_id: parseInt(site_id) },
        {
          OR: isNumeric ? [
            { log_id: parseInt(searchValue) },
            { user_id: parseInt(searchValue) }
          ] : [
            { record_id: { equals: searchValue } },
            { table_name: { equals: searchValue } } 
          ]
        }
      ]
    },
    include: {
      um_user: {
        select: {
          email: true,
        },
      },
    },
  });
}

// Search in request logs
export async function searchRequestLogs(searchValue, site_id) {
  // Determine if the search value is numeric
  const isNumeric = !isNaN(parseInt(searchValue));

  // Convert the search value to a string for text-based searches
  const searchString = searchValue.toString();

  return await prisma.$queryRaw`
    SELECT * FROM um_request_log
    WHERE 
      -- Check for numeric fields
      (log_id = ${isNumeric ? parseInt(searchValue) : null}
      OR user_id = ${isNumeric ? parseInt(searchValue) : null})

      -- Check for text-based fields with case-sensitive search
      OR request_method LIKE '%' || ${searchString} || '%'
      OR user_ip LIKE '%' || ${searchString} || '%'
      OR user_os LIKE '%' || ${searchString} || '%'
      OR api_requested LIKE '%' || ${searchString} || '%'
      
      -- Check for error_message field (JSONB) with case-insensitive search
      OR error_message::text ILIKE '%' || ${searchString} || '%'

      -- Filter by site_id
      AND site_id = ${site_id}
  `;
}

async function searchLogs(tableName, searchValue, site_id, selectedSearchOption) {
  const isNumeric = !isNaN(parseInt(searchValue));

  let searchCondition = {};

  switch (selectedSearchOption) {
    case 'log_id':
      if (isNumeric) {
        searchCondition = { log_id: parseInt(searchValue) };
      } else {
        throw new Error('Invalid search option provided.');
      }
      break;
    case 'user_id':
      if (isNumeric) {
        searchCondition = { user_id: parseInt(searchValue) };
      } else {
        throw new Error('Invalid search option provided.');
      }
      break;
    case 'record_id':
      searchCondition = { record_id: { equals: searchValue } };
      break;
    case 'table_name':
      searchCondition = { table_name: { equals: searchValue } };
      break;
    default:
      throw new Error('Invalid search option provided.');
  }

  return await prisma[tableName].findMany({
    where: {
      AND: [
        { site_id: parseInt(site_id) },
        searchCondition
      ]
    },
    include: {
      um_user: {
        select: {
          email: true,
        },
      },
    },
  });
}

export async function queryCreationLogs(searchValue, site_id, selectedSearchOption) {
  return await searchLogs('um_creation_log', searchValue, site_id, selectedSearchOption);
}

export async function queryModificationLogs(searchValue, site_id, selectedSearchOption) {
  return await searchLogs('um_modification_log', searchValue, site_id, selectedSearchOption);
}

export async function queryDeletionLogs(searchValue, site_id, selectedSearchOption) {
  return await searchLogs('um_deletion_log', searchValue, site_id, selectedSearchOption);
}

export async function queryRequestLogs(searchValue, site_id, selectedSearchOption, selectedMethod) {
  const isNumeric = !isNaN(parseInt(searchValue));

  let searchCondition = {};

  switch (selectedSearchOption) {
    case 'log_id':
      if (isNumeric) {
        searchCondition = { log_id: parseInt(searchValue) };
      } else {
        throw new Error('Invalid search option provided.');
      }
      break;
    case 'user_id':
      if (isNumeric) {
        searchCondition = { user_id: parseInt(searchValue) };
      } else {
        throw new Error('Invalid search option provided.');
      }
      break;
    case 'api_requested':
      searchCondition = { api_requested: { equals: searchValue } };
      break;
    default:
      throw new Error('Invalid search option provided.');
  }

  return await prisma.um_request_log.findMany({
    where: {
      AND: [
        { site_id: parseInt(site_id) },
        searchCondition,
        { request_method: selectedMethod }
      ]
    },
    include: {
      um_user: {
        select: {
          email: true,
        },
      },
    },
  });
}