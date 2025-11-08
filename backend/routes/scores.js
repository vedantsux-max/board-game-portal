import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Basic score schema
const scoreSchema = new mongoose.Schema({
  game: String,
  name: String,
  score: Number,
  createdAt: { type: Date, default: Date.now },
});

const Score = mongoose.model('Score', scoreSchema);

// Save a score
router.post('/', async (req, res) => {
  try {
    const { game, name, score } = req.body;
    const newScore = new Score({ game, name, score });
    await newScore.save();
    res.status(201).json({ success: true, score: newScore });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Fetch all scores
router.get('/', async (req, res) => {
  try {
    const scores = await Score.find().sort({ createdAt: -1 });
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
