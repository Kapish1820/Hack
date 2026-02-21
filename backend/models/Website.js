const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true
  },

  name: {
    type: String,
    required: true
  },

  domain: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    enum: ["DRAFT", "LIVE"],
    default: "DRAFT"
  },

  deploymentHistory: [
    {
      deployedAt: { type: Date, default: Date.now },
      versionNote: String
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Website", websiteSchema);