import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Eye } from 'lucide-react';
import { admissionService } from '../services/admissionService';

const AdmissionApproval = () => {
  const [admissions, setAdmissions] = useState([]);

  useEffect(() => {
    loadAdmissions();
  }, []);

  const loadAdmissions = () => {
    const data = admissionService.getAdmissions();
    setAdmissions(data);
  };

  const handleApprove = (id) => {
    if (confirm('Approve Application for immediate enrollment?')) {
      admissionService.updateStatus(id, 'Approved');
      loadAdmissions();
      alert('Application has been approved.');
    }
  };

  const handleReject = (id) => {
    if (confirm('Are you sure you want to REJECT this application?')) {
      admissionService.updateStatus(id, 'Rejected');
      loadAdmissions();
      alert('Application rejected.');
    }
  };

  const pendingAdmissions = admissions.filter(a => a.status === 'Pending');

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
        <p className="text-blue-800 text-sm font-medium">
          You have {pendingAdmissions.length} pending admission approvals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pendingAdmissions.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border border-dashed border-gray-300 text-center">
            <p className="text-gray-500">No pending admission approvals found.</p>
          </div>
        ) : (
          pendingAdmissions.map((admission) => (
            <div key={admission.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center font-bold text-indigo-600 text-lg uppercase">
                  {admission.studentName?.charAt(0) || 'S'}
                </div>
                <div>
                  <h4 className="text-gray-800 font-semibold">{admission.studentName}</h4>
                  <p className="text-gray-500 text-sm">
                    Applied for {admission.sport} • {admission.branch} Branch
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Submitted on: {new Date(admission.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => alert(`Details for ${admission.studentName}:\n\nSport: ${admission.sport}\nBranch: ${admission.branch}\nContact: ${admission.personalContact}\nEmail: ${admission.email}\nGuardian: ${admission.guardianName}`)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Eye size={16} /> View Details
                </button>
                <button 
                  onClick={() => handleReject(admission.id)}
                  className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors"
                >
                  <XCircle size={16} /> Reject
                </button>
                <button 
                  onClick={() => handleApprove(admission.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <CheckCircle2 size={16} /> Approve
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdmissionApproval;
