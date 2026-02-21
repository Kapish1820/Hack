const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/rbacMiddleware");
const {
  createWebsite,
  getWebsites,
  deleteWebsite
} = require("../controllers/websiteController");

router.post("/", authMiddleware, createWebsite);
router.get("/", authMiddleware, getWebsites);
router.delete("/:id", authMiddleware, authorize(["OWNER"]), deleteWebsite);

module.exports = router;