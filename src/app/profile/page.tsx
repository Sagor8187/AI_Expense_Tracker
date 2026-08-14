"use client";

import { useState } from "react";
import { 
  FiUser, 
  FiMail, 
  FiLock, 
  FiShield, 
  FiBell, 
  FiCamera, 
  FiSave, 
  FiCheckCircle, 
  FiDollarSign, 
  FiCreditCard, 
  FiPieChart, 
  FiCalendar,
  FiLogOut,
  FiTrash2,
  FiZap
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

export default function ProfilePage() {
  // User Profile State
  const [user, setUser] = useState({
    name: "Sagor Sutradhar",
    email: "sagor@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
    currency: "USD ($)",
    joinedDate: "August 2026",
    role: "Full Stack Developer",
  });

  // Notification Preferences State
  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    budgetWarnings: true,
    aiInsights: true,
    monthlyReports: false,
  });

  // Password Change State
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Success Feedback Toast State
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Handle Input Changes
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlePreferenceToggle = (key: keyof typeof preferences) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // Mock Save Handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* 1. Header Section */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Account Settings
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Manage your personal information, security, and notification preferences.
            </p>
          </div>

          {/* Success Notification Toast */}
          {savedSuccess && (
            <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
              <FiCheckCircle className="h-4 w-4" /> Changes saved successfully!
            </div>
          )}
        </div>

        {/* 2. Main Content Grid (3 Columns on Large Screen) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Left Column (1 Col wide): User Card & Quick Stats */}
          <div className="space-y-6">
            
            {/* User Overview Profile Card */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="h-24 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700" />
              <div className="relative px-6 pb-6 pt-0 text-center">
                
                {/* Avatar with Upload Icon */}
                <div className="relative mx-auto -mt-12 h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md dark:border-slate-900 dark:bg-slate-800">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 transition-opacity hover:opacity-100">
                    <FiCamera className="h-6 w-6 text-white" />
                  </button>
                </div>

                <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">{user.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user.role}</p>

                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <HiSparkles /> Pro Member
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <FiCalendar /> Joined {user.joinedDate}
                </div>
              </div>
            </div>

            {/* Quick Activity Stats */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Account Activity Summary</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400">
                      <FiCreditCard />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Logged Transactions</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">128 Entries</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-950">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                      <FiPieChart />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Active Budgets</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">5 Categories</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences & AI Alert Settings */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                <FiBell className="text-indigo-500" />
                <h3 className="text-sm font-bold">Notification & AI Preferences</h3>
              </div>

              <div className="mt-4 space-y-4">
                
                {/* Toggle 1 */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Budget Limit Warnings</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Alert when spending exceeds 85%</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.budgetWarnings}
                    onChange={() => handlePreferenceToggle("budgetWarnings")}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>

                {/* Toggle 2 */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">AI Financial Insights</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Automated spending optimization tips</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.aiInsights}
                    onChange={() => handlePreferenceToggle("aiInsights")}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>

                {/* Toggle 3 */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Email Digest</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Receive monthly summary report</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.emailAlerts}
                    onChange={() => handlePreferenceToggle("emailAlerts")}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>

              </div>
            </div>

          </div>

          {/* Right Column (2 Cols wide): Personal Details & Password Forms */}
          <div className="space-y-6 lg:col-span-2">

            {/* Personal Information Form */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <FiUser className="text-indigo-500" />
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">Personal Details</h2>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                    <div className="relative mt-1">
                      <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleUserChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                    <div className="relative mt-1">
                      <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleUserChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Currency Preference */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Preferred Currency</label>
                    <div className="relative mt-1">
                      <FiDollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <select
                        name="currency"
                        value={user.currency}
                        onChange={handleUserChange}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      >
                        <option value="USD ($)">USD ($) - US Dollar</option>
                        <option value="BDT (৳)">BDT (৳) - Bangladeshi Taka</option>
                        <option value="EUR (€)">EUR (€) - Euro</option>
                        <option value="GBP (£)">GBP (£) - British Pound</option>
                      </select>
                    </div>
                  </div>

                  {/* Role Title */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Profession / Role</label>
                    <input
                      type="text"
                      name="role"
                      value={user.role}
                      onChange={handleUserChange}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    />
                  </div>

                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-500 active:scale-95"
                  >
                    <FiSave className="h-4 w-4" /> Save Profile Details
                  </button>
                </div>
              </form>
            </div>

            {/* Change Password / Security Form */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
                <FiShield className="text-indigo-500" />
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Security & Password</h2>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-4">
                
                {/* Current Password */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Current Password</label>
                  <div className="relative mt-1">
                    <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      name="currentPassword"
                      placeholder="••••••••"
                      value={passwords.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  
                  {/* New Password */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">New Password</label>
                    <div className="relative mt-1">
                      <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        name="newPassword"
                        placeholder="New password"
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Confirm New Password</label>
                    <div className="relative mt-1">
                      <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={passwords.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      />
                    </div>
                  </div>

                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-slate-800 active:scale-95 dark:bg-slate-800 dark:hover:bg-slate-700"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>

            {/* Danger Zone Card */}
            <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-6 dark:border-rose-950/60 dark:bg-rose-950/20">
              <h3 className="text-sm font-bold text-rose-900 dark:text-rose-200">Danger Zone</h3>
              <p className="mt-1 text-xs text-rose-700 dark:text-rose-400">
                Log out from all active sessions or permanently delete your account and transaction data.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button className="inline-flex items-center gap-2 rounded-xl border border-rose-300 bg-white px-4 py-2 text-xs font-bold text-rose-700 shadow-sm hover:bg-rose-50 dark:border-rose-900 dark:bg-slate-900 dark:text-rose-400 dark:hover:bg-rose-950">
                  <FiLogOut /> Log Out
                </button>
                <button className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-500">
                  <FiTrash2 /> Delete Account
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}