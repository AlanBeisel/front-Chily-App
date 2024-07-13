'use client';
import { Room, useSocket } from '@/app/contexts/socketContext';
import { useState } from 'react';
import ChatBox from './ChatBox';
import { useAuth } from '@/app/contexts/AuthContext';



const AdminChat: React.FC = () => {
  const { user } = useAuth();
  const { rooms } = useSocket();
  const [selectedChat, setSelectedChat] = useState<Room | null>(null);
  const [orderId, setOrderId] = useState<number|null>(null)

  const handleSelectChat = (room: Room) => {
    setSelectedChat(room);
    setOrderId(room.chatLog.id);    
  };

  
  const userId = user && user.id ? Number(user.id) : null;

  return (
    <div className="admin-chat">
      <h2>Admin Chat Box</h2>
      <div className="chats">
        {rooms.map((room, index) => (
          <div
            key={index}
            onClick={() => handleSelectChat(room)}
            className="chat"
          >
            Order ID: {room.roomId}
          </div>
        ))}
      </div>
      <div className="chat-details">
        {selectedChat && (
          <div>
            <h3>Order ID: {selectedChat.roomId}</h3>
            <h3>{JSON.stringify(selectedChat.chatLog)}</h3>
          </div>
        )}
      </div>
      {selectedChat && userId !== null && orderId !== null ? (
        <div>
          <ChatBox orderId={orderId} userId={userId} />
        </div>
      ) : null}
    </div>
  );
};

export default AdminChat;