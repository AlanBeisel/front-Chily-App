'use client';
import { useAuth } from '@/app/contexts/AuthContext';
import { useSocket } from '@/app/contexts/socketContext';
import { useState } from 'react';

const ChatBoxAdmin: React.FC = () => {
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
    <div className="flex flex-col w-full h-full mx-auto bg-red-100 rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4">
        {chatMessages.map((msg: Record<string, any>, index: number) => (
          <div
            key={index}
            className={`max-w-[70%] p-3 my-2 rounded-2xl ${
              msg.isSent
                ? 'ml-auto bg-red-500 text-white'
                : 'mr-auto bg-white text-gray-800'
            }`}
          >
            {msg.text}
            <div
              className={`text-xs mt-1 ${msg.isSent ? 'text-red-200' : 'text-gray-500'}`}
            >
              {msg.time}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-4 rounded-b-lg">
        <div className="flex items-center bg-gray-100 rounded-full">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-grow p-3 bg-transparent text-gray-800 focus:outline-none"
            disabled={!isConnected}
          />
          <button
            onClick={handleSendMessage}
            className="p-3 bg-red-500 text-white rounded-full flex items-center justify-center"
            disabled={!isConnected}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxAdmin;
