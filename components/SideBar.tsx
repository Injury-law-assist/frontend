'use client';

import React, { useEffect, useState } from 'react';
import { getChatting, deleteChat } from '@/app/_api/api';
import { useAuthStore } from '@/app/store';
import { ChatRoom } from '@/app/types/ChatRoom';
import { useRouter } from 'next/navigation';
import { FaChevronLeft, FaChevronRight, FaTrash, FaArrowRight, FaPlus } from 'react-icons/fa';
import CreateChatRoomForm from './CreateChatRoom';
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuthStore();
  const router = useRouter();
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  useEffect(() => {
    const fetchChatRooms = async () => {
      if (!accessToken) {
        setError('No Access');
        setLoading(false);
        return;
      }
      try {
        const data = await getChatting(accessToken);
        setChatRooms(data);
      } catch (error) {
        setError('Failed to load chat rooms. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, [accessToken]);

  const handleDelete = async (r_id: number): Promise<void> => {
    try {
      await deleteChat(r_id, accessToken);
      setChatRooms(chatRooms.filter(room => room.cr_id !== r_id));
      router.refresh();
    } catch (error) {
      setError('Failed to delete chat room. Please try again.');
    }
  };

  const handleSelectChatRoom = (r_id: number) => {
    router.push(`/Chat/${r_id}`);
  };

  const handleCreateChat = () => {
    setShowCreateForm(true);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
  };

  return (
    <div className={`h-full bg-gray-800 text-black transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex justify-end p-4">
        <button
          onClick={toggleSidebar}
          className="text-white hover:bg-gray-700 p-2 rounded-full transition-colors duration-200"
        >
          {isOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>
      </div>
      {isOpen && (
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl text-white font-semibold">대화 목록</h2>
            <button
              onClick={handleCreateChat}
              className="text-white hover:text-slate-300 transition-colors duration-200"
              title="새 채팅방 만들기"
            >
              <FaPlus size={20} />
            </button>
          </div>
          {loading && <p className="text-gray-400">Loading...</p>}
          {error && <p className="text-red-400">{error}</p>}
          <ul className="space-y-2">
            {chatRooms.map((room) => (
              <li key={room.cr_id} className="rounded-lg p-3 hover:bg-gray-600 transition-colors duration-200">
                <div className="flex justify-between items-center">
                  <span className="truncate text-white">{room.title}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSelectChatRoom(room.cr_id)}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                      title="Go to chat room"
                    >
                      <FaArrowRight />
                    </button>
                    <button
                      onClick={() => handleDelete(room.cr_id)}
                      className="text-red-400 hover:text-red-300 transition-colors duration-200"
                      title="Delete chat room"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white w-full max-w-md m-4 p-6 rounded-lg shadow-xl">
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <CreateChatRoomForm onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;