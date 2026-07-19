import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        kategori: '',
        judul: '',
        konten: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.profil.store'));
    };

    const categories = [
        'Tentang Kampus',
        'Visi, Misi & Tujuan',
        'Sambutan Pimpinan',
        'Struktur Organisasi',
        'Dokumen Institusi',
        'Akreditasi'
    ];

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-slate-800">Tambah Profil Baru</h2>}
        >
            <Head title="Tambah Profil" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />

                <div className="min-w-0 flex-1">
                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                        <div className="mb-6 flex items-center gap-4">
                            <Link href={route('admin.profil.index')} className="text-slate-400 hover:text-slate-600">
                                &larr; Kembali
                            </Link>
                            <h1 className="text-2xl font-bold text-slate-800">Form Tambah Profil</h1>
                        </div>

                        <div className="bg-white rounded-[5px] shadow-sm border border-slate-200 p-6 max-w-3xl">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="kategori" value="Kategori" className="text-slate-700" />
                                    <select
                                        id="kategori"
                                        className="mt-1 block w-full border-slate-300 rounded-[5px] shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        value={data.kategori}
                                        onChange={(e) => setData('kategori', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>-- Pilih Kategori --</option>
                                        {categories.map((cat, idx) => (
                                            <option key={idx} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.kategori} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="judul" value="Judul (Misal: Sejarah IAI Persis Bandung)" className="text-slate-700" />
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
                                    <InputLabel htmlFor="konten" value="Konten / Isi" className="text-slate-700" />
                                    <textarea
                                        id="konten"
                                        className="mt-1 block w-full rounded-[5px] border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-48"
                                        value={data.konten}
                                        onChange={(e) => setData('konten', e.target.value)}
                                        placeholder="Tuliskan isi dari profil ini..."
                                    ></textarea>
                                    <InputError message={errors.konten} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end">
                                    <PrimaryButton className="ml-4 rounded-[5px] bg-blue-600 hover:bg-blue-700 focus:bg-blue-700" disabled={processing}>
                                        Simpan Profil
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
