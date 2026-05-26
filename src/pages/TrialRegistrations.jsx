import React, { useState } from 'react';

const TrialRegistrations = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#f4f3ef] px-2 py-4 sm:px-4 md:px-6">
      <div className="w-full rounded-2xl border border-[#e3e2dc] bg-white shadow-[0_24px_60px_-40px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col gap-3 border-b border-[#eceae3] px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#e5e1d3] bg-[#f7f6f0] text-[#8b8b00]">
              <span className="text-lg font-black">ARS</span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-gray-400 sm:text-[11px] sm:tracking-[0.35em]">ARS KREED</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300 sm:text-[10px] sm:tracking-[0.4em]">Excellence in Sports</p>
            </div>
          </div>
          <div className="text-left text-[9px] font-bold uppercase tracking-widest text-gray-400 sm:text-[10px] md:text-right">
            <p>ARS KREEDASHALA PRIVATE LIMITED</p>
            <p>Daladali Chowk, Ranchi, Jharkhand</p>
            <p>+91 9205200015 | +91 9279708427</p>
            <p>www.arskreedashala.com</p>
          </div>
        </div>

        <div className="px-4 py-4 sm:px-6">
          <div className="flex justify-center">
            <div className="relative bg-[#8b8b00] px-10 py-2 text-white shadow-[0_10px_20px_-12px_rgba(0,0,0,0.6)]">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] sm:text-[12px] sm:tracking-[0.4em]">Player Registration Form</span>
              <div className="absolute -left-4 top-0 h-full w-4 skew-x-[-18deg] bg-[#8b8b00]"></div>
              <div className="absolute -right-4 top-0 h-full w-4 skew-x-[-18deg] bg-[#8b8b00]"></div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-black shadow-sm ${
                    step === currentStep
                      ? 'bg-[#8b8b00] text-white'
                      : 'border border-[#e3e2dc] bg-white text-gray-300'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && <div className="h-px w-10 bg-[#eceae3]"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 pb-6 sm:px-6">
          {currentStep === 1 ? (
            <>
              <div className="border-t border-[#eceae3] pt-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-[#8b8b00] px-4 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white shadow-sm sm:px-6 sm:text-[11px] sm:tracking-[0.3em]">
                    Student Information
                  </div>
                  <div className="h-px flex-1 bg-[#e8e6dc]"></div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Student Name</label>
                    <input className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" placeholder="Enter player's full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">DOB</label>
                    <input type="date" className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Age</label>
                    <input type="number" className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" placeholder="Years" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Gender</label>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-600">
                      {['Male', 'Female', 'Other'].map((option) => (
                        <label key={option} className="flex items-center gap-2">
                          <input type="radio" name="gender" className="h-3 w-3" />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">School / Club</label>
                    <input className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" placeholder="Institution name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Location</label>
                    <input className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" placeholder="Current city" />
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-[#eceae3] pt-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-[#8b8b00] px-4 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white shadow-sm sm:px-6 sm:text-[11px] sm:tracking-[0.3em]">
                    Parent Contact
                  </div>
                  <div className="h-px flex-1 bg-[#e8e6dc]"></div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-2 lg:col-span-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Parent Name</label>
                    <input className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" placeholder="Parent / Guardian" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Contact Number</label>
                    <input className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">WhatsApp</label>
                    <input className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="space-y-2 lg:col-span-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Email</label>
                    <input type="email" className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" placeholder="player@email.com" />
                  </div>
                </div>
              </div>
            </>
          ) : currentStep === 2 ? (
            <>
              <div className="border-t border-[#eceae3] pt-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-[#8b8b00] px-4 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white shadow-sm sm:px-6 sm:text-[11px] sm:tracking-[0.3em]">
                    Trial Information
                  </div>
                  <div className="h-px flex-1 bg-[#e8e6dc]"></div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Sport</label>
                    <select className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]">
                      <option>Select Sport</option>
                      <option>Cricket</option>
                      <option>Football</option>
                      <option>Badminton</option>
                      <option>Fitness</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Trial Date</label>
                    <input type="date" className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Trial Time</label>
                    <input type="time" className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Preferred Batch</label>
                    <input className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" placeholder="Morning / Evening" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Trial Type</label>
                    <select className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]">
                      <option>Select Type</option>
                      <option>Individual</option>
                      <option>Group</option>
                      <option>Skill Assessment</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Assigned Coach</label>
                    <input className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" placeholder="Coach Name" />
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-[#eceae3] pt-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-[#8b8b00] px-4 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white shadow-sm sm:px-6 sm:text-[11px] sm:tracking-[0.3em]">
                    Health Information
                  </div>
                  <div className="h-px flex-1 bg-[#e8e6dc]"></div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Medical Issue</label>
                    <input className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" placeholder="If any" />
                  </div>
                  <div className="space-y-2 lg:col-span-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Previous Sports Experience</label>
                    <input className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" placeholder="Teams / Clubs / Level" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Emergency Contact</label>
                    <input className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" placeholder="Contact Number" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="border-t border-[#eceae3] pt-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-[#8b8b00] px-4 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-white shadow-sm sm:px-6 sm:text-[11px] sm:tracking-[0.3em]">
                    Status & Follow-up
                  </div>
                  <div className="h-px flex-1 bg-[#e8e6dc]"></div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Status</label>
                    <select className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]">
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Expired</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Follow-up Date</label>
                    <input type="date" className="w-full border-b border-[#e0ddd1] bg-transparent py-2 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]" />
                  </div>
                  <div className="space-y-2 md:col-span-2 lg:col-span-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-gray-500">Admin Remark</label>
                    <textarea
                      rows="3"
                      className="w-full rounded-xl border border-[#e0ddd1] bg-transparent p-3 text-sm font-semibold text-gray-700 outline-none focus:border-[#8b8b00]"
                      placeholder="Notes and follow-up actions"
                    ></textarea>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[#eceae3] pt-5 md:flex-row md:items-center">
            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-400">
              {currentStep === 1
                ? 'Step 1 of 4 - Student details'
                : currentStep === 2
                ? 'Step 2 of 4 - Trial details'
                : 'Step 3 of 4 - Status & follow-up'}
            </p>
            <div className="flex items-center gap-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((step) => Math.max(step - 1, 1))}
                  className="rounded-full bg-[#8b8b00] px-6 py-3 text-[10px] font-black uppercase tracking-[0.3em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#7a7a00]"
                >
                  Previous
                </button>
              )}
              <button
                type="button"
                onClick={() => setCurrentStep((step) => Math.min(step + 1, 3))}
                className="rounded-full bg-[#8b8b00] px-8 py-3 text-[10px] font-black uppercase tracking-[0.35em] text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#7a7a00]"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialRegistrations;
