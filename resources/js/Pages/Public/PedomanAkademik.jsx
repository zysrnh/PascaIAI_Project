import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { BookOpen, Download, FileText, Search, Eye, X } from 'lucide-react';

export default function PedomanAkademik({ pedomans, pengaturan }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [previewDoc, setPreviewDoc] = useState(null);

    const filteredPedomans = pedomans.filter(p => 
        p.judul.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (p.deskripsi && p.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <PublicLayout>
            <Head title="Pedoman Akademik - Pascasarjana IAI Persis Bandung" />

            {/* Banner Section */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={pengaturan?.banner_image || "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1600&auto=format&fit=crop"}
                        alt="Pedoman Akademik Banner" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md tracking-tight">
                        Pedoman Akademik
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                    <p className="text-white/90 max-w-2xl text-lg md:text-xl leading-relaxed drop-shadow">
                        {pengaturan?.deskripsi || 'Dokumen panduan penyelenggaraan pendidikan dan aturan akademik Pascasarjana IAI Persis Bandung.'}
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-slate-50 py-12 lg:py-20 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header & Search */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                                <BookOpen className="w-6 h-6 text-emerald-600" />
                                Daftar Dokumen
                            </h2>
                            <p className="text-slate-500 mt-1">Unduh dokumen pedoman akademik resmi untuk referensi Anda.</p>
                        </div>
                        <div className="w-full md:w-80 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Cari dokumen..." 
                                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Document Grid */}
                    {filteredPedomans.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                                <BookOpen className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Belum ada dokumen</h3>
                            <p className="text-slate-500 max-w-md mx-auto">
                                {searchTerm 
                                    ? 'Tidak ditemukan dokumen yang cocok dengan pencarian Anda.' 
                                    : 'Belum ada dokumen pedoman akademik yang dipublikasikan.'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPedomans.map((pedoman) => (
                                <div key={pedoman.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 flex flex-col h-full group overflow-hidden">
                                    <div className="p-6 flex-grow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">
                                            {pedoman.judul}
                                        </h3>
                                        {pedoman.deskripsi && (
                                            <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                                                {pedoman.deskripsi}
                                            </p>
                                        )}
                                    </div>
                                    
                                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                            <FileText className="w-4 h-4" />
                                            Dokumen PDF
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => setPreviewDoc(pedoman)} 
                                                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors shadow-sm"
                                            >
                                                <Eye className="w-4 h-4" /> <span className="hidden sm:inline">Preview</span>
                                            </button>
                                            <a 
                                                href={`/storage/${pedoman.file_path}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                                                download
                                            >
                                                <Download className="w-4 h-4" /> <span className="hidden sm:inline">Unduh</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Preview PDF */}
            {previewDoc && typeof document !== 'undefined' && createPortal(
                <div
                    className="fixed inset-0 z-[100] overflow-y-auto bg-slate-900/70 transition-opacity duration-300"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="preview-doc-title"
                >
                    <div 
                        className="fixed inset-0" 
                        onClick={() => setPreviewDoc(null)}
                    ></div>
                    
                    <div className="flex min-h-full items-center justify-center p-4 md:p-8 relative z-10">
                        <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl h-[85vh] min-h-[500px] flex flex-col overflow-hidden animate-fade-in-up border border-slate-200">
                            {/* Header Modal */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/80">
                                <div className="flex items-center gap-4 max-w-[70%] sm:max-w-[80%]">
                                    <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl flex-shrink-0">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 id="preview-doc-title" className="text-lg font-bold text-slate-800 truncate" title={previewDoc.judul}>{previewDoc.judul}</h3>
                                        <p className="text-sm text-slate-500 mt-0.5 truncate">Dokumen Pedoman Akademik</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <a 
                                        href={`/storage/${previewDoc.file_path}`} 
                                        download 
                                        className="px-4 py-2 text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors flex items-center gap-2" 
                                        title="Unduh File"
                                    >
                                        <Download className="w-4 h-4" />
                                        <span className="hidden sm:inline text-sm font-semibold">Unduh</span>
                                    </a>
                                    
                                    <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block"></div>
                                    
                                    <button 
                                        onClick={() => setPreviewDoc(null)} 
                                        className="p-2 text-slate-400 hover:text-white hover:bg-red-500 rounded-lg transition-colors" 
                                        title="Tutup Preview"
                                        aria-label="Tutup preview"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Area Preview */}
                            <div className="flex-1 w-full bg-slate-800 p-0 sm:p-4 md:p-6 overflow-hidden">
                                <iframe 
                                    src={`/storage/${previewDoc.file_path}`} 
                                    className="w-full h-full sm:rounded-xl shadow-inner bg-white border-0"
                                    title={previewDoc.judul}
                                >
                                    <p className="text-center p-8 text-white">
                                        Browser Anda tidak mendukung pratinjau PDF. 
                                        <a href={`/storage/${previewDoc.file_path}`} className="text-emerald-400 underline ml-1">Silakan unduh file.</a>
                                    </p>
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </PublicLayout>
    );
}
