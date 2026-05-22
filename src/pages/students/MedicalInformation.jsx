import React from 'react';
import { Heart, Activity, ShieldAlert, Upload, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const MedicalInformation = () => {
  const records = [
    { student: 'Arjun Mehra', blood: 'B+', allergies: 'N/A', injuries: 'Ligament Tear (Jan 2026)', status: 'Cleared' },
    { student: 'Sana Khan', blood: 'O+', allergies: 'Dust', injuries: 'N/A', status: 'Pending Review' },
    { student: 'Kabir Singh', blood: 'A-', allergies: 'Peanuts', injuries: 'Wrist Sprain', status: 'Restricted' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-600 p-6 rounded-2xl text-white flex items-center justify-between shadow-lg shadow-blue-500/20">
          <div>
            <p className="text-blue-100 text-sm font-medium">Verified Records</p>
            <h3 className="text-3xl font-bold mt-1">42</h3>
          </div>
          <CheckCircle size={40} className="text-blue-300 opacity-50" />
        </div>
        <div className="bg-amber-500 p-6 rounded-2xl text-white flex items-center justify-between shadow-lg shadow-amber-500/20">
          <div>
            <p className="text-amber-100 text-sm font-medium">Pending Review</p>
            <h3 className="text-3xl font-bold mt-1">05</h3>
          </div>
          <Clock size={40} className="text-amber-300 opacity-50" />
        </div>
        <div className="bg-rose-600 p-6 rounded-2xl text-white flex items-center justify-between shadow-lg shadow-rose-500/20">
          <div>
            <p className="text-rose-100 text-sm font-medium">Critical Issues</p>
            <h3 className="text-3xl font-bold mt-1">02</h3>
          </div>
          <AlertTriangle size={40} className="text-rose-300 opacity-50" />
        </div>
      </div>

      <div className="flex items-center justify-between mt-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Heart className="text-rose-500" fill="currentColor" size={24} /> Medical Directory
        </h2>
        <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-black transition-all">
          <Upload size={18} /> Upload Certificate
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-5">Athlete Name</th>
                <th className="px-6 py-5">Blood Group</th>
                <th className="px-6 py-5">Allergies/Conditions</th>
                <th className="px-6 py-5">Recent Injuries</th>
                <th className="px-6 py-5">Clearance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 font-semibold text-gray-800">{r.student}</td>
                  <td className="px-6 py-5">
                    <span className="bg-rose-50 text-rose-700 px-3 py-1 rounded-lg text-xs font-bold border border-rose-100">
                      {r.blood}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600 font-medium">{r.allergies}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-gray-900 font-medium">
                      <ShieldAlert size={16} className={r.injuries === 'N/A' ? 'text-gray-300' : 'text-amber-500'} />
                      {r.injuries}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      r.status === 'Cleared' ? 'bg-green-100 text-green-700' : 
                      r.status === 'Restricted' ? 'bg-rose-100 text-rose-700' : 
                      'bg-amber-100 text-amber-700'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        r.status === 'Cleared' ? 'bg-green-500' : 
                        r.status === 'Restricted' ? 'bg-rose-500' : 
                        'bg-amber-500'
                      }`}></div>
                      {r.status}
                    </div>
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

export default MedicalInformation;
