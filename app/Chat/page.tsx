"use client";

import { useEffect, useState } from "react";
import { getChatting } from "@/app/_api/api";
import { useAuthStore } from "@/app/store";
import Link from "next/link";
import { ChatRoom } from "../types/ChatRoom";

const ChatList = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuthStore();

  useEffect(() => {
    const fetchChatRooms = async () => {
      if (!accessToken) {
        setError("No Access");
        setLoading(false);
        return;
      }
      try {
        const data = await getChatting(accessToken);
        setChatRooms(data);
      } catch (error) {
        setError("Failed to load chat rooms. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, [accessToken]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Your Chat Rooms</h2>
      <ul className="list-disc pl-5 space-y-2">
        {chatRooms.map((room) => (
          <li key={room.cr_id} className="flex justify-between items-center">
            <span>{room.title}</span>
            <Link
              href={`/Chat/${room.cr_id}`}
              className="text-indigo-700 hover:text-indigo-500 font-semibold"
            >
              Go to Chat
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
