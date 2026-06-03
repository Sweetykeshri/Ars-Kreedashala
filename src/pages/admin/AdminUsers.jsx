import React, { useMemo, useState } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  ShieldCheck,
  UserCheck,
  UserX,
  Edit2,
  Trash2,
  Eye,
  X,
  Save,
  RotateCcw,
} from "lucide-react";

const initialUsers = [
  {
    id: "ADM-001",
    name: "Vikram Singh",
    email: "vikram.s@ars.academy",
    phone: "+91 98765 43210",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2 hours ago",
  },
  {
    id: "ADM-002",
    name: "Priya Sharma",
    email: "priya.s@ars.academy",
    phone: "+91 98765 43211",
    role: "Operations Head",
    status: "Active",
    lastLogin: "5 mins ago",
  },
  {
    id: "ADM-003",
    name: "Arjun Reddy",
    email: "arjun.r@ars.academy",
    phone: "+91 98765 43212",
    role: "Finance Officer",
    status: "Inactive",
    lastLogin: "2 days ago",
  },
  {
    id: "ADM-004",
    name: "Sneha Gupta",
    email: "sneha.g@ars.academy",
    phone: "+91 98765 43213",
    role: "Data Analyst",
    status: "Active",
    lastLogin: "1 hour ago",
  },
];

const roles = ["All", "Super Admin", "Operations Head", "Finance Officer", "Data Analyst"];
const statuses = ["All", "Active", "Inactive"];

const blankForm = {
  id: "",
  name: "",
  email: "",
  phone: "",
  role: "Operations Head",
  status: "Active",
  lastLogin: "Just added",
};

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState(blankForm);

  const filteredUsers = useMemo(() => {
    const q = searchTerm.toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !q ||
        `${user.id} ${user.name} ${user.email} ${user.phone} ${user.role} ${user.status}`
          .toLowerCase()
          .includes(q);

      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesStatus = statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const activeUsers = users.filter((u) => u.status === "Active").length;
  const inactiveUsers = users.filter((u) => u.status === "Inactive").length;
  const superUsers = users.filter((u) => u.role === "Super Admin").length;

  const openAddModal = () => {
    const nextId = `ADM-${String(users.length + 1).padStart(3, "0")}`;
    setFormData({ ...blankForm, id: nextId });
    setModalMode("add");
  };

  const openViewModal = (user) => {
    setSelectedUser(user);
    setModalMode("view");
  };

  const openEditModal = (user) => {
    setFormData(user);
    setModalMode("edit");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedUser(null);
    setFormData(blankForm);
  };

  const saveUser = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill Name, Email and Phone.");
      return;
    }

    if (modalMode === "add") {
      setUsers((prev) => [...prev, formData]);
    }

    if (modalMode === "edit") {
      setUsers((prev) =>
        prev.map((user) => (user.id === formData.id ? formData : user))
      );
    }

    closeModal();
  };

  const deleteUser = (id, name) => {
    const ok = window.confirm(`Remove access for ${name}?`);

    if (!ok) return;

    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setRoleFilter("All");
    setStatusFilter("All");
  };

  const initials = (name) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="w-full max-w-full space-y-6 overflow-hidden p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Users size={24} />
          </div>

          <div>
            <h1 className="text-xl font-black uppercase tracking-tight text-gray-900 sm:text-2xl">
              Admin Personnel
            </h1>
            <p className="mt-1 text-sm font-medium text-gray-500">
              Manage command center staff and operational access levels.
            </p>
          </div>
        </div>

        <button
          onClick={openAddModal}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-gray-200 transition-all hover:bg-black active:scale-[0.98] sm:w-auto"
        >
          <Plus size={16} />
          Induct Admin
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Admins" value={users.length} icon={<Users size={20} />} />
        <StatCard label="Super Users" value={superUsers} icon={<ShieldCheck size={20} />} />
        <StatCard label="Active Now" value={activeUsers} icon={<UserCheck size={20} />} />
        <StatCard label="Inactive Users" value={inactiveUsers} icon={<UserX size={20} />} />
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 bg-gray-50/40 p-4 md:flex-row md:items-center md:justify-between md:p-6">
          <div className="relative w-full md:max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search command staff..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-xs font-black uppercase tracking-wider outline-none transition-all focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 text-xs font-black uppercase tracking-widest text-gray-700 transition-all hover:bg-gray-50 sm:w-auto"
          >
            {showFilters ? <X size={16} /> : <Filter size={16} />}
            {showFilters ? "Close Filters" : "Filters"}
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 gap-4 border-b border-gray-100 bg-white p-4 sm:grid-cols-2 lg:grid-cols-3 lg:p-6">
            <SelectBox label="Role" value={roleFilter} onChange={setRoleFilter} options={roles} />
            <SelectBox
              label="Status"
              value={statusFilter}
              onChange={setStatusFilter}
              options={statuses}
            />

            <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row sm:items-end lg:col-span-1">
              <button
                onClick={clearFilters}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white text-xs font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50"
              >
                <RotateCcw size={15} />
                Clear
              </button>

              <button
                onClick={() => setShowFilters(false)}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 text-xs font-black uppercase tracking-widest text-white hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left">
            <thead>
              <tr className="bg-gray-50/70">
                {["Profile", "Contact", "Role", "Status", "Last Login", "Actions"].map(
                  (head) => (
                    <th
                      key={head}
                      className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 ${
                        head === "Actions" ? "text-right" : ""
                      }`}
                    >
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-gray-50/60">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-xs font-black text-white">
                        {initials(user.name)}
                      </div>

                      <div>
                        <p className="text-xs font-black uppercase text-gray-900">
                          {user.name}
                        </p>
                        <p className="mt-0.5 text-[10px] font-black uppercase tracking-widest text-blue-600">
                          {user.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <p className="flex items-center gap-2 text-[10px] font-bold text-gray-500">
                      <Mail size={12} />
                      {user.email}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-[10px] font-bold text-gray-500">
                      <Phone size={12} />
                      {user.phone}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-indigo-700">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <StatusBadge status={user.status} />
                  </td>

                  <td className="px-6 py-5 text-[10px] font-black uppercase text-gray-500">
                    {user.lastLogin}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <IconButton onClick={() => openViewModal(user)} icon={<Eye size={17} />} />
                      <IconButton onClick={() => openEditModal(user)} icon={<Edit2 size={17} />} />
                      <IconButton
                        danger
                        onClick={() => deleteUser(user.id, user.name)}
                        icon={<Trash2 size={17} />}
                      />
                    </div>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-xs font-black uppercase tracking-widest text-gray-400"
                  >
                    No admin users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 bg-gray-50/40 p-4 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Showing {filteredUsers.length} of {users.length} admins
          </p>
        </div>
      </div>

      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                  {modalMode === "view" ? "Admin Details" : modalMode === "add" ? "Add Admin" : "Edit Admin"}
                </p>
                <h3 className="mt-1 text-xl font-black text-gray-900">
                  {modalMode === "view" ? selectedUser.name : formData.name || "New Administrator"}
                </h3>
              </div>

              <button
                onClick={closeModal}
                className="rounded-xl border border-gray-200 p-2 text-gray-500 hover:bg-gray-50"
              >
                <X size={18} />
              </button>
            </div>

            {modalMode === "view" ? (
              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                <Detail label="Admin ID" value={selectedUser.id} />
                <Detail label="Name" value={selectedUser.name} />
                <Detail label="Email" value={selectedUser.email} />
                <Detail label="Phone" value={selectedUser.phone} />
                <Detail label="Role" value={selectedUser.role} />
                <Detail label="Status" value={selectedUser.status} />
                <Detail label="Last Login" value={selectedUser.lastLogin} />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                <Input label="Admin ID" value={formData.id} disabled />
                <Input label="Name" value={formData.name} onChange={(v) => setFormData({ ...formData, name: v })} />
                <Input label="Email" value={formData.email} onChange={(v) => setFormData({ ...formData, email: v })} />
                <Input label="Phone" value={formData.phone} onChange={(v) => setFormData({ ...formData, phone: v })} />
                <SelectBox label="Role" value={formData.role} onChange={(v) => setFormData({ ...formData, role: v })} options={roles.filter((r) => r !== "All")} />
                <SelectBox label="Status" value={formData.status} onChange={(v) => setFormData({ ...formData, status: v })} options={statuses.filter((s) => s !== "All")} />
              </div>
            )}

            <div className="flex flex-col gap-3 border-t border-gray-100 p-5 sm:flex-row sm:justify-end">
              <button
                onClick={closeModal}
                className="rounded-xl border border-gray-200 px-5 py-3 text-xs font-black uppercase tracking-widest text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>

              {modalMode !== "view" && (
                <button
                  onClick={saveUser}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-blue-700"
                >
                  <Save size={15} />
                  Save Admin
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon }) => (
  <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
    <div className="mb-5 flex items-center justify-between">
      <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">{icon}</div>
      <span className="rounded-full bg-gray-50 px-2 py-1 text-[10px] font-black uppercase text-gray-500">
        Live
      </span>
    </div>
    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </p>
    <h3 className="mt-1 text-3xl font-black text-gray-900">{value}</h3>
  </div>
);

const StatusBadge = ({ status }) => (
  <span
    className={`rounded-lg border px-2 py-1 text-[8px] font-black uppercase tracking-widest ${
      status === "Active"
        ? "border-emerald-100 bg-emerald-50 text-emerald-600"
        : "border-rose-100 bg-rose-50 text-rose-600"
    }`}
  >
    {status}
  </span>
);

const IconButton = ({ icon, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`rounded-xl p-2 transition-all ${
      danger
        ? "text-gray-400 hover:bg-rose-50 hover:text-rose-600"
        : "text-gray-400 hover:bg-blue-50 hover:text-blue-600"
    }`}
  >
    {icon}
  </button>
);

const SelectBox = ({ label, value, onChange, options }) => (
  <label className="block">
    <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  </label>
);

const Input = ({ label, value, onChange, disabled }) => (
  <label className="block">
    <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </span>
    <input
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
    />
  </label>
);

const Detail = ({ label, value }) => (
  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
      {label}
    </p>
    <p className="mt-2 text-sm font-black text-gray-900">{value}</p>
  </div>
);

export default AdminUsers;