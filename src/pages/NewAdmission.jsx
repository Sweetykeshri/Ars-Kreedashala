import React from 'react';

const NewAdmission = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Registration Form</h3>
        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">Standard Plan</span>
      </div>
      
      <form className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="Enter student name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Father's Name</label>
            <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="Enter guardian name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Date of Birth</label>
            <input type="date" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Sport Category</label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all">
              <option>Cricket</option>
              <option>Football</option>
              <option>Badminton</option>
              <option>Table Tennis</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Address</label>
          <textarea rows="3" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="Full residential address"></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
          <button type="button" className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
          <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">Submit Admission</button>
        </div>
      </form>
    </div>
  );
};

export default NewAdmission;
