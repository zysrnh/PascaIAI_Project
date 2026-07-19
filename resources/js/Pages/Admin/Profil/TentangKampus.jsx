import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function TentangKampus({ tentang }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        judul: tentang?.judul || '',
        konten: tentang?.konten || '',
        video_url: tentang?.video_url || '',
        gambar_banner: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.profil.tentang-kampus.update'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-slate-800">Manajemen Profil: Tentang Kampus</h2>}
        >
            <Head title="Tentang Kampus - Admin" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />

                <div className="min-w-0 flex-1">
                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-800">Kelola Halaman: Tentang Kampus</h1>
                            <p className="text-sm text-slate-500">Ubah isi konten yang akan tampil di halaman publik Tentang Kampus.</p>
                        </div>

                        <div className="bg-white rounded-[5px] shadow-sm border border-slate-200 p-6 max-w-4xl">
                            <form onSubmit={submit} className="space-y-6">
                                
                                {/* Section 1: Konten Utama */}
                                <div className="border-b border-slate-100 pb-6">
                                    <h3 className="text-lg font-bold text-emerald-950 mb-4">1. Konten Utama</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel htmlFor="judul" value="Judul Halaman" className="text-slate-700 font-bold" />
                                            <TextInput
                                                id="judul"
                                                className="mt-1 block w-full rounded-[5px] border-slate-300"
                                                value={data.judul}
                                                onChange={(e) => setData('judul', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.judul} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="konten" value="Deskripsi Singkat / Sejarah" className="text-slate-700 font-bold" />
                                            <textarea
                                                id="konten"
                                                className="mt-1 block w-full rounded-[5px] border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-32"
                                                value={data.konten}
                                                onChange={(e) => setData('konten', e.target.value)}
                                                required
                                            ></textarea>
                                            <InputError message={errors.konten} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Video Profil */}
                                <div className="border-b border-slate-100 pb-6">
                                    <h3 className="text-lg font-bold text-emerald-950 mb-4">2. Video Profil</h3>
                                    <div>
                                        <InputLabel htmlFor="video_url" value="URL Video (YouTube)" className="text-slate-700 font-bold" />
                                        <TextInput
                                            id="video_url"
                                            type="url"
                                            className="mt-1 block w-full rounded-[5px] border-slate-300"
                                            value={data.video_url}
                                            onChange={(e) => setData('video_url', e.target.value)}
                                            placeholder="Contoh: https://youtube.com/..."
                                        />
                                        <InputError message={errors.video_url} className="mt-2" />
                                    </div>
                                </div>

                                {/* Section 3: Gambar Background (Banner) */}
                                <div className="border-b border-slate-100 pb-6">
                                    <h3 className="text-lg font-bold text-emerald-950 mb-4">3. Gambar Latar Belakang (Banner)</h3>
                                    <div>
                                        <InputLabel htmlFor="gambar_banner" value="Upload Gambar Banner Baru" className="text-slate-700 font-bold" />
                                        {tentang?.gambar_banner && (
                                            <div className="mb-3 mt-2">
                                                <img src={tentang.gambar_banner} alt="Banner Saat Ini" className="h-32 object-cover rounded-lg border border-slate-200" />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            id="gambar_banner"
                                            className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                            onChange={(e) => setData('gambar_banner', e.target.files[0])}
                                            accept="image/*"
                                        />
                                        <InputError message={errors.gambar_banner} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end pt-4">
                                    <PrimaryButton className="rounded-[5px] bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 px-6 py-3" disabled={processing}>
                                        Simpan Perubahan
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
