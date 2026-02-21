const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { generateWebsite } = require("../controllers/aiController");

router.post("/generate", authMiddleware, generateWebsite);

module.exports = router;