import React, { useState, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import { Save, Image as ImageIcon, ExternalLink, Globe, Book, Phone, Plus, Trash2, ShieldCheck, Activity, Upload } from 'lucide-react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, siakad }) {
    const fileInputRef = useRef(null);
    const [bannerPreview, setBannerPreview] = useState(siakad.banner_image || null);

    const { data, setData, post, processing, errors } = useForm({
        judul: siakad.judul || '',
        deskripsi_singkat: siakad.deskripsi_singkat || '',
        link_siakad: siakad.link_siakad || '',
        link_panduan: siakad.link_panduan || '',
        kontak_bantuan: siakad.kontak_bantuan || '',
        deskripsi_banner: siakad.deskripsi_banner || '',
        fitur_list: siakad.fitur_list || [''],
        banner_image: null,
    });

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('banner_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const addFitur = () => {
        setData('fitur_list', [...data.fitur_list, '']);
    };

    const removeFitur = (index) => {
        const newList = [...data.fitur_list];
        newList.splice(index, 1);
        setData('fitur_list', newList.length ? newList : ['']);
    };

    const updateFitur = (index, value) => {
        const newList = [...data.fitur_list];
        newList[index] = value;
        setData('fitur_list', newList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.akademik.sistem.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Kelola Sistem Akademik</h2>}
        >
            <Head title="Kelola Sistem Akademik" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />
                <div className="min-w-0 flex-1 transition-all duration-700 ease-out transform opacity-100 translate-y-0">
                    <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-6">
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">Sistem Akademik</h1>
                                <p className="text-slate-500 mt-1">Kelola portal akses Sistem Informasi Akademik.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Panel 1: Pengaturan Banner & Header */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><ImageIcon className="w-5 h-5" /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Banner Halaman</h3>
                                    <p className="text-sm text-slate-500">Atur gambar latar belakang untuk halaman Sistem Akademik.</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Gambar Banner Saat Ini</label>
                                    <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                        {bannerPreview ? (
                                            <img src={bannerPreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={siakad?.banner_image || '/images/default-banner.jpg'} alt="Default Preview" className="w-full h-full object-cover" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6 z-10 text-white w-full pr-6">
                                            <h1 className="text-3xl font-extrabold mb-2 drop-shadow-md">{data.judul || 'Sistem Informasi Akademik'}</h1>
                                            <div className="w-16 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                                            {data.deskripsi_banner && (
                                                <p className="text-white/90 max-w-2xl text-sm leading-relaxed drop-shadow">
                                                    {data.deskripsi_banner}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <InputLabel htmlFor="deskripsi_banner" value="Deskripsi Banner (Opsional)" />
                                        <textarea
                                            id="deskripsi_banner"
                                            rows="3"
                                            className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Tuliskan deskripsi singkat mengenai sistem akademik..."
                                            value={data.deskripsi_banner}
                                            onChange={e => setData('deskripsi_banner', e.target.value)}
                                        ></textarea>
                                        {errors.deskripsi_banner && <p className="text-sm text-red-600 mt-1">{errors.deskripsi_banner}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-700">Ganti Banner (Maks. 2MB, JPG/PNG)</label>
                                        <label className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-emerald-500 ${errors.banner_image ? 'border-red-500' : ''}`}>
                                            <span className="flex items-center space-x-2"><Upload className="w-6 h-6 text-slate-600" /><span className="font-medium text-slate-600">Klik untuk mengunggah file gambar</span></span>
                                            <input type="file" ref={fileInputRef} name="banner_image" className="hidden" accept="image/*" onChange={handleBannerChange} />
                                        </label>
                                        {errors.banner_image && <p className="text-sm text-red-600 mt-1">{errors.banner_image}</p>}
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4 border-t border-slate-100">
                                    <PrimaryButton type="submit" disabled={processing}>
                                        Simpan Banner
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>

                        {/* Panel 2: Detail SIAKAD */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                            <div className="border-b border-slate-200 bg-slate-50/50 p-6 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Detail & Link Akses</h3>
                                    <p className="text-sm text-slate-500">Informasi utama untuk portal Sistem Informasi Akademik.</p>
                                </div>
                            </div>
                            
                            <div className="p-6 md:p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Judul Halaman <span className="text-red-500">*</span></label>
                                        <input
                                            type="text"
                                            value={data.judul}
                                            onChange={e => setData('judul', e.target.value)}
                                            className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                            placeholder="Contoh: Sistem Informasi Akademik (SIAKAD)"
                                            required
                                        />
                                        {errors.judul && <p className="text-red-500 text-xs mt-1">{errors.judul}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Link URL SIAKAD</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Globe className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <input
                                                type="text"
                                                value={data.link_siakad}
                                                onChange={e => setData('link_siakad', e.target.value)}
                                                className="w-full pl-10 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                                placeholder="https://siakad.iaipibandung.ac.id"
                                            />
                                        </div>
                                        {errors.link_siakad && <p className="text-red-500 text-xs mt-1">{errors.link_siakad}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi Singkat <span className="text-red-500">*</span></label>
                                    <textarea
                                        value={data.deskripsi_singkat}
                                        onChange={e => setData('deskripsi_singkat', e.target.value)}
                                        rows={3}
                                        className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                        placeholder="Penjelasan singkat mengenai apa itu SIAKAD dan kegunaannya..."
                                        required
                                    ></textarea>
                                    {errors.deskripsi_singkat && <p className="text-red-500 text-xs mt-1">{errors.deskripsi_singkat}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Link Panduan Penggunaan</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Book className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <input
                                                type="text"
                                                value={data.link_panduan}
                                                onChange={e => setData('link_panduan', e.target.value)}
                                                className="w-full pl-10 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                                placeholder="https://youtube.com/... atau PDF link"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Kontak Bantuan Teknis (WA/Telp)</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <input
                                                type="text"
                                                value={data.kontak_bantuan}
                                                onChange={e => setData('kontak_bantuan', e.target.value)}
                                                className="w-full pl-10 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                                placeholder="081234567890"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Panel 3: Fitur Utama */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                            <div className="border-b border-slate-200 bg-slate-50/50 p-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Daftar Fitur SIAKAD</h3>
                                        <p className="text-sm text-slate-500">Sebutkan fitur-fitur apa saja yang ada di dalam sistem.</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={addFitur}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
                                >
                                    <Plus className="w-4 h-4" /> Tambah Fitur
                                </button>
                            </div>
                            
                            <div className="p-6 md:p-8">
                                <div className="space-y-3">
                                    {data.fitur_list.map((fitur, index) => (
                                        <div key={index} className="flex gap-3 items-center">
                                            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">
                                                {index + 1}
                                            </div>
                                            <input
                                                type="text"
                                                value={fitur}
                                                onChange={e => updateFitur(index, e.target.value)}
                                                className="flex-1 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                                placeholder="Contoh: Pengisian KRS Online"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeFitur(index)}
                                                className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Hapus Fitur"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                    {data.fitur_list.length === 0 && (
                                        <p className="text-slate-500 text-center py-4 italic">Belum ada fitur ditambahkan.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="flex justify-end gap-3 sticky bottom-6 z-10">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-600/30 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <Save className="w-5 h-5" />
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
