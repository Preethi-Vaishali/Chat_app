import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

function MessageInput({ sendMessage }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            sendMessage(message);
            setMessage('');
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="mt-3">
            <InputGroup>
                <Form.Control
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <Button variant="primary" type="submit">Send</Button>
            </InputGroup>
        </Form>
    );
}

export default MessageInput;
