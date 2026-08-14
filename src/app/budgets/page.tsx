"use client";

import { useState } from "react";
import { 
  FiPlus, 
  FiAlertTriangle, 
  FiCheckCircle, 
  FiPieChart, 
  FiDollarSign, 
  FiCalendar, 
  FiEdit2, 
  FiTrash2, 
  FiX, 
  FiTrendingUp,
  FiInfo
} from "react-icons/fi";

// TypeScript Interface matching DB Schema & UI needs
interface BudgetItem {
  id: string;
  category: string;
  month: string; // e.g., "2026-08"
  amount: number; // Budget Limit
  spent: number;  // Current Total Spent in this category
}

// Sample Static Data
const initialBudgets: BudgetItem[] = [
  {
    id: "b-1",
    category: "Food & Groceries",
    month: "2026-08",
    amount: 500,
    spent: 385,
  },
  {
    id: "b-2",
    category: "Utilities & Bills",
    month: "2026-08",
    amount: 250,
    spent: 240, // 96% - Warning state
  },
  {
    id: "b-3",
    category: "Entertainment",
    month: "2026-08",
    amount: 150,
    spent: 175, // 116% - Over budget state
  },
  {
    id: "b-4",
    category: "Shopping & Lifestyle",
    month: "2026-08",
    amount: 400,
    spent: 120,
  },
  {
    id: "b-5",
    category: "Transportation",
    month: "2026-08",
    amount: 200,
    spent: 85,
  },
];

const categories = ["Food & Groceries", "Utilities & Bills", "Entertainment", "Shopping & Lifestyle", "Transportation", "Health & Fitness", "Education"];

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<BudgetItem[]>(initialBudgets);
  const [selectedMonth, setSelectedMonth] = useState("2026-08");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for Adding/Setting Budget
  const [formData, setFormData] = useState({
    category: "Food & Groceries",
    month: "2026-08",
    amount: "",
  });

  // Calculate Overall Budget Totals
  const totalBudget = budgets.reduce((acc, curr) => acc + curr.amount, 0);
  const totalSpent = budgets.reduce((acc, curr) => acc + curr.spent, 0);
  const overallPercentage = Math.min(Math.round((totalSpent / (totalBudget || 1)) * 100), 100);

  // Identify Over-budget or High-warning categories
  const exceededBudgets = budgets.filter((b) => b.spent > b.amount);
  const warningBudgets = budgets.filter((b) => b.spent >= b.amount * 0.85 && b.spent <= b.amount);

  // Handle Form Input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Static Submit Logic
  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const newBudget: BudgetItem = {
      id: `b-${Date.now()}`,
      category: formData.category,
      month: formData.month,
      amount: parseFloat(formData.amount) || 0,
      spent: 0, // Default 0 spent for new budget limit
    };

    setBudgets([newBudget, ...budgets]);
    setIsModalOpen(false);
    setFormData({ category: "Food & Groceries", month: "2026-08", amount: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* 1. Header Section */}
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
            {/* Month Selector */}
            <div className="relative">
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white py-2 px-3 text-sm font-medium text-slate-900 focus:border-indigo-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
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

        {/* 2. Budget Warnings Banner (If any category exceeded) */}
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
                You have exceeded budget limits in <span className="font-semibold">{exceededBudgets.map(b => b.category).join(", ")}</span>. Review your spending to stay on track.
              </p>
            </div>
          </div>
        )}

        {/* 3. Overall Monthly Budget Summary Card */}
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

            {/* Quick Stats Pills */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3.5 py-2 dark:bg-slate-800">
                <FiPieChart className="text-indigo-500" />
                <span>Categories: <strong className="text-slate-900 dark:text-white">{budgets.length}</strong></span>
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

          {/* Progress Bar */}
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

        {/* 4. Category-wise Budget Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {budgets.map((item) => {
            const percentage = Math.round((item.spent / item.amount) * 100);
            const isExceeded = item.spent > item.amount;
            const isWarning = item.spent >= item.amount * 0.85 && !isExceeded;

            return (
              <div
                key={item.id}
                className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white">{item.category}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Limit: ${item.amount}</p>
                    </div>

                    {/* Status Badge */}
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

                  {/* Amounts */}
                  <div className="mt-4 flex items-baseline justify-between">
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Spent</p>
                      <p className={`text-xl font-extrabold ${isExceeded ? "text-rose-600 dark:text-rose-400" : "text-slate-900 dark:text-white"}`}>
                        ${item.spent}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Remaining</p>
                      <p className={`text-sm font-bold ${isExceeded ? "text-rose-500" : "text-slate-700 dark:text-slate-300"}`}>
                        {isExceeded ? `-$${item.spent - item.amount}` : `$${item.amount - item.spent}`}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
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

                {/* Footer Action Buttons */}
                <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                  <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200">
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

      </div>

      {/* 5. Add / Set Budget Limit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Set Budget Limit</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBudget} className="mt-4 space-y-4">
              
              {/* Category Dropdown */}
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

              {/* Month Input */}
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

              {/* Limit Amount */}
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

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-500"
                >
                  Save Limit
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}