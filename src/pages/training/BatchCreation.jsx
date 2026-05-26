import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Users, 
  Clock, 
  Calendar,
  LayoutGrid,
  ChevronRight,
  User,
  Activity,
  Trophy,
  X
} from 'lucide-react';

const BatchCreation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const stats = [
    { title: 'Active Batches', value: '24', icon: <LayoutGrid className="text-blue-600" />, trend: '+3 this month' },
    { title: 'Total Students', value: '456', icon: <Users className="text-emerald-600" />, trend: 'Avg 19/batch' },
    { title: 'Capacity Load', value: '82%', icon: <Activity className="text-orange-600" />, trend: 'High demand' },
    { title: 'Top Sport', value: 'Cricket', icon: <Trophy className="text-purple-600" />, trend: '12 active units' },
  ];

  const batches = [
    { id: 'B-001', name: 'Elite Cricket Morning', sport: 'Cricket', ageGroup: 'U-16', capacity: '20', students: '18', timing: '06:00 AM - 08:00 AM', coach: 'Rajesh Kumar', startDate: '2026-01-15', status: 'Active' },
    { id: 'B-002', name: 'Junior Football Eve', sport: 'Football', ageGroup: 'U-12', capacity: '25', students: '22', timing: '04:00 PM - 06:00 PM', coach: 'Amit Singh', startDate: '2026-02-01', status: 'Active' },
    { id: 'B-003', name: 'Advanced Tennis Uni', sport: 'Tennis', ageGroup: 'U-19', capacity: '10', students: '10', timing: '07:00 AM - 09:00 AM', coach: 'Sania Mirza', startDate: '2026-01-10', status: 'Full' },
    { id: 'B-004', name: 'B-Badminton Weekend', sport: 'Badminton', ageGroup: 'U-14', capacity: '15', students: '8', timing: '09:00 AM - 11:00 AM', coach: 'Pullela Gopichand', startDate: '2026-03-01', status: 'Upcoming' },
  ];

  const BatchForm = ({ onClear, onSubmit }) => (
    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Batch Name</label>
        <input type="text" placeholder="Elite Cricket Morning" className="w-full px-4 py-3 bg-[#f7f6f0] border border-[#e7e2cf] rounded-2xl focus:ring-2 focus:ring-[#8b8b00]/15 focus:border-[#8b8b00] transition-all font-medium text-sm" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Batch Code</label>
        <input type="text" placeholder="B-005" className="w-full px-4 py-3 bg-[#f7f6f0] border border-[#e7e2cf] rounded-2xl focus:ring-2 focus:ring-[#8b8b00]/15 focus:border-[#8b8b00] transition-all font-medium text-sm" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Sport</label>
        <select className="w-full px-4 py-3 bg-[#f7f6f0] border border-[#e7e2cf] rounded-2xl focus:ring-2 focus:ring-[#8b8b00]/15 focus:border-[#8b8b00] transition-all font-medium text-sm">
          <option>Select Sport</option>
          <option>Cricket</option>
          <option>Football</option>
          <option>Tennis</option>
          <option>Badminton</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Age Group</label>
        <select className="w-full px-4 py-3 bg-[#f7f6f0] border border-[#e7e2cf] rounded-2xl focus:ring-2 focus:ring-[#8b8b00]/15 focus:border-[#8b8b00] transition-all font-medium text-sm">
          <option>Under 12</option>
          <option>Under 15</option>
          <option>Under 18</option>
          <option>Elite/Open</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Start Date</label>
        <input type="date" className="w-full px-4 py-3 bg-[#f7f6f0] border border-[#e7e2cf] rounded-2xl focus:ring-2 focus:ring-[#8b8b00]/15 focus:border-[#8b8b00] transition-all font-medium text-sm" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Training Days</label>
        <input type="text" placeholder="Mon, Wed, Fri" className="w-full px-4 py-3 bg-[#f7f6f0] border border-[#e7e2cf] rounded-2xl focus:ring-2 focus:ring-[#8b8b00]/15 focus:border-[#8b8b00] transition-all font-medium text-sm" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Start Time</label>
        <input type="time" className="w-full px-4 py-3 bg-[#f7f6f0] border border-[#e7e2cf] rounded-2xl focus:ring-2 focus:ring-[#8b8b00]/15 focus:border-[#8b8b00] transition-all font-medium text-sm" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">End Time</label>
        <input type="time" className="w-full px-4 py-3 bg-[#f7f6f0] border border-[#e7e2cf] rounded-2xl focus:ring-2 focus:ring-[#8b8b00]/15 focus:border-[#8b8b00] transition-all font-medium text-sm" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Head Coach</label>
        <input type="text" placeholder="Coach Name" className="w-full px-4 py-3 bg-[#f7f6f0] border border-[#e7e2cf] rounded-2xl focus:ring-2 focus:ring-[#8b8b00]/15 focus:border-[#8b8b00] transition-all font-medium text-sm" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Ground / Court</label>
        <input type="text" placeholder="Ground A" className="w-full px-4 py-3 bg-[#f7f6f0] border border-[#e7e2cf] rounded-2xl focus:ring-2 focus:ring-[#8b8b00]/15 focus:border-[#8b8b00] transition-all font-medium text-sm" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Maximum Students</label>
        <input type="number" placeholder="20" className="w-full px-4 py-3 bg-[#f7f6f0] border border-[#e7e2cf] rounded-2xl focus:ring-2 focus:ring-[#8b8b00]/15 focus:border-[#8b8b00] transition-all font-medium text-sm" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Batch Status</label>
        <select className="w-full px-4 py-3 bg-[#f7f6f0] border border-[#e7e2cf] rounded-2xl focus:ring-2 focus:ring-[#8b8b00]/15 focus:border-[#8b8b00] transition-all font-medium text-sm">
          <option>Active</option>
          <option>Upcoming</option>
          <option>Full</option>
          <option>Inactive</option>
        </select>
      </div>
      <div className="lg:col-span-3 flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button type="button" onClick={onClear} className="px-6 py-3 rounded-2xl border border-[#e7e2cf] font-bold text-gray-500 uppercase tracking-widest text-[11px] hover:bg-[#f7f6f0] transition-all">
          Clear Form
        </button>
        <button type="button" onClick={onSubmit} className="px-6 py-3 rounded-2xl bg-[#8b8b00] text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-[#7a7a00] shadow-xl shadow-[#8b8b00]/20 transition-all">
          Create Batch
        </button>
      </div>
    </form>
  );

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Batch Deployment & Management</h2>
          <p className="text-gray-500 text-sm mt-1">Organize and monitor training units across the academy.</p>
        </div>
        <button 
          type="button"
          onClick={() => setIsFormOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200"
        >
          <Plus size={20} />
          <span>Deploy New Batch</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover-card">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gray-50 rounded-2xl">{stat.icon}</div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.trend}</span>
            </div>
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">{stat.title}</h3>
            <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by ID, batch name or coach..." 
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500/10 text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-100 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-sm font-semibold">
            <Filter size={18} />
            <span>Advanced Filters</span>
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
          <span>Showing 24 Active Units</span>
        </div>
      </div>

      {/* Batch Table/List */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Batch Identity</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Deployment Details</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Commanding Officer</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Personnel Load</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Operational Status</th>
                <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {batches.map((batch) => (
                <tr key={batch.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-xs ring-4 ring-blue-50/50 group-hover:scale-110 transition-transform">
                        {batch.sport.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 leading-none">{batch.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">{batch.id} • {batch.ageGroup}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                        <Clock size={14} className="text-gray-400" />
                        <span>{batch.timing}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                        <Calendar size={12} />
                        <span>Starts: {batch.startDate}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                            <User size={12} className="text-gray-400" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{batch.coach}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5 w-32">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                            <span className="text-gray-400">Load</span>
                            <span className="text-gray-900">{batch.students}/{batch.capacity}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full transition-all duration-1000 ${parseInt(batch.students) >= parseInt(batch.capacity) ? 'bg-orange-500' : 'bg-blue-600'}`} 
                                style={{ width: `${(parseInt(batch.students) / parseInt(batch.capacity)) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      batch.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      batch.status === 'Full' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                      'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        batch.status === 'Active' ? 'bg-emerald-500 animate-pulse' :
                        batch.status === 'Full' ? 'bg-orange-500' :
                        'bg-blue-500'
                      }`}></span>
                      {batch.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => alert(`Configuring modifications for batch: ${batch.id}`)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => {
                          if(confirm(`Security Alert: Are you sure you want to decommission batch ${batch.id}?`)) {
                            alert(`Batch ${batch.id} has been decommissioned.`);
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" 
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Optional Form Modal (Mock) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 bg-gray-900/40 backdrop-blur-md overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-fadeIn my-6">
            <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Deploy New Batch</h3>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Batch creation & deployment</p>
              </div>
              <button 
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-xl text-gray-400"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <BatchForm
                onClear={() => alert('Form cleared.')}
                onSubmit={() => {
                  alert('New batch deployed successfully.');
                  setIsFormOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchCreation;