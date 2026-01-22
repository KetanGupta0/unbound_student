"use client";

import { useState } from "react";
import { MATERIALS, COURSES } from "@/lib/mockData";
import { FileText, Download, Filter, Search } from "lucide-react";

export default function MaterialsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCourseId, setSelectedCourseId] = useState("All");

    const filteredMaterials = MATERIALS.filter(m => {
        const course = COURSES.find(c => c.id === m.courseId);
        const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCourse = selectedCourseId === "All" || m.courseId === selectedCourseId;
        return course?.isEnrolled && !course?.isBanned && m.status === 'Approved' && matchesSearch && matchesCourse;
    });

    const enrolledCourses = COURSES.filter(c => c.isEnrolled && !c.isBanned);

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-6">
                <div className="mb-2 lg:mb-0">
                    <h1 className="text-2xl font-bold text-gray-900">Study Materials</h1>
                    <p className="text-gray-500 mt-1">Access resources shared by your instructors</p>
                </div>

                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search materials..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
                        />
                    </div>

                    <div className="relative">
                        <select
                            value={selectedCourseId}
                            onChange={(e) => setSelectedCourseId(e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2 w-full md:w-auto border border-gray-200 rounded-xl text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all shadow-sm"
                        >
                            <option value="All">All Courses</option>
                            {enrolledCourses.map(c => (
                                <option key={c.id} value={c.id}>{c.title}</option>
                            ))}
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                </div>
            </div>

            {filteredMaterials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMaterials.map((material) => {
                        const course = COURSES.find(c => c.id === material.courseId);
                        return (
                            <div key={material.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                                        <FileText size={24} />
                                    </div>
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-lg">{material.type}</span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-1">{material.title}</h3>
                                <p className="text-sm font-medium text-indigo-600 mb-2">{course?.title}</p>
                                <p className="text-sm text-gray-500 mb-6 line-clamp-2">{material.description}</p>

                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-xs text-gray-400 font-bold uppercase tracking-tighter">{material.size}</span>
                                    <button
                                        onClick={() => alert(`Starting download for: ${material.title}`)}
                                        className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 active:scale-95 transition-all"
                                    >
                                        <Download size={16} />
                                        Download
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-gray-100 py-20 text-center">
                    <FileText className="text-gray-200 mx-auto mb-4" size={48} />
                    <h3 className="text-lg font-bold text-gray-900">No materials found</h3>
                    <p className="text-gray-500">No resources match your current selection.</p>
                </div>
            )}
        </div>
    );
}
