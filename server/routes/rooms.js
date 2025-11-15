const express = require("express");
const router = express.Router();

// Temporary in-memory room storage (replace with DB later)
let rooms = []; 
let nextId = 1;

// --- CREATE ROOM ---
// POST /rooms
router.post("/", (req, res) => {
  const { name, isPrivate, maxUsers } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Room name is required" });
  }

  const newRoom = {
    id: nextId++,
    name,
    isPrivate: isPrivate || false,
    maxUsers: maxUsers || 10,
    users: [],
    createdAt: new Date(),
  };

  rooms.push(newRoom);
  res.status(201).json(newRoom);
});

// --- GET ALL ROOMS ---
// GET /rooms
router.get("/", (req, res) => {
  res.json(rooms);
});

// --- GET ONE ROOM BY ID ---
// GET /rooms/:id
router.get("/:id", (req, res) => {
  const room = rooms.find(r => r.id === parseInt(req.params.id));
  if (!room) return res.status(404).json({ error: "Room not found" });

  res.json(room);
});

// --- UPDATE ROOM ---
// PUT /rooms/:id
router.put("/:id", (req, res) => {
  const room = rooms.find(r => r.id === parseInt(req.params.id));
  if (!room) return res.status(404).json({ error: "Room not found" });

  const { name, isPrivate, maxUsers } = req.body;

  if (name !== undefined) room.name = name;
  if (isPrivate !== undefined) room.isPrivate = isPrivate;
  if (maxUsers !== undefined) room.maxUsers = maxUsers;

  res.json({ message: "Room updated", room });
});

// --- DELETE ROOM ---
// DELETE /rooms/:id
router.delete("/:id", (req, res) => {
  const roomIndex = rooms.findIndex(r => r.id === parseInt(req.params.id));
  if (roomIndex === -1) return res.status(404).json({ error: "Room not found" });

  const removedRoom = rooms.splice(roomIndex, 1);
  res.json({ message: "Room deleted", removedRoom });
});

module.exports = router;
