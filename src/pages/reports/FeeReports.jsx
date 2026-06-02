import React, { useMemo, useState } from "react";
import {
  CircleDollarSign,
  TrendingUp,
  CreditCard,
  AlertCircle,
  Filter,
  FileText,
  FileDown,
  Calendar,
  X,
  Search,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const collectionData = [
  { label: "JAN", collect: 450000, target: 500000 },
  { label: "FEB", collect: 520000, target: 500000 },
  { label: "MAR", collect: 480000, target: 500000 },
  { label: "APR", collect: 610000, target: 600000 },
  { label: "MAY", collect: 750000, target: 700000 },
  { label: "JUN", collect: 820000, target: 800000 },
];

const methodBreakdown = [
  { name: "UPI", value: 65, color: "#3b82f6" },
  { name: "BANK", value: 20, color: "#8b5cf6" },
  { name: "CASH", value: 10, color: "#f59e0b" },
  { name: "OTHER", value: 5, color: "#9ca3af" },
];

const initialTransactions = [
  { id: "TXN-492", student: "ROHIT SHARMA", amount: 12500, method: "UPI", date: "21 MAY", status: "SUCCESS" },
  { id: "TXN-491", student: "VIRAT KOHLI", amount: 8000, method: "CASH", date: "21 MAY", status: "SUCCESS" },
  { id: "TXN-490", student: "KL RAHUL", amount: 15000, method: "BANK", date: "20 MAY", status: "PROCESSING" },
  { id: "TXN-489", student: "ISHAN KISHAN", amount: 12500, method: "UPI", date: "20 MAY", status: "FAILED" },
];

const downloadCSV = (rows, fileName) => {
  const csv = rows
    .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};

const FeeReports = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [methodFilter, setMethodFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const transactions = useMemo(() => {
    const q = search.trim().toLowerCase();

    return initialTransactions.filter((txn) => {
      const matchSearch =
        !q ||
        `${txn.id} ${txn.student} ${txn.method} ${txn.status}`
          .toLowerCase()
          .includes(q);

      const matchMethod = methodFilter === "All" || txn.method === methodFilter;
      const matchStatus = statusFilter === "All" || txn.status === statusFilter;

      return matchSearch && matchMethod && matchStatus;
    });
  }, [search, methodFilter, statusFilter]);

  const totalCollected = transactions
    .filter((t) => t.status === "SUCCESS")
    .reduce((sum, t) => sum + t.amount, 0);

  const outstanding = transactions
    .filter((t) => t.status !== "SUCCESS")
    .reduce((sum, t) => sum + t.amount, 0);

  const exportIntel = () => {
    downloadCSV(
      [
        ["Fee Intelligence Report"],
        ["Method Filter", methodFilter],
        ["Status Filter", statusFilter],
        ["Total Collected", totalCollected],
        ["Outstanding", outstanding],
        [],
        ["Transaction ID", "Student", "Amount", "Method", "Date", "Status"],
        ...transactions.map((t) => [
          t.id,
          t.student,
          t.amount,
          t.method,
          t.date,
          t.status,
        ]),
      ],
      "fee-intelligence-report.csv"
    );
  };

  const downloadLedger = () => {
    downloadCSV(
      [
        ["Transaction ID", "Student", "Amount", "Method", "Date", "Status"],
        ...transactions.map((t) => [
          t.id,
          t.student,
          t.amount,
          t.method,
          t.date,
          t.status,
        ]),
      ],
      "fee-ledger.csv"
    );
  };

  const resetFilters = () => {
    setMethodFilter("All");
    setStatusFilter("All");
    setSearch("");
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-6 p-3 pb-10 sm:p-5 lg:p-8">
      <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:h-12 sm:w-12">
              <CircleDollarSign size={24} />
            </div>

            <div>
              <h1 className="text-xl font-black uppercase text-gray-900 sm:text-2xl">
                Treasury: <span className="text-blue-600">Financial Reports</span>
              </h1>
              <p className="mt-1 text-sm font-medium text-gray-500">
                Revenue surveillance and fee collection audit.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex">
            <button
              type="button"
              onClick={() => setShowFilters((p) => !p)}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-100 bg-white px-4 text-xs font-black uppercase text-gray-600 shadow-sm hover:bg-gray-50"
            >
              {showFilters ? <X size={16} /> : <Filter size={16} />}
              {showFilters ? "Close Filter" : "Filter"}
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

        {showFilters && (
          <div className="mt-5 grid grid-cols-1 gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["All", "UPI", "CASH", "BANK", "OTHER"].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["All", "SUCCESS", "PROCESSING", "FAILED"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>

            <button
              type="button"
              onClick={resetFilters}
              className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black uppercase text-gray-600 hover:bg-gray-50"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() => setShowFilters(false)}
              className="h-11 rounded-xl bg-blue-600 px-4 text-xs font-black uppercase text-white hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Gross Revenue" value="₹32.4L" detail="Total Collection" icon={<TrendingUp size={20} />} color="emerald" />
        <StatCard title="Monthly Delta" value="₹8.2L" detail="Current Month" icon={<CircleDollarSign size={20} />} color="blue" />
        <StatCard title="Outstanding" value={`₹${outstanding.toLocaleString("en-IN")}`} detail="Pending / Failed" icon={<AlertCircle size={20} />} color="rose" />
        <StatCard title="Fee Renewal" value="94%" detail="Student Retention" icon={<CreditCard size={20} />} color="purple" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 xl:col-span-2 xl:p-8">
          <div className="mb-6">
            <h3 className="text-sm font-black uppercase text-gray-900">
              Revenue Trajectory
            </h3>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Collection vs projected target
            </p>
          </div>

          <div className="h-[260px] w-full sm:h-[330px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={collectionData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: "#9ca3af" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: "#9ca3af" }} tickFormatter={(v) => `₹${v / 1000}K`} />
                <Tooltip />
                <Bar dataKey="collect" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="target" fill="#e5e7eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 xl:p-8">
          <h3 className="mb-6 text-sm font-black uppercase text-gray-900">
            Channel Integrity
          </h3>

          <div className="space-y-5">
            {methodBreakdown.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() =>
                  setMethodFilter((prev) => (prev === item.name ? "All" : item.name))
                }
                className="block w-full rounded-xl p-2 text-left hover:bg-gray-50"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {item.name}
                  </span>
                  <span className="text-xs font-black text-gray-900">
                    {item.value}%
                  </span>
                </div>

                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <div className="mb-2 flex items-center gap-3 text-blue-600">
              <TrendingUp size={20} />
              <span className="text-xs font-black uppercase">Growth Insight</span>
            </div>
            <p className="text-xs font-bold leading-5 text-blue-800">
              Digital payments surged by 15% this quarter.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-50 p-4 lg:flex-row lg:items-center lg:justify-between lg:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-[10px] font-black uppercase text-gray-400">
              <Calendar size={14} />
              MAY 2024
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-[10px] font-black uppercase text-gray-400">
              <Filter size={14} />
              {methodFilter === "All" ? "All Methods" : methodFilter}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transaction..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 lg:w-64"
              />
            </div>

            <button
              type="button"
              onClick={downloadLedger}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-[10px] font-black uppercase text-white shadow-lg hover:bg-blue-700"
            >
              <FileText size={14} />
              Download Ledger
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {transactions.map((txn) => (
            <TransactionCard key={txn.id} txn={txn} />
          ))}

          {!transactions.length && (
            <p className="py-8 text-center text-xs font-black uppercase tracking-widest text-gray-400">
              No transactions found
            </p>
          )}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[820px] text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <TableHead>Transaction Ref</TableHead>
                <TableHead>Client Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Method</TableHead>
                <TableHead right>Verification</TableHead>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50 text-xs font-black uppercase">
              {transactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-5 font-bold tracking-widest text-gray-400">
                    {txn.id}
                  </td>
                  <td className="px-6 py-5 text-gray-900">{txn.student}</td>
                  <td className="px-6 py-5 text-gray-900">
                    ₹{txn.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-5">
                    <span className="rounded border border-gray-100 px-2 py-1 text-[10px] text-gray-400">
                      {txn.method}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <Status status={txn.status} />
                  </td>
                </tr>
              ))}

              {!transactions.length && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-xs font-black uppercase tracking-widest text-gray-400">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 bg-gray-50/40 p-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Showing {transactions.length} transactions
          </p>
        </div>
      </div>
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
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <div className={`mb-4 w-fit rounded-2xl p-3 ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        {title}
      </p>
      <h3 className="mt-1 text-3xl font-black text-gray-900">{value}</h3>
      <p className="mt-1 text-xs font-bold text-gray-400">{detail}</p>
    </div>
  );
};

const TransactionCard = ({ txn }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-black text-blue-600">{txn.id}</p>
        <h3 className="mt-1 font-black text-gray-900">{txn.student}</h3>
        <p className="text-xs text-gray-500">{txn.date} • {txn.method}</p>
      </div>
      <Status status={txn.status} />
    </div>

    <div className="mt-4 rounded-2xl bg-gray-50 p-4">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        Amount
      </p>
      <p className="mt-1 text-2xl font-black text-gray-900">
        ₹{txn.amount.toLocaleString("en-IN")}
      </p>
    </div>
  </div>
);

const TableHead = ({ children, right }) => (
  <th className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 ${right ? "text-right" : ""}`}>
    {children}
  </th>
);

const Status = ({ status }) => (
  <span
    className={`text-[10px] font-black italic ${
      status === "SUCCESS"
        ? "text-emerald-600"
        : status === "FAILED"
        ? "text-rose-600"
        : "text-amber-600"
    }`}
  >
    {status}
  </span>
);

export default FeeReports;