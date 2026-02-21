const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createPage,
  getPagesByWebsite,
  updateComponentPosition, // NEW ROUTE
} = require("../controllers/pageController");

// Route to create a page
router.post("/", authMiddleware, createPage);

// Route to get pages by websiteId
router.get("/:websiteId", authMiddleware, getPagesByWebsite);

// NEW ROUTE: Update the position (x, y) of a component in a page
router.post("/update-component-position", authMiddleware, updateComponentPosition);

module.exports = router;