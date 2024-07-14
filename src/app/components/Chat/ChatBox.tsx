import { useAuth } from "@/app/contexts/AuthContext";
import {  useSocket } from "@/app/contexts/socketContext"
import {  useState } from "react"



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
        {chatMessages.map((msg:Record<string,any>, index:number) => (
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
          border: '1px solid #ccc',
          color: 'black',
        }}
        disabled={!isConnected}
      />
      <button
        onClick={handleSendMessage}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#61dafb',
          color: '#282c34',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        disabled={!isConnected}
      >
        Send
      </button>
    </div>
  );
};

export default ChatBox;