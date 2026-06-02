import React, { useMemo, useState } from "react";
import {
  UserPlus,
  Search,
  FileDown,
  Filter,
  Calendar as CalendarIcon,
  Users,
  UserCheck,
  Zap,
  X,
  RotateCcw,
  Eye,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const initialAdmissions = [
  { id: "ADM-902", name: "Arjun Mehra", sports: "Cricket", date: "21 May 2024", status: "Approved", type: "New", source: "Social Media", contact: "9876543210", branch: "Daladali" },
  { id: "ADM-901", name: "Sana Khan", sports: "Badminton", date: "20 May 2024", status: "Pending", type: "Trial", source: "Referrals", contact: "9876500001", branch: "Main Branch" },
  { id: "ADM-900", name: "Vikram Das", sports: "Football", date: "19 May 2024", status: "Approved", type: "Returning", source: "Walk-ins", contact: "9876500002", branch: "Main Branch" },
  { id: "ADM-899", name: "Riya Sen", sports: "Cricket", date: "18 May 2024", status: "Approved", type: "New", source: "Events", contact: "9876500003", branch: "Daladali" },
  { id: "ADM-898", name: "Kabir Singh", sports: "Football", date: "17 May 2024", status: "Pending", type: "Trial", source: "Social Media", contact: "9876500004", branch: "Daladali" },
  { id: "ADM-897", name: "Ananya Das", sports: "Fitness", date: "16 May 2024", status: "Approved", type: "New", source: "Referrals", contact: "9876500005", branch: "Main Branch" },
];

const sixMonthTrendData = [
  { month: "JAN", new: 45, trial: 60 },
  { month: "FEB", new: 52, trial: 75 },
  { month: "MAR", new: 48, trial: 70 },
  { month: "APR", new: 61, trial: 85 },
  { month: "MAY", new: 75, trial: 96 },
  { month: "JUN", new: 82, trial: 110 },
];

const yearlyTrendData = [
  { month: "Q1", new: 145, trial: 205 },
  { month: "Q2", new: 218, trial: 291 },
  { month: "Q3", new: 256, trial: 320 },
  { month: "Q4", new: 301, trial: 365 },
];

const sourceColors = {
  "Social Media": "#3b82f6",
  Referrals: "#10b981",
  "Walk-ins": "#f59e0b",
  Events: "#8b5cf6",
};

const downloadCSV = (rows, fileName) => {
  const csv = rows
    .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
};

const AdmissionReports = () => {
  const [admissions, setAdmissions] = useState(initialAdmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [chartView, setChartView] = useState("Last 6 Months");
  const [selectedSport, setSelectedSport] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSource, setSelectedSource] = useState("All");
  const [activeAdmission, setActiveAdmission] = useState(null);

  const trendData = chartView === "Yearly View" ? yearlyTrendData : sixMonthTrendData;

  const filteredAdmissions = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return admissions.filter((adm) => {
      const matchesSearch =
        !query ||
        `${adm.id} ${adm.name} ${adm.sports} ${adm.status} ${adm.type} ${adm.source} ${adm.branch}`
          .toLowerCase()
          .includes(query);

      const matchesSport = selectedSport === "All" || adm.sports === selectedSport;
      const matchesStatus = selectedStatus === "All" || adm.status === selectedStatus;
      const matchesType = selectedType === "All" || adm.type === selectedType;
      const matchesSource = selectedSource === "All" || adm.source === selectedSource;

      return matchesSearch && matchesSport && matchesStatus && matchesType && matchesSource;
    });
  }, [admissions, searchTerm, selectedSport, selectedStatus, selectedType, selectedSource]);

  const sourceData = useMemo(() => {
    const names = ["Social Media", "Referrals", "Walk-ins", "Events"];
    const total = filteredAdmissions.length || 1;

    return names.map((name) => {
      const count = filteredAdmissions.filter((adm) => adm.source === name).length;

      return {
        name,
        count,
        value: Math.round((count / total) * 100),
        color: sourceColors[name],
      };
    });
  }, [filteredAdmissions]);

  const totalIntake = filteredAdmissions.length;
  const newRecruits = filteredAdmissions.filter((adm) => adm.type === "New").length;
  const activeTrials = filteredAdmissions.filter((adm) => adm.type === "Trial").length;
  const approvedCount = filteredAdmissions.filter((adm) => adm.status === "Approved").length;
  const trialConversion =
    approvedCount + activeTrials > 0
      ? Math.round((approvedCount / (approvedCount + activeTrials)) * 100)
      : 0;

  const resetFilters = () => {
    setSelectedSport("All");
    setSelectedStatus("All");
    setSelectedType("All");
    setSelectedSource("All");
    setSearchTerm("");
  };

  const exportAdmissions = (fileName = "admission-report.csv") => {
    const rows = [
      ["Entry ID", "Student Name", "Sport", "Date", "Status", "Type", "Lead Source", "Contact", "Branch"],
      ...filteredAdmissions.map((adm) => [
        adm.id,
        adm.name,
        adm.sports,
        adm.date,
        adm.status,
        adm.type,
        adm.source,
        adm.contact,
        adm.branch,
      ]),
    ];

    downloadCSV(rows, fileName);
  };

  const exportIntel = () => {
    const rows = [
      ["Admission Intelligence Report"],
      ["Chart View", chartView],
      ["Sport Filter", selectedSport],
      ["Status Filter", selectedStatus],
      ["Type Filter", selectedType],
      ["Source Filter", selectedSource],
      [],
      ["Total Intake", totalIntake],
      ["New Recruits", newRecruits],
      ["Trial Conversion", `${trialConversion}%`],
      ["Active Trials", activeTrials],
      [],
      ["Entry ID", "Student Name", "Sport", "Date", "Status", "Type", "Lead Source", "Contact", "Branch"],
      ...filteredAdmissions.map((adm) => [
        adm.id,
        adm.name,
        adm.sports,
        adm.date,
        adm.status,
        adm.type,
        adm.source,
        adm.contact,
        adm.branch,
      ]),
    ];

    downloadCSV(rows, "admission-intelligence-report.csv");
  };

  const approveAdmission = (id) => {
    setAdmissions((prev) =>
      prev.map((adm) => (adm.id === id ? { ...adm, status: "Approved" } : adm))
    );

    setActiveAdmission((prev) =>
      prev ? { ...prev, status: "Approved" } : prev
    );
  };

  const markPending = (id) => {
    setAdmissions((prev) =>
      prev.map((adm) => (adm.id === id ? { ...adm, status: "Pending" } : adm))
    );

    setActiveAdmission((prev) =>
      prev ? { ...prev, status: "Pending" } : prev
    );
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-6 p-3 pb-12 sm:p-5 lg:p-8">
      <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:h-12 sm:w-12">
              <UserPlus size={24} />
            </div>

            <div>
              <h1 className="text-xl font-black uppercase tracking-tight text-gray-900 sm:text-2xl">
                Intelligence: <span className="text-blue-600">Admission Metrics</span>
              </h1>
              <p className="mt-1 text-sm font-medium text-gray-500">
                Recruitment funnel and intake analytics.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:w-auto">
            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white px-4 text-xs font-black uppercase tracking-widest text-gray-600 shadow-sm hover:bg-gray-50"
            >
              {showFilters ? <X size={16} /> : <Filter size={16} />}
              {showFilters ? "Close Filter" : "Filter"}
            </button>

            <button
              type="button"
              onClick={exportIntel}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 text-xs font-black uppercase tracking-widest text-white shadow-lg hover:bg-black"
            >
              <FileDown size={16} />
              Export Intel
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <FilterSelect label="Sport" value={selectedSport} onChange={setSelectedSport} options={["All", "Cricket", "Football", "Badminton", "Fitness"]} />
              <FilterSelect label="Status" value={selectedStatus} onChange={setSelectedStatus} options={["All", "Approved", "Pending"]} />
              <FilterSelect label="Admission Type" value={selectedType} onChange={setSelectedType} options={["All", "New", "Trial", "Returning"]} />
              <FilterSelect label="Lead Source" value={selectedSource} onChange={setSelectedSource} options={["All", "Social Media", "Referrals", "Walk-ins", "Events"]} />

              <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-[10px] font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50"
                >
                  <RotateCcw size={15} />
                  Clear
                </button>

                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  className="flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 px-4 text-[10px] font-black uppercase tracking-widest text-white hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard title="Total Intake" value={totalIntake} detail="Filtered admissions" trendValue="+12%" icon={<Users size={20} />} color="blue" />
        <KPICard title="New Recruits" value={newRecruits} detail="New admission type" trendValue="+8.2%" icon={<UserPlus size={20} />} color="emerald" />
        <KPICard title="Trial Conversion" value={`${trialConversion}%`} detail="Lead to student" trendValue="-2.1%" icon={<Zap size={20} />} color="amber" />
        <KPICard title="Active Trials" value={activeTrials} detail="Pipeline inventory" trendValue="+4" icon={<UserCheck size={20} />} color="purple" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 xl:col-span-2 xl:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-tight text-gray-900">
                Growth Projection
              </h3>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Intake vs trial volume
              </p>
            </div>

            <select
              value={chartView}
              onChange={(e) => setChartView(e.target.value)}
              className="h-10 w-full rounded-xl border border-gray-100 bg-gray-50 px-4 text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-blue-500 sm:w-auto"
            >
              <option>Last 6 Months</option>
              <option>Yearly View</option>
            </select>
          </div>

          <div className="h-[260px] w-full sm:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTrial" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: "#9ca3af" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: "#9ca3af" }} />
                <Tooltip />
                <Area type="monotone" dataKey="new" stroke="#3b82f6" strokeWidth={3} fill="url(#colorNew)" />
                <Area type="monotone" dataKey="trial" stroke="#8b5cf6" strokeWidth={3} fill="url(#colorTrial)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 xl:p-8">
          <h3 className="mb-2 text-sm font-black uppercase tracking-tight text-gray-900">
            Lead Generation
          </h3>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Click source to filter table
          </p>

          <div className="h-[220px] w-full sm:h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={55} outerRadius={82} paddingAngle={5} dataKey="value">
                  {sourceData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {sourceData.map((source) => (
              <button
                key={source.name}
                type="button"
                onClick={() => setSelectedSource((prev) => (prev === source.name ? "All" : source.name))}
                className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                  selectedSource === source.name ? "bg-blue-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: source.color }} />
                  <span className="text-[10px] font-black uppercase tracking-tight text-gray-500">
                    {source.name}
                  </span>
                </div>

                <span className="text-[10px] font-black text-gray-800">
                  {source.value}%
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-50 p-4 md:flex-row md:items-center md:justify-between md:p-6">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-2.5 md:max-w-md">
            <Search className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search student registry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-none bg-transparent text-[10px] font-black uppercase tracking-wider outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:flex">
            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className="flex items-center justify-center gap-2 rounded-xl bg-gray-50 px-4 py-2.5 text-[10px] font-black uppercase text-gray-500 hover:bg-gray-100"
            >
              <Filter size={14} />
              Filter
            </button>

            <button
              type="button"
              onClick={() => exportAdmissions("admission-report-export.csv")}
              className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-2.5 text-[10px] font-black uppercase text-white hover:bg-black"
            >
              <FileDown size={14} />
              Export CSV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {filteredAdmissions.map((adm) => (
            <AdmissionCard key={adm.id} adm={adm} onView={() => setActiveAdmission(adm)} />
          ))}

          {filteredAdmissions.length === 0 && (
            <div className="py-10 text-center text-xs font-black uppercase tracking-widest text-gray-400">
              No admissions found
            </div>
          )}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <TableHead>Entry ID</TableHead>
                <TableHead>Athlete Details</TableHead>
                <TableHead>Discipline</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead right>Verification</TableHead>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50 text-xs font-black uppercase">
              {filteredAdmissions.map((adm) => (
                <tr key={adm.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-5 italic text-blue-600">#{adm.id}</td>

                  <td className="px-6 py-5">
                    <div className="font-black text-gray-900">{adm.name}</div>
                    <div className="mt-1 flex items-center gap-1 text-[9px] font-bold text-gray-400">
                      <CalendarIcon size={10} />
                      REC: {adm.date}
                    </div>
                    <div className="mt-1 text-[9px] font-bold text-gray-400">
                      {adm.contact} • {adm.branch}
                    </div>
                  </td>

                  <td className="px-6 py-5">{adm.sports}</td>

                  <td className="px-6 py-5">
                    <Badge text={adm.type} color="gray" />
                  </td>

                  <td className="px-6 py-5">
                    <Badge text={adm.source} color="blue" />
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={adm.status} />
                  </td>

                  <td className="px-6 py-5 text-right">
                    <button
                      type="button"
                      onClick={() => setActiveAdmission(adm)}
                      className="rounded-lg p-2 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredAdmissions.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-xs font-black uppercase tracking-widest text-gray-400">
                    No admissions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 bg-gray-50/40 p-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Showing {filteredAdmissions.length} of {admissions.length} records
          </p>
        </div>
      </div>

      {activeAdmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                  Admission Verification
                </p>
                <h3 className="mt-1 text-xl font-black text-gray-900">
                  {activeAdmission.name}
                </h3>
                <p className="text-sm font-medium text-gray-500">
                  #{activeAdmission.id}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveAdmission(null)}
                className="rounded-xl border border-gray-200 p-2 text-gray-500 hover:bg-gray-50"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
              <DetailBox label="Student Name" value={activeAdmission.name} />
              <DetailBox label="Sport" value={activeAdmission.sports} />
              <DetailBox label="Admission Date" value={activeAdmission.date} />
              <DetailBox label="Admission Type" value={activeAdmission.type} />
              <DetailBox label="Lead Source" value={activeAdmission.source} />
              <DetailBox label="Contact" value={activeAdmission.contact} />
              <DetailBox label="Branch" value={activeAdmission.branch} />
              <DetailBox label="Status" value={activeAdmission.status} />
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 p-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => markPending(activeAdmission.id)}
                className="flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-amber-600 hover:bg-amber-100"
              >
                <Clock size={15} />
                Mark Pending
              </button>

              <button
                type="button"
                onClick={() => approveAdmission(activeAdmission.id)}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-emerald-700"
              >
                <CheckCircle2 size={15} />
                Approve
              </button>

              <button
                type="button"
                onClick={() => setActiveAdmission(null)}
                className="flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-black"
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

const KPICard = ({ title, value, detail, trendValue, icon, color }) => {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className={`rounded-2xl p-3 ${colorMap[color]}`}>{icon}</div>
        <span className="rounded-full bg-gray-50 px-2 py-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
          {trendValue}
        </span>
      </div>

      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        {title}
      </p>
      <h3 className="mt-1 text-3xl font-black text-gray-900">{value}</h3>
      <p className="mt-1 text-xs font-bold text-gray-400">{detail}</p>
    </div>
  );
};

const AdmissionCard = ({ adm, onView }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-black text-blue-600">#{adm.id}</p>
        <h3 className="mt-1 font-black text-gray-900">{adm.name}</h3>
        <p className="text-xs text-gray-500">{adm.contact} • {adm.branch}</p>
      </div>

      <StatusBadge status={adm.status} />
    </div>

    <div className="mt-4 grid grid-cols-2 gap-3">
      <DetailBox label="Sport" value={adm.sports} />
      <DetailBox label="Type" value={adm.type} />
      <DetailBox label="Source" value={adm.source} />
      <DetailBox label="Date" value={adm.date} />
    </div>

    <button
      type="button"
      onClick={onView}
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-xs font-black uppercase text-blue-600 hover:bg-blue-100"
    >
      <Eye size={16} />
      View Details
    </button>
  </div>
);

const FilterSelect = ({ label, value, onChange, options }) => (
  <div>
    <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </label>

    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option === "All" ? `All ${label}` : option}
        </option>
      ))}
    </select>
  </div>
);

const DetailBox = ({ label, value }) => (
  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </p>
    <p className="mt-2 break-words text-sm font-black text-gray-900">{value}</p>
  </div>
);

const TableHead = ({ children, right }) => (
  <th className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 ${right ? "text-right" : ""}`}>
    {children}
  </th>
);

const Badge = ({ text, color }) => (
  <span
    className={`rounded-lg px-2 py-1 text-[9px] ${
      color === "blue" ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-600"
    }`}
  >
    {text}
  </span>
);

const StatusBadge = ({ status }) => (
  <span
    className={`rounded-lg border px-2 py-1 text-[9px] font-black uppercase ${
      status === "Approved"
        ? "border-emerald-200 bg-emerald-50 text-emerald-600"
        : "border-amber-200 bg-amber-50 text-amber-600"
    }`}
  >
    {status}
  </span>
);

export default AdmissionReports;