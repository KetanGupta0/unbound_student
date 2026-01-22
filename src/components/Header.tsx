"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Menu, User, LogOut, Settings, ChevronDown, Check } from "lucide-react";
import { CURRENT_STUDENT, NOTICES } from "@/lib/mockData";
import { useSidebar } from "@/components/SidebarProvider";
import Link from "next/link";

export default function Header() {
    const { toggle } = useSidebar();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const notificationRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    // Close dropdowns on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setShowProfile(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const recentNotifications = NOTICES.slice(0, 5);
    const unreadCount = NOTICES.filter(n => !n.isRead).length;

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 fixed top-0 left-0 right-0 md:left-64 z-40 transition-all duration-300">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggle}
                    className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg md:hidden flex-shrink-0"
                >
                    <Menu size={24} />
                </button>

                <Link href="/" className="md:hidden">
                    <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-black text-xl">S</span>
                    </div>
                </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 ml-auto flex-shrink-0">
                {/* Notifications Dropdown */}
                <div className="relative" ref={notificationRef}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-all ${showNotifications ? 'bg-gray-100 text-indigo-600' : ''}`}
                    >
                        <Bell size={21} />
                        {unreadCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-3 w-80 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                            <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                                <h3 className="font-bold text-gray-900">Notifications</h3>
                                <button className="text-xs font-bold text-indigo-600 hover:underline">Mark all as read</button>
                            </div>
                            <div className="max-h-[400px] overflow-y-auto">
                                {recentNotifications.map((n) => (
                                    <div key={n.id} className={`p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 flex gap-3 ${!n.isRead ? 'bg-indigo-50/30' : ''}`}>
                                        <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${!n.isRead ? 'bg-indigo-600' : 'bg-transparent'}`}></div>
                                        <div>
                                            <p className={`text-xs font-bold ${!n.isRead ? 'text-gray-900' : 'text-gray-600'}`}>{n.title}</p>
                                            <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{n.content}</p>
                                            <p className="text-[10px] text-gray-400 mt-1 font-medium">{n.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/notifications"
                                onClick={() => setShowNotifications(false)}
                                className="block p-3 text-center text-xs font-bold text-indigo-600 hover:bg-indigo-50 border-t border-gray-50 transition-colors"
                            >
                                View all notifications
                            </Link>
                        </div>
                    )}
                </div>

                <div className="h-6 w-full max-w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="flex items-center gap-3 p-1 hover:bg-gray-100 rounded-xl transition-all group"
                    >
                        <div className="relative">
                            <img
                                src={CURRENT_STUDENT.avatar}
                                alt="Profile"
                                className="w-8 h-8 md:w-9 md:h-9 rounded-xl border-2 border-gray-100 object-cover shadow-sm group-hover:border-indigo-200 transition-all"
                            />
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="text-left hidden lg:block pr-2">
                            <p className="text-xs font-black text-gray-900 line-clamp-1">{CURRENT_STUDENT.name}</p>
                            <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-tighter">Student</p>
                        </div>
                        <ChevronDown size={14} className={`text-gray-400 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
                    </button>

                    {showProfile && (
                        <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                            <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Student Account</p>
                                <p className="text-sm font-black text-gray-900 truncate mt-1">{CURRENT_STUDENT.name}</p>
                                <p className="text-[11px] text-gray-500 font-medium truncate italic">{CURRENT_STUDENT.email}</p>
                            </div>
                            <div className="p-2">
                                <Link
                                    href="/profile"
                                    onClick={() => setShowProfile(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                                >
                                    <User size={18} />
                                    My Profile
                                </Link>
                                <Link
                                    href="/profile"
                                    onClick={() => setShowProfile(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                                >
                                    <Settings size={18} />
                                    Account Settings
                                </Link>
                            </div>
                            <div className="p-2 border-t border-gray-50">
                                <button className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all">
                                    <LogOut size={18} />
                                    Log out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
