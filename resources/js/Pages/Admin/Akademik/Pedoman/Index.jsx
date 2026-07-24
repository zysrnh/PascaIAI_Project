import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    FolderPlus, 
    FilePlus, 
    Edit, 
    Trash2, 
    Image, 
    Upload, 
    X,
    FileText,
    Download,
    Folder,
    FolderOpen,
    ChevronRight,
    Home,
    Search,
    MoreVertical,
    FileSpreadsheet,
    FileType,
    Presentation,
    ArrowLeft,
    Grid3X3,
    List,
    BookOpen,
    Eye,
} from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Swal from 'sweetalert2';
import Sidebar from '@/Components/Admin/Sidebar';

// Helper: get file icon based on type
const getFileIcon = (tipeFile) => {
    switch (tipeFile) {
        case 'pdf': return <FileText className="w-8 h-8" />;
        case 'doc': case 'docx': return <FileType className="w-8 h-8" />;
        case 'xls': case 'xlsx': return <FileSpreadsheet className="w-8 h-8" />;
        case 'ppt': case 'pptx': return <Presentation className="w-8 h-8" />;
        default: return <FileText className="w-8 h-8" />;
    }
};

const getFileColor = (tipeFile) => {
    switch (tipeFile) {
        case 'pdf': return { bg: 'bg-red-50', text: 'text-red-500', border: 'border-red-200', hoverBg: 'hover:bg-red-100' };
        case 'doc': case 'docx': return { bg: 'bg-blue-50', text: 'text-blue-500', border: 'border-blue-200', hoverBg: 'hover:bg-blue-100' };
        case 'xls': case 'xlsx': return { bg: 'bg-green-50', text: 'text-green-500', border: 'border-green-200', hoverBg: 'hover:bg-green-100' };
        case 'ppt': case 'pptx': return { bg: 'bg-orange-50', text: 'text-orange-500', border: 'border-orange-200', hoverBg: 'hover:bg-orange-100' };
        default: return { bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-200', hoverBg: 'hover:bg-slate-100' };
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

export default function Index({ auth, folders, documents, currentFolder, breadcrumb, pengaturan, currentFolderId }) {
    const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
    const [isDocModalOpen, setIsDocModalOpen] = useState(false);
    const [editingFolder, setEditingFolder] = useState(null);
    const [editingDoc, setEditingDoc] = useState(null);
    const [previewDoc, setPreviewDoc] = useState(null);
    const [previewBanner, setPreviewBanner] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [openMenuId, setOpenMenuId] = useState(null);

    const folderForm = useForm({ nama: '', parent_id: currentFolderId || '' });
    const docForm = useForm({ judul: '', deskripsi: '', file_pdf: null, folder_id: currentFolderId || '' });
    const bannerForm = useForm({ banner_image: null, deskripsi: pengaturan?.deskripsi || '' });

    // ===== Navigation =====
    const navigateToFolder = (folderId) => {
        const url = folderId 
            ? route('admin.akademik.pedoman.index', { folder_id: folderId }) 
            : route('admin.akademik.pedoman.index');
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

    // ===== Folder CRUD =====
    const openFolderModal = (folder = null) => {
        folderForm.clearErrors();
        if (folder) {
            setEditingFolder(folder);
            folderForm.setData({ nama: folder.nama, parent_id: folder.parent_id || '' });
        } else {
            setEditingFolder(null);
            folderForm.setData({ nama: '', parent_id: currentFolderId || '' });
        }
        setIsFolderModalOpen(true);
    };

    const closeFolderModal = () => {
        setIsFolderModalOpen(false);
        setEditingFolder(null);
        folderForm.reset();
        folderForm.clearErrors();
    };

    const submitFolder = (e) => {
        e.preventDefault();
        if (editingFolder) {
            folderForm.post(route('admin.akademik.pedoman.folder.update', editingFolder.id), {
                preserveScroll: true,
                onSuccess: () => closeFolderModal(),
                onError: (errors) => {
                    Swal.fire({ title: 'Gagal!', text: Object.values(errors)[0], icon: 'error', confirmButtonColor: '#ef4444' });
                }
            });
        } else {
            folderForm.post(route('admin.akademik.pedoman.folder.store'), {
                preserveScroll: true,
                onSuccess: () => closeFolderModal(),
                onError: (errors) => {
                    Swal.fire({ title: 'Gagal!', text: Object.values(errors)[0], icon: 'error', confirmButtonColor: '#ef4444' });
                }
            });
        }
    };

    const deleteFolder = (id, nama) => {
        Swal.fire({
            title: `Hapus Folder "${nama}"?`,
            text: "Semua file dan sub-folder di dalamnya juga akan dihapus!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.akademik.pedoman.folder.destroy', id), { preserveScroll: true });
            }
        });
    };

    // ===== Document CRUD =====
    const openDocModal = (doc = null) => {
        docForm.clearErrors();
        if (doc) {
            setEditingDoc(doc);
            docForm.setData({ judul: doc.judul, deskripsi: doc.deskripsi || '', file_pdf: null, folder_id: doc.folder_id || '' });
        } else {
            setEditingDoc(null);
            docForm.setData({ judul: '', deskripsi: '', file_pdf: null, folder_id: currentFolderId || '' });
        }
        setIsDocModalOpen(true);
    };

    const closeDocModal = () => {
        setIsDocModalOpen(false);
        setEditingDoc(null);
        docForm.reset();
        docForm.clearErrors();
    };

    const submitDoc = (e) => {
        e.preventDefault();
        const routeName = editingDoc
            ? route('admin.akademik.pedoman.update', editingDoc.id)
            : route('admin.akademik.pedoman.store');
        
        docForm.post(routeName, {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => closeDocModal(),
            onError: (errors) => {
                Swal.fire({ title: 'Gagal!', text: Object.values(errors)[0], icon: 'error', confirmButtonColor: '#ef4444' });
            }
        });
    };

    const deleteDoc = (id) => {
        Swal.fire({
            title: 'Hapus Dokumen?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.akademik.pedoman.destroy', id), { preserveScroll: true });
            }
        });
    };

    // ===== Banner =====
    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            bannerForm.setData('banner_image', file);
            setPreviewBanner(URL.createObjectURL(file));
        }
    };

    const submitBanner = (e) => {
        e.preventDefault();
        bannerForm.post(route('admin.akademik.pedoman.pengaturan'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => { bannerForm.reset('banner_image'); setPreviewBanner(null); },
            onError: (errors) => {
                Swal.fire({ title: 'Gagal!', text: Object.values(errors)[0] || 'Maks. file 2MB.', icon: 'error', confirmButtonColor: '#ef4444' });
            }
        });
    };

    const currentBannerUrl = previewBanner 
        ? previewBanner 
        : (pengaturan?.banner_image 
            ? (pengaturan.banner_image.startsWith('/storage/') || pengaturan.banner_image.startsWith('http') ? pengaturan.banner_image : `/storage/${pengaturan.banner_image}`)
            : null);

    // ===== Search Filter =====
    const filteredFolders = folders.filter(f => f.nama.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredDocs = documents.filter(d => 
        d.judul.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (d.deskripsi && d.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalItems = filteredFolders.length + filteredDocs.length;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Kelola Pedoman Akademik</h2>}
        >
            <Head title="Kelola Pedoman Akademik" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />
                <div className="min-w-0 flex-1 transition-all duration-700 ease-out transform opacity-100 translate-y-0">
                    <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-6">

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">Pedoman Akademik</h1>
                                <p className="text-slate-500 mt-1">Kelola folder dan dokumen pedoman akademik seperti Google Drive.</p>
                            </div>
                        </div>

                        {/* Pengaturan Banner & Deskripsi */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200">
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Image className="w-5 h-5" /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Banner Halaman</h3>
                                    <p className="text-sm text-slate-500">Atur gambar latar belakang untuk halaman Pedoman Akademik.</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <form onSubmit={submitBanner} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-700">Gambar Banner Saat Ini</label>
                                        <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                            {currentBannerUrl ? (
                                                <img src={currentBannerUrl} alt="Preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <img src="/images/default-banner.jpg" alt="Default Preview" className="w-full h-full object-cover" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                                            <div className="absolute bottom-6 left-6 z-10 text-white">
                                                <h1 className="text-3xl font-extrabold mb-2 drop-shadow-md">Pedoman Akademik</h1>
                                                <div className="w-16 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                                                {bannerForm.data.deskripsi && (
                                                    <p className="text-white/90 max-w-2xl text-sm leading-relaxed drop-shadow">{bannerForm.data.deskripsi}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <InputLabel htmlFor="deskripsi_halaman" value="Deskripsi Halaman (Opsional)" />
                                            <textarea id="deskripsi_halaman" rows="3"
                                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="Tuliskan deskripsi singkat mengenai pedoman akademik..."
                                                value={bannerForm.data.deskripsi}
                                                onChange={e => bannerForm.setData('deskripsi', e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-700">Ganti Banner (Maks. 2MB, JPG/PNG)</label>
                                            <label className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-emerald-500 ${bannerForm.errors.banner_image ? 'border-red-500' : ''}`}>
                                                <span className="flex items-center space-x-2"><Upload className="w-6 h-6 text-slate-600" /><span className="font-medium text-slate-600">Klik untuk mengunggah file gambar</span></span>
                                                <input type="file" name="banner_image" className="hidden" accept="image/*" onChange={handleBannerChange} />
                                            </label>
                                            {bannerForm.errors.banner_image && <p className="text-sm text-red-600 mt-1">{bannerForm.errors.banner_image}</p>}
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-slate-100">
                                        <PrimaryButton type="submit" disabled={bannerForm.processing}>Simpan Banner</PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* ===== GOOGLE DRIVE FILE MANAGER ===== */}
                        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-slate-200">
                            
                            {/* Toolbar */}
                            <div className="p-4 sm:p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                                {/* Breadcrumb */}
                                <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                                    <button 
                                        onClick={() => navigateToFolder(null)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                                            ${!currentFolderId ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'}`}
                                    >
                                        <Home className="w-4 h-4" />
                                        <span>Root</span>
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

                                {/* Action Bar */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {currentFolderId && (
                                            <button onClick={goBack} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                                                <ArrowLeft className="w-4 h-4" /> Kembali
                                            </button>
                                        )}
                                        <button onClick={() => openFolderModal()} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow">
                                            <FolderPlus className="w-4 h-4" /> Folder Baru
                                        </button>
                                        <button onClick={() => openDocModal()} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow">
                                            <FilePlus className="w-4 h-4" /> Upload Dokumen
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <div className="relative flex-1 sm:w-64">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input 
                                                type="text" 
                                                placeholder="Cari folder atau file..." 
                                                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex items-center bg-slate-100 rounded-lg p-1">
                                            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}>
                                                <Grid3X3 className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}>
                                                <List className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-4 sm:p-6">
                                {totalItems === 0 ? (
                                    <div className="py-16 text-center">
                                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-4">
                                            <FolderOpen className="w-10 h-10 text-slate-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-2">
                                            {searchTerm ? 'Tidak ditemukan' : 'Folder kosong'}
                                        </h3>
                                        <p className="text-slate-500 max-w-md mx-auto mb-6">
                                            {searchTerm 
                                                ? 'Tidak ada folder atau file yang cocok dengan pencarian Anda.'
                                                : 'Belum ada folder atau dokumen di lokasi ini. Mulai dengan membuat folder baru atau mengunggah dokumen.'}
                                        </p>
                                        {!searchTerm && (
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => openFolderModal()} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors">
                                                    <FolderPlus className="w-4 h-4" /> Buat Folder
                                                </button>
                                                <button onClick={() => openDocModal()} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
                                                    <FilePlus className="w-4 h-4" /> Upload Dokumen
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : viewMode === 'grid' ? (
                                    /* ===== GRID VIEW ===== */
                                    <div>
                                        {/* Folders */}
                                        {filteredFolders.length > 0 && (
                                            <div className="mb-6">
                                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                    <Folder className="w-3.5 h-3.5" /> Folder ({filteredFolders.length})
                                                </h4>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                                    {filteredFolders.map(folder => (
                                                        <div key={`folder-${folder.id}`} className="group relative bg-white border border-slate-200 rounded-xl p-4 hover:bg-amber-50 hover:border-amber-300 hover:shadow-md cursor-pointer transition-all duration-200">
                                                            <div onClick={() => navigateToFolder(folder.id)} className="flex flex-col items-center text-center">
                                                                <div className="w-14 h-14 flex items-center justify-center mb-3">
                                                                    <Folder className="w-12 h-12 text-amber-400 group-hover:text-amber-500 transition-colors drop-shadow-sm" fill="currentColor" />
                                                                </div>
                                                                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 line-clamp-2 leading-tight">{folder.nama}</span>
                                                            </div>
                                                            {/* Actions */}
                                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <div className="relative">
                                                                    <button 
                                                                        onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === `folder-${folder.id}` ? null : `folder-${folder.id}`); }}
                                                                        className="p-1 rounded-md hover:bg-slate-200 text-slate-500"
                                                                    >
                                                                        <MoreVertical className="w-4 h-4" />
                                                                    </button>
                                                                    {openMenuId === `folder-${folder.id}` && (
                                                                        <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1 min-w-[140px]">
                                                                            <button onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); openFolderModal(folder); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                                                                <Edit className="w-3.5 h-3.5" /> Rename
                                                                            </button>
                                                                            <button onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); deleteFolder(folder.id, folder.nama); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                                                                <Trash2 className="w-3.5 h-3.5" /> Hapus
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Documents */}
                                        {filteredDocs.length > 0 && (
                                            <div>
                                                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                    <FileText className="w-3.5 h-3.5" /> Dokumen ({filteredDocs.length})
                                                </h4>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                                    {filteredDocs.map(doc => {
                                                        const color = getFileColor(doc.tipe_file);
                                                        return (
                                                            <div key={`doc-${doc.id}`} className={`group relative bg-white border ${color.border} rounded-xl p-4 ${color.hoverBg} hover:shadow-md transition-all duration-200`}>
                                                                <div className="flex flex-col items-center text-center">
                                                                    <div className={`w-14 h-14 flex items-center justify-center mb-3 ${color.bg} rounded-xl ${color.text}`}>
                                                                        {getFileIcon(doc.tipe_file)}
                                                                    </div>
                                                                    <span className="text-sm font-medium text-slate-700 line-clamp-2 leading-tight mb-1">{doc.judul}</span>
                                                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${color.bg} ${color.text}`}>{getFileLabel(doc.tipe_file)}</span>
                                                                </div>
                                                                {/* Actions */}
                                                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <div className="relative">
                                                                        <button 
                                                                            onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === `doc-${doc.id}` ? null : `doc-${doc.id}`); }}
                                                                            className="p-1 rounded-md hover:bg-slate-200 text-slate-500"
                                                                        >
                                                                            <MoreVertical className="w-4 h-4" />
                                                                        </button>
                                                                        {openMenuId === `doc-${doc.id}` && (
                                                                            <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1 min-w-[160px]">
                                                                                <button onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); setPreviewDoc(doc); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                                                                    <Eye className="w-3.5 h-3.5" /> Preview
                                                                                </button>
                                                                                <a href={`/storage/${doc.file_path}`} target="_blank" rel="noreferrer" className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                                                                    <Download className="w-3.5 h-3.5" /> Download
                                                                                </a>
                                                                                <button onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); openDocModal(doc); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                                                                                    <Edit className="w-3.5 h-3.5" /> Edit
                                                                                </button>
                                                                                <button onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); deleteDoc(doc.id); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                                                                    <Trash2 className="w-3.5 h-3.5" /> Hapus
                                                                                </button>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    /* ===== LIST VIEW ===== */
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs uppercase tracking-wider">
                                                    <th className="p-3 font-semibold">Nama</th>
                                                    <th className="p-3 font-semibold hidden md:table-cell">Tipe</th>
                                                    <th className="p-3 font-semibold hidden lg:table-cell">Deskripsi</th>
                                                    <th className="p-3 font-semibold text-right">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm divide-y divide-slate-100">
                                                {filteredFolders.map(folder => (
                                                    <tr key={`folder-${folder.id}`} className="hover:bg-amber-50 cursor-pointer transition-colors group">
                                                        <td className="p-3" onClick={() => navigateToFolder(folder.id)}>
                                                            <div className="flex items-center gap-3">
                                                                <Folder className="w-6 h-6 text-amber-400 flex-shrink-0" fill="currentColor" />
                                                                <span className="font-medium text-slate-800 group-hover:text-amber-700">{folder.nama}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-3 hidden md:table-cell text-slate-500">Folder</td>
                                                        <td className="p-3 hidden lg:table-cell text-slate-500">—</td>
                                                        <td className="p-3 text-right whitespace-nowrap">
                                                            <button onClick={() => openFolderModal(folder)} className="text-slate-500 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 p-2 rounded-lg transition-colors mr-1" title="Rename">
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button onClick={() => deleteFolder(folder.id, folder.nama)} className="text-slate-500 hover:text-red-700 bg-slate-100 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Hapus">
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {filteredDocs.map(doc => {
                                                    const color = getFileColor(doc.tipe_file);
                                                    return (
                                                        <tr key={`doc-${doc.id}`} className="hover:bg-slate-50 transition-colors group">
                                                            <td className="p-3">
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`w-8 h-8 flex items-center justify-center ${color.bg} rounded-lg ${color.text} flex-shrink-0`}>
                                                                        {React.cloneElement(getFileIcon(doc.tipe_file), { className: 'w-5 h-5' })}
                                                                    </div>
                                                                    <span className="font-medium text-slate-800">{doc.judul}</span>
                                                                </div>
                                                            </td>
                                                            <td className="p-3 hidden md:table-cell">
                                                                <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-full ${color.bg} ${color.text}`}>{getFileLabel(doc.tipe_file)}</span>
                                                            </td>
                                                            <td className="p-3 hidden lg:table-cell text-slate-500 max-w-xs truncate">{doc.deskripsi || '—'}</td>
                                                            <td className="p-3 text-right whitespace-nowrap">
                                                                <button onClick={() => setPreviewDoc(doc)} className="text-slate-500 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 p-2 rounded-lg transition-colors mr-1 inline-flex" title="Preview">
                                                                    <Eye className="w-4 h-4" />
                                                                </button>
                                                                <a href={`/storage/${doc.file_path}`} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-700 bg-slate-100 hover:bg-blue-50 p-2 rounded-lg transition-colors mr-1 inline-flex" title="Download">
                                                                    <Download className="w-4 h-4" />
                                                                </a>
                                                                <button onClick={() => openDocModal(doc)} className="text-slate-500 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 p-2 rounded-lg transition-colors mr-1" title="Edit">
                                                                    <Edit className="w-4 h-4" />
                                                                </button>
                                                                <button onClick={() => deleteDoc(doc.id)} className="text-slate-500 hover:text-red-700 bg-slate-100 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Hapus">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ===== MODAL: Folder ===== */}
            {isFolderModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={() => { closeFolderModal(); setOpenMenuId(null); }}>
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><FolderPlus className="w-5 h-5" /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">{editingFolder ? 'Rename Folder' : 'Buat Folder Baru'}</h3>
                                    <p className="text-sm text-slate-500">{editingFolder ? 'Ubah nama folder.' : 'Masukkan nama folder baru.'}</p>
                                </div>
                            </div>
                            <button onClick={closeFolderModal} className="text-slate-400 hover:text-slate-600 transition-colors bg-white p-2 rounded-full hover:bg-slate-100">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <form onSubmit={submitFolder} className="space-y-4">
                                <div>
                                    <InputLabel htmlFor="folder_nama" value="Nama Folder *" />
                                    <TextInput id="folder_nama" type="text" className="mt-1 block w-full" value={folderForm.data.nama}
                                        onChange={e => folderForm.setData('nama', e.target.value)} required placeholder="Contoh: Tahun Akademik 2024/2025"
                                    />
                                    {folderForm.errors.nama && <p className="text-sm text-red-600 mt-1">{folderForm.errors.nama}</p>}
                                </div>
                                <div className="flex justify-end pt-4 border-t border-slate-100 gap-3">
                                    <SecondaryButton onClick={closeFolderModal} type="button">Batal</SecondaryButton>
                                    <PrimaryButton type="submit" disabled={folderForm.processing}>
                                        {editingFolder ? 'Simpan' : 'Buat Folder'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== MODAL: Document ===== */}
            {isDocModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm" onClick={() => { closeDocModal(); setOpenMenuId(null); }}>
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><FilePlus className="w-5 h-5" /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">{editingDoc ? 'Edit Dokumen' : 'Upload Dokumen'}</h3>
                                    <p className="text-sm text-slate-500">Isi form di bawah ini dengan lengkap.</p>
                                </div>
                            </div>
                            <button onClick={closeDocModal} className="text-slate-400 hover:text-slate-600 transition-colors bg-white p-2 rounded-full hover:bg-slate-100">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <form onSubmit={submitDoc} className="space-y-6">
                                <div className="space-y-2">
                                    <InputLabel htmlFor="doc_judul" value="Judul Dokumen *" />
                                    <TextInput id="doc_judul" type="text" className="mt-1 block w-full" value={docForm.data.judul}
                                        onChange={e => docForm.setData('judul', e.target.value)} required placeholder="Contoh: SK Rektor No. 452 Tahun 2024"
                                    />
                                    {docForm.errors.judul && <p className="text-sm text-red-600">{docForm.errors.judul}</p>}
                                </div>
                                <div className="space-y-2">
                                    <InputLabel htmlFor="doc_deskripsi" value="Keterangan Tambahan" />
                                    <textarea id="doc_deskripsi" rows="3"
                                        className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm w-full"
                                        value={docForm.data.deskripsi}
                                        onChange={e => docForm.setData('deskripsi', e.target.value)}
                                        placeholder="Deskripsi opsional tentang dokumen ini..."
                                    ></textarea>
                                    {docForm.errors.deskripsi && <p className="text-sm text-red-600">{docForm.errors.deskripsi}</p>}
                                </div>
                                <div className="space-y-2">
                                    <InputLabel value={`File Dokumen (PDF/DOC/XLS/PPT) ${!editingDoc ? '*' : ''}`} />
                                    <label className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-xl cursor-pointer hover:border-emerald-500 ${docForm.errors.file_pdf ? 'border-red-500' : ''}`}>
                                        <span className="flex items-center space-x-2">
                                            <Upload className="w-6 h-6 text-slate-600" />
                                            <span className="font-medium text-slate-600">
                                                {docForm.data.file_pdf ? docForm.data.file_pdf.name : 'Pilih File (Max 20MB)'}
                                            </span>
                                        </span>
                                        <input type="file" name="file_pdf" className="hidden" 
                                            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                                            onChange={e => docForm.setData('file_pdf', e.target.files[0])}
                                            required={!editingDoc}
                                        />
                                    </label>
                                    {editingDoc && editingDoc.file_path && !docForm.data.file_pdf && (
                                        <p className="text-sm text-slate-500 mt-2">Biarkan kosong jika tidak ingin mengubah file.</p>
                                    )}
                                    {docForm.errors.file_pdf && <p className="text-sm text-red-600">{docForm.errors.file_pdf}</p>}
                                </div>
                                <div className="flex justify-end pt-4 border-t border-slate-100 gap-3">
                                    <SecondaryButton onClick={closeDocModal} type="button">Batal</SecondaryButton>
                                    <PrimaryButton type="submit" disabled={docForm.processing}>
                                        {editingDoc ? 'Simpan Perubahan' : 'Upload'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== MODAL: Preview Dokumen ===== */}
            {previewDoc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm" onClick={() => setPreviewDoc(null)}>
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl h-[85vh] min-h-[500px] flex flex-col overflow-hidden border border-slate-200" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg flex-shrink-0">
                                    {getFileIcon(previewDoc.tipe_file, 'w-5 h-5')}
                                </div>
                                <div className="overflow-hidden">
                                    <h3 className="text-base font-bold text-slate-800 truncate">{previewDoc.judul}</h3>
                                    <p className="text-xs text-slate-500 truncate">Dokumen Pedoman ({getFileLabel(previewDoc.tipe_file)})</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <a href={`/storage/${previewDoc.file_path}`} download className="px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors flex items-center gap-1.5">
                                    <Download className="w-3.5 h-3.5" /> Unduh
                                </a>
                                <button onClick={() => setPreviewDoc(null)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 w-full bg-slate-800 p-2 sm:p-4 md:p-6 overflow-hidden flex flex-col items-center justify-center">
                            {previewDoc.tipe_file === 'pdf' ? (
                                <iframe 
                                    src={`/storage/${previewDoc.file_path}`} 
                                    className="w-full h-full rounded-lg bg-white border-0" 
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
                                    className="w-full h-full rounded-lg bg-white border-0" 
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
            )}
        </AuthenticatedLayout>
    );
}
