import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  ShieldCheck,
  UserCheck,
  UserX,
  Edit2,
  Trash2,
  Eye
} from 'lucide-react';
import { AdminHeader, AdminStatCard } from '../../components/admin/AdminShared';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const users = [
    {
      id: 'ADM-001',
      name: 'Vikram Singh',
      email: 'vikram.s@ars.academy',
      phone: '+91 98765 43210',
      role: 'Super Admin',
      status: 'Active',
      lastLogin: '2 hours ago',
      photo: 'VS'
    },
    {
      id: 'ADM-002',
      name: 'Priya Sharma',
      email: 'priya.s@ars.academy',
      phone: '+91 98765 43211',
      role: 'Operations Head',
      status: 'Active',
      lastLogin: '5 mins ago',
      photo: 'PS'
    },
    {
      id: 'ADM-003',
      name: 'Arjun Reddy',
      email: 'arjun.r@ars.academy',
      phone: '+91 98765 43212',
      role: 'Finance Officer',
      status: 'Inactive',
      lastLogin: '2 days ago',
      photo: 'AR'
    },
    {
      id: 'ADM-004',
      name: 'Sneha Gupta',
      email: 'sneha.g@ars.academy',
      phone: '+91 98765 43213',
      role: 'Data Analyst',
      status: 'Active',
      lastLogin: '1 hour ago',
      photo: 'SG'
    }
  ];

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <AdminHeader 
        title="Admin Personnel" 
        subtitle="Manage command center staff and operational access levels"
        icon={Users}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminStatCard 
          label="Total Admins" 
          value="12" 
          subvalue="Active Staff" 
          icon={Users} 
          trend="+2 New"
        />
        <AdminStatCard 
          label="Super Users" 
          value="02" 
          subvalue="Level 10 Access" 
          icon={ShieldCheck} 
          color="indigo"
        />
        <AdminStatCard 
          label="Active Now" 
          value="05" 
          subvalue="Logged In" 
          icon={UserCheck} 
          color="emerald"
        />
        <AdminStatCard 
          label="Pending Invites" 
          value="03" 
          subvalue="Awaiting Verification" 
          icon={UserX} 
          color="amber"
        />
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH COMMAND STAFF..."
              className="w-full pl-11 pr-4 py-3 bg-white border-none rounded-xl text-[10px] font-black uppercase tracking-wider focus:ring-2 focus:ring-blue-500 shadow-sm transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 border border-gray-100 rounded-xl font-black uppercase text-[10px] hover:bg-gray-50 transition-all shadow-sm">
              <Filter size={16} /> Filters
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-black uppercase text-[10px] hover:bg-black shadow-lg shadow-gray-200 transition-all">
              <Plus size={16} /> Induct Admin
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Profile</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Information</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Access Role</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Security Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Operational Intel</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-inner">
                        {user.photo}
                      </div>
                      <div>
                        <p className="text-xs font-black text-gray-900 uppercase tracking-tight">{user.name}</p>
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-0.5">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                        <Mail size={12} className="text-gray-400" /> {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                        <Phone size={12} className="text-gray-400" /> {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-wider border border-indigo-100 italic">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${
                      user.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Last Login</p>
                    <p className="text-[10px] font-bold text-gray-900 uppercase">{user.lastLogin}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
