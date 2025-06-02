const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');

// POST /api/customers — Add a new customer (used by the frontend form)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const customer = new Customer({ name, email, phone });
    await customer.save();

    res.status(201).json({ customer });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Server error while adding customer' });
  }
});

// POST /api/customers/search — Search customers using AI-generated rules
// Body: { rules: string }
router.post('/search', async (req, res) => {
  try {
    const { rules } = req.body;
    if (!rules) return res.status(400).json({ error: 'Rules are required' });

    // Convert AI rule string to MongoDB query
    const query = Customer.parseRuleStringToMongoQuery(rules);

    // Find customers matching the query
    const customers = await Customer.find(query);

    res.json({ customers });
  } catch (error) {
    console.error('Error searching customers:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
