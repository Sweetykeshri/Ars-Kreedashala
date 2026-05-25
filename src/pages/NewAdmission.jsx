import React, { useState } from 'react';
import { 
  Trophy, 
  MapPin, 
  Phone, 
  Globe, 
  Camera,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Info,
  CreditCard,
  Wallet,
  PenTool,
  Zap,
  Activity,
  FileText,
  Fingerprint,
  Loader2
} from 'lucide-react';

const NewAdmission = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    studentName: '',
    dob: { d1: '', d2: '', m1: '', m2: '', y1: '', y2: '', y3: '', y4: '' },
    gender: '',
    schoolName: '',
    location: '',
    personalContact: '',
    whatsapp: '',
    email: '',
    aadhaar: Array(12).fill(''),
    // Step 2
    sport: 'cricket',
    branch: 'daladali',
    // Step 3
    guardianName: '',
    occupation: '',
    guardianContact: '',
    guardianEmail: '',
    address: '',
    landmark: '',
    pincode: '',
    // Step 4
    paymentMethod: 'upi',
    signature: null
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [aadhaarPreview, setAadhaarPreview] = useState(null);
  const [isReadingAadhaar, setIsReadingAadhaar] = useState(false);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAadhaarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAadhaarPreview(file.name);
      setIsReadingAadhaar(true);
      
      // Simulated OCR Process
      setTimeout(() => {
        const mockAadhaar = "542188901234".split("");
        setFormData(prev => ({
          ...prev,
          aadhaar: mockAadhaar
        }));
        setIsReadingAadhaar(false);
      }, 2000);
    }
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSignaturePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    alert('Payment Initiated & Registration Form Submitted Successfully!');
  };

  const SectionHeader = ({ title }) => (
    <div className="relative mb-6">
      <div className="bg-[#8B8B00] text-white px-6 py-1.5 inline-block -skew-x-12 transform origin-left shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-wider skew-x-12">{title}</h3>
      </div>
      <div className="h-0.5 bg-[#8B8B00] w-full -mt-px opacity-20"></div>
    </div>
  );

  return (
    <div className="w-full bg-white shadow-2xl p-4 md:p-6 lg:p-8 font-serif text-[#444] rounded-sm min-h-screen lg:min-h-0">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-6 border-b-2 border-gray-100 pb-4">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-gray-50 flex items-center justify-center border border-gray-200 rounded-lg p-2 shadow-inner">
            <Trophy size={32} className="text-[#8B8B00]" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter leading-none">ARS KREED</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1">Excellence in Sports</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-black text-gray-900 leading-none">ARS KREEDASHALA PRIVATE LIMITED</h2>
          <div className="flex flex-col items-end gap-1 mt-2 text-[10px] font-bold text-gray-500 uppercase">
            <span className="flex items-center gap-2"><MapPin size={10} /> Daladali Chowk, Ranchi, Jharkhand</span>
            <span className="flex items-center gap-2"><Phone size={10} /> +91 9205200015 | +91 9279708427</span>
            <span className="flex items-center gap-2"><Globe size={10} /> www.arskreedashala.com</span>
          </div>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="relative flex justify-center mb-8">
        <div className="bg-[#8B8B00] text-white px-12 py-2.5 -skew-x-12 transform shadow-lg">
          <h1 className="text-base font-black uppercase tracking-[0.25em] skew-x-12 italic">PLAYER REGISTRATION FORM</h1>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-3">
            {[1, 2, 3, 4].map((step, idx) => (
              <React.Fragment key={step}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-md transition-all duration-300 ${
                  currentStep >= step ? 'bg-[#8B8B00] text-white' : 'bg-gray-50 text-gray-300 border-2 border-gray-100'
                }`}>
                  {currentStep > step ? <CheckCircle2 size={14} /> : step}
                </div>
                {idx < 3 && (
                  <div className={`w-12 md:w-16 h-0.5 rounded-full transition-all duration-500 ${
                    currentStep > step ? 'bg-[#8B8B00]' : 'bg-gray-100'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
        </div>
      </div>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="flex flex-col lg:flex-row gap-12 item-start">
              
              {/* Fields Container (Left Side on Desktop) */}
              <div className="flex-1 space-y-6">
                <SectionHeader title="PERSONAL INFORMATION" />
                
                <div className="grid grid-cols-1 gap-5">
                  {/* Student Name */}
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <label className="text-[10px] font-black uppercase w-36 shrink-0 text-gray-600 tracking-wider">Student Name <span className="text-red-500">*</span></label>
                    <input type="text" className="flex-1 border-b-2 border-gray-100 focus:border-[#8B8B00] outline-none py-1 text-sm font-bold transition-all placeholder:text-gray-200" placeholder="ENTER PLAYER'S FULL NAME" />
                  </div>

                  {/* DOB and Gender */}
                  <div className="flex flex-col xl:flex-row xl:items-center gap-8">
                    <div className="flex items-center gap-4 grow">
                      <label className="text-[10px] font-black uppercase shrink-0 text-gray-600 tracking-wider">Date of Birth <span className="text-red-500">*</span></label>
                      <div className="flex gap-1">
                        {[1,2].map(i => <input key={`d${i}`} maxLength={1} className="w-7 h-8 border-2 border-gray-50 text-center text-xs font-black focus:border-[#8B8B00] outline-none rounded shadow-sm" placeholder="D" />)}
                        <span className="text-gray-300 flex items-center font-bold px-0.5">/</span>
                        {[1,2].map(i => <input key={`m${i}`} maxLength={1} className="w-7 h-8 border-2 border-gray-50 text-center text-xs font-black focus:border-[#8B8B00] outline-none rounded shadow-sm" placeholder="M" />)}
                        <span className="text-gray-300 flex items-center font-bold px-0.5">/</span>
                        {[1,2,3,4].map(i => <input key={`y${i}`} maxLength={1} className="w-7 h-8 border-2 border-gray-50 text-center text-xs font-black focus:border-[#8B8B00] outline-none rounded shadow-sm" placeholder="Y" />)}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 border-l-0 xl:border-l-2 xl:border-gray-50 xl:pl-8">
                      <label className="text-[10px] font-black uppercase shrink-0 text-gray-600 tracking-wider">Gender <span className="text-red-500">*</span></label>
                      <div className="flex gap-4 text-[10px] font-black uppercase">
                        {['Male', 'Female', 'Other'].map(g => (
                          <label key={g} className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="gender" className="accent-[#8B8B00] w-4 h-4" /> 
                            <span className="group-hover:text-[#8B8B00] transition-colors">{g}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* School and Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">Name of School / Club</label>
                      <input type="text" className="border-b-2 border-gray-100 focus:border-[#8B8B00] outline-none py-1 text-sm font-bold transition-all placeholder:text-gray-200" placeholder="INSTITUTION NAME" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">Location / City <span className="text-red-500">*</span></label>
                      <input type="text" className="border-b-2 border-gray-100 focus:border-[#8B8B00] outline-none py-1 text-sm font-bold transition-all placeholder:text-gray-200" placeholder="CURRENT CITY" />
                    </div>
                  </div>

                  {/* Contacts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">Contact Number (Personal) <span className="text-red-500">*</span></label>
                      <input type="text" className="border-b-2 border-gray-100 focus:border-[#8B8B00] outline-none py-1 text-sm font-bold transition-all placeholder:text-gray-200" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">WhatsApp Number</label>
                      <input type="text" className="border-b-2 border-gray-100 focus:border-[#8B8B00] outline-none py-1 text-sm font-bold transition-all placeholder:text-gray-200" placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>

                  {/* Email and Aadhaar */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">Email ID <span className="text-gray-300 font-bold">(OPTIONAL)</span></label>
                      <input type="email" className="border-b-2 border-gray-100 focus:border-[#8B8B00] outline-none py-1 text-sm font-bold transition-all placeholder:text-gray-200" placeholder="PLAYER@EMAIL.COM" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">Aadhaar Card Number <span className="text-red-500">*</span></label>
                      <div className="flex gap-1">
                        {formData.aadhaar.map((digit, i) => (
                          <input 
                            key={i} 
                            maxLength={1} 
                            value={digit}
                            onChange={(e) => {
                              const newAadhaar = [...formData.aadhaar];
                              newAadhaar[i] = e.target.value;
                              setFormData({ ...formData, aadhaar: newAadhaar });
                            }}
                            className="w-5 h-7 border-2 border-gray-50 text-center text-[10px] font-black focus:border-[#8B8B00] outline-none rounded shadow-sm transition-all" 
                            placeholder="•" 
                          />
                        ))}
                      </div>
                      {isReadingAadhaar && (
                        <p className="text-[9px] font-bold text-[#8B8B00] animate-pulse flex items-center gap-1 mt-1">
                          <Loader2 size={10} className="animate-spin" /> SCANNING DOCUMENT...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Photos & Documents Section (Right Side on Desktop) */}
              <div className="w-full lg:w-48 shrink-0 flex flex-col gap-8 items-center border-l-0 lg:border-l-2 lg:border-gray-50 lg:pl-8">
                {/* Photo Upload */}
                <div className="w-full">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 text-center">Portrait</p>
                  <div className="aspect-[3/4] w-full max-w-[140px] mx-auto border-4 border-dashed border-gray-100 bg-gray-50 rounded-2xl flex flex-col items-center justify-center p-3 text-center group relative cursor-pointer hover:border-[#8B8B00] hover:bg-[#8B8B00]/5 transition-all shadow-inner">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover rounded-xl shadow-lg border-2 border-white" />
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md mb-2 group-hover:scale-110 transition-transform">
                            <Camera size={20} className="text-gray-300 group-hover:text-[#8B8B00] transition-colors" />
                        </div>
                        <p className="text-[8px] font-black text-gray-600 uppercase leading-tight mb-0.5">Click to</p>
                        <p className="text-[8px] font-black text-gray-600 uppercase leading-tight">Upload</p>
                      </div>
                    )}
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handlePhotoUpload} accept="image/*" />
                  </div>
                </div>

                {/* Aadhaar Upload */}
                <div className="w-full">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 text-center">Aadhaar Card</p>
                  <div className={`aspect-[4/3] w-full max-w-[140px] mx-auto border-4 border-dashed rounded-2xl flex flex-col items-center justify-center p-3 text-center group relative cursor-pointer transition-all shadow-inner ${
                    isReadingAadhaar ? 'border-[#8B8B00] bg-[#8B8B00]/5 animate-pulse' : 'border-gray-100 bg-gray-50 hover:border-[#8B8B00] hover:bg-[#8B8B00]/5'
                  }`}>
                    {aadhaarPreview ? (
                      <div className="flex flex-col items-center gap-2">
                        <FileText size={24} className="text-[#8B8B00]" />
                        <p className="text-[8px] font-bold text-gray-600 truncate w-full px-2">{aadhaarPreview}</p>
                        {!isReadingAadhaar && <p className="text-[7px] text-[#8B8B00] font-black uppercase">Click to Change</p>}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md mb-2 group-hover:scale-110 transition-transform">
                            <Fingerprint size={20} className="text-gray-300 group-hover:text-[#8B8B00] transition-colors" />
                        </div>
                        <p className="text-[8px] font-black text-gray-600 uppercase leading-tight mb-0.5">Upload</p>
                        <p className="text-[8px] font-black text-gray-600 uppercase leading-tight">Aadhaar</p>
                      </div>
                    )}
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleAadhaarUpload} accept="image/*,application/pdf" />
                  </div>
                  <p className="mt-3 text-[8px] text-gray-400 font-bold text-center italic leading-tight px-2">
                    {isReadingAadhaar ? 'Reading Aadhaar Number...' : 'Auto-reads Aadhaar number using OCR'}
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Step 2: Sport & Fees */}
        {currentStep === 2 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              
              {/* Left Column: Selection */}
              <div className="flex-1 space-y-8">
                <div>
                  <SectionHeader title="SPORTS INFORMATION" />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { id: 'cricket', name: 'Cricket', icon: Trophy },
                      { id: 'football', name: 'Football', icon: Trophy },
                      { id: 'fitness', name: 'Fitness', icon: Activity }
                    ].map((sport) => (
                      <label key={sport.id} className="relative cursor-pointer group">
                        <input 
                          type="radio" 
                          name="sport" 
                          value={sport.id} 
                          className="peer sr-only" 
                          checked={formData.sport === sport.id}
                          onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                        />
                        <div className="flex flex-col items-center gap-3 p-5 border-2 border-gray-50 rounded-2xl transition-all peer-checked:border-[#8B8B00] peer-checked:bg-[#8B8B00]/5 hover:bg-gray-50 group-active:scale-95">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 transition-all peer-checked:bg-[#8B8B00] group-hover:shadow-md">
                            <sport.icon size={20} className="text-gray-400 group-hover:text-[#8B8B00] peer-checked:text-white" />
                          </div>
                          <span className="text-xs font-black uppercase tracking-widest text-gray-600 group-hover:text-gray-900">{sport.name}</span>
                          <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 transition-opacity">
                            <div className="w-4 h-4 bg-[#8B8B00] rounded-full flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <SectionHeader title="SELECT BRANCH" />
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'daladali', name: 'Daladali', area: 'Ranchi, Jharkhand' },
                      { id: 'main', name: 'Main Branch', area: 'Ranchi' }
                    ].map((branch) => (
                      <label key={branch.id} className="relative cursor-pointer group">
                        <input 
                          type="radio" 
                          name="branch" 
                          value={branch.id} 
                          className="peer sr-only" 
                          checked={formData.branch === branch.id}
                          onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        />
                        <div className="flex flex-col p-4 border-2 border-gray-50 rounded-2xl transition-all peer-checked:border-[#8B8B00] peer-checked:bg-[#8B8B00]/5 hover:bg-gray-50 group-active:scale-95">
                          <span className="text-xs font-black uppercase text-gray-800">{branch.name}</span>
                          <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase flex items-center gap-1">
                            <MapPin size={10} /> {branch.area}
                          </span>
                          <div className="absolute top-4 right-4 opacity-0 peer-checked:opacity-100 transition-opacity">
                             <div className="w-2 h-2 bg-[#8B8B00] rounded-full"></div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Fee Structure */}
              <div className="w-full lg:w-96 shrink-0 space-y-6">
                <SectionHeader title="FEE STRUCTURE" />
                <div className="bg-gray-50 rounded-3xl p-6 border-2 border-gray-100 shadow-inner">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200 border-dashed">
                      <div>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Admission Fee</p>
                        <p className="text-xs font-bold text-gray-600 italic">One-time registration</p>
                      </div>
                      <span className="text-lg font-black text-gray-900">
                        ₹{formData.sport === 'football' ? '1,000' : '4,000'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pb-4 border-b border-gray-200 border-dashed">
                      <div>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Monthly Fee</p>
                        <p className="text-xs font-bold text-gray-600 italic">Training & coaching</p>
                      </div>
                      <span className="text-lg font-black text-gray-900">
                        ₹{formData.sport === 'football' ? '1,000' : '4,000'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-black uppercase text-[#8B8B00] tracking-wider">Early Bird Discount</p>
                        <p className="text-xs font-bold text-gray-400 italic">Special offer applied</p>
                      </div>
                      <span className="text-lg font-black text-[#8B8B00]">
                        -₹{formData.sport === 'football' ? '500' : '1,000'}
                      </span>
                    </div>

                    <div className="mt-8 pt-6 border-t-2 border-gray-200">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-black uppercase text-gray-500 mb-1">Total Payable</p>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">(Inclusive of all taxes)</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[14px] text-gray-400 line-through font-bold mr-2">
                            ₹{formData.sport === 'football' ? '2,000' : '9,000'}
                          </span>
                          <span className="text-3xl font-black text-[#8B8B00] tracking-tight">
                            ₹{formData.sport === 'football' ? '1,500' : '7,000'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-6 py-3 flex items-center justify-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-[#8B8B00] transition-colors group">
                    <Info size={14} className="group-hover:rotate-12 transition-transform" />
                    View Detailed Breakup
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Step 3: Parents/Guardian Details */}
        {currentStep === 3 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-700 space-y-8">
            <SectionHeader title="PARENTS / GUARDIAN DETAILS" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
              {/* Guardian Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">Guardian Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  className="border-b-2 border-gray-100 focus:border-[#8B8B00] outline-none py-1 text-sm font-bold transition-all placeholder:text-gray-200" 
                  placeholder="FULL NAME" 
                  value={formData.guardianName}
                  onChange={(e) => setFormData({...formData, guardianName: e.target.value})}
                />
              </div>

              {/* Occupation */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">Occupation</label>
                <input 
                  type="text" 
                  className="border-b-2 border-gray-100 focus:border-[#8B8B00] outline-none py-1 text-sm font-bold transition-all placeholder:text-gray-200" 
                  placeholder="e.g. BUSINESS / SERVICE" 
                  value={formData.occupation}
                  onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                />
              </div>

              {/* Contact Number */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">Contact Number <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  className="border-b-2 border-gray-100 focus:border-[#8B8B00] outline-none py-1 text-sm font-bold transition-all placeholder:text-gray-200" 
                  placeholder="+91 XXXXX XXXXX" 
                  value={formData.guardianContact}
                  onChange={(e) => setFormData({...formData, guardianContact: e.target.value})}
                />
              </div>

              {/* Email ID */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">Email ID</label>
                <input 
                  type="email" 
                  className="border-b-2 border-gray-100 focus:border-[#8B8B00] outline-none py-1 text-sm font-bold transition-all placeholder:text-gray-200" 
                  placeholder="GUARDIAN@EMAIL.COM" 
                  value={formData.guardianEmail}
                  onChange={(e) => setFormData({...formData, guardianEmail: e.target.value})}
                />
              </div>

              {/* PIN Code */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">PIN Code <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  className="border-b-2 border-gray-100 focus:border-[#8B8B00] outline-none py-1 text-sm font-bold transition-all placeholder:text-gray-200" 
                  placeholder="XXXXXX" 
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                />
              </div>

              {/* Landmark */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">Landmark</label>
                <input 
                  type="text" 
                  className="border-b-2 border-gray-100 focus:border-[#8B8B00] outline-none py-1 text-sm font-bold transition-all placeholder:text-gray-200" 
                  placeholder="NEARBY LOCATION" 
                  value={formData.landmark}
                  onChange={(e) => setFormData({...formData, landmark: e.target.value})}
                />
              </div>
            </div>

            {/* Address - Full Width */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase text-gray-600 tracking-wider">Full Residential Address <span className="text-red-500">*</span></label>
              <textarea 
                rows="2"
                className="border-2 border-gray-50 bg-gray-50/50 rounded-xl focus:border-[#8B8B00] focus:bg-white outline-none p-3 text-sm font-bold transition-all placeholder:text-gray-200 resize-none shadow-inner" 
                placeholder="HOUSE NO, STREET, AREA..." 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              ></textarea>
            </div>

            <div className="bg-blue-50/50 p-4 rounded-2xl flex items-start gap-3 border border-blue-100">
               <Info size={16} className="text-blue-400 mt-1 shrink-0" />
               <p className="text-[10px] font-bold text-blue-600 leading-relaxed uppercase tracking-wide">
                 Please ensure the address matches your utility bill or bank documents for address verification purposes.
               </p>
            </div>
          </div>
        )}

        {/* Step 4: Payment Options */}
        {currentStep === 4 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              
              {/* Left Column: Payment Methods */}
              <div className="flex-1 space-y-4">
                <SectionHeader title="PAYMENT OPTIONS" />
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { id: 'upi', name: 'Digital Payment (UPI)', desc: 'Instant via QR/App', icon: CreditCard },
                    { id: 'cash', name: 'Pay at Branch (Cash)', desc: 'Daladali / Main Branch', icon: Wallet }
                  ].map((method) => (
                    <label key={method.id} className="relative cursor-pointer group">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value={method.id} 
                        className="peer sr-only" 
                        checked={formData.paymentMethod === method.id}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      />
                      <div className="flex items-center gap-4 p-4 border-2 border-gray-50 rounded-2xl transition-all peer-checked:border-[#8B8B00] peer-checked:bg-[#8B8B00]/5 hover:bg-gray-50 group-active:scale-[0.98]">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100 transition-all peer-checked:bg-[#8B8B00] peer-checked:text-white">
                          <method.icon size={20} className="text-gray-400 peer-checked:text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] font-black uppercase text-gray-800 tracking-tight">{method.name}</p>
                          <p className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase tracking-wide">{method.desc}</p>
                        </div>
                        <div className="w-4 h-4 border-2 border-gray-200 rounded-full flex items-center justify-center peer-checked:border-[#8B8B00]">
                          <div className="w-2 h-2 bg-[#8B8B00] rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="bg-[#8B8B00]/5 border-2 border-[#8B8B00]/10 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                     <p className="text-[9px] font-black uppercase text-[#8B8B00] tracking-widest">Final Amount Due</p>
                     <p className="text-xl font-black text-[#8B8B00]">₹{formData.sport === 'football' ? '1,500' : '7,000'}</p>
                  </div>
                  <p className="text-[8px] font-bold text-gray-400 uppercase leading-tight italic">
                    I acknowledge that the information is true and I agree to abide by the rules.
                  </p>
                </div>
              </div>

              {/* Right Column: Signature */}
              <div className="w-full lg:w-96 shrink-0 space-y-4">
                <SectionHeader title="CANDIDATE SIGNATURE" />
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-[2/1] border-4 border-dashed border-gray-100 bg-gray-50 rounded-2xl flex flex-col items-center justify-center p-4 text-center group relative cursor-pointer hover:border-[#8B8B00] hover:bg-[#8B8B00]/5 transition-all shadow-inner overflow-hidden">
                    {signaturePreview ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img src={signaturePreview} alt="Signature" className="max-h-full max-w-full object-contain mix-blend-multiply" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <p className="text-[9px] font-black text-white uppercase tracking-widest">Click to Change</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center space-y-2">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <PenTool size={20} className="text-gray-300 group-hover:text-[#8B8B00] transition-colors" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Upload Signature</p>
                          <p className="text-[7px] text-gray-400 font-bold italic uppercase">PNG / JPG (MAX 2MB)</p>
                        </div>
                      </div>
                    )}
                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleSignatureUpload} accept="image/*" />
                  </div>
                  
                  <div className="mt-4 flex flex-col items-center space-y-1">
                    <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Authorized Verification</p>
                    <div className="h-0.5 w-32 bg-gray-100 rounded-full"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="pt-8 border-t-2 border-gray-50 flex justify-between items-center">
          {currentStep > 1 ? (
             <button 
                type="button" 
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="group flex items-center gap-3 border-2 border-gray-100 text-gray-400 px-8 py-3.5 rounded-xl font-black uppercase text-[10px] tracking-[0.25em] hover:bg-gray-50 transition-all active:scale-95"
             >
                <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
                Previous Step
             </button>
          ) : <div></div>}
          
          <button 
            type="button"
            onClick={() => currentStep === 4 ? handleSubmit() : setCurrentStep(prev => prev + 1)}
            className="group flex items-center gap-3 bg-[#8B8B00] text-white px-10 py-3.5 rounded-xl font-black uppercase text-[10px] tracking-[0.25em] hover:bg-[#7a7a00] transition-all shadow-xl shadow-yellow-900/20 hover:-translate-y-1 active:scale-95"
          >
            {currentStep === 4 ? 'Pay & Register' : 'Proceed to Next Step'}
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewAdmission;

