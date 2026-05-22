import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, Search, User, ShieldCheck } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();
  
  const getPageTitle = (path) => {
    const paths = {
      '/dashboard': 'Dashboard Overview',
      '/admission/new': 'New Student Admission',
      '/admission/trial': 'Trial Registrations',
      '/admission/approval': 'Admission Audit',
      '/admission/documents': 'Document Integrity',
      '/students/profiles': 'Student List',
      '/students/parents': 'Parent/Guardian Portal',
      '/students/medical': 'Health Records',
      '/students/batch-allocation': 'Unit Assignment',
      '/training/batch-creation': 'Batch Management',
      '/training/schedule': 'Operational Schedule',
      '/training/coach-assignment': 'Staff Allocation',
      '/training/ground-allocation': 'Infrastructure Status',
    };
    return paths[path] || 'Ars Kreedashala';
  };

  return (
    <header className="fixed top-0 right-0 left-0 md:left-64 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between transition-all">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg md:hidden transition-colors"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight">
            {getPageTitle(location.pathname)}
          </h1>
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-[0.1em] hidden sm:block">
            Ars Management Systems
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="hidden lg:flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all border-none shadow-inner">
          <Search size={16} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="bg-transparent border-none focus:outline-none text-sm w-48 placeholder:text-gray-300"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl relative transition-all group">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white ring-1 ring-blue-500 animate-pulse"></span>
          </button>
          
          <button className="p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-all hidden sm:flex">
            <ShieldCheck size={20} />
          </button>
        </div>
        
        <div className="h-8 w-[1px] bg-gray-100 hidden sm:block"></div>
        
        <div className="flex items-center gap-3 pl-2">
          <div className="hidden text-right xs:block">
            <p className="text-sm font-bold text-gray-900 leading-none">Admin</p>
            <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest leading-none">Status: Active</span>
          </div>
          <div className="relative group cursor-pointer">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
              <User size={20} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full ring-1 ring-green-100"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;