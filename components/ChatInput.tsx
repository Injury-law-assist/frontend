
import React, { useState } from 'react';
import InputBox from './Input';
import { FaPaperPlane } from 'react-icons/fa';

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendHandleMessage();
    }
  };

  const sendHandleMessage = () => {
    if (message.trim() !== '') {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 bg-white shadow-md">
      <InputBox
        type="text"
        value={message}
        placeholder="메시지를 입력하세요..."
        onChange={handleChangeMessage}
        onKeyDown={handleKeyDown}
        onClick={sendHandleMessage}
      />
    </div>
  );
};

export default ChatInput;