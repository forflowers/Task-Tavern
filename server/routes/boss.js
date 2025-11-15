const express = require("express");
const router = express.Router();

let boss = {
  id: 1,
  name: "Dark Dragon",
  health: 1000
};

// GET boss status
router.get("/", (req, res) => {
  res.json(boss);
});

// POST attack boss (reduce health)
router.post("/attack", (req, res) => {
  const { damage } = req.body;
  if (typeof damage !== "number" || damage <= 0) {
    return res.status(400).json({ error: "Damage must be a positive number" });
  }

  boss.health -= damage;
  if (boss.health < 0) boss.health = 0;

  res.json({ message: `Boss took ${damage} damage!`, health: boss.health });
});

module.exports = router;
