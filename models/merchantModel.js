const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  brand: {
    type: String,
  },
});

const Merchant = mongoose.model('Merchant', merchantSchema);
module.exports = Merchant;
