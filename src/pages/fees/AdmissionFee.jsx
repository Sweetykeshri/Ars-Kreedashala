import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  User, 
  ChevronDown, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  FileText
} from 'lucide-react';

const AdmissionFee = () => {
  const [showForm, setShowForm] = useState(false);

  const records = [
    { id: 'REC-1001', student: 'Arjun Sharma', amount: 5000, date: '2024-05-15', mode: 'UPI', status: 'Paid' },
    { id: 'REC-1002', student: 'Suhani Rao', amount: 5000, date: '2024-05-18', mode: 'Cash', status: 'Partial' },
    { id: 'REC-1003', student: 'Ishaan Gupta', amount: 5000, date: '2024-05-20', mode: 'Card', status: 'Paid' },
    { id: 'REC-1004', student: 'Riya Verma', amount: 5000, date: '2024-05-21', mode: 'Transfer', status: 'Pending' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-700 border-green-200';
      case 'Partial': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Pending': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admission Fee Collection</h1>
          <p className="text-gray-500">Manage one-time admission charges for new athletes.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md font-bold"
        >
          <Plus size={18} />
          {showForm ? 'Hide Form' : 'New Collection'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <CreditCard className="text-blue-600" size={20} />
            Fee Collection Form
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700">Select Student</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <select className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                  <option>Select Student</option>
                  <option>Arjun Sharma (STU001)</option>
                  <option>Suhani Rao (STU002)</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700">Amount (₹)</label>
              <input type="number" placeholder="5000" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700">Payment Mode</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>UPI</option>
                <option>Cash</option>
                <option>Card</option>
                <option>Bank Transfer</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700">Status</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Paid</option>
                <option>Partial</option>
                <option>Pending</option>
              </select>
            </div>
            <div className="lg:col-span-4 flex justify-end gap-3 mt-4 pt-4 border-t border-gray-50">
              <button type="button" className="px-6 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-all">Cancel</button>
              <button type="button" className="px-6 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all shadow-sm">Process Payment & Generate Receipt</button>
            </div>
          </form>
        </div>
      )}

      {/* Records Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between bg-gray-50/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by student or receipt ID..."
              className="pl-10 pr-4 py-2 w-full bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 bg-white hover:bg-gray-50 text-sm font-bold transition-all flex-1 md:flex-none">
              <Filter size={16} />
              Filter
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-gray-600 bg-white hover:bg-gray-50 text-sm font-bold transition-all flex-1 md:flex-none">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white text-gray-500 text-xs font-bold uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-5">Receipt ID</th>
                <th className="px-6 py-5">Student Name</th>
                <th className="px-6 py-5">Amount</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-6 py-5">Mode</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-center">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4 text-sm font-bold text-blue-600">{record.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{record.student}</td>
                  <td className="px-6 py-4 text-sm font-black text-gray-900">₹{record.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">{record.date}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                      {record.mode}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black border uppercase tracking-widest ${getStatusStyle(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-all">
                      <FileText size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-5 bg-gray-50/50 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Showing last 4 transactions</p>
        </div>
      </div>
    </div>
  );
};

export default AdmissionFee;