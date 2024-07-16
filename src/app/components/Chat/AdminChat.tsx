'use client';
import { Room, useSocket } from '@/app/contexts/socketContext';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import ChatBoxAdmin from './ChatBoxAdmin';

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
          'http://localhost:3002/chat/logs?page=1&limit=20',
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
    <div className="flex flex-col max-w-5xl mx-auto p-5">
      <h2 className="mb-5 text-2xl font-bold text-red-500">Admin Chat Box</h2>

      <div className="flex">
        {/* Chat Rooms List */}
        <div className="w-1/3 pr-4">
          <h3 className="mb-4 text-xl font-semibold">Chats</h3>
          <div className="overflow-y-auto max-h-96">
            {rooms.map((room, index) => (
              <div
                key={index}
                onClick={() => handleSelectChat(room)}
                className="p-3 mb-3 bg-gray-100 rounded-lg cursor-pointer shadow-md hover:bg-gray-200 transition-colors"
              >
                <span className="font-bold">Order ID:</span> {room.roomId}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Details and Messages */}
        <div className="w-2/3 pl-4">
          {selectedChat && (
            <div className="mb-5">
              <h3 className="mb-2 text-xl font-semibold">
                Order ID: {selectedChat.roomId}
              </h3>
              <div className="p-3 bg-gray-100 rounded-lg shadow-md">
                <pre>{JSON.stringify(selectedChat.chatLog, null, 2)}</pre>
              </div>
            </div>
          )}

          <h2 className="mb-4 text-xl font-semibold text-red-500">
            Previous Chats
          </h2>
          <div className="overflow-y-auto max-h-96">
            {chatRooms.map((chatLog: ChatLog, index: number) => (
              <div
                key={index}
                className="p-3 mb-3 bg-gray-100 rounded-lg shadow-md"
              >
                <h4 className="mb-2 text-lg font-semibold">
                  Order ID: {chatLog.order.id}
                </h4>
                <div>
                  {chatLog.chats.map((chat: Chat) => (
                    <p key={chat.id} className="mb-2 text-sm">
                      {chat.text}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedChat && userId !== null && chatLogId !== null ? (
        <div className="mt-5">
          <ChatBoxAdmin />
        </div>
      ) : null}
    </div>
  );
};

export default AdminChat;
