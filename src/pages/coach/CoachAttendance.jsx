import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  LogIn, 
  LogOut,
  MapPin,
  Search,
  Filter,
  ArrowRight,
  UserCheck,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const CoachAttendancePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const attendanceRecords = [
    {
      id: "C-001",
      name: "RABINDRANATH SARKAR",
      designation: "HEAD COACH",
      shift: "MORNING (06:00 - 09:00)",
      inTime: "05:45 AM",
      outTime: "09:15 AM",
      status: "PRESENT",
      location: "SECTOR A",
      report: "COMPLETED"
    },
    {
      id: "C-002",
      name: "ANKITA MUKHERJEE",
      designation: "SENIOR COACH",
      shift: "MORNING (06:00 - 09:00)",
      inTime: "---",
      outTime: "---",
      status: "ON LEAVE",
      location: "---",
      report: "PENDING"
    },
    {
      id: "C-003",
      name: "SUSHANT SINGH",
      designation: "FIELD COACH",
      shift: "EVENING (04:00 - 07:00)",
      inTime: "03:55 PM",
      outTime: "STILL ON DUTY",
      status: "PRESENT",
      location: "SECTOR C",
      report: "IN PROGRESS"
    },
    {
      id: "C-005",
      name: "DIPANKAR ROY",
      designation: "JUNIOR COACH",
      shift: "MORNING (06:00 - 09:00)",
      inTime: "06:15 AM",
      outTime: "09:05 AM",
      status: "LATE",
      location: "SECTOR B",
      report: "COMPLETED"
    }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'PRESENT': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'ON LEAVE': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'LATE': return 'bg-rose-50 text-rose-600 border-rose-200';
      case 'STILL ON DUTY': return 'bg-blue-50 text-blue-600 border-blue-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <Clock className="text-blue-600" size={32} />
            Ops Log: <span className="text-blue-600">Personnel Attendance</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-1">Real-time tracking of coaching staff deployment</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <button className="p-2 hover:bg-gray-50 rounded-xl transition-all">
            <ChevronLeft size={20} className="text-gray-400" />
          </button>
          <div className="flex flex-col items-center px-4 border-x border-gray-50">
            <span className="text-xs font-black text-blue-600 uppercase tracking-tighter">Current Deployment Date</span>
            <span className="text-sm font-black text-gray-900 uppercase">24 MAY 2024</span>
          </div>
          <button className="p-2 hover:bg-gray-50 rounded-xl transition-all">
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Deployed Today', value: '12', subtext: 'TOTAL STAFF', icon: <UserCheck />, color: 'blue' },
          { label: 'On Field', value: '08', subtext: 'CURRENTLY WORKING', icon: <MapPin />, color: 'emerald' },
          { label: 'Off Duty', value: '03', subtext: 'SHIFT COMPLETE', icon: <LogIn />, color: 'purple' },
          { label: 'Deficiency', value: '01', subtext: 'UNEXCUSED ABSENCE', icon: <AlertTriangle />, color: 'rose' },
        ].map((metric, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:translate-y-[-4px] transition-all duration-300">
            <div className={`w-10 h-10 rounded-2xl bg-${metric.color}-50 flex items-center justify-center text-${metric.color}-600 mb-4`}>
              {metric.icon}
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{metric.label}</p>
            <div className="flex items-end gap-2">
              <span className={`text-3xl font-black text-gray-900`}>{metric.value}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase mb-1.5">{metric.subtext}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Actions */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH COACH..." 
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-[10px] font-black uppercase tracking-wider focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
          </div>
          <button className="p-2.5 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-all">
            <Filter size={18} />
          </button>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-gray-100 rounded-xl font-black uppercase text-[10px] hover:bg-gray-50 transition-all">
            <TrendingUp size={14} /> Analytics
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl font-black uppercase text-[10px] hover:bg-gray-800 shadow-lg shadow-gray-200 transition-all">
            Log Overtime
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Personnel Profile</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Field Sector</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">In/Out Times</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Status Code</th>
                <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Report Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {attendanceRecords.map((record, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-black text-xs">
                        {record.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-900 uppercase">{record.name}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{record.id} • {record.designation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-gray-400" />
                      <span className="text-[10px] font-black text-gray-700 uppercase">{record.location}</span>
                    </div>
                    <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase italic">{record.shift}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-gray-400 uppercase mb-0.5">Check-In</span>
                        <span className="text-[10px] font-black text-emerald-600 italic">{record.inTime}</span>
                      </div>
                      <ArrowRight size={14} className="text-gray-300 pointer-events-none" />
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-gray-400 uppercase mb-0.5">Check-Out</span>
                        <span className={`text-[10px] font-black ${record.outTime.includes('STILL') ? 'text-blue-600' : 'text-rose-600'} italic`}>{record.outTime}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black border uppercase tracking-wider ${getStatusStyle(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-600 uppercase">
                      {record.report === 'COMPLETED' ? (
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      ) : record.report === 'IN PROGRESS' ? (
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                      ) : (
                        <XCircle size={14} className="text-rose-400" />
                      )}
                      {record.report}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                      View Log
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

export default CoachAttendancePage;