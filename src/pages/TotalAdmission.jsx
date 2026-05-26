import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter, 
  ArrowUpRight, 
  MoreVertical,
  Eye,
  Download,
  Trophy
} from 'lucide-react';
import { admissionService } from '../services/admissionService';

const TotalAdmission = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [admissions, setAdmissions] = useState([]);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const data = admissionService.getAdmissions();
    setAdmissions(data);
  }, []);

  const stats = [
    { label: 'Total Admissions', value: admissions.length || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active Students', value: admissions.filter(a => a.status === 'Approved').length || 0, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pending Admissions', value: admissions.filter(a => a.status === 'Pending').length || 0, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Approved Today', value: admissions.filter(a => a.status === 'Approved' && new Date(a.submittedAt).toDateString() === new Date().toDateString()).length || 0, icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const filteredAdmissions = admissions.filter(admission => {
    const normalizedStatus = (admission.status || '').toLowerCase();
    const isApprovedRecord = normalizedStatus === 'approved' || normalizedStatus === 'admitted';
    const matchesSearch = admission.studentName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || admission.status === filterStatus;
    return isApprovedRecord && matchesSearch && matchesStatus;
  });

  const openDetailsModal = (admission) => {
    setSelectedAdmission(admission);
    setActiveTab('Overview');
    setIsModalOpen(true);
    setIsDetailsLoading(true);
    setTimeout(() => {
      setIsDetailsLoading(false);
    }, 400);
  };

  const closeDetailsModal = () => {
    setIsModalOpen(false);
    setSelectedAdmission(null);
    setIsDetailsLoading(false);
  };

  const handleDownloadProfile = () => {
    if (!selectedAdmission) return;
    const data = JSON.stringify(selectedAdmission, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `admission-${selectedAdmission.id || 'profile'}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handlePrintDetails = () => {
    window.print();
  };

  const handleEditDetails = () => {
    if (!selectedAdmission) return;
    alert(`Edit details for ${selectedAdmission.studentName || 'player'} (${selectedAdmission.id || 'ID'})`);
  };

  const handleApproveAdmission = () => {
    if (!selectedAdmission) return;
    alert(`Admission approved for ${selectedAdmission.studentName || 'player'}`);
  };

  const handleRejectAdmission = () => {
    if (!selectedAdmission) return;
    alert(`Admission rejected for ${selectedAdmission.studentName || 'player'}`);
  };

  const formatDob = (dob) => {
    if (!dob) return 'Not available';
    if (typeof dob === 'string') return dob;
    if (typeof dob === 'object') {
      const day = `${dob.d1 || ''}${dob.d2 || ''}`.trim();
      const month = `${dob.m1 || ''}${dob.m2 || ''}`.trim();
      const year = `${dob.y1 || ''}${dob.y2 || ''}${dob.y3 || ''}${dob.y4 || ''}`.trim();
      const parts = [day, month, year].filter(Boolean);
      return parts.length ? parts.join('/') : 'Not available';
    }
    return 'Not available';
  };

  const detailValue = (value) => (value ? value : 'Not available');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-3">
            <Trophy className="text-[#8B8B00]" size={32} />
            Total <span className="text-[#8B8B00]">Admissions</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">Academy Enrollment Registry & Oversight</p>
        </div>
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-gray-800 transition-all shadow-lg active:scale-95">
                <Download size={14} /> Export Registry
            </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={22} />
              </div>
              <div className="flex items-center gap-1 text-emerald-500 font-bold text-[10px]">
                <ArrowUpRight size={12} /> +12%
              </div>
            </div>
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1 italic leading-none">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Controls */}
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH PLAYER NAME OR ID..." 
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-[#8B8B00] outline-none rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border-2 border-transparent">
              <Filter size={14} className="text-gray-400" />
              <select 
                className="bg-transparent text-[10px] font-black uppercase outline-none cursor-pointer"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option>All Status</option>
                <option>Approved</option>
                <option>Admitted</option>
                <option>Active</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Registration ID</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Player Details</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Sport / Program</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Branch</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Admission Date</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Batch</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Coach</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b border-gray-50 leading-none">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmissions.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-10 text-center text-gray-500 font-medium">
                    No matching admissions found.
                  </td>
                </tr>
              ) : (
                filteredAdmissions.map((admission, i) => (
                  <tr
                    key={admission.id}
                    className="hover:bg-gray-50/50 transition-colors group cursor-pointer"
                    onClick={() => openDetailsModal(admission)}
                  >
                    <td className="px-6 py-5 border-b border-gray-50">
                      <span className="text-[10px] font-black text-gray-400 tracking-wider">#{admission.id}</span>
                    </td>
                    <td className="px-6 py-5 border-b border-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#8B8B00]/10 flex items-center justify-center text-[#8B8B00] font-black text-[10px]">
                          {admission.studentName?.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-xs font-black text-gray-900 uppercase">{admission.studentName}</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                            Joined {new Date(admission.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 border-b border-gray-50">
                      <span className="px-3 py-1 bg-gray-100 text-[9px] font-black uppercase tracking-wider rounded-lg text-gray-600">
                          {admission.sport}
                      </span>
                    </td>
                    <td className="px-6 py-5 border-b border-gray-50">
                      <p className="text-[10px] font-black text-gray-600 uppercase italic underline decoration-[#8B8B00]/30 underline-offset-4">{admission.branch}</p>
                    </td>
                    <td className="px-6 py-5 border-b border-gray-50">
                      <p className="text-[10px] font-black text-gray-600 uppercase">
                        {admission.submittedAt ? new Date(admission.submittedAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </td>
                    <td className="px-6 py-5 border-b border-gray-50">
                      <p className="text-[10px] font-black text-gray-600 uppercase">{admission.batchName || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-5 border-b border-gray-50">
                      <p className="text-[10px] font-black text-gray-600 uppercase">{admission.coachAssigned || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-5 border-b border-gray-50">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        admission.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' : 
                        admission.status === 'Admitted' ? 'bg-blue-50 text-blue-600' : 
                        admission.status === 'Active' ? 'bg-purple-50 text-purple-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          admission.status === 'Approved' ? 'bg-emerald-500' : 
                          admission.status === 'Admitted' ? 'bg-blue-500' : 
                          admission.status === 'Active' ? 'bg-purple-500' : 'bg-gray-400'
                        }`} />
                        {admission.status}
                      </div>
                    </td>
                    <td className="px-6 py-5 border-b border-gray-50">
                      <div className="flex items-center gap-2">
                        <button 
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openDetailsModal(admission);
                          }}
                          className="p-2 bg-gray-50 rounded-lg text-gray-400 hover:text-[#8B8B00] hover:bg-[#8B8B00]/5 transition-all"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="p-6 bg-gray-50/30 flex items-center justify-between">
            <p className="text-[10px] font-black text-gray-400 uppercase">Showing 5 of 1,284 Registrations</p>
            <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[10px] font-black text-gray-400 hover:text-gray-900 transition-all">Prev</button>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[10px] font-black text-[#8B8B00] shadow-sm">1</button>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[10px] font-black text-gray-400 hover:text-gray-900 transition-all">2</button>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-[10px] font-black text-gray-400 hover:text-gray-900 transition-all">Next</button>
            </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-gray-900/40 p-4 md:p-6 backdrop-blur-sm overflow-y-auto"
          onClick={closeDetailsModal}
        >
          <div
            className="w-full max-w-5xl rounded-[2rem] bg-white shadow-2xl overflow-hidden mt-6 mb-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-gray-900">Player Admission Details</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">Admission profile</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {['Overview', 'Fee Details', 'Documents', 'Medical', 'Admin Notes'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab
                        ? 'bg-[#8B8B00] text-white'
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 py-6 max-h-[70vh] md:max-h-[75vh] overflow-y-auto">
              {isDetailsLoading && (
                <div className="py-10 text-center text-sm text-gray-500 font-medium">
                  Loading player details...
                </div>
              )}

              {!isDetailsLoading && !selectedAdmission && (
                <div className="py-10 text-center text-sm text-gray-500 font-medium">
                  Player details are not available.
                </div>
              )}

              {!isDetailsLoading && selectedAdmission && (
                <div className="space-y-8">
                  {activeTab === 'Overview' && (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Basic Player Information</p>
                          <div className="mt-4 space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Registration ID</span>
                              <span className="font-semibold">#{detailValue(selectedAdmission.id)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Player Name</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.studentName)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Date of Birth</span>
                              <span className="font-semibold">{formatDob(selectedAdmission.dob)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Age</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.age)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Gender</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.gender)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Aadhaar Number</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.aadhaar)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Registration Date</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.submittedAt ? new Date(selectedAdmission.submittedAt).toLocaleDateString() : '')}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Admission Status</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.status)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Contact Details</p>
                          <div className="mt-4 space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Contact Number</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.personalContact)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">WhatsApp Number</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.whatsapp)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Email ID</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.email)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Address / Location</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.location || selectedAdmission.address)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Branch</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.branch)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Parent / Guardian Details</p>
                          <div className="mt-4 space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Father Name</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.fatherName)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Mother Name</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.motherName)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Guardian Name</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.guardianName)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Guardian Contact</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.guardianContact)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Relationship</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.relationship)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sports / Program Details</p>
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Selected Sport</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.sport)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Batch Name</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.batchName)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Coach Assigned</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.coachAssigned)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Training Schedule</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.trainingSchedule)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Skill Level</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.skillLevel)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Trial Status</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.trialStatus)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fee Details</p>
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Admission Fee</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.admissionFee)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Monthly Fee</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.monthlyFee)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Paid Amount</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.paidAmount)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Pending Amount</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.pendingAmount)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Payment Status</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.paymentStatus)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Payment Mode</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.paymentMode)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-500">Last Payment Date</span>
                              <span className="font-semibold">{detailValue(selectedAdmission.lastPaymentDate)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === 'Fee Details' && (
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fee Details</p>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Admission Fee</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.admissionFee)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Monthly Fee</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.monthlyFee)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Paid Amount</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.paidAmount)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Pending Amount</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.pendingAmount)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Payment Status</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.paymentStatus)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Payment Mode</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.paymentMode)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Last Payment Date</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.lastPaymentDate)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Documents' && (
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Document Details</p>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Photo</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.photo)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Aadhaar Card</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.aadhaarCard)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Birth Certificate</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.birthCertificate)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Medical Certificate</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.medicalCertificate)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Verification Status</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.documentVerificationStatus)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Medical' && (
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Health / Medical Details</p>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Blood Group</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.bloodGroup)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Medical Issue</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.medicalIssue)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Emergency Contact</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.emergencyContact)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Fitness Note</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.fitnessNote)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'Admin Notes' && (
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Admin Information</p>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Approved By</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.approvedBy)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Approval Date</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.approvalDate)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Admin Remark</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.adminRemark)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500">Follow-up Note</span>
                          <span className="font-semibold">{detailValue(selectedAdmission.followUpNote)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="px-6 py-5 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <button
                type="button"
                onClick={closeDetailsModal}
                className="px-6 py-3 rounded-xl border border-gray-100 text-xs font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50"
              >
                Close
              </button>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleEditDetails}
                  className="px-4 py-2 rounded-xl bg-gray-50 text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-100"
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  onClick={handleApproveAdmission}
                  className="px-4 py-2 rounded-xl bg-emerald-50 text-xs font-black uppercase tracking-widest text-emerald-600 hover:bg-emerald-100"
                >
                  Approve Admission
                </button>
                <button
                  type="button"
                  onClick={handleRejectAdmission}
                  className="px-4 py-2 rounded-xl bg-rose-50 text-xs font-black uppercase tracking-widest text-rose-600 hover:bg-rose-100"
                >
                  Reject Admission
                </button>
                <button
                  type="button"
                  onClick={handleDownloadProfile}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-xs font-black uppercase tracking-widest text-white hover:bg-blue-700"
                >
                  Download Profile
                </button>
                <button
                  type="button"
                  onClick={handlePrintDetails}
                  className="px-4 py-2 rounded-xl bg-gray-900 text-xs font-black uppercase tracking-widest text-white hover:bg-gray-800"
                >
                  Print Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalAdmission;
