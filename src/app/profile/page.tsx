"use client";

import { CURRENT_STUDENT } from "@/lib/mockData";
import { User, Mail, Shield, Camera, Lock, ShieldCheck, LogOut } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                <p className="text-gray-500 mt-1">Manage your personal information and security settings</p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
                </div>
                <div className="px-8 pb-8">
                    <div className="relative flex flex-col md:flex-row md:items-end gap-6 -mt-12">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl overflow-hidden bg-white">
                                <img
                                    src={CURRENT_STUDENT.avatar}
                                    alt={CURRENT_STUDENT.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="absolute bottom-2 right-2 p-2 bg-indigo-600 text-white rounded-xl border-2 border-white hover:bg-indigo-700 transition-all shadow-lg active:scale-90">
                                <Camera size={16} />
                            </button>
                        </div>

                        <div className="flex-1 mb-2">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">{CURRENT_STUDENT.name}</h2>
                                    <p className="text-gray-500 font-medium flex items-center gap-2 mt-1">
                                        <Mail size={16} className="text-gray-400" />
                                        {CURRENT_STUDENT.email}
                                    </p>
                                </div>
                                <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 transition-all shadow-lg active:scale-95">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Personal Details */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <User size={18} className="text-indigo-600" />
                            Personal Details
                        </h3>
                    </div>
                    <div className="p-8 space-y-6 flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2 tracking-wider">Full Name</label>
                                <div className="flex items-center gap-3 p-3.5 bg-gray-50/50 rounded-xl text-gray-700 border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500/10 focus-within:border-indigo-500/50 transition-all">
                                    <User size={18} className="text-gray-400" />
                                    <span className="font-medium">{CURRENT_STUDENT.name}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2 tracking-wider">Student ID</label>
                                <div className="flex items-center gap-3 p-3.5 bg-gray-50/50 rounded-xl text-gray-700 border border-gray-200">
                                    <Shield size={18} className="text-gray-400" />
                                    <span className="font-medium">{CURRENT_STUDENT.id}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 uppercase mb-2 tracking-wider">Email Address</label>
                            <div className="flex items-center gap-3 p-3.5 bg-gray-50/50 rounded-xl text-gray-700 border border-gray-200">
                                <Mail size={18} className="text-gray-400" />
                                <span className="font-medium">{CURRENT_STUDENT.email}</span>
                                <span className="ml-auto text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">Verified</span>
                            </div>
                        </div>

                        <p className="text-xs text-gray-400 italic">
                            Personal details are managed by the administration. Please contact help desk to request changes.
                        </p>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <Lock size={18} className="text-indigo-600" />
                            Security
                        </h3>
                    </div>
                    <div className="p-8 space-y-6 flex-1">
                        <form className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2 tracking-wider">Current Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 uppercase mb-2 tracking-wider">New Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-sm"
                                />
                            </div>
                            <button type="button" className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]">
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Login Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <ShieldCheck size={18} className="text-indigo-600" />
                            Recent Login Activity
                        </h3>
                    </div>
                    <div className="p-0">
                        {[
                            { device: "Chrome / Windows 11", location: "New York, USA", time: "2 hours ago", status: "Current Session" },
                            { device: "Safari / iPhone 15", location: "New York, USA", time: "Yesterday", status: "Success" },
                            { device: "Chrome / Windows 11", location: "Brooklyn, USA", time: "3 days ago", status: "Success" },
                        ].map((log, i) => (
                            <div key={i} className="flex justify-between items-center px-8 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{log.device}</p>
                                        <p className="text-xs text-gray-500">{log.location}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${log.status === 'Current Session' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 bg-gray-100'}`}>
                                        {log.status}
                                    </span>
                                    <p className="text-xs text-gray-400 mt-1">{log.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Session Security Alert */}
                <div className="bg-red-50 border border-red-100 rounded-2xl p-8 flex flex-col justify-center">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                            <LogOut size={24} />
                        </div>
                        <div>
                            <h3 className="text-red-900 font-bold mb-2">Session Security</h3>
                            <p className="text-sm text-red-700 leading-relaxed">
                                Your session will automatically expire after 30 minutes of inactivity for security reasons.
                                Always log out when using public devices.
                            </p>
                        </div>
                    </div>
                    <button className="mt-8 w-full py-3 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all active:scale-[0.98]">
                        Log Out Now
                    </button>
                </div>
            </div>
        </div>
    );
}
