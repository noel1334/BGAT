const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://BGAT:HwIc0dX2Uce8fH07@bgat.n6x5vv0.mongodb.net/BGAT?retryWrites=true&w=majority";

async function connectToDatabase() {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000, // Increase timeout to 20 seconds
      socketTimeoutMS: 45000 // Increase socket timeout to 45 seconds
    });
    console.log("Connected to MongoDB database");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

module.exports = { connectToDatabase };
