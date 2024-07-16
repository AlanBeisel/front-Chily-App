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
    <div className="flex flex-col max-w-md mx-auto border border-gray-300 rounded-lg shadow-md">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-t-lg">
        {chatMessages.map((msg: Record<string, any>, index: number) => (
          <div key={index} className="bg-white p-3 my-2 rounded-lg shadow-sm">
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="w-full p-2 mb-2 rounded-lg border border-gray-300 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        disabled={!isConnected}
      />
      <button
        onClick={handleSendMessage}
        className="w-full p-3 bg-red-500 text-white border-none rounded-lg cursor-pointer text-lg mt-2 shadow-sm transition-all duration-300 ease-in-out hover:bg-red-600 disabled:opacity-50"
        disabled={!isConnected}
      >
        Send
      </button>
    </div>
  );
};

export default ChatBoxAdmin;
