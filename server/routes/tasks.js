const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

let tasks = [];

// GET /tasks (Protected)
router.get("/", auth, (req, res) => {
  const userTasks = tasks.filter((t) => t.userId === req.user.id);
  res.json(userTasks);
});

// POST /tasks (Protected)
router.post("/", auth, (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    description: description || "",
    userId: req.user.id,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

module.exports = router;
