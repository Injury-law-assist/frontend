import React, { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';
interface InputProp {
    type:string;
    value:string;
    placeholder?:string;
    onChange:ChangeEventHandler<HTMLInputElement>;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
    onClick:MouseEventHandler<HTMLButtonElement>;
}

const InputBox:React.FC<InputProp>=({type,value,placeholder,onChange,onKeyDown,onClick})=>{
    return (
        <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className="flex-grow bg-transparent outline-none"
          />
          <button
            onClick={onClick}
            className="flex-shrink-0 p-2 font-sans bg-blue-100 text-gray-600 rounded-full hover:bg-blue-300"
          >보내기
          </button>
        </div>
      );
}

export default InputBox