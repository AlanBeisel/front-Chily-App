'use client';

import io, { Socket } from 'socket.io-client';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuth } from './AuthContext';

export interface Room {
  roomId: string
  chatLog:Record<string, any>
}

interface ChatSocketContextType {
  isConnected: boolean;
  orderId: number | null;
  connectToRoom: (orderId: number, description: string) => void;
  joinNewRoom: (roomId: string) => void;
  sendMessage: (orderId: number, message: string, userId: number) => void;
  roomId: string | null
  rooms:Room[]
  
}
const SocketContext = createContext<ChatSocketContextType | undefined>(
  undefined,
);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('Use socket must be used within a SocketProvider');
  }
  return context;
};



// Define the URL based on the environment
const URL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

// Initialize the socket with the specified URL and options
export const socket: Socket = io(URL, { autoConnect: false });


export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {user} = useAuth()
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [rooms, setRooms] = useState<Room[]>([])
  const [roomId, setRoomId] = useState<string | null>(null)

 

  useEffect(() => {
    if (user) {
      socket.connect()
      if (user.role === "admin") {
        socket.emit('adminConnected');
      }
    }

    const onConnect = () => {
      setIsConnected(true);
      console.log("role", user!.role)
    };
    const onDisconnect = () => {
      setIsConnected(false);
      setRoomId("")
    
    };

    const onCreateRoomResponse = (response: any) => {
      console.log('Create Room Response:', response);
      if (response.success) {
        setIsConnected(true)
        setRoomId(response.roomId)
        console.log('Connected to room:', response.roomId);
      } else {
        console.error('Failed to create room:', response.error);
      }
    };
   
     const onNewRoom = (roomId: string, chatLog: Record<string, string>) => {
       setRooms((prevRooms) => [...prevRooms, { roomId, chatLog }]);
       socket.emit('joinRoom', roomId);
    };
    
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('createRoomResponse', onCreateRoomResponse);
    socket.on("newRoom", onNewRoom)
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('createRoomResponse', onCreateRoomResponse);
      socket.off("newRoom", onNewRoom)
    };
  }, [user]);

  const connectToRoom = (orderId: number, description: string) => {
    setOrderId(orderId);
    socket.emit('createRoom', { orderId, description });
  };

  const joinNewRoom = (roomId: string) => {
    setRooms((prevRooms) => {
      if (!prevRooms.some((room) => room.roomId === roomId)) {
        return [...prevRooms, { roomId, chatLog: {} }];
      }
      return prevRooms;
    });
    socket.emit('joinRoom', roomId);
  };

  const sendMessage = (orderId: number, message: string, userId: number) => {
    socket.emit('send-message', { chatLogId: orderId, text: message, userId });
  }

  return (
    <SocketContext.Provider value={{ isConnected, orderId, connectToRoom, joinNewRoom, sendMessage, roomId, rooms  }}>
      {children}
    </SocketContext.Provider>
  );
};
