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

exports.getWebsites = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;

    const websites = await Website.find({ tenantId });

    res.json(websites);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteWebsite = async (req, res) => {
  try {
    const { id } = req.params;
    const tenantId = req.user.tenantId;

    const website = await Website.findOne({ _id: id, tenantId });

    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }

    await website.deleteOne();

    res.json({ message: "Website deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};