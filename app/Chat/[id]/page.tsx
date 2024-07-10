'use client';
import { useRouter,useParams } from 'next/navigation';
import ChatWindow from '@/components/ChatWindow';

const ChatPage = () => {
//   const router = useRouter();
  const { id } = useParams();

  if (!id) return <div>Loading...</div>;

  return <ChatWindow r_id={Number(id)} />;
};

export default ChatPage;
