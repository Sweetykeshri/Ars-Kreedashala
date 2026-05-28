import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Award,
  Calendar,
  ChevronLeft,
  Download,
  Eye,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserCircle,
} from 'lucide-react';
import { getCoachProfileById } from './coachData';

const CoachDetails = () => {
  const navigate = useNavigate();
  const { coachId } = useParams();
  const coach = getCoachProfileById(coachId);

  if (!coach) {
    return (
      <div className="rounded-4xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">Coach not found</h1>
        <p className="mt-2 text-sm text-gray-500">The selected coach profile could not be found.</p>
        <button
          type="button"
          onClick={() => navigate('/coach/profiles')}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-blue-100 transition-all hover:bg-blue-700"
        >
          <ChevronLeft size={16} /> Back to Profiles
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-4 border-b border-gray-100 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Coach Details</p>
          <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-gray-900">Receipt Style Profile</h1>
          <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-400">Separate page inside the dashboard layout</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/coach/profiles')}
          className="inline-flex items-center gap-2 rounded-2xl border border-gray-100 bg-white px-5 py-3 text-xs font-black uppercase tracking-widest text-gray-600 shadow-sm transition-all hover:bg-gray-50"
        >
          <ChevronLeft size={16} /> Back to Profiles
        </button>
      </div>

      <div className="overflow-hidden rounded-4xl border border-gray-100 bg-white shadow-sm">
        <div className="grid grid-cols-1 gap-6 bg-linear-to-br from-slate-50 via-white to-blue-50/60 p-5 md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] md:p-6 lg:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-4xl bg-linear-to-br from-blue-600 to-blue-700 text-3xl font-black text-white shadow-xl shadow-blue-200">
              {coach.image}
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Coach Profile</p>
                <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-gray-900 sm:text-3xl">{coach.name}</h2>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-400">{coach.id} • {coach.role}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${coach.statusDetail === 'On Leave' ? 'border-amber-200 bg-amber-50 text-amber-600' : 'border-emerald-200 bg-emerald-50 text-emerald-600'}`}>
                  {coach.statusDetail}
                </span>
                <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">
                  {coach.assignedBatches.length} Assigned Batches
                </span>
                <span className="inline-flex rounded-full border border-gray-100 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                  {coach.license}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-2 xl:grid-cols-4">
            <MiniStat label="Experience" value={coach.experience} icon={<Award size={16} />} />
            <MiniStat label="Status" value={coach.statusDetail} icon={<ShieldCheck size={16} />} />
            <MiniStat label="Batches" value={`${coach.assignedBatches.length}`} icon={<Calendar size={16} />} />
            <MiniStat label="Docs" value={`${coach.documents.length} Files`} icon={<Download size={16} />} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <div className="space-y-6">
          <SectionCard title="Personal Details" icon={<UserCircle size={16} />}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DetailRow label="Coach Name" value={coach.name} />
              <DetailRow label="Date of Birth" value={coach.personal.dob} />
              <DetailRow label="Contact Number" value={coach.phone} />
              <DetailRow label="WhatsApp" value={coach.whatsapp} />
              <DetailRow label="Aadhaar Number" value={coach.aadhaarNumber} span={2} />
            </div>
          </SectionCard>

          <SectionCard title="Contact Details" icon={<Mail size={16} />}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DetailRow label="Email" value={coach.email} />
              <DetailRow label="Address" value={coach.contact.address} span={2} />
              <DetailRow label="City" value={coach.contact.city} />
              <DetailRow label="State / PIN" value={`${coach.contact.state} - ${coach.contact.pinCode}`} />
            </div>
          </SectionCard>

          <SectionCard title="Professional Details" icon={<Award size={16} />}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DetailRow label="Sport / Specialization" value={coach.specialty} />
              <DetailRow label="Experience" value={coach.experience} />
              <DetailRow label="License" value={coach.license} />
              <DetailRow label="Current Role" value={coach.role} />
            </div>
          </SectionCard>

          <SectionCard title="Assigned Batches" icon={<Calendar size={16} />}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {coach.assignedBatches.map((batch) => (
                <div key={batch} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <p className="text-sm font-black uppercase text-gray-900">{batch}</p>
                  <p className="mt-1 text-xs font-semibold text-gray-500">Batch assignment record</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Documents" icon={<Download size={16} />}>
            <div className="grid grid-cols-1 gap-3">
              {coach.documents.map((doc) => (
                <div key={doc} className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Document Name</p>
                    <p className="mt-1 truncate text-sm font-bold text-gray-900">{doc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => alert(`Viewing ${doc}`)}
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-gray-600 transition-all hover:bg-gray-100"
                    >
                      <Eye size={14} /> View
                    </button>
                    <button
                      type="button"
                      onClick={() => alert(`Downloading ${doc}`)}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-100 transition-all hover:bg-blue-700"
                    >
                      <Download size={14} /> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Status" icon={<ShieldCheck size={16} />}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DetailRow label="Current Status" value={coach.statusDetail} />
              <DetailRow label="Profile Type" value="Active Coach File" />
            </div>
          </SectionCard>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[1.75rem] bg-linear-to-br from-blue-600 to-blue-700 p-6 text-white shadow-xl shadow-blue-200">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-100">Summary</p>
            <h3 className="mt-2 text-2xl font-black uppercase tracking-tight">{coach.role}</h3>
            <p className="mt-2 text-sm font-medium text-blue-100/90">{coach.specialty} • {coach.experience}</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-2"><Calendar size={16} /> {coach.personal.dob}</div>
              <div className="flex items-center gap-2"><Phone size={16} /> {coach.phone}</div>
              <div className="flex items-center gap-2"><Mail size={16} /> {coach.email}</div>
              <div className="flex items-center gap-2"><MapPin size={16} /> {coach.contact.city}, {coach.contact.state}</div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-50 p-2">
                <ShieldCheck className="text-emerald-600" size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Profile Status</p>
                <p className="text-sm font-black uppercase text-gray-900">Ready for records</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              This coach details page stays inside the dashboard layout, with the sidebar and header remaining visible.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

const SectionCard = ({ title, icon, children }) => (
  <section className="rounded-[1.75rem] border border-gray-100 bg-gray-50/70 p-5 shadow-sm">
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-blue-50 p-2 text-blue-600 shadow-sm">{icon}</div>
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">{title}</p>
    </div>
    <div className="mt-4">{children}</div>
  </section>
);

const MiniStat = ({ label, value, icon }) => (
  <div className="rounded-2xl border border-white/70 bg-white/80 p-3 shadow-sm backdrop-blur-sm">
    <div className="flex items-center gap-2 text-gray-400">
      {icon}
      <p className="text-[10px] font-black uppercase tracking-widest">{label}</p>
    </div>
    <p className="mt-2 text-sm font-black leading-tight text-gray-900 uppercase">{value}</p>
  </div>
);

const DetailRow = ({ label, value, span = 1 }) => (
  <div className={span > 1 ? 'rounded-2xl bg-white p-4 sm:col-span-2' : 'rounded-2xl bg-white p-4'}>
    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{label}</p>
    <p className="mt-1 text-sm font-semibold text-gray-900">{value}</p>
  </div>
);

export default CoachDetails;