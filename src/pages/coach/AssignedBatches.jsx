import React, { useState } from 'react';
import { 
  Users, 
  Layers, 
  Calendar, 
  Clock, 
  ChevronRight, 
  TrendingUp, 
  ShieldCheck,
  Target,
  ArrowUpRight,
  MoreVertical,
  MapPin,
  Trophy
} from 'lucide-react';

const AssignedBatches = () => {
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const assignments = [
    {
      coachId: "C-001",
      coachName: "RABINDRANATH SARKAR",
      batches: [
        { id: "B-ELITE-01", name: "ELITE MORNING CRICKET", strength: 22, time: "06:00 - 08:30", sector: "GROUND A", capacity: "92%" },
        { id: "B-PRO-04", name: "PRO EVENING SESSION", strength: 18, time: "16:00 - 18:30", sector: "NETS 1-4", capacity: "75%" }
      ]
    },
    {
      coachId: "C-003",
      coachName: "SUSHANT SINGH",
      batches: [
        { id: "B-JR-09", name: "JUNIOR FOOTBALL OPS", strength: 25, time: "07:00 - 09:00", sector: "FIELD C", capacity: "83%" },
        { id: "B-DEV-12", name: "DEVELOPMENT UNIT", strength: 15, time: "17:00 - 19:00", sector: "FIELD B", capacity: "60%" }
      ]
    }
  ];

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <Layers className="text-blue-600" size={32} />
            Command: <span className="text-blue-600">Unit Assignments</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-1">Operational workload and batch distribution control</p>
        </div>
        <button
          type="button"
          onClick={() => setIsDeployModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all"
        >
          <Target size={18} /> New Deployment
        </button>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-[32px] text-white shadow-xl shadow-blue-200">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
              <Trophy size={24} />
            </div>
            <ArrowUpRight size={24} className="opacity-50" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-1">Total Active Units</p>
          <p className="text-4xl font-black">24</p>
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
            <span className="text-xs font-black bg-blue-500/50 px-2 py-0.5 rounded-lg text-white">UP 12%</span>
            <span className="text-[10px] uppercase font-bold text-blue-100 tracking-wider italic">vs previous month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-50 rounded-xl">
              <ShieldCheck className="text-emerald-600" size={24} />
            </div>
            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Optimal</span>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Avg Force Capacity</p>
          <p className="text-4xl font-black text-gray-900">82%</p>
          <div className="mt-4 w-full h-2 bg-gray-50 rounded-full overflow-hidden">
            <div className="h-full w-[82%] bg-emerald-500 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-50 rounded-xl">
              <TrendingUp className="text-amber-600" size={24} />
            </div>
            <span className="text-xs font-black text-amber-600 uppercase tracking-widest">Alert</span>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Critical Workload</p>
          <p className="text-4xl font-black text-gray-900">03 <span className="text-lg text-gray-300">Staff</span></p>
          <p className="mt-4 text-[10px] font-bold text-amber-600 uppercase italic tracking-widest">Manual redistribution required</p>
        </div>
      </div>

      {/* Assignment List */}
      <div className="space-y-6">
        {assignments.map((coach) => (
          <div key={coach.coachId} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden group">
            <div className="px-8 py-5 bg-gray-50/50 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-gray-100 flex items-center justify-center text-blue-600 font-black shadow-sm">
                  {coach.coachName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">{coach.coachName}</h3>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{coach.coachId} • COMMANDING OFFICER</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5 text-right font-black">Active Units</p>
                  <p className="text-sm font-black text-blue-600">{coach.batches.length}</p>
                </div>
                <button className="p-2 hover:bg-white rounded-xl transition-all border border-transparent hover:border-gray-100">
                  <MoreVertical size={18} className="text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {coach.batches.map((batch) => (
                <div key={batch.id} className="relative p-6 rounded-2xl border-2 border-gray-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300 group/batch">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-[9px] font-black rounded-lg uppercase tracking-widest mb-2 inline-block shadow-lg shadow-blue-100">
                        {batch.id}
                      </span>
                      <h4 className="text-base font-black text-gray-900 uppercase tracking-tight">{batch.name}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sector Integrity</p>
                      <p className="text-sm font-black text-emerald-600">{batch.capacity}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                        <Users size={16} className="text-blue-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Strength</span>
                        <span className="text-xs font-black text-gray-700">{batch.strength} Cadets</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                        <Clock size={16} className="text-blue-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Window</span>
                        <span className="text-xs font-black text-gray-700">{batch.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <MapPin size={14} />
                      {batch.sector}
                    </div>
                    <button className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 uppercase tracking-widest group-hover/batch:gap-2.5 transition-all">
                      Strategic View <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isDeployModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[2rem] bg-white shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">New Deployment</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Assign coach to batches</p>
              </div>
              <button
                type="button"
                onClick={() => setIsDeployModalOpen(false)}
                className="px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
            <div className="px-8 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Coach</label>
                <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium">
                  <option>Select Coach</option>
                  <option>Rabindranath Sarkar</option>
                  <option>Sushant Singh</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Batch</label>
                <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium">
                  <option>Select Batch</option>
                  <option>Elite Morning Cricket</option>
                  <option>Junior Football Ops</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Deployment Window</label>
                <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium">
                  <option>Select Window</option>
                  <option>06:00 - 08:30</option>
                  <option>07:00 - 09:00</option>
                  <option>16:00 - 18:30</option>
                  <option>17:00 - 19:00</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sector</label>
                <input className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium" placeholder="Ground A" />
              </div>
            </div>
            <div className="px-8 py-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => setIsDeployModalOpen(false)}
                className="px-6 py-3 rounded-2xl border border-gray-100 font-bold text-gray-400 uppercase tracking-widest text-[11px] hover:bg-white transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsDeployModalOpen(false)}
                className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all"
              >
                Deploy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedBatches;