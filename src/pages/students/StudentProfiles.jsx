import React, { useMemo, useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Download } from 'lucide-react';

const StudentProfiles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const students = [
    { id: 'ARS001', name: 'Arjun Mehra', age: 14, gender: 'Male', sport: 'Cricket', batch: 'Afternoon B1', contact: '+91 98765 43210', status: 'Active' },
    { id: 'ARS002', name: 'Sana Khan', age: 12, gender: 'Female', sport: 'Badminton', batch: 'Morning A2', contact: '+91 98765 43211', status: 'Active' },
    { id: 'ARS003', name: 'Kabir Singh', age: 15, gender: 'Male', sport: 'Football', batch: 'Evening C1', contact: '+91 98765 43212', status: 'Inactive' },
    { id: 'ARS004', name: 'Riya Verma', age: 13, gender: 'Female', sport: 'Table Tennis', batch: 'Morning A1', contact: '+91 98765 43213', status: 'Active' },
  ];

  const totalPages = Math.max(1, Math.ceil(students.length / pageSize));
  const visibleStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return students.slice(startIndex, startIndex + pageSize);
  }, [currentPage, students]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Student Profiles</h2>
          <p className="text-gray-500 text-sm">Manage athlete records and personal information.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => alert('Preparing student profiles for export...')}
            className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID or sport..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 rounded-lg outline-none transition-all text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => alert('Opening advanced data filters...')}
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm hover:bg-gray-100"
            >
              <Filter size={16} /> Filter
            </button>
            <select 
              onChange={(e) => alert(`Displaying records for sport: ${e.target.value}`)}
              className="bg-gray-50 text-gray-600 px-3 py-2 rounded-lg text-sm outline-none cursor-pointer"
            >
              <option>All Sports</option>
              <option>Cricket</option>
              <option>Football</option>
              <option>Badminton</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Age/Gender</th>
                <th className="px-6 py-4">Sport & Batch</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visibleStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase text-sm">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-800">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-mono">{student.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {student.age} yrs / {student.gender}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="font-medium text-gray-800">{student.sport}</p>
                      <p className="text-gray-500 text-xs">{student.batch}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.contact}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Opening actions for ${student.name} (${student.id})`)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white rounded-md transition-all"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, students.length)} of {students.length} students
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="px-3 py-1 border border-gray-200 rounded text-sm disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
              {currentPage}
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              className="px-3 py-1 border border-gray-200 rounded text-sm disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfiles;
