"use client";

import { useState } from "react";
import { COMPLAINTS } from "@/lib/mockData";
import { AlertCircle, CheckCircle, Clock, Plus } from "lucide-react";

export default function ComplaintsPage() {
    const [complaints, setComplaints] = useState(COMPLAINTS);
    const [showForm, setShowForm] = useState(false);
    const [subject, setSubject] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!subject.trim()) return;

        const newComplaint = {
            id: `CMP00${complaints.length + 3}`,
            subject: subject,
            status: "Open",
            date: new Date().toISOString().split('T')[0]
        };

        setComplaints([newComplaint, ...complaints]);
        setSubject("");
        setShowForm(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Complaints & Help</h1>
                    <p className="text-gray-500 mt-1">Raise issues or track the status of your tickets</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <Plus size={18} />
                    Raise Complaint
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-top-4">
                    <h3 className="font-bold text-gray-900 mb-4">New Complaint</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="Briefly describe your issue..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="Provide more details..."
                            ></textarea>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!subject}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Submit Ticket
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {complaints.length > 0 ? (
                        complaints.map(complaint => (
                            <div key={complaint.id} className="p-6 hover:bg-gray-50 transition-colors group">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className={`mt-1 p-2 rounded-lg ${complaint.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                            {complaint.status === 'Resolved' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-medium text-gray-900">{complaint.subject}</h3>
                                                <span className="text-xs text-gray-400 font-mono">#{complaint.id}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">Submitted on {complaint.date}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${complaint.status === 'Resolved' ? 'bg-green-50 text-green-700 border border-green-100' :
                                            complaint.status === 'Closed' ? 'bg-gray-50 text-gray-700 border border-gray-100' :
                                                'bg-yellow-50 text-yellow-700 border border-yellow-100'
                                        }`}>
                                        {complaint.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-gray-500">
                            <p>No complaints found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
