import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// ----------------- New Subscription Route -----------------
app.post('/api/subscribe', (req, res) => {
  const { name, email, cardNumber, expiry, cvv, amount } = req.body;

  console.log('Subscription received:', req.body);

  // Basic validation
  if (!name || !email || !cardNumber || !expiry || !cvv) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Here you can integrate real payment gateway (Stripe, Razorpay, etc.)
  return res.json({ success: true, message: `Subscription successful for ${name}, amount $${amount}` });
});
// ----------------------------------------------------------

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
