import React, { useState } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import { Building2, Plus, Edit, Trash2, X, Image as ImageIcon, Save, CheckCircle, XCircle, Image, Upload } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Index({ auth, fakultas }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [previewBanner, setPreviewBanner] = useState(null);

    const form = useForm({
        nama: '',
        kode: '',
        dekan_nama: '',
        wakil_dekan: '',
        deskripsi: '',
        visi_misi: '',
        email: '',
        telepon: '',
        alamat: '',
        sk_pendirian: '',
        status: true,
        logo: null,
        gambar: null,
        warna_bg: '',
    });

    const pengaturanForm = useForm({
        banner_image: null,
    });

    const openModal = (item = null) => {
        if (item) {
            setIsEditing(true);
            setEditId(item.id);
            form.setData({
                nama: item.nama || '',
                kode: item.kode || '',
                dekan_nama: item.dekan_nama || '',
                wakil_dekan: item.wakil_dekan || '',
                deskripsi: item.deskripsi || '',
                visi_misi: item.visi_misi || '',
                email: item.email || '',
                telepon: item.telepon || '',
                alamat: item.alamat || '',
                sk_pendirian: item.sk_pendirian || '',
                status: item.status == 1,
                logo: null,
                gambar: null,
                warna_bg: item.warna_bg || '',
            });
        } else {
            setIsEditing(false);
            setEditId(null);
            form.reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        form.reset();
    };

    const submit = (e) => {
        e.preventDefault();
        
        const routeName = isEditing ? 'admin.fakultas.update' : 'admin.fakultas.store';
        const routeParams = isEditing ? { id: editId } : {};

        form.post(route(routeName, routeParams), {
            preserveScroll: true,
            forceFormData: true, // For file upload + POST method simulating PUT
            onSuccess: () => {
                closeModal();
            },
            onError: (errors) => {
                const firstError = Object.values(errors)[0];
                Swal.fire({
                    title: 'Gagal Menyimpan!',
                    text: firstError || 'Pastikan semua form terisi dengan benar (Maks file 2MB).',
                    icon: 'error',
                    confirmButtonColor: '#ef4444'
                });
            }
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Hapus Fakultas',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#94a3b8',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.fakultas.destroy', id), {
                    preserveScroll: true,
                });
            }
        });
    };

    const currentBannerUrl = previewBanner 
        ? previewBanner 
        : (auth?.pengaturan?.banner_image 
            ? `/storage/${auth.pengaturan.banner_image}` 
            : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop");

    return (
        <>
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-white">Daftar Fakultas</h2>}
        >
            <Head title="Daftar Fakultas" />

            <div className="flex min-h-screen bg-slate-50">
                <Sidebar />
                <div className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Header Actions */}
                        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-emerald-100 rounded-lg text-emerald-600">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-800">Daftar Fakultas</h1>
                                    <p className="text-sm text-slate-500">Kelola data fakultas dan informasi pimpinan fakultas</p>
                                </div>
                            </div>
                            <button
                                onClick={() => openModal()}
                                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold shadow-sm"
                            >
                                <Plus className="w-5 h-5" />
                                Tambah Fakultas
                            </button>
                        </div>

                        {/* Pengaturan Banner */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200">
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Image className="w-5 h-5" /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Banner Halaman Publik</h3>
                                    <p className="text-sm text-slate-500">Atur gambar latar belakang untuk halaman Fakultas.</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    pengaturanForm.post(route('admin.fakultas.pengaturan'), { 
                                        preserveScroll: true,
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
                                                <h1 className="text-3xl font-extrabold mb-2 drop-shadow-md">Fakultas</h1>
                                                <div className="w-16 h-1.5 bg-amber-500 rounded-sm"></div>
                                            </div>
                                        </div>
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
                                    <div className="flex justify-end pt-4 border-t border-slate-100">
                                        <button type="submit" disabled={pengaturanForm.processing || !pengaturanForm.data.banner_image} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors disabled:opacity-50">
                                            <Save className="w-4 h-4" /> Simpan Banner
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Table Area */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-slate-600">
                                    <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                                        <tr>
                                            <th className="px-6 py-4">Fakultas</th>
                                            <th className="px-6 py-4">Dekan/Kepala</th>
                                            <th className="px-6 py-4 text-center">Status</th>
                                            <th className="px-6 py-4 text-center">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {fakultas.length > 0 ? fakultas.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        {item.logo_url ? (
                                                            <img src={item.logo_url} alt={item.nama} className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200">
                                                                <ImageIcon className="w-5 h-5 text-slate-400" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="font-bold text-slate-800 text-base">{item.nama}</div>
                                                            <div className="text-xs text-slate-500 font-medium">Kode: {item.kode || '-'}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-slate-700">{item.dekan_nama || '-'}</div>
                                                    {item.wakil_dekan && <div className="text-xs text-slate-500">Wakil: {item.wakil_dekan}</div>}
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {item.status ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                                                            <CheckCircle className="w-3.5 h-3.5" /> Aktif
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">
                                                            <XCircle className="w-3.5 h-3.5" /> Nonaktif
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => openModal(item)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                            title="Edit Data"
                                                        >
                                                            <Edit className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item.id)}
                                                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                            title="Hapus Data"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-12 text-center">
                                                    <div className="flex flex-col items-center justify-center text-slate-400">
                                                        <Building2 className="w-12 h-12 mb-3 text-slate-300" />
                                                        <p className="text-base font-medium text-slate-600 mb-1">Belum ada data fakultas</p>
                                                        <p className="text-sm">Silakan tambah data fakultas baru untuk mulai mengelola.</p>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-900/50 backdrop-blur-sm p-4 md:p-0 transition-opacity">
                    <div className="relative w-full max-w-4xl max-h-full animate-modal">
                        <div className="relative bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
                                <h3 className="text-xl font-bold text-slate-800">
                                    {isEditing ? 'Edit Data Fakultas' : 'Tambah Fakultas Baru'}
                                </h3>
                                <button
                                    onClick={closeModal}
                                    className="text-slate-400 bg-transparent hover:bg-slate-100 hover:text-slate-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 overflow-y-auto space-y-6">
                                <form id="fakultasForm" onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2 text-sm font-semibold text-emerald-700 bg-emerald-50 py-2 px-4 rounded-lg">Informasi Dasar</div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Nama Fakultas *</label>
                                        <input
                                            type="text"
                                            value={form.data.nama}
                                            onChange={e => form.setData('nama', e.target.value)}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                            required
                                        />
                                    </div>


                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Foto Fakultas/Background (Opsional)</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => form.setData('gambar', e.target.files[0])}
                                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Warna Background (Hex, cth: #4a5d23)</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                value={form.data.warna_bg || '#ffffff'}
                                                onChange={e => form.setData('warna_bg', e.target.value)}
                                                className="h-10 w-10 p-1 border-slate-200 rounded-lg cursor-pointer"
                                            />
                                            <input
                                                type="text"
                                                value={form.data.warna_bg}
                                                onChange={e => form.setData('warna_bg', e.target.value)}
                                                className="flex-1 border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 uppercase"
                                                placeholder="#HEXCODE"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Status</label>
                                        <select
                                            value={form.data.status ? '1' : '0'}
                                            onChange={e => form.setData('status', e.target.value === '1')}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        >
                                            <option value="1">Aktif</option>
                                            <option value="0">Nonaktif</option>
                                        </select>
                                    </div>
                                    
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Deskripsi / Profil Singkat</label>
                                        <textarea
                                            value={form.data.deskripsi}
                                            onChange={e => form.setData('deskripsi', e.target.value)}
                                            rows="3"
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        ></textarea>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Daftar Program Studi (Pisahkan dengan Enter/Baris Baru)</label>
                                        <textarea
                                            value={form.data.visi_misi}
                                            onChange={e => form.setData('visi_misi', e.target.value)}
                                            rows="4"
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        ></textarea>
                                    </div>

                                    <div className="md:col-span-2 text-sm font-semibold text-emerald-700 bg-emerald-50 py-2 px-4 rounded-lg mt-4">Kepemimpinan & Kontak</div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Nama Dekan/Kepala</label>
                                        <input
                                            type="text"
                                            value={form.data.dekan_nama}
                                            onChange={e => form.setData('dekan_nama', e.target.value)}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Nama Wakil Dekan</label>
                                        <input
                                            type="text"
                                            value={form.data.wakil_dekan}
                                            onChange={e => form.setData('wakil_dekan', e.target.value)}
                                            className="w-full border-slate-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        />
                                    </div>

                                </form>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex items-center justify-end p-6 border-t border-slate-100 bg-slate-50 rounded-b-2xl shrink-0 gap-3">
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className="px-5 py-2.5 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 font-semibold transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    form="fakultasForm"
                                    type="submit"
                                    disabled={form.processing}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold transition-colors disabled:opacity-50"
                                >
                                    <Save className="w-5 h-5" />
                                    {isEditing ? 'Simpan Perubahan' : 'Simpan Fakultas'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes modalFadeIn {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-modal {
                    animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />
        </>
    );
}
