const express = require("express");
const Score = require("./schema");

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Hello from server");
});

router.post("/submit-quiz", async (req, res) => {
  const { gender, score } = req.body;
  console.log("score", req.body);
  try {
    const newQuiz = await Score.create({ gender, score });
    console.log("Data inserted into MongoDB:", newQuiz);
    res.status(201).send("Quiz results submitted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Error inserting data");
  }
});

router.get("/get-scores", async (req, res) => {
  const { gender } = req.query;
  try {
    console.log("Gender filter:", gender);

    const query = gender
      ? { gender: { $regex: new RegExp(`^${gender}$`, "i") } }
      : {};

    console.log("Query object:", query);

    const scores = await Score.find(query);

    console.log("Fetched scores:", scores);

    res.json(scores);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});

module.exports = router;
