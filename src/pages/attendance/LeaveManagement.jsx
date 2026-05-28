import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Calendar, 
  Clock, 
  Upload, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Send,
  User,
  MoreVertical,
  Paperclip
} from 'lucide-react';

const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState('requests');

  const [leaveRequests, setLeaveRequests] = useState([
    { 
      id: 'LR001', 
      user: 'Arjun Sharma', 
      role: 'Student', 
      type: 'Sick Leave', 
      date: '24 May - 26 May', 
      reason: 'Suffering from viral fever. Doctor advised rest.', 
      status: 'Pending',
      attachment: 'medical_cert.pdf'
    },
    { 
      id: 'LR002', 
      user: 'Rajesh Patil', 
      role: 'Coach', 
      type: 'Personal Leave', 
      date: '25 May (Single Day)', 
      reason: 'Family emergency at home.', 
      status: 'Approved',
      attachment: null
    },
    { 
      id: 'LR003', 
      user: 'Suhani Rao', 
      role: 'Student', 
      type: 'Emergency Leave', 
      date: '18 May - 20 May', 
      reason: 'Urgent travel due to bereavement.', 
      status: 'Rejected',
      attachment: null
    },
  ]);

  const [leaveType, setLeaveType] = useState('Sick Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // enforce ~5MB limit
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File too large. Maximum allowed size is 5MB.');
      e.target.value = '';
      return;
    }
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(file);
    // create preview for images
    if (file.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const removeFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Apply Form */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FileText className="text-blue-600" size={24} />
            Apply for Leave
          </h2>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const newRequest = {
                id: `LR${Date.now()}`,
                user: 'You',
                role: 'Student',
                type: leaveType,
                date: startDate && endDate ? `${startDate} - ${endDate}` : (startDate || endDate || ''),
                reason: reason || '-',
                status: 'Pending',
                attachment: selectedFile ? selectedFile.name : null,
              };
              setLeaveRequests((prev) => [newRequest, ...prev]);
              alert('Leave application submitted.');
              // reset form
              setLeaveType('Sick Leave');
              setStartDate('');
              setEndDate('');
              setReason('');
              removeFile();
            }}
            className="space-y-4 text-sm"
          >
            <div>
              <label className="block text-gray-700 font-semibold mb-1.5">Leave Type</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-700">
                <option>Sick Leave</option>
                <option>Personal Leave</option>
                <option>Emergency Leave</option>
                <option>Other</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1.5">Start Date</label>
                <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-700 pointer-events-auto" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1.5">End Date</label>
                <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-700" />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1.5">Reason / Description</label>
              <textarea 
                rows="4" 
                placeholder="Briefly describe why you are requesting leave..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-gray-700 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1.5">Supporting Document</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center group hover:border-blue-400 transition-all cursor-pointer">
                <input ref={fileInputRef} type="file" className="hidden" accept="image/*,application/pdf" onChange={handleFileChange} />
                {!selectedFile && (
                  <div onClick={handleFileClick} className="cursor-pointer">
                    <Upload className="mx-auto text-gray-400 group-hover:text-blue-500 mb-2" size={20} />
                    <p className="text-xs text-gray-500 font-medium">Click to upload or drag and drop</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">PDF, PNG, JPG (Max 5MB)</p>
                  </div>
                )}

                {selectedFile && (
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    {previewUrl ? (
                      <img src={previewUrl} alt="preview" className="w-28 h-20 object-cover rounded-md border" />
                    ) : (
                      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md border">
                        <Paperclip size={16} />
                        <div className="text-left">
                          <div className="text-sm font-semibold text-gray-700">{selectedFile.name}</div>
                          <div className="text-[11px] text-gray-500">{(selectedFile.size / 1024).toFixed(0)} KB</div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button type="button" onClick={handleFileClick} className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100">Replace</button>
                      <button type="button" onClick={removeFile} className="px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100">Remove</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
              <Send size={18} />
              Submit Application
            </button>
          </form>
        </div>

        <div className="bg-blue-600 rounded-2xl p-6 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="font-bold mb-2">Notice for Students</h3>
            <p className="text-xs text-blue-100 leading-relaxed mb-4">
              All sick leaves exceeding 3 days MUST be supported by a medical certificate from a certified practitioner.
            </p>
            <button 
              onClick={() => alert('Accessing secure document: Ars Kreedashala Personnel & Cadet Leave Protocol v2.1...')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all backdrop-blur-sm"
            >
              Read Leave Policy
            </button>
          </div>
          <AlertTriangle className="absolute -bottom-4 -right-4 text-white/10" size={120} />
        </div>
      </div>

      {/* Right Column: History/Requests */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden min-h-150">
          <div className="flex border-b border-gray-100 px-6 pt-6">
            <button 
              onClick={() => setActiveTab('requests')}
              className={`px-6 py-3 font-bold text-sm transition-all border-b-2 ${activeTab === 'requests' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Recent Requests
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 font-bold text-sm transition-all border-b-2 ${activeTab === 'history' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Approval History
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {leaveRequests.map((req) => (
                <div key={req.id} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-all flex flex-col md:flex-row gap-4 items-start md:items-center justify-between group">
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 overflow-hidden ring-2 ring-white shadow-sm">
                        <img src={`https://ui-avatars.com/api/?name=${req.user}&background=random`} alt={req.user} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-800 text-sm">{req.user}</h4>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 font-medium">
                        <span className="flex items-center gap-1"><User size={12} className="text-gray-400" /> {req.role}</span>
                        <span className="flex items-center gap-1 text-blue-600"><Calendar size={12} className="text-gray-400" /> {req.date}</span>
                        <span className="text-gray-400">•</span>
                        <span>{req.type}</span>
                      </div>
                      <p className="mt-2 text-xs text-gray-600 italic leading-relaxed max-w-md">"{req.reason}"</p>
                      
                      {req.attachment && (
                        <div className="mt-3 inline-flex items-center gap-2 px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer">
                          <Paperclip size={10} />
                          {req.attachment}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex md:flex-col lg:flex-row items-center gap-2 w-full md:w-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    {req.status === 'Pending' ? (
                      <>
                        <button 
                          onClick={() => alert(`Authorization Confirmed: Leave for ${req.user} has been APPROVED.`)}
                          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 shadow-sm transition-all focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
                        >
                          <CheckCircle size={14} /> Approve
                        </button>
                        <button 
                          onClick={() => alert(`Authorization Refused: Leave for ${req.user} has been REJECTED.`)}
                          className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 shadow-sm transition-all focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
                        >
                          <XCircle size={14} /> Reject
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => alert(`Accessing full activity log for mission context ${req.id}...`)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-200"
                      >
                        <MoreVertical size={18} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center gap-4 text-center grayscale opacity-50 select-none">
              <FileText className="text-gray-400" size={48} />
              <div className="max-w-xs">
                <p className="font-bold text-gray-400">End of Recent Activity</p>
                <p className="text-xs text-gray-400">Only the latest active and processed leave requests are shown here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;