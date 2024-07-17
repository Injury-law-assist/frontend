import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import io, { Socket } from "socket.io-client";
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { getMessages } from '@/app/_api/api';
import { useAuthStore } from '@/app/store';
import SurveyModal from './SurveyModal';
import { FaSpinner } from 'react-icons/fa';

interface ChatWindowProps {
  r_id: number;
}

interface Message {
  text: string;
  isUser: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ r_id }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { accessToken } = useAuthStore();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data: messages = [], isLoading, error } = useQuery<Message[]>({
    queryKey: ['messages', r_id],
    queryFn: async () => {
      if (!r_id || !accessToken) return [];
      const fetchedMessages = await getMessages(r_id, accessToken);
      return fetchedMessages.sort((a: any, b: any) => a.m_id - b.m_id)
        .map((msg: any) => ({
          text: msg.m_content,
          isUser: msg.m_id % 2 === 0,
        }));
    },
    enabled: !!r_id && !!accessToken,
  });

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
          queryClient.setQueryData(['messages', r_id], (oldData: Message[] | undefined) =>
            [...(oldData || []), { text: data.answerMessage.answer, isUser: false }]
          );
          setIsAwaitingResponse(false);
        }
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      newSocket.on("reconnect", () => {
        console.log("Reconnected to server");
        queryClient.invalidateQueries({ queryKey: ['messages', r_id] });
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
  }, [r_id, queryClient]);

  const handleSendMessage = useCallback((message: string) => {
    if (socket && message.trim()) {
      const questionMessage = {
        sender: "User",
        question: message.trim()
      };
      socket.emit("chat message", { roomId: r_id, msg: questionMessage });
      queryClient.setQueryData(['messages', r_id], (oldData: Message[] | undefined) =>
        [...(oldData || []), { text: message, isUser: true }]
      );
      setIsAwaitingResponse(true);
    }
  }, [socket, r_id, queryClient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const onSurvey = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    console.log("Survey submitted");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="flex flex-col h-full max-h-screen from blue-100 to-white relative">
      {showModal && <SurveyModal closeModal={closeModal} handleSubmit={handleSubmit} />}
      <div className={`flex-grow overflow-y-auto p-4 space-y-4 ${showModal ? 'opacity-50' : ''}`}>
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.text} isUser={msg.isUser} />
        ))}
        {isAwaitingResponse && (
          <div className="flex items-center space-x-2 text-gray-500">
            <FaSpinner className="animate-spin" />
            <span>답변중입니다...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className='flex justify-center my-4'>
        <button
          onClick={onSurvey}
          className='px-6 py-2 font-semibold text-blue-600 bg-white rounded-full shadow-md hover:bg-blue-50 transition duration-300 ease-in-out'
        >
          대화종료
        </button>
      </div>
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
