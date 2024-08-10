import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Search in creation logs
export async function searchCreationLogs(searchValue, site_id) {
  const isNumeric = !isNaN(parseInt(searchValue));

  // return await prisma.um_creation_log.findMany({
  //   where: {
  //     AND: [
  //       { site_id: parseInt(site_id) },
  //       {
  //         OR: isNumeric ? [
  //           { log_id: parseInt(searchValue) },
  //           { user_id: parseInt(searchValue) }
  //         ] : [
  //           { record_id: { equals: searchValue } },
  //           { table_name: { equals: searchValue } } 
  //         ]
  //       }
  //     ]
  //   }
  // });

  const logs = await prisma.um_creation_log.findMany({
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
          user_name: true
        }
      }
    }
  });

  let relatedRecordId;

  if (logs.length > 0) {
    const tableName = logs[0].table_name; // Assuming table_name is consistent among results

    if (tableName) {
      try {
        // Use prisma.$queryRaw to dynamically query the specified table
        const recordIdResults = await prisma.$queryRawUnsafe(`
          SELECT record_id FROM ${tableName}
          WHERE site_id = $1
        `, parseInt(site_id));

        relatedRecordId = recordIdResults.map(result => result.record_id);
      } catch (error) {
        console.error('Error querying the table:', error);
      }
    }
  }

}

// Search in modification logs
export async function searchModificationLogs(searchValue, site_id) {
  const isNumeric = !isNaN(parseInt(searchValue));

  // return await prisma.um_modification_log.findMany({
  //   where: {
  //     AND: [
  //       { site_id: parseInt(site_id) },
  //       {
  //         OR: isNumeric ? [
  //           { log_id: parseInt(searchValue) },
  //           { user_id: parseInt(searchValue) }
  //         ] : [
  //           { record_id: { equals: searchValue } },
  //           { table_name: { equals: searchValue } } 
  //         ]
  //       }
  //     ]
  //   }
  // });

  let modificationLogs = await prisma.um_modification_log.findMany({
    where: {
      AND: [
        { site_id: parseInt(site_id) },
        {
          OR: isNumeric
            ? [
                { log_id: parseInt(searchValue) },
                { user_id: parseInt(searchValue) },
              ]
            : [
                { record_id: { equals: searchValue } },
                { table_name: { equals: searchValue } },
              ],
        },
      ],
    },
    include: {
      um_user: {
        select: {
          user_name: true,
        },
      },
    },
  });

  // If table_name is provided in the searchValue, find the corresponding record_id
  if (!isNumeric && searchValue) {
    const relatedRecordQuery = await prisma.$queryRawUnsafe(`
      SELECT record_id FROM ${searchValue}
      WHERE site_id = $1
    `, parseInt(site_id));

    // Map the result to include record_id
    modificationLogs = modificationLogs.map(log => {
      const relatedRecord = relatedRecordQuery.find(record => record.record_id === log.record_id);
      return {
        ...log,
        record_id: relatedRecord ? relatedRecord.record_id : log.record_id,
      };
    });
  }

  return modificationLogs;
  
}

// Search in deletion logs
export async function searchDeletionLogs(searchValue, site_id) {
  const isNumeric = !isNaN(parseInt(searchValue));

  // return await prisma.um_deletion_log.findMany({
  //   where: {
  //     AND: [
  //       { site_id: parseInt(site_id) },
  //       {
  //         OR: isNumeric ? [
  //           { log_id: parseInt(searchValue) },
  //           { user_id: parseInt(searchValue) }
  //         ] : [
  //           { record_id: { equals: searchValue } },
  //           { table_name: { equals: searchValue } } 
  //         ]
  //       }
  //     ]
  //   }
  // });

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
      user: {  // Include the related user data
        select: {
          user_name: true
        }
      }
    }
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
