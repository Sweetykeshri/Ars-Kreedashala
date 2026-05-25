import React from 'react';
import { 
  Trophy, 
  Target, 
  Zap, 
  TrendingUp, 
  Search, 
  Filter, 
  ChevronRight,
  TrendingDown,
  Award,
  Medal,
  Activity,
  UserPlus
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { ReportHeader, KPICard } from '../../components/reports/ReportShared';

const PerformanceReports = () => {
  const athleteStats = [
    { subject: 'Speed', A: 120, B: 110, fullMark: 150 },
    { subject: 'Endurance', A: 98, B: 130, fullMark: 150 },
    { subject: 'Technique', A: 86, B: 130, fullMark: 150 },
    { subject: 'Power', A: 99, B: 100, fullMark: 150 },
    { subject: 'Discipline', A: 100, B: 90, fullMark: 150 },
    { subject: 'Strategy', A: 65, B: 85, fullMark: 150 },
  ];

  const tournamentData = [
    { year: '2021', wins: 45, total: 60 },
    { year: '2022', wins: 52, total: 65 },
    { year: '2023', wins: 68, total: 80 },
    { year: '2024', wins: 42, total: 48 },
  ];

  const rankings = [
    { rank: '01', name: 'Arnav Sharma', badge: 'ELITE-92', rating: '9.8', trend: 'up' },
    { rank: '02', name: 'Sanya Das', badge: 'PRO-12', rating: '9.5', trend: 'up' },
    { rank: '03', name: 'Kabir Roy', badge: 'ELITE-44', rating: '9.2', trend: 'down' },
    { rank: '04', name: 'Priya Mehra', badge: 'DEV-88', rating: '8.9', trend: 'up' },
  ];

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ReportHeader 
        title={<>Command: <span className="text-blue-600">Performance Intelligence</span></>}
        subtitle="End-to-end athlete proficiency and growth surveillance"
        icon={Trophy}
        actions={
          <div className="flex items-center gap-3">
             <button 
               onClick={() => alert('Launching performance vector filters...')}
               className="p-3 bg-white border border-gray-100 text-gray-400 rounded-xl hover:text-blue-600 transition-all shadow-sm"
             >
               <Filter size={18} />
             </button>
             <button 
               onClick={() => alert('Compiling tactical proficiency dossier... Downloading encrypted PDF.')}
               className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-black uppercase text-[10px] hover:bg-black shadow-lg shadow-gray-200 transition-all"
             >
               <TrendingUp size={16} /> Export Intel
             </button>
          </div>
        }
      />

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard 
          title="Elite Athletes"
          value="42"
          detail="Rating > 9.0"
          trend="up"
          trendValue="+5"
          icon={Medal}
          color="blue"
        />
        <KPICard 
          title="Avg Proficiency"
          value="84.2%"
          detail="Skills Index"
          trend="up"
          trendValue="+1.8%"
          icon={Activity}
          color="emerald"
        />
        <KPICard 
          title="Tourney Wins"
          value="182"
          detail="State/National"
          icon={Trophy}
          color="amber"
        />
        <KPICard 
          title="Growth Rate"
          value="76%"
          detail="Personal Best Delta"
          icon={TrendingUp}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Competency Matrix</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Cross-discipline assessment Radar</p>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={athleteStats}>
                <PolarGrid stroke="#f3f4f6" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                />
                <Radar
                  name="Current Batch"
                  dataKey="A"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Benchmark"
                  dataKey="B"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.2}
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
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Victory Analytics</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Tournament conversion history</p>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={tournamentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="year" 
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
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '10px',
                    fontWeight: 900,
                    textTransform: 'uppercase'
                  }} 
                />
                <Bar dataKey="wins" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="total" fill="#e5e7eb" radius={[4, 4, 0, 0]} barSize={8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
           <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Academy Alpha: <span className="text-blue-600">Leaderboard</span></h3>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:gap-2 transition-all flex items-center gap-1">
                Full Rankings <ChevronRight size={14} />
              </button>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="bg-gray-50/50">
                   <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Rank</th>
                   <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Athlete</th>
                   <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Designation</th>
                   <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest">Score</th>
                   <th className="px-8 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Trend</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-gray-50 font-black uppercase text-xs">
                 {rankings.map((rank, i) => (
                   <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                     <td className="px-8 py-5">
                       <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black border ${i === 0 ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>
                         {rank.rank}
                       </span>
                     </td>
                     <td className="px-8 py-5 text-gray-900">{rank.name}</td>
                     <td className="px-8 py-5 text-[10px] text-gray-400 italic">{rank.badge}</td>
                     <td className="px-8 py-5">
                       <div className="flex items-center gap-1">
                          <Zap size={14} className="text-blue-500" />
                          <span>{rank.rating}</span>
                       </div>
                     </td>
                     <td className="px-8 py-5 text-right">
                       {rank.trend === 'up' ? <TrendingUp size={16} className="text-emerald-500 inline" /> : <TrendingDown size={16} className="text-rose-500 inline" />}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-[2.5rem] text-white shadow-xl shadow-gray-200 group">
             <div className="flex justify-between items-start mb-6">
               <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                 <Target size={24} className="text-blue-400" />
               </div>
               <Award size={24} className="text-white/20 group-hover:text-blue-400 transition-colors" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Operational Goal</p>
             <h4 className="text-2xl font-black uppercase leading-tight mb-4">Target: Elite Conversion 85%</h4>
             <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
               <div className="h-full w-[72%] bg-blue-500 rounded-full"></div>
             </div>
             <p className="text-[10px] font-bold text-gray-500 uppercase italic">Current Progress: 72.4% System Wide</p>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-4">
             <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
               <UserPlus size={20} />
             </div>
             <div>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Next Talent Scout</p>
               <p className="text-xs font-black text-gray-900 uppercase">State Open Trials • 25 MAY</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReports;
