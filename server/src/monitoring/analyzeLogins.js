// Monitoring multiple failed password attempts within the last hour.

async function getFailedLoginsFromLastHour() {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  
    return await prisma.um_request_log.findMany({
      where: {
        created_at: {
          gte: oneHourAgo,
        },
        api_requested: 'api/user/login',
        error_message: 'wrong password',
      },
      select: {
        user_id: true,
        site_id: true,
        created_at: true,
      },
    });
  }
  
  function analyzeFailedLogins(logins) {
    const suspiciousActivities = [];
    const userFailures = {};
  
    logins.forEach(login => {
      const { user_id, site_id, created_at } = login;
      const timestamp = new Date(created_at);
      const userKey = `${user_id}-${site_id}`;
  
      if (!userFailures[userKey]) {
        userFailures[userKey] = [];
      }
  
      userFailures[userKey].push(timestamp);
  
      // Check if the user has failed the password 3 times within 10 minutes
      if (userFailures[userKey].length >= 3 &&
          (userFailures[userKey][userFailures[userKey].length - 1] - userFailures[userKey][userFailures[userKey].length - 3]) < 10 * 60 * 1000) {
        suspiciousActivities.push({
          user_id,
          site_id,
          type: 'multiple-failed-logins',
          details: userFailures[userKey],
        });
      }
    });
  
    return suspiciousActivities;
  }
  
  // Schedule this function to run every hour
  cron.schedule('0 * * * *', async () => {
    try {
      const failedLogins = await getFailedLoginsFromLastHour();
      const suspiciousActivities = analyzeFailedLogins(failedLogins);
  
      if (suspiciousActivities.length > 0) {
        sendAlertEmail(suspiciousActivities);
      }
    } catch (error) {
      console.error('Error monitoring failed logins:', error);
    }
  });

  async function getLoginsForLast12Hours() {
    const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);
  
    return await prisma.um_request_log.findMany({
      where: {
        created_at: {
          gte: twelveHoursAgo,
        },
        api_requested: 'api/user/login',
      },
      select: {
        user_id: true,
        site_id: true,
        user_ip: true,
        created_at: true,
      },
    });
  }

  // Monitoring different ip logins within the past 12 hours
  
  function analyzeDifferentIPLogins(logins) {
    const suspiciousActivities = [];
    const userLogins = {};
  
    logins.forEach(login => {
      const { user_id, site_id, user_ip } = login;
      const userKey = `${user_id}-${site_id}`;
  
      if (!userLogins[userKey]) {
        userLogins[userKey] = new Set();
      }
  
      userLogins[userKey].add(user_ip);
  
      // Check if there are multiple IPs
      if (userLogins[userKey].size > 1) {
        suspiciousActivities.push({
          user_id,
          site_id,
          type: 'ip-address-change',
          details: Array.from(userLogins[userKey]),
        });
      }
    });
  
    return suspiciousActivities;
  }
  
  // Schedule this function to run every 12 hours
  cron.schedule('0 */12 * * *', async () => {
    try {
      const logs = await getLoginsForLast12Hours();
      const suspiciousActivities = analyzeDifferentIPLogins(logs);
  
      if (suspiciousActivities.length > 0) {
        sendAlertEmail(suspiciousActivities);
      }
    } catch (error) {
      console.error('Error monitoring IP address changes:', error);
    }
  });