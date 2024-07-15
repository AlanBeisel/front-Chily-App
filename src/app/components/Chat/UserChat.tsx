'use client';
import { useSocket } from '@/app/contexts/socketContext';
import React, { useState } from 'react';
import ChatBox from './ChatBox';

interface ChatWindowProps {
  orderId: number;
  isOpen: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ orderId, isOpen }) => {
  const [problem, setProblem] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { isConnected, roomId, connectToRoom } = useSocket();

  const handleDescription = () => {
    setDescription(problem);
    connectToRoom(orderId, description);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleDescription();
    }
  };

  if(!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        backgroundColor: '#f44336',
        color: 'black',
        padding: '20px',
        borderRadius: '8px',
        width: '80%',
        maxWidth: '400px',
        margin: '20px auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      {!isConnected || !roomId ? (
        <div>
          <div style={{ marginBottom: '10px', fontSize:'1.2rem', fontWeight: 'bold', color:'white' }}>Problem Description</div>
          <input
            type="text"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the problem..."
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              boxSizing:'border-box',
              color: 'j',
            }}
          />
          <button
            onClick={handleDescription}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#fff',
              color: '#f44336',
              border: '1px solid #e9e7e7',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize:'1rem',
              marginTop: '10px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s, color 0.3s',
              boxSizing: 'border-box',
              fontWeight: '600'
            }}
          >
            Start Chat
          </button>
        </div>
      ) : (
        <ChatBox />
      )}
    </div>
  );
};

export default ChatWindow;
