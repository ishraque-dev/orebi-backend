const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User mast have a  name'],
  },
  email: {
    type: String,
    required: [true, 'User mast have a Email'],
    unique: true,
  },
  phone: {
    type: Number,
    unique: true,
  },
  address1: {
    type: String,
    required: [true, 'User mast have a Address'],
  },

  password: {
    type: String,
    required: [true, 'User mast have a Password'],
  },
  emailValidate: {
    type: Boolean,
    default: false,
  },
  terms: {
    type: Boolean,
    required: true,
  },
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Merchant',
    default: null,
  },
  googleID: {
    type: String,
    default: null,
  },
  faceBookId: {
    type: String,
    default: null,
  },
  avatar: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: 'member',
    enum: ['admin', 'member', 'merchant'],
  },
  newsletter: {
    type: Boolean,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpiresIn: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
