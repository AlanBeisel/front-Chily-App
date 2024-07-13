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

interface Message {
  text: string;
  orderId: number;
  userId: number;
}

interface ChatSocketContextType {
  isConnected: boolean;
  orderId: number | null;
  chatLogId:number | null
  roomId: string | null
  rooms: Room[]
  messages: Record<number, Message[]>; 
  connectToRoom: (orderId: number, description: string) => void;
  joinNewRoom: (roomId: string) => void;
  sendMessage: (orderId: number, message: string, userId: number) => void;
  addMessage: (message: Message) => void;
  setMessages: (orderId: number, messages: Message[]) => void;  
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
  const [messages, setMessagesState] = useState<Record<number, Message[]>>({});
  const [chatLogId, setChatLogId] = useState<number|null>(null)


 

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
      setChatLogId(null)
    
    };

    const onCreateRoomResponse = (response: any) => {
      console.log('Create Room Response:', response);
      if (response.success) {
        setIsConnected(true)
        setRoomId(response.roomId)
        setChatLogId(response.chatLog.id)
        console.log('Connected to room:', response.roomId);
      } else {
        console.error('Failed to create room:', response.error);
      }
    };
   
     const onNewRoom = (roomId: string, chatLog: Record<string, string>) => {
       setRooms((prevRooms) => [...prevRooms, { roomId, chatLog }]);
       socket.emit('joinRoom', roomId);
    };

    const onJoinedRoom = (roomId: string, fetchedMessages: Message[]) => {
      const orderId = parseInt(roomId, 10)
      setMessages(orderId, fetchedMessages)
    }
    
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('createRoomResponse', onCreateRoomResponse);
    socket.on("newRoom", onNewRoom)
    socket.on("joinedRoom", onJoinedRoom)
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('createRoomResponse', onCreateRoomResponse);
      socket.off("newRoom", onNewRoom)
      socket.off('joinedRoom', onJoinedRoom);
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

 

   const sendMessage = (chatLogId: number, message: string, userId: number, orderId:number) => {
     const newMessage = { text: message, userId, chatLogId   };     
     socket.emit('send-message', newMessage);
     addMessage({text:message, orderId, userId})
  };
  
   const addMessage = (message: Message) => {
     setMessagesState((prevMessages) => {
       const updatedMessages = { ...prevMessages };
       if (!updatedMessages[message.orderId]) {
         updatedMessages[message.orderId] = [];
       }
       updatedMessages[message.orderId]!.push(message);
       return updatedMessages;
     });
  };
  
   const setMessages = (orderId: number, messages: Message[]) => {
     setMessagesState((prevMessages) => ({
       ...prevMessages,
       [orderId]: messages,
     }));
   };
 

  return (
    <SocketContext.Provider value={{ isConnected, orderId, connectToRoom, joinNewRoom, sendMessage, roomId, rooms, messages, addMessage,
  setMessages, chatLogId }}>
      {children}
    </SocketContext.Provider>
  );
};
