import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { Save, ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function Form({ auth, anggota, defaultUrutan = 0 }) {
    const isEdit = !!anggota;
    const [isLoaded] = useState(true);

    const { data, setData, post, processing, errors } = useForm({
        nama: anggota?.nama || '',
        jabatan: anggota?.jabatan || '',
        urutan: anggota?.urutan || defaultUrutan,
        foto: null,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const submit = (e) => {
        e.preventDefault();
        const targetRoute = isEdit 
            ? route('admin.profil.struktur-organisasi.update', anggota.id)
            : route('admin.profil.struktur-organisasi.store');
            
        post(targetRoute, {
            forceFormData: true
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-white">Manajemen Profil: Struktur Organisasi</h2>}
        >
            <Head title={isEdit ? "Edit Anggota" : "Tambah Anggota"} />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />

                <div className={`min-w-0 flex-1 transition-all duration-700 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                        <div className="mb-6 flex items-center gap-4">
                            <Link href={route('admin.profil.struktur-organisasi.index')} className="p-2 bg-white rounded-full shadow-sm hover:bg-slate-100 transition-colors">
                                <ArrowLeft className="w-5 h-5 text-slate-600" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">{isEdit ? 'Edit Anggota Struktur' : 'Tambah Anggota Struktur'}</h1>
                                <p className="text-sm text-slate-500">Isi detail data pengurus organisasi.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-[5px] shadow-sm border border-slate-200 p-6 sm:p-8 max-w-3xl">
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="nama" value="Nama Lengkap (beserta gelar)" className="font-bold text-slate-700 mb-1" />
                                    <TextInput
                                        id="nama"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        required
                                        placeholder="Contoh: Dr. H. Fulan, M.Ag."
                                    />
                                    <InputError message={errors.nama} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="jabatan" value="Jabatan" className="font-bold text-slate-700 mb-1" />
                                    <TextInput
                                        id="jabatan"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.jabatan}
                                        onChange={(e) => setData('jabatan', e.target.value)}
                                        required
                                        placeholder="Contoh: Direktur Pascasarjana"
                                    />
                                    <InputError message={errors.jabatan} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="urutan" value="Urutan Tampil (Angka terkecil tampil paling atas/awal)" className="font-bold text-slate-700 mb-1" />
                                    <TextInput
                                        id="urutan"
                                        type="number"
                                        className="mt-1 block w-full md:w-1/3"
                                        value={data.urutan}
                                        onChange={(e) => setData('urutan', e.target.value)}
                                        required
                                    />
                                    <p className="text-xs text-slate-500 mt-1">Contoh: 1 untuk Direktur, 2 untuk Wakil Direktur, dst.</p>
                                    <InputError message={errors.urutan} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="foto" value="Foto Profil" className="font-bold text-slate-700 mb-2" />
                                    
                                    {isEdit && anggota?.foto && !data.foto && (
                                        <div className="mb-4">
                                            <p className="text-sm text-slate-500 mb-2">Foto saat ini:</p>
                                            <img src={anggota.foto} alt="Foto" className="w-32 h-32 object-cover rounded-md border border-slate-200" />
                                        </div>
                                    )}

                                    {data.foto && (
                                        <div className="mb-4">
                                            <p className="text-sm text-emerald-600 mb-2 font-medium">Preview foto baru:</p>
                                            <img src={URL.createObjectURL(data.foto)} alt="Preview" className="w-32 h-32 object-cover rounded-md border-2 border-emerald-500 shadow-sm" />
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center justify-center w-full md:w-2/3 px-4 py-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded-[5px] cursor-pointer hover:bg-slate-100 hover:border-emerald-500 transition-colors group">
                                            <div className="flex flex-col items-center">
                                                <ImageIcon className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 mb-1" />
                                                <span className="text-sm text-slate-500 group-hover:text-emerald-600">Klik untuk unggah foto (Opsional)</span>
                                                <span className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP (Max 2MB, Rasio 1:1 disarankan)</span>
                                            </div>
                                            <input
                                                type="file"
                                                id="foto"
                                                className="hidden"
                                                onChange={(e) => setData('foto', e.target.files[0])}
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>
                                    <InputError message={errors.foto} className="mt-2" />
                                </div>

                                <div className="pt-6 border-t border-slate-200 flex justify-end gap-3">
                                    <Link href={route('admin.profil.struktur-organisasi.index')}>
                                        <button type="button" className="px-4 py-2 bg-white border border-slate-300 rounded-[5px] text-slate-700 hover:bg-slate-50 font-medium">
                                            Batal
                                        </button>
                                    </Link>
                                    <PrimaryButton className="bg-emerald-600 hover:bg-emerald-700 gap-2" disabled={processing}>
                                        <Save className="w-4 h-4" />
                                        {isEdit ? 'Simpan Perubahan' : 'Tambah Anggota'}
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
