import { useSocket } from '@/app/contexts/socketContext';

import React, { useState } from 'react';
import ChatBox from './ChatBox';


interface ChatWindowProps {
  orderId: number;  
}

const ChatWindow: React.FC<ChatWindowProps> = ({ orderId }) => {
  const [problem, setProblem] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const { isConnected, roomId, connectToRoom } = useSocket();
  

  const handleDescription = () => {
    setDescription(problem);
    connectToRoom(orderId, description);
  };

  const handleKeyDown =(event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleDescription()
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#282c34',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        margin: '20px auto',
      }}
    >
      {!isConnected || !roomId? (
        <div>
          <div style={{ marginBottom: '10px' }}>Problem Description</div>
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
              color: 'blue',
            }}
          />
          <button
            onClick={handleDescription}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#61dafb',
              color: '#282c34',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Start Chat
          </button>
        </div>
      ) : (
          <ChatBox/>
      )}
    </div>
  );
};

export default ChatWindow;
