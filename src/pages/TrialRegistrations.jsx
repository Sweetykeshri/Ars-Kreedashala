import React from 'react';

const TrialRegistrations = () => {
  const trials = [
    { id: 'TR001', name: 'Rahul Sharma', sport: 'Cricket', date: '2026-05-24', status: 'Pending' },
    { id: 'TR002', name: 'Sneha Gupta', sport: 'Badminton', date: '2026-05-25', status: 'Confirmed' },
    { id: 'TR003', name: 'Amit Kumar', sport: 'Football', date: '2026-05-24', status: 'Pending' },
    { id: 'TR004', name: 'Priya Singh', sport: 'Table Tennis', date: '2026-05-26', status: 'Expired' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Trial Registrations</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Export CSV</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-medium">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Sport</th>
              <th className="px-6 py-4">Trial Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {trials.map((trial) => (
              <tr key={trial.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{trial.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{trial.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">{trial.sport}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{trial.date}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    trial.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 
                    trial.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
                  }`}>
                    {trial.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrialRegistrations;
