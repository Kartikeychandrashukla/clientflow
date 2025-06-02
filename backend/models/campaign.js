const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rules: { type: Array, default: [] }, // e.g., [{ field: 'orders', operator: '>', value: 5 }]
  message: { type: String, required: true },
  audienceSize: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Campaign', campaignSchema);
