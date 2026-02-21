const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createPage,
  getPagesByWebsite
} = require("../controllers/pageController");

router.post("/", authMiddleware, createPage);

// NEW ROUTE
router.get("/:websiteId", authMiddleware, getPagesByWebsite);

module.exports = router;