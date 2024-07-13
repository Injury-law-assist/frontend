'use client'
import Input from "./Input";
import NewAccount from "./NewAccount";
import { useState } from "react";
import { getLogin } from "@/app/_api/api";
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/app/store";

const AccountForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage,setErrorMessage] = useState('')
  const router = useRouter();
  const setTokens = useAuthStore((state) => state.setTokens);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await getLogin(email, password);
      if (data && data.accessToken && data.refreshToken) {
        console.log('Login successful:', data);
        setTokens(data.accessToken, data.refreshToken);
        router.push('/Chat');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Login failed', err);      
      if (err instanceof Error) {
        if (err.message === 'Invalid response from server') {
          setErrorMessage('Login failed: Invalid response from server. Please try again.');
        } else if (err.message.includes('Network Error')) {
          setErrorMessage('Network error. Please check your internet connection and try again.');
        } else if (err.message.includes('401')) {
          setErrorMessage('Invalid email or password. Please check your credentials and try again.');
        } else if (err.message.includes('500')) {
          setErrorMessage('Server error. Please try again later.');
        }
      }
      console.log(errorMessage);
    }
  }

  return (
    <form onSubmit={handleSubmit}
          className="bg-white py-16 px-12 shadow-md rounded-lg space-y-6 w-full max-w-md">
      <Input
        context="Email address"
        type="email"
        placeholder="Enter your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        context="Password"
        type="password"
        placeholder="Enter your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <button className="w-full bg-indigo-600 rounded-md text-white font-semibold py-1 px-4 hover:bg-indigo-700 transition duration-200">
          Sign in
        </button>
      </div>
      <NewAccount />
    </form>
  );
};

export default AccountForm;
