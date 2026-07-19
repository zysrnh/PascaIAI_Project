import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FileText, Plus, Trash2, Edit, AlertCircle, FileUp, Image, Upload, Save } from 'lucide-react';
import Sidebar from '@/Components/Admin/Sidebar';
import Swal from 'sweetalert2';

export default function Index({ auth, dokumen, pengaturan }) {
    const [selectedIds, setSelectedIds] = useState([]);
    const [previewBanner, setPreviewBanner] = useState(null);

    const { data: bannerData, setData: setBannerData, post: postBanner, processing: processingBanner, errors: errorsBanner } = useForm({
        banner_image: null,
    });

    const { delete: destroy } = useForm();

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(dokumen.map(d => d.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelect = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Dokumen?',
            text: "Dokumen yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('admin.profil.dokumen-institusi.destroy', id), {
                    preserveScroll: true
                });
            }
        });
    };

    const handleBulkDelete = () => {
        if (selectedIds.length === 0) return;

        Swal.fire({
            title: 'Hapus Dokumen Terpilih?',
            text: `Anda akan menghapus ${selectedIds.length} dokumen. Tindakan ini tidak dapat dibatalkan!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Ya, hapus semua!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('admin.profil.dokumen-institusi.bulk-destroy'), {
                    data: { ids: selectedIds },
                    preserveScroll: true,
                    onSuccess: () => setSelectedIds([])
                });
            }
        });
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerData('banner_image', file);
            setPreviewBanner(URL.createObjectURL(file));
        }
    };

    const handleSaveBanner = (e) => {
        e.preventDefault();
        postBanner(route('admin.profil.dokumen-institusi.update-banner'), {
            preserveScroll: true,
            onSuccess: () => {
                setBannerData('banner_image', null);
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-white">Manajemen Profil: Dokumen Institusi</h2>}
        >
            <Head title="Kelola Dokumen Institusi" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />

                <div className="min-w-0 flex-1 py-8 px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    <div className="flex justify-between items-center mb-2">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800">Dokumen Institusi</h1>
                            <p className="text-sm text-slate-500">Kelola daftar dokumen yang dapat diunduh publik.</p>
                        </div>
                    </div>
                    
                    {/* Panel Pengaturan Banner */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200">
                        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Image className="w-5 h-5" /></div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Banner Halaman Publik</h3>
                                <p className="text-sm text-slate-500">Atur gambar latar belakang untuk halaman Dokumen Institusi.</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSaveBanner} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Gambar Banner Saat Ini</label>
                                    <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                        <img 
                                            src={previewBanner ? previewBanner : (pengaturan?.banner_image ? `/storage/${pengaturan.banner_image}` : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop")} 
                                            alt="Preview" 
                                            className="w-full h-full object-cover" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6 z-10 text-white">
                                            <h1 className="text-3xl font-extrabold mb-2 drop-shadow-md">Dokumen Institusi</h1>
                                            <div className="w-16 h-1.5 bg-amber-500 rounded-sm"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Ganti Banner (Maks. 2MB, JPG/PNG)</label>
                                    <label className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-emerald-500 ${errorsBanner.banner_image ? 'border-red-500' : ''}`}>
                                        <span className="flex items-center space-x-2"><Upload className="w-6 h-6 text-slate-600" /><span className="font-medium text-slate-600">Klik untuk mengunggah file gambar</span></span>
                                        <input 
                                            type="file" 
                                            name="banner_image" 
                                            className="hidden" 
                                            accept="image/*" 
                                            onChange={handleBannerChange}
                                        />
                                    </label>
                                    {errorsBanner.banner_image && <p className="text-sm text-red-600 mt-1">{errorsBanner.banner_image}</p>}
                                </div>
                                <div className="flex justify-end pt-4 border-t border-slate-100">
                                    <button type="submit" disabled={processingBanner || !bannerData.banner_image} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors disabled:opacity-50">
                                        <Save className="w-4 h-4" /> Simpan Banner
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Daftar Dokumen */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200">
                        <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-emerald-600" />
                                    Daftar Dokumen
                                </h3>
                                <p className="text-sm text-slate-500">Kelola file dokumen yang dapat diunduh publik.</p>
                            </div>
                            <div className="flex gap-2">
                                {selectedIds.length > 0 && (
                                    <button
                                        onClick={handleBulkDelete}
                                        className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-red-100 transition ease-in-out duration-150"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Hapus Terpilih ({selectedIds.length})
                                    </button>
                                )}
                                <Link
                                    href={route('admin.profil.dokumen-institusi.create')}
                                    className="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-700 transition ease-in-out duration-150"
                                >
                                    <Plus className="w-4 h-4 mr-1" /> Tambah Dokumen
                                </Link>
                            </div>
                        </div>

                        <div className="p-0 overflow-x-auto">
                            {dokumen && dokumen.length > 0 ? (
                                <table className="w-full text-sm text-left text-slate-600">
                                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 w-12">
                                                <input 
                                                    type="checkbox" 
                                                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                                    onChange={handleSelectAll}
                                                    checked={dokumen.length > 0 && selectedIds.length === dokumen.length}
                                                />
                                            </th>
                                            <th className="px-6 py-4">Kategori</th>
                                            <th className="px-6 py-4">Judul Dokumen</th>
                                            <th className="px-6 py-4">Ukuran File</th>
                                            <th className="px-6 py-4 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dokumen.map((item) => (
                                            <tr key={item.id} className={`border-b border-slate-100 hover:bg-slate-50/50 ${selectedIds.includes(item.id) ? 'bg-emerald-50/30' : ''}`}>
                                                <td className="px-6 py-4">
                                                    <input 
                                                        type="checkbox" 
                                                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                                                        checked={selectedIds.includes(item.id)}
                                                        onChange={() => handleSelect(item.id)}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-emerald-700 capitalize">
                                                    {item.kategori}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-slate-800">{item.judul}</div>
                                                    <a href={item.file_path} target="_blank" rel="noreferrer" className="text-xs text-emerald-600 hover:underline">Lihat File</a>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500">
                                                    {item.file_size}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <Link
                                                            href={route('admin.profil.dokumen-institusi.edit', item.id)}
                                                            className="p-2 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-md transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(item.id)}
                                                            className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                                                            title="Hapus"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-12 text-center flex flex-col items-center justify-center bg-slate-50/50">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100 text-slate-400">
                                        <AlertCircle className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-slate-700 mb-1">Belum Ada Dokumen</h4>
                                    <p className="text-slate-500 max-w-md mx-auto mb-6">Mulai tambahkan dokumen institusi untuk menampilkannya pada halaman publik.</p>
                                    <Link
                                        href={route('admin.profil.dokumen-institusi.create')}
                                        className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium text-sm"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Tambah Dokumen Pertama
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
