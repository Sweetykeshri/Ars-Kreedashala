import React from 'react';
import { CheckCircle2, XCircle, Eye } from 'lucide-react';

const AdmissionApproval = () => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
        <p className="text-blue-800 text-sm font-medium">You have 5 pending admission approvals for this week.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-500 text-lg">
                {String.fromCharCode(65 + i)}
              </div>
              <div>
                <h4 className="text-gray-800 font-semibold">Student Application #{1000 + i}</h4>
                <p className="text-gray-500 text-sm">Applied for Cricket Academy • Silver Membership</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => alert(`Showing details for Application #${1000 + i}`)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Eye size={16} /> View Details
              </button>
              <button 
                onClick={() => {
                  if(confirm(`Are you sure you want to REJECT Application #${1000 + i}?`)) {
                    alert(`Application #${1000 + i} rejected.`);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
              >
                <XCircle size={16} /> Reject
              </button>
              <button 
                onClick={() => {
                  if(confirm(`Approve Application #${1000 + i} for immediate enrollment?`)) {
                    alert(`Application #${1000 + i} has been approved.`);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                <CheckCircle2 size={16} /> Approve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdmissionApproval;
