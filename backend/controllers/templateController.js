const Template = require("../models/Template");

exports.addTemplate = async (req, res) => {
  try {
    const { name, description, layout } = req.body;

    const newTemplate = new Template({
      name,
      description,
      layout,
    });

    await newTemplate.save();

    res.status(201).json({ message: "Template created successfully", template: newTemplate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};