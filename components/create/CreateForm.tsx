"use client";
import axios from "axios";
import { useState } from "react";
import Input from "../shared/Input";

export default function CreateForm() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/", {
        nickname,
        email,
        password,
      });
      console.log("회원가입 성공!", response.data);
    } catch (error) {
      console.error("회원가입 실패! :", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white py-16 px-12 shadow-md rounded-lg space-y-6 w-full max-w-md"
    >
      <Input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        context="Nickname"
        type="text"
        placeholder="Enter your nickname"
      />

      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        context="Email address"
        type="email"
        placeholder="Enter your Email"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        context="Password"
        type="password"
        placeholder="Enter your Password"
      />
      <Input
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
