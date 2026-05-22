import React from 'react';
import { 
  Clock, 
  Users, 
  Calendar, 
  Activity, 
  BarChart3, 
  MapPin, 
  Filter, 
  FileDown,
  UserCheck,
  Zap
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  Legend
} from 'recharts';
import { ReportHeader, KPICard } from '../../components/reports/ReportShared';

const AttendanceAnalytics = () => {
  const weeklyAttendance = [
    { day: 'MON', student: 92, coach: 100 },
    { day: 'TUE', student: 88, coach: 95 },
    { day: 'WED', student: 95, coach: 100 },
    { day: 'THU', student: 84, coach: 90 },
    { day: 'FRI', student: 90, coach: 100 },
    { day: 'SAT', student: 98, coach: 100 },
    { day: 'SUN', student: 96, coach: 95 },
  ];

  const batchAttendance = [
    { name: 'Elite Crkt', rate: 96 },
    { name: 'Junior Foot', rate: 82 },
    { name: 'Pro Badmn', rate: 91 },
    { name: 'Dev Unit', rate: 75 },
  ];

  const attendanceSummary = [
    { name: 'Sector A (Ground)', expected: 120, present: 112, coach: 'Rabindra S.' },
    { name: 'Sector B (Nets)', expected: 45, present: 42, coach: 'Ankita M.' },
    { name: 'Indoor Hall', expected: 30, present: 28, coach: 'Priya D.' },
    { name: 'Strength Lab', expected: 25, present: 18, coach: 'Sushant S.' },
  ];

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ReportHeader 
        title={<>Deployment: <span className="text-blue-600">Attendance Tracker</span></>}
        subtitle="Operational efficiency and personnel presence metrics"
        icon={Clock}
      />

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard 
          title="Avg Attendance"
          value="91.4%"
          detail="Academy Wide"
          trend="up"
          trendValue="+3.2%"
          icon={Activity}
          color="emerald"
        />
        <KPICard 
          title="Coach Presence"
          value="98.2%"
          detail="Instructional Staff"
          trend="up"
          trendValue="+1.5%"
          icon={UserCheck}
          color="blue"
        />
        <KPICard 
          title="Deficiency"
          value="08.6%"
          detail="Absent/Leave Rate"
          trend="down"
          trendValue="-2.1%"
          icon={Clock}
          color="rose"
        />
        <KPICard 
          title="Peak Window"
          value="06-08"
          detail="AM Session Ops"
          icon={Calendar}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">System Presence Index</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Personnel vs Student Daily Flow</p>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyAttendance}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                  tickFormatter={(val) => `${val}%`}
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
                <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', paddingTop: '20px' }} />
                <Line type="monotone" dataKey="student" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} name="Cadets" />
                <Line type="monotone" dataKey="coach" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 4, fill: '#8b5cf6' }} activeDot={{ r: 6 }} name="Instructional" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-8">Unit Performance</h3>
          <div className="space-y-6">
            {batchAttendance.map((batch, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">{batch.name}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${batch.rate > 90 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {batch.rate}% INTENSITY
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${batch.rate}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all">
            Audit Units
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="text-blue-600" size={20} />
            <h3 className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Sector Deployment Report</h3>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white rounded-lg border border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all">
              <Filter size={16} />
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-white text-gray-900 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-black uppercase text-[10px]">
              <FileDown size={14} /> Global Report
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white">
                <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Sector/Location</th>
                <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Expected</th>
                <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Detected</th>
                <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest text-center">Integrity</th>
                <th className="px-8 py-5 text-[9px] font-black text-gray-400 uppercase tracking-widest">Unit Commander</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-black uppercase text-xs">
              {attendanceSummary.map((item, i) => (
                <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-gray-300" />
                      <span className="text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center text-gray-400">{item.expected}</td>
                  <td className="px-8 py-6 text-center text-gray-900">{item.present}</td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-emerald-600 italic">{Math.round((item.present / item.expected) * 100)}%</span>
                      {item.present / item.expected > 0.9 ? <Zap size={12} className="text-emerald-500" /> : null}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[8px]">
                        {item.coach[0]}
                      </div>
                      <span className="text-gray-500 font-bold">{item.coach}</span>
                    </div>
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

export default AttendanceAnalytics;
