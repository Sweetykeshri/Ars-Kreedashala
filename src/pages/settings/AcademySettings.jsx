import React, { useRef, useState } from "react";
import {
  Globe,
  Camera,
  Building,
  Mail,
  Phone,
  MapPin,
  Trophy,
  Clock,
  Share2,
  Save,
  RotateCcw,
  Eye,
  X,
  CheckCircle,
} from "lucide-react";

const defaultData = {
  name: "Ars Kreedashala",
  email: "admin@ars-academy.com",
  phone: "+91 11 2345 6789",
  address: "128/A Operational Sector, North Stadium Block, New Delhi - 110001",
  timing: "05:00 AM - 09:00 PM",
  instagram: "",
  twitter: "",
  facebook: "",
  linkedin: "",
};

const AcademySettings = () => {
  const fileRef = useRef(null);
  const [form, setForm] = useState(defaultData);
  const [logo, setLogo] = useState("");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(false);

  const showMsg = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const uploadLogo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogo(URL.createObjectURL(file));
    showMsg("Logo uploaded successfully.");
  };

  const saveSettings = () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      showMsg("Please fill academy name, email and phone.");
      return;
    }

    console.log("Saved Academy Settings:", form);
    showMsg("Academy settings updated successfully.");
  };

  const resetSettings = () => {
    setForm(defaultData);
    setLogo("");
    showMsg("Settings reset successfully.");
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-gray-50 p-3 pb-10 sm:p-5 md:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1500px] space-y-5">
        <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:h-12 sm:w-12">
                <Globe size={24} />
              </div>

              <div className="min-w-0">
                <h1 className="break-words text-xl font-black uppercase text-gray-900 sm:text-2xl">
                  Academy Settings
                </h1>
                <p className="mt-1 text-xs font-semibold text-gray-500 sm:text-sm">
                  Manage academy branding, contact details and public profile.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={saveSettings}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-black uppercase text-white hover:bg-blue-700 sm:w-auto"
            >
              <Save size={15} />
              Update Settings
            </button>
          </div>
        </div>

        {message && (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
            <span>{message}</span>
            <button type="button" onClick={() => setMessage("")}>
              <X size={16} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="min-w-0 space-y-5">
            <div className="rounded-3xl border border-gray-100 bg-white p-4 text-center shadow-sm sm:p-5 md:p-6">
              <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
                  {logo ? (
                    <img
                      src={logo}
                      alt="Academy Logo"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Trophy size={44} className="text-gray-300" />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="absolute bottom-0 right-0 rounded-2xl bg-blue-600 p-3 text-white shadow hover:bg-blue-700"
                >
                  <Camera size={18} />
                </button>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={uploadLogo}
                  className="hidden"
                />
              </div>

              <h3 className="mt-5 break-words text-base font-black uppercase text-gray-900 sm:text-lg">
                {form.name}
              </h3>

              <p className="mt-1 text-xs font-bold text-blue-600">
                Operational ID: ARS-HQ-01
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <InfoMini
                  label="Status"
                  value="Live"
                  icon={<CheckCircle size={13} />}
                  green
                />
                <InfoMini label="Scale" value="4 Sectors" />
              </div>
            </div>

            <div className="rounded-3xl bg-gray-900 p-5 text-white">
              <p className="text-xs font-black uppercase">Public Integrity</p>
              <p className="mt-2 text-xs leading-relaxed text-gray-400">
                This information is synced with student and guardian dashboards.
              </p>
            </div>
          </aside>

          <main className="min-w-0 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:p-8">
            <div className="mb-6 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <h3 className="font-black uppercase text-gray-900">
                Academy Profile
              </h3>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <ActionButton
                  onClick={() => setPreview(true)}
                  icon={<Eye size={15} />}
                  text="Preview"
                />
                <ActionButton
                  onClick={resetSettings}
                  icon={<RotateCcw size={15} />}
                  text="Reset"
                  gray
                />
                <ActionButton
                  onClick={saveSettings}
                  icon={<Save size={15} />}
                  text="Update"
                  blue
                />
              </div>
            </div>

            <Section title="Core Identity" />
            <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                icon={Building}
                label="Academy Name"
                value={form.name}
                onChange={(v) => update("name", v)}
              />
              <Input
                icon={Mail}
                label="Email"
                value={form.email}
                onChange={(v) => update("email", v)}
              />
            </div>

            <Section title="Contact Details" />
            <div className="mb-7 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                icon={Phone}
                label="Phone"
                value={form.phone}
                onChange={(v) => update("phone", v)}
              />
              <Input
                icon={Clock}
                label="Timing"
                value={form.timing}
                onChange={(v) => update("timing", v)}
              />
              <TextArea
                icon={MapPin}
                label="Address"
                value={form.address}
                onChange={(v) => update("address", v)}
              />
            </div>

            <Section title="Social Links" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {["instagram", "twitter", "facebook", "linkedin"].map((key) => (
                <Input
                  key={key}
                  icon={Share2}
                  label={key}
                  value={form[key]}
                  onChange={(v) => update(key, v)}
                  placeholder={`@ars_${key}`}
                />
              ))}
            </div>
          </main>
        </div>
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-5">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="font-black text-gray-900">Academy Preview</h3>
              <button
                type="button"
                onClick={() => setPreview(false)}
                className="rounded-xl p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <PreviewRow label="Name" value={form.name} />
              <PreviewRow label="Email" value={form.email} />
              <PreviewRow label="Phone" value={form.phone} />
              <PreviewRow label="Timing" value={form.timing} />
              <PreviewRow label="Address" value={form.address} />
            </div>

            <button
              type="button"
              onClick={() => setPreview(false)}
              className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-xs font-black uppercase text-white hover:bg-blue-700"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Section = ({ title }) => (
  <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-blue-600">
    {title}
  </h4>
);

const ActionButton = ({ icon, text, onClick, blue, gray }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl px-4 text-xs font-black uppercase ${
      blue
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : gray
        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
        : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
    }`}
  >
    {icon}
    {text}
  </button>
);

const Input = ({ icon: Icon, label, value, onChange, placeholder = "" }) => (
  <label className="block min-w-0 space-y-2">
    <span className="text-[10px] font-black uppercase text-gray-400">
      {label}
    </span>

    <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 focus-within:border-blue-600">
      <Icon size={16} className="shrink-0 text-gray-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm font-bold text-gray-900 outline-none"
      />
    </div>
  </label>
);

const TextArea = ({ icon: Icon, label, value, onChange }) => (
  <label className="block min-w-0 space-y-2 md:col-span-2">
    <span className="text-[10px] font-black uppercase text-gray-400">
      {label}
    </span>

    <div className="flex min-w-0 items-start gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 focus-within:border-blue-600">
      <Icon size={16} className="mt-1 shrink-0 text-gray-400" />
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[90px] min-w-0 flex-1 resize-none bg-transparent text-sm font-bold text-gray-900 outline-none"
      />
    </div>
  </label>
);

const InfoMini = ({ label, value, icon, green }) => (
  <div className="rounded-2xl bg-gray-50 p-3 text-left sm:p-4">
    <p className="text-[10px] font-black uppercase text-gray-400">{label}</p>
    <p
      className={`mt-1 flex items-center gap-1 text-xs font-black ${
        green ? "text-emerald-600" : "text-gray-900"
      }`}
    >
      {icon}
      {value}
    </p>
  </div>
);

const PreviewRow = ({ label, value }) => (
  <div className="rounded-2xl bg-gray-50 p-4">
    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </p>
    <p className="mt-1 break-words text-sm font-bold text-gray-900">{value}</p>
  </div>
);

export default AcademySettings;