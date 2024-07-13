import {  useSocket } from "@/app/contexts/socketContext"
import {  useState } from "react"

interface ChatBoxProps {
  orderId: number;
  userId: number;
}

const ChatBox: React.FC<ChatBoxProps> = ({ orderId, userId }) => {
  const [message, setMessage] = useState<string>('');
  const { sendMessage, messages, chatLogId } = useSocket();
  const chatMessages = messages[orderId] || [];

  const handleSendMessage = () => {
    if (chatLogId && message.trim() && userId && orderId) {
      sendMessage(chatLogId, message, userId, orderId);
      console.log('Message sent:', { orderId, message, userId });
      setMessage('');
    } else {
      console.error('Failed to send message:', { orderId, message, userId });
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
        {chatMessages.map((msg, index) => (
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
      >
        Send
      </button>
    </div>
  );
};

export default ChatBox;