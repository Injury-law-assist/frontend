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
  m_id: number;
  cr_id: number;
  u_id: number;
  m_content: string;
  m_created_at: string;
  m_updated_at: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ r_id }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { accessToken, user } = useAuthStore();

  const fetchMessages = useCallback(async () => {
    if (!r_id || !accessToken) return;
    
    try {
      const fetchedMessages = await getMessages(r_id, accessToken);
      
      if (fetchedMessages && Array.isArray(fetchedMessages)) {
        setMessages(fetchedMessages);
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
          const newMessage: Message = {
            m_id: Date.now(), 
            cr_id: r_id,
            u_id: 0,
            m_content: data.answerMessage.answer,
            m_created_at: new Date().toISOString(),
            m_updated_at: new Date().toISOString(),
          };
          setMessages(prev => [...prev, newMessage]);
        }
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      newSocket.on("reconnect", () => {
        console.log("Reconnected to server");
        fetchMessages();
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

  const handleSendMessage = (content: string) => {
    if (socket && content.trim() && user) {
      const newMessage: Message = {
        m_id: Date.now(), 
        cr_id: r_id,
        u_id: user.id,
        m_content: content.trim(),
        m_created_at: new Date().toISOString(),
        m_updated_at: new Date().toISOString(),
      };
      socket.emit("chat message", { roomId: r_id, msg: { sender: "User", question: content.trim() } });
      setMessages(prev => [...prev, newMessage]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const isUserMessage = (msg: Message) => user?.id === msg.u_id;

  return (
    <div className="flex flex-col h-full max-h-screen">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg) => (
          <ChatBubble key={msg.m_id} message={msg.m_content} isUser={isUserMessage(msg)} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;