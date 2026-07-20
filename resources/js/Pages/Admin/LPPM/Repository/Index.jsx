import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import { Archive, Plus, Search, Filter, Edit, Trash2, Eye, Image as ImageIcon, Upload } from 'lucide-react';
import RepositoryForm from './Form';
import PrimaryButton from '@/Components/PrimaryButton';
import Swal from 'sweetalert2';

export default function Index({ auth, repositories, prodis, setting, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState(null);
    const fileInputRef = React.useRef(null);
    const [bannerPreview, setBannerPreview] = useState(setting?.banner_image || null);

    const { data: settingData, setData: setSettingData, post: postSetting, processing: processingSetting, errors: settingErrors } = useForm({
        judul: setting?.judul || 'Repository',
        deskripsi: setting?.deskripsi || '',
        banner_image: null,
    });

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSettingData('banner_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSettingSubmit = (e) => {
        e.preventDefault();
        postSetting(route('admin.lppm.repository.setting'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.lppm.repository.index'), { search }, { preserveState: true });
    };

    const openCreate = () => {
        setSelectedRepo(null);
        setIsFormOpen(true);
    };

    const openEdit = (repo) => {
        setSelectedRepo(repo);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setSelectedRepo(null);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Repository?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#94a3b8',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.lppm.repository.destroy', id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire('Terhapus!', 'Data repository berhasil dihapus.', 'success');
                    }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Kelola Repository</h2>}
        >
            <Head title="Kelola Repository" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />
                <div className="min-w-0 flex-1 transition-all duration-700 ease-out transform opacity-100 translate-y-0">
                    <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-6">
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">Repository Karya Ilmiah</h1>
                                <p className="text-slate-500 mt-1">Kelola arsip Tesis, Disertasi, dan karya tulis lainnya.</p>
                            </div>
                            <button
                                onClick={openCreate}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
                            >
                                <Plus className="w-5 h-5" />
                                Tambah Karya
                            </button>
                        </div>

                        {/* Banner Setting Panel */}
                        <form onSubmit={handleSettingSubmit} className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><ImageIcon className="w-5 h-5" /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Banner Halaman</h3>
                                    <p className="text-sm text-slate-500">Atur gambar dan deskripsi judul halaman Repository publik.</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Gambar Banner Saat Ini</label>
                                    <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                        {bannerPreview ? (
                                            <img src={bannerPreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={setting?.banner_image || '/images/default-banner.jpg'} alt="Default Preview" className="w-full h-full object-cover" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6 z-10 text-white w-full pr-6">
                                            <input 
                                                type="text" 
                                                value={settingData.judul} 
                                                onChange={e => setSettingData('judul', e.target.value)} 
                                                className="bg-transparent text-3xl font-extrabold mb-2 drop-shadow-md border-b border-dashed border-white/50 focus:border-white focus:ring-0 p-0 hover:bg-white/10 transition-colors w-full sm:w-1/2"
                                                placeholder="Judul Halaman"
                                            />
                                            <div className="w-16 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                                            {settingData.deskripsi && (
                                                <p className="text-white/90 max-w-2xl text-sm leading-relaxed drop-shadow">
                                                    {settingData.deskripsi}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="deskripsi" className="block text-sm font-medium text-slate-700">Deskripsi Singkat Banner</label>
                                        <textarea
                                            id="deskripsi"
                                            rows="2"
                                            className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Arsip digital Tesis..."
                                            value={settingData.deskripsi}
                                            onChange={e => setSettingData('deskripsi', e.target.value)}
                                        ></textarea>
                                        {settingErrors.deskripsi && <p className="text-sm text-red-600 mt-1">{settingErrors.deskripsi}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-700">Ganti Banner (Maks. 2MB, JPG/PNG)</label>
                                        <label className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-emerald-500 ${settingErrors.banner_image ? 'border-red-500' : ''}`}>
                                            <span className="flex items-center space-x-2"><Upload className="w-6 h-6 text-slate-600" /><span className="font-medium text-slate-600">Klik untuk mengunggah file gambar</span></span>
                                            <input type="file" ref={fileInputRef} name="banner_image" className="hidden" accept="image/*" onChange={handleBannerChange} />
                                        </label>
                                        {settingErrors.banner_image && <p className="text-sm text-red-600 mt-1">{settingErrors.banner_image}</p>}
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4 border-t border-slate-100">
                                    <PrimaryButton type="submit" disabled={processingSetting}>
                                        Simpan Banner
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>

                        {/* Search and Filters */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <form onSubmit={handleSearch} className="flex gap-4">
                                <div className="flex-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                                        placeholder="Cari judul, nama penulis, atau NIM..."
                                    />
                                </div>
                                <button type="submit" className="px-4 py-2 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors">
                                    Cari
                                </button>
                            </form>
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Info Karya</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Penulis</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Program Studi</th>
                                            <th className="px-6 py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-200">
                                        {repositories.data.length > 0 ? (
                                            repositories.data.map((repo) => (
                                                <tr key={repo.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-bold text-slate-800 mb-1 line-clamp-2" title={repo.judul}>{repo.judul}</div>
                                                        <div className="flex gap-2 text-xs">
                                                            <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 capitalize font-medium">{repo.jenis}</span>
                                                            <span className="text-slate-500 font-medium">Tahun {repo.tahun}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-semibold text-slate-800">{repo.penulis_nama}</div>
                                                        <div className="text-sm text-slate-500">{repo.penulis_nim}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-slate-700">{repo.prodi?.nama || '-'}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <a href={route('public.lppm.repository.show', repo.id)} target="_blank" rel="noreferrer" className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Lihat di web">
                                                                <Eye className="w-5 h-5" />
                                                            </a>
                                                            <button onClick={() => openEdit(repo)} className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Edit">
                                                                <Edit className="w-5 h-5" />
                                                            </button>
                                                            <button onClick={() => handleDelete(repo.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                                                                <Trash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-12 text-center text-slate-500">
                                                    <Archive className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                                                    Tidak ada data repository yang ditemukan.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Pagination */}
                            {repositories.links.length > 3 && (
                                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-center">
                                    <div className="flex gap-1">
                                        {repositories.links.map((link, k) => (
                                            <button
                                                key={k}
                                                onClick={() => link.url && router.get(link.url)}
                                                disabled={!link.url}
                                                className={`px-3 py-1 rounded-md text-sm ${
                                                    link.active 
                                                        ? 'bg-emerald-600 text-white font-semibold' 
                                                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <RepositoryForm isOpen={isFormOpen} onClose={closeForm} repository={selectedRepo} prodis={prodis} />
        </AuthenticatedLayout>
    );
}
