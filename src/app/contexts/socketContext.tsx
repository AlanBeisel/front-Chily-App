'use client';

import io, { Socket } from 'socket.io-client';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuth } from './AuthContext';

export interface Room {
  roomId: string;
  chatLog: Record<string, any>;
}

interface Message {
  chatLogId: number;
  message: string;
  userId: number;
}

interface ChatSocketContextType {
  isConnected: boolean;
  chatLogId: number | null;
  roomId: string | null;
  rooms: Room[];
  errorMessage:string
  chatLogs: Record<number, any>;
  connectToRoom: (orderId: number, description: string) => void;
  joinNewRoom: (roomId: string) => void;
  sendMessage: (chatLogId: number, message: string, userId: number) => void;
  addMessage: (message: Message) => void;
  setChatLogs: (chatLogId: number, messages: Message[]) => void;
  setChatLogId: (chatLogId: number) => void;
}

const SocketContext = createContext<ChatSocketContextType | undefined>(
  undefined,
);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

const URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const socket: Socket = io(URL, { autoConnect: false });

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [chatLogs, setChatLogsState] = useState<Record<number, any>>({});
  const [chatLogId, setChatLogId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("")

  useEffect(() => {
    if (user) {
      socket.connect();
      if (user.role === 'admin') {
        socket.emit('adminConnected');
      }
    }

    const onConnect = () => {
      setIsConnected(true);
      console.log('Connected as role:', user!.role);      
    };

    const onDisconnect = () => {
      setIsConnected(false);
      setRoomId(null);
      setChatLogId(null);
      setChatLogsState({});
      setErrorMessage("")
    };

    const onCreateRoomResponse = (response: any) => {
      console.log('Create Room Response:', response);
      if (response.success) {
        setRoomId(response.roomId);
        setChatLogId(response.chatLog.id);
        console.log('Connected to room:', response.roomId);
      } else if(response.errorMessage) {
        setErrorMessage(response.errorMessage)
      } else {
        console.error(response.error)
      }
    };

    const onNewRoom = (roomId: string, chatLog: Record<string, string>) => {
      setRooms((prevRooms) => [...prevRooms, { roomId, chatLog }]);
      socket.emit('joinRoom', roomId);
    };

    const onJoinedRoom = (roomId: string, fetchedMessages: Message[]) => {
      const chatLogId = parseInt(roomId, 10);
      if (!isNaN(chatLogId)) {
        setChatLogs(chatLogId, fetchedMessages);
      }
    };

    const onMessage = (message: any) => {
      addMessage(message);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('createRoomResponse', onCreateRoomResponse);
    socket.on('newRoom', onNewRoom);
    socket.on('joinedRoom', onJoinedRoom);
    socket.on('on-message', onMessage);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('createRoomResponse', onCreateRoomResponse);
      socket.off('newRoom', onNewRoom);
      socket.off('joinedRoom', onJoinedRoom);
      socket.off('on-message', onMessage);
    };
  }, [user]);

  const connectToRoom = useCallback((orderId: number, description: string) => {
    socket.emit('createRoom', { orderId, description });
  }, []);

  const joinNewRoom = useCallback((roomId: string) => {
    setRooms((prevRooms) => {
      if (!prevRooms.some((room) => room.roomId === roomId)) {
        return [...prevRooms, { roomId, chatLog: {} }];
      }
      return prevRooms;
    });
    socket.emit('joinRoom', roomId);
  }, []);


const sendMessage = useCallback(
  (chatLogId: number, message: string, userId: number) => {
    if (chatLogId === undefined) {
      console.error('Cannot send message without a valid chatLogId.');
      return;
    }

    const newMessage = {
      text: message,
      userId,
      chatLogId,
    };
    socket.emit('send-message', newMessage);
    addMessage(newMessage);
  },
  [],
);

  const addMessage = useCallback((message: any) => {
    const chatLogId = message?.chatLogId;
    if (chatLogId === undefined) {
      console.error('Cannot add message without a valid chatLogId.');
      return;
    }

    setChatLogsState((prevMessages) => {
      const updatedMessages = { ...prevMessages };
      if (!updatedMessages[chatLogId]) {
        updatedMessages[chatLogId] = [];
      }
      updatedMessages[chatLogId]!.push(message);
      return updatedMessages;
    });
  }, []);

  const setChatLogs = useCallback((chatLogId: number, messages: Message[]) => {
    setChatLogsState((prevMessages) => ({
      ...prevMessages,
      [chatLogId]: messages,
    }));
  }, []);

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        chatLogId,
        roomId,
        rooms,
        chatLogs,
        connectToRoom,
        joinNewRoom,
        sendMessage,
        addMessage,
        setChatLogs,
        setChatLogId,
        errorMessage
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};