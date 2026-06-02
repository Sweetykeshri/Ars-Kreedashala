import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  ChevronRight,
  ArrowUpRight,
  Search,
  Filter,
  DollarSign,
  Calendar,
  Clock,
  Send,
  Download,
  X,
} from "lucide-react";

const initialData = [
  { id: "STU005", name: "Kabir Singh", batch: "Football Junior", amount: 2200, months: ["April", "May"], dueDate: "2024-04-05", risk: "High" },
  { id: "STU003", name: "Ishaan Gupta", batch: "Cricket Beginners", amount: 2500, months: ["May"], dueDate: "2024-05-05", risk: "Medium" },
  { id: "STU012", name: "Neha Reddy", batch: "Badminton Morning", amount: 3000, months: ["May"], dueDate: "2024-05-05", risk: "Medium" },
  { id: "STU025", name: "Vikram Choudhary", batch: "Cricket Beginners", amount: 7500, months: ["March", "April", "May"], dueDate: "2024-03-05", risk: "Critical" },
];

const PendingFees = () => {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [batchFilter, setBatchFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [msg, setMsg] = useState("");

  const showMsg = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2500);
  };

  const filteredData = useMemo(() => {
    const q = search.toLowerCase();

    return data.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        item.batch.toLowerCase().includes(q);

      const matchRisk = riskFilter === "All" || item.risk === riskFilter;
      const matchBatch = batchFilter === "All" || item.batch === batchFilter;

      return matchSearch && matchRisk && matchBatch;
    });
  }, [data, search, riskFilter, batchFilter]);

  const batches = ["All", ...new Set(data.map((item) => item.batch))];

  const totalDue = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const criticalCount = filteredData.filter((item) => item.risk === "Critical").length;

  const sendReminder = (id) => {
    const student = data.find((item) => item.id === id);
    showMsg(`Reminder sent to ${student.name}`);
  };

  const sendBulkReminders = () => {
    if (!filteredData.length) return showMsg("No pending fees found.");
    showMsg(`Bulk reminders sent to ${filteredData.length} students.`);
  };

  const exportCSV = () => {
    const rows = [
      ["ID", "Name", "Batch", "Amount", "Months", "Due Date", "Risk"],
      ...filteredData.map((i) => [
        i.id,
        i.name,
        i.batch,
        i.amount,
        i.months.join(" "),
        i.dueDate,
        i.risk,
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));

    const a = document.createElement("a");
    a.href = url;
    a.download = "pending-fees-report.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  const markPaid = (id) => {
    if (!window.confirm("Mark this fee as paid?")) return;
    setData((prev) => prev.filter((item) => item.id !== id));
    showMsg("Fee marked as paid successfully.");
  };

  const getRiskStyle = (risk) => {
    if (risk === "Critical") return "bg-red-600 text-white";
    if (risk === "High") return "bg-red-100 text-red-700";
    if (risk === "Medium") return "bg-amber-100 text-amber-700";
    return "bg-gray-100 text-gray-700";
  };

  const batchSummary = batches
    .filter((b) => b !== "All")
    .map((batch) => {
      const items = data.filter((i) => i.batch === batch);
      return {
        name: batch,
        count: items.length,
        amount: items.reduce((s, i) => s + i.amount, 0),
      };
    });

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pending Dues & Recovery</h1>
          <p className="text-gray-500">Track overdue fees and send reminders.</p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={sendBulkReminders}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white hover:bg-red-700"
          >
            <Bell size={18} />
            Send Bulk Reminders
          </button>

          <button
            type="button"
            onClick={exportCSV}
            className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-bold text-white hover:bg-black"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {msg && (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
          {msg}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card icon={<DollarSign size={20} />} label="Total Outstanding" value={`₹${totalDue.toLocaleString()}`} />
        <Card icon={<AlertTriangle size={20} />} label="Pending Accounts" value={filteredData.length} />
        <Card icon={<Clock size={20} />} label="Critical Risk" value={criticalCount} />
        <Card icon={<ArrowUpRight size={20} />} label="Recovery Rate" value="78.5%" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-gray-100 p-4 md:flex-row md:items-center md:justify-between">
              <h3 className="font-bold text-gray-800">Critical Overdue List</h3>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search student..."
                    className="w-full rounded-lg border border-gray-100 bg-gray-50 py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-red-500 sm:w-56"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setShowFilter(true)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-gray-100 bg-white px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50"
                >
                  <Filter size={16} />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[780px] w-full text-left">
                <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400">
                  <tr>
                    <th className="px-5 py-4">Student</th>
                    <th className="px-5 py-4">Due</th>
                    <th className="px-5 py-4">Months</th>
                    <th className="px-5 py-4">Due Since</th>
                    <th className="px-5 py-4">Risk</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50 text-sm">
                  {filteredData.map((item) => (
                    <tr key={item.id} className="hover:bg-red-50/20">
                      <td className="px-5 py-4">
                        <p className="font-bold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.id} • {item.batch}</p>
                      </td>

                      <td className="px-5 py-4 font-black text-gray-800">
                        ₹{item.amount.toLocaleString()}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-1">
                          {item.months.map((m) => (
                            <span key={m} className="rounded bg-gray-100 px-2 py-1 text-[10px] font-bold text-gray-500">
                              {m}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-5 py-4 text-xs font-semibold text-gray-500">
                        {item.dueDate}
                      </td>

                      <td className="px-5 py-4">
                        <span className={`rounded px-2 py-1 text-[10px] font-black uppercase ${getRiskStyle(item.risk)}`}>
                          {item.risk}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => sendReminder(item.id)}
                            className="rounded-lg bg-blue-50 p-2 text-blue-600 hover:bg-blue-100"
                            title="Send Reminder"
                          >
                            <Send size={15} />
                          </button>

                          <button
                            type="button"
                            onClick={() => markPaid(item.id)}
                            className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
                          >
                            Paid
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!filteredData.length && (
                    <tr>
                      <td colSpan="6" className="px-5 py-8 text-center text-sm font-bold text-gray-400">
                        No pending fees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-3xl bg-red-600 p-6 text-white shadow">
            <h3 className="text-lg font-black">Attention Required</h3>
            <p className="mt-2 text-xs text-red-100">
              Review high-risk overdue accounts immediately.
            </p>

            <button
              type="button"
              onClick={() => {
                setRiskFilter("Critical");
                setBatchFilter("All");
                showMsg("Showing critical risk accounts.");
              }}
              className="mt-5 w-full rounded-2xl bg-white py-3 text-xs font-black uppercase text-red-600 hover:bg-red-50"
            >
              Review High-Risk Accounts
            </button>

            <AlertTriangle className="absolute -bottom-6 -right-6 text-white/10" size={110} />
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-4 flex items-center justify-between font-bold text-gray-800">
              Batch-wise Due
              <Calendar size={16} className="text-gray-400" />
            </h3>

            <div className="space-y-3">
              {batchSummary.map((batch) => (
                <button
                  key={batch.name}
                  type="button"
                  onClick={() => setBatchFilter(batch.name)}
                  className="flex w-full items-center justify-between rounded-xl p-3 text-left hover:bg-gray-50"
                >
                  <div>
                    <p className="font-bold text-gray-700">{batch.name}</p>
                    <p className="text-xs font-bold text-gray-400">{batch.count} cases</p>
                  </div>

                  <div className="text-right">
                    <p className="font-black text-gray-800">₹{batch.amount.toLocaleString()}</p>
                    <ChevronRight size={14} className="ml-auto text-gray-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showFilter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-black text-gray-900">Filter Pending Fees</h3>
              <button type="button" onClick={() => setShowFilter(false)} className="rounded-lg p-2 hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>

            <label className="mb-3 block">
              <span className="text-xs font-bold text-gray-500">Risk</span>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-red-500"
              >
                {["All", "Critical", "High", "Medium"].map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-bold text-gray-500">Batch</span>
              <select
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 p-3 outline-none focus:ring-2 focus:ring-red-500"
              >
                {batches.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </label>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setRiskFilter("All");
                  setBatchFilter("All");
                  setShowFilter(false);
                }}
                className="w-full rounded-xl bg-gray-100 py-3 text-xs font-black uppercase text-gray-700"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={() => setShowFilter(false)}
                className="w-full rounded-xl bg-red-600 py-3 text-xs font-black uppercase text-white"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Card = ({ icon, label, value }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
    <div className="mb-4 rounded-xl bg-gray-50 p-2 text-red-500 w-fit">{icon}</div>
    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{label}</p>
    <p className="mt-1 text-2xl font-black text-gray-800">{value}</p>
  </div>
);

export default PendingFees;