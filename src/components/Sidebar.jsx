import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  CheckSquare, 
  FileText, 
  ChevronDown, 
  ChevronRight,
  UserCircle,
  HeartPulse,
  LayoutGrid,
  TrendingUp,
  Clock,
  CircleDollarSign,
  ReceiptText,
  AlertCircle,
  Trophy,
  Calendar,
  Shield,
  MapPin,
  X,
  Menu,
  Settings as SettingsIcon,
  Lock,
  Globe,
  Monitor,
  History
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openMenus, setOpenMenus] = useState({
    admission: false,
    training: true,
    coach: false,
    personnel: false,
    attendance: false,
    fees: false,
    reports: false,
    settings: false,
    admin: false
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: 'Admin Management',
      icon: <Lock size={20} />,
      id: 'admin',
      submenu: [
        { title: 'Admin Users', path: '/admin/users', icon: <Users size={18} /> },
        { title: 'Activity Logs', path: '/admin/activity-logs', icon: <History size={18} /> },
        { title: 'Access Control', path: '/admin/access-control', icon: <Shield size={18} /> },
      ]
    },
    {
      title: 'Admission',
      icon: <UserPlus size={20} />,
      id: 'admission',
      submenu: [
        { title: 'New Admission', path: '/admission/new', icon: <UserPlus size={18} /> },
        { title: 'Trial Registrations', path: '/admission/trial', icon: <Users size={18} /> },
        { title: 'Admission Approval', path: '/admission/approval', icon: <CheckSquare size={18} /> },
        { title: 'Document Verification', path: '/admission/documents', icon: <FileText size={18} /> },
      ]
    },
    {
      title: 'Batch & Training',
      icon: <Trophy size={20} />,
      id: 'training',
      submenu: [
        { title: 'Batch Creation', path: '/training/batch-creation', icon: <LayoutGrid size={18} /> },
        { title: 'Training Schedule', path: '/training/schedule', icon: <Calendar size={18} /> },
        { title: 'Coach Assignment', path: '/training/coach-assignment', icon: <Shield size={18} /> },
        { title: 'Ground Allocation', path: '/training/ground-allocation', icon: <MapPin size={18} /> },
      ]
    },
    {
      title: 'Coach Management',
      icon: <Users size={20} />,
      id: 'coach',
      submenu: [
        { title: 'Coach Profiles', path: '/coach/profiles', icon: <UserCircle size={18} /> },
        { title: 'Coach Attendance', path: '/coach/attendance', icon: <Clock size={18} /> },
        { title: 'Assigned Batches', path: '/coach/assigned-batches', icon: <LayoutGrid size={18} /> },
      ]
    },
    {
      title: 'Personnel',
      icon: <UserCircle size={20} />,
      id: 'personnel',
      submenu: [
        { title: 'Student Profiles', path: '/students/profiles', icon: <UserCircle size={18} /> },
        { title: 'Guardian Details', path: '/students/parents', icon: <Users size={18} /> },
        { title: 'Medical Info', path: '/students/medical', icon: <HeartPulse size={18} /> },
        { title: 'Batch Allocation', path: '/students/batch-allocation', icon: <LayoutGrid size={18} /> },
      ]
    },
    {
      title: 'Attendance',
      icon: <Clock size={20} />,
      id: 'attendance',
      submenu: [
        { title: 'Student Attendance', path: '/attendance/students', icon: <Users size={18} /> },
        { title: 'Coach Attendance', path: '/attendance/coaches', icon: <UserCircle size={18} /> },
        { title: 'Leave Management', path: '/attendance/leave', icon: <FileText size={18} /> },
        { title: 'Attendance Reports', path: '/attendance/reports', icon: <TrendingUp size={18} /> },
      ]
    },
    {
      title: 'Fee Management',
      icon: <CircleDollarSign size={20} />,
      id: 'fees',
      submenu: [
        { title: 'Admission Fee', path: '/fees/admission', icon: <CircleDollarSign size={18} /> },
        { title: 'Monthly Collection', path: '/fees/monthly', icon: <Clock size={18} /> },
        { title: 'Pending Fees', path: '/fees/pending', icon: <AlertCircle size={18} /> },
        { title: 'Payment Receipts', path: '/fees/receipts', icon: <ReceiptText size={18} /> },
        { title: 'Fee Reports', path: '/fees/reports', icon: <TrendingUp size={18} /> },
      ]
    },
    {
      title: 'Reports & Analytics',
      icon: <TrendingUp size={20} />,
      id: 'reports',
      submenu: [
        { title: 'Admission Reports', path: '/reports/admissions', icon: <UserPlus size={18} /> },
        { title: 'Fee Reports', path: '/reports/fees', icon: <CircleDollarSign size={18} /> },
        { title: 'Attendance Analytics', path: '/reports/attendance', icon: <Clock size={18} /> },
        { title: 'Performance Reports', path: '/reports/performance', icon: <Trophy size={18} /> },
      ]
    },
    {
      title: 'Settings',
      icon: <SettingsIcon size={20} />,
      id: 'settings',
      submenu: [
        { title: 'User Roles', path: '/settings/user-roles', icon: <Users size={18} /> },
        { title: 'Permissions', path: '/settings/permissions', icon: <Lock size={18} /> },
        { title: 'Academy Settings', path: '/settings/academy', icon: <Globe size={18} /> },
        { title: 'System Config', path: '/settings/system', icon: <Monitor size={18} /> },
      ]
    }
  ];

  const activeLink = "flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-xl transition-all duration-200 border-l-4 border-blue-600 font-semibold";
  const inactiveLink = "flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 group";
  const subActiveLink = "flex items-center gap-3 px-4 py-2 text-blue-600 bg-blue-50/50 rounded-lg transition-all duration-200 border-r-4 border-blue-600 text-sm font-medium";
  const subInactiveLink = "flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 text-sm font-medium";

  return (
    <aside className={`fixed top-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:w-64 md:translate-x-0'} bg-white border-r border-gray-100 shadow-sm overflow-hidden flex flex-col`}>
      <div className="p-6 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Trophy className="text-white" size={20} />
          </div>
          <span className="text-lg font-bold text-gray-900 truncate">Ars Kreedashala</span>
        </div>
        <button onClick={toggleSidebar} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg md:hidden">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2 scrollbar-hide">
        {menuItems.map((item) => (
          <div key={item.title}>
            {item.submenu ? (
              <div className="space-y-1">
                <button
                  onClick={() => toggleMenu(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 ${openMenus[item.id] ? 'bg-gray-50 text-gray-900' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="font-semibold text-sm">{item.title}</span>
                  </div>
                  {openMenus[item.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                {openMenus[item.id] && (
                  <div className="pl-4 mt-1 space-y-1 mb-2 blur-in">
                    {item.submenu.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        className={({ isActive }) => isActive ? subActiveLink : subInactiveLink}
                      >
                        {sub.icon}
                        <span>{sub.title}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) => isActive ? activeLink : inactiveLink}
              >
                {item.icon}
                <span className="font-semibold text-sm">{item.title}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            AD
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-gray-900 truncate">Academy Admin</p>
            <p className="text-[11px] font-medium text-gray-400 truncate uppercase tracking-wider text-xs">Super User</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;