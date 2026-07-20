import React, { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    BookOpen, 
    Plus, 
    Edit, 
    Trash2, 
    Image, 
    Upload, 
    X,
    FileText,
    Download
} from 'lucide-react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Swal from 'sweetalert2';
import Sidebar from '@/Components/Admin/Sidebar';

export default function Index({ auth, pedomans, pengaturan }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPedoman, setEditingPedoman] = useState(null);
    const [previewBanner, setPreviewBanner] = useState(null);

    const formPedoman = useForm({
        judul: '',
        deskripsi: '',
        file_pdf: null
    });

    const formBanner = useForm({
        banner_image: null,
        deskripsi: pengaturan?.deskripsi || ''
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
        formBanner.post(route('admin.akademik.pedoman.pengaturan'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                formBanner.reset('banner_image');
                setPreviewBanner(null);
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                Swal.fire({
                    title: 'Validasi Gagal!',
                    text: firstError || 'Silakan cek kembali inputan Anda (Maks. file 2MB).',
                    icon: 'error',
                    confirmButtonColor: '#ef4444'
                });
            }
        });
    };

    const openModal = (pedoman = null) => {
        if (pedoman) {
            setEditingPedoman(pedoman);
            formPedoman.setData({
                judul: pedoman.judul,
                deskripsi: pedoman.deskripsi || '',
                file_pdf: null
            });
        } else {
            setEditingPedoman(null);
            formPedoman.setData({
                judul: '',
                deskripsi: '',
                file_pdf: null
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingPedoman(null);
        formPedoman.reset();
        formPedoman.clearErrors();
    };

    const submitPedoman = (e) => {
        e.preventDefault();
        
        if (editingPedoman) {
            formPedoman.post(route('admin.akademik.pedoman.update', editingPedoman.id), {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => closeModal(),
                onError: (errors) => {
                    const firstError = Object.values(errors)[0];
                    Swal.fire({
                        title: 'Validasi Gagal!',
                        text: firstError || 'Pastikan file berformat PDF dan max 10MB.',
                        icon: 'error',
                        confirmButtonColor: '#ef4444'
                    });
                }
            });
        } else {
            formPedoman.post(route('admin.akademik.pedoman.store'), {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => closeModal(),
                onError: (errors) => {
                    const firstError = Object.values(errors)[0];
                    Swal.fire({
                        title: 'Validasi Gagal!',
                        text: firstError || 'Pastikan file berformat PDF dan max 10MB.',
                        icon: 'error',
                        confirmButtonColor: '#ef4444'
                    });
                }
            });
        }
    };

    const deletePedoman = (id) => {
        Swal.fire({
            title: 'Hapus Dokumen?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Ya, Hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.akademik.pedoman.destroy', id), {
                    preserveScroll: true
                });
            }
        });
    };

    const currentBannerUrl = previewBanner 
        ? previewBanner 
        : (pengaturan?.banner_image 
            ? `/storage/${pengaturan.banner_image}` 
            : null);

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
                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">Pedoman Akademik</h1>
                                <p className="text-slate-500 mt-1">Kelola konten halaman Pedoman Akademik dan daftar dokumen pedoman.</p>
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
                                            <InputLabel htmlFor="deskripsi_halaman" value="Deskripsi Halaman (Opsional)" />
                                            <textarea
                                                id="deskripsi_halaman"
                                                rows="3"
                                                className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="Tuliskan deskripsi singkat mengenai pedoman akademik..."
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

                        {/* List Dokumen Pedoman */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200">
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Daftar Dokumen Pedoman</h3>
                                        <p className="text-sm text-slate-500">Kelola file PDF pedoman akademik.</p>
                                    </div>
                                </div>
                                <button onClick={() => openModal()} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors text-sm">
                                    <Plus className="w-4 h-4" /> Tambah Pedoman
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="p-0 overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs uppercase tracking-wider">
                                                <th className="p-4 font-semibold">Judul Dokumen</th>
                                                <th className="p-4 font-semibold hidden md:table-cell">Deskripsi</th>
                                                <th className="p-4 font-semibold">File PDF</th>
                                                <th className="p-4 font-semibold text-right">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm divide-y divide-slate-100">
                                            {pedomans.length === 0 ? (
                                                <tr><td colSpan="4" className="p-8 text-center text-slate-500">Belum ada dokumen pedoman akademik yang ditambahkan.</td></tr>
                                            ) : (
                                                pedomans.map((item) => (
                                                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                                        <td className="p-4 font-medium text-slate-800">{item.judul}</td>
                                                        <td className="p-4 text-slate-600 hidden md:table-cell max-w-xs truncate">{item.deskripsi || '-'}</td>
                                                        <td className="p-4 text-slate-600">
                                                            <a href={`/storage/${item.file_path}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800">
                                                                <FileText className="w-4 h-4" /> Lihat File
                                                            </a>
                                                        </td>
                                                        <td className="p-4 text-right whitespace-nowrap">
                                                            <button onClick={() => openModal(item)} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-md transition-colors mr-2" title="Edit">
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                            <button onClick={() => deletePedoman(item.id)} className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-md transition-colors" title="Hapus">
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
            </div>

            {/* Modal Form Pedoman */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">
                                        {editingPedoman ? 'Edit Pedoman' : 'Tambah Pedoman'}
                                    </h3>
                                    <p className="text-sm text-slate-500">Isi form di bawah ini dengan lengkap.</p>
                                </div>
                            </div>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors bg-white p-2 rounded-full hover:bg-slate-100">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-6 overflow-y-auto">
                            <form onSubmit={submitPedoman} className="space-y-6">
                                <div className="space-y-2">
                                    <InputLabel htmlFor="judul" value="Judul Dokumen/SK *" />
                                    <TextInput
                                        id="judul"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={formPedoman.data.judul}
                                        onChange={e => formPedoman.setData('judul', e.target.value)}
                                        required
                                        placeholder="Contoh: SK NOMOR 452 TAHUN 2015"
                                    />
                                    {formPedoman.errors.judul && <p className="text-sm text-red-600">{formPedoman.errors.judul}</p>}
                                </div>

                                <div className="space-y-2">
                                    <InputLabel htmlFor="deskripsi" value="Keterangan Tambahan" />
                                    <textarea
                                        id="deskripsi"
                                        className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-md shadow-sm w-full"
                                        rows="3"
                                        value={formPedoman.data.deskripsi}
                                        onChange={e => formPedoman.setData('deskripsi', e.target.value)}
                                        placeholder="Contoh: Pedoman Akademik Program Sarjana TA 2015/2016"
                                    ></textarea>
                                    {formPedoman.errors.deskripsi && <p className="text-sm text-red-600">{formPedoman.errors.deskripsi}</p>}
                                </div>

                                <div className="space-y-2">
                                    <InputLabel value={`File Dokumen (PDF) ${!editingPedoman ? '*' : ''}`} />
                                    <label className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-xl cursor-pointer hover:border-blue-500 ${formPedoman.errors.file_pdf ? 'border-red-500' : ''}`}>
                                        <span className="flex items-center space-x-2">
                                            <Upload className="w-6 h-6 text-slate-600" />
                                            <span className="font-medium text-slate-600">
                                                {formPedoman.data.file_pdf ? formPedoman.data.file_pdf.name : 'Pilih File PDF (Max 10MB)'}
                                            </span>
                                        </span>
                                        <input 
                                            type="file" 
                                            name="file_pdf" 
                                            className="hidden" 
                                            accept="application/pdf"
                                            onChange={e => formPedoman.setData('file_pdf', e.target.files[0])}
                                            required={!editingPedoman}
                                        />
                                    </label>
                                    {editingPedoman && editingPedoman.file_path && !formPedoman.data.file_pdf && (
                                        <p className="text-sm text-slate-500 mt-2">Biarkan kosong jika tidak ingin mengubah file PDF.</p>
                                    )}
                                    {formPedoman.errors.file_pdf && <p className="text-sm text-red-600">{formPedoman.errors.file_pdf}</p>}
                                </div>

                                <div className="flex justify-end pt-4 border-t border-slate-100 gap-3">
                                    <SecondaryButton onClick={closeModal} type="button">Batal</SecondaryButton>
                                    <PrimaryButton type="submit" disabled={formPedoman.processing}>
                                        Simpan
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
