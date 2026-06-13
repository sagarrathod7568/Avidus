const express = require("express");

const {
  getUsers,
  deleteUser,
  updateUserStatus,
  getAllTasks,
  deleteAnyTask,
  getLogs,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

// Users
router.get("/users", protect, adminOnly, getUsers);

router.delete("/users/:id", protect, adminOnly, deleteUser);

router.patch("/users/:id/status", protect, adminOnly, updateUserStatus);

// Tasks
router.get("/tasks", protect, adminOnly, getAllTasks);

router.delete("/tasks/:id", protect, adminOnly, deleteAnyTask);

// Logs
router.get("/logs", protect, adminOnly, getLogs);

module.exports = router;
