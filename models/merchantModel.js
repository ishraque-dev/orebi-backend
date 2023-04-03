const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  brand: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: 'waiting',
    enum: ['waiting', 'approved', 'rejected'],
  },
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Merchant = mongoose.model('Merchant', merchantSchema);
module.exports = Merchant;
