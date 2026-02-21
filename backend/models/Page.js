const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true
  },

  websiteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Website",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  components: [
    {
      type: {
        type: String
      },
      content: {
        type: mongoose.Schema.Types.Mixed
      },
      order: Number
    }
  ],

  isPublished: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Page", pageSchema);