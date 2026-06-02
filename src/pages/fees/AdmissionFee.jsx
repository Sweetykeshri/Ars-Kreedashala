import React, { useMemo, useState } from "react";
import {
  CreditCard, Search, Filter, Download, Plus, User, FileText,
  Printer, X, Building2, Mail, Phone, Globe, MapPin, BadgeCheck
} from "lucide-react";

const company = {
  logo: "/logo.png",
  name: "ARS KREEDASHALA PRIVATE LIMITED",
  address: "Daladali, Ranchi, Jharkhand, India",
  contact: "+91 00000 00000",
  email: "contact@arskreedashala.com",
  website: "www.arskreedashala.com",
};

const initialRecords = [
  { id: "ARS-REC-001", studentId: "STU001", student: "Arjun Sharma", guardian: "Ramesh Sharma", contact: "9876543210", sport: "Cricket", batch: "Morning Elite", branch: "Daladali", admissionDate: "2024-05-15", receiptDate: "2024-05-15", mode: "UPI", transactionId: "UPI45872190", status: "Paid", feeBreakdown: [{ title: "Admission Fee", amount: 4000 }, { title: "Registration Charges", amount: 500 }, { title: "Kit / ID Processing", amount: 500 }] },
  { id: "ARS-REC-002", studentId: "STU002", student: "Suhani Rao", guardian: "Amit Rao", contact: "9876500001", sport: "Football", batch: "Evening Juniors", branch: "Main Branch", admissionDate: "2024-05-18", receiptDate: "2024-05-18", mode: "Cash", transactionId: "-", status: "Partial", feeBreakdown: [{ title: "Admission Fee", amount: 3000 }, { title: "Registration Charges", amount: 500 }, { title: "Kit / ID Processing", amount: 0 }] },
  { id: "ARS-REC-003", studentId: "STU003", student: "Ishaan Gupta", guardian: "Manish Gupta", contact: "9876500002", sport: "Cricket", batch: "Morning Elite", branch: "Daladali", admissionDate: "2024-05-20", receiptDate: "2024-05-20", mode: "Card", transactionId: "CARD774522", status: "Paid", feeBreakdown: [{ title: "Admission Fee", amount: 4000 }, { title: "Registration Charges", amount: 500 }, { title: "Kit / ID Processing", amount: 500 }] },
];

const blankForm = {
  student: "",
  studentId: "",
  guardian: "",
  contact: "",
  sport: "Cricket",
  batch: "",
  branch: "Daladali",
  amount: "",
  mode: "UPI",
  transactionId: "",
  status: "Paid",
};

const AdmissionFee = () => {
  const [records, setRecords] = useState(initialRecords);
  const [form, setForm] = useState(blankForm);
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [msg, setMsg] = useState("");

  const showMsg = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2200);
  };

  const total = (r) => r.feeBreakdown.reduce((s, i) => s + Number(i.amount || 0), 0);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return records.filter((r) => {
      const matchSearch = `${r.id} ${r.student} ${r.studentId} ${r.sport} ${r.mode} ${r.status}`
        .toLowerCase()
        .includes(q);

      const matchStatus = statusFilter === "All" || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [records, search, statusFilter]);

  const updateForm = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const processPayment = (e) => {
    e.preventDefault();

    if (!form.student || !form.studentId || !form.amount) {
      showMsg("Please fill student name, student ID and amount.");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    const newRecord = {
      id: `ARS-REC-${String(records.length + 1).padStart(3, "0")}`,
      studentId: form.studentId,
      student: form.student,
      guardian: form.guardian || "-",
      contact: form.contact || "-",
      sport: form.sport,
      batch: form.batch || "-",
      branch: form.branch,
      admissionDate: today,
      receiptDate: today,
      mode: form.mode,
      transactionId: form.transactionId || "-",
      status: form.status,
      feeBreakdown: [{ title: "Admission Fee", amount: Number(form.amount) }],
    };

    setRecords((prev) => [newRecord, ...prev]);
    setForm(blankForm);
    setShowForm(false);
    setSelected(newRecord);
    showMsg("Payment processed successfully.");
  };

  const exportCSV = () => {
    const rows = [
      ["Receipt", "Student", "Student ID", "Sport", "Amount", "Date", "Mode", "Status"],
      ...filtered.map((r) => [r.id, r.student, r.studentId, r.sport, total(r), r.receiptDate, r.mode, r.status]),
    ];

    const csv = rows.map((row) => row.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "admission-fee-records.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const receiptHTML = (r) => `
    <html>
      <head>
        <title>${r.id}</title>
        <style>
          body{font-family:Arial;padding:20px;background:#f3f4f6;color:#111827}
          .box{max-width:850px;margin:auto;background:white;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden}
          .strip{height:8px;background:#8B8B00}
          .head,.grid,.pay,.foot{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:20px}
          h1{font-size:20px;margin:0;text-transform:uppercase}.muted{color:#6b7280;font-size:12px}
          .card{border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#fafafa}
          .row{display:flex;justify-content:space-between;border-bottom:1px dashed #ddd;padding:8px 0;font-size:13px}
          table{width:100%;border-collapse:collapse;margin-top:12px}th{background:#111827;color:#fff}th,td{padding:12px;border-bottom:1px solid #eee;text-align:left}td:last-child,th:last-child{text-align:right}
          .total{font-size:18px;font-weight:900;color:#8B8B00}.sign{text-align:center;margin-top:35px;border-top:1px solid #111;padding-top:10px}
          @media(max-width:700px){.head,.grid,.pay,.foot{grid-template-columns:1fr}.head{padding:14px}body{padding:8px}}
          @media print{body{background:white}.box{border:0}}
        </style>
      </head>
      <body>
        <div class="box">
          <div class="strip"></div>
          <div class="head">
            <div>
              <h1>${company.name}</h1>
              <p class="muted">${company.address}</p>
              <p class="muted">${company.contact} | ${company.email}</p>
              <p class="muted">${company.website}</p>
            </div>
            <div class="card">
              <h1>Fee Receipt</h1>
              <p><b>Receipt:</b> ${r.id}</p>
              <p><b>Date:</b> ${r.receiptDate}</p>
            </div>
          </div>

          <div class="grid">
            <div class="card">
              <h3>Student Details</h3>
              <div class="row"><b>Name</b><span>${r.student}</span></div>
              <div class="row"><b>ID</b><span>${r.studentId}</span></div>
              <div class="row"><b>Guardian</b><span>${r.guardian}</span></div>
              <div class="row"><b>Contact</b><span>${r.contact}</span></div>
            </div>
            <div class="card">
              <h3>Admission Details</h3>
              <div class="row"><b>Sport</b><span>${r.sport}</span></div>
              <div class="row"><b>Batch</b><span>${r.batch}</span></div>
              <div class="row"><b>Branch</b><span>${r.branch}</span></div>
              <div class="row"><b>Admission</b><span>${r.admissionDate}</span></div>
            </div>
          </div>

          <div style="padding:20px">
            <table>
              <thead><tr><th>Description</th><th>Amount</th></tr></thead>
              <tbody>
                ${r.feeBreakdown.map((i) => `<tr><td>${i.title}</td><td>₹${Number(i.amount).toLocaleString("en-IN")}</td></tr>`).join("")}
                <tr><td><b>Total Paid</b></td><td class="total">₹${total(r).toLocaleString("en-IN")}</td></tr>
              </tbody>
            </table>
          </div>

          <div class="pay">
            <div class="card"><b>Payment Mode</b><br/>${r.mode}</div>
            <div class="card"><b>Status</b><br/>${r.status}</div>
          </div>

          <div class="foot">
            <p class="muted">This is a system-generated receipt by ${company.name}. Please keep it for future reference.</p>
            <div class="sign">Authorized Signature</div>
          </div>
        </div>
      </body>
    </html>
  `;

  const printReceipt = (r) => {
    const win = window.open("", "_blank");
    if (!win) return alert("Please allow popups.");
    win.document.write(receiptHTML(r));
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 300);
  };

  const downloadReceipt = (r) => {
    const url = URL.createObjectURL(new Blob([receiptHTML(r)], { type: "text/html" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `${r.id}-receipt.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusClass = (s) =>
    s === "Paid"
      ? "bg-green-100 text-green-700 border-green-200"
      : s === "Partial"
      ? "bg-amber-100 text-amber-700 border-amber-200"
      : "bg-red-100 text-red-700 border-red-200";

  return (
    <div className="w-full max-w-full overflow-x-hidden space-y-5 p-3 pb-10 sm:p-5 lg:p-8">
      {msg && (
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
          {msg}
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-black text-gray-800 sm:text-2xl">Admission Fee Collection</h1>
          <p className="text-sm font-medium text-gray-500">Manage payments and generate receipts.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700 md:w-auto"
        >
          <Plus size={18} />
          {showForm ? "Hide Form" : "New Collection"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={processPayment} className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-gray-800">
            <CreditCard className="text-blue-600" size={20} />
            Fee Collection Form
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Input icon={User} label="Student Name" value={form.student} onChange={(v) => updateForm("student", v)} />
            <Input label="Student ID" value={form.studentId} onChange={(v) => updateForm("studentId", v)} />
            <Input label="Guardian" value={form.guardian} onChange={(v) => updateForm("guardian", v)} />
            <Input label="Contact" value={form.contact} onChange={(v) => updateForm("contact", v)} />
            <Input label="Batch" value={form.batch} onChange={(v) => updateForm("batch", v)} />
            <Input label="Amount ₹" type="number" value={form.amount} onChange={(v) => updateForm("amount", v)} />

            <Select label="Sport" value={form.sport} onChange={(v) => updateForm("sport", v)} options={["Cricket", "Football", "Badminton", "Fitness"]} />
            <Select label="Payment Mode" value={form.mode} onChange={(v) => updateForm("mode", v)} options={["UPI", "Cash", "Card", "Bank Transfer"]} />
            <Select label="Status" value={form.status} onChange={(v) => updateForm("status", v)} options={["Paid", "Partial", "Pending"]} />
            <Input label="Transaction ID" value={form.transactionId} onChange={(v) => updateForm("transactionId", v)} />
          </div>

          <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => setShowForm(false)} className="rounded-xl px-6 py-3 font-bold text-gray-600 hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" className="rounded-xl bg-green-600 px-6 py-3 font-bold text-white hover:bg-green-700">
              Process Payment
            </button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-100 bg-gray-50/50 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search receipt, student, sport, mode..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex">
            <button type="button" onClick={() => setShowFilter(!showFilter)} className="btn-light">
              <Filter size={16} /> Filter
            </button>
            <button type="button" onClick={exportCSV} className="btn-light">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {showFilter && (
          <div className="border-b border-gray-100 p-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 sm:w-60"
            >
              {["All", "Paid", "Partial", "Pending"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
          {filtered.map((r) => (
            <div key={r.id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black text-blue-600">{r.id}</p>
                  <h3 className="mt-1 font-black text-gray-900">{r.student}</h3>
                  <p className="text-xs text-gray-500">{r.studentId} • {r.guardian}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase ${statusClass(r.status)}`}>
                  {r.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <Mini label="Sport" value={r.sport} />
                <Mini label="Amount" value={`₹${total(r).toLocaleString("en-IN")}`} />
                <Mini label="Date" value={r.receiptDate} />
                <Mini label="Mode" value={r.mode} />
              </div>

              <button onClick={() => setSelected(r)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-xs font-black uppercase text-blue-600 hover:bg-blue-100">
                <FileText size={16} /> View Receipt
              </button>
            </div>
          ))}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-white text-xs font-bold uppercase tracking-widest text-gray-500">
                <th className="px-5 py-4">Receipt</th>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Admission</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Mode</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-center">Receipt</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-blue-50/30">
                  <td className="px-5 py-4 text-sm font-black text-blue-600">{r.id}</td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-gray-900">{r.student}</p>
                    <p className="text-xs text-gray-500">{r.studentId} • {r.guardian}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-gray-800">{r.sport}</p>
                    <p className="text-xs text-gray-500">{r.batch}</p>
                  </td>
                  <td className="px-5 py-4 text-sm font-black text-gray-900">₹{total(r).toLocaleString("en-IN")}</td>
                  <td className="px-5 py-4 text-sm text-gray-500">{r.receiptDate}</td>
                  <td className="px-5 py-4 text-sm text-gray-500">{r.mode}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase ${statusClass(r.status)}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button onClick={() => setSelected(r)} className="rounded-xl p-2 text-blue-600 hover:bg-blue-100">
                      <FileText size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!filtered.length && (
          <p className="px-6 py-10 text-center text-xs font-black uppercase tracking-widest text-gray-400">
            No receipt found
          </p>
        )}

        <div className="border-t border-gray-100 bg-gray-50/50 p-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Showing {filtered.length} transactions
          </p>
        </div>
      </div>

      {selected && (
        <ReceiptModal
          record={selected}
          total={total}
          statusClass={statusClass}
          onClose={() => setSelected(null)}
          onPrint={() => printReceipt(selected)}
          onDownload={() => downloadReceipt(selected)}
        />
      )}

      <style>{`
        .btn-light {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          background: white;
          padding: 0.65rem 1rem;
          font-size: 0.875rem;
          font-weight: 700;
          color: #4b5563;
        }
        .btn-light:hover { background: #f9fafb; }
      `}</style>
    </div>
  );
};

const ReceiptModal = ({ record, total, onClose, onPrint, onDownload }) => (
  <div className="fixed inset-0 z-50 bg-gray-100">
    <div className="sticky top-0 z-50 border-b border-gray-200 bg-white px-3 py-3 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-black uppercase text-gray-900 sm:text-lg">Admission Fee Receipt</h3>
          <p className="text-sm text-gray-500">Receipt No: {record.id}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:flex">
          <button onClick={onPrint} className="modal-btn bg-blue-600 text-white hover:bg-blue-700">
            <Printer size={15} /> Print
          </button>
          <button onClick={onDownload} className="modal-btn border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100">
            <Download size={15} /> HTML
          </button>
          <button onClick={onClose} className="modal-btn border border-gray-200 bg-white text-gray-700 hover:bg-gray-50">
            <X size={15} /> Close
          </button>
        </div>
      </div>
    </div>

    <div className="h-[calc(100vh-82px)] overflow-y-auto p-3 sm:p-5 lg:p-8">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="h-2 bg-[#8B8B00]" />

        <div className="grid gap-5 border-b border-gray-200 p-4 sm:p-6 lg:grid-cols-[1.6fr_0.8fr] lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row">
            <CompanyLogo />

            <div>
              <h2 className="text-lg font-black uppercase text-gray-900 sm:text-2xl">{company.name}</h2>
              <div className="mt-3 grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
                <p className="flex gap-2"><MapPin size={16} /> {company.address}</p>
                <p className="flex gap-2"><Phone size={16} /> {company.contact}</p>
                <p className="flex gap-2"><Mail size={16} /> {company.email}</p>
                <p className="flex gap-2"><Globe size={16} /> {company.website}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#8B8B00]/20 bg-[#8B8B00]/5 p-4 lg:text-right">
            <p className="text-xs font-black uppercase text-[#8B8B00]">Admission Fee Receipt</p>
            <h3 className="mt-2 text-xl font-black text-gray-900">{record.id}</h3>
            <p className="mt-1 text-sm font-bold text-gray-500">Date: {record.receiptDate}</p>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Box title="Student Details" icon={User}>
              <ReceiptRow label="Student Name" value={record.student} />
              <ReceiptRow label="Student ID" value={record.studentId} />
              <ReceiptRow label="Guardian" value={record.guardian} />
              <ReceiptRow label="Contact" value={record.contact} />
            </Box>

            <Box title="Admission Details" icon={BadgeCheck}>
              <ReceiptRow label="Sport" value={record.sport} />
              <ReceiptRow label="Batch" value={record.batch} />
              <ReceiptRow label="Branch" value={record.branch} />
              <ReceiptRow label="Admission Date" value={record.admissionDate} />
            </Box>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200">
            <div className="bg-gray-900 px-4 py-3 text-xs font-black uppercase text-white">Fee Breakdown</div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px]">
                <tbody>
                  {record.feeBreakdown.map((i, idx) => (
                    <tr key={idx} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm font-bold text-gray-700">{i.title}</td>
                      <td className="px-4 py-3 text-right text-sm font-black text-gray-900">₹{Number(i.amount).toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                  <tr className="border-t bg-gray-50">
                    <td className="px-4 py-4 text-base font-black text-gray-900">Total Amount Paid</td>
                    <td className="px-4 py-4 text-right text-xl font-black text-[#8B8B00]">₹{total(record).toLocaleString("en-IN")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Mini label="Payment Method" value={record.mode} />
            <Mini label="Transaction ID" value={record.transactionId} />
            <Mini label="Payment Status" value={record.status} />
          </div>

          <div className="mt-8 grid gap-6 border-t border-gray-100 pt-6 lg:grid-cols-[1.5fr_0.6fr] lg:items-end">
            <p className="text-sm leading-6 text-gray-500">
              This receipt confirms the admission fee payment recorded by <b>{company.name}</b>.
            </p>
            <div className="text-center">
              <div className="mb-3 h-16 border-b border-gray-900" />
              <p className="text-xs font-black uppercase tracking-widest">Authorized Signature</p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 pb-6 text-center text-xs font-bold text-gray-500">
        Use Print and choose Save as PDF for PDF format.
      </p>
    </div>

    <style>{`
      .modal-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .45rem;
        border-radius: .75rem;
        padding: .6rem .75rem;
        font-size: 10px;
        font-weight: 900;
        text-transform: uppercase;
      }
    `}</style>
  </div>
);

const CompanyLogo = () => (
  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border bg-white p-2">
    <img src={company.logo} alt="Logo" className="h-full w-full object-contain" onError={(e) => (e.currentTarget.style.display = "none")} />
    <Building2 className="text-[#8B8B00]" size={30} />
  </div>
);

const Input = ({ label, value, onChange, type = "text", icon: Icon }) => (
  <label className="space-y-1.5">
    <span className="text-sm font-semibold text-gray-700">{label}</span>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 ${Icon ? "pl-10" : ""}`}
      />
    </div>
  </label>
);

const Select = ({ label, value, onChange, options }) => (
  <label className="space-y-1.5">
    <span className="text-sm font-semibold text-gray-700">{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  </label>
);

const Mini = ({ label, value }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4">
    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
    <p className="mt-2 break-words text-sm font-black text-gray-900">{value}</p>
  </div>
);

const ReceiptRow = ({ label, value }) => (
  <div className="flex justify-between gap-4 border-b border-dashed border-gray-200 py-2 last:border-b-0">
    <span className="text-xs font-bold uppercase text-gray-500">{label}</span>
    <span className="text-right text-sm font-black text-gray-900">{value}</span>
  </div>
);

const Box = ({ title, icon: Icon, children }) => (
  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
    <h4 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-800">
      <Icon size={16} className="text-[#8B8B00]" />
      {title}
    </h4>
    {children}
  </div>
);

export default AdmissionFee;