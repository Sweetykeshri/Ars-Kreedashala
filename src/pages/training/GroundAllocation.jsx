import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  AlertTriangle, 
  Zap, 
  ShieldCheck,
  Calendar,
  Grid,
  Activity,
  ChevronDown
} from 'lucide-react';

const GroundAllocation = () => {
  const sectors = [
    { id: 'SEC-A', name: 'Main Cricket Pitch', sport: 'Cricket', status: 'Occupied', load: '100%', condition: 'Near Optimal' },
    { id: 'SEC-B', name: 'South Football Field', sport: 'Football', status: 'Available', load: '0%', condition: 'Maintenance Required' },
    { id: 'SEC-C', name: 'Elite Tennis Court 1', sport: 'Tennis', status: 'Occupied', load: '60%', condition: 'Optimal' },
    { id: 'SEC-D', name: 'Indoor Badminton Box', sport: 'Badminton', status: 'Under Maint.', load: 'N/A', condition: 'Protocol Check' },
  ];

  const allocations = [
    { time: '06:00 AM - 08:00 AM', sector: 'Main Cricket Pitch', batch: 'Elite Cricket Morning', status: 'Active' },
    { time: '04:00 PM - 06:00 PM', sector: 'South Football Field', batch: 'Junior Football Eve', status: 'Scheduled' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Infrastructure & Sector Allocation</h2>
          <p className="text-gray-500 text-sm mt-1">Monitor facility integrity and manage operational sectors.</p>
        </div>
        <button className="flex w-full sm:w-auto items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-200">
          <Zap size={20} />
          <span>New Sector Booking</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sectors.map((sector, i) => (
          <div key={sector.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm animate-fadeIn" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-2xl ${
                sector.status === 'Available' ? 'bg-emerald-50 text-emerald-600' : 
                sector.status === 'Occupied' ? 'bg-blue-50 text-blue-600' : 
                'bg-orange-50 text-orange-600'
              }`}>
                <MapPin size={24} />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                sector.status === 'Available' ? 'bg-emerald-50 text-emerald-600' : 
                sector.status === 'Occupied' ? 'bg-blue-50 text-blue-600' : 
                'bg-orange-50 text-orange-600'
              }`}>
                {sector.status}
              </span>
            </div>
            
            <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight leading-tight mb-1">{sector.name}</h3>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">{sector.id}</p>

            <div className="space-y-4">
               <div>
                  <div className="flex justify-between items-center mb-1.5 text-[9px] font-black uppercase tracking-widest">
                    <span className="text-gray-400">Sector Load</span>
                    <span className="text-gray-900">{sector.load}</span>
                  </div>
                  <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${sector.status === 'Occupied' ? 'bg-blue-600' : 'bg-transparent'}`}
                      style={{ width: sector.load === 'N/A' ? '0%' : sector.load }}
                    ></div>
                  </div>
               </div>
               
               <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
                  <Activity size={12} className={sector.condition.includes('Optimal') ? 'text-emerald-500' : 'text-orange-500'} />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest italic">{sector.condition}</span>
               </div>
            </div>
          </div>
        ))}
      </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         {/* Allocation Timeline */}
         <div className="md:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 sm:p-8 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                   <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Operational Protocol Ledger</h3>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight mt-1 items-center flex gap-2">
                       <ShieldCheck size={12} className="text-emerald-500" />
                       Real-time conflict detection active
                   </p>
                </div>
            <div className="flex items-center justify-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer hover:bg-gray-100 transition-all w-full sm:w-auto">
                    <span>Export Ledger</span>
                    <ChevronDown size={14} />
                </div>
            </div>
          <div className="hidden md:block overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50">
                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Time Window</th>
                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Sector</th>
                        <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Assigned Unit</th>
                        <th className="px-8 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Integrity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {allocations.map((item, i) => (
                        <tr key={i} className="hover:bg-gray-50/20 transition-all group cursor-pointer">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-3">
                                    <Clock size={16} className="text-blue-500 opacity-50" />
                                    <span className="text-sm font-bold text-gray-900">{item.time}</span>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">{item.sector}</span>
                            </td>
                            <td className="px-8 py-6">
                                <span className="text-xs font-black text-blue-600 uppercase tracking-tight">{item.batch}</span>
                            </td>
                            <td className="px-8 py-6 text-right">
                                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                    item.status === 'Active' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-100 text-gray-400'
                                }`}>
                                    <span className={`w-1 h-1 rounded-full ${item.status === 'Active' ? 'bg-white animate-pulse' : 'bg-gray-400'}`}></span>
                                    {item.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                  </tbody>
               </table>
            </div>

            <div className="md:hidden p-4 space-y-4">
              {allocations.map((item, i) => (
                <article key={i} className="rounded-3xl border border-gray-100 bg-gray-50/60 p-4 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Time Window</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Clock size={14} className="text-blue-500 opacity-50" />
                        <p className="text-sm font-bold text-gray-900">{item.time}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      item.status === 'Active' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${item.status === 'Active' ? 'bg-white animate-pulse' : 'bg-gray-400'}`} />
                      {item.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Target Sector</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900 whitespace-normal" style={{ overflowWrap: 'anywhere' }}>{item.sector}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-3">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Assigned Unit</p>
                      <p className="mt-1 text-sm font-semibold text-blue-600 whitespace-normal" style={{ overflowWrap: 'anywhere' }}>{item.batch}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
         </div>

         {/* Right Column: Alerts & Conflict Tracker */}
         <div className="space-y-6">
            <div className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100">
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-rose-600 text-white rounded-2xl shadow-lg shadow-rose-200">
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-rose-900 leading-tight">CONFLICT<br/>WARNING</h3>
                        <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest mt-1 italic">Protocol Violation Detected</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="bg-white/60 p-4 rounded-2xl border border-rose-200">
                        <p className="text-xs font-bold text-rose-900 uppercase">Sector B - Football Field</p>
                        <p className="text-[10px] text-rose-500 mt-1 font-medium leading-relaxed">
                            Maintenance window overlaps with evening session request. Operational conflict level: HIGH.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                    <Calendar className="text-blue-600" size={20} />
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Utilization Heat</h3>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-2.5">
                    {[...Array(31)].map((_, i) => (
                        <div 
                          key={i} 
                          className={`aspect-square rounded-lg flex items-center justify-center text-[9px] sm:text-[10px] font-black ${
                            i === 11 ? 'bg-blue-600 text-white' : 
                            [5, 12, 19, 26].includes(i) ? 'bg-gray-100 text-gray-400' : 
                            'bg-gray-50 text-gray-400'
                          }`}
                        >
                          {i + 1}
                        </div>
                    ))}
                </div>
                <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-none">Global Occupancy</p>
                        <p className="text-sm font-black text-gray-900 leading-none">74% Target Reached</p>
                    </div>
                    <Grid size={24} className="text-blue-100" />
                </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default GroundAllocation;