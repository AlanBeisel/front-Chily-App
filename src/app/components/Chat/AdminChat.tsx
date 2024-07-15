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
    <div className="admin-chat" style={{maxWidth: '800px', margin: '0 auto', padding: '20px'}}>
      <h2 style= {{marginBottom: '20px', fontSize:'1.5rem', fontWeight: 'bold', color: '#f44336'}}>Admin Chat Box</h2>
      <div className="chats" style={{marginBottom: '20px'}}>
        {rooms.map((room, index) => (
          <div
            key={index}
            onClick={() => handleSelectChat(room)}
            className="chat"
            style={{
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '10px',
              backgroundColor: '#f2f2f2',
              cursor: 'pointer',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s'
            }}
          >
            <span style= {{fontWeight: 'bold'}}>Order ID:</span> {room.roomId}
          </div>
        ))}
      </div>
      <div className="chat-details">
        {selectedChat && (
          <div style={{ marginBottom: '20px'}}>
            <h3 style= {{marginBottom: '10px', fontSize: '1.2rem'}}>Order ID: {selectedChat.roomId}</h3>
            <div style={{backgroundColor: '#f2f2f2', padding: '10px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}> <h3>{JSON.stringify(selectedChat.chatLog)}</h3>
          </div>
          </div>
        )}
        <div>
          <h2 style={{ marginBottom: '10px', fontSize: '1.3rem', fontWeight: 'bold', color: '#f44336'}}>Previous Chats</h2>
          <div className="chats">
            {chatRooms.map((chatLog: ChatLog, index: number) => (
              <div
                key={index}
                className="chat"
                style={{
                  padding: '10px',
                  borderRadius: '4px',
                  marginBottom: '10px',
                  backgroundColor: '#f2f2f2',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h4 style={{marginBottom: '5px', fontSize: '1rem'}}>Order ID: {chatLog.order.id}</h4>
                <div>
                  {chatLog.chats.map((chat: Chat) => (
                    <p key={chat.id} style={{marginBottom: '5px', fontSize: '0.9rem'}}>{chat.text}</p>
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
        <div style={{marginTop: '20px'}}>
          <ChatBox />
        </div>
      ) : null}
    </div>
  );
};

export default AdminChat;