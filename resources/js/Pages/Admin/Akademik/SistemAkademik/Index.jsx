import React, { useState, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Save, Image as ImageIcon, ExternalLink, Globe, Book, Phone, Plus, Trash2, ShieldCheck, Activity } from 'lucide-react';

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
            header={<h2 className="font-semibold text-xl text-slate-800 leading-tight">Kelola Sistem Akademik</h2>}
        >
            <Head title="Kelola Sistem Akademik" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Panel 1: Pengaturan Banner & Header */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-200">
                            <div className="border-b border-slate-200 bg-slate-50/50 p-6 flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                                    <ImageIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Banner & Header Halaman</h3>
                                    <p className="text-sm text-slate-500">Atur tampilan hero section pada halaman publik SIAKAD.</p>
                                </div>
                            </div>
                            
                            <div className="p-6 md:p-8 space-y-8">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-3">Gambar Banner (Opsional)</label>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div 
                                            className="w-full md:w-1/2 aspect-video bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-emerald-500 transition-colors"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            {bannerPreview ? (
                                                <>
                                                    <img src={bannerPreview} alt="Preview" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-white font-medium flex items-center gap-2">
                                                            <ImageIcon className="w-5 h-5" /> Ganti Banner
                                                        </span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center p-6">
                                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                                                        <ImageIcon className="w-6 h-6 text-slate-400" />
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-600 block mb-1">Klik untuk upload banner</span>
                                                    <span className="text-xs text-slate-400">Rekomendasi: 1920x600px (Max 2MB)</span>
                                                </div>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleBannerChange}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <div className="w-full md:w-1/2 space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi Banner</label>
                                                <textarea
                                                    value={data.deskripsi_banner}
                                                    onChange={e => setData('deskripsi_banner', e.target.value)}
                                                    rows={4}
                                                    className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                                    placeholder="Contoh: Portal Terpadu Layanan Akademik Mahasiswa Pascasarjana IAI Persis Bandung."
                                                ></textarea>
                                                {errors.deskripsi_banner && <p className="text-red-500 text-xs mt-1">{errors.deskripsi_banner}</p>}
                                            </div>
                                        </div>
                                    </div>
                                    {errors.banner_image && <p className="text-red-500 text-xs mt-2">{errors.banner_image}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Panel 2: Detail SIAKAD */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-200">
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
                                                type="url"
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
                                                type="url"
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
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-2xl border border-slate-200">
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
        </AuthenticatedLayout>
    );
}
