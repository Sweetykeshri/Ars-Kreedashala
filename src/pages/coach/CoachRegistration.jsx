import React, { useState } from 'react';
import {
  Camera,
  ClipboardList,
  Globe,
  MapPin,
  Phone,
  ShieldCheck,
  Trophy,
  UserPlus,
} from 'lucide-react';

const sports = ['Cricket', 'Football', 'Tennis', 'Badminton', 'Fitness'];
const coachTypes = ['Full-Time', 'Part-Time', 'Visiting', 'Contract'];
const qualificationOptions = ['Diploma', 'B.P.Ed', 'M.P.Ed', 'NIS', 'Other'];
const availabilityOptions = ['Available', 'Limited', 'Busy', 'On Leave'];
const employmentTypes = ['Permanent', 'Contract', 'Visiting', 'Seasonal'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const CoachRegistration = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [aadhaarDigits, setAadhaarDigits] = useState(Array(12).fill(''));
  const [formData, setFormData] = useState({
    coachName: '',
    coachId: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    phoneNumber: '',
    whatsappNumber: '',
    emailId: '',
    fullAddress: '',
    city: '',
    state: '',
    pinCode: '',
    emergencyContact: '',
    specialization: '',
    coachType: '',
    experience: '',
    qualification: '',
    certifications: '',
    previousAcademy: '',
    achievements: '',
    languagesKnown: '',
    joiningDate: '',
    availabilityStatus: '',
    workingDays: '',
    workingTime: '',
    employmentType: '',
    branchLocation: '',
    // Step 3: Batch Assignment
    assignedSport: '',
    assignedBatch: '',
    trainingSchedule: '',
    groundAssigned: '',
    maxStudentsCapacity: '',
    // Step 3: Salary / Payment
    monthlySalary: '',
    paymentMode: '',
    bankAccountNumber: '',
    ifscCode: '',
    upiId: '',
    // Step 4: Documents (File objects)
    aadhaarFile: null,
    panFile: null,
    qualificationFile: null,
    sportsCertificateFile: null,
    experienceCertificateFile: null,
    policeVerificationFile: null,
    medicalFitnessFile: null,
    resumeFile: null,
    // Step 4: Status & Notes
    verificationStatus: '',
    coachStatus: '',
    adminRemark: '',
    certificationsNotes: '',
  });

  const handleFieldChange = (field) => (event) => {
    setFormData((previous) => ({
      ...previous,
      [field]: event.target.value,
    }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleAadhaarChange = (index, value) => {
    if (value && !/^[0-9]$/.test(value)) {
      return;
    }

    setAadhaarDigits((previous) => {
      const next = [...previous];
      next[index] = value;
      return next;
    });
  };

  const handleDocumentUpload = (field) => (event) => {
    const file = event.target.files?.[0] || null;
    setFormData((previous) => ({
      ...previous,
      [field]: file,
    }));
  };

  const goToPreviousStep = () => {
    setCurrentStep((previous) => Math.max(1, previous - 1));
  };

  const goToNextStep = () => {
    setCurrentStep((previous) => Math.min(4, previous + 1));
  };

  const SectionHeader = ({ title }) => (
    <div className="relative mb-5">
      <div className="inline-block -skew-x-12 bg-[#8B8B00] px-6 py-1.5 text-white shadow-sm">
        <h3 className="skew-x-12 text-sm font-black uppercase tracking-wider">{title}</h3>
      </div>
      <div className="h-0.5 w-full bg-[#8B8B00] opacity-20" />
    </div>
  );

  const FieldShell = ({ label, required = false, children, className = '' }) => (
    <div className={`space-y-2 ${className}`}>
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-600">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      {children}
    </div>
  );

  const renderStepIndicator = () => (
    <div className="mb-5 flex justify-center">
      <div className="flex items-center gap-3">
        {[1, 2, 3, 4].map((step, index) => (
          <React.Fragment key={step}>
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black shadow-md transition-all duration-300 ${step === currentStep ? 'bg-[#8B8B00] text-white' : step < currentStep ? 'bg-[#c9c36b] text-white' : 'border-2 border-gray-100 bg-gray-50 text-gray-300'}`}>
              {step}
            </div>
            {index < 3 ? <div className={`h-0.5 w-12 rounded-full sm:w-16 ${step < currentStep ? 'bg-[#8B8B00]' : 'bg-gray-100'}`} /> : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const StepOne = () => (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      <div className="space-y-5 rounded-4xl border border-gray-100 bg-gray-50/40 p-4 sm:p-5">
        <SectionHeader title="Personal Information" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FieldShell label="Coach Name" required>
            <input type="text" value={formData.coachName} onChange={handleFieldChange('coachName')} placeholder="Enter coach's full name" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold uppercase tracking-tight outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
          </FieldShell>

          <FieldShell label="Coach ID">
            <input type="text" value={formData.coachId} onChange={handleFieldChange('coachId')} placeholder="C-205" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold uppercase tracking-tight outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
          </FieldShell>

          <FieldShell label="Date of Birth" required>
            <input type="date" value={formData.dob} onChange={handleFieldChange('dob')} className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold uppercase tracking-tight outline-none transition focus:border-[#8B8B00]" />
          </FieldShell>

          <FieldShell label="Gender" required>
            <div className="flex flex-wrap gap-4 pt-1 text-[10px] font-black uppercase tracking-wider text-gray-600">
              {['Male', 'Female', 'Other'].map((gender) => (
                <label key={gender} className="flex cursor-pointer items-center gap-2">
                  <input type="radio" name="gender" value={gender} checked={formData.gender === gender} onChange={handleFieldChange('gender')} className="h-4 w-4 accent-[#8B8B00]" />
                  <span>{gender}</span>
                </label>
              ))}
            </div>
          </FieldShell>

          <FieldShell label="Blood Group">
            <select value={formData.bloodGroup} onChange={handleFieldChange('bloodGroup')} className="w-full border-b-2 border-gray-100 bg-transparent py-1 text-sm font-bold uppercase tracking-tight outline-none transition focus:border-[#8B8B00]">
              <option value="">Select blood group</option>
              {bloodGroups.map((group) => <option key={group} value={group}>{group}</option>)}
            </select>
          </FieldShell>

          <FieldShell label="Aadhaar Number" required className="md:col-span-2">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {aadhaarDigits.map((digit, index) => (
                <input key={index} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={(event) => handleAadhaarChange(index, event.target.value)} className="h-8 w-6 rounded border-2 border-gray-50 text-center text-[10px] font-black outline-none transition focus:border-[#8B8B00] sm:h-9 sm:w-7" aria-label={`Aadhaar digit ${index + 1}`} />
              ))}
            </div>
          </FieldShell>
        </div>
      </div>

      <div className="space-y-5 rounded-4xl border border-gray-100 bg-gray-50/40 p-4 sm:p-5">
        <SectionHeader title="Contact Information" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FieldShell label="Phone Number" required>
            <div className="relative">
              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="tel" value={formData.phoneNumber} onChange={handleFieldChange('phoneNumber')} placeholder="+91 XXXXX XXXXX" className="w-full border-b-2 border-gray-100 py-1 pl-11 text-sm font-bold outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
            </div>
          </FieldShell>

          <FieldShell label="WhatsApp Number">
            <div className="relative">
              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="tel" value={formData.whatsappNumber} onChange={handleFieldChange('whatsappNumber')} placeholder="+91 XXXXX XXXXX" className="w-full border-b-2 border-gray-100 py-1 pl-11 text-sm font-bold outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
            </div>
          </FieldShell>

          <FieldShell label="Email ID">
            <input type="email" value={formData.emailId} onChange={handleFieldChange('emailId')} placeholder="coach@email.com" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold uppercase tracking-tight outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
          </FieldShell>

          <FieldShell label="Emergency Contact Number" required>
            <div className="relative">
              <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="tel" value={formData.emergencyContact} onChange={handleFieldChange('emergencyContact')} placeholder="Emergency contact" className="w-full border-b-2 border-gray-100 py-1 pl-11 text-sm font-bold outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
            </div>
          </FieldShell>

          <FieldShell label="Full Address" required className="md:col-span-2">
            <div className="relative">
              <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={formData.fullAddress} onChange={handleFieldChange('fullAddress')} placeholder="Full address" className="w-full border-b-2 border-gray-100 py-1 pl-11 text-sm font-bold outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
            </div>
          </FieldShell>

          <FieldShell label="City">
            <input type="text" value={formData.city} onChange={handleFieldChange('city')} placeholder="City" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold uppercase tracking-tight outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
          </FieldShell>

          <FieldShell label="State">
            <input type="text" value={formData.state} onChange={handleFieldChange('state')} placeholder="State" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold uppercase tracking-tight outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
          </FieldShell>

          <FieldShell label="PIN Code">
            <input type="text" inputMode="numeric" maxLength={6} value={formData.pinCode} onChange={handleFieldChange('pinCode')} placeholder="000000" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold uppercase tracking-tight outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
          </FieldShell>
        </div>
      </div>
    </div>
  );

  const StepTwo = () => (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.9fr)_minmax(280px,0.82fr)]">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-5 rounded-4xl border border-gray-100 bg-gray-50/40 p-4 sm:p-5">
          <SectionHeader title="Professional Details" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FieldShell label="Specialization / Sport" required>
              <select value={formData.specialization} onChange={handleFieldChange('specialization')} className="w-full border-b-2 border-gray-100 bg-transparent py-1 text-sm font-bold uppercase tracking-tight outline-none transition focus:border-[#8B8B00]">
                <option value="">Select sport</option>
                {sports.map((sport) => <option key={sport} value={sport}>{sport}</option>)}
              </select>
            </FieldShell>

            <FieldShell label="Coach Type" required>
              <select value={formData.coachType} onChange={handleFieldChange('coachType')} className="w-full border-b-2 border-gray-100 bg-transparent py-1 text-sm font-bold uppercase tracking-tight outline-none transition focus:border-[#8B8B00]">
                <option value="">Select type</option>
                {coachTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </FieldShell>

            <FieldShell label="Experience" required>
              <input type="text" value={formData.experience} onChange={handleFieldChange('experience')} placeholder="10 Years" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold uppercase tracking-tight outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
            </FieldShell>

            <FieldShell label="Qualification">
              <select value={formData.qualification} onChange={handleFieldChange('qualification')} className="w-full border-b-2 border-gray-100 bg-transparent py-1 text-sm font-bold uppercase tracking-tight outline-none transition focus:border-[#8B8B00]">
                <option value="">Select qualification</option>
                {qualificationOptions.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </FieldShell>

            <FieldShell label="Certifications">
              <input type="text" value={formData.certifications} onChange={handleFieldChange('certifications')} placeholder="Licenses, courses, certificates" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold uppercase tracking-tight outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
            </FieldShell>

            <FieldShell label="Previous Academy / Club">
              <input type="text" value={formData.previousAcademy} onChange={handleFieldChange('previousAcademy')} placeholder="Previous academy or club" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold uppercase tracking-tight outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
            </FieldShell>

            <FieldShell label="Achievements" className="md:col-span-2">
              <textarea rows="3" value={formData.achievements} onChange={handleFieldChange('achievements')} placeholder="Major achievements, medals, awards" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
            </FieldShell>

            <FieldShell label="Languages Known" className="md:col-span-2">
              <input type="text" value={formData.languagesKnown} onChange={handleFieldChange('languagesKnown')} placeholder="English, Hindi, Bengali" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
            </FieldShell>
          </div>
        </div>

        <div className="space-y-5 rounded-4xl border border-gray-100 bg-gray-50/40 p-4 sm:p-5">
          <SectionHeader title="Availability Details" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FieldShell label="Joining Date" required>
              <input type="date" value={formData.joiningDate} onChange={handleFieldChange('joiningDate')} className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold uppercase tracking-tight outline-none transition focus:border-[#8B8B00]" />
            </FieldShell>

            <FieldShell label="Availability Status" required>
              <select value={formData.availabilityStatus} onChange={handleFieldChange('availabilityStatus')} className="w-full border-b-2 border-gray-100 bg-transparent py-1 text-sm font-bold uppercase tracking-tight outline-none transition focus:border-[#8B8B00]">
                <option value="">Select status</option>
                {availabilityOptions.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </FieldShell>

            <FieldShell label="Working Days">
              <input type="text" value={formData.workingDays} onChange={handleFieldChange('workingDays')} placeholder="Mon, Wed, Fri" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold uppercase tracking-tight outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
            </FieldShell>

            <FieldShell label="Working Time">
              <input type="text" value={formData.workingTime} onChange={handleFieldChange('workingTime')} placeholder="06:00 AM - 08:00 AM" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold uppercase tracking-tight outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
            </FieldShell>

            <FieldShell label="Employment Type">
              <select value={formData.employmentType} onChange={handleFieldChange('employmentType')} className="w-full border-b-2 border-gray-100 bg-transparent py-1 text-sm font-bold uppercase tracking-tight outline-none transition focus:border-[#8B8B00]">
                <option value="">Select employment</option>
                {employmentTypes.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </FieldShell>

            <FieldShell label="Branch / Location" required>
              <div className="relative">
                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={formData.branchLocation} onChange={handleFieldChange('branchLocation')} placeholder="Branch or location" className="w-full border-b-2 border-gray-100 py-1 pl-11 text-sm font-bold outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
              </div>
            </FieldShell>
          </div>
        </div>
      </div>

      <aside className="space-y-4 border-t border-gray-100 pt-5 xl:border-l xl:border-t-0 xl:pt-0 xl:pl-6">
        <div>
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 xl:text-left">Passport Photo</p>
          <div className="mt-3 flex flex-col items-center gap-3 rounded-4xl border border-dashed border-gray-200 bg-gray-50/60 p-4">
            <div className="flex h-36 w-full items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-inner sm:h-40">
              {photoPreview ? (
                <img src={photoPreview} alt="Passport preview" className="h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-[#8B8B00] shadow-sm">
                    <Camera size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">Click to upload</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300">Passport style image</p>
                  </div>
                </div>
              )}
            </div>

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-[#8B8B00] px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-[#8B8B00]/20 transition hover:bg-[#7c7c00]">
              <Camera size={16} />
              Upload Photo
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
          </div>
        </div>
      </aside>
    </div>
  );

  const StepThree = () => (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(300px,0.9fr)]">
      <div className="rounded-4xl border border-gray-100 bg-gray-50/40 p-4 sm:p-5">
        <SectionHeader title="5. Batch Assignment" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FieldShell label="Assigned Sport" required>
            <select value={formData.assignedSport} onChange={handleFieldChange('assignedSport')} className="w-full border-b-2 border-gray-100 bg-transparent py-1 text-sm font-bold uppercase tracking-tight outline-none transition focus:border-[#8B8B00]">
              <option value="">Select sport</option>
              {sports.map((sport) => <option key={sport} value={sport}>{sport}</option>)}
            </select>
          </FieldShell>

          <FieldShell label="Assigned Batch" required>
            <input type="text" value={formData.assignedBatch} onChange={handleFieldChange('assignedBatch')} placeholder="Batch name or ID" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold uppercase tracking-tight outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
          </FieldShell>

          <FieldShell label="Training Schedule" required>
            <input type="text" value={formData.trainingSchedule} onChange={handleFieldChange('trainingSchedule')} placeholder="e.g., Mon/Wed/Fri 06:00-08:00" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
          </FieldShell>

          <FieldShell label="Ground / Court Assigned">
            <input type="text" value={formData.groundAssigned} onChange={handleFieldChange('groundAssigned')} placeholder="Ground or court name" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
          </FieldShell>

          <FieldShell label="Maximum Students Capacity">
            <input type="number" inputMode="numeric" value={formData.maxStudentsCapacity} onChange={handleFieldChange('maxStudentsCapacity')} placeholder="e.g., 20" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
          </FieldShell>
        </div>
      </div>

      <div className="rounded-4xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
        <SectionHeader title="6. Salary / Payment Details" />
        <div className="grid grid-cols-1 gap-4">
          <FieldShell label="Monthly Salary / Payment" required>
            <input type="number" inputMode="numeric" value={formData.monthlySalary} onChange={handleFieldChange('monthlySalary')} placeholder="Amount (monthly)" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
          </FieldShell>

          <FieldShell label="Payment Mode" required>
            <select value={formData.paymentMode} onChange={handleFieldChange('paymentMode')} className="w-full border-b-2 border-gray-100 bg-transparent py-1 text-sm font-bold uppercase tracking-tight outline-none transition focus:border-[#8B8B00]">
              <option value="">Select mode</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="UPI">UPI</option>
            </select>
          </FieldShell>

          <FieldShell label="Bank Account Number">
            <input type="text" inputMode="numeric" value={formData.bankAccountNumber} onChange={handleFieldChange('bankAccountNumber')} placeholder="Account number" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
          </FieldShell>

          <FieldShell label="IFSC Code">
            <input type="text" value={formData.ifscCode} onChange={handleFieldChange('ifscCode')} placeholder="IFSC" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold uppercase tracking-tight outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
          </FieldShell>

          <FieldShell label="UPI ID">
            <input type="text" value={formData.upiId} onChange={handleFieldChange('upiId')} placeholder="example@bank / example@upi" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
          </FieldShell>
        </div>
      </div>
    </div>
  );

  const StepFour = () => (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,0.9fr)]">
      <div className="rounded-4xl border border-gray-100 bg-gray-50/40 p-4 sm:p-5">
        <SectionHeader title="7. Documents" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FieldShell label="Aadhaar Card Upload">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-3 rounded-2xl bg-[#8B8B00] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-sm cursor-pointer">
                Upload
                <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleDocumentUpload('aadhaarFile')} />
              </label>
              <div className="text-sm text-gray-700">{formData.aadhaarFile ? formData.aadhaarFile.name : 'No file chosen'}</div>
            </div>
          </FieldShell>

          <FieldShell label="PAN Card Upload">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-3 rounded-2xl bg-[#8B8B00] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-sm cursor-pointer">
                Upload
                <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleDocumentUpload('panFile')} />
              </label>
              <div className="text-sm text-gray-700">{formData.panFile ? formData.panFile.name : 'No file chosen'}</div>
            </div>
          </FieldShell>

          <FieldShell label="Qualification Certificate">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-3 rounded-2xl bg-[#8B8B00] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-sm cursor-pointer">
                Upload
                <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleDocumentUpload('qualificationFile')} />
              </label>
              <div className="text-sm text-gray-700">{formData.qualificationFile ? formData.qualificationFile.name : 'No file chosen'}</div>
            </div>
          </FieldShell>

          <FieldShell label="Sports Certificate">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-3 rounded-2xl bg-[#8B8B00] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-sm cursor-pointer">
                Upload
                <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleDocumentUpload('sportsCertificateFile')} />
              </label>
              <div className="text-sm text-gray-700">{formData.sportsCertificateFile ? formData.sportsCertificateFile.name : 'No file chosen'}</div>
            </div>
          </FieldShell>

          <FieldShell label="Experience Certificate">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-3 rounded-2xl bg-[#8B8B00] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-sm cursor-pointer">
                Upload
                <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleDocumentUpload('experienceCertificateFile')} />
              </label>
              <div className="text-sm text-gray-700">{formData.experienceCertificateFile ? formData.experienceCertificateFile.name : 'No file chosen'}</div>
            </div>
          </FieldShell>

          <FieldShell label="Police Verification">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-3 rounded-2xl bg-[#8B8B00] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-sm cursor-pointer">
                Upload
                <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleDocumentUpload('policeVerificationFile')} />
              </label>
              <div className="text-sm text-gray-700">{formData.policeVerificationFile ? formData.policeVerificationFile.name : 'No file chosen'}</div>
            </div>
          </FieldShell>

          <FieldShell label="Medical Fitness Certificate">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-3 rounded-2xl bg-[#8B8B00] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-sm cursor-pointer">
                Upload
                <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleDocumentUpload('medicalFitnessFile')} />
              </label>
              <div className="text-sm text-gray-700">{formData.medicalFitnessFile ? formData.medicalFitnessFile.name : 'No file chosen'}</div>
            </div>
          </FieldShell>

          <FieldShell label="Resume / CV">
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-3 rounded-2xl bg-[#8B8B00] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-sm cursor-pointer">
                Upload
                <input type="file" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="hidden" onChange={handleDocumentUpload('resumeFile')} />
              </label>
              <div className="text-sm text-gray-700">{formData.resumeFile ? formData.resumeFile.name : 'No file chosen'}</div>
            </div>
          </FieldShell>
        </div>
      </div>

      <aside className="rounded-4xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8B8B00]">Upload Tips</p>
            <h3 className="mt-1 text-lg font-black text-gray-900">Documents checklist</h3>
          </div>
        </div>

        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          <li>- Prefer PDF or clear image scans</li>
          <li>- Max file size: keep below 5MB for faster uploads</li>
          <li>- Ensure file names are descriptive (e.g., Aadhaar_JohnDoe.pdf)</li>
        </ul>

        <div className="mt-5">
          <SectionHeader title="Status & Notes" />
          <div className="grid grid-cols-1 gap-3">
            <FieldShell label="Verification Status">
              <select value={formData.verificationStatus} onChange={handleFieldChange('verificationStatus')} className="w-full border-b-2 border-gray-100 bg-transparent py-1 text-sm font-bold outline-none transition focus:border-[#8B8B00]">
                <option value="">Select status</option>
                <option value="Pending">Pending</option>
                <option value="Verified">Verified</option>
                <option value="Rejected">Rejected</option>
              </select>
            </FieldShell>

            <FieldShell label="Coach Status" required>
              <select value={formData.coachStatus} onChange={handleFieldChange('coachStatus')} className="w-full border-b-2 border-gray-100 bg-transparent py-1 text-sm font-bold outline-none transition focus:border-[#8B8B00]">
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
                <option value="Probation">Probation</option>
              </select>
            </FieldShell>

            <FieldShell label="Admin Remark">
              <textarea rows="3" value={formData.adminRemark} onChange={handleFieldChange('adminRemark')} placeholder="Optional admin remarks" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
            </FieldShell>

            <FieldShell label="Certifications / Notes">
              <textarea rows="3" value={formData.certificationsNotes} onChange={handleFieldChange('certificationsNotes')} placeholder="Notes about certifications or other remarks" className="w-full border-b-2 border-gray-100 py-1 text-sm font-bold outline-none transition placeholder:text-gray-200 focus:border-[#8B8B00]" />
            </FieldShell>
          </div>
        </div>
      </aside>
    </div>
  );

  const renderStepContent = () => {
    if (currentStep === 1) return <StepOne />;
    if (currentStep === 2) return <StepTwo />;
    if (currentStep === 3) return <StepThree />;
    return <StepFour />;
  };

  return (
    <div className="w-full max-w-7xl mx-auto min-h-0 rounded-sm bg-white p-4 font-serif text-[#444] shadow-2xl md:p-5 lg:p-6">
      <div className="mb-5 flex flex-col gap-5 border-b-2 border-gray-100 pb-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-2 shadow-inner">
            <Trophy size={32} className="text-[#8B8B00]" />
          </div>
          <div>
            <h1 className="text-2xl font-black leading-none tracking-tighter text-gray-900">ARS KREED</h1>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Excellence in Sports</p>
          </div>
        </div>

        <div className="text-left md:text-right">
          <h2 className="text-xl font-black leading-none text-gray-900">ARS KREEDASHALA PRIVATE LIMITED</h2>
          <div className="mt-2 flex flex-col gap-1 text-[10px] font-bold uppercase text-gray-500 md:items-end">
            <span className="flex items-center gap-2 md:justify-end"><MapPin size={10} /> Daladali Chowk, Ranchi, Jharkhand</span>
            <span className="flex items-center gap-2 md:justify-end"><Phone size={10} /> +91 9205200015 | +91 9279708427</span>
            <span className="flex items-center gap-2 md:justify-end"><Globe size={10} /> www.arskreedashala.com</span>
          </div>
        </div>
      </div>

      <div className="relative mb-6 flex justify-center">
        <div className="-skew-x-12 bg-[#8B8B00] px-8 py-2.5 text-white shadow-lg sm:px-12">
          <h2 className="skew-x-12 text-sm font-black uppercase tracking-[0.25em] italic sm:text-base">Coach Registration Form</h2>
        </div>
      </div>

      {renderStepIndicator()}

      <div key={currentStep} className="space-y-6">
        {renderStepContent()}
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-between sm:gap-4">
        <button type="button" onClick={goToPreviousStep} disabled={currentStep === 1} className="rounded-2xl border border-gray-100 px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:min-w-36">
          Previous
        </button>
        <button type="button" onClick={goToNextStep} className="rounded-2xl bg-[#8B8B00] px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-[#8B8B00]/20 transition hover:bg-[#7c7c00] sm:min-w-36">
          {currentStep === 4 ? 'Register Coach' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default CoachRegistration;
