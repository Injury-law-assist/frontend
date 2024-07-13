'use client';
import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { getMessages } from '@/app/_api/api'; 
import { useAuthStore } from '@/app/store';

interface ChatWindowProps {
  r_id: number;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ r_id }) => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (!r_id || !accessToken) return;

    const fetchMessages = async () => {
      const fetchedMessages = await getMessages(r_id, accessToken);
      
      if (fetchedMessages) {
        const formattedMessages = fetchedMessages.map((msg: any) => ({
          text: msg.content,
          isUser: msg.isUser,
        }));
        setMessages(formattedMessages);
      }
    };

    fetchMessages();
  }, [r_id, accessToken]);

  const handleSendMessage = (message: string) => {
    setMessages((prev) => [...prev, { text: message, isUser: true }]);
    setMessages((prev) => [...prev, { text: "자동 응답 메시지", isUser: false }]); // 실제 응답 메시지로 교체하세요
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
