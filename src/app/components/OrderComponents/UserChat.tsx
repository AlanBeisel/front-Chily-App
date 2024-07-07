'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://your-backend-url');

interface chatWindowProps{
  orderId: string
  problemDescription:string
}

const ChatWindow: React.FC<chatWindowProps> = ({ orderId, problemDescription })=>{
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("")
  
  useEffect(() => {
    socket.emit("join", { orderId, problemDescription })
    
    socket.on("message", (msg: string) => {
      setMessages((prevMessages)=>[...prevMessages, msg])
    })
    return () => {
      socket.off("message")
    }
  }, [orderId, problemDescription])

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message)
      setMessages((prevMessages) => [...prevMessages, message])
      setMessage("")
    }
  }
  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div className="input">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage} >Send</button>
      </div>
    </div>
  );
}
export default ChatWindow