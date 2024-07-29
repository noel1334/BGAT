const express = require("express");
const { getDb } = require("./db");

const router = express.Router();

router.post("/submit-quiz", async (req, res) => {
  const { gender, score } = req.body;
  try {
    const db = getDb();
    const collection = db.collection("scores");
    await collection.insertOne({ gender, score });
    console.log("Data inserted into MongoDB:", { gender, score });
    res.send("Quiz results submitted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Error inserting data");
  }
});

router.get("/get-scores", async (req, res) => {
  const { gender } = req.query;
  try {
    const db = getDb();
    const collection = db.collection("scores");

    console.log("Gender filter:", gender);

    const query = gender
      ? { gender: { $regex: new RegExp(`^${gender}$`, "i") } }
      : {};

    console.log("Query object:", query);

    const scores = await collection.find(query).toArray();

    console.log("Fetched scores:", scores);

    res.json(scores);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});

module.exports = router;
