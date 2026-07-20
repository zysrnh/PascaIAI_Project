import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { User, MessageSquare, Image as ImageIcon, Info, Save, Upload } from 'lucide-react';

export default function SambutanPimpinan({ sambutan }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'post',
        nama: sambutan?.nama || '',
        jabatan: sambutan?.jabatan || '',
        sambutan_singkat: sambutan?.sambutan_singkat || '',
        sambutan_lengkap: sambutan?.sambutan_lengkap || '',
        foto: null,
        gambar_banner: null,
        deskripsi_banner: sambutan?.deskripsi_banner || '',
    });

    const [isLoaded, setIsLoaded] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [bannerPreviewUrl, setBannerPreviewUrl] = useState(null);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.profil.sambutan-pimpinan.update'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-white">Manajemen Profil: Sambutan Pimpinan</h2>}
        >
            <Head title="Sambutan Pimpinan - Admin" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />

                <div className={`min-w-0 flex-1 transition-all duration-700 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-800">Kelola Halaman: Sambutan Pimpinan</h1>
                            <p className="text-sm text-slate-500">Ubah profil pimpinan dan teks sambutan yang akan tampil di publik.</p>
                        </div>

                        <div className="bg-white rounded-[5px] shadow-sm border border-slate-200 p-6 max-w-4xl">
                            <form onSubmit={submit} className="space-y-6">
                                
                                {/* Section: Gambar Background (Banner) */}
                                <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-6 transition-all hover:bg-slate-50">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                            <ImageIcon size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800">Banner Halaman</h3>
                                            <p className="text-xs text-slate-500">Gambar ukuran besar untuk banner di halaman profil pimpinan.</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 mb-2">Gambar Banner Saat Ini</label>
                                                <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                                    <img 
                                                        src={bannerPreviewUrl || sambutan?.gambar_banner || "/images/default-banner.jpg"} 
                                                        alt="Preview" 
                                                        className="w-full h-full object-cover" 
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                                                    <div className="absolute bottom-6 left-6 z-10 text-white">
                                                        <h1 className="text-3xl font-extrabold mb-2 drop-shadow-md">Sambutan Pimpinan</h1>
                                                        <div className="w-16 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                                                        {data.deskripsi_banner && (
                                                            <p className="text-white/90 max-w-2xl text-sm leading-relaxed drop-shadow">
                                                                {data.deskripsi_banner}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="deskripsi_banner" value="Deskripsi Halaman (Opsional)" className="font-bold text-slate-700 mb-1" />
                                                <textarea
                                                    id="deskripsi_banner"
                                                    rows="2"
                                                    className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm text-sm"
                                                    placeholder="Tuliskan deskripsi singkat..."
                                                    value={data.deskripsi_banner}
                                                    onChange={(e) => setData('deskripsi_banner', e.target.value)}
                                                ></textarea>
                                                <InputError className="mt-1" message={errors.deskripsi_banner} />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-slate-700 mb-2">Ganti Banner (Maks. 2MB, JPG/PNG)</label>
                                                <label className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-emerald-500 ${errors.gambar_banner ? 'border-red-500' : ''}`}>
                                                    <span className="flex items-center space-x-2">
                                                        <Upload className="w-6 h-6 text-slate-600" />
                                                        <span className="font-medium text-slate-600">Klik untuk mengunggah file gambar</span>
                                                    </span>
                                                    <input 
                                                        type="file" 
                                                        id="gambar_banner" 
                                                        className="hidden" 
                                                        accept="image/*" 
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            setData('gambar_banner', file);
                                                            if (file) {
                                                                setBannerPreviewUrl(URL.createObjectURL(file));
                                                            } else {
                                                                setBannerPreviewUrl(null);
                                                            }
                                                        }}
                                                    />
                                                </label>
                                                <InputError message={errors.gambar_banner} className="mt-2" />
                                            </div>
                                            
                                            <div className="flex justify-end mt-4">
                                                <PrimaryButton type="submit" disabled={processing}>
                                                    Simpan Banner
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Section 1: Profil Pimpinan */}
                                <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-6 transition-all hover:bg-slate-50">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800">1. Identitas Pimpinan</h3>
                                            <p className="text-xs text-slate-500">Informasi nama dan jabatan pimpinan (misal: Direktur Pascasarjana).</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <InputLabel htmlFor="nama" value="Nama Lengkap & Gelar" className="text-slate-700 font-bold mb-1" />
                                            <TextInput
                                                id="nama"
                                                className="block w-full rounded-lg border-slate-300 focus:border-emerald-600 focus:ring-emerald-600 transition-shadow"
                                                value={data.nama}
                                                onChange={(e) => setData('nama', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.nama} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="jabatan" value="Jabatan" className="text-slate-700 font-bold mb-1" />
                                            <TextInput
                                                id="jabatan"
                                                className="block w-full rounded-lg border-slate-300 focus:border-emerald-600 focus:ring-emerald-600 transition-shadow"
                                                value={data.jabatan}
                                                onChange={(e) => setData('jabatan', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.jabatan} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Teks Sambutan */}
                                <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-6 transition-all hover:bg-slate-50">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                            <MessageSquare size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800">2. Teks Sambutan</h3>
                                            <p className="text-xs text-slate-500">Kutipan singkat dan isi sambutan lengkap dari pimpinan.</p>
                                        </div>
                                    </div>
                                    <div className="space-y-5">
                                        <div>
                                            <InputLabel htmlFor="sambutan_singkat" value="Kutipan Sambutan Singkat (Quotes)" className="text-slate-700 font-bold mb-1" />
                                            <textarea
                                                id="sambutan_singkat"
                                                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-600 focus:ring-emerald-600 h-28 transition-shadow"
                                                value={data.sambutan_singkat}
                                                onChange={(e) => setData('sambutan_singkat', e.target.value)}
                                                required
                                            ></textarea>
                                            <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                                                <Info size={14} /> Maksimal 2-3 kalimat. Ditampilkan di halaman Beranda.
                                            </p>
                                            <InputError message={errors.sambutan_singkat} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="sambutan_lengkap" value="Isi Sambutan Lengkap" className="text-slate-700 font-bold mb-1" />
                                            <textarea
                                                id="sambutan_lengkap"
                                                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-600 focus:ring-emerald-600 h-48 transition-shadow"
                                                value={data.sambutan_lengkap}
                                                onChange={(e) => setData('sambutan_lengkap', e.target.value)}
                                                required
                                            ></textarea>
                                            <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                                                <Info size={14} /> Ditampilkan khusus di halaman detail Sambutan Pimpinan.
                                            </p>
                                            <InputError message={errors.sambutan_lengkap} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Foto Pimpinan */}
                                <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-6 transition-all hover:bg-slate-50">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                                            <ImageIcon size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800">3. Foto Pimpinan</h3>
                                            <p className="text-xs text-slate-500">Unggah foto pimpinan dengan resolusi yang jelas.</p>
                                        </div>
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="foto" value="Upload Foto Baru" className="text-slate-700 font-bold mb-1" />
                                        {previewUrl ? (
                                            <div className="mb-4 mt-2">
                                                <p className="text-xs font-semibold text-emerald-600 mb-2">Preview Foto Baru:</p>
                                                <div className="bg-slate-100 rounded-xl p-2 border-2 border-emerald-400 border-dashed flex justify-center inline-block">
                                                    <img src={previewUrl} alt="Preview" className="max-h-[300px] w-auto max-w-full object-contain rounded-lg shadow-sm" />
                                                </div>
                                            </div>
                                        ) : (
                                            sambutan?.foto && (
                                                <div className="mb-4 mt-2">
                                                    <p className="text-xs font-semibold text-slate-500 mb-2">Foto Saat Ini:</p>
                                                    <div className="bg-slate-100 rounded-xl p-2 border-2 border-slate-200 border-dashed flex justify-center inline-block opacity-70">
                                                        <img src={sambutan.foto} alt="Foto Saat Ini" className="max-h-[300px] w-auto max-w-full object-contain rounded-lg shadow-sm" />
                                                    </div>
                                                </div>
                                            )
                                        )}
                                        <input
                                            type="file"
                                            id="foto"
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setData('foto', file);
                                                if (file) {
                                                    setPreviewUrl(URL.createObjectURL(file));
                                                } else {
                                                    setPreviewUrl(null);
                                                }
                                            }}
                                            accept="image/*"
                                        />
                                        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                            <Info size={14} /> Format didukung: JPG, PNG, WEBP. Maksimal 2MB. Rekomendasi rasio portrait.
                                        </p>
                                        <InputError message={errors.foto} className="mt-2" />
                                    </div>
                                </div>



                                <div className="flex items-center justify-end pt-4 border-t border-slate-200 mt-6">
                                    <PrimaryButton className="rounded-lg bg-emerald-700 hover:bg-emerald-800 focus:bg-emerald-800 px-8 py-3.5 shadow-md shadow-emerald-700/20 transition-all hover:-translate-y-0.5" disabled={processing}>
                                        <Save size={18} className="mr-2" /> Simpan Perubahan
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
