"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "./store";
import CreateChatRoomForm from "@/components/CreateChatRoom";
import Nav from "@/components/mainpage/Nav";
import Bottom from "@/components/mainpage/Bottom";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { accessToken, clearTokens } = useAuthStore();

  const handleLogout = () => {
    clearTokens();
    router.push("/Chat");
  };

  const handleCreateChat = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <Nav />

      <main className="flex-grow bg-blue-100 bg-cover bg-center flex flex-col justify-between">
        <div className="flex-grow flex flex-col justify-center items-center gap-4">
          <h1 className="text-white text-4xl font-bold text-center px-4">
            IN PURSUIT OF JUSTICE, EVERYDAY
          </h1>

          <div className="bg-white bg-opacity-50 w-full max-w-[90%] p-4 rounded-lg shadow-lg">
            <div className="max-w-md mx-auto flex flex-col items-center space-y-4">
              <div className="bg-blue-300 p-3 rounded-lg flex flex-col w-full">
                <span className="text-white font-semibold text-center">
                  새로운 채팅을 만들어 보세요!
                </span>
                <button
                  onClick={handleCreateChat}
                  className="bg-green-100 p-1 rounded-md font-medium hover:scale-110 transition active:bg-purple-500"
                >
                  Create Chat Room
                </button>
              </div>

              {accessToken ? (
                <button
                  onClick={handleLogout}
                  className="bg-white p-1 rounded-md font-semibold"
                >
                  Logout
                </button>
              ) : (
                <div>
                  <span className="text-slate-500 mx-4">로그인 하기</span>
                  <Link
                    className="bg-white p-1.5 rounded-md font-semibold"
                    href="/login"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <Bottom />
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full"
            >
              X
            </button>
            <CreateChatRoomForm onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
