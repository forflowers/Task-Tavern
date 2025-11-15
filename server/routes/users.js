const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

let users = [
  { id: 1, username: "testuser", password: "123456" }
];


; // TEMPORARY in-memory storage — will replace with DB later

// REGISTER
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  const exists = users.find(u => u.username === username);
  if (exists) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const newUser = {
    id: users.length + 1,
    username,
    password, // later we will hash this!
  };

  users.push(newUser);

  res.json({ message: "User registered!", user: newUser });
});

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ message: "Login successful!", token, user });
});

module.exports = router;
