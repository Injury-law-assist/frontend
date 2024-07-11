"use client";
import Footer from "@/components/chatting/Footer";
import Header from "@/components/chatting/Header";
import Sidebar from "@/components/chatting/SideBar";
import { useState } from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-grow flex flex-col">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
