const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const adminRoutes = require('./routes/adminRoutes');


const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
const serviceRoutes = require('./routes/serviceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/admin', adminRoutes);
// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
const seedAdmin = require('./utils/seedAdmin');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    seedAdmin(); // ✅ runs only once if needed
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
  });
