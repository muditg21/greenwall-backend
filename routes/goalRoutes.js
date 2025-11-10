const express = require("express");
const router = express.Router();
const Goal = require("../models/goal");
const verifyToken = require("../middleware/authMiddleware");

router.post("/add", verifyToken, async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ error: "title is required" });
        }

        const newGoal = new Goal({
            user: req.user.id,
            title
        });
        await newGoal.save();

        res.status(201).json({ message: "goal added successfully", goal: newGoal });
    } catch (err) {
        res.status(500).json({ message: "failed to add goal", details: err, message });
    }
});

router.get("/mygoals", verifyToken, async (req, res) => {
    try {
        const goals = await Goal.find({
            user: req.user.id
        }).sort({ date: -1 });
        res.status(200).json(goals);
    } catch (err) {
        res.status(500).json({ error: "failed to fetch goals", details: err.message });
    }
});

router.put("/updategoals/:id", verifyToken, async (req, res) => {
    try {
        const goal = await Goal.findOne({
            _id: req.params.id,
            user: req.user.id
        })
        if (!goal) return res.status(404).json({ error: "goal not found" });

        if (req.body.title) goal.title = req.body.title;
        if (req.body.completed !== undefined) goal.completed = req.body.completed;

        const updated = await goal.save();

        res.status(200).json({ message: "goal updated", 
             goal: updated });
    }
    catch (err) {
        res.status(500).json({ error: "update fail",
             details: err. message });
    }
});

router.delete("/deletegoals/:id", verifyToken, async (req, res) => {
    try {
        const goal = await Goal.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!goal) return res.status(404).json({ error: "goal not found" });

        res.status(200).json({ message: "goal deleted" });
    }
    catch (err) {
        res.status(500).json({ error: "delete fail", details: err. message });
    }
})

module.exports = router;