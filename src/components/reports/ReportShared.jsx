import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CreditCard, 
  Clock, 
  Trophy 
} from 'lucide-react';

export const KPICard = ({ title, value, detail, trend, trendValue, icon: Icon, color }) => {
  const getTheme = () => {
    switch (color) {
      case 'blue': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'emerald': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'amber': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'rose': return 'text-rose-600 bg-rose-50 border-rose-100';
      case 'purple': return 'text-purple-600 bg-purple-50 border-purple-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  const theme = getTheme();

  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${theme.split(' ')[1]} ${theme.split(' ')[0]}`}>
          <Icon size={24} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded-lg ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trendValue}
          </div>
        )}
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-3xl font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase">{value}</h3>
        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase italic">{detail}</p>
      </div>
    </div>
  );
};

export const ReportHeader = ({ title, subtitle, icon: Icon, actions }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 mt-4">
      <div>
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
          {Icon && <Icon className="text-blue-600" size={32} />}
          {title}
        </h1>
        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest mt-1">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        {actions ? actions : (
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-100">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Live System Feed</span>
          </div>
        )}
      </div>
    </div>
  );
};
