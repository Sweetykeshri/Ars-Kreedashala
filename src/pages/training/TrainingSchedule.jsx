import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  User, 
  Activity,
  Download,
  Filter,
  Users,
  AlertTriangle
} from 'lucide-react';

const TrainingSchedule = () => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const schedules = [
    { time: '06:00 AM', batch: 'Elite Cricket Morning', coach: 'Rajesh Kumar', field: 'Main Pitch A', type: 'High Intensity', students: '18/20' },
    { time: '07:30 AM', batch: 'Advanced Tennis Uni', coach: 'Sania Mirza', field: 'Court 1', type: 'Tactical', students: '10/10' },
    { time: '04:00 PM', batch: 'Junior Football Eve', coach: 'Amit Singh', field: 'Sector 4 (North)', type: 'Endurance', students: '22/25' },
    { time: '05:30 PM', batch: 'U-14 Badminton', coach: 'Pullela Gopichand', field: 'Indoors Box 2', type: 'Skill Drills', students: '12/15' },
    { time: '07:00 PM', batch: 'Professional Fitness', coach: 'Trainer K', field: 'Gym Area 1', type: 'Recovery', students: '15/20' },
  ];

  const upcomingAlerts = [
    { time: 'In 2h', title: 'Ground Maint.', desc: 'Sector B offline', severity: 'low' },
    { time: 'Tomorrow', title: 'Coach Meeting', desc: 'Protocol Review', severity: 'med' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Training Deployment Timeline</h2>
          <p className="text-gray-500 text-sm mt-1">Operational schedule for all active units and facilities.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-gray-600 hover:bg-gray-50 transition-all text-xs font-bold uppercase tracking-widest">
            <Filter size={16} />
            <span>Filter Sector</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all text-xs font-bold uppercase tracking-widest shadow-lg shadow-gray-200">
            <Download size={16} />
            <span>Export Registry</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Schedule Column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Week Navigator */}
          <div className="bg-white p-2 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between">
            <button className="p-4 hover:bg-gray-50 rounded-2xl text-gray-400">
              <ChevronLeft size={20} />
            </button>
            <div className="flex-1 flex justify-around items-center">
              {weekDays.map((day, i) => (
                <button 
                  key={day}
                  onClick={() => setSelectedDay(i)}
                  className={`flex flex-col items-center gap-1.5 px-6 py-4 rounded-2xl transition-all duration-300 ${
                    selectedDay === i 
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 scale-105' 
                    : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">{day}</span>
                  <span className="text-lg font-black leading-none">{12 + i}</span>
                </button>
              ))}
            </div>
            <button className="p-4 hover:bg-gray-50 rounded-2xl text-gray-400">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Timeline View */}
          <div className="space-y-4">
            {schedules.map((item, i) => (
              <div key={i} className="group relative flex gap-6 items-start animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
                {/* Time Indicator */}
                <div className="w-24 pt-2 text-right">
                    <p className="text-sm font-black text-gray-900 leading-none">{item.time.split(' ')[0]}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">{item.time.split(' ')[1]}</p>
                </div>

                {/* Vertical Line */}
                <div className="absolute left-[7.25rem] top-0 bottom-0 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-white border-4 border-blue-600 z-10"></div>
                    <div className="w-[2px] flex-1 bg-gray-100 group-last:hidden"></div>
                </div>

                {/* Session Card */}
                <div className="flex-1 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm group-hover:border-blue-200 group-hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border ${
                                item.type === 'High Intensity' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                item.type === 'Tactical' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                'bg-emerald-50 text-emerald-600 border-emerald-100'
                            }`}>
                                {item.type}
                            </span>
                            <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">{item.batch}</h4>
                        </div>
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                <User size={14} className="text-blue-500" />
                                <span>{item.coach}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                <MapPin size={14} className="text-rose-500" />
                                <span>{item.field}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                <Users size={14} className="text-emerald-500" />
                                <span>{item.students} Students</span>
                            </div>
                        </div>
                    </div>
                    <button className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] bg-gray-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all">
                        View Unit Details
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Alerts / Summary */}
        <div className="space-y-6">
          {/* Integrity Status */}
          <div className="bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200 relative overflow-hidden group">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-600 opacity-20 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
            <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                    <Activity className="text-blue-500" size={24} />
                    <span className="text-[10px] font-black text-white px-3 py-1 bg-white/10 rounded-full uppercase tracking-widest backdrop-blur-md">Live Status</span>
                </div>
                <div>
                   <h3 className="text-xl font-black text-white leading-tight">SYSTEM<br/>INTEGRITY</h3>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">All Sectors Fully Operational</p>
                </div>
                <div className="pt-4 border-t border-white/10">
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Global Load</span>
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">68%</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-blue-500 rounded-full"></div>
                    </div>
                </div>
            </div>
          </div>

          {/* Operational Alerts */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <AlertTriangle size={14} className="text-orange-500" />
                Sector Alerts
            </h3>
            <div className="space-y-5">
                {upcomingAlerts.map((alert, i) => (
                    <div key={i} className="flex gap-4">
                        <div className="w-12 text-center">
                            <p className="text-[10px] font-black text-gray-400 uppercase leading-none">{alert.time}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-gray-900 uppercase tracking-tight leading-none">{alert.title}</p>
                            <p className="text-[10px] text-gray-400 mt-1 font-medium">{alert.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full mt-8 py-3 bg-gray-50 hover:bg-blue-50 hover:text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                Full Log
            </button>
          </div>

          {/* Mini Calendar Hook */}
          <div className="bg-blue-50/50 p-8 rounded-[2.5rem] border border-blue-100/50">
             <div className="flex items-center gap-3 mb-6">
                <CalendarIcon className="text-blue-600" size={20} />
                <h3 className="text-xs font-black text-blue-900 uppercase tracking-widest">Session Overview</h3>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                    <span className="text-blue-400">Peak Hours</span>
                    <span className="text-blue-900">06-08 AM</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                    <span className="text-blue-400">Total Units</span>
                    <span className="text-blue-900">42 Sessions</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingSchedule;