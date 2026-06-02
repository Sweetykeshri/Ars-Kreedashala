import React, { useMemo, useState } from "react";
import {
  Clock,
  Calendar,
  Activity,
  BarChart3,
  MapPin,
  Filter,
  FileDown,
  UserCheck,
  Zap,
  X,
  Search,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const weeklyAttendance = [
  { day: "MON", student: 92, coach: 100 },
  { day: "TUE", student: 88, coach: 95 },
  { day: "WED", student: 95, coach: 100 },
  { day: "THU", student: 84, coach: 90 },
  { day: "FRI", student: 90, coach: 100 },
  { day: "SAT", student: 98, coach: 100 },
  { day: "SUN", student: 96, coach: 95 },
];

const batchAttendance = [
  { name: "Elite Crkt", rate: 96 },
  { name: "Junior Foot", rate: 82 },
  { name: "Pro Badmn", rate: 91 },
  { name: "Dev Unit", rate: 75 },
];

const attendanceSummary = [
  { name: "Sector A (Ground)", expected: 120, present: 112, coach: "Rabindra S." },
  { name: "Sector B (Nets)", expected: 45, present: 42, coach: "Ankita M." },
  { name: "Indoor Hall", expected: 30, present: 28, coach: "Priya D." },
  { name: "Strength Lab", expected: 25, present: 18, coach: "Sushant S." },
];

const AttendanceAnalytics = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [sectorFilter, setSectorFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredSummary = useMemo(() => {
    const query = search.trim().toLowerCase();

    return attendanceSummary.filter((item) => {
      const matchSector = sectorFilter === "All" || item.name === sectorFilter;
      const matchSearch =
        !query || `${item.name} ${item.coach}`.toLowerCase().includes(query);

      return matchSector && matchSearch;
    });
  }, [sectorFilter, search]);

  const avgAttendance = Math.round(
    weeklyAttendance.reduce((sum, item) => sum + item.student, 0) /
      weeklyAttendance.length
  );

  const avgCoach = Math.round(
    weeklyAttendance.reduce((sum, item) => sum + item.coach, 0) /
      weeklyAttendance.length
  );

  const totalExpected = filteredSummary.reduce(
    (sum, item) => sum + item.expected,
    0
  );

  const totalPresent = filteredSummary.reduce(
    (sum, item) => sum + item.present,
    0
  );

  const deficiency = totalExpected
    ? Math.round(((totalExpected - totalPresent) / totalExpected) * 100)
    : 0;

  const exportCSV = (fileName = "attendance-report.csv") => {
    const rows = [
      ["Sector/Location", "Expected", "Present", "Integrity", "Coach"],
      ...filteredSummary.map((item) => [
        item.name,
        item.expected,
        item.present,
        `${Math.round((item.present / item.expected) * 100)}%`,
        item.coach,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
  };

  const resetFilter = () => {
    setSectorFilter("All");
    setSearch("");
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-5 p-3 pb-10 sm:p-5 md:p-6 lg:p-8">
      <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:h-12 sm:w-12">
              <Clock size={24} />
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-black uppercase leading-tight text-gray-900 sm:text-xl md:text-2xl">
                Deployment:{" "}
                <span className="text-blue-600">Attendance Tracker</span>
              </h1>

              <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
                Operational efficiency and personnel presence metrics.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex">
            <button
              type="button"
              onClick={() => setShowFilter((prev) => !prev)}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white px-4 text-xs font-black uppercase text-gray-600 shadow-sm hover:bg-gray-50"
            >
              {showFilter ? <X size={16} /> : <Filter size={16} />}
              {showFilter ? "Close Filter" : "Filter"}
            </button>

            <button
              type="button"
              onClick={() => exportCSV("attendance-intel-report.csv")}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 text-xs font-black uppercase text-white shadow-lg hover:bg-black"
            >
              <FileDown size={16} />
              Export Intel
            </button>
          </div>
        </div>

        {showFilter && (
          <div className="mt-5 grid grid-cols-1 gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search sector or coach..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Sectors</option>
              {attendanceSummary.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={resetFilter}
              className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black uppercase text-gray-600 hover:bg-gray-50"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() => setShowFilter(false)}
              className="h-11 rounded-xl bg-blue-600 px-4 text-xs font-black uppercase text-white hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Avg Attendance"
          value={`${avgAttendance}%`}
          detail="Academy Wide"
          icon={<Activity size={20} />}
          color="emerald"
        />

        <StatCard
          title="Coach Presence"
          value={`${avgCoach}%`}
          detail="Instructional Staff"
          icon={<UserCheck size={20} />}
          color="blue"
        />

        <StatCard
          title="Deficiency"
          value={`${deficiency}%`}
          detail="Absent / Leave Rate"
          icon={<Clock size={20} />}
          color="rose"
        />

        <StatCard
          title="Peak Window"
          value="06-08"
          detail="AM Session Ops"
          icon={<Calendar size={20} />}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="min-w-0 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 md:p-6 xl:col-span-2 xl:p-8">
          <div className="mb-5">
            <h3 className="text-sm font-black uppercase text-gray-900">
              System Presence Index
            </h3>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Personnel vs student daily flow
            </p>
          </div>

          <div className="h-[240px] w-full min-w-0 sm:h-[290px] md:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyAttendance}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                />

                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 900, fill: "#9ca3af" }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 900, fill: "#9ca3af" }}
                  tickFormatter={(value) => `${value}%`}
                  width={35}
                />

                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="student"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="Students"
                  dot={{ r: 3 }}
                />

                <Line
                  type="monotone"
                  dataKey="coach"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  name="Coaches"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 md:p-6 xl:p-8">
          <h3 className="mb-5 text-sm font-black uppercase text-gray-900">
            Unit Performance
          </h3>

          <div className="space-y-4">
            {batchAttendance.map((batch) => (
              <div
                key={batch.name}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
              >
                <div className="mb-3 flex justify-between gap-3">
                  <span className="text-[10px] font-black uppercase text-gray-900">
                    {batch.name}
                  </span>

                  <span className="text-[10px] font-black text-blue-600">
                    {batch.rate}%
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${batch.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowAudit(true)}
            className="mt-6 w-full rounded-xl bg-gray-900 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-black"
          >
            Audit Units
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 bg-gray-50/50 p-4 md:flex-row md:items-center md:justify-between md:p-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="shrink-0 text-blue-600" size={20} />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-900">
              Sector Deployment Report
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:flex">
            <button
              type="button"
              onClick={() => setShowFilter((prev) => !prev)}
              className="flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-[10px] font-black uppercase text-gray-600 hover:bg-gray-50"
            >
              <Filter size={14} />
              Filter
            </button>

            <button
              type="button"
              onClick={() => exportCSV("global-attendance-report.csv")}
              className="flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-[10px] font-black uppercase text-white hover:bg-blue-700"
            >
              <FileDown size={14} />
              Global Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {filteredSummary.map((item) => (
            <SectorCard key={item.name} item={item} />
          ))}

          {!filteredSummary.length && (
            <p className="py-8 text-center text-xs font-black uppercase tracking-widest text-gray-400">
              No sectors found
            </p>
          )}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="bg-white">
                <TableHead>Sector / Location</TableHead>
                <TableHead center>Expected</TableHead>
                <TableHead center>Present</TableHead>
                <TableHead center>Integrity</TableHead>
                <TableHead>Coach</TableHead>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50 text-xs">
              {filteredSummary.map((item) => {
                const integrity = Math.round(
                  (item.present / item.expected) * 100
                );

                return (
                  <tr key={item.name} className="hover:bg-blue-50/30">
                    <td className="px-5 py-5 font-bold text-gray-900">
                      <div className="flex items-center gap-2">
                        <MapPin size={12} className="text-gray-300" />
                        {item.name}
                      </div>
                    </td>

                    <td className="px-5 py-5 text-center text-gray-500">
                      {item.expected}
                    </td>

                    <td className="px-5 py-5 text-center font-black text-gray-900">
                      {item.present}
                    </td>

                    <td className="px-5 py-5 text-center">
                      <span className="font-black text-emerald-600">
                        {integrity}%
                      </span>

                      {integrity > 90 && (
                        <Zap
                          size={12}
                          className="ml-1 inline text-emerald-500"
                        />
                      )}
                    </td>

                    <td className="px-5 py-5 font-bold text-gray-500">
                      {item.coach}
                    </td>
                  </tr>
                );
              })}

              {!filteredSummary.length && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-xs font-black uppercase tracking-widest text-gray-400"
                  >
                    No sectors found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 bg-gray-50/40 p-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Showing {filteredSummary.length} sectors
          </p>
        </div>
      </div>

      {showAudit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-5">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-black text-gray-900">Unit Audit Summary</h3>

              <button
                type="button"
                onClick={() => setShowAudit(false)}
                className="rounded-xl p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {batchAttendance.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-xl bg-gray-50 p-4"
                >
                  <span className="font-bold text-gray-800">{item.name}</span>
                  <span className="font-black text-blue-600">{item.rate}%</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowAudit(false)}
              className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-xs font-black uppercase text-white hover:bg-blue-700"
            >
              Close Audit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, detail, icon, color }) => {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    rose: "bg-rose-50 text-rose-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 md:p-6">
      <div className={`mb-4 w-fit rounded-2xl p-3 ${colors[color]}`}>
        {icon}
      </div>

      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        {title}
      </p>

      <h3 className="mt-1 text-2xl font-black text-gray-900 sm:text-3xl">
        {value}
      </h3>

      <p className="mt-1 text-xs font-bold text-gray-400">{detail}</p>
    </div>
  );
};

const SectorCard = ({ item }) => {
  const integrity = Math.round((item.present / item.expected) * 100);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-black text-gray-900">
            <MapPin size={14} className="shrink-0 text-blue-600" />
            <span className="break-words">{item.name}</span>
          </p>

          <p className="mt-1 text-xs font-bold text-gray-400">
            Coach: {item.coach}
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black text-emerald-600">
          {integrity}%
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Mini label="Expected" value={item.expected} />
        <Mini label="Present" value={item.present} />
      </div>
    </div>
  );
};

const Mini = ({ label, value }) => (
  <div className="rounded-2xl bg-gray-50 p-3">
    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </p>

    <p className="mt-1 text-xl font-black text-gray-900">{value}</p>
  </div>
);

const TableHead = ({ children, center }) => (
  <th
    className={`px-5 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400 ${
      center ? "text-center" : ""
    }`}
  >
    {children}
  </th>
);

export default AttendanceAnalytics;