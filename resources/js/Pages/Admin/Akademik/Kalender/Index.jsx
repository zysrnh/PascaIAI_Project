import React, { useState } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import Sidebar from '@/Components/Admin/Sidebar';
import { Image, Upload, Save, AlertCircle, Plus, Edit, Trash2, X, Calendar, FileText } from 'lucide-react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Swal from 'sweetalert2';

export default function Index({ pengaturan, kalenders }) {
    const { flash } = usePage().props;
    const [isLoaded, setIsLoaded] = useState(false);
    
    const [previewBanner, setPreviewBanner] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingKalender, setEditingKalender] = useState(null);

    React.useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Form Banner
    const formBanner = useForm({ banner_image: null, deskripsi: pengaturan?.deskripsi || '' });

    // Form Kalender
    const formKalender = useForm({
        tahun_akademik: '',
        file_pdf: null,
        is_active: true
    });

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            formBanner.setData('banner_image', file);
            setPreviewBanner(URL.createObjectURL(file));
        }
    };

    const submitBanner = (e) => {
        e.preventDefault();
        formBanner.post(route('admin.akademik.kalender.pengaturan'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                formBanner.reset('banner_image');
                setPreviewBanner(null);
            },
        });
    };

    const openModal = (kalender = null) => {
        if (kalender) {
            setEditingKalender(kalender);
            formKalender.setData({
                tahun_akademik: kalender.tahun_akademik,
                file_pdf: null,
                is_active: kalender.is_active
            });
        } else {
            setEditingKalender(null);
            formKalender.setData({
                tahun_akademik: '',
                file_pdf: null,
                is_active: true
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingKalender(null);
        formKalender.reset();
        formKalender.clearErrors();
    };

    const submitKalender = (e) => {
        e.preventDefault();
        if (editingKalender) {
            formKalender.post(route('admin.akademik.kalender.update', editingKalender.id), {
                preserveScroll: true,
                onSuccess: () => closeModal()
            });
        } else {
            formKalender.post(route('admin.akademik.kalender.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal()
            });
        }
    };

    const deleteKalender = (id) => {
        Swal.fire({
            title: 'Hapus Kalender?',
            text: "File PDF kalender akan dihapus permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Ya, Hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.akademik.kalender.destroy', id), {
                    preserveScroll: true
                });
            }
        });
    };

    const currentBannerUrl = previewBanner 
        ? previewBanner 
        : (pengaturan?.banner_image 
            ? `/storage/${pengaturan.banner_image}` 
            : "/images/default-banner.jpg");

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-white leading-tight">Kelola Kalender Akademik</h2>}>
            <Head title="Kelola Kalender Akademik" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />

                <div className={`min-w-0 flex-1 transition-all duration-700 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-6">
                        
                        {flash?.success && (
                            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 rounded-md shadow-sm mb-6 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                                <div>
                                    <h3 className="text-emerald-800 font-medium">Berhasil</h3>
                                    <p className="text-emerald-700 text-sm">{flash.success}</p>
                                </div>
                            </div>
                        )}

                        {/* Banner Settings Section */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200">
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Image className="w-5 h-5" /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Banner Halaman</h3>
                                    <p className="text-sm text-slate-500">Atur gambar latar belakang untuk halaman Kalender Akademik.</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <form onSubmit={submitBanner} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-700">Gambar Banner Saat Ini</label>
                                        <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                            <img src={currentBannerUrl} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                                            <div className="absolute bottom-6 left-6 z-10 text-white">
                                                <h1 className="text-3xl font-extrabold mb-2 drop-shadow-md">Kalender Akademik</h1>
                                                <div className="w-16 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                                                {formBanner.data.deskripsi && (
                                                    <p className="text-white/90 max-w-2xl text-sm leading-relaxed drop-shadow">
                                                        {formBanner.data.deskripsi}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <InputLabel htmlFor="deskripsi" value="Deskripsi Halaman (Opsional)" />
                                            <textarea
                                                id="deskripsi"
                                                rows="3"
                                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="Tuliskan deskripsi singkat mengenai kalender akademik..."
                                                value={formBanner.data.deskripsi}
                                                onChange={e => formBanner.setData('deskripsi', e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-700">Ganti Banner (Maks. 2MB, JPG/PNG)</label>
                                            <label className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-emerald-500 ${formBanner.errors.banner_image ? 'border-red-500' : ''}`}>
                                                <span className="flex items-center space-x-2"><Upload className="w-6 h-6 text-slate-600" /><span className="font-medium text-slate-600">Klik untuk mengunggah file gambar</span></span>
                                                <input type="file" name="banner_image" className="hidden" accept="image/*" onChange={handleBannerChange} />
                                            </label>
                                            {formBanner.errors.banner_image && <p className="text-sm text-red-600 mt-1">{formBanner.errors.banner_image}</p>}
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-slate-100">
                                        <PrimaryButton type="submit" disabled={formBanner.processing}>
                                            Simpan Banner
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Daftar Kalender Section */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200">
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Calendar className="w-5 h-5" /></div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Daftar File Kalender Akademik</h3>
                                        <p className="text-sm text-slate-500">Kelola file PDF kalender berdasarkan tahun akademik.</p>
                                    </div>
                                </div>
                                <button onClick={() => openModal()} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors text-sm">
                                    <Plus className="w-4 h-4" /> Tambah Kalender
                                </button>
                            </div>
                            <div className="p-0 overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs uppercase tracking-wider">
                                            <th className="p-4 font-semibold">Tahun Akademik</th>
                                            <th className="p-4 font-semibold">File PDF</th>
                                            <th className="p-4 font-semibold">Status</th>
                                            <th className="p-4 font-semibold text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-slate-100">
                                        {kalenders.length === 0 ? (
                                            <tr><td colSpan="4" className="p-8 text-center text-slate-500">Belum ada kalender akademik yang ditambahkan.</td></tr>
                                        ) : (
                                            kalenders.map((item) => (
                                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="p-4 font-medium text-slate-800">{item.tahun_akademik}</td>
                                                    <td className="p-4 text-slate-600">
                                                        <a href={`/storage/${item.file_pdf}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800">
                                                            <FileText className="w-4 h-4" /> Lihat File
                                                        </a>
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${item.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>
                                                            {item.is_active ? 'Aktif' : 'Nonaktif'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right whitespace-nowrap">
                                                        <button onClick={() => openModal(item)} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-md transition-colors mr-2">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => deleteKalender(item.id)} className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-md transition-colors">
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Modal Tambah/Edit Kalender */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800">{editingKalender ? 'Edit Kalender' : 'Tambah Kalender'}</h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={submitKalender}>
                            <div className="p-6 space-y-4">
                                <div>
                                    <InputLabel htmlFor="tahun_akademik" value="Tahun Akademik" />
                                    <TextInput id="tahun_akademik" type="text" className="mt-1 block w-full" value={formKalender.data.tahun_akademik} onChange={e => formKalender.setData('tahun_akademik', e.target.value)} placeholder="Contoh: 2025/2026" required />
                                    <InputError message={formKalender.errors.tahun_akademik} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="file_pdf" value={editingKalender ? "File PDF (Biarkan kosong jika tidak ingin mengubah)" : "File PDF"} />
                                    <input id="file_pdf" type="file" accept="application/pdf" className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" onChange={e => formKalender.setData('file_pdf', e.target.files[0])} required={!editingKalender} />
                                    <InputError message={formKalender.errors.file_pdf} className="mt-2" />
                                </div>
                                <div className="flex items-center mt-4">
                                    <input id="is_active" type="checkbox" checked={formKalender.data.is_active} onChange={e => formKalender.setData('is_active', e.target.checked)} className="w-4 h-4 text-emerald-600 bg-slate-100 border-slate-300 rounded focus:ring-emerald-500 focus:ring-2" />
                                    <label htmlFor="is_active" className="ml-2 text-sm font-medium text-slate-900">Tampilkan di Halaman Publik</label>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50">Batal</button>
                                <button type="submit" disabled={formKalender.processing} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-sm disabled:opacity-50">
                                    {editingKalender ? 'Simpan Perubahan' : 'Tambahkan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
