import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Shield, 
  User, 
  CheckCircle2, 
  Clock, 
  Award,
  MoreVertical,
  Activity,
  ChevronRight,
  Star
} from 'lucide-react';

const CoachAssignment = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const coaches = [
    { id: 'C-101', name: 'Rajesh Kumar', sport: 'Cricket', level: 'Master Tactician', exp: '15 Years', availability: 'Active', assigned: '3 Batches', rating: 4.8 },
    { id: 'C-102', name: 'Sania Mirza', sport: 'Tennis', level: 'Elite Specialist', exp: '12 Years', availability: 'On Duty', assigned: '2 Batches', rating: 4.9 },
    { id: 'C-103', name: 'Amit Singh', sport: 'Football', level: 'Lead Strategist', exp: '8 Years', availability: 'Active', assigned: '4 Batches', rating: 4.5 },
    { id: 'C-104', name: 'Pullela Gopichand', sport: 'Badminton', level: 'Head of Ops', exp: '20 Years', availability: 'Mtg Room', assigned: '1 Batch', rating: 5.0 },
  ];

  const currentAssignments = [
    { batch: 'Elite Cricket Morning', coach: 'Rajesh Kumar', days: 'Mon, Wed, Fri', shift: 'Morning', integrity: 'Stable' },
    { batch: 'Junior Football Eve', coach: 'Amit Singh', days: 'Tue, Thu, Sat', shift: 'Evening', integrity: 'Optimal' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Staff Allocation & Command</h2>
          <p className="text-gray-500 text-sm mt-1">Manage specialist assignments and personnel deployment stats.</p>
        </div>
        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200">
          <Plus size={20} />
          <span>New Officer Deployment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column: Staff Cards */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search specialists..." 
                  className="w-full pl-12 pr-4 py-2 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/10 text-sm font-medium"
                />
             </div>
             <div className="flex items-center gap-2">
                <button className="p-2 bg-white border border-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition-colors">
                    <Filter size={18} />
                </button>
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">
                    Total: 18 Specialists
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coaches.map((coach, i) => (
              <div key={coach.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover-card animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="flex justify-between items-start mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600">
                        <User size={32} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">{coach.id}</span>
                    <div className="flex items-center gap-1 mt-2 text-orange-500">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs font-bold leading-none">{coach.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">{coach.name}</h3>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mt-1 italic">{coach.level}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Discipline</p>
                        <p className="text-xs font-bold text-gray-900">{coach.sport}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Experience</p>
                        <p className="text-xs font-bold text-gray-900">{coach.exp}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield size={14} className="text-blue-500" />
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Units: {coach.assigned}</span>
                    </div>
                    <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-colors">
                        <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Allocation Ledger */}
        <div className="space-y-6">
           <div className="bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                <h3 className="text-xl font-black text-white leading-tight">ACTIVE<br/>ASSIGNMENTS</h3>
                <div className="space-y-4">
                    {currentAssignments.map((assign, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group/item">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-[11px] font-black text-blue-400 uppercase tracking-widest">{assign.batch}</h4>
                                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${assign.integrity === 'Optimal' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                    {assign.integrity}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                                <User size={10} />
                                <span>{assign.coach}</span>
                            </div>
                            <div className="mt-3 flex items-center gap-3">
                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">{assign.days}</span>
                                <div className="h-[1px] flex-1 bg-white/10"></div>
                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">{assign.shift}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all">
                    Generate Allocation PDF
                </button>
              </div>
           </div>

           {/* Stats Summary */}
           <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] flex items-center gap-2">
                  <Activity size={14} className="text-blue-500" />
                  Load Analytics
              </h3>
              <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5 text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-gray-400">Tactician Load</span>
                        <span className="text-gray-900">12/18 Active</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1.5 text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-gray-400">Spec. Availability</span>
                        <span className="text-gray-900">92%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                        <div className="h-full w-[92%] bg-emerald-500 rounded-full"></div>
                    </div>
                  </div>
              </div>
              <div className="pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl">
                      <Award size={20} className="text-blue-600" />
                      <div>
                          <p className="text-[10px] font-black text-blue-900 uppercase tracking-tight">System Notification</p>
                          <p className="text-[9px] font-bold text-blue-400 uppercase mt-0.5">3 specialist reviews pending</p>
                      </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CoachAssignment;