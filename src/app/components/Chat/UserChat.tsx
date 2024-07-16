import React, { useState } from 'react';
import { useSocket } from '@/app/contexts/socketContext';
import ChatBox from './ChatBox';

interface ChatWindowProps {
  orderId: number;
  isOpen: boolean;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  orderId,
  isOpen,
  onClose,
}) => {
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

  const handleCloseChat = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className="bg-red-300 rounded-xl shadow-md overflow-hidden border-red-500"
        style={{ width: '350px' }}
      >
        {!isConnected || !roomId ? (
          <div className="p-4">
            <div className="text-lg font-bold mb-4 text-gray-800">
              Cuentanos tu problema
            </div>
            <input
              type="text"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the problem..."
              className="w-full px-3 py-2 border text-black font-bold border-red-300 rounded-md mb-4 focus:outline-none  focus:border-red-500"
            />
            <button
              onClick={handleDescription}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300"
            >
              Start Chat
            </button>
          </div>
        ) : (
          <ChatBox onClose={handleCloseChat} />
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
