'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

interface ChatWindowProps{
  orderId: number
  
}

const ChatWindow: React.FC<ChatWindowProps> = ({ orderId }) => {
  const [problem, setProblem] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    // Establish socket connection when the component mounts
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
      setIsConnected(false);
    });

    // Clean up the connection when the component unmounts
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  useEffect(() => {
    // Emit createRoom event only when description is not empty
    if (description.trim() !== '') {
      socket.emit('createRoom', { orderId, description }, (response: any) => {
        if (response && response.success) {
          setIsConnected(true);
        } else {
          console.error('Failed to create room:', response);
        }
      });
    }
  }, [description, orderId]);

  const handleDescription = () => {
    setDescription(problem);
  };

  return (
    <div>
      <div>Problem Description</div>
      <input
        type="text"
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        placeholder="Describe the problem..."
      />
      <button onClick={handleDescription}>Start Chat</button>
      <div>Chat</div>
      {isConnected && (
        <div>You are now connected to the chat room for order {orderId}.</div>
      )}
    </div>
  );
};

export default ChatWindow;