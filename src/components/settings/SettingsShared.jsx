import React from 'react';
import { Settings } from 'lucide-react';

export const SettingsHeader = ({ title, subtitle, icon: Icon = Settings }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 mt-4">
      <div>
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
          <Icon className="text-blue-600" size={32} />
          Protocol: <span className="text-blue-600">{title}</span>
        </h1>
        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-1">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-lg border border-blue-100">
          Security Group: Level 1
        </span>
      </div>
    </div>
  );
};

export const Toggle = ({ enabled, onChange, label }) => (
  <button
    onClick={() => onChange(!enabled)}
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
