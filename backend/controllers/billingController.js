const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Tenant = require("../models/Tenant");

exports.createCheckoutSession = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "SitePilot PRO Plan"
            },
            unit_amount: 2000, // $20
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/payment-success",
      cancel_url: "http://localhost:5173/payment-cancel",
      metadata: {
        tenantId
      }
    });

    res.json({ url: session.url });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.upgradePlan = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;

    await Tenant.findByIdAndUpdate(tenantId, {
      plan: "PRO"
    });

    res.json({ message: "Plan upgraded to PRO" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};