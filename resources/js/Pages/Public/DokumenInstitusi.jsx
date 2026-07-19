import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { FileText, Download, ChevronRight, BookOpen, Scale, FileSpreadsheet, Activity, Target, Eye, X } from 'lucide-react';

// Literal Tailwind classes per category — template strings like `bg-${color}-100`
// get purged in production because Tailwind's JIT only picks up classes it can
// see written out in full, so each style must be listed here, not composed.
const CATEGORY_STYLES = [
    { icon: <Scale className="w-6 h-6" />, badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-600' },
    { icon: <Target className="w-6 h-6" />, badgeBg: 'bg-blue-100', badgeText: 'text-blue-600' },
    { icon: <BookOpen className="w-6 h-6" />, badgeBg: 'bg-amber-100', badgeText: 'text-amber-600' },
    { icon: <Activity className="w-6 h-6" />, badgeBg: 'bg-purple-100', badgeText: 'text-purple-600' },
    { icon: <FileSpreadsheet className="w-6 h-6" />, badgeBg: 'bg-slate-200', badgeText: 'text-slate-600' },
    { icon: <Scale className="w-6 h-6" />, badgeBg: 'bg-indigo-100', badgeText: 'text-indigo-600' },
    { icon: <Target className="w-6 h-6" />, badgeBg: 'bg-rose-100', badgeText: 'text-rose-600' },
];

export default function DokumenInstitusi({ dokumens, pengaturan }) {
    const bannerImg = pengaturan?.banner_image || "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1600&auto=format&fit=crop";

    // Grouped once per `dokumens` change instead of on every render, so it stays
    // a stable reference and doesn't re-trigger the effect below unnecessarily.
    const documentCategories = useMemo(() => {
        const uniqueCategories = [...new Set((dokumens || []).map(doc => doc.kategori))];
        return uniqueCategories
            .map((catName, index) => {
                const style = CATEGORY_STYLES[index % CATEGORY_STYLES.length];
                return {
                    id: catName,
                    title: catName,
                    icon: style.icon,
                    badgeBg: style.badgeBg,
                    badgeText: style.badgeText,
                    documents: (dokumens || []).filter(doc => doc.kategori === catName),
                };
            })
            .filter(cat => cat.documents.length > 0);
    }, [dokumens]);

    const [activeCategory, setActiveCategory] = useState(null);
    const [previewDoc, setPreviewDoc] = useState(null);
    const closeButtonRef = useRef(null);

    // Keep the active tab valid: pick the first category on load, and re-pick
    // if the currently active one disappears (e.g. an admin deletes it).
    useEffect(() => {
        if (documentCategories.length === 0) {
            if (activeCategory !== null) setActiveCategory(null);
            return;
        }
        const stillExists = documentCategories.some(cat => cat.id === activeCategory);
        if (!stillExists) {
            setActiveCategory(documentCategories[0].id);
        }
    }, [documentCategories, activeCategory]);

    // Modal: lock body scroll, close on Escape, and move focus into the dialog.
    useEffect(() => {
        if (!previewDoc) {
            document.body.style.overflow = 'unset';
            return;
        }
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setPreviewDoc(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [previewDoc]);

    return (
        <PublicLayout>
            <Head title="Dokumen Institusi | Pascasarjana IAI Persis Bandung" />
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.4s ease-out forwards;
                }
            `}</style>

            {/* Hero Section / Banner */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={bannerImg} 
                        alt="Dokumen Institusi Banner" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md">
                        Dokumen Institusi
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                    {pengaturan?.deskripsi && (
                        <p className="text-white/90 max-w-2xl text-lg leading-relaxed drop-shadow-md">
                            {pengaturan.deskripsi}
                        </p>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="py-16 bg-slate-50 relative min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-emerald-950 mb-4">Pusat Unduhan Dokumen</h2>
                        <p className="text-slate-600 max-w-3xl mx-auto">
                            Akses berbagai dokumen legal, panduan akademik, serta laporan resmi terkait pengelolaan dan pengembangan Program Pascasarjana IAI Persis Bandung.
                        </p>
                    </div>

                    {documentCategories.length > 0 ? (
                        <div className="flex flex-col lg:flex-row gap-8">
                            
                            {/* Sidebar Menu Kategori */}
                            <div className="w-full lg:w-1/3">
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
                                    <div className="p-4 bg-emerald-900 text-white font-bold">
                                        Kategori Dokumen
                                    </div>
                                    <div className="p-2" role="tablist" aria-label="Kategori dokumen">
                                        {documentCategories.map((category) => {
                                            const isActive = activeCategory === category.id;
                                            return (
                                                <button
                                                    key={category.id}
                                                    role="tab"
                                                    id={`tab-${category.id}`}
                                                    aria-selected={isActive}
                                                    aria-controls={`panel-${category.id}`}
                                                    onClick={() => setActiveCategory(category.id)}
                                                    className={`w-full flex items-center justify-between p-4 rounded-lg mb-1 transition-colors text-left ${
                                                        isActive
                                                        ? 'bg-emerald-50 text-emerald-700 font-bold border-l-4 border-emerald-500' 
                                                        : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent hover:border-slate-300 font-medium'
                                                    }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={isActive ? 'text-emerald-600' : 'text-slate-400'}>
                                                            {category.icon}
                                                        </div>
                                                        <span>{category.title}</span>
                                                    </div>
                                                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-emerald-500' : 'text-slate-300'}`} />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* List Dokumen */}
                            <div className="w-full lg:w-2/3">
                                {documentCategories.map((category) => (
                                    activeCategory === category.id && (
                                        <div 
                                            key={category.id}
                                            role="tabpanel"
                                            id={`panel-${category.id}`}
                                            aria-labelledby={`tab-${category.id}`}
                                            className="animate-fade-in-up"
                                        >
                                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                                    <div className={`p-3 rounded-lg ${category.badgeBg} ${category.badgeText}`}>
                                                        {category.icon}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-slate-800">{category.title}</h3>
                                                        <p className="text-slate-500 text-sm">{category.documents.length} Dokumen tersedia</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-3">
                                                    {category.documents.map((doc) => (
                                                        <div key={doc.id} className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-colors gap-4">
                                                            <div className="flex items-start gap-4">
                                                                <div className="p-2 bg-slate-100 text-slate-500 rounded-md group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors mt-1 sm:mt-0">
                                                                    <FileText className="w-5 h-5" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors leading-snug mb-1">{doc.judul}</h4>
                                                                    <div className="flex items-center gap-3 text-xs text-slate-500">
                                                                        {doc.file_size && (
                                                                            <span className="font-medium bg-slate-100 px-2 py-0.5 rounded">{doc.file_size}</span>
                                                                        )}
                                                                        {doc.updated_at && (
                                                                            <span>Diperbarui: {new Date(doc.updated_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex-shrink-0 flex items-center gap-2 w-full sm:w-auto">
                                                                {doc.file_path ? (
                                                                    <>
                                                                        <button 
                                                                            onClick={() => setPreviewDoc(doc)} 
                                                                            className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors justify-center flex-1 sm:flex-none"
                                                                        >
                                                                            <Eye className="w-4 h-4" />
                                                                            <span>Preview</span>
                                                                        </button>
                                                                        <a href={doc.file_path} download target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors justify-center flex-1 sm:flex-none">
                                                                            <Download className="w-4 h-4" />
                                                                            <span>Unduh</span>
                                                                        </a>
                                                                    </>
                                                                ) : (
                                                                    <span className="text-xs text-slate-400 italic px-3 py-2">Berkas belum tersedia</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>

                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-slate-200">
                            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Belum Ada Dokumen</h3>
                            <p className="text-slate-500">Dokumen institusi belum ditambahkan. Silakan hubungi administrator.</p>
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
                                    <p className="text-sm text-slate-500 mt-0.5 truncate">{[previewDoc.file_size, previewDoc.kategori].filter(Boolean).join(' • ')}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                                <a 
                                    href={previewDoc.file_path} 
                                    download 
                                    className="px-4 py-2 text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors flex items-center gap-2" 
                                    title="Unduh File"
                                >
                                    <Download className="w-4 h-4" />
                                    <span className="hidden sm:inline text-sm font-semibold">Unduh</span>
                                </a>
                                
                                <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block"></div>
                                
                                <button 
                                    ref={closeButtonRef}
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
                                src={previewDoc.file_path} 
                                className="w-full h-full sm:rounded-xl shadow-inner bg-white border-0"
                                title={previewDoc.judul}
                            >
                                <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
                                    <p>Browser Anda tidak mendukung preview PDF secara langsung.</p>
                                    <a href={previewDoc.file_path} download className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium">
                                        Unduh Dokumen
                                    </a>
                                </div>
                            </iframe>
                        </div>
                    </div>
                    </div>
                </div>, document.body
            )}
        </PublicLayout>
    );
}