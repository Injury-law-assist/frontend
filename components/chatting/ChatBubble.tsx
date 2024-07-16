import React from 'react';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div 
        className={`max-w-md px-4 py-2 rounded-lg shadow ${
          isUser ? 'bg-green-200' : 'bg-gray-200'
        }`}
        style={{ 
          direction: 'ltr', 
          textAlign: isUser ? 'right' : 'left' 
        }}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatBubble;