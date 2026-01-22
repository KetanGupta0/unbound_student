"use client";

import { useState } from "react";
import { CERTIFICATES, COURSES } from "@/lib/mockData";
import { Award, Download, Share2, Eye, X } from "lucide-react";

export default function CertificatesPage() {
    const [viewingCert, setViewingCert] = useState<any>(null);

    const activeCertificates = CERTIFICATES.filter(cert => {
        const course = COURSES.find(c => c.id === cert.courseId);
        return course && course.progress === 100 && !course.isBanned;
    });

    const handleDownload = (cert: any) => {
        // A truly minimal valid 1-page PDF in base64
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
        link.download = `Certificate_${cert.courseName.replace(/\s+/g, '_')}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">My Certificates</h1>
                <p className="text-gray-500 mt-1">Verify and download your course completion certificates</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeCertificates.map(cert => (
                    <div key={cert.id} className="group relative bg-white p-2 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="relative aspect-[4/3] bg-slate-50 rounded-lg overflow-hidden border border-gray-100 mb-4 p-6 flex flex-col items-center justify-center text-center">
                            <Award size={48} className="text-amber-500 mb-4" />
                            <h3 className="font-serif font-bold text-gray-900 text-lg">{cert.courseName}</h3>
                            <p className="text-xs text-gray-500 mt-2">Issued on {cert.issuedDate}</p>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>

                            {/* Hover Actions Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm">
                                <button
                                    onClick={() => setViewingCert(cert)}
                                    className="p-3 bg-white text-gray-900 rounded-full shadow-xl hover:scale-110 transition-transform"
                                    title="View Certificate"
                                >
                                    <Eye size={20} />
                                </button>
                                <button
                                    onClick={() => handleDownload(cert)}
                                    className="p-3 bg-indigo-600 text-white rounded-full shadow-xl hover:scale-110 transition-transform"
                                    title="Download PDF"
                                >
                                    <Download size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="px-4 pb-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleDownload(cert)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    <Download size={16} />
                                    Download PDF
                                </button>
                                <button
                                    onClick={() => alert('Sharing functionality is currently in development.')}
                                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                                >
                                    <Share2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Placeholder for empty state if needed */}
                <div className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-8 text-center min-h-[300px] text-gray-400">
                    <Award size={40} className="mb-3 opacity-20" />
                    <p className="text-sm font-medium">Complete more courses to earn certificates</p>
                </div>
            </div>

            {/* Certificate Preview Modal */}
            {viewingCert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
                        <button
                            onClick={() => setViewingCert(null)}
                            className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-12 md:p-20 bg-[#fafafa] flex flex-col items-center text-center border-8 border-white m-4 rounded-2xl outline outline-1 outline-gray-200">
                            <div className="mb-8">
                                <Award size={80} className="text-amber-500" />
                            </div>
                            <h2 className="text-sm uppercase tracking-[0.2em] text-gray-400 font-bold mb-8">Certificate of Completion</h2>
                            <p className="text-gray-500 mb-2">This is to certify that</p>
                            <p className="text-4xl font-serif font-bold text-gray-900 mb-8 underline decoration-amber-200 decoration-4 underline-offset-8">Alex Johnson</p>
                            <p className="text-gray-500 mb-2">has successfully completed the course</p>
                            <p className="text-2xl font-bold text-indigo-600 mb-12">{viewingCert.courseName}</p>

                            <div className="flex justify-between w-full max-w-md border-t border-gray-200 pt-8 mt-4">
                                <div className="text-left">
                                    <p className="text-xs text-gray-400 uppercase font-black">Date</p>
                                    <p className="font-bold text-gray-900">{viewingCert.issuedDate}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400 uppercase font-black">Verify ID</p>
                                    <p className="font-mono text-gray-900">{viewingCert.id}</p>
                                </div>
                            </div>

                            <div className="mt-16 grayscale opacity-30 select-none pointer-events-none">
                                <div className="h-12 w-48 bg-gray-200 rounded animate-pulse"></div>
                                <p className="text-[10px] mt-2 font-black uppercase text-gray-400">Official Signature</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 flex justify-end gap-3">
                            <button
                                onClick={() => setViewingCert(null)}
                                className="px-6 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-all"
                            >
                                Close Preview
                            </button>
                            <button
                                onClick={() => handleDownload(viewingCert)}
                                className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2"
                            >
                                <Download size={18} />
                                Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
