'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import { useSocket } from '@/app/contexts/socketContext';
import { useState } from 'react';

const ChatBox: React.FC = () => {
  const { user } = useAuth();
  const [message, setMessage] = useState<string>('');
  const { sendMessage, chatLogs, chatLogId, isConnected } = useSocket();

  // Safely access chatMessages
  const chatMessages = chatLogId ? chatLogs[chatLogId] || [] : [];
  const userId = user ? parseInt(user.id, 10) : null;

  const handleSendMessage = () => {
    if (chatLogId && message.trim() && userId !== null) {
      sendMessage(chatLogId, message, userId);
      console.log('Message sent:', { chatLogId, message, userId });
      setMessage('');
    } else {
      console.error('Failed to send message:', { chatLogId, message, userId });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div>
      <div>
        {chatMessages.map((msg: Record<string, any>, index: number) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '4px',
          border: '1px solid #e9e7e7',
          color: 'black',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0,.1)',
          backgroundColor: '#fff',
          boxSizing: 'border-box',
        }}
        disabled={!isConnected}
      />
      <button
        onClick={handleSendMessage}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#f44336',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize:'1rem',
          marginTop: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s, color 0.3s',
          boxSizing: 'border-box',
          fontWeight: '600'
        }}
        disabled={!isConnected}
      >
        Send
      </button>
    </div>
  );
};

export default ChatBox;
