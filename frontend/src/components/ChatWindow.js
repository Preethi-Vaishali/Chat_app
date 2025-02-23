import React from 'react';
import { ListGroup } from 'react-bootstrap';

function ChatWindow({ messages }) {
    return (
        <ListGroup className="chat-window my-3">
            {messages.map((msg, index) => (
                <ListGroup.Item
                    key={index}
                    className={`chat-message ${msg.sender === "User1" ? "sent" : "received"}`}
                >
                    <strong>{msg.sender}:</strong> {msg.text}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default ChatWindow;
