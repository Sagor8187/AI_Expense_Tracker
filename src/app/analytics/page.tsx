"use client";

import { useState } from "react";
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiPieChart, 
  FiBarChart2, 
  FiCalendar, 
  FiArrowUpRight, 
  FiArrowDownRight, 
  FiDollarSign,
  FiZap,
  FiInfo
} from "react-icons/fi";

// TypeScript Interfaces
interface CategoryData {
  name: string;
  amount: number;
  percentage: number;
  color: string; // Tailwind color class
}

interface MonthlyTrend {
  month: string;
  income: number;
  expense: number;
}

// Sample Static Analytics Data
const monthlyTrends: MonthlyTrend[] = [
  { month: "Mar", income: 3200, expense: 2100 },
  { month: "Apr", income: 3800, expense: 2400 },
  { month: "May", income: 3500, expense: 1900 },
  { month: "Jun", income: 4100, expense: 2800 },
  { month: "Jul", income: 3900, expense: 2200 },
  { month: "Aug", income: 4300, expense: 2580 },
];

const expenseCategories: CategoryData[] = [
  { name: "Food & Groceries", amount: 850, percentage: 33, color: "bg-indigo-500" },
  { name: "Rent & Utilities", amount: 650, percentage: 25, color: "bg-rose-500" },
  { name: "Shopping & Lifestyle", amount: 480, percentage: 19, color: "bg-amber-500" },
  { name: "Entertainment", amount: 350, percentage: 13, color: "bg-emerald-500" },
  { name: "Transportation", amount: 250, percentage: 10, color: "bg-sky-500" },
];

const incomeCategories: CategoryData[] = [
  { name: "Main Salary", amount: 3500, percentage: 81, color: "bg-emerald-500" },
  { name: "Freelance Projects", amount: 800, percentage: 19, color: "bg-indigo-500" },
];

export default function AnalyticsPage() {
  const [selectedRange, setSelectedRange] = useState("2026-08");

  // Highest value for bar height scale calculation
  const maxBarValue = Math.max(...monthlyTrends.map((t) => Math.max(t.income, t.expense)));

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* 1. Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Analytics & Insights
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Visualize your financial growth, spending trends, and category distribution.
            </p>
          </div>

          {/* Date Picker */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 dark:border-slate-800 dark:bg-slate-900">
            <FiCalendar className="ml-2 text-slate-400" />
            <input
              type="month"
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="bg-transparent text-sm font-semibold text-slate-900 focus:outline-none dark:text-white"
            />
          </div>
        </div>

        {/* 2. Key Metrics Grid (4 Cards) */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Total Income Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Total Income
              </span>
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                <FiTrendingUp className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">$4,300.00</p>
            <div className="mt-2 flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <FiArrowUpRight className="mr-0.5" />
              <span>+10.2% vs last month</span>
            </div>
          </div>

          {/* Total Expense Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Total Expenses
              </span>
              <div className="rounded-lg bg-rose-500/10 p-2 text-rose-600 dark:text-rose-400">
                <FiTrendingDown className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">$2,580.00</p>
            <div className="mt-2 flex items-center text-xs font-medium text-rose-600 dark:text-rose-400">
              <FiArrowUpRight className="mr-0.5" />
              <span>+17.2% vs last month</span>
            </div>
          </div>

          {/* Net Savings Rate Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Savings Rate
              </span>
              <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400">
                <FiPieChart className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">40.0%</p>
            <div className="mt-2 flex items-center text-xs font-medium text-slate-500 dark:text-slate-400">
              <span>Saved $1,720.00 this month</span>
            </div>
          </div>

          {/* Average Daily Spend */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Avg. Daily Spend
              </span>
              <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
                <FiDollarSign className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">$83.22</p>
            <div className="mt-2 flex items-center text-xs font-medium text-amber-600 dark:text-amber-400">
              <FiArrowDownRight className="mr-0.5" />
              <span>-4.5% vs last month</span>
            </div>
          </div>

        </div>

        {/* 3. Main Chart Section (Income vs Expense Bar Chart) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Income vs Expense Trend</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Monthly comparison over the last 6 months</p>
            </div>

            {/* Chart Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-slate-700 dark:text-slate-300">Income</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                <span className="text-slate-700 dark:text-slate-300">Expense</span>
              </div>
            </div>
          </div>

          {/* CSS Pure Bar Chart Container */}
          <div className="mt-8 flex h-64 items-end justify-between gap-2 border-b border-slate-200 pb-4 dark:border-slate-800 sm:gap-6">
            {monthlyTrends.map((data, index) => {
              const incomeHeight = Math.round((data.income / maxBarValue) * 100);
              const expenseHeight = Math.round((data.expense / maxBarValue) * 100);

              return (
                <div key={index} className="group relative flex flex-1 flex-col items-center gap-2">
                  
                  {/* Bars Wrapper */}
                  <div className="flex h-full w-full items-end justify-center gap-1.5 sm:gap-2">
                    
                    {/* Income Bar */}
                    <div
                      className="w-full max-w-[20px] rounded-t-md bg-emerald-500 transition-all duration-300 group-hover:bg-emerald-400"
                      style={{ height: `${incomeHeight}%` }}
                    >
                      {/* Tooltip on hover */}
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white opacity-0 shadow transition-opacity group-hover:opacity-100 dark:bg-slate-800">
                        ${data.income}
                      </span>
                    </div>

                    {/* Expense Bar */}
                    <div
                      className="w-full max-w-[20px] rounded-t-md bg-rose-500 transition-all duration-300 group-hover:bg-rose-400"
                      style={{ height: `${expenseHeight}%` }}
                    >
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white opacity-0 shadow transition-opacity group-hover:opacity-100 dark:bg-slate-800">
                        ${data.expense}
                      </span>
                    </div>

                  </div>

                  {/* Month Label */}
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Category Breakdown Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Expense Breakdown */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Expense Breakdown</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Where your money went this month</p>

            <div className="mt-6 space-y-4">
              {expenseCategories.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">{cat.name}</span>
                    <span className="text-slate-900 dark:text-white">${cat.amount} ({cat.percentage}%)</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={`h-full rounded-full ${cat.color}`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Income Breakdown */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Income Sources</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Revenue origins for this month</p>

            <div className="mt-6 space-y-4">
              {incomeCategories.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">{cat.name}</span>
                    <span className="text-slate-900 dark:text-white">${cat.amount} ({cat.percentage}%)</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={`h-full rounded-full ${cat.color}`}
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Smart AI Insight Box */}
            <div className="mt-8 flex items-start gap-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-900/40 dark:bg-indigo-950/20">
              <div className="rounded-lg bg-indigo-600 p-2 text-white">
                <FiZap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-indigo-950 dark:text-indigo-200">AI Spending Insight</h4>
                <p className="mt-0.5 text-xs text-indigo-800 dark:text-indigo-300">
                  Great job! Your savings rate is up by <strong className="font-bold">5%</strong> this month. You spent <strong className="font-bold">12% less on Food & Groceries</strong> compared to July.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}