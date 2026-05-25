import React, { useState } from 'react';
import { 
  Settings, 
  Moon, 
  Sun, 
  Bell, 
  Cloud, 
  Database, 
  Laptop, 
  Languages, 
  ShieldCheck,
  RefreshCw,
  HardDrive
} from 'lucide-react';
import { SettingsHeader, Toggle } from '../../components/settings/SettingsShared';

const SystemConfig = () => {
  const [config, setConfig] = useState({
    autoBackup: true,
    notifications: true,
    cloudSync: true,
    maintenanceMode: false,
    darkMode: false,
    aiOptimization: true
  });

  const toggleSetting = (key) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SettingsHeader 
        title="System Infrastructure" 
        subtitle="Core engine parameters, data redundancy, and interface protocols"
        icon={Settings}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Environment Settings */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <div className="w-8 h-[2px] bg-blue-600"></div> Interface Protocols
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100/50">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${config.darkMode ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 shadow-sm'}`}>
                    {config.darkMode ? <Moon size={20} /> : <Sun size={20} />}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Visual Aesthetic</h4>
                    <p className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase">Toggle High-Contrast Dark Mode</p>
                  </div>
                </div>
                <Toggle enabled={config.darkMode} onChange={() => toggleSetting('darkMode')} />
              </div>

              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white text-blue-600 rounded-2xl shadow-sm">
                    <Languages size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Language Matrix</h4>
                    <p className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase">System primary communication</p>
                  </div>
                </div>
                <select className="bg-white border-none text-[10px] font-black uppercase rounded-xl py-2 px-4 shadow-sm outline-none focus:ring-2 focus:ring-blue-500">
                  <option>English (US)</option>
                  <option>Hindi (IN)</option>
                  <option>Spanish (ES)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100/50">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl ${config.notifications ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 shadow-sm'}`}>
                    <Bell size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Alert Transmission</h4>
                    <p className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase">Global notification relay</p>
                  </div>
                </div>
                <Toggle enabled={config.notifications} onChange={() => toggleSetting('notifications')} />
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-10 rounded-[3rem] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-blue-500/20 transition-colors">
              <Laptop size={120} />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">Version Control</p>
            <h4 className="text-2xl font-black uppercase mb-4 tracking-tighter">Ars OS v4.8.2-Tactical</h4>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-lg text-[9px] font-black uppercase">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Up to date
              </div>
              <button 
                onClick={() => alert('Scanning for OS patches... Everything is nominal.')}
                className="text-[9px] font-black uppercase text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                Check for updates <RefreshCw size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Data & Security */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
              <div className="w-8 h-[2px] bg-blue-600"></div> Data Integrity
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white text-emerald-600 rounded-2xl shadow-sm">
                    <Database size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Automated Redundancy</h4>
                    <p className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase">Daily data backup protocol</p>
                  </div>
                </div>
                <Toggle enabled={config.autoBackup} onChange={() => toggleSetting('autoBackup')} />
              </div>

              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100/50">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white text-amber-600 rounded-2xl shadow-sm">
                    <Cloud size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Cloud Synchronization</h4>
                    <p className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase">Real-time offsite replication</p>
                  </div>
                </div>
                <Toggle enabled={config.cloudSync} onChange={() => toggleSetting('cloudSync')} />
              </div>

              <div 
                onClick={() => alert('Encrypting system snapshot for secure download...')}
                className="flex items-center justify-between p-6 border-2 border-dashed border-gray-100 rounded-[2rem] group hover:border-blue-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4 p-2">
                  <div className="p-3 bg-gray-50 text-gray-400 rounded-2xl group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                    <HardDrive size={20} />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Archive Extraction</h4>
                    <p className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase">Download complete system snapshot</p>
                  </div>
                </div>
                <div className="pr-6">
                  <ShieldCheck size={20} className="text-gray-200" />
                </div>
              </div>
            </div>
          </div>

          <div 
            onClick={() => {
              if(confirm('CRITICAL SYSTEM ALERT: You are about to initiate a FULL SYSTEM WIPE. This will erase all data, configurations, and logs. This cannot be undone. DO YOU HAVE PHYSICAL AUTHORIZATION?')) {
                alert('Handshake required: Please insert Physical Auth-Key and provide biometric verification.');
              }
            }}
            className="bg-rose-600 p-10 rounded-[3rem] text-white shadow-xl shadow-rose-100 relative group cursor-pointer hover:bg-rose-700 transition-all"
          >
             <div className="flex justify-between items-start mb-6">
               <div className="p-3 bg-white/20 rounded-2xl">
                 <RefreshCw size={24} className="group-hover:rotate-180 transition-transform duration-700" />
               </div>
               <div className="px-3 py-1 bg-white/20 rounded-lg text-[8px] font-black uppercase">Level Alpha Access Required</div>
             </div>
             <h4 className="text-xl font-black uppercase mb-2">Hard Re-initialization</h4>
             <p className="text-xs font-bold text-rose-100 leading-relaxed uppercase opacity-80 italic">Emergency system wipe and factory reset. This action is irreversible and requires physical auth-key verification.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfig;
