import React, { useState } from 'react';
import { 
  Users, 
  LayoutGrid, 
  Search, 
  Filter, 
  ArrowUpRight, 
  MoreVertical,
  Eye,
  Download,
  ShieldCheck,
  MapPin,
  Trophy as TrophyIcon
} from 'lucide-react';

export default function TotalCoach() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSport, setFilterSport] = useState('All');

  const stats = [
    { label: 'Total Coaches', value: '24', icon: Users, color: 'text-[#8B8B00]', bg: 'bg-[#8B8B00]/10' },
    { label: 'Active Sessions', value: '18', icon: TrophyIcon, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Assigned Batches', value: '42', icon: LayoutGrid, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Performance Rate', value: '94%', icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const coaches = [
    { id: 'CH-101', name: 'Vikram Batra', sport: 'Cricket', batch: 'Morning Elite', branch: 'Daladali', sessions: 12, status: 'Active' },
    { id: 'CH-102', name: 'Anjali Menon', sport: 'Football', batch: 'Evening Juniors', branch: 'Main Branch', sessions: 8, status: 'Active' },
    { id: 'CH-103', name: 'Sandeep Singh', sport: 'Fitness', batch: 'Morning All', branch: 'Daladali', sessions: 15, status: 'On Leave' },
    { id: 'CH-104', name: 'Rajesh Khanna', sport: 'Cricket', batch: 'Weekend Pro', branch: 'Main Branch', sessions: 6, status: 'Active' },
    { id: 'CH-105', name: 'Zoya Khan', sport: 'Football', batch: 'Evening Girls', branch: 'Daladali', sessions: 10, status: 'Active' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-3">
            <ShieldCheck className="text-[#8B8B00]" size={32} />
            Total <span className="text-[#8B8B00]">Coaches</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">Professional Coaching Staff & Batch Distribution</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-gray-800 transition-all shadow-lg active:scale-95">
                <Download size={14} /> Export Roster
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
                <ArrowUpRight size={12} /> {i % 2 === 0 ? '+2' : '+5%'}
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
              placeholder="SEARCH COACH NAME OR ID..." 
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
                value={filterSport}
                onChange={(e) => setFilterSport(e.target.value)}
              >
                <option>All Sports</option>
                <option>Cricket</option>
                <option>Football</option>
                <option>Fitness</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Coach ID</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Staff Details</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Primary Sport</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Active Batch</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Action</th>
              </tr>
            </thead>
            <tbody>
              {coaches.map((coach, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-5 border-b border-gray-50">
                    <span className="text-[10px] font-black text-gray-400 tracking-wider">#{coach.id}</span>
                  </td>
                  <td className="px-6 py-5 border-b border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#8B8B00]/10 flex items-center justify-center text-[#8B8B00] font-black text-[10px]">
                        {coach.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-900 uppercase">{coach.name}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter flex items-center gap-1">
                          <MapPin size={8} /> {coach.branch}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 border-b border-gray-50">
                    <span className="px-3 py-1 bg-gray-100 text-[9px] font-black uppercase tracking-wider rounded-lg text-gray-600">
                        {coach.sport}
                    </span>
                  </td>
                  <td className="px-6 py-5 border-b border-gray-50">
                    <div>
                        <p className="text-[10px] font-black text-gray-900 uppercase tracking-tight">{coach.batch}</p>
                        <p className="text-[9px] font-bold text-[#8B8B00] uppercase">{coach.sessions} SESSIONS / MONTH</p>
                    </div>
                  </td>
                  <td className="px-6 py-5 border-b border-gray-50">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      coach.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        coach.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`} />
                      {coach.status}
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

        {/* Footer info */}
        <div className="p-6 bg-gray-50/30">
            <p className="text-[10px] font-black text-gray-400 uppercase">Managing 24 Active Coaching Personnel</p>
        </div>
      </div>
    </div>
  );
}
