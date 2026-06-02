import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  LayoutGrid,
  Search,
  Filter,
  ArrowUpRight,
  MoreVertical,
  Eye,
  Download,
  ShieldCheck,
  MapPin,
  Trophy as TrophyIcon,
} from "lucide-react";

const baseCoaches = [
  {
    id: "CH-101",
    name: "Vikram Batra",
    sport: "Cricket",
    batch: "Morning Elite",
    branch: "Daladali",
    sessions: 12,
    status: "Active",
  },
  {
    id: "CH-102",
    name: "Anjali Menon",
    sport: "Football",
    batch: "Evening Juniors",
    branch: "Main Branch",
    sessions: 8,
    status: "Active",
  },
  {
    id: "CH-103",
    name: "Sandeep Singh",
    sport: "Fitness",
    batch: "Morning All",
    branch: "Daladali",
    sessions: 15,
    status: "On Leave",
  },
  {
    id: "CH-104",
    name: "Rajesh Khanna",
    sport: "Cricket",
    batch: "Weekend Pro",
    branch: "Main Branch",
    sessions: 6,
    status: "Active",
  },
  {
    id: "CH-105",
    name: "Zoya Khan",
    sport: "Football",
    batch: "Evening Girls",
    branch: "Daladali",
    sessions: 10,
    status: "Active",
  },
];

const COACH_REGISTRY_KEY = "ars_coach_registrations";
const COACH_OVERRIDES_KEY = "ars_coach_roster_overrides";

const readStoredJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

const toRosterCoach = (coach) => ({
  id: coach.id || "",
  name: coach.name || "",
  sport: coach.sport || "Unassigned",
  batch: coach.batch || "Pending Allocation",
  branch: coach.branch || "Main Branch",
  sessions: Number(coach.sessions) || 0,
  status: coach.status || "Active",
});

const exportCsv = (rows, fileName) => {
  const headers = [
    "Coach ID",
    "Coach Name",
    "Sport",
    "Batch",
    "Branch",
    "Sessions",
    "Status",
  ];

  const csvRows = [
    headers.join(","),
    ...rows.map((coach) =>
      [
        coach.id,
        coach.name,
        coach.sport,
        coach.batch,
        coach.branch,
        coach.sessions,
        coach.status,
      ]
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    ),
  ];

  const blob = new Blob([csvRows.join("\n")], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
};

export default function TotalCoach() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSport, setFilterSport] = useState("All");
  const [registeredCoaches, setRegisteredCoaches] = useState([]);
  const [rosterOverrides, setRosterOverrides] = useState({
    deletedIds: [],
    editedCoaches: {},
  });

  const [activeCoach, setActiveCoach] = useState(null);
  const [activeMode, setActiveMode] = useState("view");

  const syncRosterState = () => {
    setRegisteredCoaches(readStoredJson(COACH_REGISTRY_KEY, []));

    const overrides = readStoredJson(COACH_OVERRIDES_KEY, {
      deletedIds: [],
      editedCoaches: {},
    });

    setRosterOverrides({
      deletedIds: Array.isArray(overrides.deletedIds)
        ? overrides.deletedIds
        : [],
      editedCoaches:
        overrides.editedCoaches && typeof overrides.editedCoaches === "object"
          ? overrides.editedCoaches
          : {},
    });
  };

  useEffect(() => {
    syncRosterState();

    window.addEventListener("storage", syncRosterState);
    window.addEventListener("ars:coach-registrations-updated", syncRosterState);
    window.addEventListener("ars:coach-roster-updated", syncRosterState);

    return () => {
      window.removeEventListener("storage", syncRosterState);
      window.removeEventListener(
        "ars:coach-registrations-updated",
        syncRosterState
      );
      window.removeEventListener("ars:coach-roster-updated", syncRosterState);
    };
  }, []);

  const roster = useMemo(() => {
    const deletedIds = new Set(rosterOverrides.deletedIds || []);
    const editedCoaches = rosterOverrides.editedCoaches || {};

    const merged = [...baseCoaches, ...registeredCoaches]
      .filter((coach) => !deletedIds.has(coach.id))
      .map((coach) => toRosterCoach(editedCoaches[coach.id] || coach));

    return merged.filter((coach) => {
      const matchesSearch = `${coach.name} ${coach.id}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesSport = filterSport === "All" || coach.sport === filterSport;

      return matchesSearch && matchesSport;
    });
  }, [
    filterSport,
    registeredCoaches,
    rosterOverrides.deletedIds,
    rosterOverrides.editedCoaches,
    searchTerm,
  ]);

  const totalCoachCount = useMemo(() => {
    const deletedIds = new Set(rosterOverrides.deletedIds || []);
    const merged = [...baseCoaches, ...registeredCoaches].filter(
      (coach) => !deletedIds.has(coach.id)
    );

    return merged.length;
  }, [registeredCoaches, rosterOverrides.deletedIds]);

  const stats = [
    {
      label: "Total Coaches",
      value: String(totalCoachCount),
      icon: Users,
      color: "text-[#8B8B00]",
      bg: "bg-[#8B8B00]/10",
    },
    {
      label: "Active Sessions",
      value: String(roster.filter((coach) => coach.status === "Active").length),
      icon: TrophyIcon,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Assigned Batches",
      value: String(
        roster.filter(
          (coach) => coach.batch && coach.batch !== "Pending Allocation"
        ).length
      ),
      icon: LayoutGrid,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Performance Rate",
      value: "94%",
      icon: ShieldCheck,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const openFullCoachProfile = (coach) => {
    navigate(`/coach/profiles/${coach.id}`);
  };

  const openCoachModal = (coach, mode) => {
    setActiveCoach({ ...coach });
    setActiveMode(mode);
  };

  const closeCoachModal = () => {
    setActiveCoach(null);
    setActiveMode("view");
  };

  const updateActiveCoachField = (field, value) => {
    setActiveCoach((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const persistCoachUpdate = () => {
    if (!activeCoach) {
      return;
    }

    const overrides = readStoredJson(COACH_OVERRIDES_KEY, {
      deletedIds: [],
      editedCoaches: {},
    });

    const nextOverrides = {
      deletedIds: Array.isArray(overrides.deletedIds)
        ? overrides.deletedIds
        : [],
      editedCoaches:
        overrides.editedCoaches && typeof overrides.editedCoaches === "object"
          ? { ...overrides.editedCoaches }
          : {},
    };

    nextOverrides.editedCoaches[activeCoach.id] = toRosterCoach(activeCoach);

    localStorage.setItem(COACH_OVERRIDES_KEY, JSON.stringify(nextOverrides));
    window.dispatchEvent(new Event("ars:coach-roster-updated"));

    closeCoachModal();
  };

  const deleteCoach = (coach) => {
    const confirmed = window.confirm(
      `Delete ${coach.name}? This will remove the coach from the roster view.`
    );

    if (!confirmed) {
      return;
    }

    const overrides = readStoredJson(COACH_OVERRIDES_KEY, {
      deletedIds: [],
      editedCoaches: {},
    });

    const nextOverrides = {
      deletedIds: Array.from(
        new Set([...(overrides.deletedIds || []), coach.id])
      ),
      editedCoaches:
        overrides.editedCoaches && typeof overrides.editedCoaches === "object"
          ? { ...overrides.editedCoaches }
          : {},
    };

    localStorage.setItem(COACH_OVERRIDES_KEY, JSON.stringify(nextOverrides));
    window.dispatchEvent(new Event("ars:coach-roster-updated"));

    if (activeCoach?.id === coach.id) {
      closeCoachModal();
    }
  };

  const handleExportRoster = () => {
    exportCsv(
      roster,
      `coach-roster-${new Date().toISOString().slice(0, 10)}.csv`
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-3">
            <ShieldCheck className="text-[#8B8B00]" size={32} />
            Total <span className="text-[#8B8B00]">Coaches</span>
          </h1>

          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">
            Professional Coaching Staff & Batch Distribution
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportRoster}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-gray-800 transition-all shadow-lg active:scale-95"
          >
            <Download size={14} />
            Export Roster
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}
              >
                <stat.icon size={22} />
              </div>

              <div className="flex items-center gap-1 text-emerald-500 font-bold text-[10px]">
                <ArrowUpRight size={12} />
                {i % 2 === 0 ? "+2" : "+5%"}
              </div>
            </div>

            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
              {stat.label}
            </p>

            <h3 className="text-2xl font-black text-gray-900 mt-1 italic leading-none">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="SEARCH COACH NAME OR ID..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-[#8B8B00] outline-none rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border-2 border-transparent">
              <Filter size={14} className="text-gray-400" />

              <select
                className="bg-transparent text-[10px] font-black uppercase outline-none cursor-pointer"
                value={filterSport}
                onChange={(e) => setFilterSport(e.target.value)}
              >
                <option value="All">All Sports</option>
                <option value="Cricket">Cricket</option>
                <option value="Football">Football</option>
                <option value="Fitness">Fitness</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">
                  Coach ID
                </th>

                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">
                  Staff Details
                </th>

                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">
                  Primary Sport
                </th>

                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">
                  Active Batch
                </th>

                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">
                  Status
                </th>

                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {roster.map((coach) => (
                <tr
                  key={coach.id}
                  className="hover:bg-gray-50/50 transition-colors group"
                >
                  <td className="px-6 py-5 border-b border-gray-50">
                    <span className="text-[10px] font-black text-gray-400 tracking-wider">
                      #{coach.id}
                    </span>
                  </td>

                  <td className="px-6 py-5 border-b border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#8B8B00]/10 flex items-center justify-center text-[#8B8B00] font-black text-[10px]">
                        {coach.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={() => openFullCoachProfile(coach)}
                          className="text-left text-xs font-black text-gray-900 uppercase hover:text-[#8B8B00] hover:underline transition-all"
                        >
                          {coach.name}
                        </button>

                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter flex items-center gap-1">
                          <MapPin size={8} />
                          {coach.branch}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 border-b border-gray-50">
                    <span className="px-3 py-1 bg-gray-100 text-[9px] font-black uppercase tracking-wider rounded-lg text-gray-600">
                      {coach.sport}
                    </span>
                  </td>

                  <td className="px-6 py-5 border-b border-gray-50">
                    <div>
                      <p className="text-[10px] font-black text-gray-900 uppercase tracking-tight">
                        {coach.batch}
                      </p>

                      <p className="text-[9px] font-bold text-[#8B8B00] uppercase">
                        {coach.sessions} Sessions / Month
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5 border-b border-gray-50">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        coach.status === "Active"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          coach.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-amber-500"
                        }`}
                      />

                      {coach.status}
                    </div>
                  </td>

                  <td className="px-6 py-5 border-b border-gray-50">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openFullCoachProfile(coach)}
                        className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-[#8B8B00] hover:bg-[#8B8B00]/5 transition-all"
                        aria-label={`View full profile of ${coach.name}`}
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() => openCoachModal(coach, "edit")}
                        className="p-2 transition-all rounded-lg hover:bg-blue-50 hover:text-blue-600"
                        aria-label={`Edit ${coach.name}`}
                      >
                        <MoreVertical size={16} className="text-gray-300" />
                      </button>

                      <button
                        onClick={() => deleteCoach(coach)}
                        className="px-3 py-2 rounded-lg bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-wider hover:bg-red-100 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {roster.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-xs font-black text-gray-400 uppercase tracking-widest"
                  >
                    No coaches found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-gray-50/30">
          <p className="text-[10px] font-black text-gray-400 uppercase">
            Managing {totalCoachCount} Active Coaching Personnel
          </p>
        </div>
      </div>

      {activeCoach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-[2rem] bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5 sm:p-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                  Coach Editor
                </p>

                <h3 className="mt-1 text-xl font-black text-gray-900">
                  {activeCoach.name}
                </h3>

                <p className="text-sm text-gray-500">{activeCoach.id}</p>
              </div>

              <button
                onClick={closeCoachModal}
                className="rounded-full bg-gray-50 px-3 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100"
              >
                Close
              </button>
            </div>

            <div className="grid gap-4 p-5 sm:p-6 md:grid-cols-2">
              {["id", "name", "sport", "batch", "branch", "sessions", "status"].map(
                (field) => (
                  <label key={field} className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      {field}
                    </span>

                    <input
                      type={field === "sessions" ? "number" : "text"}
                      value={activeCoach[field] ?? ""}
                      onChange={(event) =>
                        updateActiveCoachField(field, event.target.value)
                      }
                      disabled={activeMode === "view" || field === "id"}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition focus:border-[#8B8B00] disabled:cursor-not-allowed disabled:bg-gray-100"
                    />
                  </label>
                )
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 p-5 sm:flex-row sm:justify-between sm:p-6">
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Save changes to roster
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => deleteCoach(activeCoach)}
                  className="rounded-2xl bg-red-50 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-red-600 hover:bg-red-100"
                >
                  Delete
                </button>

                <button
                  onClick={persistCoachUpdate}
                  className="rounded-2xl bg-[#8B8B00] px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#777700]"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}