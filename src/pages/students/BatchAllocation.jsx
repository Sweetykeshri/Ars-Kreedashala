import React from 'react';
import { LayoutGrid, Calendar, MapPin, Users, User, ArrowRight, Settings, Plus } from 'lucide-react';

const BatchAllocation = () => {
  const batches = [
    { id: 'B1', name: 'Cricket Beginners', coach: 'Rajesh Patil', time: '4:00 PM - 5:30 PM', students: 18, capacity: 25, ground: 'Cricket Ground A' },
    { id: 'B2', name: 'Football Junior', coach: 'Sushil Das', time: '5:00 PM - 6:30 PM', students: 22, capacity: 22, ground: 'Football Turf' },
    { id: 'B3', name: 'Badminton Morning', coach: 'Anjali Shah', time: '7:00 AM - 8:30 AM', students: 12, capacity: 15, ground: 'Court 1 & 2' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Batch Allocation</h2>
          <p className="text-gray-500 text-sm">Assign students to court timings and coaching staff.</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center gap-2">
          <Settings size={18} /> Configure New Batch
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {batches.map((batch) => (
          <div key={batch.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden">
            {/* Visual indicator for Full batch */}
            {batch.students >= batch.capacity && (
              <div className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] font-bold uppercase px-6 py-1 rotate-45 translate-x-4 -translate-y-0 shadow-sm">
                FULL
              </div>
            )}

            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-blue-600 font-bold tracking-widest text-xs uppercase">Batch {batch.id}</span>
                  <h3 className="text-xl font-bold text-gray-800 uppercase tracking-tight leading-none mt-1">{batch.name}</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="p-2 bg-gray-50 rounded-lg"><User size={16} /></div>
                   <span>{batch.coach}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="p-2 bg-gray-50 rounded-lg"><Calendar size={16} /></div>
                  <span>{batch.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="p-2 bg-gray-50 rounded-lg"><MapPin size={16} /></div>
                  <span className="truncate">{batch.ground}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="p-2 bg-gray-50 rounded-lg"><Users size={16} /></div>
                  <span className="font-bold text-blue-600">{batch.students}/{batch.capacity} Students</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
                <div 
                  className={`h-full transition-all duration-1000 ${batch.students >= batch.capacity ? 'bg-rose-500' : 'bg-blue-500'}`} 
                  style={{ width: `${(batch.students / batch.capacity) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="md:w-32 flex md:flex-col justify-end gap-2 border-l border-gray-50 md:pl-6">
              <button className="flex-1 py-2 text-xs font-bold bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">Manage</button>
              <button className="flex-1 py-2 text-xs font-bold border border-gray-100 text-gray-400 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-1">
                Details <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}

        {/* Empty State / Add Card */}
        <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-8 text-center min-h-[220px] group cursor-pointer hover:border-blue-300 hover:bg-blue-50/20 transition-all">
          <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-colors mb-4">
            <Plus size={24} />
          </div>
          <h4 className="font-bold text-gray-700">Add Training Batch</h4>
          <p className="text-sm text-gray-500 mt-1">Initialize scheduler for ground allocation.</p>
        </div>
      </div>
    </div>
  );
};

export default BatchAllocation;
