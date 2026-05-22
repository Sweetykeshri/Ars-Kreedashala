import React from 'react';
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
  Send
} from 'lucide-react';

const PendingFees = () => {
  const pendingData = [
    { id: 'STU005', name: 'Kabir Singh', batch: 'Football Junior', amount: 2200, months: ['April', 'May'], dueDate: '2024-04-05', risk: 'High' },
    { id: 'STU003', name: 'Ishaan Gupta', batch: 'Cricket Beginners', amount: 2500, months: ['May'], dueDate: '2024-05-05', risk: 'Medium' },
    { id: 'STU012', name: 'Neha Reddy', batch: 'Badminton Morning', amount: 3000, months: ['May'], dueDate: '2024-05-05', risk: 'Medium' },
    { id: 'STU025', name: 'Vikram Choudhary', batch: 'Cricket Beginners', amount: 7500, months: ['March', 'April', 'May'], dueDate: '2024-03-05', risk: 'Critical' },
  ];

  const getRiskStyle = (risk) => {
    switch (risk) {
      case 'Critical': return 'bg-red-600 text-white';
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pending Dues & Recovery</h1>
          <p className="text-gray-500">Identify overdue accounts and initiate recovery notifications.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100">
            <Bell size={18} />
            <span>Send Bulk Reminders</span>
          </button>
        </div>
      </div>

      {/* Financial Health Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Outstanding', value: '₹14,50,000', trend: '+15%', icon: <DollarSign size={20} className="text-red-500" />, color: 'red' },
          { label: 'Overdue Payments', value: '184', trend: '+8', icon: <AlertTriangle size={20} className="text-amber-500" />, color: 'amber' },
          { label: 'Recovery Rate', value: '78.5%', trend: '+4.2%', icon: <ArrowUpRight size={20} className="text-green-500" />, color: 'green' },
          { label: 'Average Delay', value: '12 Days', trend: '-2', icon: <Clock size={20} className="text-blue-500" />, color: 'blue' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-red-200 transition-all">
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-${stat.color}-50 rounded-full opacity-50 group-hover:scale-110 transition-transform`}></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-white transition-colors">
                  {stat.icon}
                </div>
                <span className={`text-[10px] font-black leading-none ${stat.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-gray-800 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">Critical Overdue List</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <button className="p-1.5 border border-gray-100 rounded-lg hover:bg-gray-50"><Filter size={16} /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Total Due</th>
                    <th className="px-6 py-4">Months</th>
                    <th className="px-6 py-4">Due Since</th>
                    <th className="px-6 py-4">Risk</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {pendingData.map((data) => (
                    <tr key={data.id} className="hover:bg-red-50/20 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] ${data.risk === 'Critical' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                            {data.id.slice(-3)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 leading-none mb-1">{data.name}</p>
                            <p className="text-[10px] text-gray-400 uppercase font-medium">{data.batch}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-black text-gray-800 tracking-tight">₹{data.amount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {data.months.map(m => (
                            <span key={m} className="px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-bold">{m}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-gray-500 italic">{data.dueDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter border border-transparent ${getRiskStyle(data.risk)}`}>
                          {data.risk}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Send Reminder">
                          <Send size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar: Quick Actions & Alerts */}
        <div className="space-y-6 text-sm">
          <div className="bg-red-600 rounded-3xl p-6 text-white shadow-xl shadow-red-100 relative overflow-hidden">
            <h3 className="font-black text-lg mb-2 relative z-10">Attention Required</h3>
            <p className="text-red-100 text-xs mb-6 relative z-10">There are 12 payments overdue by more than 60 days. Immediate action is recommended.</p>
            <button className="w-full py-3 bg-white text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-50 transition-all relative z-10 shadow-lg active:scale-95">
              Review High-Risk Accounts
            </button>
            <AlertTriangle className="absolute -bottom-6 -right-6 text-white/10" size={120} />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center justify-between">
              Batch-wise Due
              <Calendar size={16} className="text-gray-400" />
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Cricket Beginners', amount: '₹45,000', count: 18, color: 'blue' },
                { name: 'Football Junior', amount: '₹32,500', count: 14, color: 'green' },
                { name: 'Badminton Morning', amount: '₹12,000', count: 4, color: 'purple' },
              ].map((batch, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-8 bg-${batch.color}-500 rounded-full group-hover:w-3 transition-all`}></div>
                    <div>
                      <p className="font-bold text-gray-700 leading-none mb-1">{batch.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{batch.count} Active Cases</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-800">{batch.amount}</p>
                    <ChevronRight size={14} className="text-gray-300 ml-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingFees;