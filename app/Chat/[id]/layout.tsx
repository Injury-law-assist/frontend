'use client';

import React, { useState } from 'react';
import Header from "@/components/Header";
import Sidebar from "@/components/SideBar";
import Footer from "@/components/Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* <Header /> */}
      <div className="flex flex-grow overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-grow flex flex-col overflow-auto">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
