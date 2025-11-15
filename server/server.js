// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Task Tavern Server is running!");
});

// Import routers (ONE TIME EACH)
const tasksRouter = require("./routes/tasks");
const roomsRouter = require("./routes/rooms");
const usersRouter = require("./routes/users");
const bossRouter = require("./routes/boss");

// Use routers
app.use("/tasks", tasksRouter);
app.use("/rooms", roomsRouter);
app.use("/users", usersRouter);
app.use("/boss", bossRouter);

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
