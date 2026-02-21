const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  plan: {
    type: String,
    enum: ["FREE", "PRO"],
    default: "FREE"
  },

  subscriptionStatus: {
    type: String,
    enum: ["ACTIVE", "CANCELLED"],
    default: "ACTIVE"
  },

  aiUsageCount: {
    type: Number,
    default: 0
  },

  websiteCount: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Tenant", tenantSchema);