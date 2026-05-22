import React from 'react';
import { ChevronRight } from 'lucide-react';

export const AdminHeader = ({ title, subtitle, icon: Icon }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
    <div className="flex items-center gap-5">
      <div className="w-16 h-16 rounded-[2rem] bg-gray-900 flex items-center justify-center text-white shadow-xl shadow-gray-200 shrink-0">
        <Icon size={32} />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Admin Control</span>
          <ChevronRight size={10} className="text-gray-300" />
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Management</span>
        </div>
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">{title}</h1>
        <p className="text-xs font-bold text-gray-400 uppercase italic tracking-wide mt-1">{subtitle}</p>
      </div>
    </div>
  </div>
);

export const AdminStatCard = ({ label, value, subvalue, icon: Icon, trend, color = "blue" }) => (
  <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:border-blue-100 transition-all">
    <div className={`absolute top-0 right-0 p-6 text-${color}-600/10 group-hover:scale-110 transition-transform`}>
      <Icon size={48} />
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-baseline gap-2">
      <h3 className="text-3xl font-black text-gray-900 tracking-tight">{value}</h3>
      {trend && <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{trend}</span>}
    </div>
    <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 italic">{subvalue}</p>
  </div>
);

export const AdminToggle = ({ enabled, onChange }) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
      enabled ? 'bg-blue-600' : 'bg-gray-200'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);
