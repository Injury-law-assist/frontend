import Link from "next/link";

export default function page() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center pb-6">
          <h1 className="text-3xl text-gray-900 font-extrabold">
            Sign in to your account
          </h1>
        </div>
        <form className="bg-white py-16 px-12 shadow-md rounded-lg space-y-6 w-full max-w-md">
          <div className="space-y-2">
            <h2 className="font-semibold">Email address</h2>
            <input
              className="w-full py-1 px-3 border pl-3 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <h2 className="font-semibold">Password</h2>
            <input
              className="w-full py-1 px-3 border pl-3 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              type="password"
              placeholder="Enter your passward"
            />
          </div>
          <div>
            <button className="w-full bg-indigo-600 rounded-md text-white font-semibold py-1 px-4 hover:bg-indigo-700 transition duration-200">
              Sign in
            </button>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="flex space-x-4 items-center">
              <span className="text-sm">Need to create an account?</span>
              <Link
                className="text-indigo-700 hover:text-indigo-500 font-semibold"
                href="/create"
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
        </form>
      </div>
    </div>
  );
}
