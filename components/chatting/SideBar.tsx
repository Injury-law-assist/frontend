import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`h-full bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex justify-end p-4">
        <button
          onClick={toggleSidebar}
          className="text-white bg-gray-700 hover:bg-gray-600 p-2 rounded"
        >
          {isOpen ? '<<' : '>>'}
        </button>
      </div>
      {isOpen && (
        <div className="p-4">
          <p>Sidebar Content</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
