import React, { useState } from "react";
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
  X,
} from "lucide-react";

const assignments = [
  {
    coachId: "C-001",
    coachName: "RABINDRANATH SARKAR",
    batches: [
      { id: "B-ELITE-01", name: "ELITE MORNING CRICKET", strength: 22, time: "06:00 - 08:30", sector: "GROUND A", capacity: "92%" },
      { id: "B-PRO-04", name: "PRO EVENING SESSION", strength: 18, time: "16:00 - 18:30", sector: "NETS 1-4", capacity: "75%" },
    ],
  },
  {
    coachId: "C-003",
    coachName: "SUSHANT SINGH",
    batches: [
      { id: "B-JR-09", name: "JUNIOR FOOTBALL OPS", strength: 25, time: "07:00 - 09:00", sector: "FIELD C", capacity: "83%" },
      { id: "B-DEV-12", name: "DEVELOPMENT UNIT", strength: 15, time: "17:00 - 19:00", sector: "FIELD B", capacity: "60%" },
    ],
  },
];

const AssignedBatches = () => {
  const [showForm, setShowForm] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [msg, setMsg] = useState("");

  const showMsg = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2500);
  };

  if (showForm) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-xl font-black uppercase text-gray-900 sm:text-2xl lg:text-3xl">
              <Layers className="text-blue-600" size={28} />
              New <span className="text-blue-600">Deployment</span>
            </h1>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-500">
              Assign coach to batch
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3 text-xs font-black uppercase text-gray-600 shadow-sm hover:bg-gray-50 sm:w-auto"
          >
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <section className="rounded-[2rem] border border-gray-100 bg-white shadow-sm xl:col-span-2">
            <div className="border-b border-gray-100 bg-gray-50 px-5 py-5 sm:px-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                Deployment Form
              </p>
              <h2 className="mt-1 text-lg font-black uppercase text-gray-900 sm:text-2xl">
                Assign Coach to Batch
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6">
              <Field label="Coach" type="select" options={["Select Coach", "Rabindranath Sarkar", "Sushant Singh"]} />
              <Field label="Batch" type="select" options={["Select Batch", "Elite Morning Cricket", "Junior Football Ops"]} />
              <Field label="Time Window" type="select" options={["Select Window", "06:00 - 08:30", "07:00 - 09:00", "16:00 - 18:30"]} />
              <Field label="Sector" placeholder="Ground A" />
              <label className="space-y-2 sm:col-span-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Notes
                </span>
                <textarea
                  rows="4"
                  className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  placeholder="Optional deployment notes"
                />
              </label>
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 p-5 sm:flex-row sm:justify-end sm:p-6">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-2xl border border-gray-200 px-5 py-3 text-xs font-black uppercase text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  showMsg("Deployment saved successfully.");
                }}
                className="rounded-2xl bg-blue-600 px-5 py-3 text-xs font-black uppercase text-white hover:bg-blue-700"
              >
                Save Deployment
              </button>
            </div>
          </section>

          <aside className="rounded-[2rem] bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-lg">
            <Target size={28} />
            <p className="mt-5 text-[10px] font-black uppercase tracking-widest text-blue-100">
              Responsive Mode
            </p>
            <p className="mt-1 text-3xl font-black">Ready</p>
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-blue-100">
              Mobile • Tablet • Laptop
            </p>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {msg && (
        <div className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
          {msg}
        </div>
      )}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-black uppercase text-gray-900 sm:text-2xl lg:text-3xl">
            <Layers className="text-blue-600" size={28} />
            Unit <span className="text-blue-600">Assignments</span>
          </h1>
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-500">
            Coach batch assignment control
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-xs font-black uppercase text-white shadow-lg hover:bg-blue-700 sm:w-auto"
        >
          <Target size={18} />
          New Deployment
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Stat icon={Trophy} label="Total Active Units" value="24" color="blue" />
        <Stat icon={ShieldCheck} label="Avg Capacity" value="82%" color="emerald" />
        <Stat icon={TrendingUp} label="Critical Workload" value="03" color="amber" />
      </div>

      <div className="space-y-5">
        {assignments.map((coach) => (
          <div key={coach.coachId} className="rounded-[2rem] border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-100 bg-gray-50 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xs font-black text-blue-600 shadow-sm">
                  {coach.coachName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase text-gray-900">
                    {coach.coachName}
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {coach.coachId} • Coach
                  </p>
                </div>
              </div>

              <div className="relative flex items-center justify-between gap-4 sm:justify-end">
                <div className="text-left sm:text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Active Units
                  </p>
                  <p className="text-sm font-black text-blue-600">{coach.batches.length}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenMenu(openMenu === coach.coachId ? null : coach.coachId)}
                  className="rounded-xl p-2 hover:bg-white"
                >
                  <MoreVertical size={18} className="text-gray-400" />
                </button>

                {openMenu === coach.coachId && (
                  <div className="absolute right-0 top-11 z-20 w-40 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                    <button
                      type="button"
                      onClick={() => {
                        setOpenMenu(null);
                        setShowForm(true);
                      }}
                      className="block w-full px-4 py-3 text-left text-xs font-bold text-gray-700 hover:bg-gray-50"
                    >
                      Edit Assignment
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setOpenMenu(null);
                        showMsg("Coach workload refreshed.");
                      }}
                      className="block w-full px-4 py-3 text-left text-xs font-bold text-gray-700 hover:bg-gray-50"
                    >
                      Refresh
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 lg:grid-cols-2">
              {coach.batches.map((batch) => (
                <div key={batch.id} className="rounded-2xl border border-gray-100 p-4 hover:border-blue-100 hover:bg-blue-50/30 sm:p-5">
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <span className="rounded-lg bg-blue-600 px-2 py-1 text-[9px] font-black uppercase tracking-widest text-white">
                        {batch.id}
                      </span>
                      <h4 className="mt-3 text-sm font-black uppercase text-gray-900 sm:text-base">
                        {batch.name}
                      </h4>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        Capacity
                      </p>
                      <p className="text-sm font-black text-emerald-600">{batch.capacity}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Info icon={Users} label="Strength" value={`${batch.strength} Players`} />
                    <Info icon={Clock} label="Time" value={batch.time} />
                  </div>

                  <div className="mt-5 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <MapPin size={14} />
                      {batch.sector}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedBatch(batch)}
                      className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-600"
                    >
                      Strategic View <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-black text-gray-900">Batch Details</h3>
              <button type="button" onClick={() => setSelectedBatch(null)} className="rounded-xl p-2 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2 text-sm font-semibold text-gray-600">
              <p><b>Batch:</b> {selectedBatch.name}</p>
              <p><b>ID:</b> {selectedBatch.id}</p>
              <p><b>Strength:</b> {selectedBatch.strength}</p>
              <p><b>Time:</b> {selectedBatch.time}</p>
              <p><b>Sector:</b> {selectedBatch.sector}</p>
              <p><b>Capacity:</b> {selectedBatch.capacity}</p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedBatch(null)}
              className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-xs font-black uppercase text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Stat = ({ icon: Icon, label, value, color }) => (
  <div className={`rounded-[2rem] border border-gray-100 bg-white p-5 shadow-sm ${color === "blue" ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white" : ""}`}>
    <Icon size={24} className={color === "blue" ? "text-white" : color === "emerald" ? "text-emerald-600" : "text-amber-600"} />
    <p className={`mt-4 text-[10px] font-black uppercase tracking-widest ${color === "blue" ? "text-blue-100" : "text-gray-400"}`}>
      {label}
    </p>
    <p className={`mt-1 text-3xl font-black ${color === "blue" ? "text-white" : "text-gray-900"}`}>
      {value}
    </p>
  </div>
);

const Info = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
    <Icon size={16} className="text-blue-600" />
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
      <p className="text-xs font-black text-gray-700">{value}</p>
    </div>
  </div>
);

const Field = ({ label, type = "input", options = [], placeholder = "" }) => (
  <label className="space-y-2">
    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </span>
    {type === "select" ? (
      <select className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500">
        {options.map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    ) : (
      <input
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
      />
    )}
  </label>
);

export default AssignedBatches;