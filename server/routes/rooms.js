const express = require("express");
const router = express.Router();

let rooms = []; // Example in-memory storage

// GET /rooms
router.get("/", (req, res) => {
  res.json(rooms);
});

// POST /rooms
router.post("/", (req, res) => {
  const room = req.body;
  rooms.push(room);
  res.status(201).json(room);
});

module.exports = router;
