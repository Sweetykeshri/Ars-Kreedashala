import React, { useState } from 'react';
import {
  ArrowUpRight,
  ChevronRight,
  Clock,
  Layers,
  MapPin,
  MoreVertical,
  ShieldCheck,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from 'lucide-react';

const assignments = [
  {
    coachId: 'C-001',
    coachName: 'RABINDRANATH SARKAR',
    batches: [
      { id: 'B-ELITE-01', name: 'ELITE MORNING CRICKET', strength: 22, time: '06:00 - 08:30', sector: 'GROUND A', capacity: '92%' },
      { id: 'B-PRO-04', name: 'PRO EVENING SESSION', strength: 18, time: '16:00 - 18:30', sector: 'NETS 1-4', capacity: '75%' },
    ],
  },
  {
    coachId: 'C-003',
    coachName: 'SUSHANT SINGH',
    batches: [
      { id: 'B-JR-09', name: 'JUNIOR FOOTBALL OPS', strength: 25, time: '07:00 - 09:00', sector: 'FIELD C', capacity: '83%' },
      { id: 'B-DEV-12', name: 'DEVELOPMENT UNIT', strength: 15, time: '17:00 - 19:00', sector: 'FIELD B', capacity: '60%' },
    ],
  },
];

const AssignedBatches = () => {
  const [showDeploymentForm, setShowDeploymentForm] = useState(false);

  if (showDeploymentForm) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight text-gray-900 uppercase">
                <Layers className="text-blue-600" size={32} />
                Command: <span className="text-blue-600">New Deployment</span>
              </h1>
              <p className="mt-1 text-xs font-bold tracking-widest text-gray-500 uppercase">Full page assignment form inside the layout</p>
            </div>
            <button
              type="button"
              onClick={() => setShowDeploymentForm(false)}
              className="rounded-2xl border border-gray-100 bg-white px-6 py-3 text-xs font-black tracking-widest text-gray-600 uppercase shadow-sm transition-all hover:bg-gray-50"
            >
              Back to Assignments
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.9fr)]">
            <section className="overflow-hidden rounded-4xl border border-gray-100 bg-white shadow-sm">
              <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-6 sm:px-8">
                <p className="text-[10px] font-black tracking-[0.3em] text-blue-600 uppercase">Deployment Form</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-gray-900 uppercase">Assign Coach to Batches</h2>
                <p className="mt-1 text-sm font-medium text-gray-500">Use this page form to create or update a coach deployment without leaving the page layout.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 p-6 sm:p-8 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Coach</label>
                  <select className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500">
                    <option>Select Coach</option>
                    <option>Rabindranath Sarkar</option>
                    <option>Sushant Singh</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Batch</label>
                  <select className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500">
                    <option>Select Batch</option>
                    <option>Elite Morning Cricket</option>
                    <option>Junior Football Ops</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Deployment Window</label>
                  <select className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500">
                    <option>Select Window</option>
                    <option>06:00 - 08:30</option>
                    <option>07:00 - 09:00</option>
                    <option>16:00 - 18:30</option>
                    <option>17:00 - 19:00</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Sector</label>
                  <input className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="Ground A" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Notes</label>
                  <textarea rows="4" className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-blue-500" placeholder="Optional deployment notes" />
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-gray-100 px-6 py-6 sm:flex-row sm:justify-end sm:px-8">
                <button
                  type="button"
                  onClick={() => setShowDeploymentForm(false)}
                  className="rounded-2xl border border-gray-100 px-6 py-3 text-[11px] font-bold tracking-widest text-gray-500 uppercase transition-all hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeploymentForm(false)}
                  className="rounded-2xl bg-blue-600 px-6 py-3 text-[11px] font-black tracking-[0.2em] text-white uppercase shadow-xl shadow-blue-100 transition-all hover:bg-blue-700"
                >
                  Save Deployment
                </button>
              </div>
            </section>

            <aside className="space-y-6">
              <div className="rounded-4xl bg-linear-to-br from-blue-600 to-blue-700 p-6 text-white shadow-xl shadow-blue-200">
                <div className="mb-4 flex items-start justify-between">
                  <div className="rounded-xl bg-white/20 p-2 backdrop-blur-md">
                    <Target size={24} />
                  </div>
                  <ArrowUpRight size={24} className="opacity-50" />
                </div>
                <p className="mb-1 text-[10px] font-black tracking-widest text-blue-100 uppercase">Deployment Mode</p>
                <p className="text-3xl font-black">Inline</p>
                <p className="mt-4 text-xs font-bold tracking-widest text-blue-100/80 uppercase">No modal, no blur, same page layout</p>
              </div>

              <div className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-50 p-2">
                    <ShieldCheck className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Responsive Layout</p>
                    <p className="text-sm font-black text-gray-900 uppercase">Mobile, Tablet, Desktop</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">
                  The deployment form now renders as a page section, so the rest of the Coach Management interface stays within the same layout.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 animate-in fade-in slide-in-from-bottom-4 duration-700 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-black tracking-tight text-gray-900 uppercase">
            <Layers className="text-blue-600" size={32} />
            Command: <span className="text-blue-600">Unit Assignments</span>
          </h1>
          <p className="mt-1 text-xs font-bold tracking-widest text-gray-500 uppercase">Operational workload and batch distribution control</p>
        </div>
        <button
          type="button"
          onClick={() => setShowDeploymentForm(true)}
          className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-xs font-black tracking-widest text-white uppercase shadow-xl shadow-blue-100 transition-all hover:bg-blue-700"
        >
          <Target size={18} /> New Deployment
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-4xl bg-linear-to-br from-blue-600 to-blue-700 p-6 text-white shadow-xl shadow-blue-200">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-xl bg-white/20 p-2 backdrop-blur-md">
              <Trophy size={24} />
            </div>
            <ArrowUpRight size={24} className="opacity-50" />
          </div>
          <p className="mb-1 text-[10px] font-black tracking-widest text-blue-100 uppercase">Total Active Units</p>
          <p className="text-4xl font-black">24</p>
          <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
            <span className="rounded-lg bg-blue-500/50 px-2 py-0.5 text-xs font-black text-white">UP 12%</span>
            <span className="text-[10px] font-bold tracking-wider text-blue-100 uppercase italic">vs previous month</span>
          </div>
        </div>

        <div className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-xl bg-emerald-50 p-2">
              <ShieldCheck className="text-emerald-600" size={24} />
            </div>
            <span className="text-xs font-black tracking-widest text-emerald-600 uppercase">Optimal</span>
          </div>
          <p className="mb-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">Avg Force Capacity</p>
          <p className="text-4xl font-black text-gray-900">82%</p>
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-50">
            <div className="h-full w-[82%] rounded-full bg-emerald-500" />
          </div>
        </div>

        <div className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <div className="rounded-xl bg-amber-50 p-2">
              <TrendingUp className="text-amber-600" size={24} />
            </div>
            <span className="text-xs font-black tracking-widest text-amber-600 uppercase">Alert</span>
          </div>
          <p className="mb-1 text-[10px] font-black tracking-widest text-gray-400 uppercase">Critical Workload</p>
          <p className="text-4xl font-black text-gray-900">03 <span className="text-lg text-gray-300">Staff</span></p>
          <p className="mt-4 text-[10px] font-bold tracking-widest text-amber-600 uppercase italic">Manual redistribution required</p>
        </div>
      </div>

      <div className="space-y-6">
        {assignments.map((coach) => (
          <div key={coach.coachId} className="group overflow-hidden rounded-4xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-50 bg-gray-50/50 px-4 py-5 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-gray-100 bg-white text-blue-600 font-black shadow-sm">
                  {coach.coachName.split(' ').map((name) => name[0]).join('')}
                </div>
                <div>
                  <h3 className="text-sm font-black tracking-tight text-gray-900 uppercase">{coach.coachName}</h3>
                  <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">{coach.coachId} • COMMANDING OFFICER</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="text-right">
                  <p className="mb-0.5 text-[10px] font-black tracking-widest text-gray-400 uppercase">Active Units</p>
                  <p className="text-sm font-black text-blue-600">{coach.batches.length}</p>
                </div>
                <button className="rounded-xl border border-transparent p-2 transition-all hover:border-gray-100 hover:bg-white">
                  <MoreVertical size={18} className="text-gray-400" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 p-4 sm:p-8 md:grid-cols-2">
              {coach.batches.map((batch) => (
                <div key={batch.id} className="group/batch relative rounded-2xl border-2 border-gray-50 p-5 transition-all duration-300 hover:border-blue-100 hover:bg-blue-50/30 sm:p-6">
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <span className="mb-2 inline-block rounded-lg bg-blue-600 px-2 py-0.5 text-[9px] font-black tracking-widest text-white uppercase shadow-lg shadow-blue-100">
                        {batch.id}
                      </span>
                      <h4 className="text-base font-black tracking-tight text-gray-900 uppercase">{batch.name}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Sector Integrity</p>
                      <p className="text-sm font-black text-emerald-600">{batch.capacity}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl border border-gray-100 bg-white p-2 shadow-sm">
                        <Users size={16} className="text-blue-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Strength</span>
                        <span className="text-xs font-black text-gray-700">{batch.strength} Cadets</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl border border-gray-100 bg-white p-2 shadow-sm">
                        <Clock size={16} className="text-blue-600" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Window</span>
                        <span className="text-xs font-black text-gray-700">{batch.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-6">
                    <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-gray-400 uppercase">
                      <MapPin size={14} />
                      {batch.sector}
                    </div>
                    <button className="flex items-center gap-1.5 text-[10px] font-black tracking-widest text-blue-600 uppercase transition-all group-hover/batch:gap-2.5">
                      Strategic View <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedBatches;