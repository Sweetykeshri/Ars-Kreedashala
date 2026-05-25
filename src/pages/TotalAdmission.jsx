import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter, 
  ArrowUpRight, 
  MoreVertical,
  Eye,
  Download,
  Trophy
} from 'lucide-react';

const TotalAdmission = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const stats = [
    { label: 'Total Admissions', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Students', value: '856', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Admissions', value: '42', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Approved Today', value: '12', icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const students = [
    { id: 'ARS-2024-001', name: 'Rahul Sharma', sport: 'Cricket', branch: 'Daladali', date: '24 May 2024', status: 'Active' },
    { id: 'ARS-2024-002', name: 'Priya Verma', sport: 'Football', branch: 'Main Branch', date: '23 May 2024', status: 'Pending' },
    { id: 'ARS-2024-003', name: 'Amit Kumar', sport: 'Fitness', branch: 'Daladali', date: '22 May 2024', status: 'Active' },
    { id: 'ARS-2024-004', name: 'Sneha Kapur', sport: 'Cricket', branch: 'Main Branch', date: '21 May 2024', status: 'Approved' },
    { id: 'ARS-2024-005', name: 'Vikram Singh', sport: 'Football', branch: 'Daladali', date: '20 May 2024', status: 'Pending' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-3">
            <Trophy className="text-[#8B8B00]" size={32} />
            Total <span className="text-[#8B8B00]">Admissions</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">Academy Enrollment Registry & Oversight</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-gray-800 transition-all shadow-lg active:scale-95">
                <Download size={14} /> Export Registry
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={22} />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 font-bold text-[10px]">
                <ArrowUpRight size={12} /> +12%
              </div>
            </div>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1 italic leading-none">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH PLAYER NAME OR ID..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-[#8B8B00] outline-none rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border-2 border-transparent">
              <Filter size={14} className="text-gray-400" />
              <select 
                className="bg-transparent text-[10px] font-black uppercase outline-none cursor-pointer"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Approved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Registration ID</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Player Details</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Sport / Program</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Branch</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5 border-b border-gray-50">
                    <span className="text-[10px] font-black text-gray-400 tracking-wider">#{student.id}</span>
                  </td>
                  <td className="px-6 py-5 border-b border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#8B8B00]/10 flex items-center justify-center text-[#8B8B00] font-black text-[10px]">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-900 uppercase">{student.name}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Joined {student.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 border-b border-gray-50">
                    <span className="px-3 py-1 bg-gray-100 text-[9px] font-black uppercase tracking-wider rounded-lg text-gray-600">
                        {student.sport}
                    </span>
                  </td>
                  <td className="px-6 py-5 border-b border-gray-50">
                    <p className="text-[10px] font-black text-gray-600 uppercase italic underline decoration-[#8B8B00]/30 underline-offset-4">{student.branch}</p>
                  </td>
                  <td className="px-6 py-5 border-b border-gray-50">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      student.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                      student.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        student.status === 'Active' ? 'bg-emerald-500' : 
                        student.status === 'Pending' ? 'bg-amber-500' : 'bg-blue-500'
                      }`} />
                      {student.status}
                    </div>
                  </td>
                  <td className="px-6 py-5 border-b border-gray-50">
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-[#8B8B00] hover:bg-[#8B8B00]/5 transition-all">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 transition-all">
                        <MoreVertical size={16} className="text-gray-300" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="p-6 bg-gray-50/30 flex items-center justify-between">
            <p className="text-[10px] font-black text-gray-400 uppercase">Showing 5 of 1,284 Registrations</p>
            <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[10px] font-black text-gray-400 hover:text-gray-900 transition-all">Prev</button>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[10px] font-black text-[#8B8B00] shadow-sm">1</button>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[10px] font-black text-gray-400 hover:text-gray-900 transition-all">2</button>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[10px] font-black text-gray-400 hover:text-gray-900 transition-all">Next</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TotalAdmission;
