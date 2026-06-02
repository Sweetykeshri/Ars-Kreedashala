import React, { useMemo, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from "recharts";
import {
  TrendingUp, UserCheck, UserX, Clock, Download, Filter,
  ArrowUpRight, ArrowDownRight, X
} from "lucide-react";

const COLORS = ["#16a34a", "#d97706", "#dc2626"];

const allBarData = [
  { name: "Mon", Student: 400, Coach: 12 },
  { name: "Tue", Student: 380, Coach: 11 },
  { name: "Wed", Student: 420, Coach: 12 },
  { name: "Thu", Student: 390, Coach: 10 },
  { name: "Fri", Student: 410, Coach: 12 },
  { name: "Sat", Student: 350, Coach: 11 },
  { name: "Sun", Student: 200, Coach: 5 },
];

const pieData = [
  { name: "Present", value: 85 },
  { name: "Late", value: 10 },
  { name: "Absent", value: 5 },
];

const trendData = [
  { name: "Week 1", percentage: 92 },
  { name: "Week 2", percentage: 88 },
  { name: "Week 3", percentage: 95 },
  { name: "Week 4", percentage: 91 },
];

const AttendanceReports = () => {
  const [range, setRange] = useState("30");
  const [showFilter, setShowFilter] = useState(false);
  const [showInsight, setShowInsight] = useState(false);

  const barData = useMemo(() => {
    if (range === "7") return allBarData.slice(-7);
    if (range === "15") return allBarData.slice(-5);
    return allBarData;
  }, [range]);

  const totalStudent = barData.reduce((sum, item) => sum + item.Student, 0);
  const totalCoach = barData.reduce((sum, item) => sum + item.Coach, 0);
  const avgAttendance = Math.round(totalStudent / barData.length);

  const stats = [
    { label: "Avg. Attendance", value: `${avgAttendance}%`, trend: "+2.4%", up: true, icon: <TrendingUp size={20} className="text-blue-600" /> },
    { label: "Total Present", value: totalStudent, trend: "-5%", up: false, icon: <UserCheck size={20} className="text-green-600" /> },
    { label: "Coach Present", value: totalCoach, trend: "+8%", up: true, icon: <UserCheck size={20} className="text-blue-600" /> },
    { label: "Late Ratio", value: "4.2%", trend: "-0.8%", up: false, icon: <Clock size={20} className="text-amber-600" /> },
  ];

  const exportCSV = () => {
    const rows = [
      ["Day", "Student", "Coach"],
      ...barData.map((item) => [item.name, item.Student, item.Coach]),
    ];

    const csv = rows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance-report-last-${range}-days.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance Reports</h1>
          <p className="text-gray-500">Visual data and performance reports.</p>
        </div>

        <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-600 shadow-sm hover:bg-gray-50"
          >
            <Filter size={16} />
            Last {range} Days
          </button>

          <button
            type="button"
            onClick={exportCSV}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
          >
            <Download size={18} />
            Export Report
          </button>

          {showFilter && (
            <div className="absolute right-0 top-12 z-20 w-full rounded-xl border border-gray-100 bg-white p-3 shadow-xl sm:w-44">
              {["7", "15", "30"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setRange(item);
                    setShowFilter(false);
                  }}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm font-bold hover:bg-blue-50 ${
                    range === item ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  Last {item} Days
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-start justify-between">
              <div className="rounded-xl bg-gray-50 p-2">{stat.icon}</div>
              <div className={`flex items-center text-xs font-bold ${stat.up ? "text-green-600" : "text-red-600"}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-sm font-medium text-gray-400">{stat.label}</p>
            <p className="text-2xl font-black text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 lg:col-span-2">
          <h3 className="mb-6 font-bold text-gray-800">Daily Attendance Breakdown</h3>
          <div className="h-[280px] sm:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Student" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="Coach" fill="#d1d5db" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <h3 className="mb-6 font-bold text-gray-800">Attendance Quality</h3>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 lg:col-span-3">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-bold text-gray-800">Monthly Performance Trend</h3>
              <p className="text-xs font-medium text-gray-400">Weekly average attendance.</p>
            </div>

            <button
              type="button"
              onClick={() => setShowInsight(true)}
              className="rounded-lg bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600 hover:bg-blue-100"
            >
              View Deep Insights
            </button>
          </div>

          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Line type="monotone" dataKey="percentage" stroke="#2563eb" strokeWidth={4} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {showInsight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-black text-gray-900">Deep Insights</h3>
              <button type="button" onClick={() => setShowInsight(false)} className="rounded-lg p-2 hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-sm font-semibold text-gray-600">
              <p>Best attendance day: Wednesday</p>
              <p>Lowest attendance day: Sunday</p>
              <p>Average student attendance: {avgAttendance}%</p>
              <p>Report range: Last {range} Days</p>
            </div>

            <button
              type="button"
              onClick={() => setShowInsight(false)}
              className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-xs font-black uppercase text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceReports;