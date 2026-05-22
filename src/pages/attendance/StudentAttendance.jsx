import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Download,
  AlertCircle
} from 'lucide-react';

const StudentAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const stats = [
    { label: 'Total Enrolled', value: '450', color: 'bg-blue-600', icon: <Users size={20} className="text-white" /> },
    { label: 'Present Today', value: '382', color: 'bg-green-600', icon: <CheckCircle2 size={20} className="text-white" /> },
    { label: 'Absent', value: '45', color: 'bg-red-600', icon: <XCircle size={20} className="text-white" /> },
    { label: 'Late Arrival', value: '23', color: 'bg-amber-600', icon: <Clock size={20} className="text-white" /> },
  ];

  const students = [
    { id: 'STU001', name: 'Arjun Sharma', batch: 'B1 - Cricket', sport: 'Cricket', status: 'Present', time: '04:15 PM', remarks: 'On time' },
    { id: 'STU002', name: 'Suhani Rao', batch: 'B2 - Football', sport: 'Football', status: 'Absent', time: '-', remarks: 'Informed' },
    { id: 'STU003', name: 'Ishaan Gupta', batch: 'B1 - Cricket', sport: 'Cricket', status: 'Late', time: '04:45 PM', remarks: 'Late due to school' },
    { id: 'STU004', name: 'Riya Verma', batch: 'B3 - Badminton', sport: 'Badminton', status: 'Present', time: '07:05 AM', remarks: '' },
    { id: 'STU005', name: 'Kabir Singh', batch: 'B2 - Football', sport: 'Football', status: 'Present', time: '05:10 PM', remarks: '' },
    { id: 'STU006', name: 'Ananya Das', batch: 'B3 - Badminton', sport: 'Badminton', status: 'Present', time: '07:15 AM', remarks: '' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-700 border-green-200';
      case 'Absent': return 'bg-red-100 text-red-700 border-red-200';
      case 'Late': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Attendance</h1>
          <p className="text-gray-500">Track and manage daily student logs for {selectedDate}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
            <CheckCircle2 size={18} />
            <span>Mark All Present</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by student name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-gray-600 bg-white hover:bg-gray-50 text-sm transition-all w-full md:w-auto">
              <Filter size={16} />
              <span>Filter Batches</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-gray-600 bg-white hover:bg-gray-50 text-sm transition-all w-full md:w-auto">
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Batch/Sport</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Check-in</th>
                <th className="px-6 py-4">Remarks</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs ring-2 ring-white shadow-sm overflow-hidden">
                        <img src={`https://ui-avatars.com/api/?name=${student.name}&background=random`} alt={student.name} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{student.name}</div>
                        <div className="text-gray-500 text-xs">{student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="font-medium text-gray-700">{student.batch}</div>
                    <div className="text-gray-500 text-xs">{student.sport}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusStyle(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2 italic">
                      {student.time !== '-' ? <Clock size={14} className="text-gray-400" /> : <AlertCircle size={14} className="text-gray-300" />}
                      {student.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 italic max-w-xs truncate">
                    {student.remarks || "---"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors font-medium">Edit</button>
                      <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing 6 of 84 students</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all">
              <ChevronLeft size={18} />
            </button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;