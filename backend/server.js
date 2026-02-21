const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const aiRoutes = require("./routes/aiRoutes");
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SitePilot API Running");
});

app.use("/ai", aiRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/test-protected", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

const websiteRoutes = require("./routes/websiteRoutes");
app.use("/api/websites", websiteRoutes);

const pageRoutes = require("./routes/pageRoutes");
app.use("/api/pages", pageRoutes);