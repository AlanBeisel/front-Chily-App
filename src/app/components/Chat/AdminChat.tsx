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

interface Product {
  id: number;
  name: string;
  price: number;
  // Agrega otros campos del producto si son necesarios
}


interface OrderDetail {
  id: string;
  quantity: number;
  price: number;
  total: number;
  product: Product;
  // Agrega otros campos del detalle de la orden si son necesarios
}

interface Order {
  formBuy: string;
  id: string;
  date: string;
  price: number;
  couponId: string;
  user: {
    name: string;
  };
  details: OrderDetail[];
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
  const { rooms, chatLogId, setChatLogId, isConnected } = useSocket();
  const [selectedChat, setSelectedChat] = useState<Room | null>(null);
  const [chatRooms, setChatRooms] = useState<ChatLog[]>([]);

  const handleSelectChat = (room: Room) => {
    setSelectedChat(room);
    setChatLogId(room.chatLog.id);
  };

  useEffect(() => {
    if (selectedChat) {
      console.log('selectedChat:', JSON.stringify(selectedChat.chatLog, null, 2));
    }
  }, [selectedChat]);

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
    <div className="flex h-screen">
      {/* Lista de conversaciones (izquierda) */}
      <div className="w-1/3 p-4 bg-gray-100 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Conversaciones</h2>
        {isConnected ? (
          <>
            <h3 className="text-lg font-semibold mb-2">Chats Activos</h3>
            {rooms.map((room, index) => (
              <div
                key={index}
                onClick={() => handleSelectChat(room)}
                className={`p-3 mb-2 rounded-lg cursor-pointer ${
                  selectedChat?.roomId === room.roomId
                    ? 'bg-red-200'
                    : 'bg-white hover:bg-gray-200'
                }`}
              >
                <span className="font-bold">Order ID:</span> {room.roomId}
              </div>
            ))}
            <h3 className="text-lg font-semibold mt-4 mb-2">
              Chats Anteriores
            </h3>
            {chatRooms.map((chatLog, index) => (
              <div
                key={index}
                className="p-3 mb-2 bg-white rounded-lg cursor-pointer hover:bg-gray-200"
              >
                <span className="font-bold">Order ID:</span> {chatLog.order.id}
              </div>
            ))}
          </>
        ) : (
          <p className="text-red-500">Desconectado. Reconectando...</p>
        )}
      </div>

      <div className="w-2/3 p-4 flex flex-col">
        {selectedChat && selectedChat.chatLog && selectedChat.chatLog.order ? (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Chat - Order ID: {selectedChat.roomId}
            </h2>
            <div className="flex-grow overflow-y-auto mb-4">
              <div className="bg-gray-100 p-4 rounded">
                <p className="mb-2">
                  <span className="font-semibold">Cliente:</span>{' '}
                  {selectedChat.chatLog.order.user?.name || 'N/A'}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Forma de pago:</span>{' '}
                  {selectedChat.chatLog.order.formBuy || 'N/A'}
                </p>
                <h3 className="font-bold text-lg mt-4 mb-2">
                  Detalles de los productos:
                </h3>
                <ul>
                  {selectedChat.chatLog.order.details?.map(
                    (detail: OrderDetail, index: number) => (
                      <li key={index} className="mb-2">
                        <span className="font-semibold">
                          {detail.product?.name || 'Producto desconocido'}
                        </span>
                        <br />
                        Cantidad: {detail.quantity || 0}
                      
                      </li>
                    ),
                  ) || <li>No hay detalles disponibles</li>}
                </ul>
                <p className="mt-4 font-semibold">
                  Total del pedido: $
                  {(selectedChat.chatLog.order.total || 0).toFixed(2)}
                </p>
              </div>
            </div>
            {userId !== null && chatLogId !== null && isConnected && (
              <ChatBoxAdmin />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">
              {selectedChat
                ? 'Cargando detalles del chat...'
                : 'Selecciona una conversación para ver los detalles'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
