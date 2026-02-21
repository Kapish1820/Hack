const express = require("express");
const router = express.Router();

const {
  generateSmartWebsite,
  improveContent,
  regenerateSection,
} = require("../services/aiService");

router.post("/generate-site", async (req, res) => {
  try {
    console.log("AI Route Hit:", req.body); // ⭐ ADD THIS

    const { businessType, tone } = req.body;

    if (!businessType) {
      return res.status(400).json({
        success: false,
        message: "Business type is required",
      });
    }

    const result = await generateSmartWebsite(businessType, tone);

    res.status(200).json({
      success: true,
      message: "AI website generated successfully",
      data: result,
    });
  } catch (error) {
    console.error("Generate Site Error FULL:", error); // ⭐ IMPORTANT
    res.status(500).json({
      success: false,
      message: "AI website generation failed",
      error: error.message,
    });
  }
});
// ⭐ WOW FEATURE: Improve Content
router.post("/improve-content", async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required",
      });
    }

    const improved = await improveContent(content);

    res.status(200).json({
      success: true,
      improvedContent: improved,
    });
  } catch (error) {
    console.error("Improve Content Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Content improvement failed",
    });
  }
});

// ⭐ ADVANCED: Regenerate Section
router.post("/regenerate-section", async (req, res) => {
  try {
    const { sectionName, businessType } = req.body;

    const newSection = await regenerateSection(
      sectionName,
      businessType
    );

    res.status(200).json({
      success: true,
      section: newSection,
    });
  } catch (error) {
    console.error("Regenerate Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Section regeneration failed",
    });
  }
});

module.exports = router;