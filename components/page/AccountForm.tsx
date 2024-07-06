import Link from "next/link";
import Input from "./Input";
import NewAccount from "./NewAccount";

const AccountForm = () => {
  return (
    <form className="bg-white py-16 px-12 shadow-md rounded-lg space-y-6 w-full max-w-md">
      <Input
        context="Email address"
        type="email"
        placeholder="Enter your Email"
      />
      <Input
        context="Password"
        type="password"
        placeholder="Enter your Password"
      />
      <div>
        <button className="w-full bg-indigo-600 rounded-md text-white font-semibold py-1 px-4 hover:bg-indigo-700 transition duration-200">
          Sign in
        </button>
      </div>
      <NewAccount />
    </form>
  );
};

export default AccountForm;
