const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const adminRoutes = require('./routes/adminRoutes');


const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  'https://urbancare-1.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
// Routes
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB
const seedAdmin = require('./utils/seedAdmin');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    seedAdmin(); // ✅ runs only once if needed
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
  });
