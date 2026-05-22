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
  GraduationCap,
  UserCircle,
  HeartPulse,
  LayoutGrid,
  ShieldAlert,
  TrendingUp,
  Clock,
  CircleDollarSign,
  ReceiptText,
  AlertCircle
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [isStudentOpen, setIsStudentOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isFeeOpen, setIsFeeOpen] = useState(true);

  const navItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={20} />,
    },
  ];

  const admissionSubmenu = [
    { title: 'New Admission', path: '/admission/new', icon: <UserPlus size={18} /> },
    { title: 'Trial Registrations', path: '/admission/trial', icon: <Users size={18} /> },
    { title: 'Admission Approval', path: '/admission/approval', icon: <CheckSquare size={18} /> },
    { title: 'Document Verification', path: '/admission/documents', icon: <FileText size={18} /> },
  ];

  const studentSubmenu = [
    { title: 'Student Profiles', path: '/students/profiles', icon: <UserCircle size={18} /> },
    { title: 'Parent/Guardian', path: '/students/parents', icon: <Users size={18} /> },
    { title: 'Medical Info', path: '/students/medical', icon: <HeartPulse size={18} /> },
    { title: 'Batch Allocation', path: '/students/batch-allocation', icon: <LayoutGrid size={18} /> },
  ];

  const attendanceSubmenu = [
    { title: 'Student Attendance', path: '/attendance/students', icon: <Users size={18} /> },
    { title: 'Coach Attendance', path: '/attendance/coaches', icon: <UserCircle size={18} /> },
    { title: 'Leave Management', path: '/attendance/leave', icon: <FileText size={18} /> },
    { title: 'Attendance Reports', path: '/attendance/reports', icon: <TrendingUp size={18} /> },
  ];

  const feeSubmenu = [
    { title: 'Admission Fee', path: '/fees/admission', icon: <CircleDollarSign size={18} /> },
    { title: 'Monthly Fee', path: '/fees/monthly', icon: <Clock size={18} /> },
    { title: 'Pending Fees', path: '/fees/pending', icon: <AlertCircle size={18} /> },
    { title: 'Payment Receipts', path: '/fees/receipts', icon: <ReceiptText size={18} /> },
    { title: 'Fee Reports', path: '/fees/reports', icon: <TrendingUp size={18} /> },
  ];

  const activeClassName = "flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-lg transition-all duration-200";
  const inactiveClassName = "flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200";

  const subActiveClassName = "flex items-center gap-3 px-4 py-2 text-blue-600 bg-blue-50/50 border-r-4 border-blue-600 transition-all duration-200";
  const subInactiveClassName = "flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all duration-200";

  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 bg-white border-r border-gray-200`}>
      <div className="flex items-center gap-2 px-6 py-8 border-b border-gray-100">
        <div className="p-2 bg-blue-600 rounded-lg">
          <GraduationCap className="text-white" size={24} />
        </div>
        <span className="text-xl font-bold text-gray-800 tracking-tight">Ars Kreedashala</span>
      </div>

      <nav className="px-4 py-6 space-y-2 overflow-y-auto h-[calc(100vh-80px)]">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>isActive ? activeClassName : inactiveClassName}
          >
            {item.icon}
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}

        {/* Dropdown Menu */}
        <div className="space-y-1">
          <button
            onClick={() => setIsAdmissionOpen(!isAdmissionOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <Users size={20} />
              <span className="font-medium">Admission Management</span>
            </div>
            {isAdmissionOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>

          {isAdmissionOpen && (
            <div className="pl-4 mt-1 space-y-1 border-l border-gray-100 ml-6">
              {admissionSubmenu.map((subItem) => (
                <NavLink
                  key={subItem.path}
                  to={subItem.path}
                  className={({ isActive }) => isActive ? subActiveClassName : subInactiveClassName}
                >
                  {subItem.icon}
                  <span className="text-sm font-medium">{subItem.title}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Student Management Dropdown */}
        <div className="space-y-1 pt-2">
          <button
            onClick={() => setIsStudentOpen(!isStudentOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <UserCircle size={20} />
              <span className="font-medium">Student Management</span>
            </div>
            {isStudentOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>

          {isStudentOpen && (
            <div className="pl-4 mt-1 space-y-1 border-l border-gray-100 ml-6">
              {studentSubmenu.map((subItem) => (
                <NavLink
                  key={subItem.path}
                  to={subItem.path}
                  className={({ isActive }) => isActive ? subActiveClassName : subInactiveClassName}
                >
                  {subItem.icon}
                  <span className="text-sm font-medium">{subItem.title}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Attendance Management Dropdown */}
        <div className="space-y-1 pt-2">
          <button
            onClick={() => setIsAttendanceOpen(!isAttendanceOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <Clock size={20} />
              <span className="font-medium">Attendance Management</span>
            </div>
            {isAttendanceOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>

          {isAttendanceOpen && (
            <div className="pl-4 mt-1 space-y-1 border-l border-gray-100 ml-6">
              {attendanceSubmenu.map((subItem) => (
                <NavLink
                  key={subItem.path}
                  to={subItem.path}
                  className={({ isActive }) => isActive ? subActiveClassName : subInactiveClassName}
                >
                  {subItem.icon}
                  <span className="text-sm font-medium">{subItem.title}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Fee Management Dropdown */}
        <div className="space-y-1 pt-2">
          <button
            onClick={() => setIsFeeOpen(!isFeeOpen)}
            className="flex items-center justify-between w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <CircleDollarSign size={20} />
              <span className="font-medium">Fee Management</span>
            </div>
            {isFeeOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>

          {isFeeOpen && (
            <div className="pl-4 mt-1 space-y-1 border-l border-gray-100 ml-6">
              {feeSubmenu.map((subItem) => (
                <NavLink
                  key={subItem.path}
                  to={subItem.path}
                  className={({ isActive }) => isActive ? subActiveClassName : subInactiveClassName}
                >
                  {subItem.icon}
                  <span className="text-sm font-medium">{subItem.title}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
