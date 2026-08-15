"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "@/lib/auth-client"; 
import { 
  FiPlus, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiPieChart, 
  FiEdit2, 
  FiTrash2, 
  FiX, 
  FiInfo,
  FiLoader
} from "react-icons/fi";

interface BudgetItem {
  _id?: string;
  id?: string;
  userId: string;
  category: string;
  month: string;
  amount: number;
  spent: number;
}

const categories = [
  "Food & Groceries", 
  "Utilities & Bills", 
  "Entertainment", 
  "Shopping & Lifestyle", 
  "Transportation", 
  "Health & Fitness", 
  "Education"
];

const API_URL = "http://localhost:5000/all_budget";

export default function BudgetsPage() {
  const { data: session, isPending: isSessionLoading } = useSession();
  const userId = session?.user?.id;

  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("2026-08");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Spent Update-এর জন্য নতুন স্টেটসমূহ
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBudgetItem, setSelectedBudgetItem] = useState<BudgetItem | null>(null);
  const [spentInput, setSpentInput] = useState<string>("");
  const [isUpdatingSpent, setIsUpdatingSpent] = useState(false);

  const [formData, setFormData] = useState({
    category: "Food & Groceries",
    month: "2026-08",
    amount: "",
  });

  // Budgets Fetch Function
  const fetchBudgets = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch budget data");
      
      const result = await res.json();
      setBudgets(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("Error fetching budgets:", error);
      setBudgets([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchBudgets();
    }
  }, [userId, fetchBudgets]);

  const filteredBudgets = budgets.filter((b) => b.month === selectedMonth);

  const totalBudget = filteredBudgets.reduce((acc, curr) => acc + curr.amount, 0);
  const totalSpent = filteredBudgets.reduce((acc, curr) => acc + (curr.spent || 0), 0);
  const overallPercentage = Math.min(Math.round((totalSpent / (totalBudget || 1)) * 100), 100);

  const exceededBudgets = filteredBudgets.filter((b) => (b.spent || 0) > b.amount);
  const warningBudgets = filteredBudgets.filter((b) => (b.spent || 0) >= b.amount * 0.85 && (b.spent || 0) <= b.amount);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ১. নতুন বাজেট তৈরি করার হ্যান্ডলার
  const handleSaveBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount) return;

    if (!userId) {
      alert("You must be logged in to set a budget!");
      return;
    }

    setIsSubmitting(true);

    const newBudgetData = {
      userId: userId,
      category: formData.category,
      month: formData.month,
      amount: parseFloat(formData.amount) || 0,
      spent: 0,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBudgetData),
      });

      if (!res.ok) throw new Error("Failed to save budget");

      await fetchBudgets();

      setIsModalOpen(false);
      setFormData({ category: "Food & Groceries", month: selectedMonth, amount: "" });
    } catch (error) {
      console.error("Error saving budget:", error);
      alert("Failed to save budget limit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ২. Edit বাটনে ক্লিক করলে Modal ওপেন করার ফাংশন
  const handleOpenEditModal = (item: BudgetItem) => {
    setSelectedBudgetItem(item);
    setSpentInput((item.spent || 0).toString());
    setIsEditModalOpen(true);
  };

  // ৩. Spent Update (PATCH API Call) করার হ্যান্ডলার
  const handleUpdateSpent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBudgetItem) return;

    const budgetId = selectedBudgetItem._id || selectedBudgetItem.id;
    if (!budgetId) return;

    setIsUpdatingSpent(true);

    try {
      const res = await fetch(`http://localhost:5000/budget/${budgetId}/spent`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ spent: parseFloat(spentInput) || 0 }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsEditModalOpen(false);
        setSelectedBudgetItem(null);
        await fetchBudgets(); // ডাটা আপডেট হওয়ার পর রিলোড
      } else {
        alert(data.message || "Failed to update spent amount");
      }
    } catch (error) {
      console.error("Error updating spent amount:", error);
      alert("Something went wrong while updating spent amount.");
    } finally {
      setIsUpdatingSpent(false);
    }
  };

  if (isSessionLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <FiLoader className="h-8 w-8 animate-spin text-indigo-600" />
        <span className="ml-2 font-medium text-slate-600 dark:text-slate-400">Authenticating...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Monthly Budgets
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Set spending limits per category and keep track of budget warnings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  setFormData((prev) => ({ ...prev, month: e.target.value }));
                }}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-500 active:scale-95"
            >
              <FiPlus className="h-5 w-5" />
              Set Budget Limit
            </button>
          </div>
        </div>

        {/* Warnings Banner */}
        {exceededBudgets.length > 0 && (
          <div className="flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/30">
            <div className="rounded-xl bg-rose-500/10 p-2 text-rose-600 dark:text-rose-400">
              <FiAlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200">
                Budget Exceeded Alert!
              </h4>
              <p className="text-xs text-rose-700 dark:text-rose-300">
                You have exceeded budget limits in <span className="font-semibold">{exceededBudgets.map(b => b.category).join(", ")}</span>.
              </p>
            </div>
          </div>
        )}

        {/* Summary Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Overall Budget Progress ({selectedMonth})
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  ${totalSpent.toLocaleString()}
                </span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  of ${totalBudget.toLocaleString()} limit
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2 dark:bg-slate-800">
                <FiPieChart className="text-indigo-500" />
                <span>Categories: <strong className="text-slate-900 dark:text-white">{filteredBudgets.length}</strong></span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-amber-500/10 px-3.5 py-2 text-amber-600 dark:text-amber-400">
                <FiAlertTriangle />
                <span>Warnings: <strong className="text-amber-700 dark:text-amber-300">{warningBudgets.length}</strong></span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-rose-500/10 px-3.5 py-2 text-rose-600 dark:text-rose-400">
                <FiInfo />
                <span>Exceeded: <strong className="text-rose-700 dark:text-rose-300">{exceededBudgets.length}</strong></span>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
              <span>Spent Progress</span>
              <span>{Math.round((totalSpent / (totalBudget || 1)) * 100)}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className={`h-full transition-all duration-500 ${
                  totalSpent > totalBudget
                    ? "bg-rose-500"
                    : overallPercentage > 85
                    ? "bg-amber-500"
                    : "bg-indigo-600"
                }`}
                style={{ width: `${Math.min((totalSpent / (totalBudget || 1)) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Budget Cards Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate-500">
            <FiLoader className="h-8 w-8 animate-spin text-indigo-600" />
            <span className="ml-2 font-medium">Loading budgets...</span>
          </div>
        ) : filteredBudgets.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500 dark:border-slate-800">
            No budgets set for {selectedMonth}. Click "Set Budget Limit" to add one.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBudgets.map((item) => {
              const spent = item.spent || 0;
              const percentage = Math.round((spent / item.amount) * 100);
              const isExceeded = spent > item.amount;
              const isWarning = spent >= item.amount * 0.85 && !isExceeded;
              const itemId = item._id || item.id;

              return (
                <div
                  key={itemId}
                  className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{item.category}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Limit: ${item.amount}</p>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          isExceeded
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                            : isWarning
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        {isExceeded ? (
                          <>
                            <FiAlertTriangle className="h-3.5 w-3.5" /> Over Limit
                          </>
                        ) : isWarning ? (
                          <>
                            <FiAlertTriangle className="h-3.5 w-3.5" /> Near Limit
                          </>
                        ) : (
                          <>
                            <FiCheckCircle className="h-3.5 w-3.5" /> On Track
                          </>
                        )}
                      </span>
                    </div>

                    <div className="mt-4 flex items-baseline justify-between">
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Spent</p>
                        <p className={`text-xl font-extrabold ${isExceeded ? "text-rose-600 dark:text-rose-400" : "text-slate-900 dark:text-white"}`}>
                          ${spent}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Remaining</p>
                        <p className={`text-sm font-bold ${isExceeded ? "text-rose-500" : "text-slate-700 dark:text-slate-300"}`}>
                          {isExceeded ? `-$${spent - item.amount}` : `$${item.amount - spent}`}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <span>{percentage}% Used</span>
                        <span>${item.amount}</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isExceeded
                              ? "bg-rose-500"
                              : isWarning
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Edit and Delete Buttons */}
                  <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                    <button 
                      onClick={() => handleOpenEditModal(item)}
                      title="Update Spent Amount"
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400">
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Modal 1: Set New Budget Limit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Set Budget Limit</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBudget} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Month</label>
                <input
                  type="month"
                  name="month"
                  required
                  value={formData.month}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Monthly Limit Amount ($)</label>
                <input
                  type="number"
                  name="amount"
                  required
                  placeholder="e.g. 500"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-500 disabled:opacity-50"
                >
                  {isSubmitting && <FiLoader className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? "Saving..." : "Save Limit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Spent Amount Modal */}
      {isEditModalOpen && selectedBudgetItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Update Spent Amount</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Category: <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedBudgetItem.category}</span>
                </p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSpent} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Total Spent Amount ($)
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="Enter spent amount"
                  value={spentInput}
                  onChange={(e) => setSpentInput(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Budget Limit: ${selectedBudgetItem.amount}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdatingSpent}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-500 disabled:opacity-50"
                >
                  {isUpdatingSpent && <FiLoader className="h-4 w-4 animate-spin" />}
                  {isUpdatingSpent ? "Updating..." : "Update Spent"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}