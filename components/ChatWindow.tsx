import React, { useState, useEffect, useRef, useCallback } from 'react';
import io, { Socket } from "socket.io-client";
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { getMessages } from '@/app/_api/api'; 
import { useAuthStore } from '@/app/store';

interface ChatWindowProps {
  r_id: number;
}

interface Message {
  text: string;
  isUser: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ r_id }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { accessToken } = useAuthStore();

  const fetchMessages = useCallback(async () => {
    if (!r_id || !accessToken) return;
    
    try {
      const fetchedMessages = await getMessages(r_id, accessToken);
      
      if (fetchedMessages) {
        const formattedMessages = fetchedMessages.map((msg: any) => ({
          text: msg.m_content,
          isUser: msg.m_id % 2 === 0,
        }));
        setMessages(formattedMessages);
        console.log(formattedMessages)
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  }, [r_id, accessToken]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    if (!r_id) return;

    const newSocket = io("https://api.g-start-up.com", { 
      path: "/bot",
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    const setupSocket = () => {
      newSocket.emit("join room", r_id);

      newSocket.on("chat message", (data) => {
        if (data && data.answerMessage) {
          setMessages(prev => [...prev, { text: data.answerMessage.answer, isUser: false }]);
        }
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      newSocket.on("reconnect", () => {
        console.log("Reconnected to server");
        fetchMessages();  // 재연결 시 메시지 다시 불러오기
      });
    };

    newSocket.on("connect", () => {
      console.log(`Connected with ID: ${newSocket.id}`);
      setupSocket();
    });

    setSocket(newSocket);

    return () => {
      console.log(`Disconnecting from room ${r_id}`);
      newSocket.disconnect();
    };
  }, [r_id, fetchMessages]);

  const handleSendMessage = (message: string) => {
    if (socket && message.trim()) {
      const questionMessage = {
        sender: "User",
        question: message.trim()
      };
      socket.emit("chat message", { roomId: r_id, msg: questionMessage });
      setMessages(prev => [...prev, { text: message, isUser: true }]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-h-screen">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.text} isUser={msg.isUser} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
