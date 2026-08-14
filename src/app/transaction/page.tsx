"use client";

import { useState } from "react";
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEdit2, 
  FiTrash2, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiCalendar, 
  FiX, 
  FiChevronLeft, 
  FiChevronRight,
  FiFileText
} from "react-icons/fi";

// TypeScript Types matching DB Schema
interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  note?: string;
}

// Sample Static Data
const initialTransactions: Transaction[] = [
  {
    id: "tx-1",
    title: "Software Engineer Salary",
    amount: 3500,
    type: "income",
    category: "Salary",
    date: "2026-08-10",
    note: "Monthly base salary payout",
  },
  {
    id: "tx-2",
    title: "Grocery Shopping",
    amount: 145.50,
    type: "expense",
    category: "Food",
    date: "2026-08-12",
    note: "Supermarket groceries for the week",
  },
  {
    id: "tx-3",
    title: "Freelance Frontend Project",
    amount: 800,
    type: "income",
    category: "Freelance",
    date: "2026-08-13",
    note: "Next.js dashboard build project",
  },
  {
    id: "tx-4",
    title: "Electricity & Internet Bill",
    amount: 95.00,
    type: "expense",
    category: "Utilities",
    date: "2026-08-14",
    note: "Broadband and electric power bills",
  },
  {
    id: "tx-5",
    title: "Coffee Shop & Snacks",
    amount: 18.25,
    type: "expense",
    category: "Food",
    date: "2026-08-14",
  },
];

const categories = ["All Categories", "Salary", "Freelance", "Food", "Utilities", "Entertainment", "Health"];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "income" | "expense">("all");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for Adding New Transaction
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    note: "",
  });

  // Filter Logic
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tx.note?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || tx.type === selectedType;
    const matchesCategory = selectedCategory === "All Categories" || tx.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  // Handle Form Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Mock Submit (Static)
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: formData.title,
      amount: parseFloat(formData.amount) || 0,
      type: formData.type as "income" | "expense",
      category: formData.category,
      date: formData.date,
      note: formData.note,
    };

    setTransactions([newTx, ...transactions]);
    setIsModalOpen(false);
    setFormData({ title: "", amount: "", type: "expense", category: "Food", date: new Date().toISOString().split("T")[0], note: "" });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* 1. Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Transactions
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Manage and track all your income and expenses in one place.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:bg-indigo-500 active:scale-95"
          >
            <FiPlus className="h-5 w-5" />
            Add Transaction
          </button>
        </div>

        {/* 2. Quick Summary Strip */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Income</span>
              <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
                <FiTrendingUp className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">$4,300.00</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Expenses</span>
              <div className="rounded-lg bg-rose-500/10 p-2 text-rose-600 dark:text-rose-400">
                <FiTrendingDown className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">$258.75</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Net Balance</span>
              <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400">
                <FiFileText className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">$4,041.25</p>
          </div>
        </div>

        {/* 3. Search & Filter Bar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions or notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:placeholder-slate-500"
            />
          </div>

          {/* Type Toggle */}
          <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            {(["all", "income", "expense"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                  selectedType === type
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="relative min-w-[160px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pl-3.5 pr-8 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <FiFilter className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        {/* 4. Transactions Data Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-semibold">Title & Note</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold text-right">Amount</th>
                  <th className="px-6 py-4 font-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      
                      {/* Title & Note */}
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900 dark:text-white">{tx.title}</p>
                        {tx.note && <p className="text-xs text-slate-500 dark:text-slate-400">{tx.note}</p>}
                      </td>

                      {/* Category Badge */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {tx.category}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <FiCalendar className="h-4 w-4 text-slate-400" />
                          <span>{tx.date}</span>
                        </div>
                      </td>

                      {/* Type Badge */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            tx.type === "income"
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {tx.type === "income" ? <FiTrendingUp /> : <FiTrendingDown />}
                          <span className="capitalize">{tx.type}</span>
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4 text-right font-bold">
                        <span className={tx.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"}>
                          {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200">
                            <FiEdit2 className="h-4 w-4" />
                          </button>
                          <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/50 dark:hover:text-rose-400">
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 5. Pagination Bar */}
          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Showing <span className="font-semibold text-slate-900 dark:text-white">1</span> to{" "}
              <span className="font-semibold text-slate-900 dark:text-white">{filteredTransactions.length}</span> of{" "}
              <span className="font-semibold text-slate-900 dark:text-white">{filteredTransactions.length}</span> entries
            </p>
            <div className="flex items-center gap-2">
              <button disabled className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-400 disabled:opacity-50 dark:border-slate-800">
                <FiChevronLeft /> Previous
              </button>
              <button disabled className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-400 disabled:opacity-50 dark:border-slate-800">
                Next <FiChevronRight />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 6. Add Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add New Transaction</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="mt-4 space-y-4">
              
              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: "expense" })}
                  className={`rounded-lg py-2 text-xs font-bold transition-all ${
                    formData.type === "expense"
                      ? "bg-rose-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: "income" })}
                  className={`rounded-lg py-2 text-xs font-bold transition-all ${
                    formData.type === "income"
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Income
                </button>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Salary, Groceries"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Amount & Category Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Amount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="amount"
                    required
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  >
                    {categories.filter(c => c !== "All Categories").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Input */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleInputChange}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              {/* Note Input */}
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">Note (Optional)</label>
                <textarea
                  name="note"
                  rows={2}
                  placeholder="Additional details..."
                  value={formData.note}
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
                  Save Transaction
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}