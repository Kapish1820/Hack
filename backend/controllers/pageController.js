const Page = require("../models/Page");
const Website = require("../models/Website");
const Tenant = require("../models/Tenant");
const plans = require("../config/plans");

exports.createPage = async (req, res) => {
  try {
    const { websiteId, title } = req.body;
    const tenantId = req.user.tenantId;

    // Check website belongs to tenant
    const website = await Website.findOne({ _id: websiteId, tenantId });

    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }

    // Check plan page limit
    const tenant = await Tenant.findById(tenantId);
    const planLimits = plans[tenant.plan];

    const pageCount = await Page.countDocuments({ websiteId });

    if (pageCount >= planLimits.maxPages) {
      return res.status(403).json({
        message: "Page limit reached. Upgrade your plan."
      });
    }

    const page = await Page.create({
      tenantId,
      websiteId,
      title,
      components: []
    });

    res.status(201).json(page);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPagesByWebsite = async (req, res) => {
  try {
    const { websiteId } = req.params;
    const tenantId = req.user.tenantId;

    // Verify website belongs to tenant
    const website = await require("../models/Website").findOne({
      _id: websiteId,
      tenantId
    });

    if (!website) {
      return res.status(404).json({ message: "Website not found" });
    }

    const pages = await require("../models/Page").find({
      websiteId,
      tenantId
    });

    res.json(pages);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};