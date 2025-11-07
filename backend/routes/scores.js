const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// Save score
router.post('/', async (req, res) => {
  try {
    const { name, game, score } = req.body;
    const s = new Score({ name, game, score });
    await s.save();
    res.status(201).json(s);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get top scores (optional query ?game=tictactoe)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.game) filter.game = req.query.game;
    const scores = await Score.find(filter).sort({ score: -1, createdAt: 1 }).limit(50);
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
