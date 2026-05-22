import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  ChevronRight, 
  MoreHorizontal, 
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
  Users
} from 'lucide-react';

const MonthlyCollection = () => {
  const [selectedMonth, setSelectedMonth] = useState('May 2024');

  const students = [
    { id: 'STU001', name: 'Arjun Sharma', batch: 'Cricket Beginners', fee: 2500, paid: 2500, due: 0, status: 'Paid', date: '2024-05-05' },
    { id: 'STU002', name: 'Suhani Rao', batch: 'Football Junior', fee: 2200, paid: 1500, due: 700, status: 'Partial', date: '2024-05-10' },
    { id: 'STU003', name: 'Ishaan Gupta', batch: 'Cricket Beginners', fee: 2500, paid: 0, due: 2500, status: 'Unpaid', date: '-' },
    { id: 'STU004', name: 'Riya Verma', batch: 'Badminton Morning', fee: 3000, paid: 3000, due: 0, status: 'Paid', date: '2024-05-02' },
    { id: 'STU005', name: 'Kabir Singh', batch: 'Football Junior', fee: 2200, paid: 0, due: 2200, status: 'Overdue', date: '-' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-green-600 bg-green-50 border-green-100';
      case 'Partial': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'Unpaid': return 'text-gray-500 bg-gray-50 border-gray-100';
      case 'Overdue': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-gray-400 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Monthly Fee Collection</h1>
          <p className="text-gray-500">Track and collect recurring academy fees for all batches.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="pl-10 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-bold text-gray-700 shadow-sm"
            >
              <option>April 2024</option>
              <option>May 2024</option>
              <option>June 2024</option>
            </select>
          </div>
          <button className="px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-2">
            <Users size={18} />
            <span>Bulk Collect</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Expected Revenue', value: '₹4,50,000', color: 'bg-blue-600' },
          { label: 'Total Collected', value: '₹3,20,000', color: 'bg-green-600' },
          { label: 'Pending Dues', value: '₹1,30,000', color: 'bg-amber-600' },
          { label: 'Late Payments', value: '24 Students', color: 'bg-red-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-xl font-black text-gray-800">{stat.value}</p>
            </div>
            <div className={`p-2 rounded-lg ${stat.color} text-white opacity-20 group-hover:opacity-100 transition-opacity`}>
              <ArrowUpRight size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Collection Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search student by name or ID..."
              className="pl-10 pr-4 py-2.5 w-full bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-gray-100">
              <Filter size={20} />
            </button>
            <div className="h-6 w-px bg-gray-200 mx-1"></div>
            <p className="text-sm font-bold text-gray-400">Showing 5 of 450 active athletes</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-gray-100">
                <th className="px-6 py-4">Athlete Details</th>
                <th className="px-6 py-4">Fee Structure</th>
                <th className="px-6 py-4">Paid/Due</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Payment</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-blue-50/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 font-black text-gray-400 flex items-center justify-center overflow-hidden shadow-inner ring-2 ring-white">
                        <img src={`https://ui-avatars.com/api/?name=${student.name}&background=random`} alt="" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{student.name}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">{student.batch}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-gray-700 tracking-tight">₹{student.fee.toLocaleString()}</p>
                    <p className="text-[10px] font-bold text-gray-400 italic">per month</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex justify-between w-32 mb-1">
                        <span className="text-[10px] font-black text-green-600">₹{student.paid}</span>
                        <span className="text-[10px] font-black text-red-500">₹{student.due}</span>
                      </div>
                      <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${student.status === 'Paid' ? 'bg-green-500' : 'bg-amber-400'}`}
                          style={{ width: `${(student.paid / student.fee) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-transparent ${getStatusColor(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-500 italic">
                    {student.date}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="px-4 py-1.5 bg-white border border-gray-200 text-gray-700 text-xs font-black rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm active:scale-95 flex items-center gap-2 mx-auto">
                      <CreditCard size={14} />
                      Collect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-5 border-t border-gray-100 flex items-center justify-center bg-gray-50/30">
          <button className="text-xs font-black text-blue-600 hover:underline uppercase tracking-widest flex items-center gap-1">
            View All Records
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonthlyCollection;