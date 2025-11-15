"use client";

import React, { useEffect, useMemo, useState } from "react";

// MobileSpendingTracker.tsx
// Single-file React component (default export) styled with TailwindCSS.
// Features:
// - Add expense (title, amount, category, date, payment mode)
// - List of expenses with delete
// - Month selector (All / specific month)
// - Summary totals (Today, This Month)
// - Category breakdown with a simple SVG bar chart
// - Export CSV and clear all data
// - Persists to localStorage (key: 'mst_data_v1')

const STORAGE_KEY = "mst_data_v1";

const DEFAULT_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Other",
];

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  mode: string;
  createdAt: string;
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);
}

export default function MobileSpendingTracker() {
  const [data, setData] = useState<Expense[]>([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [mode, setMode] = useState("Cash");
  const [filterMonth, setFilterMonth] = useState("all");
  const [categories] = useState(DEFAULT_CATEGORIES);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setData(JSON.parse(raw));
      } catch (e) {
        console.warn("Failed to parse stored data", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!title.trim() || Number.isNaN(amt) || amt <= 0) return;

    const entry: Expense = {
      id: uid(),
      title: title.trim(),
      amount: Math.round(amt * 100) / 100,
      category,
      date, // YYYY-MM-DD
      mode,
      createdAt: new Date().toISOString(),
    };

    setData((d) => [entry, ...d]);
    setTitle("");
    setAmount("");
    setCategory(DEFAULT_CATEGORIES[0]);
    setMode("Cash");
    setDate(new Date().toISOString().slice(0, 10));
  };

  const deleteExpense = (id: string) => {
    setData((d) => d.filter((x) => x.id !== id));
  };

  const clearAll = () => {
    if (confirm("Clear all expenses? This cannot be undone.")) setData([]);
  };

  const exportCSV = () => {
    const rows = [
      ["id", "title", "amount", "category", "date", "mode", "createdAt"],
      ...data.map((r) => [r.id, r.title, r.amount.toString(), r.category, r.date, r.mode, r.createdAt]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `spending_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const months = useMemo(() => {
    const set = new Set<string>();
    data.forEach((d) => set.add(d.date.slice(0, 7)));
    return Array.from(set).sort((a, b) => b.localeCompare(a));
  }, [data]);

  const filteredData = useMemo(() => {
    if (filterMonth === "all") return data;
    return data.filter((d) => d.date.slice(0, 7) === filterMonth);
  }, [data, filterMonth]);

  const totals = useMemo(() => {
    const totalAll = data.reduce((s, r) => s + Number(r.amount), 0);
    const totalFiltered = filteredData.reduce((s, r) => s + Number(r.amount), 0);
    const todayKey = new Date().toISOString().slice(0, 10);
    const totalToday = data.filter((r) => r.date === todayKey).reduce((s, r) => s + Number(r.amount), 0);
    const byCategory: Record<string, number> = {};
    filteredData.forEach((r) => {
      byCategory[r.category] = (byCategory[r.category] || 0) + Number(r.amount);
    });
    return { totalAll, totalFiltered, totalToday, byCategory };
  }, [data, filteredData]);

  const categoryEntries = useMemo(() => {
    return categories.map((c) => ({ name: c, value: totals.byCategory[c] || 0 }));
  }, [categories, totals.byCategory]);

  const maxCat = Math.max(...categoryEntries.map((c) => c.value), 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 max-w-md mx-auto text-slate-900">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-slate-900">Spending Tracker</h1>
        <div className="text-right text-sm">
          <div className="font-semibold text-slate-900">{formatCurrency(totals.totalFiltered)}</div>
          <div className="text-xs text-slate-600">Visible total</div>
        </div>
      </header>

      <form onSubmit={addExpense} className="bg-white p-3 rounded-2xl shadow-sm mb-4">
        <div className="flex gap-2 mb-2">
          <input
            className="flex-1 p-2 rounded-lg border border-slate-300 text-slate-900 placeholder:text-slate-400"
            placeholder="What did you buy?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="w-28 p-2 rounded-lg border border-slate-300 text-right text-slate-900 placeholder:text-slate-400"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputMode="decimal"
          />
        </div>
        <div className="flex gap-2 mb-2">
          <select className="flex-1 p-2 rounded-lg border border-slate-300 text-slate-900" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input className="p-2 rounded-lg border border-slate-300 w-36 text-slate-900" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="flex items-center gap-2 mb-2">
          <select className="p-2 rounded-lg border border-slate-300 text-slate-900" value={mode} onChange={(e) => setMode(e.target.value)}>
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
            <option>Netbanking</option>
          </select>
          <button type="submit" className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-sm font-medium transition-colors">
            Add
          </button>
        </div>
      </form>

      <section className="mb-4">
        <div className="flex gap-2 items-center mb-2">
          <label className="text-sm font-medium text-slate-700">Month</label>
          <select className="p-2 rounded-lg border border-slate-300 flex-1 text-slate-900" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)}>
            <option value="all">All</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <button onClick={() => setFilterMonth("all")} className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">
            reset
          </button>
        </div>
        <div className="bg-white p-3 rounded-2xl shadow-sm">
          <div className="flex justify-between mb-1">
            <div className="text-sm text-slate-600">Today</div>
            <div className="font-semibold text-slate-900">{formatCurrency(totals.totalToday)}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-slate-600">Visible</div>
            <div className="font-semibold text-slate-900">{formatCurrency(totals.totalFiltered)}</div>
          </div>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-sm font-semibold mb-2 text-slate-900">By Category</h2>
        <div className="bg-white p-3 rounded-2xl shadow-sm">
          {categoryEntries.every((c) => c.value === 0) ? (
            <div className="text-sm text-slate-600">No data for selected month</div>
          ) : (
            <div className="space-y-3">
              {categoryEntries.map((c) => (
                <div key={c.name} className="flex items-center gap-2">
                  <div className="w-20 text-xs font-medium text-slate-700">{c.name}</div>
                  <div className="flex-1 h-6 rounded overflow-hidden bg-slate-100">
                    <div
                      className="h-6 rounded bg-indigo-500"
                      style={{ width: `${maxCat > 0 ? (c.value / maxCat) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="w-20 text-right text-sm font-medium text-slate-900">{formatCurrency(c.value)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mb-24">
        <h2 className="text-sm font-semibold mb-2 text-slate-900">Transactions</h2>
        <div className="space-y-2">
          {filteredData.length === 0 && <div className="text-sm text-slate-600">No transactions</div>}
          {filteredData.map((t) => (
            <div key={t.id} className="bg-white p-3 rounded-2xl shadow-sm flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">{t.title}</div>
                <div className="text-xs text-slate-600">{t.category} • {t.date} • {t.mode}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-slate-900">{formatCurrency(t.amount)}</div>
                <button onClick={() => deleteExpense(t.id)} className="text-xs text-red-600 hover:text-red-700 mt-1 font-medium">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <nav className="fixed bottom-4 left-4 right-4 max-w-md mx-auto flex gap-2">
        <button onClick={exportCSV} className="flex-1 bg-white p-3 rounded-2xl shadow text-sm font-medium text-slate-900 hover:bg-slate-50 transition-colors">Export CSV</button>
        <button onClick={clearAll} className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-2xl shadow text-sm font-medium transition-colors">Clear</button>
      </nav>
    </div>
  );
}

