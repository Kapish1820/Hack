const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getUsage } = require("../controllers/usageController");

router.get("/", authMiddleware, getUsage);

module.exports = router;