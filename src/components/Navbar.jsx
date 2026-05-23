import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, Search, User, ShieldCheck, LogOut, Settings, UserCircle } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
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
      '/attendance/students': 'Student Presence',
      '/attendance/coaches': 'Coach attendance',
      '/attendance/leave': 'Leave management',
      '/attendance/reports': 'Attendance Insights',
      '/fees/admission': 'Admission Fee Collection',
      '/fees/monthly': 'Monthly Fee Status',
      '/fees/pending': 'Outstanding Dues',
      '/fees/receipts': 'Transaction Receipts',
      '/fees/reports': 'Financial Analytics',
      '/admin/users': 'Administrator Management',
      '/admin/activity-logs': 'System Activity Logs',
      '/admin/access-control': 'Security & Access Control',
      '/settings/roles': 'Role Configuration',
      '/settings/permissions': 'Permission Matrix',
      '/settings/academy': 'Academy Profile',
      '/settings/system': 'System Configuration',
    };
    return paths[path] || 'Ars Kreedashala';
  };

  return (
    <header className="sticky top-0 right-0 left-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between transition-all h-20 shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg md:hidden transition-colors"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight truncate max-w-[150px] xs:max-w-none">
            {getPageTitle(location.pathname)}
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.1em] hidden xs:block">
            Ars Management Systems
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden lg:flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500/10 transition-all border-none shadow-inner">
          <Search size={16} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="bg-transparent border-none focus:outline-none text-sm w-48 placeholder:text-gray-300"
          />
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl relative transition-all group">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
          </button>
        </div>
        
        <div className="h-8 w-[1px] bg-gray-100 hidden sm:block"></div>
        
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 pl-2 focus:outline-none"
          >
            <div className="hidden text-right xs:block">
              <p className="text-sm font-bold text-gray-900 leading-none">Admin</p>
              <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest leading-none">Status: Active</span>
            </div>
            <div className="relative group cursor-pointer">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-sm transition-all ${
                showProfileMenu ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}>
                <User size={20} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
          </button>

          {showProfileMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowProfileMenu(false)}
              ></div>
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-20 animate-fadeIn overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                  <p className="text-sm font-bold text-gray-900">Academy Admin</p>
                  <p className="text-xs text-gray-500 truncate">admin@arskreeda.com</p>
                </div>
                <div className="p-1">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <UserCircle size={18} /> Profile Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <Settings size={18} /> System Config
                  </button>
                  <div className="my-1 border-t border-gray-50"></div>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;