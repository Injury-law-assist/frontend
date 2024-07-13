// components/Sidebar.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { getChatting, deleteChat } from '@/app/_api/api';
import { useAuthStore } from '@/app/store';
import { ChatRoom } from '@/app/types/ChatRoom';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { accessToken } = useAuthStore();
  const router = useRouter();
  
  useEffect(() => {
    setIsClient(true);
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

  if (!isClient) {
    return null; 
  }

  return (
    <div className="flex h-full">
      <div className={`h-full bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
        <div className="flex justify-end p-4">
          <button
            onClick={toggleSidebar}
            className="text-white bg-gray-700 hover:bg-gray-600 p-2 rounded"
          >
            {isOpen ? '<<' : '>>'}
          </button>
        </div>
        {isOpen && (
          <div className="p-4">
            <p className="mb-4">Your Chat Rooms</p>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul className="list-disc pl-5 space-y-2">
              {chatRooms.map((room) => (
                <li key={room.cr_id} className="flex justify-between items-center">
                  <span>{room.title}</span>
                  <div>
                    <button
                      onClick={() => handleSelectChatRoom(room.cr_id)}
                      className="text-indigo-700 hover:text-indigo-500 font-semibold mr-2"
                    >
                      Go
                    </button>
                    <button
                      onClick={() => handleDelete(room.cr_id)}
                      className="text-red-500 hover:text-red-300 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;