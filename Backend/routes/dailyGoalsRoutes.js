const express = require("express");
const router = express.Router();
const DailyGoal = require("../models/DailyGoal");
const verifyToken = require("../middleware/authMiddleware");

// 🟢 GET all goals for logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const goals = await DailyGoal.find({ user: req.user.id });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch goals" });
  }
});

// 🟢 GET today's goal
router.get("/today", verifyToken, async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  try {
    const goal = await DailyGoal.findOne({
      user: req.user.id,
      date: today,
    });

    res.json(goal || null);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch today goal" });
  }
});

// 🟢 CREATE or UPDATE today's goal (UPSERT)
router.post("/today", verifyToken, async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const { tasks } = req.body;

  try {
    const goal = await DailyGoal.findOneAndUpdate(
      { user: req.user.id, date: today },
      { tasks },
      { new: true, upsert: true }
    );

    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: "Failed to save today goal" });
  }
});

// 🟢 UPDATE goal for a specific date
router.put("/:date", verifyToken, async (req, res) => {
  const { date } = req.params;
  const { tasks } = req.body;

  try {
    const goal = await DailyGoal.findOneAndUpdate(
      { user: req.user.id, date },
      { tasks },
      { new: true }
    );

    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: "Failed to update goal" });
  }
});

module.exports = router;
