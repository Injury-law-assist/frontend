'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuthStore } from "@/app/store";
import { useRouter } from "next/navigation";
import CreateChatRoomForm from "@/components/CreateChatRoom";
import DarkModeToggle from "@/app/utils/DarkModeToggle";

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { accessToken, clearTokens } = useAuthStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    clearTokens();
    router.push('/');
  };

  const handleCreateChat = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!isClient) {
    return null;
  }

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">
          <Link href='/'>
            산재처리 챗봇
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-gray-600 hover:text-blue-500">홈</Link>
          {accessToken ? (
            <>
              <button
                onClick={handleCreateChat}
                className="text-gray-600 hover:text-blue-500">
                채팅방 생성
              </button>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-blue-500">
                로그아웃
              </button>
            </>
          ) : (
            <Link href="/login" className="text-gray-600 hover:text-blue-500">
              로그인
            </Link>
          )}
        </div>
      </nav>

      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 rounded-md shadow-md z-10 w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
            >
              X
            </button>
            <CreateChatRoomForm onClose={closeModal} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
