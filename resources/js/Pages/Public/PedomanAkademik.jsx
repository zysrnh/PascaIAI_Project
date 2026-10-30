import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Head, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    BookOpen, Download, FileText, Search, Eye, X, 
    Folder, ChevronRight, Home, ArrowLeft,
    FileType, FileSpreadsheet, Presentation, FolderOpen,
    Calendar, HardDrive
} from 'lucide-react';
import Breadcrumb from '@/Components/Public/Breadcrumb';

// Helper: get file icon based on type
const getFileIcon = (tipeFile, size = 'w-5 h-5') => {
    switch (tipeFile?.toLowerCase()) {
        case 'pdf': return <FileText className={size} />;
        case 'doc': case 'docx': return <FileType className={size} />;
        case 'xls': case 'xlsx': return <FileSpreadsheet className={size} />;
        case 'ppt': case 'pptx': return <Presentation className={size} />;
        default: return <FileText className={size} />;
    }
};

const getFileColor = (tipeFile) => {
    switch (tipeFile?.toLowerCase()) {
        case 'pdf': return { bg: 'bg-rose-50 text-rose-600 border-rose-200/60', badge: 'bg-rose-50 text-rose-700' };
        case 'doc': case 'docx': return { bg: 'bg-blue-50 text-blue-600 border-blue-200/60', badge: 'bg-blue-50 text-blue-700' };
        case 'xls': case 'xlsx': return { bg: 'bg-emerald-50 text-emerald-600 border-emerald-200/60', badge: 'bg-emerald-50 text-emerald-700' };
        case 'ppt': case 'pptx': return { bg: 'bg-amber-50 text-amber-600 border-amber-200/60', badge: 'bg-amber-50 text-amber-700' };
        default: return { bg: 'bg-slate-50 text-slate-600 border-slate-200/60', badge: 'bg-slate-100 text-slate-700' };
    }
};

const getFileLabel = (tipeFile) => {
    switch (tipeFile?.toLowerCase()) {
        case 'pdf': return 'PDF';
        case 'doc': case 'docx': return 'Word';
        case 'xls': case 'xlsx': return 'Excel';
        case 'ppt': case 'pptx': return 'PowerPoint';
        default: return tipeFile?.toUpperCase() || 'FILE';
    }
};

export default function PedomanAkademik({ folders = [], documents = [], currentFolder, breadcrumb = [], pengaturan, currentFolderId }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [previewDoc, setPreviewDoc] = useState(null);

    // Navigation
    const navigateToFolder = (folderId) => {
        const url = folderId 
            ? route('public.akademik.pedoman', { folder_id: folderId })
            : route('public.akademik.pedoman');
        router.visit(url, { 
            preserveScroll: true, 
            preserveState: true,
            only: ['folders', 'documents', 'currentFolder', 'breadcrumb', 'currentFolderId']
        });
    };

    const goBack = () => {
        if (currentFolder?.parent_id) {
            navigateToFolder(currentFolder.parent_id);
        } else {
            navigateToFolder(null);
        }
    };

    // Filter
    const filteredFolders = folders.filter(f => f.nama?.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredDocs = documents.filter(d => 
        d.judul?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (d.deskripsi && d.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalItems = filteredFolders.length + filteredDocs.length;

    // Breadcrumbs for PublicLayout
    const breadcrumbItems = [
        { label: 'Akademik' },
        { label: 'Pedoman & Dokumen Mutu' },
    ];
    if (breadcrumb && breadcrumb.length > 0) {
        breadcrumb.forEach(item => {
            breadcrumbItems.push({ label: item.nama });
        });
    }

    return (
        <PublicLayout>
            <Head title="Pedoman & Dokumen Mutu | Program Pascasarjana IAI Persis Bandung" />

            {/* Dark Minimalist Hero Section */}
            <div className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
                        <BookOpen className="w-3.5 h-3.5" />
                        Penjaminan Mutu & Regulasi
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.18] tracking-tight mb-4">
                        Pedoman & <span className="font-serif italic font-normal text-emerald-300">Instrumen AMI</span>
                    </h1>
                    <p className="text-slate-300/90 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
                        {pengaturan?.deskripsi || 'Dokumen panduan, instrumen audit mutu internal, dan petunjuk teknis penjaminan mutu IAI Persis Bandung.'}
                    </p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={breadcrumbItems} />

            {/* Main Content Area */}
            <div className="bg-[#FAFBFD] py-12 lg:py-16 border-b border-slate-200/80 min-h-[550px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Bento Explorer Bar */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs mb-8 overflow-hidden">
                        {/* Folder Trail Navigation */}
                        <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3 overflow-x-auto scrollbar-thin">
                            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 shrink-0">
                                <button 
                                    onClick={() => navigateToFolder(null)}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                                        !currentFolderId 
                                        ? 'bg-emerald-100 text-emerald-800 font-semibold' 
                                        : 'hover:bg-slate-200/70 text-slate-600'
                                    }`}
                                >
                                    <Home className="w-3.5 h-3.5" />
                                    <span>Beranda Dokumen</span>
                                </button>

                                {breadcrumb && breadcrumb.map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                        <button 
                                            onClick={() => navigateToFolder(item.id)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                                                index === breadcrumb.length - 1 
                                                ? 'bg-emerald-100 text-emerald-800 font-semibold' 
                                                : 'hover:bg-slate-200/70 text-slate-600'
                                            }`}
                                        >
                                            <Folder className="w-3.5 h-3.5 text-amber-500" />
                                            <span>{item.nama}</span>
                                        </button>
                                    </React.Fragment>
                                ))}
                            </div>

                            {currentFolderId && (
                                <button
                                    onClick={goBack}
                                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg transition-colors shrink-0 shadow-2xs"
                                >
                                    <ArrowLeft className="w-3.5 h-3.5" />
                                    <span>Kembali</span>
                                </button>
                            )}
                        </div>

                        {/* Search & Stats Header */}
                        <div className="p-5 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-slate-900 flex items-center gap-2">
                                    <FolderOpen className="w-5 h-5 text-emerald-600" />
                                    <span>{currentFolder ? currentFolder.nama : 'Semua Berkas & Folder Dokumen'}</span>
                                </h3>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Menampilkan {totalItems} item {searchTerm && `hasil pencarian "${searchTerm}"`}
                                </p>
                            </div>

                            <div className="w-full sm:w-80 relative">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                <input
                                    type="text"
                                    placeholder="Cari folder atau dokumen..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                />
                                {searchTerm && (
                                    <button 
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    {totalItems === 0 ? (
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-16 text-center text-slate-500">
                            <Folder className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                            <h3 className="text-lg font-semibold text-slate-800 mb-1">
                                {searchTerm ? 'Item Tidak Ditemukan' : 'Folder Masih Kosong'}
                            </h3>
                            <p className="text-sm text-slate-500 max-w-md mx-auto">
                                {searchTerm 
                                    ? `Tidak ada folder atau berkas yang cocok dengan kata kunci "${searchTerm}".`
                                    : 'Belum ada berkas atau subfolder yang ditambahkan pada direktori ini.'}
                            </p>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition-colors"
                                >
                                    Hapus Filter Pencarian
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Folder Grid */}
                            {filteredFolders.length > 0 && (
                                <div>
                                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                                        <Folder className="w-3.5 h-3.5" />
                                        <span>Folder ({filteredFolders.length})</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {filteredFolders.map(folder => (
                                            <div
                                                key={folder.id}
                                                onClick={() => navigateToFolder(folder.id)}
                                                className="group cursor-pointer bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-300 p-4 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs hover:shadow-sm flex items-center gap-3.5"
                                            >
                                                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 border border-amber-200/60 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                                                    <Folder className="w-5 h-5 fill-amber-400" />
                                                </div>
                                                <div className="overflow-hidden flex-1">
                                                    <h4 className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors truncate">
                                                        {folder.nama}
                                                    </h4>
                                                    <p className="text-[11px] text-slate-400 mt-0.5">
                                                        Buka direktori
                                                    </p>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-colors shrink-0" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Documents List */}
                            {filteredDocs.length > 0 && (
                                <div>
                                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                                        <FileText className="w-3.5 h-3.5" />
                                        <span>Dokumen & Berkas ({filteredDocs.length})</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        {filteredDocs.map(doc => {
                                            const colors = getFileColor(doc.tipe_file);
                                            return (
                                                <div
                                                    key={doc.id}
                                                    className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 p-4 sm:p-5 transition-all duration-200 shadow-2xs hover:shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                                                >
                                                    <div className="flex items-start gap-4 flex-1 min-w-0">
                                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${colors.bg}`}>
                                                            {getFileIcon(doc.tipe_file, 'w-5 h-5')}
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md ${colors.badge}`}>
                                                                    {getFileLabel(doc.tipe_file)}
                                                                </span>
                                                                {doc.ukuran_file && (
                                                                    <span className="text-[11px] text-slate-400">
                                                                        {doc.ukuran_file}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <h4 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-1">
                                                                {doc.judul}
                                                            </h4>
                                                            {doc.deskripsi && (
                                                                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                                                    {doc.deskripsi}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                                                        <button
                                                            onClick={() => setPreviewDoc(doc)}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-2xs"
                                                            title="Pratinjau Dokumen"
                                                        >
                                                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                                                            <span>Pratinjau</span>
                                                        </button>
                                                        <a
                                                            href={`/storage/${doc.file_path}`}
                                                            download
                                                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 rounded-xl transition-colors shadow-2xs"
                                                            title="Unduh File"
                                                        >
                                                            <Download className="w-3.5 h-3.5 text-emerald-600" />
                                                            <span>Unduh</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Preview Dokumen */}
            {previewDoc && typeof document !== 'undefined' && createPortal(
                <div
                    className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/75 backdrop-blur-xs transition-opacity duration-300"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="preview-doc-title"
                >
                    <div className="fixed inset-0" onClick={() => setPreviewDoc(null)}></div>
                    <div className="flex min-h-full items-center justify-center p-3 sm:p-6 md:p-8 relative z-10">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[88vh] min-h-[500px] flex flex-col overflow-hidden animate-fade-in-up border border-slate-200">
                            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/80">
                                <div className="flex items-center gap-3.5 max-w-[70%] sm:max-w-[80%]">
                                    <div className="p-2 bg-emerald-50 text-emerald-600 border border-emerald-200/60 rounded-xl shrink-0">
                                        {getFileIcon(previewDoc.tipe_file, 'w-5 h-5')}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 id="preview-doc-title" className="text-sm sm:text-base font-semibold text-slate-900 truncate" title={previewDoc.judul}>
                                            {previewDoc.judul}
                                        </h3>
                                        <p className="text-xs text-slate-500 truncate">
                                            Format: {getFileLabel(previewDoc.tipe_file)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <a 
                                        href={`/storage/${previewDoc.file_path}`} 
                                        download 
                                        className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 rounded-xl transition-colors flex items-center gap-1.5" 
                                        title="Unduh File"
                                    >
                                        <Download className="w-3.5 h-3.5 text-emerald-600" />
                                        <span className="hidden sm:inline">Unduh</span>
                                    </a>
                                    <button 
                                        onClick={() => setPreviewDoc(null)} 
                                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors" 
                                        title="Tutup Preview" 
                                        aria-label="Tutup preview"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 w-full bg-slate-900 p-2 sm:p-4 overflow-hidden flex flex-col items-center justify-center">
                                {previewDoc.tipe_file?.toLowerCase() === 'pdf' ? (
                                    <iframe 
                                        src={`/storage/${previewDoc.file_path}`} 
                                        className="w-full h-full rounded-xl shadow-inner bg-white border-0" 
                                        title={previewDoc.judul}
                                    >
                                        <p className="text-center p-8 text-white">
                                            Browser Anda tidak mendukung pratinjau PDF. 
                                            <a href={`/storage/${previewDoc.file_path}`} className="text-emerald-400 underline ml-1">Silakan unduh file.</a>
                                        </p>
                                    </iframe>
                                ) : (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) ? (
                                    <div className="bg-white rounded-2xl p-6 sm:p-10 max-w-md text-center shadow-xl border border-slate-100 flex flex-col items-center">
                                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-3">
                                            {getFileIcon(previewDoc.tipe_file, 'w-8 h-8')}
                                        </div>
                                        <h4 className="text-base font-semibold text-slate-900 mb-1">{previewDoc.judul}</h4>
                                        <span className="text-[11px] font-semibold uppercase px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-md mb-3">
                                            Dokumen {getFileLabel(previewDoc.tipe_file)}
                                        </span>
                                        <p className="text-slate-500 text-xs mb-5 leading-relaxed">
                                            Pratinjau langsung untuk berkas Office ({getFileLabel(previewDoc.tipe_file)}) di server lokal membutuhkan tautan Google Docs Viewer publik saat sudah tayang di web hosting. Untuk lokal, Anda dapat langsung mengunduh dan membukanya di komputer.
                                        </p>
                                        <a 
                                            href={`/storage/${previewDoc.file_path}`} 
                                            download 
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl text-xs transition-colors shadow-xs"
                                        >
                                            <Download className="w-4 h-4" /> Unduh Dokumen ({getFileLabel(previewDoc.tipe_file)})
                                        </a>
                                    </div>
                                ) : (
                                    <iframe 
                                        src={`https://docs.google.com/gview?url=${encodeURIComponent(`${window.location.protocol}//${window.location.host}/storage/${previewDoc.file_path}`)}&embedded=true`}
                                        className="w-full h-full rounded-xl shadow-inner bg-white border-0" 
                                        title={previewDoc.judul}
                                    >
                                        <p className="text-center p-8 text-white">
                                            Browser Anda tidak mendukung pratinjau file ini. 
                                            <a href={`/storage/${previewDoc.file_path}`} className="text-emerald-400 underline ml-1">Silakan unduh file.</a>
                                        </p>
                                    </iframe>
                                )}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </PublicLayout>
    );
}
