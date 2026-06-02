import React, { useState } from "react";
import {
  Settings,
  Moon,
  Sun,
  Bell,
  Cloud,
  Database,
  Laptop,
  Languages,
  ShieldCheck,
  RefreshCw,
  HardDrive,
  Save,
  RotateCcw,
  X,
} from "lucide-react";
import { SettingsHeader } from "../../components/settings/SettingsShared";

const defaultConfig = {
  autoBackup: true,
  notifications: true,
  cloudSync: true,
  maintenanceMode: false,
  darkMode: false,
  aiOptimization: true,
  language: "English (US)",
};

const SystemConfig = () => {
  const [config, setConfig] = useState(defaultConfig);
  const [msg, setMsg] = useState("");
  const [checking, setChecking] = useState(false);
  const [wipeModal, setWipeModal] = useState(false);

  const showMsg = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2500);
  };

  const toggle = (key) => {
    setConfig((p) => ({ ...p, [key]: !p[key] }));
  };

  const saveConfig = () => {
    console.log("Saved System Config:", config);
    showMsg("System configuration saved successfully.");
  };

  const resetConfig = () => {
    if (!window.confirm("Reset system configuration to default?")) return;
    setConfig(defaultConfig);
    showMsg("System configuration reset successfully.");
  };

  const checkUpdates = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      showMsg("System is up to date.");
    }, 1200);
  };

  const downloadSnapshot = () => {
    const file = new Blob([JSON.stringify(config, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = "system-config-snapshot.json";
    a.click();
    URL.revokeObjectURL(url);

    showMsg("System snapshot downloaded.");
  };

  const systemItems = [
    {
      key: "darkMode",
      title: "Dark Mode",
      text: "Toggle interface theme",
      icon: config.darkMode ? Moon : Sun,
    },
    {
      key: "notifications",
      title: "Notifications",
      text: "Enable system alerts",
      icon: Bell,
    },
    {
      key: "autoBackup",
      title: "Auto Backup",
      text: "Daily data backup",
      icon: Database,
    },
    {
      key: "cloudSync",
      title: "Cloud Sync",
      text: "Real-time cloud backup",
      icon: Cloud,
    },
    {
      key: "maintenanceMode",
      title: "Maintenance Mode",
      text: "Temporarily lock public access",
      icon: ShieldCheck,
    },
    {
      key: "aiOptimization",
      title: "AI Optimization",
      text: "Enable smart system optimization",
      icon: Laptop,
    },
  ];

  return (
    <div className={`p-4 sm:p-6 lg:p-8 ${config.darkMode ? "bg-gray-950" : ""}`}>
      <SettingsHeader
        title="System Config"
        subtitle="Manage system preferences, backup, sync and security settings"
        icon={Settings}
      />

      {msg && (
        <div className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
          {msg}
        </div>
      )}

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={saveConfig}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-black uppercase text-white hover:bg-blue-700"
        >
          <Save size={16} /> Save Config
        </button>

        <button
          type="button"
          onClick={resetConfig}
          className="flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-5 py-3 text-xs font-black uppercase text-gray-700 hover:bg-gray-200"
        >
          <RotateCcw size={16} /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="mb-5 text-xs font-black uppercase tracking-widest text-blue-600">
            Interface & System Settings
          </h3>

          <div className="space-y-4">
            <div className="flex flex-col gap-3 rounded-2xl bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white p-3 text-blue-600">
                  <Languages size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-gray-900">
                    Language
                  </h4>
                  <p className="text-xs font-bold text-gray-400">
                    System communication language
                  </p>
                </div>
              </div>

              <select
                value={config.language}
                onChange={(e) =>
                  setConfig((p) => ({ ...p, language: e.target.value }))
                }
                className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>English (US)</option>
                <option>Hindi (IN)</option>
                <option>Spanish (ES)</option>
              </select>
            </div>

            {systemItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.key}
                  className="flex items-center justify-between rounded-2xl bg-gray-50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-xl p-3 ${
                        config[item.key]
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600"
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <div>
                      <h4 className="text-xs font-black uppercase text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-xs font-bold text-gray-400">
                        {item.text}
                      </p>
                    </div>
                  </div>

                  <Switch checked={config[item.key]} onClick={() => toggle(item.key)} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl bg-gray-900 p-6 text-white shadow-sm">
            <Laptop size={44} className="mb-4 text-blue-400" />

            <p className="text-xs font-black uppercase tracking-widest text-blue-400">
              Version Control
            </p>

            <h4 className="mt-2 text-2xl font-black uppercase">
              Ars OS v4.8.2
            </h4>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="rounded-lg bg-white/10 px-3 py-2 text-xs font-black uppercase">
                Up to date
              </span>

              <button
                type="button"
                onClick={checkUpdates}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-xs font-black uppercase hover:bg-blue-700"
              >
                <RefreshCw size={14} className={checking ? "animate-spin" : ""} />
                {checking ? "Checking..." : "Check Updates"}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={downloadSnapshot}
            className="flex w-full items-center justify-between rounded-3xl border-2 border-dashed border-gray-200 bg-white p-6 text-left hover:border-blue-200 hover:bg-blue-50"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-gray-100 p-3 text-blue-600">
                <HardDrive size={22} />
              </div>

              <div>
                <h4 className="text-xs font-black uppercase text-gray-900">
                  Download Snapshot
                </h4>
                <p className="text-xs font-bold text-gray-400">
                  Export complete system config
                </p>
              </div>
            </div>

            <ShieldCheck size={22} className="text-gray-300" />
          </button>

          <button
            type="button"
            onClick={() => setWipeModal(true)}
            className="w-full rounded-3xl bg-rose-600 p-6 text-left text-white hover:bg-rose-700"
          >
            <RefreshCw size={26} className="mb-4" />
            <h4 className="text-lg font-black uppercase">Hard Reset</h4>
            <p className="mt-2 text-xs font-bold text-rose-100">
              Emergency reset requires confirmation.
            </p>
          </button>
        </div>
      </div>

      {wipeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-black text-gray-900">Confirm Hard Reset</h3>

              <button
                type="button"
                onClick={() => setWipeModal(false)}
                className="rounded-xl p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm font-semibold text-gray-500">
              This is a demo safety action. No real data will be deleted.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setWipeModal(false)}
                className="w-full rounded-xl bg-gray-100 py-3 text-xs font-black uppercase text-gray-700"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  setWipeModal(false);
                  showMsg("Hard reset request submitted for authorization.");
                }}
                className="w-full rounded-xl bg-rose-600 py-3 text-xs font-black uppercase text-white"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Switch = ({ checked, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
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

export default SystemConfig;