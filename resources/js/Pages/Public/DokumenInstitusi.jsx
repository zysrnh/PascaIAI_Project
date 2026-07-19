import React, { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { FileText, Download, ChevronRight, BookOpen, Scale, FileSpreadsheet, Activity, Target, Eye, X } from 'lucide-react';

export default function DokumenInstitusi({ dokumens, pengaturan }) {
    const bannerImg = pengaturan?.banner_image || "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1600&auto=format&fit=crop";

    const uniqueCategories = [...new Set((dokumens || []).map(doc => doc.kategori))];

    const colors = [
        { name: 'emerald', icon: <Scale className="w-6 h-6" /> },
        { name: 'blue', icon: <Target className="w-6 h-6" /> },
        { name: 'amber', icon: <BookOpen className="w-6 h-6" /> },
        { name: 'purple', icon: <Activity className="w-6 h-6" /> },
        { name: 'slate', icon: <FileSpreadsheet className="w-6 h-6" /> },
        { name: 'indigo', icon: <Scale className="w-6 h-6" /> },
        { name: 'rose', icon: <Target className="w-6 h-6" /> },
    ];

    const documentCategories = uniqueCategories.map((catName, index) => {
        const style = colors[index % colors.length];
        return {
            id: catName,
            title: catName,
            icon: style.icon,
            color: style.name,
            documents: (dokumens || []).filter(doc => doc.kategori === catName)
        };
    }).filter(cat => cat.documents.length > 0);

    const [activeCategory, setActiveCategory] = useState(documentCategories.length > 0 ? documentCategories[0].id : null);
    const [previewDoc, setPreviewDoc] = useState(null);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (previewDoc) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [previewDoc]);

    useEffect(() => {
        if (documentCategories.length > 0 && !activeCategory) {
            setActiveCategory(documentCategories[0].id);
        }
    }, [documentCategories]);

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
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm"></div>
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
                                    <div className="p-2">
                                        {documentCategories.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => setActiveCategory(category.id)}
                                                className={`w-full flex items-center justify-between p-4 rounded-lg mb-1 transition-all text-left ${
                                                    activeCategory === category.id 
                                                    ? 'bg-emerald-50 text-emerald-700 font-bold border-l-4 border-emerald-500' 
                                                    : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent hover:border-slate-300 font-medium'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`${activeCategory === category.id ? 'text-emerald-600' : 'text-slate-400'}`}>
                                                        {category.icon}
                                                    </div>
                                                    <span>{category.title}</span>
                                                </div>
                                                <ChevronRight className={`w-4 h-4 transition-transform ${activeCategory === category.id ? 'text-emerald-500' : 'text-slate-300'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* List Dokumen */}
                            <div className="w-full lg:w-2/3">
                                {documentCategories.map((category) => (
                                    activeCategory === category.id && (
                                        <div 
                                            key={category.id} 
                                            className="animate-fade-in-up"
                                        >
                                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                                    <div className={`p-3 rounded-lg bg-${category.color}-100 text-${category.color}-600`}>
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
                                                                        <span className="font-medium bg-slate-100 px-2 py-0.5 rounded">{doc.file_size}</span>
                                                                        <span>Diperbarui: {new Date(doc.updated_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex-shrink-0 flex items-center gap-2 w-full sm:w-auto">
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
            {previewDoc && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-slate-900/70 backdrop-blur-sm transition-all duration-300">
                    <div 
                        className="absolute inset-0" 
                        onClick={() => setPreviewDoc(null)}
                    ></div>
                    
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden animate-fade-in-up relative z-10 border border-slate-200">
                        {/* Header Modal */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/80">
                            <div className="flex items-center gap-4 max-w-[70%] sm:max-w-[80%]">
                                <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl flex-shrink-0">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="overflow-hidden">
                                    <h3 className="text-lg font-bold text-slate-800 truncate" title={previewDoc.judul}>{previewDoc.judul}</h3>
                                    <p className="text-sm text-slate-500 mt-0.5 truncate">{previewDoc.file_size} • {previewDoc.kategori}</p>
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
                                    onClick={() => setPreviewDoc(null)} 
                                    className="p-2 text-slate-400 hover:text-white hover:bg-red-500 rounded-lg transition-colors" 
                                    title="Tutup Preview"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Area Preview */}
                        <div className="flex-1 w-full bg-slate-800 p-0 sm:p-4 md:p-6 overflow-hidden">
                            <iframe 
                                src={`${previewDoc.file_path}#toolbar=0&navpanes=0&scrollbar=0`} 
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
            )}
        </PublicLayout>
    );
}
