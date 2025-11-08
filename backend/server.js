import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';

// ----------------- Load Environment Variables -----------------
dotenv.config();

const app = express();

// ----------------- Middleware -----------------
app.use(cors());
app.use(express.json());

// ----------------- API Routes -----------------
app.use('/api/auth', authRoutes);

// ----------------- Subscription Route -----------------
app.post('/api/subscribe', (req, res) => {
  const { name, email, cardNumber, expiry, cvv, amount } = req.body;

  console.log('📩 Subscription received:', req.body);

  // Basic validation
  if (!name || !email || !cardNumber || !expiry || !cvv) {
    return res
      .status(400)
      .json({ success: false, message: '⚠️ All fields are required' });
  }

  // (Optional) Payment gateway integration placeholder
  return res.json({
    success: true,
    message: `✅ Subscription successful for ${name}, amount $${amount}`,
  });
});

// ----------------- MongoDB Connection -----------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

// ----------------- Static Frontend (Production) -----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// When deployed on Render (or any production server)
if (process.env.NODE_ENV === 'production') {
  // Serve React build
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Serve React app for any unknown route
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
} else {
  // Development: Simple welcome route
  app.get('/', (req, res) => {
    res.send('🎯 Board Game Portal Backend is running successfully (Development Mode)');
  });
}

// ----------------- Error Handling (Optional) -----------------
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('💥 Server Error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

// ----------------- Start Server -----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
