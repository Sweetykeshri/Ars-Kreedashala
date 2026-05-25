import React, { useState } from 'react';
import { 
  FileUp, 
  CheckCircle2, 
  Camera, 
  CreditCard, 
  Trash2, 
  Eye, 
  ShieldCheck 
} from 'lucide-react';

const DocumentVerification = () => {
  const [docs, setDocs] = useState({
    aadhaar: { file: null, preview: null, status: 'Empty' },
    photo: { file: null, preview: null, status: 'Empty' }
  });

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocs(prev => ({
          ...prev,
          [type]: { file: file, preview: reader.result, status: 'Uploaded' }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (type) => {
    setDocs(prev => ({
      ...prev,
      [type]: { file: null, preview: null, status: 'Empty' }
    }));
  };

  const DocCard = ({ title, type, icon: Icon, description }) => {
    const data = docs[type];
    
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md flex flex-col">
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="font-black text-gray-900 uppercase tracking-tight">{title}</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{description}</p>
              </div>
            </div>
            {data.status === 'Uploaded' && (
              <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                <CheckCircle2 size={14} />
                <span className="text-[10px] font-black uppercase tracking-wider">Ready</span>
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {data.preview ? (
              <div className="relative group aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                <img src={data.preview} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3 backdrop-blur-[2px]">
                  <button 
                    onClick={() => alert(`Launching full-screen secure preview for ${title}...`)}
                    className="p-2 bg-white rounded-full text-gray-900 hover:scale-110 transition-transform shadow-lg"
                  >
                    <Eye size={20} />
                  </button>
                  <button 
                    onClick={() => removeFile(type)}
                    className="p-2 bg-white rounded-full text-rose-600 hover:scale-110 transition-transform shadow-lg"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex-1 flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50/50 hover:bg-white hover:border-blue-200 transition-all cursor-pointer group">
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => handleFileUpload(e, type)}
                />
                <div className="p-4 bg-white rounded-full shadow-sm mb-4 text-gray-400 group-hover:text-blue-500 transition-colors">
                  <FileUp size={32} />
                </div>
                <p className="text-sm font-black text-gray-900 uppercase tracking-tight">Drop or Click to Upload</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 text-center">Supported formats: JPG, PNG, PDF (Max 2MB)</p>
              </label>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 mt-auto">
          {data.preview ? (
            <button 
              onClick={() => alert(`Replacing ${title}...`)}
              className="w-full py-2 bg-white border border-gray-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-gray-100 transition-all"
            >
              Change Document
            </button>
          ) : (
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center italic">
              Awaiting verification dossier...
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
        <div>
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter flex items-center gap-3">
            <ShieldCheck className="text-blue-600" size={42} />
            Dossier <span className="text-blue-600">Verification</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Document Integrity & Student Identity Management</p>
        </div>
        <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          <div className="px-5 py-2 text-center text-blue-600 border-r border-gray-100">
            <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Total</p>
            <p className="text-xl font-black leading-none italic">02</p>
          </div>
          <div className="px-5 py-2 text-center text-emerald-500">
            <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Required</p>
            <p className="text-xl font-black leading-none italic">02</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DocCard 
          title="Aadhaar Card" 
          type="aadhaar" 
          icon={CreditCard} 
          description="National Identity Dossier (Front & Back)" 
        />
        <DocCard 
          title="Passport Photo" 
          type="photo" 
          icon={Camera} 
          description="Biometric Recognition Image" 
        />
      </div>

      <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-100 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 -mr-20 -mt-20 rounded-full blur-3xl transition-transform group-hover:scale-125"></div>
        <div className="relative">
          <h3 className="text-xl font-black uppercase tracking-tight">Finalize Verification</h3>
          <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mt-1">Submit uploaded dossiers for administrative audit</p>
        </div>
        <button 
          onClick={() => {
            if (docs.aadhaar.file && docs.photo.file) {
              alert('Dossiers dispatched for encrypted audit. ETA: 2-4 Hours.');
            } else {
              alert('Critical Block: Ensure all dossiers are uploaded before dispatch.');
            }
          }}
          className="relative px-8 py-3 bg-white text-blue-600 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-50 transition-all shadow-lg hover:-translate-y-1 active:translate-y-0"
        >
          Dispatch Dossiers
        </button>
      </div>
    </div>
  );
};

export default DocumentVerification;
