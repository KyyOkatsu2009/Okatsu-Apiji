const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const GEMINI_API_KEY = 'AIzaSyAKbxdxfyNoQMx9ft9xAVoQWrwpN9JnphY';
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

app.post('/api/chat', async (req, res) => {
    try {
        const { messages, temperature, maxTokens } = req.body;
        
        const payload = {
            contents: messages,
            generationConfig: {
                maxOutputTokens: maxTokens,
                temperature: temperature
            }
        };

        const response = await axios.post(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'Failed to get response from AI',
            details: error.response?.data || error.message 
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});