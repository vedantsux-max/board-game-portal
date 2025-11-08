import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import scoreRoutes from './routes/scores.js';

dotenv.config();
const app = express();

// ----------------- Middleware -----------------
app.use(
  cors()
);
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
  const mongoStatus =
    mongoose.connection.readyState === 1
      ? 'connected'
      : mongoose.connection.readyState === 2
      ? 'connecting'
      : 'disconnected';

  res.json({
    status: 'ok',
    mongo: mongoStatus,
    uptime: process.uptime().toFixed(0) + 's',
    time: new Date(),
  });
});

// ----------------- Root Route -----------------
app.get('/', (req, res) => {
  res.send('🎯 Board Game Portal Backend is running successfully on Render!');
});

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
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
