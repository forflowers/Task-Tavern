const express = require("express");
const router = express.Router();

let rooms = [];

router.get("/", (req, res) => {
  res.json(rooms);
});

router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Room name is required" });

  const newRoom = { id: rooms.length + 1, name };
  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

module.exports = router;
