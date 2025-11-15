const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

let rooms = [];

// GET /rooms (Protected)
router.get("/", auth, (req, res) => {
  res.json(rooms);
});

// POST /rooms (Protected)
router.post("/", auth, (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Room name is required" });
  }

  const newRoom = {
    id: rooms.length + 1,
    name,
    createdBy: req.user.id,
  };

  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

module.exports = router;
