import React, { useState } from 'react';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import Sidebar from '@/Components/Admin/Sidebar';
import { Newspaper, Plus, Pencil, Trash2, X, Save, Image as ImageIcon, Search, Upload } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Index({ beritas, pengaturan }) {
    const { flash } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [previewGambar, setPreviewGambar] = useState(null);
    const [previewBanner, setPreviewBanner] = useState(null);

    const form = useForm({
        judul: '',
        konten: '',
        gambar: null,
        is_published: true,
    });

    const pengaturanForm = useForm({
        banner_image: null,
        deskripsi: pengaturan?.deskripsi || ''
    });

    const filteredBeritas = beritas.filter(berita => 
        berita.judul.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openModal = (berita = null) => {
        if (berita) {
            setIsEditing(true);
            setEditingId(berita.id);
            form.setData({
                judul: berita.judul,
                konten: berita.konten,
                gambar: null,
                is_published: berita.is_published,
            });
            setPreviewGambar(berita.gambar_url || null);
        } else {
            setIsEditing(false);
            setEditingId(null);
            form.reset();
            setPreviewGambar(null);
        }
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setIsEditing(false);
            setEditingId(null);
            form.reset();
            form.clearErrors();
            setPreviewGambar(null);
        }, 300);
        document.body.style.overflow = 'unset';
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            form.post(route('admin.berita.update', editingId), {
                onSuccess: () => closeModal(),
            });
        } else {
            form.post(route('admin.berita.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Berita?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                form.delete(route('admin.berita.destroy', id));
            }
        });
    };

    const currentBannerUrl = previewBanner 
        ? previewBanner 
        : (pengaturan?.banner_image ? (pengaturan.banner_image.startsWith('/storage/') || pengaturan.banner_image.startsWith('http') ? pengaturan.banner_image : `/storage/${pengaturan.banner_image}`) : "/images/default-banner.jpg");

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-white">Kelola Berita</h2>}
        >
            <Head title="Kelola Berita" />

            <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <div className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Header Actions */}
                        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                                    <Newspaper className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-800">Berita & Artikel</h1>
                                    <p className="text-sm text-slate-500">Kelola publikasi berita, artikel, dan pengumuman kampus.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => openModal()}
                                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold shadow-sm"
                            >
                                <Plus className="w-5 h-5" />
                                Tulis Berita
                            </button>
                        </div>

                        {/* Pengaturan Banner */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200">
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><ImageIcon className="w-5 h-5" /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Banner Halaman Berita</h3>
                                    <p className="text-sm text-slate-500">Atur gambar latar belakang untuk halaman Berita publik.</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    pengaturanForm.post(route('admin.berita.pengaturan'), { 
                                        preserveScroll: true,
                                        forceFormData: true,
                                        onSuccess: () => {
                                            pengaturanForm.reset('banner_image');
                                            setPreviewBanner(null);
                                        }
                                    });
                                }} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-700">Gambar Banner Saat Ini</label>
                                        <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                            <img src={currentBannerUrl} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                                            <div className="absolute bottom-6 left-6 z-10 text-white">
                                                <h1 className="text-3xl font-extrabold mb-2 drop-shadow-md">Berita Pascasarjana</h1>
                                                <div className="w-16 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                                                {pengaturanForm.data.deskripsi && (
                                                    <p className="text-white/90 max-w-2xl text-sm leading-relaxed drop-shadow">
                                                        {pengaturanForm.data.deskripsi}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label htmlFor="deskripsi" className="block text-sm font-medium text-slate-700">Deskripsi Halaman (Opsional)</label>
                                            <textarea
                                                id="deskripsi"
                                                rows="3"
                                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="Tuliskan deskripsi singkat..."
                                                value={pengaturanForm.data.deskripsi}
                                                onChange={e => pengaturanForm.setData('deskripsi', e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-700">Ganti Banner (Maks. 2MB, JPG/PNG)</label>
                                            <label className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-emerald-500 ${pengaturanForm.errors.banner_image ? 'border-red-500' : ''}`}>
                                                <span className="flex items-center space-x-2"><Upload className="w-6 h-6 text-slate-600" /><span className="font-medium text-slate-600">Klik untuk mengunggah file gambar</span></span>
                                                <input type="file" name="banner_image" className="hidden" accept="image/*" onChange={(e) => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        pengaturanForm.setData('banner_image', file);
                                                        setPreviewBanner(URL.createObjectURL(file));
                                                    }
                                                }} />
                                            </label>
                                            {pengaturanForm.errors.banner_image && <p className="text-sm text-red-600 mt-1">{pengaturanForm.errors.banner_image}</p>}
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-slate-100">
                                        <PrimaryButton type="submit" disabled={pengaturanForm.processing}>
                                            Simpan Banner
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* List Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <h2 className="text-lg font-bold text-slate-800">Daftar Berita</h2>
                                
                                <div className="relative w-64">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-4 w-4 text-slate-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Cari judul berita..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 bg-slate-50/50 uppercase">
                                        <tr>
                                            <th className="px-6 py-4 font-bold tracking-wider">Judul & Gambar</th>
                                            <th className="px-6 py-4 font-bold tracking-wider">Tanggal</th>
                                            <th className="px-6 py-4 font-bold tracking-wider">Views</th>
                                            <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                                            <th className="px-6 py-4 font-bold tracking-wider text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredBeritas.length > 0 ? filteredBeritas.map((berita) => (
                                            <tr key={berita.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3 max-w-sm">
                                                        {berita.gambar_url ? (
                                                            <img src={berita.gambar_url} alt="" className="w-16 h-12 object-cover rounded-md shadow-sm shrink-0" />
                                                        ) : (
                                                            <div className="w-16 h-12 bg-slate-100 flex items-center justify-center rounded-md shrink-0">
                                                                <ImageIcon className="w-5 h-5 text-slate-400" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="font-bold text-slate-800 line-clamp-2" title={berita.judul}>{berita.judul}</p>
                                                            <a href={`/berita/${berita.slug}`} target="_blank" rel="noreferrer" className="text-[10px] text-blue-500 hover:underline">Lihat Halaman</a>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-slate-700 font-medium">{new Date(berita.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-slate-500">
                                                    {berita.views} x
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                        berita.is_published 
                                                        ? 'bg-emerald-100 text-emerald-700' 
                                                        : 'bg-amber-100 text-amber-700'
                                                    }`}>
                                                        {berita.is_published ? 'Dipublikasikan' : 'Draft'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => openModal(berita)}
                                                            className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(berita.id)}
                                                            className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                            title="Hapus"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-12 text-center">
                                                    <div className="flex flex-col items-center justify-center text-slate-400">
                                                        <Newspaper className="w-12 h-12 mb-3 text-slate-300" />
                                                        <p className="text-base font-medium text-slate-600 mb-1">Belum ada berita</p>
                                                        <p className="text-sm">Silakan buat berita baru.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800">
                                {isEditing ? 'Edit Berita' : 'Tulis Berita Baru'}
                            </h3>
                            <button
                                onClick={closeModal}
                                className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto">
                            <form id="beritaForm" onSubmit={submit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Judul Berita *</label>
                                    <input
                                        type="text"
                                        value={form.data.judul}
                                        onChange={e => form.setData('judul', e.target.value)}
                                        className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Konten Berita *</label>
                                    <textarea
                                        value={form.data.konten}
                                        onChange={e => form.setData('konten', e.target.value)}
                                        rows="12"
                                        className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        required
                                    ></textarea>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Gambar (JPG/PNG)</label>
                                        {previewGambar && (
                                            <div className="mb-3 relative w-full h-40 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                                <img src={previewGambar} className="w-full h-full object-cover" alt="Preview" />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => {
                                                const file = e.target.files[0];
                                                form.setData('gambar', file);
                                                if (file) {
                                                    setPreviewGambar(URL.createObjectURL(file));
                                                }
                                            }}
                                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Status Publikasi</label>
                                        <select
                                            value={form.data.is_published ? '1' : '0'}
                                            onChange={e => form.setData('is_published', e.target.value === '1')}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        >
                                            <option value="1">Publikasikan (Tampil)</option>
                                            <option value="0">Draft (Sembunyikan)</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                        <div className="flex items-center justify-end p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl shrink-0 gap-3">
                            <button
                                onClick={closeModal}
                                type="button"
                                className="px-5 py-2.5 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 font-semibold transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                form="beritaForm"
                                type="submit"
                                disabled={form.processing}
                                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold transition-colors disabled:opacity-50"
                            >
                                <Save className="w-5 h-5" />
                                {isEditing ? 'Simpan Perubahan' : 'Simpan Berita'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
