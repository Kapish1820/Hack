const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createWebsite } = require("../controllers/websiteController");

router.post("/", authMiddleware, createWebsite);

module.exports = router;