import Link from "next/link";
import { ArrowRight, User, Star } from "lucide-react";
import { REVIEWS, CURRENT_STUDENT } from "@/lib/mockData";

interface CourseCardProps {
    id: string;
    title: string;
    instructor: string;
    progress: number;
    status: string;
    thumbnail: string;
    totalClasses: number;
    attendedClasses: number;
    isBanned?: boolean;
}

export default function CourseCard({ course }: { course: CourseCardProps }) {
    const personalReview = REVIEWS.find(r => r.courseId === course.id && r.studentId === CURRENT_STUDENT.id);

    return (
        <div className={`bg-white rounded-xl border shadow-sm transition-all duration-200 overflow-hidden flex flex-col h-full group ${course.isBanned ? 'border-amber-200 grayscale-[0.5]' : 'border-gray-100 hover:shadow-md'}`}>
            <div className="relative h-48 overflow-hidden">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                    {course.isBanned && (
                        <span className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-amber-500 text-white rounded-full shadow-lg items-center">
                            Banned
                        </span>
                    )}
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${course.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                        }`}>
                        {course.status}
                    </span>
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-2">{course.title}</h3>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <User size={16} className="mr-2" />
                        {course.instructor}
                    </div>
                    {personalReview && (
                        <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100 shadow-sm">
                            <Star size={12} className="text-amber-500 fill-amber-500" />
                            <span className="text-xs font-black text-amber-700">{personalReview.rating}</span>
                        </div>
                    )}
                </div>

                <div className="mt-auto">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm font-bold text-indigo-600">{course.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-6">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${course.isBanned ? 'bg-amber-400' : 'bg-indigo-600'}`}
                            style={{ width: `${course.progress}%` }}
                        ></div>
                    </div>

                    <Link
                        href={`/courses/${course.id}`}
                        className={`flex items-center justify-center w-full py-2.5 px-4 font-medium rounded-lg transition-colors ${course.isBanned
                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                            : 'bg-indigo-600 text-white hover:bg-gray-200 hover:text-gray-900 group-hover:bg-indigo-600 group-hover:text-white'}`}
                    >
                        {course.isBanned ? 'View Restrictions' : 'View Details'}
                        <ArrowRight size={18} className="ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
