import React, { useMemo, useState } from "react";
import { Shield, Plus, Search, MoreHorizontal, UserCog, ShieldCheck, UserCheck, X } from "lucide-react";
import { SettingsHeader } from "../../components/settings/SettingsShared";

const initialRoles = [
  { id: "R-ADMIN", name: "Super Admin", desc: "Full system access", users: 2, level: "LEVEL 10", status: "ACTIVE" },
  { id: "R-HEAD", name: "Head Coach", desc: "Training and batch control", users: 4, level: "LEVEL 07", status: "ACTIVE" },
  { id: "R-FIN", name: "Finance Officer", desc: "Fee and finance access", users: 3, level: "LEVEL 06", status: "ACTIVE" },
  { id: "R-SEC", name: "Security Ops", desc: "Attendance and facility access", users: 5, level: "LEVEL 04", status: "INACTIVE" },
];

const emptyRole = { id: "", name: "", desc: "", users: 0, level: "LEVEL 01", status: "ACTIVE" };

const UserRoles = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [search, setSearch] = useState("");
  const [menuId, setMenuId] = useState(null);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyRole);

  const filteredRoles = useMemo(() => {
    const q = search.toLowerCase();
    return roles.filter(r =>
      [r.id, r.name, r.desc, r.level, r.status].join(" ").toLowerCase().includes(q)
    );
  }, [roles, search]);

  const openAdd = () => {
    setForm({ ...emptyRole, id: `R-${Date.now().toString().slice(-4)}` });
    setModal("role");
  };

  const openEdit = (role) => {
    setForm(role);
    setMenuId(null);
    setModal("role");
  };

  const saveRole = () => {
    if (!form.name.trim()) return alert("Role name is required");

    setRoles(prev => {
      const exists = prev.some(r => r.id === form.id);
      return exists ? prev.map(r => (r.id === form.id ? form : r)) : [...prev, form];
    });

    setModal(null);
  };

  const toggleStatus = (role) => {
    setRoles(prev =>
      prev.map(r =>
        r.id === role.id
          ? { ...r, status: r.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
          : r
      )
    );
    setMenuId(null);
  };

  const deleteRole = (id) => {
    if (!window.confirm("Delete this role?")) return;
    setRoles(prev => prev.filter(r => r.id !== id));
    setMenuId(null);
  };

  const stats = {
    total: roles.length,
    active: roles.filter(r => r.status === "ACTIVE").length,
    users: roles.reduce((sum, r) => sum + Number(r.users || 0), 0),
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <SettingsHeader
        title="User Roles"
        subtitle="Manage user access, role permissions and admin hierarchy"
        icon={Shield}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Stat label="Total Roles" value={stats.total} />
        <Stat label="Active Roles" value={stats.active} color="text-emerald-600" />
        <Stat label="Assigned Users" value={stats.users} color="text-blue-600" />
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roles..."
            className="w-full pl-11 pr-4 py-3 bg-gray-50 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-xl font-black text-xs uppercase hover:bg-black"
        >
          <Plus size={16} /> New Role
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredRoles.map(role => (
          <div key={role.id} className="bg-white border border-gray-100 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-md transition relative">
            <div className="flex items-start justify-between gap-3 mb-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <UserCog size={24} />
                </div>

                <div>
                  <h3 className="font-black text-gray-900 uppercase">{role.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-[10px] font-black text-gray-400">{role.id}</span>
                    <span className={`px-2 py-1 rounded-lg text-[9px] font-black ${
                      role.status === "ACTIVE"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                    }`}>
                      {role.status}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMenuId(menuId === role.id ? null : role.id)}
                className="p-2 rounded-xl hover:bg-gray-100"
              >
                <MoreHorizontal size={20} />
              </button>

              {menuId === role.id && (
                <div className="absolute right-5 top-16 z-20 w-44 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden">
                  <MenuBtn onClick={() => openEdit(role)}>Edit Role</MenuBtn>
                  <MenuBtn onClick={() => toggleStatus(role)}>
                    {role.status === "ACTIVE" ? "Deactivate" : "Activate"}
                  </MenuBtn>
                  <MenuBtn danger onClick={() => deleteRole(role.id)}>Delete</MenuBtn>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-500 font-semibold mb-5">{role.desc}</p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <Info icon={ShieldCheck} label="Clearance" value={role.level} />
              <Info icon={UserCheck} label="Users" value={`${role.users} Users`} />
            </div>

            <button
              type="button"
              onClick={() => {
                setForm(role);
                setModal("access");
              }}
              className="w-full py-3 rounded-xl bg-blue-50 text-blue-600 font-black text-xs uppercase hover:bg-blue-600 hover:text-white transition"
            >
              Modify Access
            </button>
          </div>
        ))}
      </div>

      {modal === "role" && (
        <Modal title="Role Details" onClose={() => setModal(null)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Role ID" value={form.id} onChange={(v) => setForm({ ...form, id: v })} />
            <Input label="Role Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Input label="Level" value={form.level} onChange={(v) => setForm({ ...form, level: v })} />
            <Input label="Users" type="number" value={form.users} onChange={(v) => setForm({ ...form, users: v })} />
            <label className="sm:col-span-2">
              <span className="text-xs font-bold text-gray-500">Description</span>
              <textarea
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                className="mt-1 w-full rounded-xl bg-gray-50 p-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>

          <button onClick={saveRole} className="mt-4 w-full py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase">
            Save Role
          </button>
        </Modal>
      )}

      {modal === "access" && (
        <Modal title={`Access Permissions - ${form.name}`} onClose={() => setModal(null)}>
          {["Dashboard", "Admission", "Batch & Training", "Attendance", "Fee Management", "Reports", "Settings"].map(item => (
            <label key={item} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 mb-2">
              <span className="font-bold text-sm text-gray-700">{item}</span>
              <input type="checkbox" defaultChecked className="h-5 w-5 accent-blue-600" />
            </label>
          ))}

          <button onClick={() => setModal(null)} className="mt-4 w-full py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase">
            Save Access
          </button>
        </Modal>
      )}
    </div>
  );
};

const Stat = ({ label, value, color = "text-gray-900" }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
    <p className={`text-3xl font-black mt-1 ${color}`}>{value}</p>
  </div>
);

const Info = ({ icon: Icon, label, value }) => (
  <div className="bg-gray-50 p-4 rounded-2xl">
    <p className="text-[9px] font-black text-gray-400 uppercase">{label}</p>
    <div className="flex items-center gap-2 mt-1">
      <Icon size={14} className="text-blue-600" />
      <span className="text-xs font-black text-gray-900">{value}</span>
    </div>
  </div>
);

const MenuBtn = ({ children, onClick, danger }) => (
  <button
    type="button"
    onClick={onClick}
    className={`block w-full text-left px-4 py-3 text-xs font-bold hover:bg-gray-50 ${
      danger ? "text-red-600" : "text-gray-700"
    }`}
  >
    {children}
  </button>
);

const Input = ({ label, value, onChange, type = "text" }) => (
  <label>
    <span className="text-xs font-bold text-gray-500">{label}</span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 w-full rounded-xl bg-gray-50 p-3 outline-none focus:ring-2 focus:ring-blue-500"
    />
  </label>
);

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/40 p-4 flex items-center justify-center">
    <div className="bg-white w-full max-w-xl rounded-3xl p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-black text-gray-900">{title}</h3>
        <button type="button" onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100">
          <X size={20} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default UserRoles;