const STORAGE_KEY = 'ars_admissions';

export const admissionService = {
  getAdmissions: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  addAdmission: (admissionData) => {
    const admissions = admissionService.getAdmissions();
    const newAdmission = {
      ...admissionData,
      id: Date.now(),
      status: 'Pending',
      submittedAt: new Date().toISOString(),
    };
    admissions.push(newAdmission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(admissions));
    return newAdmission;
  },

  updateStatus: (id, status) => {
    const admissions = admissionService.getAdmissions();
    const updated = admissions.map(a => 
      a.id === id ? { ...a, status } : a
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  deleteAdmission: (id) => {
    const admissions = admissionService.getAdmissions();
    const updated = admissions.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
};
