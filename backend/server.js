const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// Models (needed for debug route)
const Tenant = require("./models/Tenant");

// Routes
const authRoutes = require("./routes/authRoutes");
const websiteRoutes = require("./routes/websiteRoutes");
const pageRoutes = require("./routes/pageRoutes");
const billingRoutes = require("./routes/billingRoutes");

// Middleware
const authMiddleware = require("./middleware/authMiddleware");

const aiRoutes = require("./routes/aiRoutes");
const app = express();

// ----------------------
// Connect Database
// ----------------------
connectDB();

// ----------------------
// Global Middleware
// ----------------------
app.use(cors());
app.use(express.json());

// ----------------------
// Base Route
// ----------------------
app.get("/", (req, res) => {
  res.send("SitePilot API Running");
});

app.use("/ai", aiRoutes);

// ----------------------
// API Routes
// ----------------------
app.use("/api/auth", authRoutes);
app.use("/api/websites", websiteRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/billing", billingRoutes);

// ----------------------
// Protected Test Route
// ----------------------
app.get("/api/test-protected", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

// ----------------------
// Temporary Debug Route
// ----------------------
app.get("/api/debug/tenant", authMiddleware, async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.user.tenantId);
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ----------------------
// Start Server (ALWAYS LAST)
// ----------------------
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});