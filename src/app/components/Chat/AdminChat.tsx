'use client';

import { useEffect, useState } from "react";
import io from "socket.io-client"
import ChatWindow from "./UserChat";


const socket = io('http://localhost:3000');

interface Chat {
  id: number;
  orderId: number;
  problemDescription: string;
  messages: string[];
}




const AdminChat: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  useEffect(() => {
    socket.on('newChat', (chat: Chat) => {
      setChats((prevChats) => [...prevChats, chat]);
    });
    return () => {
      socket.off('newChat');
    };
  }, []);

  const handleSelectChat = (chat:Chat) => {
    setSelectedChat(chat)
  }
  return (
    <div className="admin-chat">
      <h2>Admin Chat Box</h2>
      <div className="chats">
        {chats.map((chat, index) => (
          <div key={index} onClick={() => handleSelectChat(chat)} className="chat">Order ID: {chat.orderId }</div>
        ))}
      </div>
      <div className="chat-details">
        {selectedChat && (
          <div>
            <h3>Order ID:{selectedChat.orderId}</h3>
            <h3>{selectedChat.problemDescription}</h3>
            
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminChat