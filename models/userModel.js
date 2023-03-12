const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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
// Document Middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
// Instance methods
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPasswords
) {
  return await bcrypt.compare(candidatePassword, userPasswords);
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.resetPasswordTokenExpiresIn = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
