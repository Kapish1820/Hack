const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  layout: [
    {
      type: { type: String, required: true },  // e.g., 'hero', 'text', 'button'
      content: { type: String }, // The content or structure of that element
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Template", templateSchema);