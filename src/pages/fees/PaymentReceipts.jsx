import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  Printer, 
  Eye, 
  Filter, 
  Share2,
  CheckCircle,
  MoreVertical,
  Calendar,
  CreditCard,
  Clock
} from 'lucide-react';

const PaymentReceipts = () => {
  const [activeReceipt, setActiveReceipt] = useState(null);

  const receipts = [
    { id: 'ARS240501', student: 'Arjun Sharma', amount: 2500, date: '2024-05-05', type: 'Monthly Fee', status: 'Generated' },
    { id: 'ARS240502', student: 'Suhani Rao', amount: 1500, date: '2024-05-10', type: 'Partial Payment', status: 'Generated' },
    { id: 'ARS240503', student: 'Riya Verma', amount: 5000, date: '2024-05-12', type: 'Admission Fee', status: 'E-Receipt Sent' },
    { id: 'ARS240504', student: 'Vikram Choudhary', amount: 3000, date: '2024-05-14', type: 'Monthly Fee', status: 'Pending' },
  ];

  const previewReceipt = (receipt) => {
    setActiveReceipt(receipt);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left 2 Columns: Receipt History */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Payment Receipts</h1>
            <p className="text-gray-500">Track and manage digital receipts for all transactions.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/30">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search receipt # or student..."
                className="pl-10 pr-4 py-2.5 w-full bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 border border-gray-100 transition-all">
                <Filter size={16} /> Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-100 border border-blue-100 transition-all">
                <Download size={16} /> Export All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-50">
                  <th className="px-6 py-4">Receipt Info</th>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {receipts.map((rec) => (
                  <tr key={rec.id} className={`hover:bg-blue-50/30 transition-all group ${activeReceipt?.id === rec.id ? 'bg-blue-50/50' : ''}`}>
                    <td className="px-6 py-4">
                      <p className="font-black text-blue-600 mb-0.5">{rec.id}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">{rec.date}</p>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-700">{rec.student}</td>
                    <td className="px-6 py-4 font-black text-gray-900">₹{rec.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-black uppercase tracking-tighter">
                        {rec.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${rec.status === 'Pending' ? 'text-amber-500' : 'text-green-600'}`}>
                        {rec.status === 'Pending' ? <Clock size={12} /> : <CheckCircle size={12} />}
                        {rec.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => previewReceipt(rec)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-lg transition-all"
                        >
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-white rounded-lg transition-all">
                          <Download size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Right Column: Receipt Preview */}
      <div className="lg:col-span-1">
        {activeReceipt ? (
          <div className="bg-white rounded-3xl border border-blue-100 shadow-2xl shadow-blue-50 p-6 space-y-8 animate-in zoom-in-95 duration-200 sticky top-24">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <FileText className="text-white" size={20} />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Official Receipt</p>
                <p className="font-black text-gray-800 tracking-tighter">{activeReceipt.id}</p>
              </div>
            </div>

            <div className="text-center py-6 border-y border-dashed border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em] mb-2">Total Amount Paid</p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter">₹{activeReceipt.amount.toLocaleString()}</h2>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Athleta Name', value: activeReceipt.student, icon: <CreditCard size={14} /> },
                { label: 'Payment Date', value: activeReceipt.date, icon: <Calendar size={14} /> },
                { label: 'Category', value: activeReceipt.type, icon: <FileText size={14} /> },
                { label: 'Payment Mode', value: 'UPI / Digital', icon: <CreditCard size={14} /> },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                    {row.icon}
                    {row.label}
                  </div>
                  <div className="font-black text-gray-800">{row.value}</div>
                </div>
              ))}
            </div>

            <div className="pt-8 space-y-3">
              <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-[0.98]">
                <Printer size={18} /> Print Invoice
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100">
                  <Download size={16} /> PDF
                </button>
                <button className="flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-100">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>

            <p className="text-center text-[8px] font-bold text-gray-300 uppercase tracking-widest">
              Digital Signature Verified • Ars Kreedashala Academy
            </p>
          </div>
        ) : (
          <div className="h-full min-h-[500px] border-2 border-dashed border-gray-100 rounded-3xl flex flex-col items-center justify-center text-center p-8 text-gray-400 grayscale">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <Eye size={32} strokeWidth={1} />
            </div>
            <h3 className="font-black uppercase tracking-widest text-xs mb-2">Receipt Preview</h3>
            <p className="text-xs font-medium leading-relaxed">Select a receipt from the history table to view detailed information and print options.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentReceipts;