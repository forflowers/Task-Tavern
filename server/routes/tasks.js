const express = require("express");
const router = express.Router();

// In-memory example tasks array (replace with DB later)
let tasks = [];

// GET /tasks - Get all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// POST /tasks - Create a new task
router.post("/", (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newTask = { id: tasks.length + 1, title, description: description || "" };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

module.exports = router;
