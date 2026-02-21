const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  category: {
    type: String,
    default: "General"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Template", templateSchema);