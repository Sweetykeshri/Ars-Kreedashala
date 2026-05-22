import React from 'react';
import { User, Phone, Mail, MapPin, Search, Plus } from 'lucide-react';

const ParentGuardianDetails = () => {
  const parents = [
    { id: 'PAR001', name: 'Rajesh Mehra', student: 'Arjun Mehra', relation: 'Father', phone: '+91 99887 76655', email: 'rajesh@example.com' },
    { id: 'PAR002', name: 'Sultana Khan', student: 'Sana Khan', relation: 'Mother', phone: '+91 99887 76656', email: 'sultana@example.com' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Parent/Guardian Details</h2>
          <p className="text-gray-500 text-sm">Manage emergency contacts and guardian information.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm self-start sm:self-auto">
          <Plus size={18} /> Add Guardian
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registration Form Sidebar (Modern Look) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Quick Entry</h3>
            <form className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Guardian Name</label>
                <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="Legal full name" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Relation</label>
                <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all">
                  <option>Father</option>
                  <option>Mother</option>
                  <option>Guardian</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Mobile Number</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="tel" className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Emergency Contact?</label>
                <div className="flex items-center gap-2 pt-1">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                  <span className="text-sm text-gray-600">Yes, primary contact</span>
                </div>
              </div>
              <button className="w-full mt-2 bg-gray-800 text-white font-semibold py-2 rounded-lg text-sm hover:bg-gray-900 transition-colors">
                Save Guardian
              </button>
            </form>
          </div>
        </div>

        {/* Records Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <div className="relative max-w-sm">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search parents..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 rounded-lg outline-none transition-all text-sm" />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Guardian / Student</th>
                    <th className="px-6 py-4">Contact Detail</th>
                    <th className="px-6 py-4">Relation</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {parents.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-800 text-sm">{p.name}</span>
                          <span className="text-xs text-blue-600 font-medium italic">Student: {p.student}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Phone size={12} className="text-gray-400" /> {p.phone}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Mail size={12} className="text-gray-400" /> {p.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">{p.relation}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-blue-600 text-xs font-bold hover:underline uppercase">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentGuardianDetails;
