import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  ChevronRight,
  Clock,
  Download,
  Filter,
  Mail,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  UserCircle,
  MoreHorizontal,
} from 'lucide-react';
import { coachProfiles } from './coachData';

const CoachProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'ON LEAVE': return 'bg-amber-50 text-amber-600 border-amber-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const filteredCoaches = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return coachProfiles;

    return coachProfiles.filter((coach) => [coach.id, coach.name, coach.role, coach.specialty, coach.email, coach.phone]
      .some((field) => field.toLowerCase().includes(query)));
  }, [searchTerm]);

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight text-gray-900 uppercase">
            <UserCircle className="text-blue-600" size={32} />
            Personnel HQ: <span className="text-blue-600">Coach Profiles</span>
          </h1>
          <p className="mt-1 text-xs font-bold tracking-widest text-gray-500 uppercase">Management of Elite Training Staff & Credentials</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => alert('Generating staff credentials report and exporting metadata...')}
            className="flex items-center gap-2 rounded-xl border-2 border-gray-200 px-4 py-2 text-xs font-black uppercase transition-all hover:bg-gray-50"
          >
            <Download size={16} /> Export Docs
          </button>
          <button
            type="button"
            onClick={() => alert('Launching Recruitment Protocol for New Elite Training Staff...')}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2 text-xs font-black uppercase text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
          >
            <Plus size={16} /> Recruit Coach
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: 'Total Staff', value: '12', color: 'blue' },
          { label: 'Active Duty', value: '09', color: 'emerald' },
          { label: 'On Leave', value: '02', color: 'amber' },
          { label: 'Specialists', value: '04', color: 'purple' },
        ].map((stat, index) => (
          <div key={index} className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className={`absolute -right-8 -top-8 h-24 w-24 rounded-full transition-transform group-hover:scale-110 ${
              stat.color === 'blue' ? 'bg-blue-50' :
              stat.color === 'emerald' ? 'bg-emerald-50' :
              stat.color === 'amber' ? 'bg-amber-50' :
              'bg-purple-50'
            }`} />
            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
            <p className={`relative text-3xl font-black ${
              stat.color === 'blue' ? 'text-blue-600' :
              stat.color === 'emerald' ? 'text-emerald-600' :
              stat.color === 'amber' ? 'text-amber-600' :
              'text-purple-600'
            }`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="SEARCH BY NAME, ID, OR SPECIALTY..."
            className="w-full rounded-xl border-none bg-gray-50 py-3 pl-11 pr-4 text-xs font-bold uppercase tracking-wider outline-none transition-all focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-xs font-black uppercase text-gray-600 transition-all hover:bg-gray-100 md:flex-none">
            <Filter size={16} /> Specialties
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-xs font-black uppercase text-gray-600 transition-all hover:bg-gray-100 md:flex-none">
            <ShieldCheck size={16} /> Rank
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        {filteredCoaches.map((coach) => (
          <div key={coach.id} className="group rounded-3xl border-2 border-gray-50 bg-white p-6 transition-all duration-300 hover:border-blue-100 hover:shadow-xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-xl font-black text-blue-600 transition-all group-hover:bg-blue-600 group-hover:text-white">
                  {coach.image}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black uppercase leading-tight text-gray-900 transition-colors group-hover:text-blue-600">{coach.name}</h3>
                    <span className={`rounded-lg border px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${getStatusColor(coach.status)}`}>
                      {coach.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-400">{coach.id} • {coach.role}</p>
                </div>
              </div>
              <button className="rounded-xl p-2 text-gray-400 transition-all hover:bg-gray-50 hover:text-gray-900">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-gray-50 p-3">
                <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-400">Sector Core</p>
                <div className="flex items-center gap-2">
                  <Award size={14} className="text-blue-600" />
                  <span className="text-xs font-black uppercase text-gray-700">{coach.specialty}</span>
                </div>
              </div>
              <div className="rounded-2xl bg-gray-50 p-3">
                <p className="mb-1 text-[9px] font-black uppercase tracking-widest text-gray-400">Field Experience</p>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-blue-600" />
                  <span className="text-xs font-black uppercase text-gray-700">{coach.experience}</span>
                </div>
              </div>
            </div>

            <div className="mb-6 space-y-3">
              <div className="flex items-center gap-3 text-xs font-bold italic text-gray-500">
                <Mail size={16} className="text-gray-400" /> {coach.email}
              </div>
              <div className="flex items-center gap-3 text-xs font-bold italic text-gray-500">
                <Phone size={16} className="text-gray-400" /> {coach.phone}
              </div>
              <div className="flex items-center gap-3 text-xs font-bold italic text-gray-500">
                <ShieldCheck size={16} className="text-gray-400" /> {coach.license}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-50 pt-6">
              <div className="flex items-center -space-x-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-[10px] font-black text-white">
                    B{item}
                  </div>
                ))}
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-[10px] font-black text-gray-400">
                  +{Math.max(coach.batches - 3, 0)}
                </div>
                <span className="pl-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Units Assigned</span>
              </div>
              <button
                type="button"
                onClick={() => navigate(`/coach/profiles/${coach.id}`)}
                className="flex items-center gap-1 text-xs font-black uppercase tracking-widest text-blue-600 transition-all hover:gap-2"
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
