import React, { useState } from 'react';
import { FaPaperPlane, FaMicrophone } from 'react-icons/fa';

const ChatWindow = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { text: message, from: 'You' }]);
    setMessage('');
  };

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 overflow-auto p-3 bg-white">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <strong>{msg.from}: </strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="border-top p-2 d-flex align-items-center">
        <input
          className="form-control me-2"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message"
        />
        <FaMicrophone className="me-2 cursor-pointer" />
        <button className="btn btn-primary" onClick={sendMessage}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;