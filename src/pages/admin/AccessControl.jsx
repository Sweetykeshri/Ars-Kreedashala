import React, { useMemo, useState } from "react";
import {
  Lock,
  ShieldCheck,
  Key,
  Save,
  AlertTriangle,
  Eye,
  Edit3,
  Trash,
  CheckCircle2,
  Settings,
  ShieldHalf,
  RotateCcw,
  CheckSquare,
  XSquare,
} from "lucide-react";

const roles = ["SUPERUSER", "OPERATIONS", "FINANCE", "COACH"];

const baseModules = [
  { id: "ADM", name: "Admissions Panel" },
  { id: "TRA", name: "Training Operations" },
  { id: "FEE", name: "Treasury & Finance" },
  { id: "ATT", name: "Presence Hub" },
  { id: "STA", name: "Staffing HQ" },
];

const makePermissions = (role) =>
  baseModules.map((m) => ({
    ...m,
    view: true,
    create: role === "SUPERUSER" || role === "OPERATIONS",
    edit: role === "SUPERUSER" || role === "OPERATIONS",
    delete: role === "SUPERUSER",
    approve: role === "SUPERUSER" || (role === "OPERATIONS" && m.id !== "FEE"),
  }));

const defaultMatrix = Object.fromEntries(
  roles.map((role) => [role, makePermissions(role)])
);

const storageKey = "ars_access_control_matrix";

const AccessControl = () => {
  const [selectedRole, setSelectedRole] = useState("OPERATIONS");
  const [matrix, setMatrix] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || defaultMatrix;
    } catch {
      return defaultMatrix;
    }
  });
  const [message, setMessage] = useState("");

  const permissions = matrix[selectedRole] || [];

  const stats = useMemo(() => {
    const totalEnabled = permissions.reduce(
      (sum, item) =>
        sum +
        ["view", "create", "edit", "delete", "approve"].filter((p) => item[p])
          .length,
      0
    );

    return [
      { label: "Access Levels", value: roles.length, icon: Key },
      { label: "Enabled Rights", value: totalEnabled, icon: ShieldCheck },
      {
        label: "Delete Access",
        value: permissions.filter((p) => p.delete).length,
        icon: ShieldHalf,
      },
      { label: "Current Tier", value: selectedRole, icon: Settings },
    ];
  }, [permissions, selectedRole]);

  const updateRolePermissions = (nextPermissions) => {
    setMatrix((prev) => ({
      ...prev,
      [selectedRole]: nextPermissions,
    }));
  };

  const togglePermission = (moduleId, field) => {
    updateRolePermissions(
      permissions.map((item) =>
        item.id === moduleId ? { ...item, [field]: !item[field] } : item
      )
    );
  };

  const setAllPermissions = (value) => {
    updateRolePermissions(
      permissions.map((item) => ({
        ...item,
        view: value,
        create: value,
        edit: value,
        delete: value,
        approve: value,
      }))
    );
  };

  const resetRole = () => {
    updateRolePermissions(makePermissions(selectedRole));
    setMessage(`${selectedRole} permissions reset to default.`);
  };

  const deployProtocols = () => {
    localStorage.setItem(storageKey, JSON.stringify(matrix));
    setMessage(`${selectedRole} security protocols deployed successfully.`);
  };

  return (
    <div className="w-full max-w-full space-y-6 overflow-hidden p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-900 text-white">
            <Lock size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black uppercase text-gray-900 sm:text-2xl">
              Security Protocols
            </h1>
            <p className="mt-1 text-sm font-medium text-gray-500">
              Manage access levels and module permissions.
            </p>
          </div>
        </div>

        <button
          onClick={deployProtocols}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 text-xs font-black uppercase tracking-widest text-white hover:bg-black sm:w-auto"
        >
          <Save size={16} />
          Deploy Protocols
        </button>
      </div>

      {message && (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-xs font-black uppercase tracking-widest text-emerald-700">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                <Icon size={20} />
              </div>
              <span className="rounded-full bg-gray-50 px-2 py-1 text-[10px] font-black uppercase text-gray-500">
                Live
              </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              {label}
            </p>
            <h3 className="mt-1 text-2xl font-black text-gray-900">{value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <div className="space-y-4 xl:col-span-1">
          <div className="rounded-[2rem] border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="mb-5 text-[10px] font-black uppercase tracking-widest text-gray-400">
              Execution Tiers
            </h3>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-1">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`rounded-2xl border px-5 py-4 text-left text-[10px] font-black uppercase tracking-wider transition-all ${
                    selectedRole === role
                      ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-100"
                      : "border-gray-100 bg-white text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {role} Profile
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-emerald-600 p-6 text-white shadow-lg shadow-emerald-100">
            <CheckCircle2 size={30} />
            <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-emerald-100">
              Protocol Status
            </p>
            <h4 className="mt-1 text-lg font-black uppercase">
              Clearance Level: Alpha-2
            </h4>
          </div>
        </div>

        <div className="space-y-5 xl:col-span-3">
          <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-100 bg-gray-50/40 p-4 lg:flex-row lg:items-center lg:justify-between lg:p-6">
              <div>
                <h3 className="text-sm font-black uppercase text-gray-900">
                  Module Clearance Matrix
                </h3>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Configuring {selectedRole} tier
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button
                  onClick={() => setAllPermissions(true)}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-[10px] font-black uppercase text-white hover:bg-blue-700"
                >
                  <CheckSquare size={14} />
                  Grant All
                </button>

                <button
                  onClick={() => setAllPermissions(false)}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-[10px] font-black uppercase text-gray-700 hover:bg-gray-50"
                >
                  <XSquare size={14} />
                  Revoke All
                </button>

                <button
                  onClick={resetRole}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-[10px] font-black uppercase text-gray-700 hover:bg-gray-50"
                >
                  <RotateCcw size={14} />
                  Reset
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left">
                <thead>
                  <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <th className="px-5 py-5">Module</th>
                    <th className="px-4 py-5 text-center"><Eye size={14} className="mx-auto mb-1" />View</th>
                    <th className="px-4 py-5 text-center"><ShieldCheck size={14} className="mx-auto mb-1" />Create</th>
                    <th className="px-4 py-5 text-center"><Edit3 size={14} className="mx-auto mb-1" />Edit</th>
                    <th className="px-4 py-5 text-center"><Trash size={14} className="mx-auto mb-1" />Delete</th>
                    <th className="px-4 py-5 text-center"><CheckCircle2 size={14} className="mx-auto mb-1" />Approve</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {permissions.map((module) => (
                    <tr key={module.id} className="hover:bg-gray-50">
                      <td className="px-5 py-5 text-xs font-black uppercase text-gray-900">
                        {module.name}
                      </td>

                      {["view", "create", "edit", "delete", "approve"].map((field) => (
                        <td key={field} className="px-4 py-5 text-center">
                          <Toggle
                            enabled={module[field]}
                            onClick={() => togglePermission(module.id, field)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-[2rem] border border-rose-100 bg-rose-50 p-5 sm:flex-row">
            <div className="shrink-0 rounded-2xl border border-rose-100 bg-white p-3 text-rose-600">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-800">
                Administrative Warning
              </h4>
              <p className="mt-2 text-xs font-bold uppercase leading-relaxed text-rose-600/80">
                All clearance changes are recorded in activity logs. Deploy protocols after editing permissions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Toggle = ({ enabled, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative h-7 w-12 rounded-full transition-all ${
      enabled ? "bg-blue-600" : "bg-gray-200"
    }`}
  >
    <span
      className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
        enabled ? "left-6" : "left-1"
      }`}
    />
  </button>
);

export default AccessControl;