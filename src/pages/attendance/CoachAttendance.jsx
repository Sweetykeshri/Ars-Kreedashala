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

const STORAGE_KEY = "ars_coach_attendance_register";

const coachesData = [
  { id: "CH001", name: "Rajesh Patil", role: "Head Cricket Coach", sport: "Cricket", batch: "Advanced Cricket", ground: "Cricket Ground A" },
  { id: "CH002", name: "Sushil Das", role: "Football Coach", sport: "Football", batch: "Junior Football", ground: "Football Turf" },
  { id: "CH003", name: "Anjali Shah", role: "Badminton Trainer", sport: "Badminton", batch: "Adults Morning", ground: "Court 1 & 2" },
  { id: "CH004", name: "Vinay Kumar", role: "Athletics Coach", sport: "Athletics", batch: "Track & Field", ground: "Main Track" },
  { id: "CH005", name: "Vikram Batra", role: "Senior Cricket Coach", sport: "Cricket", batch: "Morning Elite", ground: "Net 1" },
  { id: "CH006", name: "Anjali Menon", role: "Senior Football Coach", sport: "Football", batch: "Evening Juniors", ground: "Field 2" },
  { id: "CH007", name: "Sandeep Singh", role: "Fitness Lead", sport: "Fitness", batch: "Morning Fitness", ground: "Fitness Zone" },
  { id: "CH008", name: "Zoya Khan", role: "Girls Football Coach", sport: "Football", batch: "Evening Girls", ground: "Football Turf" },
];

const statusOptions = [
  { value: "", label: "-" },
  { value: "P", label: "P" },
  { value: "A", label: "A" },
  { value: "HD", label: "HD" },
  { value: "H", label: "H" },
];

const statusInfo = {
  P: { label: "Present", icon: CheckCircle2, bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", solid: "bg-emerald-600" },
  A: { label: "Absent", icon: XCircle, bg: "bg-red-50", text: "text-red-700", border: "border-red-200", solid: "bg-red-600" },
  HD: { label: "Half Day", icon: Clock, bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", solid: "bg-amber-600" },
  H: { label: "Holiday", icon: AlertCircle, bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", solid: "bg-purple-600" },
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

const CoachAttendance = () => {
  const today = getDateKey(new Date());

  const [selectedDate, setSelectedDate] = useState(today);
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("All");
  const [attendance, setAttendance] = useState(() => readStorage());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(attendance));
  }, [attendance]);

  const visibleDates = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(selectedDate, i - 6)),
    [selectedDate]
  );

  const sports = useMemo(
    () => ["All", ...new Set(coachesData.map((coach) => coach.sport))],
    []
  );

  const filteredCoaches = useMemo(() => {
    const q = search.toLowerCase().trim();

    return coachesData.filter((coach) => {
      const text = `${coach.id} ${coach.name} ${coach.role} ${coach.sport} ${coach.batch} ${coach.ground}`.toLowerCase();
      return (!q || text.includes(q)) && (sport === "All" || coach.sport === sport);
    });
  }, [search, sport]);

  const counts = useMemo(() => {
    const total = { P: 0, A: 0, HD: 0, H: 0 };

    filteredCoaches.forEach((coach) => {
      const value = attendance[coach.id]?.[selectedDate];
      if (total[value] !== undefined) total[value] += 1;
    });

    return total;
  }, [attendance, filteredCoaches, selectedDate]);

  const updateAttendance = (coachId, date, value) => {
    setAttendance((prev) => ({
      ...prev,
      [coachId]: {
        ...(prev[coachId] || {}),
        [date]: value,
      },
    }));
  };

  const markAll = (value) => {
    setAttendance((prev) => {
      const next = { ...prev };

      filteredCoaches.forEach((coach) => {
        next[coach.id] = {
          ...(next[coach.id] || {}),
          [selectedDate]: value,
        };
      });

      return next;
    });
  };

  const exportCSV = () => {
    const header = ["Coach ID", "Name", "Role", "Sport", "Batch", "Ground", ...visibleDates.map(formatDate)];
    const rows = filteredCoaches.map((coach) => [
      coach.id,
      coach.name,
      coach.role,
      coach.sport,
      coach.batch,
      coach.ground,
      ...visibleDates.map((date) => attendance[coach.id]?.[date] || "-"),
    ]);

    const csv = [header, ...rows]
      .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `coach-attendance-${selectedDate}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusClass = (value) => {
    if (!value) return "bg-white text-gray-400 border-gray-200";
    const item = statusInfo[value];
    return `${item.bg} ${item.text} ${item.border}`;
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-5 p-3 pb-10 sm:p-5 lg:p-8">
      <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#8B8B00]/10 text-[#8B8B00]">
              <CalendarDays size={23} />
            </div>

            <div>
              <h1 className="text-xl font-black uppercase text-gray-900 sm:text-2xl">
                Coach Attendance Register
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
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm font-bold outline-none focus:border-[#8B8B00] sm:w-44"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 sm:flex">
              <button
                type="button"
                onClick={() => setSelectedDate(addDays(selectedDate, -1))}
                className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-gray-600 hover:bg-gray-50"
              >
                <ChevronLeft size={18} className="mx-auto" />
              </button>

              <button
                type="button"
                onClick={() => setSelectedDate(today)}
                className="h-11 rounded-xl bg-gray-900 px-4 text-[10px] font-black uppercase text-white hover:bg-gray-800"
              >
                Today
              </button>

              <button
                type="button"
                onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-gray-600 hover:bg-gray-50"
              >
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
              onClick={() => markAll("")}
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
              placeholder="Search coach name, ID, role, sport or batch..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm font-semibold outline-none focus:border-[#8B8B00]"
            />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex">
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-bold outline-none focus:border-[#8B8B00]"
            >
              {sports.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Sports" : item}
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
          {filteredCoaches.map((coach) => (
            <div key={coach.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <CoachInfo coach={coach} />

              <div className="mt-4 grid grid-cols-2 gap-3">
                {visibleDates.map((date) => {
                  const value = attendance[coach.id]?.[date] || "";

                  return (
                    <div key={date} className="rounded-2xl bg-gray-50 p-3">
                      <p className="text-[10px] font-black uppercase text-gray-500">
                        {formatDay(date)} • {formatDate(date)}
                      </p>

                      <select
                        value={value}
                        onChange={(e) => updateAttendance(coach.id, date, e.target.value)}
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

          {!filteredCoaches.length && (
            <p className="py-8 text-center text-xs font-black uppercase tracking-widest text-gray-400">
              No coaches found
            </p>
          )}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[1080px] border-collapse text-left">
            <thead>
              <tr className="bg-gray-50">
                <th className="sticky left-0 z-20 min-w-[300px] border-b border-r border-gray-100 bg-gray-50 px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                  Coach Details
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
              {filteredCoaches.map((coach) => (
                <tr key={coach.id} className="group border-b border-gray-100 hover:bg-gray-50">
                  <td className="sticky left-0 z-10 border-r border-gray-100 bg-white px-5 py-4 group-hover:bg-gray-50">
                    <CoachInfo coach={coach} />
                  </td>

                  {visibleDates.map((date) => {
                    const value = attendance[coach.id]?.[date] || "";

                    return (
                      <td key={`${coach.id}-${date}`} className={`border-r border-gray-100 px-3 py-4 text-center ${date === selectedDate ? "bg-[#8B8B00]/5" : ""}`}>
                        <select
                          value={value}
                          onChange={(e) => updateAttendance(coach.id, date, e.target.value)}
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

              {!filteredCoaches.length && (
                <tr>
                  <td colSpan={visibleDates.length + 1} className="px-6 py-12 text-center text-xs font-black uppercase tracking-widest text-gray-400">
                    No coaches found
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
            Showing {filteredCoaches.length} of {coachesData.length} coaches
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

const CoachInfo = ({ coach }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#8B8B00]/10 text-xs font-black text-[#8B8B00]">
      {coach.name.split(" ").map((w) => w[0]).join("")}
    </div>

    <div className="min-w-0">
      <p className="truncate text-sm font-black uppercase text-gray-900">{coach.name}</p>
      <p className="mt-0.5 truncate text-[10px] font-bold uppercase tracking-wide text-gray-400">
        {coach.id} • {coach.sport}
      </p>
      <p className="mt-0.5 truncate text-[10px] font-bold text-gray-500">
        {coach.role}
      </p>
      <p className="mt-0.5 truncate text-[10px] font-bold text-gray-400">
        {coach.batch} • {coach.ground}
      </p>
    </div>
  </div>
);

export default CoachAttendance;