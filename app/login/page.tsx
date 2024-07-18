import AccountForm from "@/components/page/AccountForm";

export default function Page() {
    return (
        <div className="bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-4 lg:px-20 py-8">
            <div className="max-w-screen-md w-full space-y-4">
                <AccountForm />
            </div>
        </div>
    );
}
