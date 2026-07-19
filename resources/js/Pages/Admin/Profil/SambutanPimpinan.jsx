import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function SambutanPimpinan({ sambutan }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'post',
        nama: sambutan?.nama || '',
        jabatan: sambutan?.jabatan || '',
        sambutan_singkat: sambutan?.sambutan_singkat || '',
        sambutan_lengkap: sambutan?.sambutan_lengkap || '',
        foto: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.profil.sambutan-pimpinan.update'), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-slate-800">Manajemen Profil: Sambutan Pimpinan</h2>}
        >
            <Head title="Sambutan Pimpinan - Admin" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />

                <div className="min-w-0 flex-1">
                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-800">Kelola Halaman: Sambutan Pimpinan</h1>
                            <p className="text-sm text-slate-500">Ubah profil pimpinan dan teks sambutan yang akan tampil di publik.</p>
                        </div>

                        <div className="bg-white rounded-[5px] shadow-sm border border-slate-200 p-6 max-w-4xl">
                            <form onSubmit={submit} className="space-y-6">
                                
                                {/* Section 1: Profil Pimpinan */}
                                <div className="border-b border-slate-100 pb-6">
                                    <h3 className="text-lg font-bold text-emerald-950 mb-4">1. Identitas Pimpinan</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="nama" value="Nama Lengkap & Gelar" className="text-slate-700 font-bold" />
                                            <TextInput
                                                id="nama"
                                                className="mt-1 block w-full rounded-[5px] border-slate-300"
                                                value={data.nama}
                                                onChange={(e) => setData('nama', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.nama} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="jabatan" value="Jabatan" className="text-slate-700 font-bold" />
                                            <TextInput
                                                id="jabatan"
                                                className="mt-1 block w-full rounded-[5px] border-slate-300"
                                                value={data.jabatan}
                                                onChange={(e) => setData('jabatan', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.jabatan} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Teks Sambutan */}
                                <div className="border-b border-slate-100 pb-6">
                                    <h3 className="text-lg font-bold text-emerald-950 mb-4">2. Teks Sambutan</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <InputLabel htmlFor="sambutan_singkat" value="Kutipan Sambutan Singkat (Quotes)" className="text-slate-700 font-bold" />
                                            <textarea
                                                id="sambutan_singkat"
                                                className="mt-1 block w-full rounded-[5px] border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-24"
                                                value={data.sambutan_singkat}
                                                onChange={(e) => setData('sambutan_singkat', e.target.value)}
                                                required
                                            ></textarea>
                                            <p className="text-xs text-slate-500 mt-1">Ditampilkan di halaman depan / ringkasan.</p>
                                            <InputError message={errors.sambutan_singkat} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="sambutan_lengkap" value="Isi Sambutan Lengkap" className="text-slate-700 font-bold" />
                                            <textarea
                                                id="sambutan_lengkap"
                                                className="mt-1 block w-full rounded-[5px] border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-40"
                                                value={data.sambutan_lengkap}
                                                onChange={(e) => setData('sambutan_lengkap', e.target.value)}
                                                required
                                            ></textarea>
                                            <InputError message={errors.sambutan_lengkap} className="mt-2" />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 3: Foto Pimpinan */}
                                <div>
                                    <h3 className="text-lg font-bold text-emerald-950 mb-4">3. Foto Pimpinan</h3>
                                    <div>
                                        <InputLabel htmlFor="foto" value="Upload Foto Baru" className="text-slate-700 font-bold" />
                                        {sambutan?.foto && (
                                            <div className="mb-3 mt-2">
                                                <img src={sambutan.foto} alt="Foto Saat Ini" className="h-32 object-contain rounded-lg border border-slate-200" />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            id="foto"
                                            className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                            onChange={(e) => setData('foto', e.target.files[0])}
                                            accept="image/*"
                                        />
                                        <InputError message={errors.foto} className="mt-2" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end pt-4 border-t border-slate-100 mt-6">
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
