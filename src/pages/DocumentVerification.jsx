import React from 'react';
import { FileUp, FileCheck, FileWarning, Search } from 'lucide-react';

const DocumentVerification = () => {
  const docs = [
    { name: 'Adhaar Card', type: 'Identity', status: 'Verified', student: 'Aman Kumar' },
    { name: 'Birth Certificate', type: 'Age Proof', status: 'Pending', student: 'Rohan Dev' },
    { name: 'Passport Photo', type: 'Photo', status: 'Rejected', student: 'Ishani Sen' },
    { name: 'Medical Fitness', type: 'Health', status: 'Verified', student: 'Vikas Jha' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by student name..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Pending Only</button>
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Recent</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {docs.map((doc, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className={`p-4 rounded-full mb-4 ${
              doc.status === 'Verified' ? 'bg-green-50 text-green-600' : 
              doc.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' : 
              'bg-red-50 text-red-600'
            }`}>
              {doc.status === 'Verified' ? <FileCheck size={32} /> : 
               doc.status === 'Pending' ? <FileUp size={32} /> : 
               <FileWarning size={32} />}
            </div>
            <h4 className="font-semibold text-gray-800">{doc.name}</h4>
            <p className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-full mt-1">{doc.type}</p>
            <p className="text-sm text-gray-500 mt-3 font-medium">{doc.student}</p>
            <button className="mt-4 w-full py-2 text-sm font-semibold text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-600 hover:text-white transition-all">Review Info</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentVerification;
