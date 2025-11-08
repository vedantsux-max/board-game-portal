// backend/server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import scoreRoutes from './routes/scores.js';

dotenv.config();
const app = express();

// ----------------- Middleware -----------------
app.use(cors()); // allow all origins; restrict if needed
app.use(express.json());

// ----------------- API Routes -----------------
app.use('/api/auth', authRoutes);
app.use('/api/scores', scoreRoutes);

// ----------------- Subscription Route (test/demo) -----------------
app.post('/api/subscribe', (req, res) => {
  const { name, email, cardNumber, expiry, cvv, amount } = req.body;

  if (!name || !email || !cardNumber || !expiry || !cvv) {
    return res
      .status(400)
      .json({ success: false, message: 'All fields are required' });
  }

  return res.json({
    success: true,
    message: `Subscription successful for ${name}, amount $${amount}`,
  });
});

// ----------------- Health Check Route -----------------
app.get('/api/health', (req, res) => {
  const ready = mongoose.connection.readyState;
  const mongoStatus =
    ready === 1 ? 'connected' : ready === 2 ? 'connecting' : 'disconnected';

  res.json({
    status: 'ok',
    mongo: mongoStatus,
    uptime: Math.floor(process.uptime()) + 's',
    time: new Date().toISOString(),
  });
});

// ----------------- Serve frontend in production (optional) -----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // For SPA client-side routing: return index.html for unknown routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
} else {
  // root route for dev / quick check
  app.get('/', (req, res) => {
    res.send('🎯 Board Game Portal Backend is running successfully on Render!');
  });
}

// ----------------- MongoDB Connection -----------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) =>
    console.error('❌ MongoDB connection error:', err.message)
  );

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
