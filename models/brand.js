const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: 'String',
  },

  image: 'String',
  description: 'String ',
  isActive: {
    type: 'Boolean',
    default: false,
  },
  updatedAt: {
    type: Date,
  },
  createdAt: {
    type: 'Date',
    default: Date.now,
  },
});
const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
