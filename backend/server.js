const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;  // Use Render’s assigned port

app.use(cors());
app.use(express.json());

let messages = [];  // Temporary in-memory storage

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.post('/messages', (req, res) => {
    const { text, sender } = req.body;
    messages.push({ text, sender });
    res.status(201).json({ message: "Message received" });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
