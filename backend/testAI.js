require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Say hello!' },
      ],
    });
    console.log('Response from OpenAI:', response.choices[0].message.content);
  } catch (err) {
    console.error('OpenAI test error:', err.response?.data || err.message || err);
  }
}

test();
