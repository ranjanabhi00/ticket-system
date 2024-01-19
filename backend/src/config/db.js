require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;

const dbConnect = async () => {
  await mongoose.connect(url);
};

module.exports = dbConnect;
