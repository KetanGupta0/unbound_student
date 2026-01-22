"use client";

import { Bell, Info, AlertTriangle, Calendar, CheckCircle2 } from "lucide-react";
import { NOTICES } from "@/lib/mockData";

export default function NotificationsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Notifications</h1>
                    <p className="text-gray-500 mt-1 font-medium">Stay updated with your academic and system alerts</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2">
                    <CheckCircle2 size={18} />
                    Mark all as read
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-50">
                    {NOTICES.length > 0 ? (
                        NOTICES.map((n) => (
                            <div key={n.id} className={`p-6 flex gap-4 transition-colors hover:bg-gray-50/50 ${!n.isRead ? 'bg-indigo-50/20' : ''}`}>
                                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${n.type === 'system' ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-indigo-600'
                                    }`}>
                                    {n.type === 'system' ? <AlertTriangle size={24} /> : <Calendar size={24} />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className={`font-bold ${!n.isRead ? 'text-gray-900' : 'text-gray-700'}`}>{n.title}</h3>
                                        <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                                            <Bell size={12} />
                                            {n.date}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 mt-1 text-sm leading-relaxed">{n.content}</p>
                                    <div className="mt-4 flex items-center gap-3">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${n.type === 'system' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                                            }`}>
                                            {n.type}
                                        </span>
                                        {!n.isRead && (
                                            <button className="text-xs font-bold text-indigo-600 hover:underline">
                                                Mark as read
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-20 text-center">
                            <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Bell className="text-gray-300" size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">No notifications</h3>
                            <p className="text-gray-500 mt-1">We'll notify you when something important happens.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
