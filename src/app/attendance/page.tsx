"use client";

import { useState } from "react";
import { ATTENDANCE_HISTORY, COURSES } from "@/lib/mockData";
import { CheckCircle, XCircle, Clock, Filter, Calendar, TrendingUp } from "lucide-react";

export default function AttendancePage() {
    const [selectedCourseId, setSelectedCourseId] = useState("All");

    const enrolledCourses = COURSES.filter(c => c.isEnrolled && !c.isBanned);

    const filteredHistory = ATTENDANCE_HISTORY.filter(a =>
        selectedCourseId === "All" || a.courseId === selectedCourseId
    );

    const totalFiltered = filteredHistory.length;
    const presentFiltered = filteredHistory.filter(a => a.status === "Present" || a.status === "Late").length;
    const attendancePercentage = totalFiltered > 0 ? Math.round((presentFiltered / totalFiltered) * 100) : 0;

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Attendance Records</h1>
                    <p className="text-gray-500 mt-1">Track your class attendance and punctuality</p>
                </div>

                <div className="relative">
                    <select
                        value={selectedCourseId}
                        onChange={(e) => setSelectedCourseId(e.target.value)}
                        className="appearance-none pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 bg-white hover:bg-gray-50 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all shadow-sm"
                    >
                        <option value="All">All Courses</option>
                        {enrolledCourses.map(c => (
                            <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                    </select>
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={16} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-50" />
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={440}
                                strokeDashoffset={440 - (440 * attendancePercentage) / 100}
                                className={`text-indigo-600 transition-all duration-1000 ease-out`}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-gray-900">{attendancePercentage}%</span>
                            <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">Overall</span>
                        </div>
                    </div>
                    <p className="mt-6 text-sm font-bold text-gray-500 text-center">
                        {presentFiltered} of {totalFiltered} sessions attended
                    </p>
                </div>

                <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <TrendingUp size={20} className="text-indigo-600" />
                        Attendance Trend
                    </h3>
                    <div className="flex items-end justify-between h-40 gap-3">
                        {[80, 100, 90, 70, 100, 85, 95].map((val, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                <div
                                    className="w-full bg-indigo-50 rounded-xl group-hover:bg-indigo-600 transition-all duration-300 relative"
                                    style={{ height: `${val}%` }}
                                >
                                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-black text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-1.5 py-0.5 rounded shadow-sm border border-indigo-100">
                                        {val}%
                                    </span>
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Day {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Detailed History</h3>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing {filteredHistory.length} logs</span>
                </div>
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white text-gray-400 font-bold uppercase tracking-widest text-[10px] border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5">Date</th>
                                <th className="px-8 py-5">Course Module</th>
                                <th className="px-8 py-5">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredHistory.length > 0 ? filteredHistory.map((record) => {
                                const course = COURSES.find(c => c.id === record.courseId);
                                return (
                                    <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-5 font-bold text-gray-900">{record.date}</td>
                                        <td className="px-8 py-5 text-gray-600 font-medium">{course?.title || "Unknown Course"}</td>
                                        <td className="px-8 py-5">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${record.status === 'Present' ? 'bg-green-50 text-green-700 border border-green-100' :
                                                record.status === 'Absent' ? 'bg-red-50 text-red-700 border border-red-100' :
                                                    'bg-amber-50 text-amber-700 border border-amber-100'
                                                }`}>
                                                {record.status === 'Present' && <CheckCircle size={14} />}
                                                {record.status === 'Absent' && <XCircle size={14} />}
                                                {record.status === 'Late' && <Clock size={14} />}
                                                {record.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan={3} className="px-8 py-20 text-center">
                                        <p className="text-gray-500 font-medium">No records found for this course.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="md:hidden divide-y divide-gray-50">
                    {filteredHistory.length > 0 ? filteredHistory.map((record) => {
                        const course = COURSES.find(c => c.id === record.courseId);
                        return (
                            <div key={record.id} className="p-4 flex justify-between items-center gap-4">
                                <div className="min-w-0">
                                    <p className="font-bold text-gray-900 text-sm truncate">{course?.title || "Unknown Course"}</p>
                                    <p className="text-xs text-gray-500 font-medium mt-1">{record.date}</p>
                                </div>
                                <span className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${record.status === 'Present' ? 'bg-green-50 text-green-700 border border-green-100' :
                                    record.status === 'Absent' ? 'bg-red-50 text-red-700 border border-red-100' :
                                        'bg-amber-50 text-amber-700 border border-amber-100'
                                    }`}>
                                    {record.status}
                                </span>
                            </div>
                        );
                    }) : (
                        <div className="p-10 text-center">
                            <p className="text-gray-500 font-medium text-sm">No records found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
