
export const CURRENT_STUDENT = {
  id: "STD001",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "https://avatar.vercel.sh/alex",
  enrollmentId: "2024-CS-001",
};

export const COURSES = [
  {
    id: "c1",
    title: "Advanced React Patterns",
    instructor: "Sarah Drasner",
    progress: 100,
    totalClasses: 40,
    attendedClasses: 40,
    status: "Completed",
    thumbnail: "https://placehold.co/600x400/2563eb/white?text=React",
    batch: "Batch A - Morning",
    schedule: "Mon, Wed, Fri - 10:00 AM",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    isEnrolled: true,
    isBanned: false,
  },
  {
    id: "c2",
    title: "Fullstack Next.js 14",
    instructor: "Lee Robinson",
    progress: 40,
    totalClasses: 35,
    attendedClasses: 14,
    status: "Active",
    thumbnail: "https://placehold.co/600x400/000000/white?text=Next.js",
    batch: "Batch B - Weekend",
    schedule: "Sat, Sun - 2:00 PM",
    meetingLink: "https://meet.google.com/xyz-uvwx-yza",
    isEnrolled: true,
    isBanned: false,
  },
  {
    id: "c3",
    title: "UI/UX Design Fundamentals",
    instructor: "Gary Simon",
    progress: 100,
    totalClasses: 20,
    attendedClasses: 20,
    status: "Completed",
    thumbnail: "https://placehold.co/600x400/ec4899/white?text=UI/UX",
    batch: "Batch C - Evening",
    schedule: "Tue, Thu - 6:00 PM",
    meetingLink: "",
    isEnrolled: true,
    isBanned: false,
  },
  {
    id: "c4",
    title: "Legacy Python 2.7",
    instructor: "Guido van Rossum",
    progress: 10,
    totalClasses: 50,
    attendedClasses: 5,
    status: "Archived",
    thumbnail: "https://placehold.co/600x400/ffe4b5/black?text=Python",
    batch: "Batch Z - Archived",
    schedule: "No longer active",
    meetingLink: "",
    isEnrolled: true,
    isBanned: false,
  },
  {
    id: "c5",
    title: "Unenrolled Course Demo",
    instructor: "Unknown",
    progress: 0,
    totalClasses: 0,
    attendedClasses: 0,
    status: "Active",
    thumbnail: "https://placehold.co/600x400/gray/white?text=Restricted",
    batch: "Batch X",
    schedule: "TBD",
    meetingLink: "",
    isEnrolled: false,
    isBanned: false,
  },
  {
    id: "c6",
    title: "Mastering Backend Architecture",
    instructor: "Kent C. Dodds",
    progress: 25,
    totalClasses: 30,
    attendedClasses: 8,
    status: "Active",
    thumbnail: "https://placehold.co/600x400/333/white?text=Backend",
    batch: "Batch D - Night",
    schedule: "Wed, Sat - 9:00 PM",
    meetingLink: "https://meet.google.com/bnd-arch-tst",
    isEnrolled: true,
    isBanned: true,
    rating: 4.5,
    reviewCount: 12,
  },
].map(course => ({
  ...course,
  rating: (course as any).rating || (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
  reviewCount: (course as any).reviewCount || Math.floor(Math.random() * 50) + 5
}));

export const REVIEWS = [
  { id: "r1", courseId: "c1", studentId: "STD001", studentName: "Alex Johnson", rating: 5, comment: "Amazing course! Really helped me understand advanced patterns.", date: "2024-11-25", status: "Live" },
  { id: "r2", courseId: "c2", studentId: "STD002", studentName: "Sarah Doe", rating: 4, comment: "Great content, but some parts were a bit too fast.", date: "2024-10-15", status: "Live" },
  { id: "r3", courseId: "c3", studentId: "STD001", studentName: "Alex Johnson", rating: 4, comment: "Good introduction to UI principles.", date: "2024-10-20", status: "Under Review" },
];

export const ATTENDANCE_HISTORY = [
  { id: 1, date: "2024-10-25", courseId: "c1", status: "Present" },
  { id: 2, date: "2024-10-23", courseId: "c1", status: "Absent" },
  { id: 3, date: "2024-10-21", courseId: "c1", status: "Present" },
  { id: 4, date: "2024-10-24", courseId: "c2", status: "Present" },
  { id: 5, date: "2024-10-20", courseId: "c2", status: "Late" },
];

export const TRANSACTIONS = [
  { id: "TXN1001", date: "2024-09-01", amount: 499.00, status: "Paid", description: "Course Enrollment: Advanced React" },
  { id: "TXN1002", date: "2024-09-15", amount: 299.00, status: "Paid", description: "Course Enrollment: UI/UX Design" },
  { id: "TXN1003", date: "2024-10-05", amount: 50.00, status: "Pending", description: "Late Fee" },
  { id: "TXN1004", date: "2024-10-10", amount: 499.00, status: "Rejected", description: "Course Enrollment: Mobile App Dev" },
];

export const CERTIFICATES = [
  { id: "CERT001", courseId: "c3", courseName: "UI/UX Design Fundamentals", issuedDate: "2024-10-15", downloadUrl: "#" },
  { id: "CERT002", courseId: "c1", courseName: "Advanced React Patterns", issuedDate: "2024-11-20", downloadUrl: "#" },
];

export const NOTICES = [
  { id: 1, title: "System Maintenance", date: "2024-10-26", content: "The system will be down for maintenance on Sunday from 2 AM to 4 AM.", type: "system", isRead: false },
  { id: 2, title: "New Course Available", date: "2024-10-20", content: "Check out the new AI Engineering course added to the catalog.", type: "academic", isRead: true },
  { id: 3, title: "Assignment Deadline", date: "2024-10-28", content: "Your Next.js project is due this Friday at midnight.", type: "academic", isRead: false },
  { id: 4, title: "Fee Receipt Generated", date: "2024-10-25", content: "Receipt for TXN1002 is now available for download.", type: "system", isRead: true },
  { id: 5, title: "Quiz 1 Results", date: "2024-10-22", content: "React patterns quiz results are out. Check your score!", type: "academic", isRead: false },
  { id: 6, title: "Holiday Notice", date: "2024-10-15", content: "The institute will remain closed for the upcoming festival.", type: "system", isRead: true },
];

export const MATERIALS = [
  { id: "m1", title: "React Hooks Cheatsheet", courseId: "c1", type: "PDF", size: "1.2 MB", status: "Approved", description: "Essential hooks for React development." },
  { id: "m2", title: "Next.js Architecture Slides", courseId: "c2", type: "PPTX", size: "5.5 MB", status: "Approved", description: "Slide deck covering Next.js 14 architecture." },
  { id: "m3", title: "Design Principles E-book", courseId: "c3", type: "PDF", size: "12 MB", status: "Approved", description: "Complete guide to modern UI/UX principles." },
  { id: "m4", title: "Advanced Patterns Draft", courseId: "c1", type: "PDF", size: "0.8 MB", status: "Pending", description: "Draft version of advanced patterns." },
  { id: "m5", title: "Internal Meeting Notes", courseId: "c2", type: "DOCX", size: "0.5 MB", status: "Rejected", description: "Notes that are not intended for students." },
  { id: "m6", title: "Python 2.7 Reference", courseId: "c4", type: "PDF", size: "2.1 MB", status: "Approved", description: "Legacy reference for Python 2.7." },
];

export const COMPLAINTS = [
  { id: "CMP001", subject: "Video Playback Issue", status: "Resolved", date: "2024-10-10" },
  { id: "CMP002", subject: "Certificate Typo", status: "Open", date: "2024-10-27" },
  { id: "CMP003", subject: "Bug in Quiz 2", status: "Closed", date: "2024-10-05" },
];
