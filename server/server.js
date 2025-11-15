// Load environment variables (optional)
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// In-memory tasks array for demo purpose
let tasks = [];

// Root route
app.get("/", (req, res) => {
  res.send("Task Tavern Server is running!");
});

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Task title is required" });
  }
  const newTask = { id: tasks.length + 1, title };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

const tasksRouter = require("./routes/tasks");
const roomsRouter = require("./routes/rooms");
const usersRouter = require("./routes/users");
const bossRouter = require("./routes/boss");

app.use("/tasks", tasksRouter);
app.use("/rooms", roomsRouter);
app.use("/users", usersRouter);
app.use("/boss", bossRouter);



// Start server on port 5050
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const tasksRouter = require("./routes/tasks");
const roomsRouter = require("./routes/rooms");
const usersRouter = require("./routes/users");
const bossRouter = require("./routes/boss");
