const { GoogleGenerativeAI } = require("@google/generative-ai");
const Tenant = require("../models/Tenant");
const Website = require("../models/Website");
const Page = require("../models/Page");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.generateWebsite = async (req, res) => {
  try {
    const { prompt } = req.body;
    const tenantId = req.user.tenantId;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const tenant = await Tenant.findById(tenantId);

    // -----------------------------
    // PLAN-BASED AI LIMIT ENFORCEMENT
    // -----------------------------

    const limits = {
      FREE: 3,
      PRO: 50,
      ENTERPRISE: Infinity,
    };

    const allowedUsage = limits[tenant.plan] || 0;

    if (tenant.aiUsageCount >= allowedUsage) {
      return res.status(403).json({
        message: "AI generation limit reached for your plan",
      });
    }

    // -----------------------------
    // PROMPT ENGINEERING
    // -----------------------------

    const fullPrompt = `
You are a website generator AI.

Generate a complete website structure based on this idea:
"${prompt}"

Return ONLY valid JSON.
Do NOT include markdown.
Do NOT include explanation text.

Format:

{
  "websiteName": "string",
  "pages": [
    {
      "title": "string",
      "sections": [
        {
          "type": "hero | features | about | testimonials | pricing | contact",
          "content": {
            "heading": "string",
            "subheading": "string",
            "body": "string"
          }
        }
      ]
    }
  ]
}
`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // -----------------------------
    // PARSE AI RESPONSE
    // -----------------------------

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (err) {
      return res.status(500).json({
        message: "AI returned invalid JSON",
        raw: text,
      });
    }

    // -----------------------------
    // SAVE WEBSITE
    // -----------------------------

    const website = await Website.create({
      name: parsed.websiteName,
      tenantId,
      status: "DRAFT",
    });

    for (const page of parsed.pages) {
      await Page.create({
        websiteId: website._id,
        title: page.title,
        content: page.sections,
      });
    }

    // -----------------------------
    // INCREMENT USAGE
    // -----------------------------

    tenant.aiUsageCount += 1;
    await tenant.save();

    res.json({
      message: "Website generated successfully",
      website,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};