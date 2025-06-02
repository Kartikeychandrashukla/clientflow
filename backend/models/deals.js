// models/deal.js

const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  stage: {
    type: String,
    required: true,
  },
  expectedClose: {
    type: Date,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Deal', dealSchema);
