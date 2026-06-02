import React, { useMemo, useState } from "react";
import {
  Lock,
  Search,
  Save,
  ShieldAlert,
  Check,
  FileSearch,
  Users,
  Trophy,
  Clock,
  RotateCcw,
  X,
} from "lucide-react";

const roles = ["SUPER-ADMIN", "HEAD-COACH", "FINANCE", "COACH"];
const actions = ["VIEW", "CREATE", "EDIT", "DELETE", "APPROVE"];

const modules = [
  { id: "ADM", title: "Admissions Panel", icon: Users },
  { id: "TRA", title: "Training Ops", icon: Trophy },
  { id: "ATT", title: "Presence Tracking", icon: Clock },
];

const makeDefaultPermissions = () =>
  roles.reduce((acc, role) => {
    acc[role] = modules.reduce((mAcc, mod) => {
      mAcc[mod.id] = actions.reduce((aAcc, act) => {
        aAcc[act] = role === "SUPER-ADMIN" || act === "VIEW";
        return aAcc;
      }, {});
      return mAcc;
    }, {});
    return acc;
  }, {});

const Permissions = () => {
  const [selectedRole, setSelectedRole] = useState("SUPER-ADMIN");
  const [search, setSearch] = useState("");
  const [permissions, setPermissions] = useState(makeDefaultPermissions);
  const [message, setMessage] = useState("");

  const showMsg = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2200);
  };

  const filteredModules = useMemo(() => {
    const q = search.trim().toLowerCase();
    return modules.filter((m) => m.title.toLowerCase().includes(q));
  }, [search]);

  const togglePermission = (moduleId, action) => {
    setPermissions((prev) => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [moduleId]: {
          ...prev[selectedRole][moduleId],
          [action]: !prev[selectedRole][moduleId][action],
        },
      },
    }));
  };

  const setAllPermissions = (value) => {
    setPermissions((prev) => ({
      ...prev,
      [selectedRole]: modules.reduce((mAcc, mod) => {
        mAcc[mod.id] = actions.reduce((aAcc, act) => {
          aAcc[act] = value;
          return aAcc;
        }, {});
        return mAcc;
      }, {}),
    }));

    showMsg(value ? "All permissions enabled." : "All permissions disabled.");
  };

  const resetPermissions = () => {
    const defaults = makeDefaultPermissions();

    setPermissions((prev) => ({
      ...prev,
      [selectedRole]: defaults[selectedRole],
    }));

    setSearch("");
    showMsg("Permissions reset successfully.");
  };

  const savePermissions = () => {
    console.log("Saved Permissions:", permissions[selectedRole]);
    showMsg(`${selectedRole.replace("-", " ")} permissions saved successfully.`);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-[1600px] space-y-5">
        <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 sm:h-12 sm:w-12">
                <Lock size={24} />
              </div>

              <div className="min-w-0">
                <h1 className="break-words text-xl font-black uppercase text-gray-900 sm:text-2xl">
                  Permissions
                </h1>
                <p className="mt-1 text-xs font-semibold text-gray-500 sm:text-sm">
                  Manage role-wise module access and action permissions.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={savePermissions}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-black uppercase text-white hover:bg-blue-700 sm:w-auto"
            >
              <Save size={15} />
              Save Permissions
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

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
              <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-gray-400">
                Select Role
              </h3>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-1">
                {roles.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`min-h-11 rounded-2xl border px-3 py-3 text-center text-[10px] font-black uppercase transition sm:text-xs xl:text-left ${
                      selectedRole === role
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-100 bg-white text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    {role.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-blue-600 p-5 text-white shadow-sm">
              <FileSearch size={28} className="mb-3" />
              <p className="text-xs font-black uppercase text-blue-100">
                Audit Status
              </p>
              <h4 className="mt-2 text-sm font-black uppercase sm:text-base">
                System integrity verified
              </h4>
              <p className="mt-3 flex items-center gap-2 text-xs font-bold text-blue-100">
                <Check size={14} />
                Last checked today
              </p>
            </div>
          </aside>

          <main className="min-w-0 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/60 p-4 sm:p-5 md:p-6">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h3 className="text-sm font-black uppercase text-gray-900">
                    Permission Matrix
                  </h3>
                  <p className="mt-1 text-xs font-bold uppercase text-gray-400">
                    Configuring {selectedRole.replace("-", " ")}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
                  <div className="relative sm:col-span-2 lg:col-span-1">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search module..."
                      className="h-11 w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setAllPermissions(true)}
                    className="h-11 rounded-xl bg-emerald-50 px-4 text-xs font-black uppercase text-emerald-700 hover:bg-emerald-100"
                  >
                    Enable All
                  </button>

                  <button
                    type="button"
                    onClick={() => setAllPermissions(false)}
                    className="h-11 rounded-xl bg-rose-50 px-4 text-xs font-black uppercase text-rose-700 hover:bg-rose-100"
                  >
                    Disable All
                  </button>

                  <button
                    type="button"
                    onClick={resetPermissions}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-xs font-black uppercase text-gray-600 hover:bg-gray-50"
                  >
                    <RotateCcw size={14} />
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={savePermissions}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-black uppercase text-white hover:bg-blue-700"
                  >
                    <Save size={14} />
                    Save
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 lg:hidden">
              {filteredModules.map((module) => {
                const Icon = module.icon;

                return (
                  <div
                    key={module.id}
                    className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Icon size={18} />
                      </div>

                      <h4 className="min-w-0 break-words text-xs font-black uppercase text-gray-900">
                        {module.title}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
                      {actions.map((action) => (
                        <div
                          key={action}
                          className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 p-3"
                        >
                          <span className="text-xs font-black uppercase text-gray-600">
                            {action}
                          </span>

                          <Switch
                            checked={permissions[selectedRole][module.id][action]}
                            onClick={() => togglePermission(module.id, action)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {!filteredModules.length && (
                <p className="py-8 text-center text-xs font-black uppercase tracking-widest text-gray-400">
                  No modules found
                </p>
              )}
            </div>

            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full min-w-[780px] text-left">
                <thead>
                  <tr className="bg-white">
                    <TableHead>Module</TableHead>
                    {actions.map((action) => (
                      <TableHead key={action} center>
                        {action}
                      </TableHead>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredModules.map((module) => {
                    const Icon = module.icon;

                    return (
                      <tr key={module.id} className="hover:bg-gray-50">
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                              <Icon size={18} />
                            </div>

                            <span className="text-xs font-black uppercase text-gray-900">
                              {module.title}
                            </span>
                          </div>
                        </td>

                        {actions.map((action) => (
                          <td key={action} className="px-4 py-5 text-center">
                            <Switch
                              checked={permissions[selectedRole][module.id][action]}
                              onClick={() => togglePermission(module.id, action)}
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}

                  {!filteredModules.length && (
                    <tr>
                      <td
                        colSpan={actions.length + 1}
                        className="px-6 py-12 text-center text-xs font-black uppercase tracking-widest text-gray-400"
                      >
                        No modules found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="m-4 flex gap-3 rounded-2xl border border-rose-100 bg-rose-50 p-4 sm:m-5">
              <ShieldAlert className="shrink-0 text-rose-600" size={22} />
              <p className="text-xs font-bold uppercase leading-relaxed text-rose-700">
                Permission changes affect system-wide access. Review carefully before saving.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

const Switch = ({ checked, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
      checked ? "bg-blue-600" : "bg-gray-300"
    }`}
  >
    <span
      className={`inline-block h-5 w-5 rounded-full bg-white transition ${
        checked ? "translate-x-5" : "translate-x-1"
      }`}
    />
  </button>
);

const TableHead = ({ children, center }) => (
  <th
    className={`px-5 py-4 text-xs font-black uppercase text-gray-400 ${
      center ? "text-center" : ""
    }`}
  >
    {children}
  </th>
);

export default Permissions;