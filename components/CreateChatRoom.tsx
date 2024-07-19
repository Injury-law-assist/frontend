"use client";

import { useState } from "react";
import { createChatRoom } from "@/app/_api/api";
import { useAuthStore } from "@/app/store";

interface CreateChatRoomFormProps {
    onClose: () => void;
    onSuccess: (newChatRoomId: number) => void;
}

interface ChatRoomResponse {
    message: string;
    statusCode: number;
    data: {
        cr_id: number;
        title: string;
        u_id: number;
        cr_created_at: string;
        cr_updated_at: string;
    };
}

const CreateChatRoomForm: React.FC<CreateChatRoomFormProps> = ({ onClose, onSuccess }) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { accessToken } = useAuthStore();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!accessToken) {
            setError("No Access Token available. Please log in again.");
            return;
        }
        try {
            const response = (await createChatRoom(title, accessToken)) as ChatRoomResponse;

            if (response.statusCode === 200 && response.data && response.data.cr_id) {
                onSuccess(response.data.cr_id);
                onClose();
            } else {
                setError("Failed to create chat room. Unexpected response structure.");
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(`Failed to create chat room: ${error.message}`);
            } else {
                setError("An unknown error occurred while creating the chat room.");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-5l font-medium text-gray-700">
                        챗봇 이름을 적어주세요.
                    </label>

                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
                    지금 바로 생성하기
                </button>
            </form>
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default CreateChatRoomForm;