const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  status: {
  type: String,
  enum: ['pending', 'approved', 'rejected'],
  default: 'pending'
},
approved: {
  type: Boolean,
  default: false
},
rejected: {
    type: Boolean,
    default: false
  },
name: String,
  description: String,
  location: String,
  fullAddress: String,
  price: Number,
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approved: { type: Boolean, default: false },
  rejected: { type: Boolean, default: false } // 🔥 Add this
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
