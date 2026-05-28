import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  MapPin, 
  Calendar,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Search,
  LayoutGrid,
  List,
  UserPlus
} from 'lucide-react';

const CoachAttendance = () => {
  const [viewMode, setViewMode] = useState('grid');
  
  const [coaches, setCoaches] = useState([
    { 
      id: 'CH001', 
      name: 'Rajesh Patil', 
      role: 'Head Cricket Coach', 
      status: 'Present', 
      inTime: '03:45 PM', 
      outTime: '--', 
      batch: 'Advanced Cricket', 
      ground: 'Cricket Ground A' 
    },
    { 
      id: 'CH002', 
      name: 'Sushil Das', 
      role: 'Football Coach', 
      status: 'Absent', 
      inTime: '--', 
      outTime: '--', 
      batch: 'Junior Football', 
      ground: 'Football Turf' 
    },
    { 
      id: 'CH003', 
      name: 'Anjali Shah', 
      role: 'Badminton Trainer', 
      status: 'Present', 
      inTime: '06:55 AM', 
      outTime: '09:00 AM', 
      batch: 'Adults Morning', 
      ground: 'Court 1 & 2' 
    },
    { 
      id: 'CH004', 
      name: 'Vinay Kumar', 
      role: 'Athletics Coach', 
      status: 'Present', 
      inTime: '04:00 PM', 
      outTime: '--', 
      batch: 'Track & Field', 
      ground: 'Main Track' 
    },
  ]);

  const [successMessage, setSuccessMessage] = useState('');

  const formatTime = (date) => {
    const d = date || new Date();
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const mm = String(minutes).padStart(2, '0');
    return `${hours}:${mm} ${ampm}`;
  };

  const markAttendance = () => {
    const now = new Date();
    setCoaches((curr) => curr.map((c) => ({ ...c, status: 'Present', inTime: formatTime(now) })));
    setSuccessMessage('Coach attendance saved — all marked Present');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const markCoachPresent = (id) => {
    const now = new Date();
    setCoaches((curr) => curr.map((c) => (c.id === id ? { ...c, status: 'Present', inTime: formatTime(now) } : c)));
    setSuccessMessage('Marked Present');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const markCoachLeave = (id) => {
    setCoaches((curr) => curr.map((c) => (c.id === id ? { ...c, status: 'Absent', inTime: '--' } : c)));
    setSuccessMessage('Marked Leave');
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-700';
      case 'Absent': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Coach Attendance</h1>
          <p className="text-gray-500">Manage daily logs and assignments for teaching staff.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white border border-gray-200 rounded-lg p-1 flex">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List size={20} />
            </button>
          </div>
          <button onClick={markAttendance} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm">
            <UserPlus size={18} />
            <span>Mark Attendance</span>
          </button>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-wrap gap-8 items-center justify-between">
        <div className="flex gap-8">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Coaches</p>
            <p className="text-2xl font-bold text-gray-800">12</p>
          </div>
          <div className="w-px h-10 bg-gray-100"></div>
          <div>
            <p className="text-sm font-medium text-green-600">On Duty Today</p>
            <p className="text-2xl font-bold text-gray-800">9</p>
          </div>
          <div className="w-px h-10 bg-gray-100"></div>
          <div>
            <p className="text-sm font-medium text-red-600">On Leave</p>
            <p className="text-2xl font-bold text-gray-800">3</p>
          </div>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search coach..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {successMessage && (
          <div className="w-full md:w-auto mt-2 md:mt-0">
            <div className="rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 px-3 py-2 text-sm font-semibold">
              {successMessage}
            </div>
          </div>
        )}
      </div>

      {/* Coach Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coaches.map((coach) => (
          <div key={coach.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden relative group">
            <div className={`h-1 w-full ${coach.status === 'Present' ? 'bg-green-500' : 'bg-red-400'}`}></div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold overflow-hidden">
                  <img src={`https://ui-avatars.com/api/?name=${coach.name}&background=6366f1&color=fff`} alt={coach.name} />
                </div>
                <div className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider ${getStatusBadge(coach.status)}`}>
                  {coach.status}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-bold text-gray-800 leading-tight">{coach.name}</h3>
                <p className="text-xs text-gray-500 font-medium">{coach.role}</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <div className="p-1.5 bg-gray-50 rounded-md"><Clock size={14} className="text-gray-400" /></div>
                  <div>
                    <span className="text-gray-400 mr-1">Time:</span>
                    <span className="font-medium text-gray-700">{coach.inTime} - {coach.outTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <div className="p-1.5 bg-gray-50 rounded-md"><Calendar size={14} className="text-gray-400" /></div>
                  <div>
                    <span className="text-gray-400 mr-1">Batch:</span>
                    <span className="font-medium text-gray-700">{coach.batch}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <div className="p-1.5 bg-gray-50 rounded-md"><MapPin size={14} className="text-gray-400" /></div>
                  <div>
                    <span className="text-gray-400 mr-1">Loc:</span>
                    <span className="font-medium text-gray-700">{coach.ground}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <button onClick={() => markCoachPresent(coach.id)} className={`flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-bold transition-all ${coach.status === 'Present' ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                  <CheckCircle2 size={14} /> Mark Present
                </button>
                <button onClick={() => markCoachLeave(coach.id)} className="flex items-center justify-center gap-2 py-1.5 bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-500 rounded-lg text-xs font-bold transition-all">
                  <XCircle size={14} /> Mark Leave
                </button>
              </div>
            </div>
            <button className="absolute top-8 right-2 p-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-50 rounded">
              <MoreVertical size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachAttendance;