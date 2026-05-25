import React, { useState } from 'react';
import { 
  UserCircle, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Award,
  ChevronRight,
  Download,
  Clock,
  MapPin,
  Calendar,
  X
} from 'lucide-react';

const CoachProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const coaches = [
    {
      id: "C-001",
      name: "RABINDRANATH SARKAR",
      role: "HEAD COACH",
      specialty: "CRICKET",
      experience: "15+ YEARS",
      status: "ACTIVE",
      email: "rabindra@ars-academy.com",
      phone: "+91 98765 43210",
      batches: 4,
      license: "BCCI LEVEL 3",
      image: "RS"
    },
    {
      id: "C-002",
      name: "ANKITA MUKHERJEE",
      role: "SENIOR COACH",
      specialty: "BADMINTON",
      experience: "8 YEARS",
      status: "ON LEAVE",
      email: "ankita@ars-academy.com",
      phone: "+91 98765 12345",
      batches: 3,
      license: "BAI CERTIFIED",
      image: "AM"
    },
    {
      id: "C-003",
      name: "SUSHANT SINGH",
      role: "FIELD COACH",
      specialty: "FOOTBALL",
      experience: "5 YEARS",
      status: "ACTIVE",
      email: "sushant@ars-academy.com",
      phone: "+91 98765 67890",
      batches: 5,
      license: "AIFF LEVEL D",
      image: "SS"
    },
    {
      id: "C-004",
      name: "PRIYA DAS",
      role: "JUNIOR COACH",
      specialty: "CRICKET",
      experience: "3 YEARS",
      status: "ACTIVE",
      email: "priya@ars-academy.com",
      phone: "+91 98765 00000",
      batches: 2,
      license: "STATE LEVEL",
      image: "PD"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'ON LEAVE': return 'bg-amber-50 text-amber-600 border-amber-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
            <UserCircle className="text-blue-600" size={32} />
            Personnel HQ: <span className="text-blue-600">Coach Profiles</span>
          </h1>
          <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-1">Management of Elite Training Staff & Credentials</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert('Generating staff credentials report and exporting metadata...')}
            className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-xl font-black uppercase text-xs hover:bg-gray-50 transition-all"
          >
            <Download size={16} /> Export Docs
          </button>
          <button 
            onClick={() => alert('Launching Recruitment Protocol for New Elite Training Staff...')}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-xl font-black uppercase text-xs hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            <Plus size={16} /> Recruit Coach
          </button>
        </div>
      </div>

      {/* Analytics Command Center */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Staff', value: '12', color: 'blue' },
          { label: 'Active Duty', value: '09', color: 'emerald' },
          { label: 'On Leave', value: '02', color: 'amber' },
          { label: 'Specialists', value: '04', color: 'purple' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-${stat.color}-50 rounded-full group-hover:scale-110 transition-transform`}></div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className={`text-3xl font-black text-${stat.color}-600 relative`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="SEARCH BY NAME, ID, OR SPECIALTY..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-xl text-xs font-bold uppercase tracking-wider focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 text-gray-600 rounded-xl font-black uppercase text-xs hover:bg-gray-100 transition-all flex-1 md:flex-none justify-center">
            <Filter size={16} /> Specialties
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-gray-50 text-gray-600 rounded-xl font-black uppercase text-xs hover:bg-gray-100 transition-all flex-1 md:flex-none justify-center">
            <ShieldCheck size={16} /> Rank
          </button>
        </div>
      </div>

      {/* Coach Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {coaches.map((coach) => (
          <div key={coach.id} className="bg-white border-2 border-gray-50 rounded-3xl p-6 hover:shadow-xl hover:border-blue-100 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 text-xl font-black group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {coach.image}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase leading-tight">{coach.name}</h3>
                    <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black border uppercase tracking-wider ${getStatusColor(coach.status)}`}>
                      {coach.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{coach.id} • {coach.role}</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-3 rounded-2xl">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Sector Core</p>
                <div className="flex items-center gap-2">
                  <Award size={14} className="text-blue-600" />
                  <span className="text-xs font-black text-gray-700 uppercase">{coach.specialty}</span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-2xl">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Field Experience</p>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-blue-600" />
                  <span className="text-xs font-black text-gray-700 uppercase">{coach.experience}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-xs font-bold text-gray-500 italic">
                <Mail size={16} className="text-gray-400" /> {coach.email}
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-gray-500 italic">
                <Phone size={16} className="text-gray-400" /> {coach.phone}
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-gray-500 italic">
                <ShieldCheck size={16} className="text-gray-400" /> {coach.license}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
              <div className="flex items-center -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-8 h-8 rounded-full bg-blue-${i}00 border-2 border-white flex items-center justify-center text-[10px] font-black text-white`}>
                    B{i}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-gray-400">
                  +{coach.batches - 3}
                </div>
                <span className="pl-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Units Assigned</span>
              </div>
              <button 
                onClick={() => alert(`Accessing full dossier and performance logs for ${coach.name}`)}
                className="flex items-center gap-1 text-xs font-black text-blue-600 uppercase tracking-widest hover:gap-2 transition-all"
              >
                Full File <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachProfiles;