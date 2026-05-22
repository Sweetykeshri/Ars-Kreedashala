import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend, AreaChart, Area
} from 'recharts';
import { 
  Download, 
  Filter, 
  TrendingUp, 
  DollarSign, 
  Users, 
  AlertCircle,
  Calendar,
  ChevronDown
} from 'lucide-react';

const FeeReports = () => {
  const revenueData = [
    { name: 'Jan', revenue: 450000, collections: 420000 },
    { name: 'Feb', revenue: 480000, collections: 460000 },
    { name: 'Mar', revenue: 520000, collections: 410000 },
    { name: 'Apr', revenue: 490000, collections: 480000 },
    { name: 'May', revenue: 600000, collections: 540000 },
    { name: 'Jun', revenue: 550000, collections: 520000 },
  ];

  const categoryData = [
    { name: 'Admission Fees', value: 35, color: '#3b82f6' },
    { name: 'Monthly Fees', value: 55, color: '#10b981' },
    { name: 'Trials/Visits', value: 10, color: '#f59e0b' },
  ];

  const methodData = [
    { name: 'UPI', value: 65, color: '#6366f1' },
    { name: 'Cash', value: 15, color: '#f43f5e' },
    { name: 'Card', value: 12, color: '#14b8a6' },
    { name: 'Transfer', value: 8, color: '#f59e0b' },
  ];

  const stats = [
    { label: 'Total Revenue YTD', value: '₹32,45,000', change: '+12.5%', isUp: true, icon: <DollarSign size={20} className="text-blue-600" /> },
    { label: 'Collection Efficiency', value: '92%', change: '+2.1%', isUp: true, icon: <TrendingUp size={20} className="text-green-600" /> },
    { label: 'Outstanding Receivables', value: '₹1,24,500', change: '+45k', isUp: false, icon: <AlertCircle size={20} className="text-red-500" /> },
    { label: 'Active Payees', value: '412', change: '+12', isUp: true, icon: <Users size={20} className="text-purple-600" /> },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Financial Intelligence</h1>
          <p className="text-gray-500">Deep-dive analytics for fee collection and revenue cycles.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white border border-gray-100 rounded-xl px-4 py-2 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-500 shadow-sm cursor-pointer hover:bg-gray-50 transition-all">
            <Calendar size={16} />
            Fiscal Year 2024
            <ChevronDown size={14} />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            <Download size={18} />
            Generate Statement
          </button>
        </div>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm transition-all hover:translate-y-[-4px] hover:shadow-xl hover:shadow-gray-100 group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${stat.isUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {stat.change}
              </div>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-black text-gray-800 tracking-tight mb-1">Revenue vs Collections</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Target monitoring for the last 6 months</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-100 rounded-full"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Collections</span>
              </div>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontWeight: 'bold', fontSize: 10}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontWeight: 'bold', fontSize: 10}} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="collections" stroke="#dbeafe" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Pie */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-black text-gray-800 tracking-tight mb-1">Revenue Stream</h3>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-10">Breakdown by fee type</p>
          <div className="h-[250px] relative mb-10">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-xs font-black text-gray-300 uppercase tracking-widest">Overall</p>
              <h4 className="text-xl font-black text-gray-800 tracking-tighter">100%</h4>
            </div>
          </div>
          <div className="space-y-4">
            {categoryData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.color}}></div>
                  <span className="text-xs font-bold text-gray-500">{item.name}</span>
                </div>
                <span className="text-sm font-black text-gray-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="lg:col-span-3 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-gray-800 tracking-tight">Channel Performance</h3>
            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-xl">Detailed Ledger</button>
          </div>
          <div className="flex flex-wrap gap-8 justify-between">
            {methodData.map((method, i) => (
              <div key={i} className="flex-1 min-w-[150px] p-6 bg-gray-50/50 rounded-2xl border border-gray-100 group hover:bg-white transition-all hover:border-blue-100 hover:shadow-lg hover:shadow-blue-50">
                <div className="flex items-center gap-4 mb-4 font-black text-gray-400 group-hover:text-blue-600 transition-colors uppercase text-[10px] tracking-widest">
                  <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center">
                    <DollarSign size={16} />
                  </div>
                  {method.name}
                </div>
                <div className="flex items-end justify-between">
                  <h4 className="text-2xl font-black text-gray-800 tracking-tighter">{method.value}%</h4>
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div className="h-full rounded-full transition-all duration-1000" style={{backgroundColor: method.color, width: `${method.value}%`}}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeReports;