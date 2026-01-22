"use client";

import { useSidebar } from "@/components/SidebarProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    CalendarCheck,
    FileText,
    MessageSquare,
    CreditCard,
    Award,
    AlertCircle,
    User,
    LogOut,
    X
} from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();
    const { isOpen, close } = useSidebar();

    const links = [
        { href: "/", label: "Dashboard", icon: LayoutDashboard },
        { href: "/courses", label: "My Courses", icon: BookOpen },
        { href: "/attendance", label: "Attendance", icon: CalendarCheck },
        { href: "/materials", label: "Study Materials", icon: FileText },
        { href: "/chat", label: "Course Chat", icon: MessageSquare },
        { href: "/transactions", label: "Transactions", icon: CreditCard },
        { href: "/certificates", label: "Certificates", icon: Award },
        { href: "/complaints", label: "Complaints", icon: AlertCircle },
        { href: "/profile", label: "My Profile", icon: User },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={close}
                />
            )}

            <aside className={`
                w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}>
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-indigo-600">StudentPortal</h1>
                    <button onClick={close} className="md:hidden text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => close()} // Close on navigation on mobile
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? "bg-indigo-50 text-indigo-700"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                <Icon size={20} />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
