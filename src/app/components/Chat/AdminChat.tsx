'use client';
import { Room, useSocket } from '@/app/contexts/socketContext';
import { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import { useAuth } from '@/app/contexts/AuthContext';

interface Chat {
  id: number;
  text: string;
  createdAt: string;
}

interface Order {
  formBuy: string;
  id: string;
  date: string;
  price: number;
  couponId: string;
  couponDiscount: number;
  total: number;
  status: string;
  orderInstructions: string;
  deletedAt: string | null;
}

interface ChatLog {
  id: number;
  date: string;
  description: string;
  chats: Chat[];
  order: Order;
}

const AdminChat: React.FC = () => {
  const { user } = useAuth();
  const { rooms, chatLogId, setChatLogId } = useSocket();
  const [selectedChat, setSelectedChat] = useState<Room | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatLog[]>([]);

  const handleSelectChat = (room: Room) => {
    setSelectedChat(room);
    setChatLogId(room.chatLog.id);
    console.log('when selecting chat:', chatLogId);
  };

  const userId = user && user.id ? Number(user.id) : null;

  useEffect(() => {
    const fetchChatLogs = async () => {
      console.log('Fetching all chats...');
      try {
        const response = await fetch(
          'http://localhost:3000/chat/logs?page=1&limit=20',
        );
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error al cargar chats', errorData);
          throw new Error(`Error al obtener chats: ${errorData.message}`);
        }
        const data = await response.json();
        setChatRooms(data.data);
        console.log('chats fetched:', data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchChatLogs();
  }, []);

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
        <div>
          <h2>Previous Chats</h2>
          <div className="chats">
            {chatRooms.map((chatLog: ChatLog, index: number) => (
              <div
                key={index}
                className="chat"
              >
                <h4>Order ID: {chatLog.order.id}</h4>
                <div>
                  {chatLog.chats.map((chat: Chat) => (
                    <p key={chat.id}>{chat.text}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="chat-details">         
          </div>
        </div>
      </div>
      {selectedChat && userId !== null && chatLogId !== null ? (
        <div>
          <ChatBox />
        </div>
      ) : null}
    </div>
  );
};

export default AdminChat;