import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Search in creation logs
export async function searchCreationLogs(searchValue, site_id) {
  const isNumeric = !isNaN(parseInt(searchValue));

  return await prisma.um_creation_log.findMany({
    where: {
      site_id: site_id,
      OR: isNumeric ? [
        { log_id: parseInt(searchValue) },
        { user_id: parseInt(searchValue) },
      ] : [
        { record_id: { contains: searchValue } },
        { table_name: { contains: searchValue } },
      ]
    }
  });
}

// Search in modification logs
export async function searchModificationLogs(searchValue, site_id) {
  const isNumeric = !isNaN(parseInt(searchValue));

  return await prisma.um_modification_log.findMany({
    where: {
      site_id: site_id,
      OR: isNumeric ? [
        { log_id: parseInt(searchValue) },
        { user_id: parseInt(searchValue) },
      ] : [
        { record_id: { contains: searchValue } },
        { table_name: { contains: searchValue } },
      ]
    }
  });
}

// Search in deletion logs
export async function searchDeletionLogs(searchValue, site_id) {
  const isNumeric = !isNaN(parseInt(searchValue));

  return await prisma.um_deletion_log.findMany({
    where: {
      site_id: site_id,
      OR: isNumeric ? [
        { log_id: parseInt(searchValue) },
        { user_id: parseInt(searchValue) },
      ] : [
        { record_id: { contains: searchValue } },
        { table_name: { contains: searchValue } },
      ]
    }
  });
}


export async function searchRequestLogs(searchValue, site_id) {
  const isNumeric = !isNaN(parseInt(searchValue));
  
  return await prisma.$queryRaw`
    SELECT * FROM um_request_log
    WHERE 
      (log_id = ${parseInt(searchValue)} OR user_id = ${parseInt(searchValue)} OR site_id = ${parseInt(searchValue)})
      OR (error_message::text LIKE '%' || ${searchValue} || '%')
  `;
}