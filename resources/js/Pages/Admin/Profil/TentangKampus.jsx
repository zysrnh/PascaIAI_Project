import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { FileText, Video, Image as ImageIcon, Info } from 'lucide-react';

export default function TentangKampus({ tentang }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        judul: tentang?.judul || '',
        konten: tentang?.konten || '',
        video_url: tentang?.video_url || '',
        gambar_banner: null,
        tampilkan_pimpinan: tentang?.tampilkan_pimpinan !== false,
        pimpinan_nama: tentang?.pimpinan_nama || '',
        pimpinan_quotes: tentang?.pimpinan_quotes || '',
        pimpinan_detail: tentang?.pimpinan_detail || '',
        gambar_pimpinan: null,
    });

    const [isLoaded, setIsLoaded] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [pimpinanPreviewUrl, setPimpinanPreviewUrl] = useState(null);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.profil.tentang-kampus.update'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-white">Manajemen Profil: Tentang Kampus</h2>}
        >
            <Head title="Tentang Kampus - Admin" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />

                <div className={`min-w-0 flex-1 transition-all duration-700 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-800">Kelola Halaman: Tentang Kampus</h1>
                            <p className="text-sm text-slate-500">Ubah isi konten yang akan tampil di halaman publik Tentang Kampus.</p>
                        </div>

                        <div className="bg-white rounded-[5px] shadow-sm border border-slate-200 p-6 max-w-4xl">
                            <form onSubmit={submit} className="space-y-6">
                                
                                {/* Section 1: Konten Utama */}
                                <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-6 transition-all hover:bg-slate-50">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800">1. Konten Utama</h3>
                                            <p className="text-xs text-slate-500">Judul dan teks deskripsi utama untuk halaman Tentang Kampus.</p>
                                        </div>
                                    </div>
                                    <div className="space-y-5">
                                        <div>
                                            <InputLabel htmlFor="judul" value="Judul Halaman" className="text-slate-700 font-bold mb-1" />
                                            <TextInput
                                                id="judul"
                                                className="block w-full rounded-lg border-slate-300 focus:border-emerald-600 focus:ring-emerald-600 transition-shadow"
                                                value={data.judul}
                                                onChange={(e) => setData('judul', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.judul} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="konten" value="Deskripsi Singkat / Sejarah" className="text-slate-700 font-bold mb-1" />
                                            <textarea
                                                id="konten"
                                                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-600 focus:ring-emerald-600 h-40 transition-shadow"
                                                value={data.konten}
                                                onChange={(e) => setData('konten', e.target.value)}
                                                required
                                            ></textarea>
                                            <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                                                <Info size={14} /> Tuliskan paragraf pengantar atau sejarah singkat institusi.
                                            </p>
                                            <InputError message={errors.konten} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Video Profil */}
                                <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-6 transition-all hover:bg-slate-50">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                                            <Video size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800">2. Video Profil</h3>
                                            <p className="text-xs text-slate-500">Tautan video pengenalan kampus dari YouTube.</p>
                                        </div>
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="video_url" value="URL Video (YouTube)" className="text-slate-700 font-bold mb-1" />
                                        <TextInput
                                            id="video_url"
                                            type="url"
                                            className="block w-full rounded-lg border-slate-300 focus:border-emerald-600 focus:ring-emerald-600 transition-shadow"
                                            value={data.video_url}
                                            onChange={(e) => setData('video_url', e.target.value)}
                                            placeholder="Contoh: https://youtube.com/watch?v=..."
                                        />
                                        <InputError message={errors.video_url} className="mt-2" />
                                    </div>
                                </div>

                                {/* Section 3: Gambar Background (Banner) */}
                                <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-6 transition-all hover:bg-slate-50">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                            <ImageIcon size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-800">3. Gambar Latar Belakang</h3>
                                            <p className="text-xs text-slate-500">Gambar ukuran besar untuk header atau banner halaman.</p>
                                        </div>
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="gambar_banner" value="Upload Gambar Banner Baru" className="text-slate-700 font-bold mb-1" />
                                        {previewUrl ? (
                                            <div className="mb-4 mt-2">
                                                <p className="text-xs font-semibold text-emerald-600 mb-2">Preview Gambar Baru:</p>
                                                <div className="bg-slate-100 rounded-xl p-2 border-2 border-emerald-400 border-dashed flex justify-center">
                                                    <img src={previewUrl} alt="Preview" className="max-h-[300px] w-auto max-w-full object-contain rounded-lg shadow-sm" />
                                                </div>
                                            </div>
                                        ) : (
                                            tentang?.gambar_banner && (
                                                <div className="mb-4 mt-2">
                                                    <p className="text-xs font-semibold text-slate-500 mb-2">Banner Saat Ini:</p>
                                                    <div className="bg-slate-100 rounded-xl p-2 border-2 border-slate-200 border-dashed flex justify-center opacity-70">
                                                        <img src={tentang.gambar_banner} alt="Banner Saat Ini" className="max-h-[300px] w-auto max-w-full object-contain rounded-lg shadow-sm" />
                                                    </div>
                                                </div>
                                            )
                                        )}
                                        <input
                                            type="file"
                                            id="gambar_banner"
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                setData('gambar_banner', file);
                                                if (file) {
                                                    setPreviewUrl(URL.createObjectURL(file));
                                                } else {
                                                    setPreviewUrl(null);
                                                }
                                            }}
                                            accept="image/*"
                                        />
                                        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                                            <Info size={14} /> Format didukung: JPG, PNG, WEBP. Maksimal 2MB.
                                        </p>
                                        <InputError message={errors.gambar_banner} className="mt-2" />
                                    </div>
                                </div>

                                {/* Section 4: Profil Pimpinan (Opsional) */}
                                <div className="bg-slate-50/50 rounded-xl border border-slate-100 p-6 transition-all hover:bg-slate-50">
                                    <div className="flex items-center justify-between gap-3 mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                                <i className="fa-solid fa-user-tie text-lg"></i>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-800">4. Profil Pimpinan (Singkat)</h3>
                                                <p className="text-xs text-slate-500">Tampilkan sekilas profil pimpinan di halaman Tentang Kampus.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <label htmlFor="tampilkan_pimpinan" className="flex items-center cursor-pointer">
                                                <div className="relative">
                                                    <input 
                                                        type="checkbox" 
                                                        id="tampilkan_pimpinan" 
                                                        className="sr-only"
                                                        checked={data.tampilkan_pimpinan}
                                                        onChange={(e) => setData('tampilkan_pimpinan', e.target.checked)}
                                                    />
                                                    <div className={`block w-14 h-8 rounded-full transition-colors ${data.tampilkan_pimpinan ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                                                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${data.tampilkan_pimpinan ? 'transform translate-x-6' : ''}`}></div>
                                                </div>
                                                <div className="ml-3 text-sm font-semibold text-slate-700">
                                                    {data.tampilkan_pimpinan ? 'Ditampilkan' : 'Disembunyikan'}
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {data.tampilkan_pimpinan && (
                                        <div className="space-y-6 mt-4 border-t border-slate-200 pt-6">
                                            <div>
                                                <InputLabel htmlFor="pimpinan_nama" value="Nama Pimpinan" className="text-slate-700 font-bold mb-1" />
                                                <TextInput
                                                    id="pimpinan_nama"
                                                    type="text"
                                                    name="pimpinan_nama"
                                                    value={data.pimpinan_nama}
                                                    className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 transition-colors"
                                                    onChange={(e) => setData('pimpinan_nama', e.target.value)}
                                                    placeholder="Contoh: Dr. H. Latief Awaludin, MA.ME."
                                                />
                                                <InputError message={errors.pimpinan_nama} className="mt-2" />
                                            </div>
                                            
                                            <div>
                                                <InputLabel htmlFor="pimpinan_quotes" value="Kutipan / Quotes Singkat" className="text-slate-700 font-bold mb-1" />
                                                <textarea
                                                    id="pimpinan_quotes"
                                                    name="pimpinan_quotes"
                                                    value={data.pimpinan_quotes}
                                                    className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 transition-colors text-sm"
                                                    rows="3"
                                                    onChange={(e) => setData('pimpinan_quotes', e.target.value)}
                                                    placeholder="Tuliskan pesan atau kutipan singkat dari pimpinan..."
                                                ></textarea>
                                                <InputError message={errors.pimpinan_quotes} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="pimpinan_detail" value="Profil Detail (Biografi Singkat)" className="text-slate-700 font-bold mb-1" />
                                                <textarea
                                                    id="pimpinan_detail"
                                                    name="pimpinan_detail"
                                                    value={data.pimpinan_detail}
                                                    className="mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 transition-colors text-sm"
                                                    rows="5"
                                                    onChange={(e) => setData('pimpinan_detail', e.target.value)}
                                                    placeholder="Tuliskan biografi singkat atau detail profil pimpinan yang akan muncul saat gambar diklik..."
                                                ></textarea>
                                                <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                                                    <Info size={14} /> Teks ini akan muncul di pop-up / slide-over saat foto pimpinan diklik.
                                                </p>
                                                <InputError message={errors.pimpinan_detail} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="gambar_pimpinan" value="Upload Foto Pimpinan" className="text-slate-700 font-bold mb-1" />
                                                {pimpinanPreviewUrl ? (
                                                    <div className="mb-4 mt-2">
                                                        <p className="text-xs font-semibold text-emerald-600 mb-2">Preview Foto Baru:</p>
                                                        <img src={pimpinanPreviewUrl} alt="Preview Pimpinan" className="h-32 w-32 object-cover rounded-full border-4 border-emerald-200 shadow-sm" />
                                                    </div>
                                                ) : (
                                                    tentang?.gambar_pimpinan && (
                                                        <div className="mb-4 mt-2">
                                                            <p className="text-xs font-semibold text-slate-500 mb-2">Foto Saat Ini:</p>
                                                            <img src={tentang.gambar_pimpinan} alt="Pimpinan Saat Ini" className="h-32 w-32 object-cover rounded-full border-4 border-slate-200 shadow-sm opacity-60" />
                                                        </div>
                                                    )
                                                )}
                                                <input
                                                    type="file"
                                                    id="gambar_pimpinan"
                                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors mt-2"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        setData('gambar_pimpinan', file);
                                                        if (file) {
                                                            setPimpinanPreviewUrl(URL.createObjectURL(file));
                                                        } else {
                                                            setPimpinanPreviewUrl(null);
                                                        }
                                                    }}
                                                    accept="image/*"
                                                />
                                                <InputError message={errors.gambar_pimpinan} className="mt-2" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-end pt-4 border-t border-slate-200 mt-6">
                                    <PrimaryButton className="rounded-lg bg-emerald-700 hover:bg-emerald-800 focus:bg-emerald-800 px-8 py-3.5 shadow-md shadow-emerald-700/20 transition-all hover:-translate-y-0.5" disabled={processing}>
                                        <FileText size={18} className="mr-2" /> Simpan Perubahan
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
