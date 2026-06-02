import React, { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  CalendarDays,
  CreditCard,
  Download,
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

const coachOptions = ["RABINDRANATH SARKAR", "ANKITA MUKHERJEE", "SUSHANT SINGH", "PRIYA DAS"];

const initialPayments = [
  { id: "PF-001", coach: "RABINDRANATH SARKAR", amount: "₹15,000", method: "Bank Transfer", date: "2026-05-28", note: "Monthly honorarium" },
  { id: "PF-002", coach: "ANKITA MUKHERJEE", amount: "₹10,000", method: "Cash", date: "2026-05-20", note: "Replacement session" },
  { id: "PF-003", coach: "SUSHANT SINGH", amount: "₹12,500", method: "UPI", date: "2026-05-15", note: "Training incentive" },
];

const blankForm = { coach: coachOptions[0], amount: "", date: "", method: "Cash", note: "" };

const CoachFee = () => {
  const [tab, setTab] = useState("list");
  const [search, setSearch] = useState("");
  const [payments, setPayments] = useState(initialPayments);
  const [form, setForm] = useState(blankForm);
  const [editId, setEditId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [msg, setMsg] = useState("");

  const showMsg = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2200);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return payments.filter((p) =>
      [p.id, p.coach, p.amount, p.method, p.date, p.note]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [payments, search]);

  const resetForm = () => {
    setForm(blankForm);
    setEditId(null);
  };

  const openCreate = () => {
    resetForm();
    setTab("create");
  };

  const openEdit = (p) => {
    setSelected(null);
    setEditId(p.id);
    setForm({
      coach: p.coach,
      amount: p.amount.replace("₹", "").replaceAll(",", ""),
      date: p.date,
      method: p.method,
      note: p.note,
    });
    setTab("create");
  };

  const savePayment = (e) => {
    e.preventDefault();

    if (!form.amount || Number(form.amount) <= 0) {
      showMsg("Please enter valid amount.");
      return;
    }

    const record = {
      id: editId || `PF-${String(payments.length + 1).padStart(3, "0")}`,
      coach: form.coach,
      amount: `₹${Number(form.amount).toLocaleString("en-IN")}`,
      method: form.method,
      date: form.date || new Date().toISOString().slice(0, 10),
      note: form.note || "No note added",
    };

    setPayments((prev) =>
      editId ? prev.map((p) => (p.id === editId ? record : p)) : [record, ...prev]
    );

    resetForm();
    setTab("list");
    showMsg(editId ? "Payment updated successfully." : "Payment added successfully.");
  };

  const deletePayment = (p) => {
    if (!window.confirm(`Delete ${p.id}?`)) return;
    setPayments((prev) => prev.filter((x) => x.id !== p.id));
    setSelected(null);
    showMsg("Payment deleted successfully.");
  };

  const downloadFile = (data, name) => {
    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPayment = (p) => downloadFile(JSON.stringify(p, null, 2), `${p.id}.txt`);

  const downloadAll = () => {
    const rows = [
      ["Receipt", "Coach", "Amount", "Method", "Date", "Note"],
      ...payments.map((p) => [p.id, p.coach, p.amount, p.method, p.date, p.note]),
    ];

    const csv = rows.map((r) => r.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(",")).join("\n");
    downloadFile(csv, "coach-fee-payments.csv");
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 sm:p-5 lg:p-8">
      {msg && (
        <div className="mb-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
          {msg}
        </div>
      )}

      <div className="mb-5 flex flex-col gap-4 border-b border-gray-100 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
            Coach Management
          </p>
          <h1 className="mt-2 text-2xl font-black uppercase text-gray-900 sm:text-3xl">
            Coach Fee
          </h1>
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-400">
            Payment history and coach fee entry
          </p>
        </div>

        <div className="grid w-full grid-cols-2 rounded-2xl border border-gray-100 bg-white p-1 shadow-sm sm:w-auto">
          <button
            type="button"
            onClick={() => setTab("list")}
            className={`rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-widest ${
              tab === "list" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Payment List
          </button>

          <button
            type="button"
            onClick={openCreate}
            className={`rounded-xl px-3 py-2 text-[10px] font-black uppercase tracking-widest ${
              tab === "create" ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Create Payment
          </button>
        </div>
      </div>

      {tab === "list" ? (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search payment..."
                className="w-full rounded-xl bg-gray-50 py-3 pl-11 pr-4 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:w-auto">
              <Button onClick={openCreate} blue icon={<Plus size={16} />} text="Add Payment" />
              <Button onClick={downloadAll} icon={<Download size={16} />} text="Download All" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filtered.map((p) => (
              <div key={p.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Receipt</p>
                    <p className="mt-1 text-lg font-black text-gray-900">{p.id}</p>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                    <CreditCard size={18} />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  <Mini label="Coach" value={p.coach} />
                  <Mini label="Amount" value={p.amount} />
                  <Mini label="Date" value={p.date} />
                  <Mini label="Method" value={p.method} />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Action label="View" icon={<Eye size={14} />} onClick={() => setSelected(p)} />
                  <Action label="Edit" icon={<Pencil size={14} />} onClick={() => openEdit(p)} />
                  <Action danger label="Delete" icon={<Trash2 size={14} />} onClick={() => deletePayment(p)} />
                  <Action label="Download" icon={<Download size={14} />} onClick={() => downloadPayment(p)} />
                </div>
              </div>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="min-w-[850px] w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-widest text-gray-500">
                    <th className="px-4 py-3">Receipt</th>
                    <th className="px-4 py-3">Coach</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Method</th>
                    <th className="px-4 py-3">Note</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-4 font-black text-gray-900">{p.id}</td>
                      <td className="px-4 py-4 font-semibold text-gray-700">{p.coach}</td>
                      <td className="px-4 py-4 font-black text-gray-900">{p.amount}</td>
                      <td className="px-4 py-4 text-gray-500">{p.date}</td>
                      <td className="px-4 py-4 text-gray-500">{p.method}</td>
                      <td className="px-4 py-4 text-gray-500">{p.note}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <Action label="View" icon={<Eye size={14} />} onClick={() => setSelected(p)} />
                          <Action label="Edit" icon={<Pencil size={14} />} onClick={() => openEdit(p)} />
                          <Action danger label="Delete" icon={<Trash2 size={14} />} onClick={() => deletePayment(p)} />
                          <Action label="Download" icon={<Download size={14} />} onClick={() => downloadPayment(p)} />
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!filtered.length && (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-gray-400">
                        No payments found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <form onSubmit={savePayment} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 lg:col-span-2">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                  {editId ? "Edit Payment" : "Create Payment"}
                </p>
                <h2 className="mt-1 text-xl font-black uppercase text-gray-900">
                  {editId ? "Update Coach Fee" : "Record Coach Fee"}
                </h2>
              </div>

              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-xs font-black uppercase text-gray-600 hover:bg-gray-50"
                >
                  <X size={14} /> Clear
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Coach">
                <select name="coach" value={form.coach} onChange={(e) => setForm({ ...form, coach: e.target.value })} className="input-style">
                  {coachOptions.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>

              <Field label="Amount">
                <input name="amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="15000" className="input-style" />
              </Field>

              <Field label="Date">
                <div className="relative">
                  <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="date" name="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-style pl-11" />
                </div>
              </Field>

              <Field label="Method">
                <select name="method" value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} className="input-style">
                  <option>Cash</option>
                  <option>Bank Transfer</option>
                  <option>UPI</option>
                  <option>Cheque</option>
                </select>
              </Field>

              <Field label="Note" className="sm:col-span-2">
                <textarea name="note" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows="4" placeholder="Optional note" className="input-style" />
              </Field>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setTab("list")} className="rounded-xl border border-gray-200 px-5 py-3 text-xs font-black uppercase text-gray-600 hover:bg-gray-50">
                Cancel
              </button>

              <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-black uppercase text-white hover:bg-blue-700">
                <ArrowLeftRight size={16} />
                {editId ? "Update Payment" : "Save Payment"}
              </button>
            </div>
          </form>

          <aside className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-5 text-white shadow-xl sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">Summary</p>
            <h2 className="mt-2 text-2xl font-black uppercase">Coach Fee Entry</h2>
            <p className="mt-2 text-sm text-blue-100">Manage payments in one responsive module.</p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <Summary label="Total Payments" value={payments.length} />
              <Summary label="Latest Entry" value={payments[0]?.date || "N/A"} />
            </div>
          </aside>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Payment Details</p>
                <h3 className="mt-1 text-2xl font-black text-gray-900">{selected.id}</h3>
              </div>

              <button type="button" onClick={() => setSelected(null)} className="rounded-xl p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-900">
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Mini label="Coach" value={selected.coach} />
              <Mini label="Amount" value={selected.amount} />
              <Mini label="Date" value={selected.date} />
              <Mini label="Method" value={selected.method} />
              <Mini label="Note" value={selected.note} wide />
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => openEdit(selected)} className="rounded-xl border border-gray-200 px-4 py-3 text-xs font-black uppercase text-gray-600 hover:bg-gray-50">
                Edit
              </button>

              <button type="button" onClick={() => downloadPayment(selected)} className="rounded-xl bg-blue-600 px-4 py-3 text-xs font-black uppercase text-white hover:bg-blue-700">
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .input-style {
          width: 100%;
          border-radius: 0.75rem;
          background: #f9fafb;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          font-weight: 700;
          outline: none;
        }
        .input-style:focus {
          box-shadow: 0 0 0 2px #3b82f6;
        }
      `}</style>
    </div>
  );
};

const Button = ({ text, icon, onClick, blue }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-black uppercase ${
      blue ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
    }`}
  >
    {icon}
    {text}
  </button>
);

const Action = ({ label, icon, onClick, danger }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-[11px] font-black uppercase ${
      danger
        ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
    }`}
  >
    {icon}
    {label}
  </button>
);

const Field = ({ label, children, className = "" }) => (
  <label className={`block ${className}`}>
    <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</span>
    {children}
  </label>
);

const Mini = ({ label, value, wide }) => (
  <div className={`rounded-2xl bg-gray-50 p-3 ${wide ? "sm:col-span-2" : ""}`}>
    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">{label}</p>
    <p className="mt-1 break-words text-sm font-bold text-gray-900">{value}</p>
  </div>
);

const Summary = ({ label, value }) => (
  <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
    <p className="text-[9px] font-black uppercase tracking-widest text-blue-100">{label}</p>
    <p className="mt-1 text-lg font-black">{value}</p>
  </div>
);

export default CoachFee;