import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Shield, 
  UserCheck, 
  UserCog,
  ShieldCheck,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { SettingsHeader } from '../../components/settings/SettingsShared';

const UserRoles = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const roles = [
    {
      id: 'R-ADMIN',
      name: 'Super Admin',
      description: 'Full system override and strategic access',
      users: 2,
      level: 'LEVEL 10',
      status: 'ACTIVE',
      color: 'blue'
    },
    {
      id: 'R-HEAD',
      name: 'Head Coach',
      description: 'Operational control over training and personnel',
      users: 4,
      level: 'LEVEL 07',
      status: 'ACTIVE',
      color: 'emerald'
    },
    {
      id: 'R-FIN',
      name: 'Finance Officer',
      description: 'Treasury and fee collection management',
      users: 3,
      level: 'LEVEL 06',
      status: 'ACTIVE',
      color: 'amber'
    },
    {
      id: 'R-SEC',
      name: 'Security Ops',
      description: 'Attendance monitoring and facility integrity',
      users: 5,
      level: 'LEVEL 04',
      status: 'INACTIVE',
      color: 'gray'
    }
  ];

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SettingsHeader 
        title="Command Roles" 
        subtitle="Hierarchy management and administrative structure"
        icon={Shield}
      />

      {/* Role Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Protocols</p>
          <p className="text-3xl font-black text-gray-900">08 <span className="text-xs text-blue-600">Roles</span></p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Personnel</p>
          <p className="text-3xl font-black text-gray-900">14 <span className="text-xs text-emerald-600">Users</span></p>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm border-l-4 border-l-blue-600">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Next Security Audit</p>
          <p className="text-lg font-black text-gray-900 uppercase">24 MAY 2024</p>
        </div>
      </div>

      {/* Search & Action Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="SEARCH ACCESS PROTOCOLS..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl text-[10px] font-black uppercase tracking-wider focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => alert('Initiating protocol to establish new administrative command role...')}
          className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-black uppercase text-[10px] hover:bg-black shadow-lg shadow-gray-200 transition-all w-full md:w-auto justify-center"
        >
          <Plus size={16} /> Establish New Role
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white border-2 border-gray-50 rounded-[2.5rem] p-8 hover:shadow-xl hover:border-blue-100 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-${role.color}-50 flex items-center justify-center text-${role.color}-600`}>
                  <UserCog size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">{role.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{role.id}</span>
                    <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black border uppercase ${role.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                      {role.status}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => alert(`Configuring advanced override options for ${role.name}...`)}
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all"
              >
                <MoreHorizontal size={20} />
              </button>
            </div>

            <p className="text-xs font-bold text-gray-500 uppercase italic mb-8 h-8">
              {role.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Clearance Level</p>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-blue-600" />
                  <span className="text-xs font-black text-gray-900">{role.level}</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Assigned Forces</p>
                <div className="flex items-center gap-2">
                  <UserCheck size={14} className="text-blue-600" />
                  <span className="text-xs font-black text-gray-900">{role.users} Active Users</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-[8px] font-black text-blue-600">
                    U{i}
                  </div>
                ))}
              </div>
              <button 
                onClick={() => alert(`Redirecting to Security Matrix for ${role.name} configuration...`)}
                className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:gap-2 transition-all flex items-center gap-1"
              >
                Modify Access <Shield size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRoles;
