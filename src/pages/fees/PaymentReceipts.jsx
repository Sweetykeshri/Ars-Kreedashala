import React, { useMemo, useState } from "react";
import {
  FileText, Search, Download, Printer, Eye, Filter, Share2,
  CheckCircle, Calendar, CreditCard, Clock, X, Building2,
  Mail, Phone, Globe, MapPin, BadgeCheck, User, ShieldCheck
} from "lucide-react";

const companyInfo = {
  logo: "/logo.png",
  name: "ARS KREEDASHALA PRIVATE LIMITED",
  address: "Daladali, Ranchi, Jharkhand, India",
  contact: "+91 00000 00000",
  email: "contact@arskreedashala.com",
  website: "www.arskreedashala.com",
  gstin: "GST / Registration No: Add Here",
};

const receiptsData = [
  {
    id: "ARS240501",
    receiptNo: "ARS/REC/2024/0501",
    studentId: "STU001",
    student: "Arjun Sharma",
    guardian: "Ramesh Sharma",
    contact: "9876543210",
    sport: "Cricket",
    batch: "Morning Elite",
    branch: "Daladali",
    amount: 2500,
    date: "2024-05-05",
    type: "Monthly Fee",
    paymentMode: "UPI / Digital",
    transactionId: "UPI45872190",
    status: "Generated",
    paymentDetails: [
      { label: "Monthly Training Fee", amount: 2500 },
      { label: "Late Fee", amount: 0 },
      { label: "Discount", amount: 0 },
    ],
  },
  {
    id: "ARS240502",
    receiptNo: "ARS/REC/2024/0502",
    studentId: "STU002",
    student: "Suhani Rao",
    guardian: "Amit Rao",
    contact: "9876500001",
    sport: "Football",
    batch: "Evening Juniors",
    branch: "Main Branch",
    amount: 1500,
    date: "2024-05-10",
    type: "Partial Payment",
    paymentMode: "Cash",
    transactionId: "-",
    status: "Generated",
    paymentDetails: [
      { label: "Monthly Training Fee", amount: 2500 },
      { label: "Amount Paid", amount: 1500 },
      { label: "Pending Amount", amount: 1000 },
    ],
  },
  {
    id: "ARS240503",
    receiptNo: "ARS/REC/2024/0503",
    studentId: "STU003",
    student: "Riya Verma",
    guardian: "Sanjay Verma",
    contact: "9876500003",
    sport: "Badminton",
    batch: "Morning Batch",
    branch: "Main Branch",
    amount: 5000,
    date: "2024-05-12",
    type: "Admission Fee",
    paymentMode: "Bank Transfer",
    transactionId: "BNK778811",
    status: "E-Receipt Sent",
    paymentDetails: [
      { label: "Admission Fee", amount: 4000 },
      { label: "Registration Charges", amount: 500 },
      { label: "Kit / ID Processing", amount: 500 },
    ],
  },
  {
    id: "ARS240504",
    receiptNo: "ARS/REC/2024/0504",
    studentId: "STU004",
    student: "Vikram Choudhary",
    guardian: "Manoj Choudhary",
    contact: "9876500004",
    sport: "Fitness",
    batch: "Evening Fitness",
    branch: "Daladali",
    amount: 3000,
    date: "2024-05-14",
    type: "Monthly Fee",
    paymentMode: "Card",
    transactionId: "CARD778899",
    status: "Pending",
    paymentDetails: [
      { label: "Monthly Training Fee", amount: 3000 },
      { label: "Amount Paid", amount: 0 },
      { label: "Pending Amount", amount: 3000 },
    ],
  },
];

const PaymentReceipts = () => {
  const [previewReceipt, setPreviewReceipt] = useState(null);
  const [fullReceipt, setFullReceipt] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredReceipts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return receiptsData.filter((receipt) => {
      const matchSearch =
        !query ||
        `${receipt.id} ${receipt.receiptNo} ${receipt.student} ${receipt.studentId} ${receipt.type} ${receipt.paymentMode} ${receipt.status}`
          .toLowerCase()
          .includes(query);

      const matchStatus =
        statusFilter === "All" || receipt.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [searchTerm, statusFilter]);

  const getStatusStyle = (status) => {
    if (status === "Pending") return "text-amber-600 bg-amber-50 border-amber-100";
    if (status === "E-Receipt Sent") return "text-blue-600 bg-blue-50 border-blue-100";
    return "text-emerald-600 bg-emerald-50 border-emerald-100";
  };

  const generateReceiptHTML = (receipt) => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${receipt.receiptNo}</title>
        <style>
          *{box-sizing:border-box}
          body{margin:0;padding:16px;background:#f3f4f6;color:#111827;font-family:Arial,Helvetica,sans-serif}
          .receipt{max-width:950px;margin:auto;background:white;border:1px solid #e5e7eb;border-radius:16px;overflow:hidden}
          .strip{height:8px;background:#8B8B00}
          .header{display:grid;grid-template-columns:1.5fr .8fr;gap:18px;padding:22px;border-bottom:1px solid #e5e7eb}
          .brand{display:flex;gap:14px;align-items:flex-start}
          .logo{width:74px;height:74px;border:1px solid #e5e7eb;border-radius:14px;object-fit:contain;padding:8px;background:#fff}
          h1{font-size:20px;margin:0;text-transform:uppercase;line-height:1.2}
          .detail{font-size:12px;color:#4b5563;margin:4px 0}
          .title{text-align:right;border:1px solid rgba(139,139,0,.25);background:rgba(139,139,0,.06);border-radius:14px;padding:14px}
          .title h2{margin:0;font-size:18px;color:#8B8B00;text-transform:uppercase}
          .content{padding:22px}
          .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px}
          .box{border:1px solid #e5e7eb;border-radius:14px;padding:14px;background:#fafafa}
          .box h3{margin:0 0 10px;font-size:12px;text-transform:uppercase;letter-spacing:.08em}
          .row{display:flex;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px dashed #e5e7eb;font-size:12px}
          .row:last-child{border-bottom:0}
          .label{color:#6b7280;font-weight:700}
          .value{text-align:right;font-weight:800}
          table{width:100%;border-collapse:collapse;border:1px solid #e5e7eb}
          th{background:#111827;color:#fff;padding:11px;text-align:left;font-size:11px;text-transform:uppercase}
          td{padding:11px;border-bottom:1px solid #e5e7eb;font-size:12px;font-weight:700}
          td:last-child,th:last-child{text-align:right}
          .total td{background:#f9fafb;font-size:15px;font-weight:900}
          .pay{margin-top:16px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
          .mini{border:1px solid #e5e7eb;border-radius:14px;padding:12px}
          .mini span{display:block;font-size:10px;color:#6b7280;font-weight:900;text-transform:uppercase;margin-bottom:7px}
          .footer{margin-top:22px;display:grid;grid-template-columns:1.5fr .7fr;gap:22px;align-items:end;border-top:1px solid #e5e7eb;padding-top:18px}
          .note{font-size:12px;line-height:1.5;color:#6b7280}
          .sign{text-align:center}.line{height:58px;border-bottom:1px solid #111;margin-bottom:10px}
          @media(max-width:768px){body{padding:8px}.header,.grid,.pay,.footer{grid-template-columns:1fr}.brand{flex-direction:column}.title{text-align:left}.content,.header{padding:15px}h1{font-size:17px}}
          @media print{body{background:white;padding:0}.receipt{border:0;border-radius:0}@page{size:A4;margin:10mm}}
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="strip"></div>
          <div class="header">
            <div class="brand">
              <img class="logo" src="${companyInfo.logo}" onerror="this.style.display='none'" />
              <div>
                <h1>${companyInfo.name}</h1>
                <p class="detail">${companyInfo.address}</p>
                <p class="detail">Contact: ${companyInfo.contact}</p>
                <p class="detail">Email: ${companyInfo.email}</p>
                <p class="detail">Website: ${companyInfo.website}</p>
                <p class="detail">${companyInfo.gstin}</p>
              </div>
            </div>
            <div class="title">
              <h2>Payment Receipt</h2>
              <p><b>Receipt No:</b> ${receipt.receiptNo}</p>
              <p><b>Date:</b> ${receipt.date}</p>
            </div>
          </div>

          <div class="content">
            <div class="grid">
              <div class="box">
                <h3>Student Details</h3>
                <div class="row"><span class="label">Student</span><span class="value">${receipt.student}</span></div>
                <div class="row"><span class="label">Student ID</span><span class="value">${receipt.studentId}</span></div>
                <div class="row"><span class="label">Guardian</span><span class="value">${receipt.guardian}</span></div>
                <div class="row"><span class="label">Contact</span><span class="value">${receipt.contact}</span></div>
              </div>
              <div class="box">
                <h3>Payment Details</h3>
                <div class="row"><span class="label">Type</span><span class="value">${receipt.type}</span></div>
                <div class="row"><span class="label">Sport</span><span class="value">${receipt.sport}</span></div>
                <div class="row"><span class="label">Batch</span><span class="value">${receipt.batch}</span></div>
                <div class="row"><span class="label">Branch</span><span class="value">${receipt.branch}</span></div>
              </div>
            </div>

            <div class="box">
              <h3>Amount Breakdown</h3>
              <table>
                <thead><tr><th>Description</th><th>Amount</th></tr></thead>
                <tbody>
                  ${receipt.paymentDetails
                    .map(
                      (item) => `
                        <tr>
                          <td>${item.label}</td>
                          <td>₹${Number(item.amount).toLocaleString("en-IN")}</td>
                        </tr>
                      `
                    )
                    .join("")}
                  <tr class="total">
                    <td>Amount Paid</td>
                    <td>₹${Number(receipt.amount).toLocaleString("en-IN")}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="pay">
              <div class="mini"><span>Payment Method</span><strong>${receipt.paymentMode}</strong></div>
              <div class="mini"><span>Transaction ID</span><strong>${receipt.transactionId}</strong></div>
              <div class="mini"><span>Status</span><strong>${receipt.status}</strong></div>
            </div>

            <div class="footer">
              <div class="note"><b>Note:</b> This receipt confirms that the payment has been recorded by ${companyInfo.name}. This is a system-generated receipt.</div>
              <div class="sign"><div class="line"></div><p><b>Authorized Signature / Stamp</b></p></div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const printReceipt = (receipt) => {
    const win = window.open("", "_blank");
    if (!win) return alert("Popup blocked. Please allow popups.");
    win.document.write(generateReceiptHTML(receipt));
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 300);
  };

  const downloadReceiptHTML = (receipt) => {
    const url = URL.createObjectURL(
      new Blob([generateReceiptHTML(receipt)], { type: "text/html;charset=utf-8" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `${receipt.id}-payment-receipt.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAll = () => {
    const rows = [
      ["Receipt No", "Student", "Student ID", "Amount", "Type", "Mode", "Status", "Date"],
      ...filteredReceipts.map((r) => [
        r.receiptNo,
        r.student,
        r.studentId,
        r.amount,
        r.type,
        r.paymentMode,
        r.status,
        r.date,
      ]),
    ];

    const csv = rows
      .map((row) => row.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "payment-receipts.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareReceipt = async (receipt) => {
    const text = `${companyInfo.name}\nReceipt: ${receipt.receiptNo}\nStudent: ${receipt.student}\nAmount: ₹${receipt.amount}\nDate: ${receipt.date}`;

    if (navigator.share) {
      await navigator.share({ title: "Payment Receipt", text });
    } else {
      await navigator.clipboard.writeText(text);
      alert("Receipt details copied.");
    }
  };

  const openFullReceipt = (receipt) => {
    setPreviewReceipt(receipt);
    setFullReceipt(receipt);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden p-3 pb-10 sm:p-5 lg:p-8">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-black text-gray-800 sm:text-2xl">
                Payment Receipts
              </h1>
              <p className="text-sm font-medium text-gray-500">
                Track, preview, print and download payment receipts.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-gray-100 bg-gray-50/30 p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search receipt, student, type or mode..."
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => setShowFilter(!showFilter)}
                  className="btn-light"
                >
                  <Filter size={16} />
                  Filter
                </button>

                <button
                  type="button"
                  onClick={exportAll}
                  className="btn-blue"
                >
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>

            {showFilter && (
              <div className="border-b border-gray-100 p-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500 sm:w-64"
                >
                  {["All", "Generated", "E-Receipt Sent", "Pending"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
              {filteredReceipts.map((receipt) => (
                <div
                  key={receipt.id}
                  className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-black text-blue-600">
                        {receipt.receiptNo}
                      </p>
                      <h3 className="mt-1 font-black text-gray-900">
                        {receipt.student}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {receipt.studentId} • {receipt.sport}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-black uppercase ${getStatusStyle(receipt.status)}`}
                    >
                      {receipt.status === "Pending" ? <Clock size={12} /> : <CheckCircle size={12} />}
                      {receipt.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Mini label="Amount" value={`₹${receipt.amount.toLocaleString("en-IN")}`} />
                    <Mini label="Type" value={receipt.type} />
                    <Mini label="Mode" value={receipt.paymentMode} />
                    <Mini label="Date" value={receipt.date} />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <ActionButton label="View" icon={<Eye size={14} />} onClick={() => openFullReceipt(receipt)} />
                    <ActionButton label="Print" icon={<Printer size={14} />} onClick={() => printReceipt(receipt)} />
                    <ActionButton label="HTML" icon={<Download size={14} />} onClick={() => downloadReceiptHTML(receipt)} />
                    <ActionButton label="Share" icon={<Share2 size={14} />} onClick={() => shareReceipt(receipt)} />
                  </div>
                </div>
              ))}

              {!filteredReceipts.length && (
                <p className="py-8 text-center text-xs font-black uppercase tracking-widest text-gray-400">
                  No receipts found
                </p>
              )}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[860px] text-left">
                <thead>
                  <tr className="border-b border-gray-50 bg-white text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <th className="px-5 py-4">Receipt Info</th>
                    <th className="px-5 py-4">Student</th>
                    <th className="px-5 py-4">Amount</th>
                    <th className="px-5 py-4">Category</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50 text-sm">
                  {filteredReceipts.map((receipt) => (
                    <tr
                      key={receipt.id}
                      onClick={() => setPreviewReceipt(receipt)}
                      className={`cursor-pointer hover:bg-blue-50/30 ${
                        previewReceipt?.id === receipt.id ? "bg-blue-50/50" : ""
                      }`}
                    >
                      <td className="px-5 py-4">
                        <p className="font-black text-blue-600">{receipt.receiptNo}</p>
                        <p className="text-[10px] font-bold uppercase text-gray-400">{receipt.date}</p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-bold text-gray-800">{receipt.student}</p>
                        <p className="text-xs text-gray-500">{receipt.studentId} • {receipt.sport}</p>
                      </td>

                      <td className="px-5 py-4 font-black text-gray-900">
                        ₹{receipt.amount.toLocaleString("en-IN")}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded bg-gray-100 px-2 py-1 text-[10px] font-black uppercase text-gray-500">
                          {receipt.type}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-black uppercase ${getStatusStyle(receipt.status)}`}
                        >
                          {receipt.status === "Pending" ? <Clock size={12} /> : <CheckCircle size={12} />}
                          {receipt.status}
                        </span>
                      </td>

                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-wrap gap-1">
                          <IconBtn icon={<Eye size={17} />} onClick={() => openFullReceipt(receipt)} />
                          <IconBtn icon={<Printer size={17} />} onClick={() => printReceipt(receipt)} />
                          <IconBtn icon={<Download size={17} />} onClick={() => downloadReceiptHTML(receipt)} />
                          <IconBtn icon={<Share2 size={17} />} onClick={() => shareReceipt(receipt)} />
                        </div>
                      </td>
                    </tr>
                  ))}

                  {!filteredReceipts.length && (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-xs font-black uppercase tracking-widest text-gray-400">
                        No receipts found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-100 bg-gray-50/50 p-4 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Showing {filteredReceipts.length} receipts
              </p>
            </div>
          </div>
        </div>

        <aside className="hidden xl:block">
          {previewReceipt ? (
            <div className="sticky top-6 rounded-3xl border border-blue-100 bg-white p-5 shadow-xl shadow-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                  <FileText className="text-white" size={21} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                    Official Receipt
                  </p>
                  <p className="font-black text-gray-800">{previewReceipt.id}</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <CompanyLogo />
                  <div>
                    <h3 className="text-sm font-black uppercase text-gray-900">
                      {companyInfo.name}
                    </h3>
                    <p className="mt-1 text-[10px] font-bold leading-4 text-gray-500">
                      {companyInfo.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="my-6 border-y border-dashed border-gray-100 py-6 text-center">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
                  Amount Paid
                </p>
                <h2 className="text-4xl font-black tracking-tighter text-gray-900">
                  ₹{previewReceipt.amount.toLocaleString("en-IN")}
                </h2>
              </div>

              <div className="space-y-4">
                <PreviewRow label="Student" value={previewReceipt.student} icon={<User size={14} />} />
                <PreviewRow label="Receipt No" value={previewReceipt.receiptNo} icon={<FileText size={14} />} />
                <PreviewRow label="Payment Date" value={previewReceipt.date} icon={<Calendar size={14} />} />
                <PreviewRow label="Category" value={previewReceipt.type} icon={<BadgeCheck size={14} />} />
                <PreviewRow label="Payment Mode" value={previewReceipt.paymentMode} icon={<CreditCard size={14} />} />
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => openFullReceipt(previewReceipt)}
                  className="w-full rounded-2xl bg-blue-600 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-blue-700"
                >
                  Open Full Receipt
                </button>

                <button
                  type="button"
                  onClick={() => printReceipt(previewReceipt)}
                  className="w-full rounded-2xl bg-gray-900 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-gray-800"
                >
                  Print / Save PDF
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => downloadReceiptHTML(previewReceipt)} className="preview-btn">
                    HTML
                  </button>
                  <button type="button" onClick={() => shareReceipt(previewReceipt)} className="preview-btn">
                    Share
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[480px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-100 p-8 text-center text-gray-400">
              <Eye size={32} />
              <h3 className="mt-4 text-xs font-black uppercase tracking-widest">
                Receipt Preview
              </h3>
              <p className="mt-2 text-xs font-medium leading-relaxed">
                Select a receipt from the table to preview it here.
              </p>
            </div>
          )}
        </aside>
      </div>

      {fullReceipt && (
        <ReceiptModal
          receipt={fullReceipt}
          onClose={() => setFullReceipt(null)}
          onPrint={() => printReceipt(fullReceipt)}
          onDownload={() => downloadReceiptHTML(fullReceipt)}
          onShare={() => shareReceipt(fullReceipt)}
        />
      )}

      <style>{`
        .btn-light,.btn-blue,.preview-btn{
          display:flex;align-items:center;justify-content:center;gap:.5rem;
          border-radius:.75rem;padding:.65rem 1rem;font-size:.75rem;
          font-weight:900;text-transform:uppercase;letter-spacing:.08em;
        }
        .btn-light{border:1px solid #e5e7eb;background:white;color:#4b5563}
        .btn-light:hover{background:#f9fafb}
        .btn-blue{border:1px solid #dbeafe;background:#eff6ff;color:#2563eb}
        .btn-blue:hover{background:#dbeafe}
        .preview-btn{border:1px solid #e5e7eb;background:#f9fafb;color:#4b5563}
        .preview-btn:hover{background:#f3f4f6}
      `}</style>
    </div>
  );
};

const ReceiptModal = ({ receipt, onClose, onPrint, onDownload, onShare }) => (
  <div className="fixed inset-0 z-50 bg-gray-100">
    <div className="sticky top-0 z-50 border-b border-gray-200 bg-white px-3 py-3 shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-black uppercase text-gray-900 sm:text-lg">
            Official Payment Receipt
          </h3>
          <p className="text-sm text-gray-500">Receipt No: {receipt.receiptNo}</p>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:flex">
          <ModalBtn onClick={onPrint} icon={<Printer size={15} />} text="Print" blue />
          <ModalBtn onClick={onDownload} icon={<Download size={15} />} text="HTML" />
          <ModalBtn onClick={onShare} icon={<Share2 size={15} />} text="Share" />
          <ModalBtn onClick={onClose} icon={<X size={15} />} text="Close" />
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
              <h2 className="text-lg font-black uppercase text-gray-900 sm:text-2xl">
                {companyInfo.name}
              </h2>

              <div className="mt-3 grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
                <p className="flex gap-2"><MapPin size={16} /> {companyInfo.address}</p>
                <p className="flex gap-2"><Phone size={16} /> {companyInfo.contact}</p>
                <p className="flex gap-2"><Mail size={16} /> {companyInfo.email}</p>
                <p className="flex gap-2"><Globe size={16} /> {companyInfo.website}</p>
                <p className="flex gap-2 sm:col-span-2"><ShieldCheck size={16} /> {companyInfo.gstin}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#8B8B00]/20 bg-[#8B8B00]/5 p-4 lg:text-right">
            <p className="text-xs font-black uppercase tracking-widest text-[#8B8B00]">
              Payment Receipt
            </p>
            <h3 className="mt-2 break-words text-lg font-black text-gray-900 sm:text-xl">
              {receipt.receiptNo}
            </h3>
            <p className="mt-1 text-sm font-bold text-gray-500">
              Payment Date: {receipt.date}
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <ReceiptBox title="Student Details" icon={<User size={16} />}>
              <ReceiptRow label="Student Name" value={receipt.student} />
              <ReceiptRow label="Student ID" value={receipt.studentId} />
              <ReceiptRow label="Guardian Name" value={receipt.guardian} />
              <ReceiptRow label="Contact Number" value={receipt.contact} />
            </ReceiptBox>

            <ReceiptBox title="Payment Details" icon={<BadgeCheck size={16} />}>
              <ReceiptRow label="Payment Type" value={receipt.type} />
              <ReceiptRow label="Sport" value={receipt.sport} />
              <ReceiptRow label="Batch" value={receipt.batch} />
              <ReceiptRow label="Branch" value={receipt.branch} />
            </ReceiptBox>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200">
            <div className="bg-gray-900 px-4 py-3 text-xs font-black uppercase text-white">
              Amount Breakdown
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px]">
                <tbody>
                  {receipt.paymentDetails.map((item, index) => (
                    <tr key={index} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-sm font-bold text-gray-700">
                        {item.label}
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-black text-gray-900">
                        ₹{Number(item.amount).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}

                  <tr className="border-t bg-gray-50">
                    <td className="px-4 py-4 text-base font-black text-gray-900">
                      Amount Paid
                    </td>
                    <td className="px-4 py-4 text-right text-xl font-black text-[#8B8B00]">
                      ₹{Number(receipt.amount).toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <InfoBox label="Payment Method" value={receipt.paymentMode} />
            <InfoBox label="Transaction ID" value={receipt.transactionId} />
            <InfoBox label="Receipt Status" value={receipt.status} />
          </div>

          <div className="mt-8 grid gap-6 border-t border-gray-100 pt-6 lg:grid-cols-[1.5fr_0.6fr] lg:items-end">
            <p className="text-sm leading-6 text-gray-500">
              This receipt confirms that the payment has been recorded by{" "}
              <strong>{companyInfo.name}</strong>. Please keep this receipt for future reference.
            </p>

            <div className="w-full text-center">
              <div className="mb-3 h-16 border-b border-gray-900" />
              <p className="text-xs font-black uppercase tracking-widest text-gray-800">
                Authorized Signature / Stamp
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 pb-6 text-center text-xs font-bold text-gray-500">
        Use Print and choose Save as PDF for PDF format.
      </p>
    </div>
  </div>
);

const CompanyLogo = () => {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-2">
      {!logoError ? (
        <img
          src={companyInfo.logo}
          alt="Company Logo"
          className="h-full w-full object-contain"
          onError={() => setLogoError(true)}
        />
      ) : (
        <Building2 className="text-[#8B8B00]" size={32} />
      )}
    </div>
  );
};

const Mini = ({ label, value }) => (
  <div className="rounded-2xl bg-gray-50 p-3">
    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </p>
    <p className="mt-1 break-words text-sm font-black text-gray-900">{value}</p>
  </div>
);

const ActionButton = ({ label, icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-[11px] font-black uppercase text-gray-600 hover:bg-gray-50"
  >
    {icon}
    {label}
  </button>
);

const IconBtn = ({ icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded-lg p-2 text-gray-400 hover:bg-white hover:text-blue-600"
  >
    {icon}
  </button>
);

const ModalBtn = ({ icon, text, onClick, blue }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-[10px] font-black uppercase sm:px-4 sm:text-xs ${
      blue
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
    }`}
  >
    {icon}
    {text}
  </button>
);

const PreviewRow = ({ label, value, icon }) => (
  <div className="flex items-center justify-between gap-4 text-sm">
    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
      {icon}
      {label}
    </div>
    <div className="text-right font-black text-gray-800">{value}</div>
  </div>
);

const ReceiptBox = ({ title, icon, children }) => (
  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
    <h4 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-800">
      <span className="text-[#8B8B00]">{icon}</span>
      {title}
    </h4>
    {children}
  </div>
);

const ReceiptRow = ({ label, value }) => (
  <div className="flex justify-between gap-4 border-b border-dashed border-gray-200 py-2 last:border-b-0">
    <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
      {label}
    </span>
    <span className="break-words text-right text-sm font-black text-gray-900">
      {value}
    </span>
  </div>
);

const InfoBox = ({ label, value }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-4">
    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </p>
    <p className="mt-2 break-words text-sm font-black text-gray-900">{value}</p>
  </div>
);

export default PaymentReceipts;