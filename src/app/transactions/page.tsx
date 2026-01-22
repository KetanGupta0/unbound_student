"use client";

import { useState } from "react";
import { TRANSACTIONS } from "@/lib/mockData";
import { Download, CreditCard, Search } from "lucide-react";

export default function TransactionsPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTransactions = TRANSACTIONS.filter(txn =>
        txn.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
                    <p className="text-gray-500 mt-1">View your payments and download receipts</p>
                </div>

                <div className="relative sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by ID or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all font-medium"
                    />
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50/50 text-gray-400 font-bold uppercase tracking-widest text-[10px] border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5">Transaction ID</th>
                                <th className="px-8 py-5">Description</th>
                                <th className="px-8 py-5">Date</th>
                                <th className="px-8 py-5 text-right">Amount</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-center">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredTransactions.length > 0 ? filteredTransactions.map((txn) => (
                                <tr key={txn.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-5 font-mono text-gray-400 text-xs">{txn.id}</td>
                                    <td className="px-8 py-5 font-bold text-gray-900 whitespace-nowrap">{txn.description}</td>
                                    <td className="px-8 py-5 text-gray-500 font-medium whitespace-nowrap">{txn.date}</td>
                                    <td className="px-8 py-5 text-right font-black text-gray-900">${txn.amount.toFixed(2)}</td>
                                    <td className="px-8 py-5">
                                        <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${txn.status === "Paid" ? "bg-green-50 text-green-700 border border-green-100" :
                                            txn.status === "Rejected" ? "bg-red-50 text-red-700 border border-red-100" :
                                                "bg-amber-50 text-amber-700 border border-amber-100"
                                            }`}>
                                            {txn.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        <button
                                            onClick={() => alert(`Downloading receipt for ${txn.id}`)}
                                            className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all active:scale-90"
                                        >
                                            <Download size={18} />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center text-gray-500 font-medium">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View */}
                <div className="md:hidden divide-y divide-gray-50">
                    {filteredTransactions.length > 0 ? filteredTransactions.map((txn) => (
                        <div key={txn.id} className="p-5 space-y-4">
                            <div className="flex justify-between items-start gap-4">
                                <div className="min-w-0">
                                    <p className="font-bold text-gray-900 text-sm">{txn.description}</p>
                                    <p className="font-mono text-[10px] text-gray-400 mt-0.5 tracking-tighter">{txn.id}</p>
                                </div>
                                <span className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${txn.status === "Paid" ? "bg-green-50 text-green-700 border border-green-100" :
                                    txn.status === "Rejected" ? "bg-red-50 text-red-700 border border-red-100" :
                                        "bg-amber-50 text-amber-700 border border-amber-100"
                                    }`}>
                                    {txn.status}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500 font-bold">{txn.date}</span>
                                <div className="flex items-center gap-4">
                                    <span className="font-black text-gray-900">${txn.amount.toFixed(2)}</span>
                                    <button
                                        onClick={() => alert(`Downloading receipt for ${txn.id}`)}
                                        className="p-2 text-indigo-600 bg-indigo-50 rounded-lg active:scale-95"
                                    >
                                        <Download size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="p-10 text-center">
                            <p className="text-gray-500 font-medium text-sm">No transactions found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
