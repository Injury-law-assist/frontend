'use client';

import { useQuery } from '@tanstack/react-query';
import { getChatting } from '@/app/_api/api';
import { useAuthStore } from '@/app/store';
import Link from 'next/link';
import { ChatRoom } from '../types/ChatRoom';
import { FaComments, FaArrowRight } from 'react-icons/fa';

const ChatList = () => {
  const { accessToken } = useAuthStore();

  const { data: chatRooms, isLoading, error } = useQuery<ChatRoom[], Error>({
    queryKey: ['chatRooms', accessToken],
    queryFn: () => getChatting(accessToken),
    enabled: !!accessToken,
  });

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error.message || 'An error occurred'}</div>;
  if (!chatRooms || chatRooms.length === 0) return <div className="text-center mt-10">채팅방이 존재하지 않습니다.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center">
        <FaComments className="mr-2 text-indigo-600" />
        대화 내역
      </h2>
      <ul className="space-y-4">
        {chatRooms.map((room) => (
          <li key={room.cr_id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition duration-300">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">{room.title}</span>
              <Link 
                href={`/Chat/${room.cr_id}`} 
                className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300"
              >
                Go to Chat
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;