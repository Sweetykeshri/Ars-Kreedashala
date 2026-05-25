import React from 'react';
import { 
  Globe, 
  Camera, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Trophy, 
  Clock, 
  Share2,
  Save,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { SettingsHeader } from '../../components/settings/SettingsShared';

const AcademySettings = () => {
  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <SettingsHeader 
        title="Academy Signature" 
        subtitle="Public branding, contact vectors, and operational parameters"
        icon={Globe}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2.5rem] bg-gray-50 border-2 border-gray-100 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-600">
                <Trophy size={48} className="text-gray-200 group-hover:text-blue-600 transition-colors" />
              </div>
              <button 
                onClick={() => alert('Accessing secure optics for academy insignia update...')}
                className="absolute bottom-0 right-0 p-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 transition-all"
              >
                <Camera size={18} />
              </button>
            </div>
            <h3 className="mt-6 text-xl font-black text-gray-900 uppercase tracking-tight">Ars Kreedashala</h3>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Operational ID: ARS-HQ-01</p>
            
            <div className="mt-8 pt-8 border-t border-gray-50 w-full grid grid-cols-2 gap-4">
              <div className="text-left bg-gray-50 p-4 rounded-2xl">
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase">
                  <CheckCircle size={12} /> Live
                </div>
              </div>
              <div className="text-left bg-gray-50 p-4 rounded-2xl">
                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Scale</p>
                <div className="text-[10px] font-black text-gray-900 uppercase">4 Sectors</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-8 rounded-[3rem] text-white shadow-xl shadow-gray-200">
             <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-white/10 rounded-xl">
                 <AlertCircle size={20} className="text-blue-400" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest">Public Integrity</span>
             </div>
             <p className="text-xs font-bold text-gray-400 leading-relaxed italic">The information presented here is synchronized across Student Portals and Guardian Dashboards. Maintain accuracy across all contact vectors.</p>
          </div>
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8">
              <button 
                onClick={() => {
                   alert('Identity synchronization successful. Public academy profile updated across all modules.');
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-black uppercase text-[10px] hover:bg-black shadow-lg shadow-gray-200 transition-all"
              >
                <Save size={16} /> Update Protocol
              </button>
            </div>
            
            <div className="space-y-12">
              {/* Core Information */}
              <section>
                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-blue-600"></div> Core Identity
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Academy Nomenclature</label>
                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-3.5 rounded-2xl border border-gray-100 group focus-within:border-blue-600 transition-all">
                      <Building size={16} className="text-gray-400 group-focus-within:text-blue-600" />
                      <input type="text" defaultValue="Ars Kreedashala" className="bg-transparent border-none outline-none text-xs font-black uppercase w-full text-gray-900" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Primary Email Vector</label>
                    <div className="flex items-center gap-3 bg-gray-50 px-4 py-3.5 rounded-2xl border border-gray-100 group focus-within:border-blue-600 transition-all">
                      <Mail size={16} className="text-gray-400 group-focus-within:text-blue-600" />
                      <input type="email" defaultValue="admin@ars-academy.com" className="bg-transparent border-none outline-none text-xs font-black w-full text-gray-900" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Geographical Presence */}
              <section>
                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-blue-600"></div> Field Coordinates
                </h4>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Command Center Address</label>
                    <div className="flex items-start gap-3 bg-gray-50 px-4 py-3.5 rounded-2xl border border-gray-100 group focus-within:border-blue-600 transition-all">
                      <MapPin size={16} className="text-gray-400 mt-0.5 group-focus-within:text-blue-600" />
                      <textarea defaultValue="128/A Operational Sector, North Stadium Block, New Delhi - 110001" className="bg-transparent border-none outline-none text-xs font-black uppercase w-full text-gray-900 min-h-[80px]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">HQ Hotline</label>
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3.5 rounded-2xl border border-gray-100 group focus-within:border-blue-600 transition-all">
                        <Phone size={16} className="text-gray-400 group-focus-within:text-blue-600" />
                        <input type="text" defaultValue="+91 11 2345 6789" className="bg-transparent border-none outline-none text-xs font-black w-full text-gray-900" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ops Window</label>
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3.5 rounded-2xl border border-gray-100 group focus-within:border-blue-600 transition-all">
                        <Clock size={16} className="text-gray-400 group-focus-within:text-blue-600" />
                        <input type="text" defaultValue="05:00 AM - 09:00 PM" className="bg-transparent border-none outline-none text-xs font-black uppercase w-full text-gray-900" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Digital Frequency */}
              <section>
                <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                  <div className="w-8 h-[2px] bg-blue-600"></div> Network Presence
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {['Instagram', 'Twitter', 'Facebook', 'LinkedIn'].map((social) => (
                      <div key={social} className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{social} Signal</label>
                        <div className="flex items-center gap-3 bg-gray-50 px-4 py-3.5 rounded-2xl border border-gray-100 group focus-within:border-blue-600 transition-all">
                          <Share2 size={16} className="text-gray-400 group-focus-within:text-blue-600" />
                          <input type="text" placeholder={`@ars_${social.toLowerCase()}`} className="bg-transparent border-none outline-none text-xs font-bold w-full text-gray-900" />
                        </div>
                      </div>
                   ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademySettings;
