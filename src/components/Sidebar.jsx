import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  CheckSquare,
  FileText,
  ChevronDown,
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
  X,
  Settings as SettingsIcon,
  Lock,
  Globe,
  Monitor,
  History,
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar, closeSidebar }) => {
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState({
    admission: false,
    training: false,
    coach: false,
    personnel: false,
    attendance: false,
    fees: false,
    reports: false,
    settings: false,
    admin: false,
  });

  useEffect(() => {
    const path = location.pathname;

    setOpenMenus((prev) => ({
      ...prev,
      admission: path.startsWith("/admission"),
      training: path.startsWith("/training"),
      coach: path.startsWith("/coach"),
      personnel: path.startsWith("/students"),
      attendance: path.startsWith("/attendance"),
      fees: path.startsWith("/fees"),
      reports: path.startsWith("/reports"),
      settings: path.startsWith("/settings"),
      admin: path.startsWith("/admin"),
    }));
  }, [location.pathname]);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Admin Management",
      icon: <Lock size={20} />,
      id: "admin",
      submenu: [
        { title: "Admin Users", path: "/admin/users", icon: <Users size={18} /> },
        {
          title: "Activity Logs",
          path: "/admin/activity-logs",
          icon: <History size={18} />,
        },
        {
          title: "Access Control",
          path: "/admin/access-control",
          icon: <Shield size={18} />,
        },
      ],
    },
    {
      title: "Admission",
      icon: <UserPlus size={20} />,
      id: "admission",
      submenu: [
        {
          title: "New Admission",
          path: "/admission/new",
          icon: <UserPlus size={18} />,
        },
        {
          title: "Trial Registrations",
          path: "/admission/trial",
          icon: <Users size={18} />,
        },
        {
          title: "Admission Approval",
          path: "/admission/approval",
          icon: <CheckSquare size={18} />,
        },
        {
          title: "Document Verification",
          path: "/admission/document-verification",
          icon: <FileText size={18} />,
        },
        {
          title: "Total Admission",
          path: "/admission/list",
          icon: <Users size={18} />,
        },
      ],
    },
    {
      title: "Batch & Training",
      icon: <Trophy size={20} />,
      id: "training",
      submenu: [
        {
          title: "Batch Creation",
          path: "/training/batch-creation",
          icon: <LayoutGrid size={18} />,
        },
        {
          title: "Training Schedule",
          path: "/training/schedule",
          icon: <Calendar size={18} />,
        },
        {
          title: "Coach Assignment",
          path: "/training/coach-assignment",
          icon: <Users size={18} />,
        },
        {
          title: "Ground/Court Allocation",
          path: "/training/ground-allocation",
          icon: <LayoutGrid size={18} />,
        },
      ],
    },
    {
      title: "Coach Management",
      icon: <Users size={20} />,
      id: "coach",
      submenu: [
        {
          title: "Coach Registration",
          path: "/coach/registration",
          icon: <UserPlus size={18} />,
        },
        {
          title: "Total Coach",
          path: "/coach/total",
          icon: <Users size={18} />,
        },
        {
          title: "Coach Profiles",
          path: "/coach/profiles",
          icon: <UserCircle size={18} />,
        },
        {
          title: "Coach Attendance",
          path: "/coach/attendance",
          icon: <Clock size={18} />,
        },
        {
          title: "Assigned Batches",
          path: "/coach/assigned-batches",
          icon: <LayoutGrid size={18} />,
        },
        {
          title: "Coach Fee",
          path: "/coach/fees",
          icon: <CircleDollarSign size={18} />,
        },
      ],
    },
    {
      title: "Personnel",
      icon: <UserCircle size={20} />,
      id: "personnel",
      submenu: [
        {
          title: "Student Profiles",
          path: "/students/profiles",
          icon: <UserCircle size={18} />,
        },
        {
          title: "Parent/Guardian Details",
          path: "/students/parents",
          icon: <Users size={18} />,
        },
        {
          title: "Medical Information",
          path: "/students/medical",
          icon: <HeartPulse size={18} />,
        },
        {
          title: "Batch Allocation",
          path: "/students/batch-allocation",
          icon: <LayoutGrid size={18} />,
        },
      ],
    },
    {
      title: "Attendance",
      icon: <Clock size={20} />,
      id: "attendance",
      submenu: [
        {
          title: "Student Attendance",
          path: "/attendance/students",
          icon: <Users size={18} />,
        },
        {
          title: "Coach Attendance",
          path: "/attendance/coaches",
          icon: <UserCircle size={18} />,
        },
        {
          title: "Leave Management",
          path: "/attendance/leave",
          icon: <FileText size={18} />,
        },
        {
          title: "Attendance Reports",
          path: "/attendance/reports",
          icon: <TrendingUp size={18} />,
        },
      ],
    },
    {
      title: "Fee Management",
      icon: <CircleDollarSign size={20} />,
      id: "fees",
      submenu: [
        {
          title: "Admission Fee",
          path: "/fees/admission",
          icon: <CircleDollarSign size={18} />,
        },
        {
          title: "Monthly Fee Collection",
          path: "/fees/monthly",
          icon: <Clock size={18} />,
        },
        {
          title: "Pending Fees",
          path: "/fees/pending",
          icon: <AlertCircle size={18} />,
        },
        {
          title: "Payment Receipts",
          path: "/fees/receipts",
          icon: <ReceiptText size={18} />,
        },
        {
          title: "Fee Reports",
          path: "/fees/reports",
          icon: <TrendingUp size={18} />,
        },
      ],
    },
    {
      title: "Reports & Analytics",
      icon: <TrendingUp size={20} />,
      id: "reports",
      submenu: [
        {
          title: "Admission Reports",
          path: "/reports/admissions",
          icon: <UserPlus size={18} />,
        },
        {
          title: "Fee Reports",
          path: "/reports/fees",
          icon: <CircleDollarSign size={18} />,
        },
        {
          title: "Attendance Analytics",
          path: "/reports/attendance",
          icon: <Clock size={18} />,
        },
        {
          title: "Performance Reports",
          path: "/reports/performance",
          icon: <Trophy size={18} />,
        },
      ],
    },
    {
      title: "Settings",
      icon: <SettingsIcon size={20} />,
      id: "settings",
      submenu: [
        {
          title: "User Roles",
          path: "/settings/roles",
          icon: <Users size={18} />,
        },
        {
          title: "Permissions",
          path: "/settings/permissions",
          icon: <Lock size={18} />,
        },
        {
          title: "Academy Settings",
          path: "/settings/academy",
          icon: <Globe size={18} />,
        },
        {
          title: "System Configuration",
          path: "/settings/system",
          icon: <Monitor size={18} />,
        },
      ],
    },
  ];

  const activeLink =
    "flex items-center gap-3 px-4 py-3 text-blue-600 bg-blue-50 rounded-xl transition-all duration-200 border-l-4 border-blue-600 font-semibold";

  const inactiveLink =
    "flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 group";

  const subActiveLink =
    "flex items-center gap-3 px-4 py-2 text-blue-600 bg-blue-50/50 rounded-lg transition-all duration-200 border-r-4 border-blue-600 text-sm font-medium";

  const subInactiveLink =
    "flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 text-sm font-medium";

  const isMenuParentActive = (id) => {
    const parent = menuItems.find((item) => item.id === id);
    if (!parent || !parent.submenu) return false;
    return parent.submenu.some((sub) => location.pathname === sub.path);
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-100 shadow-sm flex flex-col shrink-0 transition-transform duration-300 ease-in-out overflow-hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      {/* Sidebar Header With Logo */}
      <div className="p-5 flex items-center justify-between border-b border-gray-50 h-20 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
            <img
              src="/logo.png"
              alt="ARS Kreedashala Logo"
              className="w-full h-full object-contain p-1"
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-tight leading-tight truncate">
              ARS KREEDASHALA
            </h2>
            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest truncate">
              Admission CRM
            </p>
          </div>
        </div>

        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg md:hidden"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1 scrollbar-hide">
        {menuItems.map((item) => (
          <div key={item.title}>
            {item.submenu ? (
              <div className="space-y-1">
                <button
                  onClick={() => toggleMenu(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 ${
                    openMenus[item.id] ? "bg-gray-50" : ""
                  } ${
                    isMenuParentActive(item.id)
                      ? "text-blue-600 bg-blue-50/30"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        isMenuParentActive(item.id) ? "text-blue-600" : ""
                      }
                    >
                      {item.icon}
                    </span>
                    <span
                      className={`font-semibold text-sm ${
                        isMenuParentActive(item.id) ? "text-blue-600" : ""
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>

                  <div
                    className={`transition-transform duration-200 ${
                      openMenus[item.id] ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown
                      size={14}
                      className={
                        isMenuParentActive(item.id) ? "text-blue-400" : ""
                      }
                    />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openMenus[item.id]
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-4 mt-1 space-y-1 mb-2">
                    {item.submenu.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        onClick={handleLinkClick}
                        className={({ isActive }) =>
                          isActive ? subActiveLink : subInactiveLink
                        }
                      >
                        {sub.icon}
                        <span>{sub.title}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                to={item.path}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  isActive ? activeLink : inactiveLink
                }
              >
                {item.icon}
                <span className="font-semibold text-sm">{item.title}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      {/* Admin Profile Footer */}
      <div className="p-4 border-t border-gray-100 shrink-0">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100/50">
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 font-bold border border-blue-100 shrink-0">
            AD
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-extrabold text-gray-900 truncate">
              Academy Admin
            </p>
            <p className="text-[10px] font-bold text-blue-600 truncate uppercase tracking-widest">
              Super User
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;