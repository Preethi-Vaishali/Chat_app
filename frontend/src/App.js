import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

function App() {
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState("User1"); // Start with User1

    useEffect(() => {
        // Initially, don't load old messages
        setMessages([]);
    }, []);

    // Function to load old messages when button is clicked
    const loadOldMessages = async () => {
        const response = await fetch('http://localhost:3001/messages?loadOld=true');
        const data = await response.json();
        setMessages(data);
    };

    const sendMessage = async (text) => {
        await fetch('http://localhost:3001/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, sender: currentUser }),
        });

        // Toggle between "User1" and "User2" after sending a message
        setCurrentUser(currentUser === "User1" ? "User2" : "User1");

        // Refresh messages after sending
        loadOldMessages();
    };

    return (
        <Container className="d-flex flex-column align-items-center mt-4">
            <Card className="w-50 p-3 shadow">
                <h2 className="text-center text-primary">React Chat App</h2>
                <Button variant="secondary" onClick={loadOldMessages} className="mb-3">
                    Load Old Messages
                </Button>
                <ChatWindow messages={messages} />
                <MessageInput sendMessage={sendMessage} />
            </Card>
        </Container>
    );
}

export default App;
