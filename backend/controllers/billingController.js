const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Tenant = require("../models/Tenant");

// ----------------------
// CREATE CHECKOUT SESSION
// ----------------------
exports.createCheckoutSession = async (req, res) => {
  try {
    const { planId } = req.body;
    const tenantId = req.user.tenantId;

    let amount;
    let planName;

    if (planId === "pro-plan") {
      amount = 2900; // $29
      planName = "PRO";
    } else if (planId === "enterprise-plan") {
      amount = 9900; // $99
      planName = "ENTERPRISE";
    } else {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `SitePilot ${planName} Plan`,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/payment-success?plan=${planName}`,
      cancel_url: "http://localhost:3000/payment-cancel",
      metadata: {
        tenantId,
        plan: planName,
      },
    });

    res.json({ url: session.url });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ----------------------
// UPGRADE PLAN
// ----------------------
exports.upgradePlan = async (req, res) => {
  try {
    const { plan } = req.body; // PRO or ENTERPRISE
    const tenantId = req.user.tenantId;

    if (!["PRO", "ENTERPRISE"].includes(plan)) {
      return res.status(400).json({ message: "Invalid plan upgrade" });
    }

    await Tenant.findByIdAndUpdate(tenantId, {
      plan,
      subscriptionStatus: "ACTIVE",
    });

    res.json({ message: `Plan upgraded to ${plan}` });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};