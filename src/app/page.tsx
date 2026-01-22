import { COURSES, ATTENDANCE_HISTORY, CERTIFICATES, TRANSACTIONS, NOTICES, REVIEWS, CURRENT_STUDENT } from "@/lib/mockData";
import { BookOpen, CheckCircle, Clock, TrendingUp, AlertCircle, FileText, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const activeCourses = COURSES.filter(c => c.status === "Active").length;
  const completedCourses = COURSES.filter(c => c.status === "Completed").length;
  const certificatesCount = CERTIFICATES.length;

  // Calculate overall attendance
  const totalClasses = ATTENDANCE_HISTORY.length;
  const presentClasses = ATTENDANCE_HISTORY.filter(a => a.status === "Present" || a.status === "Late").length;
  const attendancePercentage = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0;

  const stats = [
    { label: "Active Courses", value: activeCourses, icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Completed", value: completedCourses, icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Attendance", value: `${attendancePercentage}%`, icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Certificates", value: certificatesCount, icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back, track your learning progress here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={stat.color} size={24} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity / Notices */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Important Notices</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {NOTICES.map((notice) => (
                <div key={notice.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-4">
                    <div className="mt-1">
                      {notice.type === 'system' ? <AlertCircle className="text-red-500" size={20} /> : <FileText className="text-blue-500" size={20} />}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{notice.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{notice.content}</p>
                      <span className="text-xs text-gray-400 mt-2 block">{notice.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
              <Link href="/transactions" className="text-sm font-bold text-indigo-600 hover:underline">View All</Link>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3 text-right">Amount</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {TRANSACTIONS.slice(0, 3).map((txn) => (
                    <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{txn.description}</td>
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{txn.date}</td>
                      <td className="px-6 py-4 text-right font-medium text-gray-900">${txn.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${txn.status === "Paid" ? "bg-green-100 text-green-700" : (txn.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700")
                          }`}>
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-50">
              {TRANSACTIONS.slice(0, 3).map((txn) => (
                <div key={txn.id} className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-gray-900 text-sm">{txn.description}</p>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${txn.status === "Paid" ? "bg-green-100 text-green-700" : (txn.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700")}`}>
                      {txn.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-end text-xs">
                    <span className="text-gray-500 font-medium">{txn.date}</span>
                    <span className="font-black text-gray-900">${txn.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Courses</h2>
            <div className="space-y-4">
              {COURSES.filter(c => c.isEnrolled && !c.isBanned).slice(0, 3).map(course => (
                <Link key={course.id} href={`/courses/${course.id}`} className="flex gap-4 items-center p-4 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-all group">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">{course.title}</h4>
                    <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                      {REVIEWS.find(r => r.courseId === course.id && r.studentId === CURRENT_STUDENT.id) ? (
                        <div className="flex items-center gap-1.5 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                          <Star size={10} className="text-amber-500 fill-amber-500" />
                          <span className="text-amber-700">{REVIEWS.find(r => r.courseId === course.id && r.studentId === CURRENT_STUDENT.id)?.rating}</span>
                        </div>
                      ) : <div className="h-4 w-4"></div>}
                      <span className="text-indigo-600">{course.status}</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/courses" className="w-full mt-6 py-3 text-sm text-indigo-600 font-bold hover:text-white hover:bg-indigo-600 border border-indigo-100 rounded-xl transition-all flex items-center justify-center">
              View All Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
