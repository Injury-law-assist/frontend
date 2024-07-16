"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "./store";
import CreateChatRoomForm from "@/components/CreateChatRoom";

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
    <>
      <div className="bg-blue-200 flex justify-center items-center h-[80px] w-full pl-8 pr-5">
        <img
          className="h-full w-auto rounded-md mx-5"
          src="/logo.png"
          alt="logo"
        />
        <span className="text-3xl font-bold text-slate-700 font-sans">
          InjuryLawAssist
        </span>
      </div>

      <div className="bg-bgPic bg-cover bg-center min-h-screen flex flex-col justify-center items-center gap-8 relative">
        <div>
          <span className="text-white text-4xl font-bold">
            IN PURSUIT OF JUSTICE, EVERYDAY
          </span>
        </div>
        <div className="bg-white bg-opacity-50 w-full max-w-[90%] mx-auto p-4 rounded-lg shadow-lg">
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
                  className="bg-white p-1 rounded-md font-semibold"
                  href="/login"
                >
                  Login
                </Link>
              </div>
            )}
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
        </div>
        <div className="absolute bottom-10 bg-gray-500 bg-opacity-40 w-full h-10 max-w-[40%] flex justify-center items-center rounded-md">
          <div className="">
            <button className="bg-amber-900 rounded-md p-1 text-white hover:scale-110">
              Contact
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
