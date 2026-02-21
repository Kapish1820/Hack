const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/rbacMiddleware");
const {
  createCheckoutSession,
  upgradePlan
} = require("../controllers/billingController");

router.post("/checkout", authMiddleware, authorize(["OWNER"]), createCheckoutSession);
router.post("/upgrade", authMiddleware, authorize(["OWNER"]), upgradePlan);

module.exports = router;