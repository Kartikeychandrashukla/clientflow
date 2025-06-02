const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

const HF_API_URL = "https://api-inference.huggingface.co/models/gpt2";  // Example model, adjust if needed
const HF_API_TOKEN = process.env.HF_API_TOKEN;

router.post('/segment', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

  try {
    const response = await axios.post(HF_API_URL, {
      inputs: `Convert this natural language to rule logic: ${prompt}`
    }, {
      headers: { Authorization: `Bearer ${HF_API_TOKEN}` }
    });

    // Response data format depends on model; this is an example
    const aiText = response.data[0]?.generated_text || '';

    res.json({ rules: aiText.trim() });
  } catch (err) {
    console.error('HF API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to generate rules' });
  }
});

module.exports = router;
