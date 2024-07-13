interface InputProps {
  context: string;
  type: string;
  placeholder: string;
  value:string;
  onChange:(e:React.ChangeEvent<HTMLInputElement>) =>void;
}

const Input = ({ context, type, placeholder,value,onChange }: InputProps) => {
  return (
    <div className="space-y-2">
      <h2 className="font-semibold">{context}</h2>
      <input
        className="w-full py-1 px-3 border pl-3 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
