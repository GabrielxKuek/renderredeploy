import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Search in creation logs
export async function searchCreationLogs(searchValue) {
  return await prisma.um_creation_log.findMany({
    where: {
      OR: [
        { log_id: { contains: searchValue, mode: 'insensitive' } },
        { user_id: { contains: searchValue, mode: 'insensitive' } },
        { site_id: { contains: searchValue, mode: 'insensitive' } },
        { table_name: { contains: searchValue, mode: 'insensitive' } },
        { record_id: { contains: searchValue, mode: 'insensitive' } },
        { created_at: { contains: searchValue, mode: 'insensitive' } },
      ]
    }
  });
}

// Search in modification logs
export async function searchModificationLogs(searchValue) {
  return await prisma.um_modification_log.findMany({
    where: {
      OR: [
        { log_id: { contains: searchValue, mode: 'insensitive' } },
        { user_id: { contains: searchValue, mode: 'insensitive' } },
        { site_id: { contains: searchValue, mode: 'insensitive' } },
        { table_name: { contains: searchValue, mode: 'insensitive' } },
        { record_id: { contains: searchValue, mode: 'insensitive' } },
        { created_at: { contains: searchValue, mode: 'insensitive' } },
      ]
    }
  });
}

// Search in deletion logs
export async function searchDeletionLogs(searchValue) {
  return await prisma.um_deletion_log.findMany({
    where: {
      OR: [
        { log_id: { contains: searchValue, mode: 'insensitive' } },
        { user_id: { contains: searchValue, mode: 'insensitive' } },
        { site_id: { contains: searchValue, mode: 'insensitive' } },
        { table_name: { contains: searchValue, mode: 'insensitive' } },
        { record_id: { contains: searchValue, mode: 'insensitive' } },
        { created_at: { contains: searchValue, mode: 'insensitive' } },
      ]
    }
  });
}
