"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [showCopied, setShowCopied] = useState(false);
  const usepathname = usePathname();

  const handleCopyEmail = () => {
    const email = "www.knu.gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
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
            <Link className=" rounded-md" href="/">
              HOME
            </Link>
            <Link className=" rounded-md" href="/About">
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
          onClick={handleCopyEmail}
          className="bg-green-100 p-1 rounded-md font-medium hover:scale-110 transition active:bg-purple-500"
        >
          Contact
          {showCopied && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded">
              Email Copied!
            </div>
          )}
        </button>
        {usepathname !== "/login" ? (
          <Link className="bg-white p-1 rounded-md font-semibold" href="/login">
            Login
          </Link>
        ) : (
          <Link className="bg-white p-1 rounded-md font-semibold" href="/login">
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
