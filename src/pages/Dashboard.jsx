import React from 'react';
import { Users, UserCheck, Clock, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Admissions', value: '1,280', change: '+12%', icon: <Users className="text-blue-600" />, color: 'bg-blue-100' },
    { label: 'Trial Sessions', value: '45', change: '+5%', icon: <Clock className="text-orange-600" />, color: 'bg-orange-100' },
    { label: 'Active Students', value: '950', change: '+18%', icon: <UserCheck className="text-green-600" />, color: 'bg-green-100' },
    { label: 'Revenue Growth', value: '24%', change: '+7%', icon: <TrendingUp className="text-purple-600" />, color: 'bg-purple-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-green-500 text-sm font-medium">{stat.change}</span>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm font-medium">{stat.label}</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Trial Registrations</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 sm:p-4 border border-gray-50 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold shrink-0">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-gray-800 truncate">Student Name {i + 1}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400 sm:text-gray-500 truncate">Cricket Academy • 2h ago</p>
                  </div>
                </div>
                <button className="text-blue-600 text-xs sm:text-sm font-semibold hover:underline px-2">View</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Admission Status</h3>
          <div className="relative h-48 sm:h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
            <p className="text-gray-400 text-sm italic">Analytics Chart Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
