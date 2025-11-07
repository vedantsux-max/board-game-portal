const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  name: { type: String, required: false },
  game: { type: String, required: true },
  score: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', ScoreSchema);
