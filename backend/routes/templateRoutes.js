const express = require("express");
const router = express.Router();
const { addTemplate } = require("../controllers/templateController");

router.post("/add", addTemplate);  // Endpoint to add a new template

module.exports = router;