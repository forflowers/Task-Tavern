const express = require("express");
const router = express.Router();

// Temporary in-memory user storage
let users = [];
let nextId = 1;

// --- SIGNUP ---
// POST /users/signup
router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const existing = users.find(u => u.username === username);
  if (existing) {
    return res.status(409).json({ error: "Username already taken" });
  }

  const newUser = {
    id: nextId++,
    username,
    password, // (not hashed yet — we can fix this later)
    createdAt: new Date(),
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created successfully!",
    user: { id: newUser.id, username: newUser.username }
  });
});

// --- LOGIN ---
// POST /users/login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  res.json({
    message: "Login successful!",
    user: { id: user.id, username: user.username }
  });
});

// --- GET PROFILE BY ID ---
// GET /users/:id
router.get("/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({
    id: user.id,
    username: user.username,
    createdAt: user.createdAt
  });
});

module.exports = router;
