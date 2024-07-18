"use client";

import { useQuery } from "@tanstack/react-query";
import { getChatting } from "@/app/_api/api";
import { useAuthStore } from "@/app/store";
import Link from "next/link";
import { ChatRoom } from "../types/ChatRoom";
import { FaComments, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import CreateChatRoomForm from "@/components/CreateChatRoom";

const ChatList = () => {
    const { accessToken } = useAuthStore();
    const [showModal, setShowModal] = useState(false);
    const {
        data: chatRooms,
        isLoading,
        error,
    } = useQuery<ChatRoom[], Error>({
        queryKey: ["chatRooms", accessToken],
        queryFn: () => getChatting(accessToken),
        enabled: !!accessToken,
    });

    const closeModal = () => {
        setShowModal(false);
    };
    const handleCreateChat = () => {
        setShowModal(true);
    };
    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">{error.message || "An error occurred"}</div>;
    if (!chatRooms || chatRooms.length === 0) return <div className="text-center mt-10">채팅방이 존재하지 않습니다.</div>;

    return (
        <div className="max-w-xl  mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-l font-bold mb-6 text-gray-800 flex items-center">
                <FaComments className="mr-2 text-indigo-600" />
                대화 내역
            </h2>
            <ul className="space-y-4">
                {chatRooms.length === 0 ? (
                    <li className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition duration-300">
                        <div className="flex justify-between items-center">
                            <button onClick={handleCreateChat} className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300">
                                채팅방 만들기
                            </button>
                        </div>
                    </li>
                ) : (
                    chatRooms.map((room) => (
                        <li key={room.cr_id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition duration-300">
                            <div className="flex justify-between items-center">
                                <span className="text-l font-medium text-gray-700">{room.title}</span>
                                <Link href={`/Chat/${room.cr_id}`} className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition duration-300">
                                    이동하기
                                    <FaArrowRight className="ml-2" />
                                </Link>
                            </div>
                        </li>
                    ))
                )}
            </ul>
            {showModal && (
                <div className="fixed inset-0 z-50 flex justify-center items-center">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-6 rounded-md shadow-md z-10 w-full max-w-md relative">
                        <button onClick={closeModal} className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
                            X
                        </button>
                        <CreateChatRoomForm onClose={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatList;
