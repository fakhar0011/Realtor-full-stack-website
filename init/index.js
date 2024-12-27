const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wandurlust";

const main = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if connection fails
  }
};

const initDB = async () => {
  try {
    // Delete all documents in the collection
    await Listing.deleteMany({});
    console.log("Existing listings deleted.");

    // Update data with the owner field
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: new mongoose.Types.ObjectId("675a84c9fe9ec531be91ceae")

    }));

    // Insert new data
    const res = await Listing.insertMany(initData.data);
    console.log("Database initialized with new data:", res);
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

const start = async () => {
  await main(); // Wait for the database connection
  await initDB(); // Initialize the database
  mongoose.disconnect(); // Close the connection after initialization
};

start();