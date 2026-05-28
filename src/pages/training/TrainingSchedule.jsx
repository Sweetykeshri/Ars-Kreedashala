import React, { useMemo, useState } from 'react';
import {
  Download,
  Filter,
  Plus,
  Search,
  ChevronDown
} from 'lucide-react';

const initialScheduleForm = {
  id: '',
  batch: '',
  sport: 'Cricket',
  coach: '',
  days: 'Mon Wed Fri',
  startTime: '06:00',
  endTime: '08:00',
  ground: '',
  status: 'Active'
};

const TrainingSchedule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [trainingDayFilter, setTrainingDayFilter] = useState('All');
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState(initialScheduleForm);
  const [scheduleItems, setScheduleItems] = useState([
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
  ]);

  const schedules = scheduleItems;

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

  const updateNewSchedule = (field, value) => {
    setNewSchedule((current) => ({ ...current, [field]: value }));
  };

  const createSchedule = () => {
    if (!newSchedule.id.trim() || !newSchedule.batch.trim() || !newSchedule.coach.trim() || !newSchedule.ground.trim()) {
      alert('Please fill Schedule ID, Batch Name, Coach, and Ground before creating the schedule.');
      return;
    }

    const nextSchedule = {
      id: newSchedule.id.trim(),
      batch: newSchedule.batch.trim(),
      sport: newSchedule.sport,
      coach: newSchedule.coach.trim(),
      days: newSchedule.days,
      time: `${newSchedule.startTime} - ${newSchedule.endTime}`,
      ground: newSchedule.ground.trim(),
      status: newSchedule.status
    };

    setScheduleItems((current) => [nextSchedule, ...current]);
    setNewSchedule(initialScheduleForm);
    setIsCreateFormOpen(false);
    alert(`Created schedule for ${nextSchedule.batch}.`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-8 pb-10">
      {!isCreateFormOpen && (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Training Schedule List</h2>
              <p className="text-gray-500 text-sm mt-1">Manage schedules across all training batches and facilities.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => setIsCreateFormOpen(true)}
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

          <div className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm space-y-6">
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
        </>
      )}

      {isCreateFormOpen && (
        <section className="rounded-4xl border border-gray-100 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 bg-linear-to-r from-blue-50 to-sky-50 px-6 py-5 md:px-7">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Inline Schedule Form</p>
                <h3 className="mt-2 text-2xl font-black text-gray-900">Create Training Schedule</h3>
                <p className="mt-1 text-sm text-gray-500">This form opens inside the page, keeps the shell visible, and uses a landscape layout on large screens.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateFormOpen(false)}
                  className="rounded-2xl border border-gray-100 bg-white px-4 py-2.5 text-xs font-black uppercase tracking-widest text-gray-600 transition-all hover:bg-gray-50"
                >
                  Close Form
                </button>
                <button
                  type="button"
                  onClick={createSchedule}
                  className="rounded-2xl bg-blue-600 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
                >
                  Save Schedule
                </button>
              </div>
            </div>
          </div>

          <div className="p-5 md:p-6 lg:p-7">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-3xl border border-gray-100 bg-gray-50/60 p-4 md:p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Schedule ID</label>
                    <input
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      placeholder="ARS005"
                      value={newSchedule.id}
                      onChange={(e) => updateNewSchedule('id', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 xl:col-span-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Batch Name</label>
                    <input
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      placeholder="Batch Name"
                      value={newSchedule.batch}
                      onChange={(e) => updateNewSchedule('batch', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sport</label>
                    <select
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      value={newSchedule.sport}
                      onChange={(e) => updateNewSchedule('sport', e.target.value)}
                    >
                      <option>Cricket</option>
                      <option>Football</option>
                      <option>Fitness</option>
                      <option>Badminton</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Coach</label>
                    <input
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      placeholder="Coach Name"
                      value={newSchedule.coach}
                      onChange={(e) => updateNewSchedule('coach', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Training Days</label>
                    <select
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      value={newSchedule.days}
                      onChange={(e) => updateNewSchedule('days', e.target.value)}
                    >
                      <option>Mon Wed Fri</option>
                      <option>Tue Thu Sat</option>
                      <option>Mon Tue Thu</option>
                      <option>Sat Sun</option>
                      <option>Daily</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Start Time</label>
                      <select
                        className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        value={newSchedule.startTime}
                        onChange={(e) => updateNewSchedule('startTime', e.target.value)}
                      >
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
                      <select
                        className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        value={newSchedule.endTime}
                        onChange={(e) => updateNewSchedule('endTime', e.target.value)}
                      >
                        <option>06:30</option>
                        <option>07:30</option>
                        <option>08:00</option>
                        <option>09:00</option>
                        <option>18:00</option>
                        <option>19:00</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ground</label>
                    <input
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      placeholder="Ground / Court"
                      value={newSchedule.ground}
                      onChange={(e) => updateNewSchedule('ground', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</label>
                    <select
                      className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      value={newSchedule.status}
                      onChange={(e) => updateNewSchedule('status', e.target.value)}
                    >
                      <option>Active</option>
                      <option>Upcoming</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                      <option>Postponed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-3xl border border-gray-100 bg-white p-4 md:p-5">
                <div className="rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 p-4 text-white shadow-lg shadow-blue-200">
                  <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-100">Live Preview</p>
                  <h4 className="mt-2 text-xl font-black">Landscape layout summary</h4>
                  <p className="mt-2 text-sm text-blue-50">All form fields remain editable and the schedule is created in-page without opening a popup.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">ID</p>
                    <p className="mt-1 text-lg font-black text-gray-900">{newSchedule.id || 'ARS---'}</p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sport</p>
                    <p className="mt-1 text-lg font-black text-gray-900">{newSchedule.sport}</p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-4 col-span-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Batch</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900 wrap-break-word">{newSchedule.batch || 'Batch Name'}</p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Coach</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900 wrap-break-word">{newSchedule.coach || 'Coach Name'}</p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Days</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">{newSchedule.days}</p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-4 col-span-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Time</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">{newSchedule.startTime} - {newSchedule.endTime}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 p-4 text-sm text-gray-500">
                  Use Save Schedule to add this entry to the live schedule list below.
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {!isCreateFormOpen && (
        <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
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

        <div className="md:hidden p-4 space-y-4">
          {filteredSchedules.map((item) => (
            <article key={item.id} className="rounded-3xl border border-gray-100 bg-gray-50/60 p-4 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{item.id}</p>
                  <h3 className="mt-1 text-base font-bold text-gray-900 leading-tight whitespace-normal" style={{ overflowWrap: 'anywhere' }}>{item.batch}</h3>
                  <p className="mt-1 text-xs font-semibold text-gray-600">{item.sport} • {item.coach}</p>
                </div>
                <span className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusClass(item.status)}`}>
                  {item.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Training Days</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">{item.days}</p>
                </div>
                <div className="rounded-2xl bg-white p-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Time</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">{item.time}</p>
                </div>
                <div className="rounded-2xl bg-white p-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ground</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">{item.ground}</p>
                </div>
                <div className="rounded-2xl bg-white p-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Coach</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900 whitespace-normal" style={{ overflowWrap: 'anywhere' }}>{item.coach}</p>
                </div>
              </div>

              <details className="relative">
                <summary className="list-none inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 shadow-sm cursor-pointer">
                  Manage
                  <ChevronDown size={14} />
                </summary>
                <div className="mt-3 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                  {['View Details', 'Edit Schedule', 'Mark Attendance', 'Reschedule', 'Cancel Schedule'].map((action) => (
                    <button
                      key={action}
                      type="button"
                      className="w-full px-4 py-3 text-left text-xs font-semibold text-gray-600 hover:bg-gray-50"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </details>
            </article>
          ))}

          {filteredSchedules.length === 0 && (
            <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm font-medium text-gray-500">
              No schedules match the current filters.
            </div>
          )}
        </div>
        </div>
      )}

    </div>
  );
};

export default TrainingSchedule;