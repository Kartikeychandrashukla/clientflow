const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/', async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// POST /api/orders - Add new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    const saved = await order.save();
    res.status(201).json({ message: 'Order added', order: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
