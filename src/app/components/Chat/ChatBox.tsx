import { socket, useSocket } from "@/app/contexts/socketContext"
import { useEffect, useState } from "react"

const ChatBox: React.FC<{ orderId: number, userId: number }> = ({ orderId, userId }) => {
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<any[]>([])
  const { sendMessage } = useSocket()
  
  const handleSendMessage = () => {
    sendMessage(orderId, message, userId)
    setMessage("")
  }

  useEffect(() => {
    const handdleMessage = (newMessage: any) => {
      setMessages((prevMessages) => [...prevMessages, newMessage])
      
    }
    socket.on("on-message", handdleMessage)
    return () => {
      socket.off("on-message", handdleMessage)
    }
  }, [])

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          color:"black"
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
  
}
export default ChatBox