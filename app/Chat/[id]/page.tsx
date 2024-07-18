'use client';

import { useParams } from 'next/navigation';
import ChatWindow from '@/components/ChatWindow';
import { useEffect, useState } from 'react';

const ChatPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  return <ChatWindow r_id={Number(id)} />;
};

export default ChatPage;