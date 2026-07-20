import React, { useState } from 'react';
import { Head, useForm, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    BookOpen, 
    Plus, 
    Edit, 
    Trash2, 
    Image as ImageIcon,
    AlertCircle,
    CheckCircle2,
    Settings,
    Library
} from 'lucide-react';
import Swal from 'sweetalert2';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Sidebar from '@/Components/Admin/Sidebar';

export default function KurikulumIndex({ auth, kurikulums, pengaturan }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors } = useForm({
        nama: '',
        tahun_akademik: '',
        is_active: false
    });

    const bannerForm = useForm({
        deskripsi: pengaturan?.deskripsi || '',
        banner_image: null,
    });

    const openModal = (kurikulum = null) => {
        clearErrors();
        if (kurikulum) {
            setEditingId(kurikulum.id);
            setData({
                nama: kurikulum.nama,
                tahun_akademik: kurikulum.tahun_akademik,
                is_active: kurikulum.is_active,
            });
        } else {
            setEditingId(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => reset(), 300);
    };

    const submit = (e) => {
        e.preventDefault();
        
        const options = {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
            },
        };

        if (editingId) {
            put(route('admin.akademik.kurikulum.update', editingId), options);
        } else {
            post(route('admin.akademik.kurikulum.store'), options);
        }
    };

    const deleteKurikulum = (id) => {
        Swal.fire({
            title: 'Hapus Kurikulum?',
            text: "Data kurikulum beserta seluruh mata kuliah di dalamnya akan terhapus secara permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.akademik.kurikulum.destroy', id), {
                    preserveScroll: true
                });
            }
        });
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            bannerForm.setData('banner_image', file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    const submitBanner = (e) => {
        e.preventDefault();
        bannerForm.post(route('admin.akademik.kurikulum.pengaturan'), {
            preserveScroll: true,
            onSuccess: () => {
                setBannerPreview(null);
            },
        });
    };

    const currentBannerUrl = bannerPreview 
        ? bannerPreview 
        : (pengaturan?.banner_image 
            ? `/storage/${pengaturan.banner_image}` 
            : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop");

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-white">Manajemen Kurikulum</h2>}
        >
            <Head title="Manajemen Kurikulum" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />
                <div className="min-w-0 flex-1">
                    <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Banner Settings Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200">
                        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                            <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-lg">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Banner Halaman</h3>
                                <p className="text-sm text-slate-500">Atur gambar latar belakang untuk halaman Kurikulum.</p>
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
                                                <h1 className="text-3xl font-extrabold mb-2 drop-shadow-md">Kurikulum</h1>
                                                <div className="w-16 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                                                {bannerForm.data.deskripsi && (
                                                    <p className="text-white/90 max-w-2xl text-sm leading-relaxed drop-shadow">
                                                        {bannerForm.data.deskripsi}
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
                                                placeholder="Tuliskan deskripsi singkat mengenai kurikulum..."
                                                value={bannerForm.data.deskripsi}
                                                onChange={e => bannerForm.setData('deskripsi', e.target.value)}
                                            ></textarea>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-slate-700">Ganti Banner (Maks. 2MB, JPG/PNG)</label>
                                            <label className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-emerald-500 ${bannerForm.errors.banner_image ? 'border-red-500' : ''}`}>
                                                <span className="flex items-center space-x-2">
                                                    <ImageIcon className="w-6 h-6 text-slate-400" />
                                                    <span className="font-medium text-slate-600">Klik untuk mengunggah file gambar</span>
                                                </span>
                                                <input type="file" name="file_upload" className="hidden" accept="image/*" onChange={handleBannerChange} />
                                            </label>
                                            <InputError message={bannerForm.errors.banner_image} className="mt-2" />
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-end pt-4 border-t border-slate-100">
                                        <PrimaryButton type="submit" disabled={bannerForm.processing} className="bg-slate-800 hover:bg-slate-900">
                                            {bannerForm.processing ? 'MENYIMPAN...' : 'SIMPAN BANNER'}
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>

                    {/* Kurikulum List Section */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200">
                        <div className="p-6 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-lg">
                                    <Library className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Daftar Kurikulum</h3>
                                    <p className="text-sm text-slate-500">Kelola master kurikulum berdasarkan tahun akademik.</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => openModal()} 
                                className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg shadow-sm transition-colors text-sm w-full sm:w-auto"
                            >
                                <Plus className="w-4 h-4" /> Tambah Kurikulum
                            </button>
                        </div>

                        <div className="p-0 overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs uppercase tracking-wider">
                                        <th className="p-4 font-semibold">Tahun Akademik</th>
                                        <th className="p-4 font-semibold">Nama Kurikulum</th>
                                        <th className="p-4 font-semibold">Status</th>
                                        <th className="p-4 font-semibold text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-slate-100">
                                    {kurikulums.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="p-8 text-center text-slate-500">
                                                <AlertCircle className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                                                <p>Belum ada data kurikulum yang ditambahkan.</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        kurikulums.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                                                <td className="p-4 font-semibold text-slate-800">{item.tahun_akademik}</td>
                                                <td className="p-4 text-slate-600">{item.nama}</td>
                                                <td className="p-4">
                                                    {item.is_active ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                                                            <CheckCircle2 className="w-3.5 h-3.5" /> Aktif
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                                            Tidak Aktif
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="p-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link 
                                                            href={route('admin.akademik.kurikulum.matakuliah', item.id)} 
                                                            className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-md transition-colors"
                                                        >
                                                            <BookOpen className="w-3.5 h-3.5" /> Kelola MK
                                                        </Link>
                                                        <div className="w-px h-5 bg-slate-200 mx-1"></div>
                                                        <button 
                                                            onClick={() => openModal(item)} 
                                                            className="text-slate-500 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-transparent hover:border-indigo-100 p-1.5 rounded-md transition-all"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => deleteKurikulum(item.id)} 
                                                            className="text-slate-500 hover:text-red-600 bg-white hover:bg-red-50 border border-transparent hover:border-red-100 p-1.5 rounded-md transition-all"
                                                            title="Hapus"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
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

            {/* Modal Tambah/Edit Kurikulum */}
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="md">
                <form onSubmit={submit} className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-800">
                            {editingId ? 'Edit Kurikulum' : 'Tambah Kurikulum'}
                        </h2>
                        <button type="button" onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                            <Trash2 className="w-5 h-5 hidden" />
                            <span className="text-2xl leading-none">&times;</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="nama" value="Nama Kurikulum" />
                            <TextInput
                                id="nama"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.nama}
                                onChange={(e) => setData('nama', e.target.value)}
                                placeholder="Contoh: Kurikulum Merdeka 2024"
                                required
                            />
                            <InputError message={errors.nama} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="tahun_akademik" value="Tahun Akademik" />
                            <TextInput
                                id="tahun_akademik"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.tahun_akademik}
                                onChange={(e) => setData('tahun_akademik', e.target.value)}
                                placeholder="Contoh: 2024/2025"
                                required
                            />
                            <InputError message={errors.tahun_akademik} className="mt-2" />
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <input
                                id="is_active"
                                type="checkbox"
                                className="rounded border-gray-300 text-emerald-600 shadow-sm focus:ring-emerald-500 cursor-pointer w-4 h-4"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                            />
                            <InputLabel htmlFor="is_active" value="Jadikan sebagai Kurikulum Aktif (Utama)" className="cursor-pointer mb-0" />
                        </div>
                        {data.is_active && (
                            <p className="text-xs text-amber-600 flex items-start gap-1 ml-7">
                                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                Memilih opsi ini akan menonaktifkan kurikulum lain yang saat ini sedang aktif.
                            </p>
                        )}
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={closeModal}>Batal</SecondaryButton>
                        <PrimaryButton disabled={processing} className="bg-emerald-600 hover:bg-emerald-700">
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

        </AuthenticatedLayout>
    );
}
