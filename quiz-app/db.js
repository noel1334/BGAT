const { MongoClient } = require("mongodb");

//const mongoUrl = "mongodb://localhost:27017";
const mongoUrl = "mongodb+srv://BGAT:HwIc0dX2Uce8fH07@bgat.n6x5vv0.mongodb.net/?retryWrites=true&w=majority&appName=BGAT";

const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db("BGAT");
    console.log("Connected to MongoDB database");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
}

function getDb() {
  if (!db) {
    throw new Error("Database not connected. Call connectToDatabase first.");
  }
  return db;
}

module.exports = { connectToDatabase, getDb };
