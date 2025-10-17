import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const { title, status } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const newTask = await Task.create({ title, status });
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
