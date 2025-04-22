import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className={`fixed h-full z-20 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'}`}>
        <Sidebar isOpen={sidebarOpen} />
      </div>
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'pl-64' : 'pl-0'}`}>
        <TopBar onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;