import React, { useMemo, useState } from 'react';
import {
  Download,
  Filter,
  Plus,
  Search,
  ChevronDown
} from 'lucide-react';

const TrainingSchedule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [trainingDayFilter, setTrainingDayFilter] = useState('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const schedules = [
    {
      id: 'ARS001',
      batch: 'Elite Cricket Morning',
      sport: 'Cricket',
      coach: 'Rajesh Kumar',
      days: 'Mon Wed Fri',
      time: '06:00 - 08:00',
      ground: 'Net 1',
      status: 'Active'
    },
    {
      id: 'ARS002',
      batch: 'Junior Football Eve',
      sport: 'Football',
      coach: 'Amit Singh',
      days: 'Tue Thu Sat',
      time: '04:00 - 06:00',
      ground: 'Field 2',
      status: 'Upcoming'
    },
    {
      id: 'ARS003',
      batch: 'Fitness Evening Batch',
      sport: 'Fitness',
      coach: 'Priya Singh',
      days: 'Mon Tue Thu',
      time: '05:00 - 06:30',
      ground: 'Fitness Zone',
      status: 'Active'
    },
    {
      id: 'ARS004',
      batch: 'Badminton Weekend',
      sport: 'Badminton',
      coach: 'Rahul Verma',
      days: 'Sat Sun',
      time: '07:00 - 09:00',
      ground: 'Court 1',
      status: 'Upcoming'
    }
  ];

  const filteredSchedules = useMemo(() => {
    return schedules.filter((item) => {
      const matchesSearch = [item.id, item.batch, item.coach, item.sport]
        .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSport = sportFilter === 'All' || item.sport === sportFilter;
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesDay = trainingDayFilter === 'All' || item.days.includes(trainingDayFilter);
      return matchesSearch && matchesSport && matchesStatus && matchesDay;
    });
  }, [searchTerm, sportFilter, statusFilter, trainingDayFilter, schedules]);

  const statusClass = (status) => {
    if (status === 'Active') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    if (status === 'Upcoming') return 'bg-blue-50 text-blue-600 border-blue-100';
    if (status === 'Completed') return 'bg-gray-100 text-gray-600 border-gray-200';
    if (status === 'Cancelled') return 'bg-rose-50 text-rose-600 border-rose-100';
    return 'bg-orange-50 text-orange-600 border-orange-100';
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Training Schedule List</h2>
          <p className="text-gray-500 text-sm mt-1">Manage schedules across all training batches and facilities.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-200"
          >
            <Plus size={16} />
            <span>Create Schedule</span>
          </button>
          <button
            type="button"
            onClick={() => alert('Exporting schedule list as CSV...')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-gray-600 hover:bg-gray-50 transition-all text-xs font-bold uppercase tracking-widest"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by Schedule ID, Batch, Coach, or Sport"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/10 text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-100 rounded-2xl text-gray-600 hover:bg-gray-50 transition-colors text-xs font-bold uppercase tracking-widest">
            <Filter size={16} />
            <span>Advanced Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Filter by Sport</label>
            <select
              className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium"
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
            >
              <option>All</option>
              <option>Cricket</option>
              <option>Football</option>
              <option>Fitness</option>
              <option>Badminton</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Filter by Status</label>
            <select
              className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Active</option>
              <option>Upcoming</option>
              <option>Completed</option>
              <option>Cancelled</option>
              <option>Postponed</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Filter by Training Day</label>
            <select
              className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium"
              value={trainingDayFilter}
              onChange={(e) => setTrainingDayFilter(e.target.value)}
            >
              <option>All</option>
              <option>Mon</option>
              <option>Tue</option>
              <option>Wed</option>
              <option>Thu</option>
              <option>Fri</option>
              <option>Sat</option>
              <option>Sun</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              className="w-full px-4 py-2.5 bg-blue-50 text-blue-600 rounded-xl text-xs font-black uppercase tracking-widest"
              onClick={() => {
                setSearchTerm('');
                setSportFilter('All');
                setStatusFilter('All');
                setTrainingDayFilter('All');
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Schedule ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Batch Name</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Sport</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Coach</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Training Days</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Time</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Ground</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSchedules.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 text-sm font-semibold text-gray-900">{item.id}</td>
                  <td className="px-6 py-5 text-sm font-semibold text-gray-900">{item.batch}</td>
                  <td className="px-6 py-5 text-sm text-gray-600 font-semibold">{item.sport}</td>
                  <td className="px-6 py-5 text-sm text-gray-600 font-semibold">{item.coach}</td>
                  <td className="px-6 py-5 text-sm text-gray-600 font-semibold">{item.days}</td>
                  <td className="px-6 py-5 text-sm text-gray-600 font-semibold">{item.time}</td>
                  <td className="px-6 py-5 text-sm text-gray-600 font-semibold">{item.ground}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <details className="relative inline-block">
                      <summary className="list-none inline-flex items-center gap-2 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] bg-gray-50 hover:bg-blue-600 hover:text-white rounded-xl transition-all cursor-pointer">
                        Manage
                        <ChevronDown size={14} />
                      </summary>
                      <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-100 bg-white shadow-xl z-10">
                        {['View Details', 'Edit Schedule', 'Mark Attendance', 'Reschedule', 'Cancel Schedule'].map((action) => (
                          <button
                            key={action}
                            type="button"
                            className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    </details>
                  </td>
                </tr>
              ))}
              {filteredSchedules.length === 0 && (
                <tr>
                  <td colSpan="9" className="px-6 py-10 text-center text-gray-500 font-medium">
                    No schedules match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-[2rem] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Create Training Schedule</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Schedule setup</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
            <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Schedule ID</label>
                <input
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium"
                  placeholder="ARS001"
                />
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Use ARS prefix (e.g. ARS001)</p>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Batch Name</label>
                <input className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium" placeholder="Batch Name" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sport</label>
                <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium">
                  <option>Select Sport</option>
                  <option>Cricket</option>
                  <option>Football</option>
                  <option>Fitness</option>
                  <option>Badminton</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Coach</label>
                <input className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium" placeholder="Coach Name" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Training Days</label>
                <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium">
                  <option>Select Days</option>
                  <option>Mon Wed Fri</option>
                  <option>Tue Thu Sat</option>
                  <option>Mon Tue Thu</option>
                  <option>Sat Sun</option>
                  <option>Daily</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Start Time</label>
                <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium">
                  <option>Select Start</option>
                  <option>05:00</option>
                  <option>06:00</option>
                  <option>07:00</option>
                  <option>08:00</option>
                  <option>16:00</option>
                  <option>17:00</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">End Time</label>
                <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium">
                  <option>Select End</option>
                  <option>06:30</option>
                  <option>07:30</option>
                  <option>08:00</option>
                  <option>09:00</option>
                  <option>18:00</option>
                  <option>19:00</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ground</label>
                <input className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium" placeholder="Ground / Court" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</label>
                <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium">
                  <option>Active</option>
                  <option>Upcoming</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                  <option>Postponed</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-6 py-3 rounded-xl border border-gray-100 text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-200"
              >
                Create Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingSchedule;