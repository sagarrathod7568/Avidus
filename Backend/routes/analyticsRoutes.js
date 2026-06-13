const express = require("express");

const { getAnalytics } = require("../controllers/analyticsController");

const { protect } = require("../middleware/authMiddleware");

const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", protect, adminOnly, getAnalytics);

module.exports = router;
