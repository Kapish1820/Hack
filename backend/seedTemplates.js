require("dotenv").config();
const mongoose = require("mongoose");
const Template = require("./models/Template");

mongoose.connect(process.env.MONGO_URI);

const seed = async () => {
  await Template.deleteMany();

  await Template.create([
    {
      id: "saas-modern",
      name: "SaaS Modern",
      category: "SaaS"
    },
    {
      id: "restaurant-elegant",
      name: "Restaurant Elegant",
      category: "Restaurant"
    }
  ]);

  console.log("Templates seeded!");
  process.exit();
};

seed();