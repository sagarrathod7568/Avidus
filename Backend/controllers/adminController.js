const User = require("../models/User");
const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");
const logActivity = require("../utils/logActivity");

// View All Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    await logActivity(
      req.user._id,
      "USER_DELETED",
      `Deleted user: ${user.email}`,
    );

    res.json({
      success: true,
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update User Status
const updateUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.status = req.body.status;

    await user.save();

    await logActivity(
      req.user._id,
      "USER_STATUS_UPDATED",
      `${user.email} status changed to ${user.status}`,
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// View All Tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("createdBy", "name email").sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Any Task
const deleteAnyTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    await logActivity(
      req.user._id,
      "TASK_DELETED",
      `Admin deleted task: ${task.title}`,
    );

    res.json({
      success: true,
      message: "Task deleted by admin",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// View Activity Logs
const getLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find().populate("user", "name email").sort({
      createdAt: -1,
    });

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  updateUserStatus,
  getAllTasks,
  deleteAnyTask,
  getLogs,
};
