interface InputProps {
  type: string;
  context: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputLogin = ({
  type,
  context,
  value,
  placeholder,
  onChange,
}: InputProps) => {
  return (
    <div className="flex flex-col items-start max-w-2xl mx-auto mb-4">
      <label className="mb-2 text-sm font-medium">{context}</label>
      <div className="w-full bg-gray-50 rounded-lg px-4 py-2">
        <input
          className="w-full bg-transparent outline-none"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputLogin;
