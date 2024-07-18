"use client";
import Input from "./Input";
import NewAccount from "./NewAccount";
import { useState } from "react";
import { getLogin } from "@/app/_api/api";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store";

const AccountForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const setTokens = useAuthStore((state) => state.setTokens);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await getLogin(email, password);
            if (data && data.accessToken && data.refreshToken) {
                console.log("Login successful:", data);
                setTokens(data.accessToken, data.refreshToken);
                router.push("/Chat");
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (err) {
            console.error("Login failed", err);
            if (err instanceof Error) {
                if (err.message === "Invalid response from server") {
                    setErrorMessage("Login failed: Invalid response from server. Please try again.");
                } else if (err.message.includes("Network Error")) {
                    setErrorMessage("Network error. Please check your internet connection and try again.");
                } else if (err.message.includes("401")) {
                    setErrorMessage("Invalid email or password. Please check your credentials and try again.");
                } else if (err.message.includes("500")) {
                    setErrorMessage("Server error. Please try again later.");
                }
            }
            console.log(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="bg-white py-16 px-12 shadow-lg rounded-lg space-y-6 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">로그인</h2>
                <Input context="이메일" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input context="비밀번호" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                <div>
                    <button className="w-full bg-blue-600 rounded-md text-white font-semibold py-3 px-4 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200">
                        로그인
                    </button>
                </div>
                <NewAccount />
            </form>
        </div>
    );
};

export default AccountForm;
