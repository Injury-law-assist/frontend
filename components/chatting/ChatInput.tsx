import React, { useState } from "react";
import InputBox from "../shared/Input";

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleChangeMessage: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setMessage(e.target.value);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      sendHandleMessage();
    }
  };
  const sendHandleMessage = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  };
  return (
    <div className="p-4">
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
