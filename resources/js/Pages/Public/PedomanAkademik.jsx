import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Head, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { 
    BookOpen, Download, FileText, Search, Eye, X, 
    Folder, FolderOpen, ChevronRight, Home, ArrowLeft,
    FileType, FileSpreadsheet, Presentation 
} from 'lucide-react';
import Breadcrumb from '@/Components/Public/Breadcrumb';

// Helper: get file icon based on type
const getFileIcon = (tipeFile, size = 'w-6 h-6') => {
    switch (tipeFile) {
        case 'pdf': return <FileText className={size} />;
        case 'doc': case 'docx': return <FileType className={size} />;
        case 'xls': case 'xlsx': return <FileSpreadsheet className={size} />;
        case 'ppt': case 'pptx': return <Presentation className={size} />;
        default: return <FileText className={size} />;
    }
};

const getFileColor = (tipeFile) => {
    switch (tipeFile) {
        case 'pdf': return { bg: 'bg-red-50', text: 'text-red-500', accent: 'bg-red-500' };
        case 'doc': case 'docx': return { bg: 'bg-blue-50', text: 'text-blue-500', accent: 'bg-blue-500' };
        case 'xls': case 'xlsx': return { bg: 'bg-green-50', text: 'text-green-500', accent: 'bg-green-500' };
        case 'ppt': case 'pptx': return { bg: 'bg-orange-50', text: 'text-orange-500', accent: 'bg-orange-500' };
        default: return { bg: 'bg-slate-50', text: 'text-slate-500', accent: 'bg-slate-500' };
    }
};

const getFileLabel = (tipeFile) => {
    switch (tipeFile) {
        case 'pdf': return 'PDF';
        case 'doc': case 'docx': return 'Word';
        case 'xls': case 'xlsx': return 'Excel';
        case 'ppt': case 'pptx': return 'PowerPoint';
        default: return tipeFile?.toUpperCase() || 'FILE';
    }
};

export default function PedomanAkademik({ folders, documents, currentFolder, breadcrumb, pengaturan, currentFolderId }) {
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
    const filteredFolders = folders.filter(f => f.nama.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredDocs = documents.filter(d => 
        d.judul.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (d.deskripsi && d.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalItems = filteredFolders.length + filteredDocs.length;

    // Build breadcrumb for PublicLayout Breadcrumb component
    const breadcrumbItems = [
        { label: 'Akademik' },
        { label: 'Pedoman Akademik', ...(breadcrumb && breadcrumb.length > 0 ? {} : {}) },
    ];
    if (breadcrumb && breadcrumb.length > 0) {
        breadcrumb.forEach(item => {
            breadcrumbItems.push({ label: item.nama });
        });
    }

    return (
        <PublicLayout>
            <Head title="Pedoman Akademik - Pascasarjana IAI Persis Bandung" />

            {/* Banner Section */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={pengaturan?.banner_image || "/images/default-banner.jpg"}
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

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={breadcrumbItems} />

            {/* Main Content Area */}
            <div className="bg-slate-50 py-12 lg:py-20 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header & Navigation */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8 overflow-hidden">
                        {/* Breadcrumb Path */}
                        <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-2 overflow-x-auto pb-1">
                                <button 
                                    onClick={() => navigateToFolder(null)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                                        ${!currentFolderId ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'}`}
                                >
                                    <Home className="w-4 h-4" />
                                    <span>Beranda</span>
                                </button>
                                {breadcrumb && breadcrumb.map((item, index) => (
                                    <React.Fragment key={item.id}>
                                        <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                        <button 
                                            onClick={() => navigateToFolder(item.id)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
                                                ${index === breadcrumb.length - 1 ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'}`}
                                        >
                                            <Folder className="w-4 h-4" />
                                            <span>{item.nama}</span>
                                        </button>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        {/* Search & Actions */}
                        <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3">
                                {currentFolderId && (
                                    <button onClick={goBack} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                                        <ArrowLeft className="w-4 h-4" /> Kembali
                                    </button>
                                )}
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                        {currentFolder ? (
                                            <><Folder className="w-5 h-5 text-amber-500" /> {currentFolder.nama}</>
                                        ) : (
                                            <><BookOpen className="w-5 h-5 text-emerald-600" /> Semua Dokumen</>
                                        )}
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-0.5">
                                        {totalItems} item{totalItems !== 1 ? '' : ''}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full sm:w-80 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-slate-400" />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="Cari folder atau dokumen..." 
                                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    {totalItems === 0 ? (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-4">
                                <FolderOpen className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">
                                {searchTerm ? 'Tidak ditemukan' : 'Folder kosong'}
                            </h3>
                            <p className="text-slate-500 max-w-md mx-auto">
                                {searchTerm 
                                    ? 'Tidak ditemukan folder atau dokumen yang cocok dengan pencarian Anda.' 
                                    : 'Belum ada dokumen pedoman akademik di lokasi ini.'}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {/* Folders */}
                            {filteredFolders.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Folder className="w-3.5 h-3.5" /> Folder ({filteredFolders.length})
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                        {filteredFolders.map(folder => (
                                            <button 
                                                key={folder.id}
                                                onClick={() => navigateToFolder(folder.id)}
                                                className="group bg-white border border-slate-200 rounded-xl p-5 hover:bg-amber-50 hover:border-amber-300 hover:shadow-lg cursor-pointer transition-all duration-300 text-center flex flex-col items-center"
                                            >
                                                <div className="w-16 h-16 flex items-center justify-center mb-3">
                                                    <Folder className="w-14 h-14 text-amber-400 group-hover:text-amber-500 transition-colors drop-shadow-sm group-hover:scale-110 transition-transform duration-300" fill="currentColor" />
                                                </div>
                                                <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-700 line-clamp-2 leading-tight transition-colors">{folder.nama}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Documents */}
                            {filteredDocs.length > 0 && (
                                <div>
                                    <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <FileText className="w-3.5 h-3.5" /> Dokumen ({filteredDocs.length})
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredDocs.map((doc) => {
                                            const color = getFileColor(doc.tipe_file);
                                            return (
                                                <div key={doc.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full group overflow-hidden">
                                                    <div className="p-6 flex-grow">
                                                        <div className="flex items-start justify-between mb-4">
                                                            <div className={`p-3 ${color.bg} ${color.text} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                                                                {getFileIcon(doc.tipe_file)}
                                                            </div>
                                                            <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${color.bg} ${color.text}`}>
                                                                {getFileLabel(doc.tipe_file)}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug group-hover:text-emerald-700 transition-colors">
                                                            {doc.judul}
                                                        </h3>
                                                        {doc.deskripsi && (
                                                            <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                                                                {doc.deskripsi}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                                            {getFileIcon(doc.tipe_file, 'w-4 h-4')}
                                                            Dokumen {getFileLabel(doc.tipe_file)}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button 
                                                                onClick={() => setPreviewDoc(doc)} 
                                                                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors shadow-sm"
                                                            >
                                                                <Eye className="w-4 h-4" /> <span className="hidden sm:inline">Preview</span>
                                                            </button>
                                                            <a 
                                                                href={`/storage/${doc.file_path}`} 
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
                    className="fixed inset-0 z-[100] overflow-y-auto bg-slate-900/70 transition-opacity duration-300"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="preview-doc-title"
                >
                    <div className="fixed inset-0" onClick={() => setPreviewDoc(null)}></div>
                    <div className="flex min-h-full items-center justify-center p-4 md:p-8 relative z-10">
                        <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl h-[85vh] min-h-[500px] flex flex-col overflow-hidden animate-fade-in-up border border-slate-200">
                            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/80">
                                <div className="flex items-center gap-4 max-w-[70%] sm:max-w-[80%]">
                                    <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl flex-shrink-0">
                                        {getFileIcon(previewDoc.tipe_file, 'w-6 h-6')}
                                    </div>
                                    <div className="overflow-hidden">
                                        <h3 id="preview-doc-title" className="text-lg font-bold text-slate-800 truncate" title={previewDoc.judul}>{previewDoc.judul}</h3>
                                        <p className="text-sm text-slate-500 mt-0.5 truncate">Dokumen Pedoman Akademik ({getFileLabel(previewDoc.tipe_file)})</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0">
                                    <a href={`/storage/${previewDoc.file_path}`} download 
                                        className="px-4 py-2 text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors flex items-center gap-2" title="Unduh File">
                                        <Download className="w-4 h-4" />
                                        <span className="hidden sm:inline text-sm font-semibold">Unduh</span>
                                    </a>
                                    <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block"></div>
                                    <button onClick={() => setPreviewDoc(null)} className="p-2 text-slate-400 hover:text-white hover:bg-red-500 rounded-lg transition-colors" title="Tutup Preview" aria-label="Tutup preview">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 w-full bg-slate-800 p-2 sm:p-4 md:p-6 overflow-hidden flex flex-col items-center justify-center">
                                {previewDoc.tipe_file === 'pdf' ? (
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
                                ) : (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) ? (
                                    <div className="bg-white rounded-2xl p-8 sm:p-12 max-w-lg text-center shadow-xl border border-slate-100 flex flex-col items-center">
                                        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                                            {getFileIcon(previewDoc.tipe_file, 'w-10 h-10')}
                                        </div>
                                        <h4 className="text-xl font-bold text-slate-800 mb-2">{previewDoc.judul}</h4>
                                        <span className="text-xs font-bold uppercase px-3 py-1 bg-blue-100 text-blue-700 rounded-full mb-4">
                                            Dokumen {getFileLabel(previewDoc.tipe_file)}
                                        </span>
                                        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                                            Pratinjau langsung untuk file Office ({getFileLabel(previewDoc.tipe_file)}) memerlukan koneksi ke Google Viewer saat website sudah <strong>live di hosting</strong>. Di server lokal (localhost), file dapat langsung diunduh dan dibuka di komputer Anda.
                                        </p>
                                        <a 
                                            href={`/storage/${previewDoc.file_path}`} 
                                            download 
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg"
                                        >
                                            <Download className="w-5 h-5" /> Unduh Dokumen ({getFileLabel(previewDoc.tipe_file)})
                                        </a>
                                    </div>
                                ) : (
                                    <iframe 
                                        src={`https://docs.google.com/gview?url=${encodeURIComponent(`${window.location.protocol}//${window.location.host}/storage/${previewDoc.file_path}`)}&embedded=true`}
                                        className="w-full h-full sm:rounded-xl shadow-inner bg-white border-0" 
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
