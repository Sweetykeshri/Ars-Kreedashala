import React, { useMemo, useState } from "react";
import {
  Users,
  UserCheck,
  Clock,
  ArrowRight,
  AlertCircle,
  DollarSign,
  Calendar as CalendarIcon,
  Bell,
  Zap,
  MoreHorizontal,
  ChevronRight,
  UserPlus,
  CreditCard,
  ChevronLeft,
  Plus,
  Trash2,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();

  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 25));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 4, 25));

  const [events, setEvents] = useState([
    {
      id: 1,
      date: "2026-05-25",
      title: "Cricket Morning Batch",
      time: "06:00 AM",
      type: "Training",
      coach: "Vikram Batra",
      location: "Net 1",
    },
    {
      id: 2,
      date: "2026-05-25",
      title: "Football Trial Session",
      time: "04:30 PM",
      type: "Trial",
      coach: "Anjali Menon",
      location: "Field 2",
    },
    {
      id: 3,
      date: "2026-05-28",
      title: "Fitness Assessment",
      time: "07:30 AM",
      type: "Assessment",
      coach: "Sandeep Singh",
      location: "Fitness Zone",
    },
  ]);

  const [eventForm, setEventForm] = useState({
    title: "",
    time: "",
    type: "Training",
    coach: "",
    location: "",
  });

  const stats = [
    {
      label: "Total Admissions",
      value: "1,280",
      change: "+12%",
      icon: <Users className="text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      label: "Active Students",
      value: "950",
      change: "+18%",
      icon: <UserCheck className="text-emerald-600" />,
      color: "bg-emerald-50",
    },
    {
      label: "Trial Sessions",
      value: "45",
      change: "+5%",
      icon: <Clock className="text-amber-600" />,
      color: "bg-amber-50",
    },
    {
      label: "Monthly Revenue",
      value: "₹4.5L",
      change: "+7%",
      icon: <DollarSign className="text-[#8B8B00]" />,
      color: "bg-[#8B8B00]/10",
    },
  ];

  const pipelineData = [
    { name: "Leads", value: 400 },
    { name: "Trials", value: 300 },
    { name: "Shortlisted", value: 200 },
    { name: "Admitted", value: 150 },
  ];

  const growthData = [
    { month: "Jan", students: 400 },
    { month: "Feb", students: 520 },
    { month: "Mar", students: 610 },
    { month: "Apr", students: 800 },
    { month: "May", students: 950 },
  ];

  const feeData = [
    { day: "Mon", revenue: 45000 },
    { day: "Tue", revenue: 52000 },
    { day: "Wed", revenue: 48000 },
    { day: "Thu", revenue: 61000 },
    { day: "Fri", revenue: 55000 },
    { day: "Sat", revenue: 75000 },
    { day: "Sun", revenue: 42000 },
  ];

  const pieData = [
    { name: "Approved", value: 65, color: "#10b981" },
    { name: "Pending", value: 25, color: "#f59e0b" },
    { name: "Rejected", value: 10, color: "#f43f5e" },
  ];

  const attendanceData = [
    { name: "Batch A", present: 85, absent: 15 },
    { name: "Batch B", present: 70, absent: 30 },
    { name: "Batch C", present: 92, absent: 8 },
    { name: "Batch D", present: 78, absent: 22 },
  ];

  const coaches = [
    {
      name: "Vikram Batra",
      role: "Head Coach",
      sport: "Cricket",
      status: "On Field",
      avatar: "VB",
    },
    {
      name: "Anjali Menon",
      role: "Senior Coach",
      sport: "Football",
      status: "In Break",
      avatar: "AM",
    },
    {
      name: "Sandeep Singh",
      role: "Fitness Lead",
      sport: "All",
      status: "On Field",
      avatar: "SS",
    },
  ];

  const recentTrials = [
    {
      id: 1,
      name: "Rahul Sharma",
      sport: "Cricket",
      batch: "Morning",
      time: "10:30 AM",
    },
    {
      id: 2,
      name: "Priya Singh",
      sport: "Football",
      batch: "Evening",
      time: "04:15 PM",
    },
    {
      id: 3,
      name: "Arjun Das",
      sport: "Cricket",
      batch: "Morning",
      time: "11:00 AM",
    },
  ];

  const alerts = [
    { id: 1, type: "warning", msg: "Fees overdue for 12 students", time: "2h ago" },
    { id: 2, type: "info", msg: "New trial coach request: Rajesh K.", time: "5h ago" },
  ];

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const selectedDateKey = selectedDate.toISOString().split("T")[0];

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }, [currentDate]);

  const selectedEvents = events
    .filter((event) => event.date === selectedDateKey)
    .sort((a, b) => a.time.localeCompare(b.time));

  const getDateKey = (date) => date.toISOString().split("T")[0];

  const hasEvents = (date) => {
    if (!date) return false;
    return events.some((event) => event.date === getDateKey(date));
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return getDateKey(date) === getDateKey(today);
  };

  const isSelected = (date) => {
    if (!date) return false;
    return getDateKey(date) === selectedDateKey;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();

    if (!eventForm.title.trim() || !eventForm.time.trim()) return;

    const newEvent = {
      id: Date.now(),
      date: selectedDateKey,
      title: eventForm.title,
      time: eventForm.time,
      type: eventForm.type,
      coach: eventForm.coach || "Not Assigned",
      location: eventForm.location || "Not Assigned",
    };

    setEvents((prev) => [...prev, newEvent]);

    setEventForm({
      title: "",
      time: "",
      type: "Training",
      coach: "",
      location: "",
    });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  };

  const getEventTypeStyle = (type) => {
    if (type === "Trial") return "bg-blue-50 text-blue-600";
    if (type === "Assessment") return "bg-purple-50 text-purple-600";
    if (type === "Match") return "bg-orange-50 text-orange-600";
    return "bg-emerald-50 text-emerald-600";
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight uppercase">
            Executive Overview
          </h1>
          <p className="text-sm text-gray-500 font-medium italic">
            Kreedashala Performance Dashboard
          </p>
        </div>

        <div className="flex items-center gap-2">
          <CalendarIcon size={16} className="text-gray-400" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color} transition-transform group-hover:scale-110`}>
                {stat.icon}
              </div>

              <div className="flex flex-col items-end">
                <span className="text-emerald-500 text-xs font-bold">{stat.change}</span>
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">
                  vs last month
                </span>
              </div>
            </div>

            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
              {stat.label}
            </p>
            <h3 className="text-2xl font-black text-gray-800 tracking-tight mt-1">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
        <div className="2xl:col-span-2 grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">
                Admission Pipeline
              </h3>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
                  />
                  <Tooltip
                    cursor={{ fill: "#f9fafb" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      fontSize: "10px",
                    }}
                  />
                  <Bar dataKey="value" fill="#8B8B00" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">
                Growth Trend
              </h3>

              <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-md">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[9px] font-black text-emerald-600 uppercase">
                  Expanding
                </span>
              </div>
            </div>

            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      fontSize: "10px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#8B8B00"
                    strokeWidth={4}
                    dot={{ r: 6, fill: "#8B8B00", strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">
                Schedule Calendar
              </h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                Manage trials, batches and events
              </p>
            </div>

            <button
              onClick={goToToday}
              className="px-3 py-2 rounded-xl bg-[#8B8B00]/10 text-[#8B8B00] text-[10px] font-black uppercase tracking-widest hover:bg-[#8B8B00]/20 transition-all"
            >
              Today
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPreviousMonth}
              className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              <ChevronLeft size={16} />
            </button>

            <h4 className="text-sm font-black text-gray-800 uppercase tracking-wider">
              {monthName}
            </h4>

            <button
              onClick={goToNextMonth}
              className="w-9 h-9 rounded-xl border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="h-8 flex items-center justify-center text-[9px] font-black text-gray-400 uppercase"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => (
              <button
                key={index}
                disabled={!date}
                onClick={() => date && setSelectedDate(date)}
                className={`
                  relative h-10 sm:h-12 rounded-xl text-xs font-black transition-all
                  ${!date ? "bg-transparent cursor-default" : "hover:bg-gray-50"}
                  ${date && isSelected(date) ? "bg-[#8B8B00] text-white shadow-lg shadow-[#8B8B00]/20" : "text-gray-700"}
                  ${date && isToday(date) && !isSelected(date) ? "bg-blue-50 text-blue-600" : ""}
                `}
              >
                {date ? date.getDate() : ""}

                {date && hasEvents(date) && (
                  <span
                    className={`
                      absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full
                      ${isSelected(date) ? "bg-white" : "bg-[#8B8B00]"}
                    `}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-xs font-black text-gray-800 uppercase">
                  {selectedDate.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">
                  {selectedEvents.length} schedule found
                </p>
              </div>
            </div>

            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {selectedEvents.length > 0 ? (
                selectedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 rounded-2xl border border-gray-100 bg-gray-50/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${getEventTypeStyle(
                              event.type
                            )}`}
                          >
                            {event.type}
                          </span>
                          <span className="text-[10px] font-black text-gray-500">
                            {event.time}
                          </span>
                        </div>

                        <h5 className="text-xs font-black text-gray-800 uppercase">
                          {event.title}
                        </h5>

                        <p className="text-[10px] font-bold text-gray-400 mt-1">
                          Coach: {event.coach}
                        </p>

                        <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-gray-400">
                          <MapPin size={11} />
                          {event.location}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-5 rounded-2xl bg-gray-50 text-center">
                  <p className="text-xs font-bold text-gray-400">
                    No schedule added for this date.
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={handleAddEvent} className="mt-5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  placeholder="Schedule title"
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:border-[#8B8B00]"
                />

                <input
                  type="time"
                  value={eventForm.time}
                  onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:border-[#8B8B00]"
                />

                <select
                  value={eventForm.type}
                  onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:border-[#8B8B00]"
                >
                  <option>Training</option>
                  <option>Trial</option>
                  <option>Assessment</option>
                  <option>Match</option>
                </select>

                <input
                  type="text"
                  value={eventForm.coach}
                  onChange={(e) => setEventForm({ ...eventForm, coach: e.target.value })}
                  placeholder="Coach name"
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:border-[#8B8B00]"
                />

                <input
                  type="text"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  placeholder="Ground / location"
                  className="sm:col-span-2 w-full h-10 px-3 rounded-xl border border-gray-200 text-xs font-bold outline-none focus:border-[#8B8B00]"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#8B8B00] text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#7a7a00] transition-all"
              >
                <Plus size={14} />
                Add Schedule
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">
              Recent Trial Registrations
            </h3>

            <button
              onClick={() => navigate("/admission/trial")}
              className="text-[#8B8B00] text-[10px] font-black uppercase tracking-widest hover:underline flex items-center gap-1"
            >
              View All <ArrowRight size={12} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[560px]">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="pb-3 text-[10px] font-black uppercase text-gray-400 tracking-wider">
                    Student
                  </th>
                  <th className="pb-3 text-[10px] font-black uppercase text-gray-400 tracking-wider">
                    Sport
                  </th>
                  <th className="pb-3 text-[10px] font-black uppercase text-gray-400 tracking-wider">
                    Batch
                  </th>
                  <th className="pb-3 text-[10px] font-black uppercase text-gray-400 tracking-wider">
                    Time
                  </th>
                  <th className="pb-3 text-right"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {recentTrials.map((trial) => (
                  <tr key={trial.id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="py-4">
                      <span className="text-xs font-bold text-gray-800 uppercase">
                        {trial.name}
                      </span>
                    </td>

                    <td className="py-4">
                      <span className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-md">
                        {trial.sport}
                      </span>
                    </td>

                    <td className="py-4">
                      <span className="text-[10px] font-bold text-gray-500 uppercase">
                        {trial.batch}
                      </span>
                    </td>

                    <td className="py-4">
                      <span className="text-[10px] font-bold text-gray-400">
                        {trial.time}
                      </span>
                    </td>

                    <td className="py-4 text-right">
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <ChevronRight size={14} className="text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider mb-6">
            Admission Status
          </h3>

          <div className="h-[200px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[10px] font-bold text-gray-500 uppercase">
                    {item.name}
                  </span>
                </div>

                <span className="text-[10px] font-black text-gray-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">
                Fee Overview
              </h3>
              <p className="text-[10px] text-emerald-500 font-bold uppercase mt-1">
                ₹3.2L Collected this week
              </p>
            </div>

            <CreditCard size={18} className="text-gray-300" />
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={feeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B8B00" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#8B8B00" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
                />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8B8B00"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">
              Attendance Activity
            </h3>

            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#8B8B00]" />
                <span className="text-[9px] font-bold text-gray-400 uppercase">
                  Present
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-200" />
                <span className="text-[9px] font-bold text-gray-400 uppercase">
                  Absent
                </span>
              </div>
            </div>
          </div>

          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: "#9ca3af" }}
                />

                <Tooltip />

                <Bar dataKey="present" stackId="a" fill="#8B8B00" barSize={20} />
                <Bar dataKey="absent" stackId="a" fill="#e5e7eb" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-4">
          <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">
            Coach Status
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coaches.map((coach, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-[#8B8B00]/30 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-[#8B8B00]/10 flex items-center justify-center text-[#8B8B00] font-black shrink-0">
                  {coach.avatar}
                </div>

                <div className="overflow-hidden">
                  <p className="text-xs font-black text-gray-800 uppercase truncate tracking-tight">
                    {coach.name}
                  </p>

                  <p className="text-[9px] font-bold text-gray-400 uppercase leading-none mt-1">
                    {coach.sport} • {coach.role}
                  </p>

                  <div className="flex items-center gap-1.5 mt-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        coach.status === "On Field" ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    />
                    <span className="text-[9px] font-black uppercase tracking-tighter text-gray-500">
                      {coach.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3">
              <Bell size={14} className="text-gray-200" />
            </div>

            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
              Critical Alerts
            </h3>

            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex gap-3">
                  <div
                    className={`mt-1 shrink-0 ${
                      alert.type === "warning" ? "text-amber-500" : "text-blue-500"
                    }`}
                  >
                    <AlertCircle size={14} />
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-gray-700 leading-tight">
                      {alert.msg}
                    </p>
                    <p className="text-[9px] text-gray-400 font-medium mt-0.5">
                      {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => navigate("/admission")}
              className="w-full bg-[#8B8B00] text-white p-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#7a7a00] transition-all shadow-lg shadow-[#8B8B00]/20"
            >
              <UserPlus size={14} /> New Enrollment
            </button>

            <button className="w-full bg-white border border-gray-200 text-gray-700 p-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
              <Zap size={14} /> Quick Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;