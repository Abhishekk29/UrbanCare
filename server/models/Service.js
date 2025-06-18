const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  status: {
  type: String,
  enum: ['pending', 'approved', 'rejected'],
  default: 'pending'
},
  name: String,
  description: String,
  category: String,
  location: String,
  price: Number,
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
},
{ timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
