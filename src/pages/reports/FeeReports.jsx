import React from 'react';
import { 
  CircleDollarSign, 
  TrendingUp, 
  CreditCard, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter,
  FileText,
  FileDown,
  Clock,
  Calendar
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell
} from 'recharts';
import { ReportHeader, KPICard } from '../../components/reports/ReportShared';

const FeeReports = () => {
  const collectionData = [
    { label: 'JAN', collect: 450000, target: 500000 },
    { label: 'FEB', collect: 520000, target: 500000 },
    { label: 'MAR', collect: 480000, target: 500000 },
    { label: 'APR', collect: 610000, target: 600000 },
    { label: 'MAY', collect: 750000, target: 700000 },
    { label: 'JUN', collect: 820000, target: 800000 },
  ];

  const methodBreakdown = [
    { name: 'UPI/Online', value: 65, color: '#3b82f6' },
    { name: 'Bank Transfer', value: 20, color: '#8b5cf6' },
    { name: 'Cash', value: 10, color: '#f59e0b' },
    { name: 'Other', value: 5, color: '#9ca3af' },
  ];

  const transactions = [
    { id: 'TXN-492', student: 'ROHIT SHARMA', amount: '₹12,500', method: 'UPI', date: '21 MAY', status: 'SUCCESS' },
    { id: 'TXN-491', student: 'VIRAT KOHLI', amount: '₹8,000', method: 'CASH', date: '21 MAY', status: 'SUCCESS' },
    { id: 'TXN-490', student: 'KL RAHUL', amount: '₹15,000', method: 'BANK', date: '20 MAY', status: 'PROCESSING' },
    { id: 'TXN-489', student: 'ISHAN KISHAN', amount: '₹12,500', method: 'UPI', date: '20 MAY', status: 'FAILED' },
  ];

  return (
    <div className="p-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ReportHeader 
        title={<>Treasury: <span className="text-blue-600">Financial Reports</span></>}
        subtitle="Revenue surveillance and fee collection audit"
        icon={CircleDollarSign}
        actions={
          <div className="flex items-center gap-3">
             <button 
               onClick={() => alert('Launching cryptographic revenue filters...')}
               className="p-3 bg-white border border-gray-100 text-gray-400 rounded-xl hover:text-blue-600 transition-all shadow-sm"
             >
               <Filter size={18} />
             </button>
             <button 
               onClick={() => alert('Genrating consolidated fiscal audit report... Downloading encrypted PDF.')}
               className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-black uppercase text-[10px] hover:bg-black shadow-lg shadow-gray-200 transition-all"
             >
               <FileDown size={16} /> Export Intel
             </button>
          </div>
        }
      />

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard 
          title="Gross Revenue"
          value="₹32.4L"
          detail="Total Collection (YTD)"
          trend="up"
          trendValue="+18%"
          icon={TrendingUp}
          color="emerald"
        />
        <KPICard 
          title="Monthly Delta"
          value="₹8.2L"
          detail="Current Month"
          trend="up"
          trendValue="+5.4L"
          icon={CircleDollarSign}
          color="blue"
        />
        <KPICard 
          title="Outstanding"
          value="₹2.1L"
          detail="Pending Arrears"
          trend="down"
          trendValue="-12%"
          icon={AlertCircle}
          color="rose"
        />
        <KPICard 
          title="Fee Renewal"
          value="94%"
          detail="Student Retention"
          icon={CreditCard}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-4xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">Revenue Trajectory</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Collection vs Projected Target</p>
            </div>
          </div>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={collectionData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="label" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#9ca3af' }}
                  tickFormatter={(val) => `₹${val/1000}K`}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '10px',
                    fontWeight: 900,
                    textTransform: 'uppercase'
                  }} 
                />
                <Bar dataKey="collect" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="target" fill="#e5e7eb" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight mb-8">Channel Integrity</h3>
          <div className="space-y-6">
            {methodBreakdown.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.name}</span>
                  <span className="text-xs font-black text-gray-900">{item.value}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-1000" 
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 p-5 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3 text-blue-600 mb-2">
              <TrendingUp size={20} />
              <span className="text-xs font-black uppercase">Growth Insight</span>
            </div>
            <p className="text-[10px] font-bold text-blue-800 uppercase italic tracking-wide">Digital payments surged by 15% this quarter, reducing cash handling by 22%.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-gray-400 uppercase font-black text-[10px] bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
               <Calendar size={14} /> MAY 2024
             </div>
             <div className="flex items-center gap-2 text-gray-400 uppercase font-black text-[10px] bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
               <Filter size={14} /> ALL METHODS
             </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-black uppercase text-[10px] shadow-lg shadow-blue-100">
            <FileText size={14} /> Download Ledger
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction Ref</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Client Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Value (INR)</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Method</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-black uppercase text-xs">
              {transactions.map((txn, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-6 text-gray-400 font-bold tracking-widest">{txn.id}</td>
                  <td className="px-8 py-6 text-gray-900">{txn.student}</td>
                  <td className="px-8 py-6 text-gray-900 font-black">{txn.amount}</td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black text-gray-400 border border-gray-100 px-2 py-0.5 rounded uppercase">{txn.method}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className={`text-[10px] font-black italic ${
                      txn.status === 'SUCCESS' ? 'text-emerald-600' : 
                      txn.status === 'FAILED' ? 'text-rose-600' : 'text-amber-600'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FeeReports;
