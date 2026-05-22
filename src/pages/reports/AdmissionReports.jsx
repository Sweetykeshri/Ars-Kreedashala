import React from 'react';
import { 
  UserPlus, 
  Search, 
  FileDown, 
  Filter, 
  Calendar as CalendarIcon,
  Users,
  TrendingUp,
  UserCheck,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart, 
  Pie, 
  Cell
} from 'recharts';
import { ReportHeader, KPICard } from '../../components/reports/ReportShared';

const AdmissionReports = () => {
  const trendData = [
    { month: 'JAN', new: 45, trial: 60 },
    { month: 'FEB', new: 52, trial: 75 },
    { month: 'MAR', new: 48, trial: 70 },
    { month: 'APR', new: 61, trial: 85 },
    { month: 'MAY', new: 75, trial: 96 },
    { month: 'JUN', new: 82, trial: 110 },
  ];

  const sourceData = [
    { name: 'Social Media', value: 45, color: '#3b82f6' },
    { name: 'Referrals', value: 30, color: '#10b981' },
    { name: 'Walk-ins', value: 15, color: '#f59e0b' },
    { name: 'Events', value: 10, color: '#8b5cf6' },
  ];

  const recentAdmissions = [
    { id: 'ADM-902', name: 'Arjun Mehra', sports: 'Cricket', date: '21 May 2024', status: 'Approved', type: 'New' },
    { id: 'ADM-901', name: 'Sana Khan', sports: 'Badminton', date: '20 May 2024', status: 'Pending', type: 'Trial' },
    { id: 'ADM-900', name: 'Vikram Das', sports: 'Football', date: '19 May 2024', status: 'Approved', type: 'Returning' },
    { id: 'ADM-899', name: 'Riya Sen', sports: 'Cricket', date: '18 May 2024', status: 'Approved', type: 'New' },
  ];

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ReportHeader 
        title={<>Intelligence: <span className="text-blue-600">Admission Metrics</span></>}
        subtitle="End-to-end recruitment funnel and intake analytics"
        icon={UserPlus}
      />

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard 
          title="Total Intake"
          value="482"
          detail="Active Students"
          trend="up"
          trendValue="+12%"
          icon={Users}
          color="blue"
        />
        <KPICard 
          title="New Recruits"
          value="64"
          detail="This Month"
          trend="up"
          trendValue="+8.2%"
          icon={UserPlus}
          color="emerald"
        />
        <KPICard 
          title="Trial Conversion"
          value="42%"
          detail="Lead to Student"
          trend="down"
          trendValue="-2.1%"
          icon={Zap}
          color="amber"
        />
        <KPICard 
          title="Active Trials"
          value="38"
          detail="Pipeline Inventory"
          icon={UserCheck}
          color="purple"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Growth Projection</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Intake vs Trial Volume</p>
            </div>
            <select className="bg-gray-50 border-none rounded-xl text-[10px] font-black uppercase px-4 py-2 outline-none appearance-none cursor-pointer">
              <option>Last 6 Months</option>
              <option>Yearly View</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTrial" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '10px',
                    fontWeight: 900,
                    textTransform: 'uppercase'
                  }} 
                />
                <Area type="monotone" dataKey="new" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorNew)" />
                <Area type="monotone" dataKey="trial" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorTrial)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-8">Lead Generation</h3>
          <div className="h-[250px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {sourceData.map((source, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: source.color }}></div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">{source.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Utilities & Table */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 flex-1 md:max-w-md">
            <Search className="text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH STUDENT REGISTRY..." 
              className="bg-transparent border-none text-[10px] font-black uppercase tracking-wider outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-all font-black uppercase text-[10px]">
              <Filter size={14} /> Filter
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black transition-all font-black uppercase text-[10px] shadow-lg shadow-gray-200">
              <FileDown size={14} /> Export XLS
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Entry ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Athlete Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Discipline</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-black uppercase text-xs">
              {recentAdmissions.map((adm, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6 text-blue-600 italic">#{adm.id}</td>
                  <td className="px-8 py-6">
                    <div className="font-black text-gray-900">{adm.name}</div>
                    <div className="text-[9px] text-gray-400 flex items-center gap-1 mt-1 font-bold">
                      <CalendarIcon size={10} /> REC: {adm.date}
                    </div>
                  </td>
                  <td className="px-8 py-6 tracking-tight">{adm.sports}</td>
                  <td className="px-8 py-6">
                    <span className={`px-2 py-1 rounded-lg text-[9px] border ${adm.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
                      {adm.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-gray-400 hover:text-blue-600 transition-all">
                      <Zap size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdmissionReports;
