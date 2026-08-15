"use client";

import Link from "next/link";
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiDollarSign, 
  FiPieChart, 
  FiPlus, 
  FiArrowRight, 
  FiCreditCard, 
  FiCalendar,
  FiZap,
  FiAlertCircle
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

// Sample Static Data for Recent Transactions
const recentTransactions = [
  {
    id: "tx-1",
    title: "Software Engineer Salary",
    category: "Salary",
    amount: 3500,
    type: "income",
    date: "Aug 10, 2026",
  },
  {
    id: "tx-2",
    title: "Grocery Shopping",
    category: "Food",
    amount: 145.5,
    type: "expense",
    date: "Aug 12, 2026",
  },
  {
    id: "tx-3",
    title: "Freelance Project",
    category: "Freelance",
    amount: 800,
    type: "income",
    date: "Aug 13, 2026",
  },
  {
    id: "tx-4",
    title: "Electricity & Internet Bill",
    category: "Utilities",
    amount: 95.0,
    type: "expense",
    date: "Aug 14, 2026",
  },
];

// Sample Category Budget Quick Progress Data
const budgetOverview = [
  { category: "Food & Groceries", spent: 385, limit: 500, percentage: 77, color: "bg-indigo-600" },
  { category: "Utilities & Bills", spent: 240, limit: 250, percentage: 96, color: "bg-amber-500" },
  { category: "Entertainment", spent: 175, limit: 150, percentage: 116, color: "bg-rose-500" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* 1. Welcome Banner Header */}
        <div className="flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 p-6 text-white shadow-xl shadow-indigo-500/10 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-200">
              <HiSparkles className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">AI Financial Assistant</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back, Sagor! 👋
            </h1>
            <p className="mt-1 text-sm text-indigo-100/80">
              Here is your overall financial health and expense summary for August 2026.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/transactions"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
            >
              <FiPlus className="h-4 w-4" />
              Add Expense
            </Link>
            <Link
              href="/budgets"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-md transition-all hover:bg-slate-100 active:scale-95"
            >
              Set Budget
            </Link>
          </div>
        </div>

        {/* 2. Top Summary Metric Cards (4 Grid) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Net Balance */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Total Balance
              </span>
              <div className="rounded-xl bg-indigo-500/10 p-2.5 text-indigo-600 dark:text-indigo-400">
                <FiDollarSign className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white">$4,041.25</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">+12.5% from last month</p>
          </div>

          {/* Total Income */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Monthly Income
              </span>
              <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:text-emerald-400">
                <FiTrendingUp className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white">$4,300.00</p>
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">2 Income Sources</p>
          </div>

          {/* Total Expense */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Monthly Expenses
              </span>
              <div className="rounded-xl bg-rose-500/10 p-2.5 text-rose-600 dark:text-rose-400">
                <FiTrendingDown className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white">$258.75</p>
            <p className="mt-1 text-xs text-rose-600 dark:text-rose-400">15% of budget used</p>
          </div>

          {/* Active Budget Usage */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Active Budget
              </span>
              <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-600 dark:text-amber-400">
                <FiPieChart className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white">$1,500.00</p>
            <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">1 Budget Warning</p>
          </div>

        </div>

        {/* 3. Main Content Layout (2 Columns) */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Left Column (2 Cols wide on large screen): Recent Transactions & Spending Trend */}
          <div className="space-y-6 lg:col-span-2">
            
            {/* Recent Transactions List */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Transactions</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Your latest income and expenses</p>
                </div>
                <Link
                  href="/transaction"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  View All <FiArrowRight />
                </Link>
              </div>

              {/* Transactions Table / List */}
              <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold ${
                          tx.type === "income"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {tx.type === "income" ? <FiTrendingUp className="h-5 w-5" /> : <FiTrendingDown className="h-5 w-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{tx.title}</p>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{tx.category} • {tx.date}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p
                        className={`text-sm font-bold ${
                          tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Analytics Visual Highlight */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Monthly Overview</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Expense vs Income distribution</p>
                </div>
                <Link
                  href="/analytics"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Full Analytics <FiArrowRight />
                </Link>
              </div>

              {/* Progress Summary Bar */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                  <span>Income vs Expense ratio</span>
                  <span>6% Spent</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-full bg-emerald-500" style={{ width: "94%" }} />
                </div>
                <div className="flex items-center justify-between pt-2 text-xs font-medium">
                  <span className="text-emerald-600 dark:text-emerald-400">● Income: $4,300</span>
                  <span className="text-rose-600 dark:text-rose-400">● Expenses: $258.75</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (1 Col wide): AI Insights & Budget Status */}
          <div className="space-y-6">

            {/* AI Assistant Insight Widget */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-6 dark:border-indigo-900/40 dark:bg-indigo-950/30">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
                  <FiZap className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-indigo-950 dark:text-indigo-200">
                  Smart AI Recommendation
                </h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-indigo-900/80 dark:text-indigo-300">
                You are on track to save <strong className="font-bold text-indigo-950 dark:text-white">$1,200</strong> this month! Your entertainment spending is slightly high, but food expenses are down by 10%.
              </p>
              <div className="mt-4 pt-3 border-t border-indigo-200/50 dark:border-indigo-900/50">
                <Link
                  href="/analytics"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
                >
                  Get detailed AI advice <FiArrowRight />
                </Link>
              </div>
            </div>

            {/* Budget Progress Quick Tracker */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">Budget Limits</h2>
                <Link
                  href="/budgets"
                  className="text-xs font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Manage
                </Link>
              </div>

              <div className="mt-4 space-y-4">
                {budgetOverview.map((b, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">{b.category}</span>
                      <span className={b.percentage > 100 ? "text-rose-600 dark:text-rose-400" : "text-slate-900 dark:text-white"}>
                        ${b.spent} / ${b.limit}
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className={`h-full rounded-full ${b.color}`}
                        style={{ width: `${Math.min(b.percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Quick Actions</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link
                  href="/transaction"
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-xs font-semibold text-slate-700 transition-all hover:border-indigo-500 hover:bg-indigo-50/50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-950/20 dark:hover:text-indigo-400"
                >
                  <FiCreditCard className="h-5 w-5 text-indigo-500" />
                  <span>Transactions</span>
                </Link>
                <Link
                  href="/budgets"
                  className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-xs font-semibold text-slate-700 transition-all hover:border-indigo-500 hover:bg-indigo-50/50 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-indigo-500/50 dark:hover:bg-indigo-950/20 dark:hover:text-indigo-400"
                >
                  <FiPieChart className="h-5 w-5 text-indigo-500" />
                  <span>Budgets</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}