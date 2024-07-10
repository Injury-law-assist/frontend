'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createChatRoom } from '@/app/_api/api';
import { useAuthStore } from '@/app/store';

interface CreateChatRoomFormProps {
  onClose: () => void;
}

const CreateChatRoomForm: React.FC<CreateChatRoomFormProps> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { accessToken } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!accessToken) {
      setError('No Access');
      return;
    }
    try {
      const data = await createChatRoom(title, accessToken);
      setSuccessMessage('created successfully!');
      setError(null);
      setTitle('');
      if (data?.cr_id) {
        onClose();
        router.refresh();
      }
    } catch (error) {
      setError('Failed to create chat room. Please try again.');
    }
  };

  useEffect(() => {
    if (successMessage) {
      router.refresh();
    }
  }, [successMessage]);

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a New Chat Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
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
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          채팅방 만들기
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
    </div>
  );
};

export default CreateChatRoomForm;