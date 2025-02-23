const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const messagesFile = 'messages.json';

// Load messages from file
const loadMessages = () => {
    if (!fs.existsSync(messagesFile)) return [];
    const data = fs.readFileSync(messagesFile);
    return JSON.parse(data);
};

// Save messages to file
const saveMessages = (messages) => {
    fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
};

// Clear messages when server starts
saveMessages([]);

// Get all messages (only if requested)
app.get('/messages', (req, res) => {
    const { loadOld } = req.query;
    if (loadOld === "true") {
        return res.json(loadMessages()); // Return old messages
    }
    res.json([]); // Return empty list by default
});

// Send a new message
app.post('/messages', (req, res) => {
    const { text, sender } = req.body;
    if (!text || !sender) return res.status(400).json({ error: "Message text and sender are required" });

    let messages = loadMessages();
    const newMessage = { id: Date.now(), text, sender };
    messages.push(newMessage);
    saveMessages(messages);

    res.json(newMessage);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
