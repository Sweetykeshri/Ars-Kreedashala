import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  UserCheck, 
  UserX, 
  Clock, 
  Download, 
  Filter,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const AttendanceReports = () => {
  const barData = [
    { name: 'Mon', Student: 400, Coach: 12 },
    { name: 'Tue', Student: 380, Coach: 11 },
    { name: 'Wed', Student: 420, Coach: 12 },
    { name: 'Thu', Student: 390, Coach: 10 },
    { name: 'Fri', Student: 410, Coach: 12 },
    { name: 'Sat', Student: 350, Coach: 11 },
    { name: 'Sun', Student: 200, Coach: 5 },
  ];

  const pieData = [
    { name: 'Present', value: 85, color: '#16a34a' },
    { name: 'Late', value: 10, color: '#d97706' },
    { name: 'Absent', value: 5, color: '#dc2626' },
  ];

  const trendData = [
    { name: 'Week 1', percentage: 92 },
    { name: 'Week 2', percentage: 88 },
    { name: 'Week 3', percentage: 95 },
    { name: 'Week 4', percentage: 91 },
  ];

  const stats = [
    { label: 'Avg. Attendance', value: '91.2%', trend: '+2.4%', up: true, icon: <TrendingUp size={20} className="text-blue-600" /> },
    { label: 'Total Present Today', value: '382', trend: '-5%', up: false, icon: <UserCheck size={20} className="text-green-600" /> },
    { label: 'Active Leaves', value: '14', trend: '+12%', up: true, icon: <UserX size={20} className="text-red-600" /> },
    { label: 'Late Ratio', value: '4.2%', trend: '-0.8%', up: false, icon: <Clock size={20} className="text-amber-600" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Attendance Analytics</h1>
          <p className="text-gray-500">Visual data and performance reports for the current month.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert('Launching date trajectory filters for attendance logs...')}
            className="bg-white border border-gray-200 rounded-lg flex items-center px-3 py-2 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50 transition-all"
          >
            <Filter size={16} className="mr-2 text-gray-400" />
            Last 30 Days
          </button>
          <button 
            onClick={() => alert('Extracting consolidated attendance intelligence dossier (PDF)...')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-bold shadow-sm"
          >
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-gray-50 rounded-xl group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className={`flex items-center text-xs font-bold ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-gray-800">Daily Attendance Breakdown</h3>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-blue-600 rounded-full"></span> Students</div>
              <div className="flex items-center gap-1.5"><span className="w-3 h-3 bg-gray-300 rounded-full"></span> Coaches</div>
            </div>
          </div>
          <div className="h-87.5">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="Student" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={24} />
                <Bar dataKey="Coach" fill="#d1d5db" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-8">Attendance Quality</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
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
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-gray-600">Morning Session Ratio</span>
                <span className="text-xs font-bold text-blue-600">88%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 w-[88%]"></div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-gray-600">Evening Session Ratio</span>
                <span className="text-xs font-bold text-green-600">94%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 w-[94%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Trend Line Chart */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-gray-800 tracking-tight">Monthly Performance Trend</h3>
              <p className="text-xs text-gray-400 font-medium">Weekly average attendance percentage across all sports.</p>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">View Deep Insights</button>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} hide />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="percentage" 
                  stroke="#2563eb" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#2563eb', strokeWidth: 3, stroke: '#fff' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReports;