import Link from "next/link";

const NewAccount = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex space-x-4 items-center">
        <span className="text-sm">Need to create an account?</span>
        <Link
          className="text-indigo-700 hover:text-indigo-500 font-semibold"
          href="/Create"
        >
          Create an account
        </Link>
      </div>
      <Link
        className="mt-4 border rounded-md hover:ring-1 hover:bg-slate-100"
        href="/google"
      >
        <img
          className="w-24 h-8"
          src="https://www.svgrepo.com/show/506498/google.svg"
          alt="create by google-account"
        ></img>
      </Link>
    </div>
  );
};

export default NewAccount;
