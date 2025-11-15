const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

let boss = { hp: 100 };

// GET boss status (Protected)
router.get("/", auth, (req, res) => {
  res.json(boss);
});

// POST /boss/attack (Protected)
router.post("/attack", auth, (req, res) => {
  const { damage } = req.body;

  if (!damage || isNaN(damage)) {
    return res.status(400).json({ error: "Damage must be a number" });
  }

  boss.hp = Math.max(0, boss.hp - damage);

  res.json({
    message: "You attacked the boss!",
    boss,
  });
});

module.exports = router;
