import Chat from "@/components/chat/client";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <div className="w-1/4 bg-white">Item 1</div>
        <div className="w-1/2 ">
          <span>실시간 채팅</span>
          <Chat />
        </div>
        <div className="w-1/4 bg-white">Item 3</div>
      </div>
    </div>
  );
}
