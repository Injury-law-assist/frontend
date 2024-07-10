import CreateForm from "@/components/create/createForm";

export default function CreateAccount() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center pb-6">
          <h1 className="text-3xl text-gray-900 font-extrabold">
            Creating a new Account
          </h1>
        </div>
        <CreateForm />
      </div>
    </div>
  );
}
