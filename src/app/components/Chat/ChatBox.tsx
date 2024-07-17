import React, { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { useSocket } from '@/app/contexts/socketContext';

interface ChatBoxProps {
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
  const { user } = useAuth();
  const [message, setMessage] = useState<string>('');
  const [minimized, setMinimized] = useState<boolean>(false);
  const [closed, setClosed] = useState<boolean>(false); 
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

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  const handleClose = () => {
    setClosed(true);
    onClose();
  };

  if (minimized && !closed) {
    return (
      <button
        onClick={toggleMinimize}
        className="fixed bottom-4 right-4 bg-red-500 text-black p-3 rounded-full shadow-lg hover:bg-red-600 focus:outline-none"
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
            d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
          />
        </svg>
      </button>
    );
  }

  return (
    <div
      className={`max-w-md mx-auto border border-gray-300 rounded-lg shadow-md ${minimized ? 'minimized' : ''}`}
    >
      {!minimized && (
        <div className="flex justify-between items-center bg-red-500 rounded-t-lg px-4 py-2">
          <div className="font-bold text-lg text-gray-800">Chat con Chilly</div>
          <div className="flex">
            <button
              onClick={toggleMinimize}
              className="text-gray-600 hover:text-gray-800 text-3xl focus:outline-none"
            >
              {minimized ? '+' : '-'}
            </button>
            <button
              onClick={handleClose}
              className="text-gray-600 text-xl hover:text-gray-800 ml-2 focus:outline-none"
            >
              X
            </button>
          </div>
        </div>
      )}

      {!minimized && (
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 h-80">
          {chatMessages.length > 0 ? (
            chatMessages.map((msg: Record<string, any>, index: number) => (
              <div
                key={index}
                className={`max-w-[70%] p-3 my-2 rounded-2xl ${
                  msg.isSent
                    ? 'ml-auto bg-red-500 text-white'
                    : 'mr-auto bg-white text-gray-800'
                }`}
              >
                {msg.text}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No messages yet</div>
          )}
        </div>
      )}

      {!minimized && (
        <div className="flex p-4 bg-gray-200 rounded-b-lg">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 p-2 mr-2 rounded-lg border border-gray-300 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            disabled={!isConnected}
          />
          <button
            onClick={handleSendMessage}
            className="p-3 bg-red-500 text-white rounded-lg cursor-pointer text-lg shadow-sm transition-all duration-300 ease-in-out hover:bg-red-600 disabled:opacity-50"
            disabled={!isConnected}
          >
            Send
          </button>
        </div>
      )}

      {minimized && (
        <button
          onClick={toggleMinimize}
          className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 focus:outline-none"
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
              d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatBox;

