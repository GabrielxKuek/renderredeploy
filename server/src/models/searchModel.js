import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Search in creation logs
export async function searchCreationLogs(searchValue) {
  const isNumeric = !isNaN(parseInt(searchValue));

  return await prisma.um_creation_log.findMany({
    where: {
      OR: isNumeric ? [
        { log_id: parseInt(searchValue) },
        { user_id: parseInt(searchValue) },
        { site_id: parseInt(searchValue) },
      ] : [
        { record_id: { contains: searchValue } },
        { table_name: { contains: searchValue } },
      ]
    }
  });
}

// Search in modification logs
export async function searchModificationLogs(searchValue) {
  const isNumeric = !isNaN(parseInt(searchValue));

  return await prisma.um_modification_log.findMany({
    where: {
      OR: isNumeric ? [
        { log_id: parseInt(searchValue) },
        { user_id: parseInt(searchValue) },
        { site_id: parseInt(searchValue) },
      ] : [
        { record_id: { contains: searchValue } },
        { table_name: { contains: searchValue } },
      ]
    }
  });
}

// Search in deletion logs
export async function searchDeletionLogs(searchValue) {
  const isNumeric = !isNaN(parseInt(searchValue));

  return await prisma.um_deletion_log.findMany({
    where: {
      OR: isNumeric ? [
        { log_id: parseInt(searchValue) },
        { user_id: parseInt(searchValue) },
        { site_id: parseInt(searchValue) },
      ] : [
        { record_id: { contains: searchValue } },
        { table_name: { contains: searchValue } },
      ]
    }
  });
}