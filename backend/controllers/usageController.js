const Website = require("../models/Website");
const Page = require("../models/Page");
const Tenant = require("../models/Tenant");
const plans = require("../config/plans");

exports.getUsage = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;

    const tenant = await Tenant.findById(tenantId);

    const websiteCount = await Website.countDocuments({ tenantId });
    const pageCount = await Page.countDocuments({ tenantId });

    const planLimits = plans[tenant.plan];

    res.json({
      plan: tenant.plan,
      usage: {
        websites: websiteCount,
        pages: pageCount,
        aiUsage: tenant.aiUsageCount
      },
      limits: planLimits
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};