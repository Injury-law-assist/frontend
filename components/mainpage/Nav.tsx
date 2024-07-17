export default function Nav() {
  return (
    <div className="bg-blue-200 flex justify-center items-center h-[80px] w-full pl-8 pr-5">
      <img
        className="h-full w-auto rounded-md mx-5"
        src="/logo.png"
        alt="logo"
      />
      <span className="text-3xl font-bold text-slate-700 font-sans">
        InjuryLawAssist
      </span>
    </div>
  );
}
