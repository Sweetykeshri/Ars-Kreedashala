import React, { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

const STORAGE_KEY = "ars_player_attendance_register";

const playersData = [
  { id: "STU001", name: "Arjun Sharma", batch: "B1 - Cricket", sport: "Cricket" },
  { id: "STU002", name: "Suhani Rao", batch: "B2 - Football", sport: "Football" },
  { id: "STU003", name: "Ishaan Gupta", batch: "B1 - Cricket", sport: "Cricket" },
  { id: "STU004", name: "Riya Verma", batch: "B3 - Badminton", sport: "Badminton" },
  { id: "STU005", name: "Kabir Singh", batch: "B2 - Football", sport: "Football" },
  { id: "STU006", name: "Ananya Das", batch: "B3 - Badminton", sport: "Badminton" },
  { id: "STU007", name: "Rahul Kumar", batch: "B4 - Fitness", sport: "Fitness" },
  { id: "STU008", name: "Priya Singh", batch: "B2 - Football", sport: "Football" },
];

const statusOptions = [
  { value: "", label: "-" },
  { value: "P", label: "P" },
  { value: "A", label: "A" },
  { value: "HD", label: "HD" },
  { value: "H", label: "H" },
];

const statusInfo = {
  P: { label: "Present", icon: CheckCircle2, text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", solid: "bg-emerald-600" },
  A: { label: "Absent", icon: XCircle, text: "text-red-700", bg: "bg-red-50", border: "border-red-200", solid: "bg-red-600" },
  HD: { label: "Half Day", icon: Clock, text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200", solid: "bg-amber-600" },
  H: { label: "Holiday", icon: AlertCircle, text: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200", solid: "bg-purple-600" },
};

const getDateKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const parseDate = (key) => {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const addDays = (key, days) => {
  const date = parseDate(key);
  date.setDate(date.getDate() + days);
  return getDateKey(date);
};

const formatDate = (key) =>
  parseDate(key).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });

const formatDay = (key) =>
  parseDate(key).toLocaleDateString("en-IN", { weekday: "short" });

const readStorage = () => {
  try {
    if (typeof window === "undefined") return {};
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const StudentAttendance = () => {
  const today = getDateKey(new Date());

  const [selectedDate, setSelectedDate] = useState(today);
  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState("All");
  const [attendance, setAttendance] = useState(() => readStorage());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attendance));
  }, [attendance]);

  const visibleDates = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(selectedDate, i - 6)),
    [selectedDate]
  );

  const batches = useMemo(
    () => ["All", ...new Set(playersData.map((p) => p.batch))],
    []
  );

  const filteredPlayers = useMemo(() => {
    const q = search.toLowerCase().trim();

    return playersData.filter((p) => {
      const matchSearch = !q || `${p.id} ${p.name} ${p.batch} ${p.sport}`.toLowerCase().includes(q);
      const matchBatch = batch === "All" || p.batch === batch;
      return matchSearch && matchBatch;
    });
  }, [search, batch]);

  const counts = useMemo(() => {
    const total = { P: 0, A: 0, HD: 0, H: 0 };

    filteredPlayers.forEach((p) => {
      const value = attendance[p.id]?.[selectedDate];
      if (total[value] !== undefined) total[value] += 1;
    });

    return total;
  }, [attendance, filteredPlayers, selectedDate]);

  const updateAttendance = (playerId, date, value) => {
    setAttendance((prev) => ({
      ...prev,
      [playerId]: {
        ...(prev[playerId] || {}),
        [date]: value,
      },
    }));
  };

  const markAll = (value) => {
    setAttendance((prev) => {
      const next = { ...prev };

      filteredPlayers.forEach((p) => {
        next[p.id] = {
          ...(next[p.id] || {}),
          [selectedDate]: value,
        };
      });

      return next;
    });
  };

  const clearDate = () => markAll("");

  const exportCSV = () => {
    const header = ["Player ID", "Name", "Batch", "Sport", ...visibleDates.map(formatDate)];
    const rows = filteredPlayers.map((p) => [
      p.id,
      p.name,
      p.batch,
      p.sport,
      ...visibleDates.map((d) => attendance[p.id]?.[d] || "-"),
    ]);

    const csv = [header, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance-${selectedDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusClass = (value) => {
    if (!value) return "bg-white text-gray-400 border-gray-200";
    const s = statusInfo[value];
    return `${s.bg} ${s.text} ${s.border}`;
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-5 p-3 pb-10 sm:p-5 lg:p-8">
      <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#8B8B00]/10 text-[#8B8B00] sm:h-12 sm:w-12">
              <CalendarDays size={23} />
            </div>

            <div>
              <h1 className="text-xl font-black uppercase tracking-tight text-gray-900 sm:text-2xl">
                Player Attendance Register
              </h1>
              <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
                Manual register view with P, A, HD and H marking.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center xl:justify-end">
            <div className="relative w-full sm:w-auto">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm font-bold outline-none focus:border-[#8B8B00] focus:bg-white sm:w-44"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 sm:flex">
              <button type="button" onClick={() => setSelectedDate(addDays(selectedDate, -1))} className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-gray-600 hover:bg-gray-50">
                <ChevronLeft size={18} className="mx-auto" />
              </button>

              <button type="button" onClick={() => setSelectedDate(today)} className="h-11 rounded-xl bg-gray-900 px-4 text-[10px] font-black uppercase tracking-widest text-white hover:bg-gray-800">
                Today
              </button>

              <button type="button" onClick={() => setSelectedDate(addDays(selectedDate, 1))} className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-gray-600 hover:bg-gray-50">
                <ChevronRight size={18} className="mx-auto" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {Object.entries(statusInfo).map(([key, item]) => {
            const Icon = item.icon;

            return (
              <div key={key} className={`rounded-2xl border p-4 ${item.bg} ${item.border}`}>
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className={`text-[9px] font-black uppercase tracking-widest ${item.text}`}>
                      Total {item.label}
                    </p>
                    <h3 className={`mt-1 text-2xl font-black sm:text-3xl ${item.text}`}>
                      {counts[key]}
                    </h3>
                  </div>

                  <div className={`rounded-xl p-2.5 text-white ${item.solid}`}>
                    <Icon size={18} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            <BulkButton text="Mark All P" color="bg-emerald-600 hover:bg-emerald-700" onClick={() => markAll("P")} />
            <BulkButton text="Mark All A" color="bg-red-600 hover:bg-red-700" onClick={() => markAll("A")} />
            <BulkButton text="Mark All HD" color="bg-amber-600 hover:bg-amber-700" onClick={() => markAll("HD")} />
            <BulkButton text="Mark All H" color="bg-purple-600 hover:bg-purple-700" onClick={() => markAll("H")} />

            <button
              type="button"
              onClick={clearDate}
              className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50 sm:col-span-1"
            >
              <RotateCcw size={14} />
              Clear
            </button>
          </div>

          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Summary for {formatDate(selectedDate)}
          </p>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search player name, ID, batch or sport..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm font-semibold outline-none focus:border-[#8B8B00] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex">
            <select
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-bold outline-none focus:border-[#8B8B00] focus:bg-white"
            >
              {batches.map((b) => (
                <option key={b} value={b}>
                  {b === "All" ? "All Batches" : b}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={exportCSV}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-50"
            >
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        <div className="block space-y-4 p-4 md:hidden">
          {filteredPlayers.map((player) => (
            <div key={player.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <PlayerInfo player={player} />

              <div className="mt-4 grid grid-cols-2 gap-3">
                {visibleDates.map((date) => {
                  const value = attendance[player.id]?.[date] || "";

                  return (
                    <div key={date} className="rounded-2xl bg-gray-50 p-3">
                      <p className="text-[10px] font-black uppercase text-gray-500">
                        {formatDay(date)} • {formatDate(date)}
                      </p>

                      <select
                        value={value}
                        onChange={(e) => updateAttendance(player.id, date, e.target.value)}
                        className={`mt-2 h-10 w-full rounded-xl border px-2 text-center text-xs font-black outline-none ${statusClass(value)}`}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {!filteredPlayers.length && (
            <p className="py-8 text-center text-xs font-black uppercase tracking-widest text-gray-400">
              No players found
            </p>
          )}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[980px] border-collapse text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="sticky left-0 z-20 min-w-[260px] border-b border-r border-gray-100 bg-gray-50 px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                  Player Details
                </th>

                {visibleDates.map((date) => (
                  <th
                    key={date}
                    className={`min-w-[112px] border-b border-r border-gray-100 px-3 py-4 text-center ${
                      date === selectedDate ? "bg-[#8B8B00]/10" : "bg-gray-50"
                    }`}
                  >
                    <p className={`text-[10px] font-black uppercase tracking-widest ${date === selectedDate ? "text-[#8B8B00]" : "text-gray-500"}`}>
                      {formatDay(date)}
                    </p>
                    <p className={`mt-1 text-xs font-black ${date === selectedDate ? "text-[#8B8B00]" : "text-gray-800"}`}>
                      {formatDate(date)}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="group border-b border-gray-100 hover:bg-gray-50">
                  <td className="sticky left-0 z-10 border-r border-gray-100 bg-white px-5 py-4 group-hover:bg-gray-50">
                    <PlayerInfo player={player} />
                  </td>

                  {visibleDates.map((date) => {
                    const value = attendance[player.id]?.[date] || "";

                    return (
                      <td key={`${player.id}-${date}`} className={`border-r border-gray-100 px-3 py-4 text-center ${date === selectedDate ? "bg-[#8B8B00]/5" : ""}`}>
                        <select
                          value={value}
                          onChange={(e) => updateAttendance(player.id, date, e.target.value)}
                          className={`h-10 w-full rounded-xl border px-2 text-center text-xs font-black uppercase outline-none focus:ring-2 focus:ring-[#8B8B00]/20 ${statusClass(value)}`}
                        >
                          {statusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>

                        <p className="mt-1 text-[9px] font-bold uppercase text-gray-400">
                          {value ? statusInfo[value].label : "Not Marked"}
                        </p>
                      </td>
                    );
                  })}
                </tr>
              ))}

              {!filteredPlayers.length && (
                <tr>
                  <td colSpan={visibleDates.length + 1} className="px-6 py-12 text-center text-xs font-black uppercase tracking-widest text-gray-400">
                    No players found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-gray-100 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            {Object.entries(statusInfo).map(([key, info]) => (
              <div key={key} className="flex items-center gap-2">
                <span className={`flex h-6 min-w-9 items-center justify-center rounded-lg border px-2 text-[10px] font-black ${info.bg} ${info.text} ${info.border}`}>
                  {key}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {info.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Showing {filteredPlayers.length} of {playersData.length} players
          </p>
        </div>
      </div>
    </div>
  );
};

const BulkButton = ({ text, color, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`rounded-xl px-3 py-2.5 text-[10px] font-black uppercase tracking-widest text-white ${color}`}
  >
    {text}
  </button>
);

const PlayerInfo = ({ player }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#8B8B00]/10 text-xs font-black text-[#8B8B00]">
      {player.name.split(" ").map((w) => w[0]).join("")}
    </div>

    <div className="min-w-0">
      <p className="truncate text-sm font-black uppercase text-gray-900">{player.name}</p>
      <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-400">
        {player.id} • {player.sport}
      </p>
      <p className="mt-0.5 text-[10px] font-bold text-gray-500">{player.batch}</p>
    </div>
  </div>
);

export default StudentAttendance;