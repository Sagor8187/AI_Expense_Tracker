"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FiArrowRight, 
  FiCheckCircle, 
  FiPieChart, 
  FiZap, 
  FiShield, 
  FiTrendingUp, 
  FiBarChart2, 
  FiMenu, 
  FiX,
  FiLock,
  FiCpu
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            
            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-4 py-1.5 text-xs font-bold text-indigo-700 dark:border-indigo-900/50 dark:bg-indigo-950/50 dark:text-indigo-300">
              <HiSparkles className="h-4 w-4 text-indigo-600" />
              <span>Next-Gen Financial Intelligence</span>
            </div>

            {/* Main Title */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
              Master Your Money with <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI-Powered Insights
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              Take complete control of your personal finances. Track income, manage category budgets, and receive automated AI recommendations to maximize your savings.
            </p>

            {/* Hero CTA Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 active:scale-95 sm:w-auto"
              >
                Start Free Trial
                <FiArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-bold text-slate-800 shadow-sm transition-all hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
              >
                Live Demo Dashboard
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5"><FiCheckCircle className="text-emerald-500" /> No credit card required</span>
              <span className="flex items-center gap-1.5"><FiCheckCircle className="text-emerald-500" /> Free 14-day trial</span>
            </div>

          </div>

          {/* App Interactive Preview Card / Mockup */}
          <div className="mt-12 rounded-3xl border border-slate-200/80 bg-white/60 p-3 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60 lg:mt-16 sm:p-5">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 p-4 text-white dark:border-slate-800 sm:p-8">
              
              {/* Preview Top Header */}
              <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-xs font-semibold text-indigo-400">DASHBOARD PREVIEW</span>
                  <h3 className="text-xl font-bold">Financial Overview</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-indigo-500/20 px-3 py-1.5 text-xs font-semibold text-indigo-300">
                    Net Balance: $4,041.25
                  </div>
                  <div className="rounded-xl bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                    +12.5% Savings
                  </div>
                </div>
              </div>

              {/* Preview Content Grid */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-800/60 p-4">
                  <p className="text-xs text-slate-400">Total Monthly Income</p>
                  <p className="mt-1 text-2xl font-bold text-emerald-400">$4,300.00</p>
                </div>
                <div className="rounded-xl bg-slate-800/60 p-4">
                  <p className="text-xs text-slate-400">Total Monthly Expenses</p>
                  <p className="mt-1 text-2xl font-bold text-rose-400">$258.75</p>
                </div>
                <div className="rounded-xl bg-indigo-950/60 border border-indigo-800/40 p-4">
                  <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold">
                    <FiZap /> AI Recommendation
                  </div>
                  <p className="mt-1 text-xs text-slate-300">
                    Food budget is down 10%. You are on track to save $1,200 this month!
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. Features Section */}
      <section id="features" className="border-t border-slate-200 bg-white py-20 dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Powerful Features
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Everything you need to manage your money
            </p>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Built with cutting-edge tech stack for maximum speed and simplicity.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Feature 1 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
                <FiZap className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">AI Spending Insights</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Automated analysis of your spending habits with smart advice to cut unnecessary expenses.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-600 text-white shadow-md">
                <FiPieChart className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">Budget Limits & Alerts</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Set category-wise monthly spending limits and receive real-time warnings before you overspend.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
                <FiBarChart2 className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">Monthly Analytics</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Visual charts and category breakdowns comparing month-to-month income vs expense ratios.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-600 text-white shadow-md">
                <FiTrendingUp className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">Income & Expense Tracking</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Filter, search, and paginate through all your past transactions with instant category tagging.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md">
                <FiLock className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">JWT Authentication</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Bank-grade secure login and token encryption guaranteeing your financial data stays confidential.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-950">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-600 text-white shadow-md">
                <FiCpu className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">Modern Tech Stack</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Powered by Next.js App Router, Redux Toolkit, Tailwind CSS, Express, and MongoDB.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Simple Workflow
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
              Get started in 3 easy steps
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            
            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 font-extrabold text-2xl text-white shadow-lg shadow-indigo-500/30">
                1
              </div>
              <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">Create Account</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Register in less than 30 seconds with email authentication.
              </p>
            </div>

            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 font-extrabold text-2xl text-white shadow-lg shadow-indigo-500/30">
                2
              </div>
              <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">Log Transactions</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Add daily income and expenses with simple categories and amounts.
              </p>
            </div>

            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 font-extrabold text-2xl text-white shadow-lg shadow-indigo-500/30">
                3
              </div>
              <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">Optimize & Save</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Track real-time budget status and receive AI suggestions to save money.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Call To Action (CTA) Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 px-6 py-12 text-center text-white shadow-2xl sm:p-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Ready to take control of your money?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-indigo-100">
              Join thousands of users organizing their daily spending and reaching their financial savings goals faster.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-bold text-slate-900 shadow-lg transition-all hover:bg-slate-100 active:scale-95"
              >
                Create Free Account
                <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 font-extrabold text-lg">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <HiSparkles className="h-5 w-5" />
            </div>
            <span>AI Expense Tracker</span>
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            © 2026 AI Expense Tracker. Built with Next.js & Redux Toolkit. All rights reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}