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
    <div className="min-h-screen bg-[#fcfdfe] flex overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Mobile Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={toggleSidebar}
      ></div>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${isSidebarOpen ? 'md:pl-0' : ''}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-3 sm:p-5 md:p-8 mt-20 w-full overflow-x-hidden">
          <div className="max-w-[1600px] mx-auto animate-fadeIn pb-10">
            <Outlet />
          </div>
        </main>

        <footer className="px-6 md:px-10 py-6 text-center md:text-left text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] border-t border-gray-100/50 bg-white/50">
          © 2026 Ars Kreedashala Academy Management System • v4.2.0 • Sector Integrity Verified
        </footer>
      </div>
    </div>
  );
};

export default Layout;