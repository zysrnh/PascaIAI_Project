import React, { useState } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import { Image, Upload, Save, AlertCircle, FileText, Briefcase, Plus, Edit, Trash2, X } from 'lucide-react';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import Swal from 'sweetalert2';

export default function Index({ pengaturan, konten, karirs }) {
    const { flash } = usePage().props;
    const [isLoaded, setIsLoaded] = useState(false);
    
    const [previewBanner, setPreviewBanner] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingKarir, setEditingKarir] = useState(null);

    React.useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Form Banner
    const formBanner = useForm({ banner_image: null });

    // Form Konten
    const formKonten = useForm({ 
        deskripsi_utama: konten?.deskripsi_utama || '',
        deskripsi_pusat_karir: konten?.deskripsi_pusat_karir || '',
        tracer_study_url: konten?.tracer_study_url || '',
        kualifikasi_global: konten?.kualifikasi_global ? konten.kualifikasi_global.join('\n') : ''
    });

    // Form Karir
    const formKarir = useForm({
        judul: '',
        deskripsi: '',
        ikon: 'Briefcase',
        urutan: 0
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
        formBanner.post(route('admin.fakultas.prospek-karir.pengaturan'), {
            preserveScroll: true,
            onSuccess: () => {
                formBanner.reset('banner_image');
                setPreviewBanner(null);
            },
        });
    };

    const submitKonten = (e) => {
        e.preventDefault();
        formKonten.post(route('admin.fakultas.prospek-karir.konten'), { preserveScroll: true });
    };

    const openModal = (karir = null) => {
        if (karir) {
            setEditingKarir(karir);
            formKarir.setData({
                judul: karir.judul,
                deskripsi: karir.deskripsi,
                ikon: karir.ikon,
                urutan: karir.urutan
            });
        } else {
            setEditingKarir(null);
            formKarir.setData({
                judul: '',
                deskripsi: '',
                ikon: 'Briefcase',
                urutan: karirs.length + 1
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingKarir(null);
        formKarir.reset();
        formKarir.clearErrors();
    };

    const submitKarir = (e) => {
        e.preventDefault();
        if (editingKarir) {
            formKarir.put(route('admin.fakultas.prospek-karir.karir.update', editingKarir.id), {
                preserveScroll: true,
                onSuccess: () => closeModal()
            });
        } else {
            formKarir.post(route('admin.fakultas.prospek-karir.karir.store'), {
                preserveScroll: true,
                onSuccess: () => closeModal()
            });
        }
    };

    const deleteKarir = (id) => {
        Swal.fire({
            title: 'Hapus Karir?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#059669',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Ya, Hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.fakultas.prospek-karir.karir.destroy', id), {
                    preserveScroll: true
                });
            }
        });
    };

    const currentBannerUrl = previewBanner 
        ? previewBanner 
        : (pengaturan?.banner_image 
            ? `/storage/${pengaturan.banner_image}` 
            : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop");

    return (
        <AuthenticatedLayout header={<h2 className="font-semibold text-xl text-white leading-tight">Kelola Prospek Karir</h2>}>
            <Head title="Kelola Prospek Karir" />

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
                                    <p className="text-sm text-slate-500">Atur gambar latar belakang untuk halaman Prospek Karir.</p>
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
                                                <h1 className="text-3xl font-extrabold mb-2 drop-shadow-md">Prospek Karir Lulusan</h1>
                                                <div className="w-16 h-1.5 bg-amber-500 rounded-sm"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-700">Ganti Banner (Maks. 2MB, JPG/PNG)</label>
                                        <label className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-emerald-500 ${formBanner.errors.banner_image ? 'border-red-500' : ''}`}>
                                            <span className="flex items-center space-x-2"><Upload className="w-6 h-6 text-slate-600" /><span className="font-medium text-slate-600">Klik untuk mengunggah file gambar</span></span>
                                            <input type="file" name="banner_image" className="hidden" accept="image/*" onChange={handleBannerChange} />
                                        </label>
                                        {formBanner.errors.banner_image && <p className="text-sm text-red-600 mt-1">{formBanner.errors.banner_image}</p>}
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-slate-100">
                                        <button type="submit" disabled={formBanner.processing || !formBanner.data.banner_image} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors disabled:opacity-50">
                                            <Save className="w-4 h-4" /> Simpan Banner
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Konten Utama Section */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200">
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><FileText className="w-5 h-5" /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Konten Utama</h3>
                                    <p className="text-sm text-slate-500">Ubah teks deskripsi pendahuluan profil lulusan.</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <form onSubmit={submitKonten} className="space-y-6">
                                    <div>
                                        <InputLabel htmlFor="deskripsi_utama" value="Deskripsi Profil Lulusan" />
                                        <textarea
                                            id="deskripsi_utama"
                                            className="block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 mt-1"
                                            rows="4"
                                            value={formKonten.data.deskripsi_utama}
                                            onChange={(e) => formKonten.setData('deskripsi_utama', e.target.value)}
                                            required
                                        ></textarea>
                                        <InputError message={formKonten.errors.deskripsi_utama} className="mt-2" />
                                    </div>
                                    <div className="pt-4 border-t border-slate-100">
                                        <h4 className="font-semibold text-slate-800 mb-4">Pengaturan Sidebar Kanan</h4>
                                        <div className="space-y-4">
                                            <div>
                                                <InputLabel htmlFor="deskripsi_pusat_karir" value="Deskripsi Pusat Karir & Pengembangan Alumni" />
                                                <textarea
                                                    id="deskripsi_pusat_karir"
                                                    className="block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 mt-1"
                                                    rows="3"
                                                    value={formKonten.data.deskripsi_pusat_karir}
                                                    onChange={(e) => formKonten.setData('deskripsi_pusat_karir', e.target.value)}
                                                ></textarea>
                                                <InputError message={formKonten.errors.deskripsi_pusat_karir} className="mt-2" />
                                            </div>
                                            <div>
                                                <InputLabel htmlFor="tracer_study_url" value="URL Link Tracer Study" />
                                                <TextInput
                                                    id="tracer_study_url"
                                                    type="text"
                                                    className="mt-1 block w-full"
                                                    value={formKonten.data.tracer_study_url}
                                                    onChange={(e) => formKonten.setData('tracer_study_url', e.target.value)}
                                                    placeholder="Contoh: https://tracerstudy.iaipibandung.ac.id"
                                                />
                                                <InputError message={formKonten.errors.tracer_study_url} className="mt-2" />
                                            </div>
                                            <div>
                                                <InputLabel htmlFor="kualifikasi_global" value="Daftar Kualifikasi Global (pisahkan dengan baris baru / enter)" />
                                                <textarea
                                                    id="kualifikasi_global"
                                                    className="block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 mt-1"
                                                    rows="4"
                                                    value={formKonten.data.kualifikasi_global}
                                                    onChange={(e) => formKonten.setData('kualifikasi_global', e.target.value)}
                                                    placeholder="Penguasaan Metodologi Riset Modern&#10;Pemahaman Tafsir & Hadis Tematik&#10;Manajemen Pendidikan Berbasis IT"
                                                ></textarea>
                                                <p className="text-xs text-slate-500 mt-1">Gunakan tombol Enter untuk memisahkan setiap poin kualifikasi.</p>
                                                <InputError message={formKonten.errors.kualifikasi_global} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-slate-100">
                                        <button type="submit" disabled={formKonten.processing} className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-md shadow-sm transition-colors disabled:opacity-50">
                                            <Save className="w-4 h-4" /> Simpan Konten
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Daftar Karir Section */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200">
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Briefcase className="w-5 h-5" /></div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Daftar Prospek Karir</h3>
                                        <p className="text-sm text-slate-500">Kelola daftar karir unggulan bagi lulusan.</p>
                                    </div>
                                </div>
                                <button onClick={() => openModal()} className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition-colors text-sm">
                                    <Plus className="w-4 h-4" /> Tambah Karir
                                </button>
                            </div>
                            <div className="p-0 overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 text-xs uppercase tracking-wider">
                                            <th className="p-4 font-semibold">No</th>
                                            <th className="p-4 font-semibold">Ikon</th>
                                            <th className="p-4 font-semibold">Judul Karir</th>
                                            <th className="p-4 font-semibold">Deskripsi</th>
                                            <th className="p-4 font-semibold text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-slate-100">
                                        {karirs.length === 0 ? (
                                            <tr><td colSpan="5" className="p-8 text-center text-slate-500">Belum ada daftar karir yang ditambahkan.</td></tr>
                                        ) : (
                                            karirs.map((item, idx) => (
                                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="p-4 text-slate-600">{item.urutan || idx + 1}</td>
                                                    <td className="p-4 text-slate-600"><span className="px-2 py-1 bg-slate-100 rounded text-xs">{item.ikon}</span></td>
                                                    <td className="p-4 font-medium text-slate-800 whitespace-nowrap">{item.judul}</td>
                                                    <td className="p-4 text-slate-600 max-w-md truncate">{item.deskripsi}</td>
                                                    <td className="p-4 text-right whitespace-nowrap">
                                                        <button onClick={() => openModal(item)} className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-md transition-colors mr-2">
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button onClick={() => deleteKarir(item.id)} className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-md transition-colors">
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

            {/* Modal Tambah/Edit Karir */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
                        <div className="flex justify-between items-center p-6 border-b border-slate-100">
                            <h3 className="text-lg font-bold text-slate-800">{editingKarir ? 'Edit Karir' : 'Tambah Karir'}</h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={submitKarir}>
                            <div className="p-6 space-y-4">
                                <div>
                                    <InputLabel htmlFor="judul" value="Judul Karir" />
                                    <TextInput id="judul" type="text" className="mt-1 block w-full" value={formKarir.data.judul} onChange={e => formKarir.setData('judul', e.target.value)} required />
                                    <InputError message={formKarir.errors.judul} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="deskripsi" value="Deskripsi Singkat" />
                                    <textarea id="deskripsi" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" rows="3" value={formKarir.data.deskripsi} onChange={e => formKarir.setData('deskripsi', e.target.value)} required></textarea>
                                    <InputError message={formKarir.errors.deskripsi} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="ikon" value="Nama Ikon (Lucide-React)" />
                                    <TextInput id="ikon" type="text" className="mt-1 block w-full" value={formKarir.data.ikon} onChange={e => formKarir.setData('ikon', e.target.value)} placeholder="Contoh: Briefcase, Users, BookOpen" />
                                    <InputError message={formKarir.errors.ikon} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="urutan" value="Urutan (opsional)" />
                                    <TextInput id="urutan" type="number" className="mt-1 block w-full" value={formKarir.data.urutan} onChange={e => formKarir.setData('urutan', e.target.value)} />
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                                <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50">Batal</button>
                                <button type="submit" disabled={formKarir.processing} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow-sm disabled:opacity-50">
                                    {editingKarir ? 'Simpan Perubahan' : 'Tambahkan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
