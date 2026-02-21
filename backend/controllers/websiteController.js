const Website = require("../models/Website");
const Tenant = require("../models/Tenant");
const plans = require("../config/plans");

exports.createWebsite = async (req, res) => {
  try {
    const { name } = req.body;

    const tenantId = req.user.tenantId;

    // Get tenant
    const tenant = await Tenant.findById(tenantId);

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    // Get plan limits
    const planLimits = plans[tenant.plan];

    // Count current websites
    const websiteCount = await Website.countDocuments({ tenantId });

    if (websiteCount >= planLimits.maxWebsites) {
      return res.status(403).json({
        message: "Website limit reached. Upgrade your plan."
      });
    }

    // Create website
    const website = await Website.create({
      tenantId,
      name
    });

    res.status(201).json(website);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};