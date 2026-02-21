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

