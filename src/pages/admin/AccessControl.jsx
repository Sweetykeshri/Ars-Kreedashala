import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Key, 
  Save, 
  AlertTriangle,
  Users,
  Eye,
  Edit3,
  Trash,
  CheckCircle2,
  Settings,
  ShieldHalf
} from 'lucide-react';
import { AdminHeader, AdminStatCard, AdminToggle } from '../../components/admin/AdminShared';

const AccessControl = () => {
  const [selectedRole, setSelectedRole] = useState('OPERATIONS');
  const [permissionState, setPermissionState] = useState([
    { id: 'ADM', name: 'Admissions Panel', view: true, create: true, edit: true, delete: false, approve: true },
    { id: 'TRA', name: 'Training Operations', view: true, create: true, edit: true, delete: true, approve: true },
    { id: 'FEE', name: 'Treasury & Finance', view: true, create: false, edit: false, delete: false, approve: false },
    { id: 'ATT', name: 'Presence Hub', view: true, create: true, edit: true, delete: false, approve: false },
    { id: 'STA', name: 'Staffing HQ', view: true, create: false, edit: false, delete: false, approve: false },
  ]);

  const togglePermission = (id, field) => {
    setPermissionState(prev => prev.map(p => 
      p.id === id ? { ...p, [field]: !p[field] } : p
    ));
  };

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <AdminHeader 
        title="Security Protocols" 
        subtitle="Manage cryptographic access levels and module clearance hierarchies"
        icon={Lock}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminStatCard 
          label="Access Levels" 
          value="08" 
          subvalue="Defined Tiers" 
          icon={Key} 
          color="blue"
        />
        <AdminStatCard 
          label="Module Integrity" 
          value="100%" 
          subvalue="Secure Operations" 
          icon={ShieldCheck} 
          color="emerald"
        />
        <AdminStatCard 
          label="Active Overrides" 
          value="02" 
          subvalue="Temporary Shields" 
          icon={ShieldHalf} 
          color="amber"
          trend="Alert"
        />
        <AdminStatCard 
          label="Security Pulse" 
          value="Normal" 
          subvalue="Last Scan: 2m ago" 
          icon={Settings} 
          color="indigo"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Tier Selector */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
             <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Execution Tiers</h3>
             <div className="space-y-2">
                {['SUPERUSER', 'OPERATIONS', 'FINANCE', 'COACH'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full text-left px-5 py-5 rounded-2xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                      selectedRole === role 
                        ? 'bg-blue-600 text-white border-transparent shadow-xl shadow-blue-100 ring-2 ring-blue-500 ring-offset-2' 
                        : 'bg-white text-gray-400 border-gray-50 hover:bg-gray-50 hover:text-gray-600'
                    }`}
                  >
                    {role} Profile
                  </button>
                ))}
             </div>
          </div>
          
          <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-4 -mt-4 p-4 bg-white/10 rounded-full group-hover:scale-110 transition-transform">
              <CheckCircle2 size={32} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-100 mb-2">Protocol Status</p>
            <h4 className="text-xl font-black uppercase leading-tight mb-4 tracking-tighter">Clearance Level: Alpha-2</h4>
            <div className="flex items-center gap-2 text-[8px] font-black text-emerald-200 uppercase italic">
              All systems nominal
            </div>
          </div>
        </div>

        {/* Matrix */}
        <div className="lg:col-span-3 space-y-6">
           <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                  <div>
                    <h3 className="text-sm font-black text-gray-900 uppercase">Module Clearance Matrix</h3>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Configuring clearance for {selectedRole} Tier</p>
                  </div>
                  <button 
                    onClick={() => {
                      if(confirm(`System Authorization: Confirm deployment of new security protocols for ${selectedRole} Tier? This will take immediate effect.`)) {
                        alert(`Security Matrix for ${selectedRole} has been updated and synchronized.`);
                      }
                    }}
                    className="flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-xl font-black uppercase text-[10px] hover:bg-black shadow-xl shadow-gray-200 transition-all"
                  >
                    <Save size={16} /> Deploy Protocols
                  </button>
               </div>
               
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                   <thead>
                     <tr className="bg-gray-50/50">
                       <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Module</th>
                       <th className="px-4 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest"><Eye size={14} className="mx-auto mb-1 text-blue-600" /> View</th>
                       <th className="px-4 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest"><ShieldCheck size={14} className="mx-auto mb-1 text-indigo-600" /> Create</th>
                       <th className="px-4 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest"><Edit3 size={14} className="mx-auto mb-1 text-emerald-600" /> Edit</th>
                       <th className="px-4 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest"><Trash size={14} className="mx-auto mb-1 text-rose-600" /> Delete</th>
                       <th className="px-4 py-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest"><CheckCircle2 size={14} className="mx-auto mb-1 text-amber-600" /> Approve</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                     {permissionState.map((module) => (
                       <tr key={module.id} className="hover:bg-gray-50/50 transition-colors">
                         <td className="px-10 py-6">
                           <span className="text-[10px] font-black text-gray-900 uppercase tracking-wider">{module.name}</span>
                         </td>
                         <td className="px-4 py-6 text-center">
                           <div className="flex justify-center"><AdminToggle enabled={module.view} onChange={() => togglePermission(module.id, 'view')} /></div>
                         </td>
                         <td className="px-4 py-6 text-center">
                           <div className="flex justify-center"><AdminToggle enabled={module.create} onChange={() => togglePermission(module.id, 'create')} /></div>
                         </td>
                         <td className="px-4 py-6 text-center">
                           <div className="flex justify-center"><AdminToggle enabled={module.edit} onChange={() => togglePermission(module.id, 'edit')} /></div>
                         </td>
                         <td className="px-4 py-6 text-center">
                           <div className="flex justify-center"><AdminToggle enabled={module.delete} onChange={() => togglePermission(module.id, 'delete')} /></div>
                         </td>
                         <td className="px-4 py-6 text-center">
                           <div className="flex justify-center"><AdminToggle enabled={module.approve} onChange={() => togglePermission(module.id, 'approve')} /></div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
           </div>

           <div className="bg-rose-50 p-8 rounded-[2rem] border border-rose-100 flex items-start gap-5">
              <div className="shrink-0 p-3 bg-white rounded-2xl text-rose-600 shadow-sm border border-rose-100">
                 <AlertTriangle size={24} />
              </div>
              <div>
                 <h4 className="text-[10px] font-black text-rose-800 uppercase tracking-widest mb-1">Administrative Warning</h4>
                 <p className="text-[10px] font-bold text-rose-600 leading-relaxed uppercase italic opacity-80">
                   System-wide clearance modifications require Level-3 encryption keys. All changes are being recorded in the Tactical Nexus Activity Logs.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;
