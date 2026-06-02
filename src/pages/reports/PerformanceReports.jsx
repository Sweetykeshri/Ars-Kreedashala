import React, { useMemo, useState } from "react";
import {
  Trophy,
  Target,
  Zap,
  TrendingUp,
  Search,
  Filter,
  ChevronRight,
  TrendingDown,
  Award,
  Medal,
  Activity,
  UserPlus,
  X,
  FileDown,
  RotateCcw,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const athleteStats = [
  { subject: "Speed", A: 120, B: 110, fullMark: 150 },
  { subject: "Endurance", A: 98, B: 130, fullMark: 150 },
  { subject: "Technique", A: 86, B: 130, fullMark: 150 },
  { subject: "Power", A: 99, B: 100, fullMark: 150 },
  { subject: "Discipline", A: 100, B: 90, fullMark: 150 },
  { subject: "Strategy", A: 65, B: 85, fullMark: 150 },
];

const tournamentData = [
  { year: "2021", wins: 45, total: 60 },
  { year: "2022", wins: 52, total: 65 },
  { year: "2023", wins: 68, total: 80 },
  { year: "2024", wins: 42, total: 48 },
];

const rankingsData = [
  { rank: "01", name: "Arnav Sharma", badge: "ELITE-92", rating: 9.8, trend: "up", sport: "Cricket" },
  { rank: "02", name: "Sanya Das", badge: "PRO-12", rating: 9.5, trend: "up", sport: "Badminton" },
  { rank: "03", name: "Kabir Roy", badge: "ELITE-44", rating: 9.2, trend: "down", sport: "Football" },
  { rank: "04", name: "Priya Mehra", badge: "DEV-88", rating: 8.9, trend: "up", sport: "Fitness" },
];

const PerformanceReports = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [showRankings, setShowRankings] = useState(false);
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("All");
  const [trendFilter, setTrendFilter] = useState("All");

  const filteredRankings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rankingsData.filter((item) => {
      const matchSearch =
        !query ||
        `${item.rank} ${item.name} ${item.badge} ${item.sport}`
          .toLowerCase()
          .includes(query);

      const matchSport = sportFilter === "All" || item.sport === sportFilter;
      const matchTrend = trendFilter === "All" || item.trend === trendFilter;

      return matchSearch && matchSport && matchTrend;
    });
  }, [search, sportFilter, trendFilter]);

  const resetFilter = () => {
    setSearch("");
    setSportFilter("All");
    setTrendFilter("All");
  };

  const exportIntel = () => {
    const rows = [
      ["Performance Intelligence Report"],
      ["Sport Filter", sportFilter],
      ["Trend Filter", trendFilter],
      [],
      ["Rank", "Athlete", "Badge", "Sport", "Rating", "Trend"],
      ...filteredRankings.map((item) => [
        item.rank,
        item.name,
        item.badge,
        item.sport,
        item.rating,
        item.trend,
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
    link.download = "performance-intelligence-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-6 p-3 pb-10 sm:p-5 md:p-6 lg:p-8">
      <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 md:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:h-12 sm:w-12">
              <Trophy size={24} />
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-black uppercase leading-tight text-gray-900 sm:text-xl md:text-2xl">
                Command:{" "}
                <span className="text-blue-600">
                  Performance Intelligence
                </span>
              </h1>

              <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
                End-to-end athlete proficiency and growth surveillance.
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
              onClick={exportIntel}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 text-xs font-black uppercase text-white shadow-lg hover:bg-black"
            >
              <FileDown size={16} />
              Export Intel
            </button>
          </div>
        </div>

        {showFilter && (
          <div className="mt-5 grid grid-cols-1 gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:grid-cols-2 xl:grid-cols-5">
            <div className="relative sm:col-span-2 xl:col-span-2">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search athlete, badge or sport..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["All", "Cricket", "Football", "Badminton", "Fitness"].map(
                (item) => (
                  <option key={item}>{item}</option>
                )
              )}
            </select>

            <select
              value={trendFilter}
              onChange={(e) => setTrendFilter(e.target.value)}
              className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Trends</option>
              <option value="up">Up</option>
              <option value="down">Down</option>
            </select>

            <button
              type="button"
              onClick={resetFilter}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black uppercase text-gray-600 hover:bg-gray-50"
            >
              <RotateCcw size={15} />
              Reset
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Elite Athletes" value="42" detail="Rating > 9.0" icon={<Medal size={20} />} color="blue" />
        <StatCard title="Avg Proficiency" value="84.2%" detail="Skills Index" icon={<Activity size={20} />} color="emerald" />
        <StatCard title="Tourney Wins" value="182" detail="State / National" icon={<Trophy size={20} />} color="amber" />
        <StatCard title="Growth Rate" value="76%" detail="Personal Best Delta" icon={<TrendingUp size={20} />} color="purple" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <ChartCard
          title="Competency Matrix"
          subtitle="Cross-discipline assessment radar"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={athleteStats}>
              <PolarGrid stroke="#f3f4f6" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 10, fontWeight: 900, fill: "#9ca3af" }}
              />
              <Radar
                name="Current Batch"
                dataKey="A"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.35}
              />
              <Radar
                name="Benchmark"
                dataKey="B"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.18}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Victory Analytics"
          subtitle="Tournament conversion history"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tournamentData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: 900, fill: "#9ca3af" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: 900, fill: "#9ca3af" }}
                width={35}
              />
              <Tooltip />
              <Bar dataKey="wins" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="total" fill="#e5e7eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm xl:col-span-2">
          <div className="flex flex-col gap-3 border-b border-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <h3 className="text-sm font-black uppercase text-gray-900">
              Academy Alpha:{" "}
              <span className="text-blue-600">Leaderboard</span>
            </h3>

            <button
              type="button"
              onClick={() => setShowRankings(true)}
              className="flex items-center justify-center gap-1 rounded-xl bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-100"
            >
              Full Rankings
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
            {filteredRankings.map((rank, index) => (
              <RankCard key={rank.rank} rank={rank} index={index} />
            ))}

            {!filteredRankings.length && (
              <p className="py-8 text-center text-xs font-black uppercase tracking-widest text-gray-400">
                No rankings found
              </p>
            )}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <TableHead>Rank</TableHead>
                  <TableHead>Athlete</TableHead>
                  <TableHead>Sport</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead right>Trend</TableHead>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50 text-xs font-black uppercase">
                {filteredRankings.map((rank, index) => (
                  <tr key={rank.rank} className="hover:bg-gray-50/50">
                    <td className="px-5 py-5">
                      <RankBadge rank={rank.rank} active={index === 0} />
                    </td>

                    <td className="px-5 py-5 text-gray-900">{rank.name}</td>
                    <td className="px-5 py-5 text-gray-500">{rank.sport}</td>
                    <td className="px-5 py-5 italic text-gray-400">{rank.badge}</td>

                    <td className="px-5 py-5">
                      <div className="flex items-center gap-1">
                        <Zap size={14} className="text-blue-500" />
                        <span>{rank.rating}</span>
                      </div>
                    </td>

                    <td className="px-5 py-5 text-right">
                      {rank.trend === "up" ? (
                        <TrendingUp size={16} className="inline text-emerald-500" />
                      ) : (
                        <TrendingDown size={16} className="inline text-rose-500" />
                      )}
                    </td>
                  </tr>
                ))}

                {!filteredRankings.length && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-xs font-black uppercase tracking-widest text-gray-400"
                    >
                      No rankings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-100 bg-gray-50/40 p-4 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Showing {filteredRankings.length} athletes
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl bg-gradient-to-br from-gray-900 to-black p-5 text-white shadow-xl sm:p-6 lg:p-8">
            <div className="mb-6 flex items-start justify-between">
              <div className="rounded-2xl bg-white/10 p-3">
                <Target size={24} className="text-blue-400" />
              </div>
              <Award size={24} className="text-white/20" />
            </div>

            <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
              Operational Goal
            </p>

            <h4 className="mb-4 text-xl font-black uppercase leading-tight sm:text-2xl">
              Target: Elite Conversion 85%
            </h4>

            <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[72%] rounded-full bg-blue-500" />
            </div>

            <p className="text-[10px] font-bold uppercase italic text-gray-500">
              Current Progress: 72.4% System Wide
            </p>
          </div>

          <div className="flex items-center gap-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
              <UserPlus size={20} />
            </div>

            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                Next Talent Scout
              </p>
              <p className="text-xs font-black uppercase text-gray-900">
                State Open Trials • 25 MAY
              </p>
            </div>
          </div>
        </div>
      </div>

      {showRankings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-5">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-black uppercase text-gray-900">
                  Full Rankings
                </h3>
                <p className="text-xs font-bold text-gray-400">
                  Filtered athlete leaderboard.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowRankings(false)}
                className="rounded-xl p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {filteredRankings.map((rank, index) => (
                <RankCard key={rank.rank} rank={rank} index={index} />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowRankings(false)}
              className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-xs font-black uppercase text-white hover:bg-blue-700"
            >
              Close Rankings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value, detail, icon, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
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

const ChartCard = ({ title, subtitle, children }) => (
  <div className="min-w-0 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:p-8">
    <div className="mb-5">
      <h3 className="text-sm font-black uppercase text-gray-900">{title}</h3>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
        {subtitle}
      </p>
    </div>

    <div className="h-[240px] w-full min-w-0 sm:h-[290px] md:h-[340px]">
      {children}
    </div>
  </div>
);

const RankCard = ({ rank, index }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <RankBadge rank={rank.rank} active={index === 0} />

        <div>
          <p className="font-black uppercase text-gray-900">{rank.name}</p>
          <p className="mt-1 text-xs font-bold text-gray-400">
            {rank.sport} • {rank.badge}
          </p>
        </div>
      </div>

      {rank.trend === "up" ? (
        <TrendingUp size={18} className="text-emerald-500" />
      ) : (
        <TrendingDown size={18} className="text-rose-500" />
      )}
    </div>

    <div className="mt-4 rounded-2xl bg-gray-50 p-3">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        Score
      </p>

      <p className="mt-1 flex items-center gap-1 text-xl font-black text-gray-900">
        <Zap size={16} className="text-blue-500" />
        {rank.rating}
      </p>
    </div>
  </div>
);

const RankBadge = ({ rank, active }) => (
  <span
    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border text-[10px] font-black ${
      active
        ? "border-amber-200 bg-amber-50 text-amber-600"
        : "border-gray-100 bg-gray-50 text-gray-400"
    }`}
  >
    {rank}
  </span>
);

const TableHead = ({ children, right }) => (
  <th
    className={`px-5 py-4 text-[9px] font-black uppercase tracking-widest text-gray-400 ${
      right ? "text-right" : ""
    }`}
  >
    {children}
  </th>
);

export default PerformanceReports;