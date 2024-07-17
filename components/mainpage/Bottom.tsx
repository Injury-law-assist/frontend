// components/mainpage/Bottom.js
"use client";
import { useState } from "react";

export default function Bottom() {
  const [copySuccess, setCopySuccess] = useState("");
  const email = "example@gmail.com";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopySuccess("이메일이 복사되었습니다!");
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (err) {
      setCopySuccess("복사 실패");
    }
  };

  return (
    <div className="bg-gray-500 bg-opacity-10 w-full py-2 flex flex-col justify-center items-center">
      <button
        onClick={copyToClipboard}
        className="bg-amber-900 rounded-md px-3 py-1 text-white hover:scale-110"
      >
        Contact
      </button>
      {copySuccess && (
        <p className="mt-2 text-sm text-green-600">{copySuccess}</p>
      )}
    </div>
  );
}
