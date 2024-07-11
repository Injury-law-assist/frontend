"use client";
import axios from "axios";
import { useState } from "react";
import InputLogin from "../shared/Inputlogin";

const URL = "https://api.g-start-up.com/api/auth/join";

export default function CreateForm() {
  const [newNickname, setNewNickname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirm, setNewConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (newPassword !== newConfirm)
        throw new Error("비밀번호가 일치하지 않습니다.");

      const response = await axios.post(URL, {
        email: newEmail,
        password: newPassword,
        nickname: newNickname,
      });
      console.log("회원가입 성공!", response.data);
    } catch (error: any) {
      let message: string | null = null;

      if (error instanceof Error) message = error.message;
      else message = "회원가입에 실패하였습니다.";

      console.error(message);
      setError(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white py-16 px-12 shadow-md rounded-lg space-y-6 w-full max-w-md"
    >
      {error && <p className="text-red-500">{error}</p>}
      <InputLogin
        value={newNickname}
        onChange={(e) => {
          setNewNickname(e.target.value);
        }}
        context="Nickname"
        type="text"
        placeholder="Enter your nickname"
      />

      <InputLogin
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        context="Email address"
        type="email"
        placeholder="Enter your Email"
      />
      <InputLogin
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        context="Password"
        type="password"
        placeholder="Enter your Password"
      />
      <InputLogin
        value={newConfirm}
        onChange={(e) => setNewConfirm(e.target.value)}
        context="Confirm Password"
        type="password"
        placeholder="Enter your Confirm Password"
      />
      <div>
        <button
          type="submit"
          className="w-full bg-indigo-600 rounded-md text-white font-semibold py-1 px-4 hover:bg-indigo-700 transition duration-200"
        >
          Creating an Account
        </button>
      </div>
    </form>
  );
}
