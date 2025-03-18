const mongoose = require("mongoose");

const connectDB = async () => {
  const dbString = process.env.MONGODB;
  const connectToDB = await mongoose.connect(dbString);
  console.info(`Successfully connected to ${mongoose.connection.name}`);
};

module.exports = connectDB;
