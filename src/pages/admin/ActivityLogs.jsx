import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Calendar, 
  Download, 
  Filter, 
  Clock, 
  ShieldAlert, 
  Database,
  ArrowRight,
  Terminal,
  Activity
} from 'lucide-react';
import { AdminHeader, AdminStatCard } from '../../components/admin/AdminShared';

const ActivityLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const logs = [
    {
      id: "LOG-9821",
      user: "Vikram Singh",
      action: "System Override",
      module: "Security Matrix",
      timestamp: "Today, 10:45 AM",
      ip: "192.168.1.45",
      status: "Verified",
      color: "rose"
    },
    {
      id: "LOG-9820",
      user: "Priya Sharma",
      action: "New Admission",
      module: "Training Ops",
      timestamp: "Today, 09:12 AM",
      ip: "192.168.1.12",
      status: "Success",
      color: "emerald"
    },
    {
      id: "LOG-9819",
      user: "Arjun Reddy",
      action: "Fee Reversal",
      module: "Treasury",
      timestamp: "Yesterday, 04:30 PM",
      ip: "192.168.1.28",
      status: "Flagged",
      color: "amber"
    },
    {
      id: "LOG-9818",
      user: "Sneha Gupta",
      action: "Data Export",
      module: "Analytics",
      timestamp: "Yesterday, 02:15 PM",
      ip: "192.168.1.33",
      status: "Success",
      color: "blue"
    }
  ];

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <AdminHeader 
        title="Tactical Nexus" 
        subtitle="Real-time surveillance of system operations and administrative throughput"
        icon={History}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminStatCard 
          label="Total Operations" 
          value="2,482" 
          subvalue="Historical Logs" 
          icon={Database} 
        />
        <AdminStatCard 
          label="Security Events" 
          value="45" 
          subvalue="Requires Attention" 
          icon={ShieldAlert} 
          color="rose"
        />
        <AdminStatCard 
          label="Active Session" 
          value="18" 
          subvalue="Concurrent Users" 
          icon={Activity} 
          color="emerald"
        />
        <AdminStatCard 
          label="Throughput" 
          value="98%" 
          subvalue="Success Rate" 
          icon={History} 
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline View */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-900 rounded-lg text-white">
                  <Terminal size={18} />
                </div>
                <h3 className="text-sm font-black text-gray-900 uppercase">System Stream</h3>
              </div>
              <div className="flex items-center gap-3">
                 <button className="p-3 bg-white border border-gray-100 text-gray-400 rounded-xl hover:text-blue-600 transition-all shadow-sm">
                   <Calendar size={18} />
                 </button>
                 <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 border border-gray-100 rounded-xl font-black uppercase text-[10px] hover:bg-gray-50 transition-all shadow-sm">
                   <Download size={16} /> Export Intel
                 </button>
              </div>
            </div>

            <div className="divide-y divide-gray-50">
               {logs.map((log) => (
                 <div key={log.id} className="p-8 hover:bg-gray-50/50 transition-colors flex items-start gap-6 group">
                   <div className="relative shrink-0 pt-1">
                      <div className={`w-12 h-12 rounded-[1.2rem] bg-${log.color}-50 flex items-center justify-center text-${log.color}-600 border border-${log.color}-100 shadow-sm`}>
                        <Clock size={20} />
                      </div>
                      <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[2px] h-12 bg-gray-50 group-last:hidden"></div>
                   </div>
                   
                   <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight">{log.user}</span>
                           <ArrowRight size={10} className="text-gray-300" />
                           <span className={`text-[10px] font-black text-${log.color}-600 uppercase tracking-widest italic`}>{log.action}</span>
                        </div>
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{log.timestamp}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50 mt-4">
                        <div>
                          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Module</p>
                          <p className="text-[10px] font-bold text-gray-900 uppercase">{log.module}</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">IP ADDR</p>
                          <p className="text-[10px] font-bold text-gray-500">{log.ip}</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">ID TAG</p>
                          <p className="text-[10px] font-bold text-gray-500">{log.id}</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                          <div className={`flex items-center gap-1.5 text-[9px] font-black text-${log.color}-600 uppercase`}>
                             <div className={`w-1 h-1 rounded-full bg-${log.color}-600`}></div> {log.status}
                          </div>
                        </div>
                      </div>
                   </div>
                 </div>
               ))}
            </div>
            <div className="p-6 bg-gray-50/50 text-center border-t border-gray-50">
               <button className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] hover:tracking-[0.3em] transition-all">LOAD PREVIOUS RECORDS</button>
            </div>
          </div>
        </div>

        {/* Filters & Information */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
             <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
               <Filter size={14} className="text-blue-600" /> Filter Parameters
             </h3>
             <div className="space-y-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Filter by Module</label>
                 <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Modules</option>
                    <option>Security Matrix</option>
                    <option>Training Ops</option>
                    <option>Treasury</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Action Type</label>
                 <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Actions</option>
                    <option>Create</option>
                    <option>Edit</option>
                    <option>Delete</option>
                    <option>Override</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date Range</label>
                 <input type="date" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-blue-500" />
               </div>
               <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-black uppercase text-[10px] shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                 Apply Filters
               </button>
             </div>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-[3rem] text-white">
             <div className="flex items-center gap-3 mb-4">
               <div className="p-2 bg-rose-600 rounded-lg shadow-lg shadow-rose-900/40">
                 <ShieldAlert size={20} />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-rose-400 italic">Security Notice</span>
             </div>
             <p className="text-xs font-bold text-gray-400 leading-relaxed uppercase">
               All administrative actions are logged and encrypted. Unauthorized access attempts to this panel will trigger an immediate IP-Lockdown protocol.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
