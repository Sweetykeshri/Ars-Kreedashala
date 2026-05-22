import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe]">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm z-40 md:hidden transition-all duration-300" 
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-4 sm:p-6 md:p-10 mt-20">
          <div className="max-w-[1600px] mx-auto animate-fadeIn">
            <Outlet />
          </div>
        </main>

        <footer className="px-6 md:px-10 py-6 text-center md:text-left text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em] border-t border-gray-50/50">
          © 2026 Ars Kreedashala Academy Management System • v4.2.0 • Sector Integrity Verified
        </footer>
      </div>
    </div>
  );
};

export default Layout;