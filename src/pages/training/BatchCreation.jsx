import React, { useMemo, useState } from 'react';
import { Check, ChevronDown, Filter, LayoutGrid, Plus, Search, ShieldCheck, Users, X } from 'lucide-react';

const studentRoster = [
  { id: 'ARS001', name: 'Arjun Mehra', sport: 'Cricket', level: 'U-14' },
  { id: 'ARS002', name: 'Sana Khan', sport: 'Badminton', level: 'U-12' },
  { id: 'ARS003', name: 'Kabir Singh', sport: 'Football', level: 'U-15' },
  { id: 'ARS004', name: 'Riya Verma', sport: 'Tennis', level: 'U-13' },
  { id: 'ARS005', name: 'Aman Patel', sport: 'Cricket', level: 'U-16' },
  { id: 'ARS006', name: 'Diya Sharma', sport: 'Football', level: 'U-11' },
  { id: 'ARS007', name: 'Neha Joshi', sport: 'Badminton', level: 'U-14' },
  { id: 'ARS008', name: 'Yuvraj Singh', sport: 'Cricket', level: 'U-18' },
];

const coachRoster = [
  { id: 'CH101', name: 'Rajesh Kumar', sport: 'Cricket', experience: '10 yrs' },
  { id: 'CH102', name: 'Amit Singh', sport: 'Football', experience: '8 yrs' },
  { id: 'CH103', name: 'Sania Mirza', sport: 'Tennis', experience: '12 yrs' },
  { id: 'CH104', name: 'Pullela Gopichand', sport: 'Badminton', experience: '15 yrs' },
  { id: 'CH105', name: 'Meera Iyer', sport: 'Multi-Sport', experience: '9 yrs' },
];

const initialBatches = [
  { id: 'B-001', name: 'Elite Cricket Morning', sport: 'Cricket', coachName: 'Rajesh Kumar', totalStudents: 18, batchTime: '06:00 AM - 08:00 AM', groundCourt: 'Cricket Ground A', status: 'Active' },
  { id: 'B-002', name: 'Junior Football Evening', sport: 'Football', coachName: 'Amit Singh', totalStudents: 22, batchTime: '04:00 PM - 06:00 PM', groundCourt: 'Football Turf', status: 'Upcoming' },
];

const BatchCreation = () => {
  const [showForm, setShowForm] = useState(false);
  const [batchName, setBatchName] = useState('');
  const [sport, setSport] = useState('Cricket');
  const [batchTime, setBatchTime] = useState('06:00 AM - 08:00 AM');
  const [groundCourt, setGroundCourt] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [coachSearch, setCoachSearch] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedCoach, setSelectedCoach] = useState('');
  const [confirmedStudents, setConfirmedStudents] = useState([]);
  const [confirmedCoach, setConfirmedCoach] = useState('');
  const [coachSelectionOpen, setCoachSelectionOpen] = useState(true);
  const [studentSelectionOpen, setStudentSelectionOpen] = useState(true);
  const [createdBatches, setCreatedBatches] = useState(initialBatches);

  const filteredStudents = useMemo(() => {
    const query = studentSearch.trim().toLowerCase();
    if (!query) return studentRoster;
    return studentRoster.filter((student) => [student.id, student.name, student.sport, student.level].some((field) => field.toLowerCase().includes(query)));
  }, [studentSearch]);

  const filteredCoaches = useMemo(() => {
    const query = coachSearch.trim().toLowerCase();
    if (!query) return coachRoster;
    return coachRoster.filter((coach) => [coach.id, coach.name, coach.sport, coach.experience].some((field) => field.toLowerCase().includes(query)));
  }, [coachSearch]);

  const activeCoachId = selectedCoach || confirmedCoach;
  const selectedStudentRecords = studentRoster.filter((student) => confirmedStudents.includes(student.id));
  const selectedCoachRecord = coachRoster.find((coach) => coach.id === activeCoachId);
  const stagedStudentRecords = studentRoster.filter((student) => selectedStudents.includes(student.id));
  const stagedCoachRecord = coachRoster.find((coach) => coach.id === selectedCoach);

  const stats = useMemo(() => ([
    { title: 'Created Batches', value: String(createdBatches.length), note: 'Live list' },
    { title: 'Selected Students', value: String(selectedStudents.length), note: 'Multi-select' },
    { title: 'Selected Coach', value: selectedCoach ? '1' : '0', note: 'Single select' },
    { title: 'Available Coaches', value: String(coachRoster.length), note: 'Roster' },
  ]), [createdBatches.length, selectedStudents.length, selectedCoach]);

  const toggleStudent = (studentId) => {
    setSelectedStudents((current) => (current.includes(studentId) ? current.filter((id) => id !== studentId) : [...current, studentId]));
  };

  const confirmSelection = () => {
    if (selectedStudents.length === 0) {
      alert('Please select at least one student before confirming.');
      return;
    }

    // commit the currently staged students but keep the selection panel open
    setConfirmedStudents(selectedStudents);
  };

  const cancelSelection = () => {
    setSelectedStudents(confirmedStudents);
    setStudentSelectionOpen(false);
  };

  const confirmCoachSelection = () => {
    if (!selectedCoach) {
      alert('Please select a coach before confirming.');
      return;
    }

    setConfirmedCoach(selectedCoach);
    setCoachSelectionOpen(false);
  };

  const cancelCoachSelection = () => {
    setSelectedCoach(confirmedCoach);
    setCoachSelectionOpen(false);
  };

  const createBatch = () => {
    if (!batchName.trim()) {
      alert('Please enter a batch name.');
      return;
    }

    if (confirmedStudents.length === 0) {
      alert('Please confirm at least one student.');
      return;
    }

    if (!activeCoachId) {
      alert('Please select a coach.');
      return;
    }

    const newBatch = {
      id: `B-${String(createdBatches.length + 1).padStart(3, '0')}`,
      name: batchName.trim(),
      sport,
      coachName: selectedCoachRecord?.name || 'Coach Assigned',
      totalStudents: selectedStudentRecords.length,
      batchTime,
      groundCourt: groundCourt.trim() || 'Assigned Ground/Court',
      status: 'Active',
    };

    setCreatedBatches((current) => [newBatch, ...current]);
    setBatchName('');
    setSport('Cricket');
    setBatchTime('06:00 AM - 08:00 AM');
    setGroundCourt('');
    setSelectedStudents([]);
    setSelectedCoach('');
    setConfirmedStudents([]);
    setConfirmedCoach('');
    setStudentSelectionOpen(true);
    setStudentSearch('');
    setCoachSearch('');
    alert(`Created ${newBatch.name} with ${newBatch.totalStudents} students and 1 coach.`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-8 pb-10">
      <div className="flex flex-col gap-4 rounded-4xl border border-gray-100 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between md:p-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B8B00]">Batch & Training</p>
          <h2 className="mt-2 text-2xl font-black text-gray-900 uppercase tracking-tight">Batch Creation</h2>
          <p className="mt-1 text-sm text-gray-500">Create a new batch by choosing students, one coach, and the training details inside the dashboard.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((current) => !current)}
          className="inline-flex items-center gap-2 rounded-2xl bg-[#8B8B00] px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-[#8B8B00]/20 transition-all hover:bg-[#767600]"
        >
          <Plus size={14} />
          Deploy New Batch
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="rounded-4xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">{stat.title}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <h3 className="text-3xl font-black text-gray-900 leading-none">{stat.value}</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.note}</p>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="space-y-6 rounded-4xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Inline Batch Form</p>
              <h3 className="mt-2 text-xl font-black text-gray-900 uppercase tracking-tight">Deploy New Batch</h3>
              <p className="mt-1 text-sm text-gray-500">This stays inside the dashboard shell with no popup or background blur.</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="inline-flex items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-gray-600 transition-all hover:bg-gray-100"
              >
                <X size={14} />
                Hide Form
              </button>
              <button
                type="button"
                onClick={createBatch}
                className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
              >
                Create Batch
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="space-y-5 rounded-4xl border border-gray-100 bg-gray-50/50 p-4 md:p-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Batch Name</label>
                  <input
                    value={batchName}
                    onChange={(e) => setBatchName(e.target.value)}
                    type="text"
                    placeholder="Elite Cricket Morning"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#8B8B00] focus:ring-4 focus:ring-[#8B8B00]/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Sport</label>
                  <select
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all focus:border-[#8B8B00] focus:ring-4 focus:ring-[#8B8B00]/10"
                  >
                    <option>Cricket</option>
                    <option>Football</option>
                    <option>Tennis</option>
                    <option>Badminton</option>
                    <option>Athletics</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Batch Time</label>
                  <input
                    value={batchTime}
                    onChange={(e) => setBatchTime(e.target.value)}
                    type="text"
                    placeholder="06:00 AM - 08:00 AM"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#8B8B00] focus:ring-4 focus:ring-[#8B8B00]/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Ground/Court</label>
                  <input
                    value={groundCourt}
                    onChange={(e) => setGroundCourt(e.target.value)}
                    type="text"
                    placeholder="Ground A / Court 2"
                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#8B8B00] focus:ring-4 focus:ring-[#8B8B00]/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 rounded-4xl bg-linear-to-br from-[#8B8B00]/5 to-amber-50 p-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Batch Name</p>
                  <p className="mt-2 text-sm font-bold text-gray-900 wrap-break-word">{batchName || 'Not selected yet'}</p>
                </div>
                <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sport</p>
                  <p className="mt-2 text-sm font-bold text-gray-900">{sport}</p>
                </div>
                <div className="rounded-2xl bg-white/90 p-4 shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Batch Time</p>
                  <p className="mt-2 text-sm font-bold text-gray-900">{batchTime}</p>
                </div>
                <div className="rounded-2xl bg-white/90 p-4 shadow-sm sm:col-span-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Confirmed Students</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedStudentRecords.length > 0 ? selectedStudentRecords.map((student) => (
                      <span key={student.id} className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        <Check size={12} /> {student.name}
                      </span>
                    )) : (
                      <p className="text-sm font-medium text-gray-400">No students confirmed yet</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <aside className="space-y-4 rounded-4xl border border-gray-100 bg-white p-4 md:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B8B00]">Selection Summary</p>
                  <h4 className="mt-1 text-lg font-black uppercase text-gray-900">Ready to deploy</h4>
                </div>
                <LayoutGrid className="text-[#8B8B00]" size={24} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Students</p>
                  <p className="mt-1 text-2xl font-black text-gray-900">{confirmedStudents.length}</p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Coach</p>
                  <p className="mt-1 text-2xl font-black text-gray-900">{confirmedCoach ? 1 : 0}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-[#8B8B00]/10 bg-[#8B8B00]/5 p-4 text-sm text-gray-600">
                Select multiple students and one coach from the lists below, then click Done to fill the form before creating the batch.
              </div>
              <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-emerald-600" size={20} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Responsive Layout</p>
                    <p className="text-sm font-black uppercase text-gray-900">Mobile, tablet, desktop</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <section className="rounded-4xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center justify-between gap-4 border-b border-gray-50 bg-gray-50/60 px-5 py-4 md:px-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Students</p>
                  <h4 className="mt-1 text-lg font-black uppercase tracking-tight text-gray-900">Select Students</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setStudentSelectionOpen((current) => !current)}
                  className="rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-blue-700 transition-all hover:bg-blue-100"
                >
                  {studentSelectionOpen ? 'Close Selection' : 'Select Students'}
                </button>
              </div>
              {studentSelectionOpen ? (
                <>
                  <div className="p-4 md:p-6">
                    <div className="relative mb-4 w-full">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        value={studentSearch}
                        onChange={(e) => setStudentSearch(e.target.value)}
                        placeholder="Search students"
                        className="w-full rounded-2xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      />
                    </div>
                    <div className="max-h-105 overflow-auto">
                      <div className="grid gap-3 sm:grid-cols-2">
                        {filteredStudents.map((student) => {
                          const checked = selectedStudents.includes(student.id);

                          return (
                            <label
                              key={student.id}
                              className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${checked ? 'border-blue-200 bg-blue-50/50 shadow-sm' : 'border-gray-100 bg-gray-50/40 hover:border-gray-200 hover:bg-gray-50'}`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleStudent(student.id)}
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-3">
                                  <p className="truncate text-sm font-bold text-gray-900">{student.name}</p>
                                  <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-gray-500 shadow-sm">{student.level}</span>
                                </div>
                                <p className="mt-1 text-xs font-semibold text-gray-500">{student.id} • {student.sport}</p>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-gray-100 p-4 md:flex-row md:items-center md:justify-end md:p-5">
                    <button
                      type="button"
                      onClick={cancelSelection}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white px-4 py-3 text-xs font-black uppercase tracking-widest text-gray-600 transition-all hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={confirmSelection}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-xs font-black uppercase tracking-widest text-blue-700 transition-all hover:bg-blue-100"
                    >
                      Done / Confirm Selection
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-4 md:p-6">
                  <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Students confirmed</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedStudentRecords.length > 0 ? selectedStudentRecords.map((student) => (
                        <span key={student.id} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                          <Check size={12} /> {student.name}
                        </span>
                      )) : (
                        <p className="text-sm font-medium text-gray-500">No students confirmed yet</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-4xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center justify-between gap-4 border-b border-gray-50 bg-gray-50/60 px-5 py-4 md:px-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Coach</p>
                  <h4 className="mt-1 text-lg font-black uppercase tracking-tight text-gray-900">Select Coach</h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      value={coachSearch}
                      onChange={(e) => setCoachSearch(e.target.value)}
                      placeholder="Search coaches"
                      className="w-full rounded-2xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setCoachSelectionOpen((current) => !current)}
                    className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black uppercase tracking-widest text-emerald-700 transition-all hover:bg-emerald-100"
                  >
                    {coachSelectionOpen ? 'Close Selection' : 'Select Coach'}
                  </button>
                </div>
              </div>
              <div className="max-h-105 overflow-auto p-4 md:p-6">
                <div className="grid gap-3 sm:grid-cols-2">
                  {filteredCoaches.map((coach) => {
                    const checked = selectedCoach === coach.id;

                    return (
                      <label
                        key={coach.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all ${checked ? 'border-emerald-200 bg-emerald-50/60 shadow-sm' : 'border-gray-100 bg-gray-50/40 hover:border-gray-200 hover:bg-gray-50'}`}
                      >
                        <input
                          type="radio"
                          name="coach-selection"
                          checked={checked}
                          onChange={() => setSelectedCoach(coach.id)}
                          className="mt-1 h-4 w-4 border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <p className="truncate text-sm font-bold text-gray-900">{coach.name}</p>
                            <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-gray-500 shadow-sm">{coach.experience}</span>
                          </div>
                          <p className="mt-1 text-xs font-semibold text-gray-500">{coach.id} • {coach.sport}</p>
                          <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">{checked ? 'Selected' : 'Tap to select'}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {coachSelectionOpen ? (
                <div className="flex flex-col gap-3 border-t border-gray-100 p-4 md:flex-row md:items-center md:justify-end md:p-5">
                  <button
                    type="button"
                    onClick={cancelCoachSelection}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-white px-4 py-3 text-xs font-black uppercase tracking-widest text-gray-600 transition-all hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={confirmCoachSelection}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-black uppercase tracking-widest text-emerald-700 transition-all hover:bg-emerald-100"
                  >
                    Done / Confirm Selection
                  </button>
                </div>
              ) : (
                <div className="p-4 md:p-6">
                  <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Coach confirmed</p>
                    <div className="mt-3">
                      {selectedCoachRecord ? (
                        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700 shadow-sm">
                          <Check size={12} /> {selectedCoachRecord.name}
                        </div>
                      ) : (
                        <p className="text-sm font-medium text-gray-500">No coach confirmed yet</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </section>
          </div>
        </div>
      )}

      <section className="space-y-5 rounded-4xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B8B00]">Created Batches</p>
            <h3 className="mt-2 text-xl font-black text-gray-900 uppercase tracking-tight">Batch List</h3>
          </div>
          <div className="flex items-center gap-2 rounded-2xl bg-gray-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <Filter size={12} className="text-[#8B8B00]" />
            Showing {createdBatches.length} batches
          </div>
        </div>

        <div className="hidden overflow-hidden rounded-3xl border border-gray-100 md:block">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Batch Name</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Sport</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Coach Name</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total Students</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Batch Time</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {createdBatches.map((batch) => (
                  <tr key={batch.id} className="transition-colors hover:bg-gray-50/60">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-900">{batch.name}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-700">{batch.sport}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-700 wrap-break-word">{batch.coachName}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{batch.totalStudents}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-700">{batch.batchTime}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${batch.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${batch.status === 'Active' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                        {batch.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:hidden">
          {createdBatches.map((batch) => (
            <article key={batch.id} className="rounded-3xl border border-gray-100 bg-gray-50/60 p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{batch.id}</p>
                  <h4 className="mt-1 text-base font-bold text-gray-900">{batch.name}</h4>
                </div>
                <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${batch.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                  {batch.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white p-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sport</p>
                  <p className="mt-1 font-semibold text-gray-900">{batch.sport}</p>
                </div>
                <div className="rounded-2xl bg-white p-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Students</p>
                  <p className="mt-1 font-semibold text-gray-900">{batch.totalStudents}</p>
                </div>
                <div className="rounded-2xl bg-white p-3 col-span-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Coach Name</p>
                  <p className="mt-1 font-semibold text-gray-900 wrap-break-word">{batch.coachName}</p>
                </div>
                <div className="rounded-2xl bg-white p-3 col-span-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Batch Time</p>
                  <p className="mt-1 font-semibold text-gray-900">{batch.batchTime}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-4xl border border-dashed border-gray-200 bg-gray-50/60 p-5 text-sm text-gray-600 md:p-6">
        <div className="flex items-center gap-3">
          <ChevronDown className="text-[#8B8B00]" size={18} />
          <p className="font-medium">Selected students: {selectedStudentRecords.length || 'none'} | Selected coach: {selectedCoachRecord ? selectedCoachRecord.name : 'none'}</p>
        </div>
        {(stagedStudentRecords.length > 0 || stagedCoachRecord) && (
          <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Pending Selection</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {stagedStudentRecords.map((student) => (
                <span key={student.id} className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  <Check size={12} /> {student.name}
                </span>
              ))}
              {stagedCoachRecord && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <Check size={12} /> {stagedCoachRecord.name}
                </span>
              )}
            </div>
          </div>
        )}
        {selectedStudentRecords.length > 0 && (
          <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Confirmed Students</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedStudentRecords.map((student) => (
                <span key={student.id} className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  <Check size={12} /> {student.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      <div className="mt-2 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
        <Users size={14} />
        <span>Responsive layout for mobile, tablet, and desktop</span>
      </div>
    </div>
  );
};

export default BatchCreation;