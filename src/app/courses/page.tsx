"use client";

import { useState } from "react";
import { COURSES } from "@/lib/mockData";
import CourseCard from "@/components/CourseCard";
import { Search, Filter } from "lucide-react";

export default function CoursesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredCourses = COURSES.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || c.status === selectedCategory;
        return c.isEnrolled && matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
                    <p className="text-gray-500 mt-1">Manage and access your enrolled courses</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1 sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by course or instructor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                        {["All", "Active", "Completed", "Archived"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${selectedCategory === cat
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                        : "bg-white text-gray-600 border border-gray-100 hover:border-indigo-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-3xl border border-gray-100 py-20 text-center">
                    <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="text-gray-300" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">No courses found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                    <button
                        onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                        className="mt-6 text-indigo-600 font-bold hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
}
