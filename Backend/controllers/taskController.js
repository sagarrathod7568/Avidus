const Task = require("../models/Task");
const logActivity = require("../utils/logActivity");

// Create Task
const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description:
        req.body.description,
      status:
        req.body.status ||
        "Pending",
      createdBy: req.user._id,
    });

    await logActivity(
      req.user._id,
      "TASK_CREATED",
      `Task created: ${task.title}`
    );

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Own Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      createdBy: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Own Task
const updateTask = async (
  req,
  res
) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (
      task.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "Not authorized to update",
      });
    }

    task.title =
      req.body.title ||
      task.title;

    task.description =
      req.body.description ||
      task.description;

    task.status =
      req.body.status ||
      task.status;

    await task.save();

    await logActivity(
      req.user._id,
      "TASK_UPDATED",
      `Task updated: ${task.title}`
    );

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Own Task
const deleteTask = async (
  req,
  res
) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (
      task.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "Not authorized to delete",
      });
    }

    await task.deleteOne();

    await logActivity(
      req.user._id,
      "TASK_DELETED",
      `Task deleted: ${task.title}`
    );

    res.json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};