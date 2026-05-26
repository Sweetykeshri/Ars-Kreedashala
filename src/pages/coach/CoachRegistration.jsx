import React from 'react';
import { UserPlus, ClipboardList, Calendar, Phone, Mail, MapPin, Briefcase } from 'lucide-react';

const CoachRegistration = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Coach Registration</h2>
          <p className="text-gray-500 text-sm mt-1">Register new coaches and maintain staff records.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-200">
          <UserPlus size={16} />
          New Coach
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
          <ClipboardList size={14} className="text-blue-500" />
          Coach Registration Form
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Coach Name</label>
            <input className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium" placeholder="Full Name" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Coach ID</label>
            <input className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium" placeholder="C-205" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Specialization</label>
            <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium">
              <option>Select Sport</option>
              <option>Cricket</option>
              <option>Football</option>
              <option>Tennis</option>
              <option>Badminton</option>
              <option>Fitness</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Experience</label>
            <div className="relative">
              <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium" placeholder="10 Years" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone</label>
            <div className="relative">
              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium" placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium" placeholder="coach@email.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Joining Date</label>
            <div className="relative">
              <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="date" className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Availability</label>
            <select className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium">
              <option>Active</option>
              <option>On Duty</option>
              <option>On Leave</option>
            </select>
          </div>
          <div className="space-y-2 lg:col-span-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Address</label>
            <div className="relative">
              <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium" placeholder="Full Address" />
            </div>
          </div>
          <div className="space-y-2 lg:col-span-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Certifications / Notes</label>
            <textarea rows="3" className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-medium" placeholder="Certifications, achievements, or remarks"></textarea>
          </div>
          <div className="lg:col-span-3 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button type="button" className="px-6 py-3 rounded-2xl border border-gray-100 font-bold text-gray-400 uppercase tracking-widest text-[11px] hover:bg-gray-50 transition-all">
              Clear Form
            </button>
            <button type="button" className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all">
              Register Coach
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoachRegistration;
