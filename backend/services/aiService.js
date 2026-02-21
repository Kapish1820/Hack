const axios = require("axios");

// 🔹 Domain Intelligence Layer (Same Logic, Cleaner Data)
function getDomainInsights(businessType) {
  const insights = {
    bakery: "Bakery websites prioritize menu, product gallery, testimonials, and strong CTAs.",
    gym: "Gym websites highlight trainers, pricing plans, and transformation results.",
    yoga: "Yoga websites focus on instructors, schedules, and calming design.",
    startup: "Startup websites emphasize hero section, features, and strong CTA.",
    restaurant: "Restaurant websites prioritize menu, gallery, and reservations.",
  };

  return (
    insights[businessType?.toLowerCase()] ||
    `Modern ${businessType} websites prioritize hero section, services, testimonials, and CTA.`
  );
}

// 🔹 Safe JSON Extractor (Updated for Strict Mode)
function extractJSON(text) {
  try {
    // With response_mime_type: "application/json", text should already be clean
    return JSON.parse(text);
  } catch (err) {
    console.error("JSON Parse Error. Raw Output:", text);
    throw new Error("Failed to parse Gemini JSON response");
  }
}

// 🔹 Reusable Gemini API Caller (UPDATED FOR 2026)
async function callGemini(prompt, isJsonResponse = false) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY missing in .env");
  }

  // Updated to Gemini 3 Flash for speed and reliability
  const model = "gemini-3-flash-preview"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const requestBody = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.7,
      // Force JSON output if requested
      response_mime_type: isJsonResponse ? "application/json" : "text/plain",
    },
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: { "Content-Type": "application/json" },
      timeout: 30000, // Increased to 30s for complex site generation
    });

    const output = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!output) throw new Error("Empty response from Gemini");

    return output;
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error?.message || "Gemini API request failed");
  }
}

// 🔹 MAIN: Smart Website Generator
async function generateSmartWebsite(businessType, tone = "modern", referenceUrls = []) {
  const domainInsights = getDomainInsights(businessType);
  const referenceContext = referenceUrls.length > 0 
    ? `Design inspiration: ${referenceUrls.join(", ")}` 
    : "No references.";

  const prompt = `
    You are an Elite AI Website Architect. Generate a structured website schema for a ${businessType} with a ${tone} tone.
    Insights: ${domainInsights}
    ${referenceContext}

    Return a JSON object matching this schema:
    {
      "siteMeta": { "brandName": "string", "tagline": "string", "theme": "string", "colorPalette": [] },
      "pages": [
        {
          "name": "Home",
          "components": [
            { "type": "hero", "headline": "string", "subheadline": "string", "cta": "string" },
            { "type": "services", "title": "string", "items": ["string"] },
            { "type": "testimonial", "quote": "string" }
          ]
        }
      ]
    }
  `;

  const aiResponse = await callGemini(prompt, true); // true triggers JSON mode
  const parsedData = extractJSON(aiResponse);

  return {
    ...parsedData,
    meta: {
      model: "gemini-3-flash-preview",
      generatedAt: new Date().toISOString(),
      domainLogic: domainInsights,
    },
  };
}

// 🔹 Content Improvement
async function improveContent(content) {
  const prompt = `Rewrite this for a professional website, keep it concise: "${content}"`;
  return (await callGemini(prompt)).trim();
}

module.exports = {
  generateSmartWebsite,
  improveContent,
};