"use client";

import { useState } from "react";
import { Send, Image as ImageIcon, MoreVertical, Search, User } from "lucide-react";
import { COURSES, CURRENT_STUDENT } from "@/lib/mockData";

export default function ChatPage() {
    const enrolledCourses = COURSES.filter(c => c.isEnrolled);
    const [selectedCourseId, setSelectedCourseId] = useState(enrolledCourses[0]?.id);
    const selectedCourse = enrolledCourses.find((c: any) => c.id === selectedCourseId) || enrolledCourses[0];
    const [message, setMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([
        { id: 1, sender: "Instructor", text: "Welcome to the course! Let me know if you have any questions.", time: "10:00 AM", isMe: false },
        { id: 2, sender: "Alex Johnson", text: "Thanks! Looking forward to it.", time: "10:05 AM", isMe: true },
        { id: 3, sender: "Jane Doe", text: "Is there a prerequisite for module 3?", time: "11:30 AM", isMe: false },
    ]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !selectedCourseId) return;

        const newMessage = {
            id: chatHistory.length + 1,
            sender: CURRENT_STUDENT.name,
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        };

        setChatHistory([...chatHistory, newMessage]);
        setMessage("");
    };

    if (!selectedCourseId) {
        return (
            <div className="h-[calc(100vh-8rem)] bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center p-8 text-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">No active chats</h2>
                    <p className="text-gray-500 mt-2">You need to be enrolled in at least one course to access the chat.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-8rem)] bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex">
            {/* Sidebar List */}
            <div className="w-80 border-r border-gray-100 flex flex-col">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input type="text" placeholder="Search chats..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-1 focus:ring-indigo-500" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {enrolledCourses.map(course => (
                        <button
                            key={course.id}
                            onClick={() => setSelectedCourseId(course.id)}
                            className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors text-left ${selectedCourseId === course.id ? "bg-indigo-50 hover:bg-indigo-50" : ""}`}
                        >
                            <img src={course.thumbnail} alt={course.title} className="w-10 h-10 rounded-full object-cover" />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className={`text-sm font-semibold truncate ${selectedCourseId === course.id ? "text-indigo-900" : "text-gray-900"}`}>{course.title}</h4>
                                    <span className="text-xs text-gray-400">12:30 PM</span>
                                </div>
                                <p className={`text-xs truncate ${selectedCourseId === course.id ? "text-indigo-600" : "text-gray-500"}`}>
                                    {course.id === 'c1' ? 'Jane: Is there a prerequisite...' : 'Instructor: New materials uploaded...'}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                    <div className="flex items-center gap-3">
                        <img src={selectedCourse.thumbnail} alt={selectedCourse.title} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                            <h3 className="font-bold text-gray-900">{selectedCourse.title}</h3>
                            <p className="text-xs text-green-600 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                {selectedCourse.batch}
                            </p>
                        </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                        <MoreVertical size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
                    {chatHistory.map(msg => (
                        <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                            <div className={`flex max-w-[70%] ${msg.isMe ? "flex-row-reverse" : "flex-row"} gap-3`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.isMe ? "bg-indigo-100 text-indigo-600" : "bg-gray-200 text-gray-600"}`}>
                                    <User size={14} />
                                </div>
                                <div>
                                    <div className={`flex items-baseline gap-2 mb-1 ${msg.isMe ? "flex-row-reverse" : "flex-row"}`}>
                                        <span className="text-xs font-semibold text-gray-700">{msg.sender}</span>
                                        <span className="text-[10px] text-gray-400">{msg.time}</span>
                                    </div>
                                    <div className={`p-3 rounded-2xl text-sm ${msg.isMe
                                        ? "bg-indigo-600 text-white rounded-tr-none"
                                        : "bg-white text-gray-700 shadow-sm rounded-tl-none"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-white border-t border-gray-100">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                            <ImageIcon size={20} />
                        </button>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-gray-50 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all outline-none"
                        />
                        <button
                            type="submit"
                            disabled={!message.trim()}
                            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                    <p className="text-center text-[10px] text-gray-400 mt-2">
                        Messages are visible to all students in this batch.
                    </p>
                </div>
            </div>
        </div>
    );
}
