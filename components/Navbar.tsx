'use client';

import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/app/store";
import { useRouter } from "next/navigation";
import CreateChatRoomForm from "@/components/CreateChatRoom";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { accessToken, clearTokens } = useAuthStore();

  const handleLogout = () => {
    clearTokens();
    router.push('/Chat');
  };

  const handleCreateChat = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-blue-200 flex justify-between items-center h-[80px] w-full pl-8 pr-5">
      <img className="h-full w-auto rounded-md" src="/logo.png" alt="logo" />
      <div className="flex gap-2">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-slate-700 font-sans">
            InjuryLawAssist
          </span>
          <div className="flex gap-6 text-md font-semibold mt-2">
            <Link className="rounded-md" href="/">
              HOME
            </Link>
            <Link className="rounded-md" href="/About">
              ABOUT
            </Link>
            <Link className=" rounded-md" href="/chat">
              Chat Bot
            </Link>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleCreateChat}
          className="bg-green-100 p-1 rounded-md font-medium hover:scale-110 transition active:bg-purple-500"
        >
          Create Chat Room
        </button>
        {accessToken ? (
          <button
            onClick={handleLogout}
            className="bg-white p-1 rounded-md font-semibold"
          >
            Logout
          </button>
        ) : (
          <Link className="bg-white p-1 rounded-md font-semibold" href="/login">
            Login
          </Link>
        )}
      </div>
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
};

export default Navbar;
