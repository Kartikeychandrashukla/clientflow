const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  totalSpend: Number,
  visits: Number,
  lastPurchaseDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Static method to parse AI rule string into MongoDB query
customerSchema.statics.parseRuleStringToMongoQuery = function (ruleString) {
  const query = {};

  // Parse last_purchase_date condition: e.g. last_purchase_date < now - 180 days
  const dateMatch = ruleString.match(/last_purchase_date\s*<\s*now\s*-\s*(\d+)\s*days/i);
  if (dateMatch) {
    const days = parseInt(dateMatch[1], 10);
    const dateLimit = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    query.lastPurchaseDate = { $lt: dateLimit };
  }

  // Parse total_spend condition: e.g. total_spend > 5000
  const spendMatch = ruleString.match(/total_spend\s*>\s*(\d+)/i);
  if (spendMatch) {
    const amount = parseFloat(spendMatch[1]);
    query.totalSpend = { $gt: amount };
  }

  // You can add more parsing logic here for other fields like visits, etc.

  return query;
};

module.exports = mongoose.model('Customer', customerSchema);
