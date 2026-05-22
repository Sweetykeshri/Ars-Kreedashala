import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, User, Search } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();
  
  const getPageTitle = (path) => {
    const paths = {
      '/dashboard': 'Dashboard Overview',
      '/admission/new': 'New Admission',
      '/admission/trial': 'Trial Registrations',
      '/admission/approval': 'Admission Approval',
      '/admission/documents': 'Document Verification',
      '/students/profiles': 'Student Profiles',
      '/students/parents': 'Parent/Guardian Details',
      '/students/medical': 'Medical Information',
      '/students/batch-allocation': 'Batch Allocation',
    };
    return paths[path] || 'Ars Kreedashala';
  };

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg md:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
          {getPageTitle(location.pathname)}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <Search size={16} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none focus:outline-none text-sm w-48"
          />
        </div>
        
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-gray-800">Admin User</p>
            <p className="text-xs text-gray-500">Super Admin</p>
          </div>
          <div className="p-2 bg-gray-100 rounded-full text-gray-600">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
