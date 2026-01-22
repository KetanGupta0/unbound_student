"use client";

import { use } from "react";
import { COURSES, MATERIALS } from "@/lib/mockData";
import { Clock, Calendar, Video, FileText, Download, Lock, Award } from "lucide-react";
import Link from "next/link";

export default function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const handleDownload = (certName: string) => {
        const base64Pdf = "JVBERi0xLjQKJfbk/N8KMSAwIG9iajw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+ZW5kb2JqCjIgMCBvYmo8PC9UeXBlL1BhZ2VzL0NvdW50IDEvS2lkc1szIDAgUl0+PmVuZG9iagozIDAgb2JqPDwvVHlwZS9QYWdlL1BhcmVudCAyIDAgUi9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNCAwIFI+Pj4+L01lZGlhQm94WzAgMCA1OTUuMjc1IDg0MS44ODldL0NvbnRlbnRzIDUgMCBSPj5lbmRvYmoKNCAwIG9iajw8L1R5cGUvRm9udC9TdWJ0eXBlL1R5cGUxL0Jhc2VGb250L0hlbHZldGljYT4+ZW5kb2JqCjUgMCBvYmo8PC9MZW5ndGggNjk+PnN0cmVhbQpCVC9GMSAyNCBUZiAxMCAxMCBUZChDZXJ0aWZpY2F0ZSBvZiBDb21wbGV0aW9uOiApVGpFVCBCVC9GMSAyNCBUZiAxMCA0MCBUZChBbGV4IEpvaG5zb24pVGpFVAplbmRzdHJlYW0KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxOSAwMDAwMCBuIAowMDAwMDAwMDY4IDAwMDAwIG4gCjAwMDAwMDAxMjUgMDAwMDAgbiAKMDAwMDAwMDI1NSAwMDAwMCBuIAowMDAwMDAwMzI3IDAwMDAwIG4gCnRyYWlsZXI8PC9TaXplIDYvUm9vdCAxIDAgUj4+CnN0YXJ0eHJlZgo0NDYKJSVFT0Y=";

        const byteCharacters = atob(base64Pdf);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Certificate_${certName.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const course = COURSES.find(c => c.id === id);

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h2 className="text-xl font-bold text-gray-900">Course not found</h2>
                <Link href="/courses" className="mt-4 text-indigo-600 hover:underline">Back to Courses</Link>
            </div>
        );
    }

    if (!course.isEnrolled || course.isBanned) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
                <div className={`p-4 rounded-full mb-4 ${course.isBanned ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'}`}>
                    <Lock size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                    {course.isBanned ? 'Access Restricted' : 'Access Denied'}
                </h2>
                <p className="text-gray-500 mt-2 max-w-md">
                    {course.isBanned
                        ? 'Your access to this course has been restricted by the administrator. Please contact support for more information.'
                        : 'You are not enrolled in this course. You cannot view its details or content.'}
                </p>
                <Link href="/courses" className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Back to My Courses
                </Link>
            </div>
        );
    }

    const courseMaterials = MATERIALS.filter(m => m.courseId === course.id);

    return (
        <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3">
                        <img src={course.thumbnail} alt={course.title} className="w-full rounded-xl object-cover shadow-sm aspect-video" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full mb-3">{course.batch}</span>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                                <p className="text-gray-500 flex items-center gap-2">
                                    <span className="font-medium text-gray-900">Instructor:</span> {course.instructor}
                                </p>
                            </div>
                            {course.status === "Active" && (
                                <a
                                    href={course.meetingLink}
                                    target="_blank"
                                    className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all shadow-lg shadow-red-500/30 animate-pulse"
                                >
                                    <Video size={20} />
                                    Join Live Class
                                </a>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <div className="p-2 bg-white rounded-md shadow-sm text-indigo-600">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Schedule</p>
                                    <p className="font-medium text-gray-900">{course.schedule}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                <div className="p-2 bg-white rounded-md shadow-sm text-green-600">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold">Attendance</p>
                                    <p className="font-medium text-gray-900">{course.attendedClasses} / {course.totalClasses} Classes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900">Study Materials</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {courseMaterials.filter(m => m.status === 'Approved').length > 0 ? (
                                courseMaterials.filter(m => m.status === 'Approved').map(material => (
                                    <div key={material.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                                                <FileText size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">{material.title}</h4>
                                                <p className="text-xs text-gray-500">{material.type} • {material.size} • {material.description}</p>
                                            </div>
                                        </div>
                                        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                            <Download size={20} />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="p-10 text-center text-gray-500">
                                    <p>No approved materials uploaded for this course yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Course Progress</h3>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-bold text-indigo-600">{course.progress}%</span>
                            <span className="text-gray-500 mb-1">completed</span>
                        </div>
                        <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden mb-6">
                            <div
                                className="h-full bg-indigo-600 rounded-full"
                                style={{ width: `${course.progress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-500">
                            {course.progress === 100
                                ? "Congratulations! You have successfully completed this course."
                                : "You must complete at least 75% to be eligible for the final certificate."}
                        </p>

                        {course.progress === 100 && (
                            <button
                                onClick={() => handleDownload(course.title)}
                                className="w-full mt-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                            >
                                <Award size={20} />
                                Download Certificate
                            </button>
                        )}
                    </div>

                    {(course.status === "Archived" || course.status === "Completed") && (
                        <div className={`rounded-xl border p-6 ${course.status === "Archived" ? "bg-red-50 border-red-100" : "bg-green-50 border-green-100"}`}>
                            <div className="flex items-start gap-3">
                                <Lock className={`${course.status === "Archived" ? "text-red-600" : "text-green-600"} mt-0.5`} size={20} />
                                <div>
                                    <h4 className={`font-bold ${course.status === "Archived" ? "text-red-800" : "text-green-800"}`}>
                                        {course.status === "Archived" ? "Course Archived" : "Course Completed"}
                                    </h4>
                                    <p className={`text-sm mt-1 ${course.status === "Archived" ? "text-red-700" : "text-green-700"}`}>
                                        {course.status === "Archived"
                                            ? "This course has been archived. You cannot join live classes or modify content."
                                            : "You have completed this course. Great job!"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
