const ActivityLog = require("../models/ActivityLog");

const logActivity = async (
  userId,
  action,
  details = ""
) => {
  await ActivityLog.create({
    user: userId,
    action,
    details,
  });
};

module.exports = logActivity;