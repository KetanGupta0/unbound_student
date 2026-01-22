"use client";

import { use, useState, useEffect } from "react";
import { COURSES, MATERIALS, REVIEWS, CURRENT_STUDENT } from "@/lib/mockData";
import { Clock, Calendar, Video, FileText, Download, Lock, Award, Star, MessageCircle, Send, Edit3, CheckCircle2, History } from "lucide-react";
import Link from "next/link";

export default function CourseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Find personal review for this course
    const personalReview = REVIEWS.find(r => r.courseId === id && r.studentId === CURRENT_STUDENT.id);
    const [hasReviewed, setHasReviewed] = useState(!!personalReview);
    const [myReview, setMyReview] = useState(personalReview);

    // Update form if editing
    useEffect(() => {
        if (isEditing && myReview) {
            setRating(Number(myReview.rating));
            setComment(myReview.comment);
        }
    }, [isEditing, myReview]);

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

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) return;

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            const updatedReview = {
                id: myReview?.id || `r${Math.random()}`,
                courseId: id,
                studentId: CURRENT_STUDENT.id,
                studentName: CURRENT_STUDENT.name,
                rating,
                comment,
                date: new Date().toISOString().split('T')[0],
                status: "Under Review" as const
            };
            setMyReview(updatedReview);
            setHasReviewed(true);
            setIsEditing(false);
        }, 1000);
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
            <div className="bg-white rounded-2xl p-4 md:p-8 border border-gray-100 shadow-sm transition-all">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                    <div className="w-full md:w-1/3">
                        <img src={course.thumbnail} alt={course.title} className="w-full rounded-xl object-cover shadow-md aspect-video md:aspect-auto" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                            <div className="space-y-1">
                                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] md:text-xs font-bold rounded-full">{course.batch}</span>
                                <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">{course.title}</h1>
                                <p className="text-sm text-gray-500 font-medium">
                                    <span className="text-gray-400">Instructor:</span> <span className="text-gray-700 font-bold">{course.instructor}</span>
                                </p>
                            </div>
                            {course.status === "Active" && (
                                <a
                                    href={course.meetingLink}
                                    target="_blank"
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-[0_8px_30px_rgb(220,38,38,0.3)] hover:scale-[1.02] active:scale-95 animate-pulse shrink-0"
                                >
                                    <Video size={18} />
                                    Join Live Class
                                </a>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
                            <div className="flex items-center gap-3 p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
                                <div className="p-2.5 bg-white rounded-xl shadow-sm text-indigo-600 flex-shrink-0">
                                    <Clock size={20} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Schedule</p>
                                    <p className="font-bold text-gray-900 text-sm truncate">{course.schedule}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
                                <div className="p-2.5 bg-white rounded-xl shadow-sm text-green-600 flex-shrink-0">
                                    <Calendar size={20} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Attendance</p>
                                    <p className="font-bold text-gray-900 text-sm">{course.attendedClasses} / {course.totalClasses} <span className="text-gray-400 font-medium">Classes</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Study Materials */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-5 md:p-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-lg font-bold text-gray-900 font-heading">Study Materials</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {courseMaterials.filter(m => m.status === 'Approved').length > 0 ? (
                                courseMaterials.filter(m => m.status === 'Approved').map(material => (
                                    <div key={material.id} className="p-4 md:p-5 flex items-center justify-between hover:bg-indigo-50/30 transition-colors group">
                                        <div className="flex items-center gap-3 md:gap-4 min-w-0">
                                            <div className="p-2.5 md:p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all">
                                                <FileText size={20} className="md:w-6 md:h-6" />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-gray-900 text-sm md:text-base truncate">{material.title}</h4>
                                                <p className="text-[10px] md:text-xs text-gray-500 font-medium truncate">
                                                    <span className="uppercase text-indigo-600">{material.type}</span> • {material.size}
                                                </p>
                                            </div>
                                        </div>
                                        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm md:shadow-none border border-transparent hover:border-indigo-100 flex-shrink-0">
                                            <Download size={18} />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="p-10 text-center text-gray-500">
                                    <p className="text-sm font-medium">No approved materials uploaded yet.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="p-5 md:p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 font-heading">
                                <MessageCircle size={20} className="text-indigo-600" />
                                My Review
                            </h3>
                        </div>

                        <div className="p-6">
                            {(!hasReviewed || isEditing) && !course.isBanned ? (
                                <form onSubmit={handleSubmitReview} className="p-6 bg-indigo-50/30 rounded-2xl border border-indigo-100/50">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="font-bold text-gray-900">{isEditing ? "Modify Your Review" : "Rate this Course"}</h4>
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(false)}
                                                className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-2">Your Rating</p>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        className="p-1 transition-transform hover:scale-110 focus:outline-none"
                                                    >
                                                        <Star
                                                            size={28}
                                                            className={`${star <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 hover:text-amber-300'}`}
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="comment" className="text-sm font-medium text-gray-700 block mb-2">Your Experience</label>
                                            <textarea
                                                id="comment"
                                                rows={3}
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-sm resize-none"
                                                placeholder="What did you think of this course?"
                                                required
                                            ></textarea>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={rating === 0 || isSubmitting}
                                            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-200"
                                        >
                                            {isSubmitting ? "Saving..." : (
                                                <>
                                                    <Send size={18} />
                                                    {isEditing ? "Update Review" : "Submit Review"}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            ) : hasReviewed ? (
                                <div className="space-y-6">
                                    <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 group">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-sm font-black text-indigo-700 shadow-sm">
                                                    {myReview?.studentName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900">Your Review</p>
                                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">{myReview?.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <div className="flex gap-0.5">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={14}
                                                            className={`${i < Number(myReview?.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${myReview?.status === 'Live'
                                                        ? 'bg-green-50 text-green-600 border-green-100'
                                                        : 'bg-amber-50 text-amber-600 border-amber-100'
                                                    }`}>
                                                    {myReview?.status === 'Live' ? <CheckCircle2 size={10} /> : <History size={10} />}
                                                    {myReview?.status}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{myReview?.comment}"</p>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 text-indigo-600 text-xs font-bold hover:text-indigo-700 transition-colors bg-white px-3 py-1.5 rounded-lg border border-indigo-50 shadow-sm"
                                        >
                                            <Edit3 size={14} />
                                            Modify Review
                                        </button>
                                    </div>
                                    <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50 flex gap-3 items-start">
                                        <div className="p-1.5 bg-indigo-100 rounded-lg text-indigo-600 shrink-0 mt-0.5">
                                            <Star size={14} className="fill-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-indigo-900">Privacy Notice</p>
                                            <p className="text-[11px] text-indigo-700 leading-normal mt-0.5">Your rating is private and only visible to you. Others cannot see your feedback or the global course rating.</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 px-6 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                                    <MessageCircle className="mx-auto text-gray-300 mb-3" size={40} />
                                    <p className="text-gray-500 text-sm font-bold">No review submitted yet.</p>
                                    <p className="text-gray-400 text-xs mt-1">Share your learning experience privately.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                        <h3 className="text-lg font-bold text-gray-900 font-heading mb-6">Course Progress</h3>
                        <div className="flex items-end gap-2 mb-3">
                            <span className="text-4xl md:text-5xl font-black text-indigo-600">{course.progress}%</span>
                            <span className="text-gray-400 font-bold uppercase text-[10px] mb-2 tracking-widest">completed</span>
                        </div>
                        <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden mb-6 p-1">
                            <div
                                className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                                style={{ width: `${course.progress}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium">
                            {course.progress === 100
                                ? "Congratulations! You have successfully completed this course and earned your certificate."
                                : `You have completed ${course.progress}% of the curriculum. Reach 75% to unlock your official certification.`}
                        </p>

                        {course.progress === 100 && (
                            <button
                                onClick={() => handleDownload(course.title)}
                                className="w-full mt-8 py-3.5 bg-gray-900 text-white font-black rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-gray-200 active:scale-95 flex items-center justify-center gap-2 group"
                            >
                                <Award size={20} className="group-hover:rotate-12 transition-transform" />
                                DOWNLOAD CERTIFICATE
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
