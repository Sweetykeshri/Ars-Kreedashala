import React, { useMemo, useState } from "react";
import {
  History,
  Search,
  Calendar,
  Download,
  Filter,
  Clock,
  ShieldAlert,
  Database,
  Terminal,
  Activity,
  X,
  RotateCcw,
  Eye,
} from "lucide-react";

const baseLogs = [
  {
    id: "LOG-9821",
    user: "Vikram Singh",
    action: "System Override",
    actionType: "Override",
    module: "Security Matrix",
    timestamp: "Today, 10:45 AM",
    date: "2026-06-03",
    ip: "192.168.1.45",
    status: "Verified",
    color: "rose",
  },
  {
    id: "LOG-9820",
    user: "Priya Sharma",
    action: "New Admission",
    actionType: "Create",
    module: "Training Ops",
    timestamp: "Today, 09:12 AM",
    date: "2026-06-03",
    ip: "192.168.1.12",
    status: "Success",
    color: "emerald",
  },
  {
    id: "LOG-9819",
    user: "Arjun Reddy",
    action: "Fee Reversal",
    actionType: "Edit",
    module: "Treasury",
    timestamp: "Yesterday, 04:30 PM",
    date: "2026-06-02",
    ip: "192.168.1.28",
    status: "Flagged",
    color: "amber",
  },
  {
    id: "LOG-9818",
    user: "Sneha Gupta",
    action: "Data Export",
    actionType: "Export",
    module: "Analytics",
    timestamp: "Yesterday, 02:15 PM",
    date: "2026-06-02",
    ip: "192.168.1.33",
    status: "Success",
    color: "blue",
  },
];

const olderLogs = [
  {
    id: "LOG-9817",
    user: "System Admin",
    action: "Password Reset",
    actionType: "Edit",
    module: "Security Matrix",
    timestamp: "01 Jun, 11:20 AM",
    date: "2026-06-01",
    ip: "192.168.1.60",
    status: "Verified",
    color: "emerald",
  },
  {
    id: "LOG-9816",
    user: "Priya Sharma",
    action: "Batch Updated",
    actionType: "Edit",
    module: "Training Ops",
    timestamp: "01 Jun, 08:45 AM",
    date: "2026-06-01",
    ip: "192.168.1.12",
    status: "Success",
    color: "blue",
  },
];

const colorClass = {
  rose: "bg-rose-50 text-rose-600 border-rose-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
  amber: "bg-amber-50 text-amber-600 border-amber-100",
  blue: "bg-blue-50 text-blue-600 border-blue-100",
};

const modules = ["All Modules", "Security Matrix", "Training Ops", "Treasury", "Analytics"];
const actions = ["All Actions", "Create", "Edit", "Export", "Override"];

const downloadCSV = (rows, fileName) => {
  const csv = rows
    .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
};

const ActivityLogs = () => {
  const [logs, setLogs] = useState(baseLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All Modules");
  const [actionFilter, setActionFilter] = useState("All Actions");
  const [dateFilter, setDateFilter] = useState("");
  const [activeLog, setActiveLog] = useState(null);

  const filteredLogs = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return logs.filter((log) => {
      const matchesSearch =
        !q ||
        `${log.id} ${log.user} ${log.action} ${log.module} ${log.status} ${log.ip}`
          .toLowerCase()
          .includes(q);

      const matchesModule =
        moduleFilter === "All Modules" || log.module === moduleFilter;

      const matchesAction =
        actionFilter === "All Actions" || log.actionType === actionFilter;

      const matchesDate = !dateFilter || log.date === dateFilter;

      return matchesSearch && matchesModule && matchesAction && matchesDate;
    });
  }, [logs, searchTerm, moduleFilter, actionFilter, dateFilter]);

  const stats = [
    { label: "Total Operations", value: logs.length, icon: <Database size={20} /> },
    {
      label: "Security Events",
      value: logs.filter((l) => l.module === "Security Matrix").length,
      icon: <ShieldAlert size={20} />,
    },
    {
      label: "Active Session",
      value: logs.filter((l) => l.status !== "Flagged").length,
      icon: <Activity size={20} />,
    },
    {
      label: "Success Rate",
      value: `${Math.round(
        (logs.filter((l) => l.status === "Success" || l.status === "Verified").length /
          logs.length) *
          100
      )}%`,
      icon: <History size={20} />,
    },
  ];

  const exportLogs = () => {
    downloadCSV(
      [
        ["Log ID", "User", "Action", "Module", "Date", "Timestamp", "IP", "Status"],
        ...filteredLogs.map((log) => [
          log.id,
          log.user,
          log.action,
          log.module,
          log.date,
          log.timestamp,
          log.ip,
          log.status,
        ]),
      ],
      "activity-logs.csv"
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setModuleFilter("All Modules");
    setActionFilter("All Actions");
    setDateFilter("");
  };

  const loadPreviousRecords = () => {
    setLogs((prev) => {
      const existing = new Set(prev.map((log) => log.id));
      return [...prev, ...olderLogs.filter((log) => !existing.has(log.id))];
    });
  };

  return (
    <div className="w-full max-w-full space-y-6 overflow-hidden p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-900 text-white">
            <History size={24} />
          </div>

          <div>
            <h1 className="text-xl font-black uppercase tracking-tight text-gray-900 sm:text-2xl">
              Tactical Nexus
            </h1>
            <p className="mt-1 text-sm font-medium text-gray-500">
              Real-time system operations and admin activity logs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex">
          <button
            onClick={() => setDateFilter(new Date().toISOString().slice(0, 10))}
            className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50"
          >
            <Calendar size={16} />
            Today
          </button>

          <button
            onClick={exportLogs}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 text-xs font-black uppercase tracking-widest text-white hover:bg-black"
          >
            <Download size={16} />
            Export Intel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">{stat.icon}</div>
              <span className="rounded-full bg-gray-50 px-2 py-1 text-[10px] font-black uppercase text-gray-500">
                Live
              </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              {stat.label}
            </p>
            <h3 className="mt-1 text-3xl font-black text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-100 bg-gray-50/40 p-4 md:flex-row md:items-center md:justify-between md:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-gray-900 p-2 text-white">
                  <Terminal size={18} />
                </div>
                <h3 className="text-sm font-black uppercase text-gray-900">
                  System Stream
                </h3>
              </div>

              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search logs..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-xs font-black uppercase tracking-wider outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="divide-y divide-gray-50">
              {filteredLogs.map((log) => (
                <div key={log.id} className="flex flex-col gap-4 p-4 hover:bg-gray-50 sm:p-6 lg:flex-row">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${colorClass[log.color]}`}>
                    <Clock size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-black uppercase text-gray-900">
                          {log.user}
                        </p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                          {log.action}
                        </p>
                      </div>

                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                        {log.timestamp}
                      </p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 md:grid-cols-4">
                      <LogMeta label="Module" value={log.module} />
                      <LogMeta label="IP Addr" value={log.ip} />
                      <LogMeta label="ID Tag" value={log.id} />
                      <LogMeta label="Status" value={log.status} />
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveLog(log)}
                    className="flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 text-[10px] font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50"
                  >
                    <Eye size={15} />
                    View
                  </button>
                </div>
              ))}

              {filteredLogs.length === 0 && (
                <div className="p-10 text-center text-xs font-black uppercase tracking-widest text-gray-400">
                  No logs found
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 bg-gray-50/50 p-5 text-center">
              <button
                onClick={loadPreviousRecords}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:tracking-[0.3em]"
              >
                Load Previous Records
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="mb-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <Filter size={14} className="text-blue-600" />
              Filter Parameters
            </h3>

            <div className="space-y-4">
              <SelectBox label="Filter by Module" value={moduleFilter} onChange={setModuleFilter} options={modules} />
              <SelectBox label="Action Type" value={actionFilter} onChange={setActionFilter} options={actions} />

              <label className="block">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Date Range
                </span>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-xs font-black uppercase outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-1">
                <button
                  onClick={clearFilters}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white text-[10px] font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50"
                >
                  <RotateCcw size={15} />
                  Clear
                </button>

                <button
                  onClick={() => {}}
                  className="h-11 rounded-xl bg-blue-600 text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-700"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-gray-900 p-6 text-white">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-rose-600 p-2">
                <ShieldAlert size={20} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-rose-400">
                Security Notice
              </span>
            </div>
            <p className="text-xs font-bold uppercase leading-relaxed text-gray-400">
              All admin actions are logged and encrypted. Unauthorized access attempts trigger security review.
            </p>
          </div>
        </div>
      </div>

      {activeLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5">
          <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 p-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                  Log Details
                </p>
                <h3 className="mt-1 text-xl font-black text-gray-900">{activeLog.id}</h3>
              </div>
              <button onClick={() => setActiveLog(null)} className="rounded-xl border p-2 text-gray-500 hover:bg-gray-50">
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              <Detail label="User" value={activeLog.user} />
              <Detail label="Action" value={activeLog.action} />
              <Detail label="Module" value={activeLog.module} />
              <Detail label="IP Address" value={activeLog.ip} />
              <Detail label="Status" value={activeLog.status} />
              <Detail label="Time" value={activeLog.timestamp} />
            </div>

            <div className="border-t border-gray-100 p-5 text-right">
              <button
                onClick={() => setActiveLog(null)}
                className="rounded-xl bg-gray-900 px-5 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-black"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SelectBox = ({ label, value, onChange, options }) => (
  <label className="block">
    <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-xs font-black uppercase outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </label>
);

const LogMeta = ({ label, value }) => (
  <div>
    <p className="mb-1 text-[8px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </p>
    <p className="text-[10px] font-bold uppercase text-gray-900">{value}</p>
  </div>
);

const Detail = ({ label, value }) => (
  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </p>
    <p className="mt-2 text-sm font-black text-gray-900">{value}</p>
  </div>
);

export default ActivityLogs;