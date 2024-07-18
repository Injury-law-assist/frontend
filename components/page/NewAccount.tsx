import Link from "next/link";

const NewAccount = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex space-x-4 items-center">
                <span className="text-sm">혹시 계정이 없으신가요?</span>
                <Link className="text-indigo-700 hover:text-indigo-500 font-semibold" href="/Create">
                    가입하기
                </Link>
            </div>
            <Link className="mt-4 border rounded-md hover:ring-1 hover:bg-slate-100" href="/google"></Link>
        </div>
    );
};

export default NewAccount;
