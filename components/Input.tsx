import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

interface InputProp {
  type: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const InputBox: React.FC<InputProp> = ({
  type,
  value,
  placeholder,
  onChange,
  onKeyDown,
  onClick
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-full px-4 py-2 max-w-3xl mx-auto">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-500"
      />
      <button
        onClick={onClick}
        className="flex items-center justify-center ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        <FaPaperPlane className="w-5 h-5" />
      </button>
    </div>
  );
}

export default InputBox;