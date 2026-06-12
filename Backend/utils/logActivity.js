const ActivityLog = require("../models/ActivityLog");

const logActivity = async (
  userId,
  action,
  details = ""
) => {
  try {
    await ActivityLog.create({
      user: userId,
      action,
      details,
    });
  } catch (error) {
    console.log(
      "Activity Log Error:",
      error.message
    );
  }
};

module.exports = logActivity;