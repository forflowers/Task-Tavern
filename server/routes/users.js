const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// In-memory users
let users = [];

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// -------------------- SIGNUP --------------------
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword
  };

  users.push(newUser);

  res.status(201).json({
    message: "User created",
    user: { id: newUser.id, username }
  });
});

// -------------------- LOGIN --------------------
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
    { expiresIn: "2h" }
  );

  res.json({
    message: "Login successful!",
    token,
    user: { id: user.id, username: user.username },
  });
});

// -------------------- AUTH MIDDLEWARE --------------------
function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "Missing Authorization header" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

// -------------------- PROTECTED PROFILE --------------------
router.get("/profile", auth, (req, res) => {
  res.json({
    message: "Profile OK",
    user: req.user
  });
});

module.exports = router;
