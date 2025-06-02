const express = require('express');
const router = express.Router();
const Deal = require('../models/deals');

// GET all deals
router.get('/', async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new deal
router.post('/', async (req, res) => {
  const { title, customer, value, stage, expectedClose } = req.body;

  const newDeal = new Deal({
    title,
    customer,
    value,
    stage,
    expectedClose,
  });

  try {
    const savedDeal = await newDeal.save();
    res.status(201).json(savedDeal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
