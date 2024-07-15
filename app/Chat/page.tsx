'use client';

import { useQuery } from '@tanstack/react-query';
import { getChatting } from '@/app/_api/api';
import { useAuthStore } from '@/app/store';
import Link from 'next/link';
import { ChatRoom } from '../types/ChatRoom';

const ChatList = () => {
  const { accessToken } = useAuthStore();

  const { data: chatRooms, isLoading, error } = useQuery<ChatRoom[], Error>({
    queryKey: ['chatRooms', accessToken],
    queryFn: () => getChatting(accessToken),
    enabled: !!accessToken,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message || 'An error occurred'}</p>;
  if (!chatRooms) return <p>채팅방이 존재하지 않습니다.</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">대화 내역</h2>
      <ul className="list-disc pl-5 space-y-2">
        {chatRooms.map((room) => (
          <li key={room.cr_id} className="flex justify-between items-center">
            <span>{room.title}</span>
            <Link href={`/Chat/${room.cr_id}`} className="text-indigo-700 hover:text-indigo-500 font-semibold">
              Go to Chat
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;