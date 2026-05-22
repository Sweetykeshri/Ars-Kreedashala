import React, { useState } from 'react';
import { 
  Lock, 
  Search, 
  Save, 
  ShieldAlert, 
  Check, 
  X,
  FileSearch,
  Users,
  Trophy,
  CircleDollarSign,
  Clock
} from 'lucide-react';
import { SettingsHeader, Toggle } from '../../components/settings/SettingsShared';

const Permissions = () => {
  const [selectedRole, setSelectedRole] = useState('SUPER-ADMIN');
  
  const modules = [
    { id: 'ADM', title: 'Admissions Panel', icon: Users },
    { id: 'TRA', title: 'Training Ops', icon: Trophy },
    { id: 'FEE', title: 'Treasury & Fees', icon: CircleDollarSign },
    { id: 'ATT', title: 'Presence Tracking', icon: Clock },
    { id: 'STA', title: 'Staffing HQ', icon: ShieldAlert },
  ];

  const actions = ['VIEW', 'CREATE', 'EDIT', 'DELETE', 'APPROVE'];

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SettingsHeader 
        title="Security Matrix" 
        subtitle="Global permission override and module access control"
        icon={Lock}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Role Selector Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Select Access Tier</h3>
            <div className="space-y-2">
              {['SUPER-ADMIN', 'HEAD-COACH', 'FINANCE', 'SECURITY'].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`w-full text-left px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                    selectedRole === role 
                      ? 'bg-gray-900 text-white border-transparent shadow-lg shadow-gray-200' 
                      : 'bg-white text-gray-400 border-gray-50 hover:bg-gray-50 hover:text-gray-600'
                  }`}
                >
                  {role.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-600 p-8 rounded-[2rem] text-white shadow-xl shadow-blue-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 p-4 bg-white/10 rounded-full group-hover:scale-110 transition-transform">
              <FileSearch size={32} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-2">Audit Status</p>
            <h4 className="text-xl font-black uppercase leading-tight mb-4 tracking-tighter">System integrity verified</h4>
            <div className="flex items-center gap-2 text-[8px] font-black text-blue-200 uppercase italic">
              <Check size={12} /> Last Checked: 08:30 AM
            </div>
          </div>
        </div>

        {/* Permission Grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
             <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                <div>
                  <h3 className="text-sm font-black text-gray-900 uppercase">Operational Scopes</h3>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Configuring {selectedRole.replace('-', ' ')} clearance</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black uppercase text-[10px] hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
                  <Save size={16} /> Deploy Changes
                </button>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr>
                     <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Module</th>
                     {actions.map(action => (
                       <th key={action} className="px-4 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">{action}</th>
                     ))}
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                   {modules.map((module) => (
                     <tr key={module.id} className="hover:bg-gray-50/50 transition-colors">
                       <td className="px-8 py-6">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                             <module.icon size={18} />
                           </div>
                           <span className="text-[10px] font-black text-gray-900 uppercase tracking-wider">{module.title}</span>
                         </div>
                       </td>
                       {actions.map(action => (
                         <td key={action} className="px-4 py-6 text-center">
                           <div className="flex justify-center">
                              <Toggle enabled={Math.random() > 0.3} onChange={() => {}} />
                           </div>
                         </td>
                       ))}
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
          
          <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100 flex items-start gap-4">
             <div className="p-2 bg-white rounded-xl text-rose-600 shadow-sm">
               <ShieldAlert size={20} />
             </div>
             <div>
               <p className="text-[10px] font-black text-rose-800 uppercase tracking-widest mb-1">Critical Security Alert</p>
               <p className="text-[10px] font-bold text-rose-600 uppercase italic leading-relaxed">Modification of these parameters will immediately affect system-wide access. Ensure all changes follow the established Security Protocol v4.2.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
