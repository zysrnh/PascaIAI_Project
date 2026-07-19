import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeft, Save, FileText, Upload } from 'lucide-react';
import Sidebar from '@/Components/Admin/Sidebar';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Form({ auth, dokumen, existingCategories = [] }) {
    const isEdit = !!dokumen;

    const { data, setData, post, processing, errors } = useForm({
        kategori: dokumen?.kategori || 'legalitas',
        judul: dokumen?.judul || '',
        file_path: null,
    });

    const defaultCategories = [
        'Dokumen Legalitas & Pendirian',
        'Dokumen Perencanaan',
        'Kebijakan & Pedoman',
        'Penjaminan Mutu',
        'Laporan',
    ];

    // Gabungkan default kategori dengan kategori dari database (hapus duplikat)
    const suggestions = [...new Set([...defaultCategories, ...existingCategories])];

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Since we are uploading a file (multipart/form-data) via inertia, 
        // updating with PUT/PATCH can have issues in Laravel. 
        // We defined the route as POST for both create and update for file support.
        
        if (isEdit) {
            post(route('admin.profil.dokumen-institusi.update', dokumen.id));
        } else {
            post(route('admin.profil.dokumen-institusi.store'));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-white">Manajemen Profil: Dokumen Institusi</h2>}
        >
            <Head title={isEdit ? 'Edit Dokumen' : 'Tambah Dokumen'} />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />

                <div className="min-w-0 flex-1 py-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-6 flex flex-col gap-4">
                            <Link 
                                href={route('admin.profil.dokumen-institusi.index')} 
                                className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-800 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Kembali ke Daftar Dokumen
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">{isEdit ? 'Edit Dokumen' : 'Tambah Dokumen'}</h1>
                            </div>
                        </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg border border-slate-200">
                        <div className="p-6 border-b border-slate-200 bg-slate-50">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-emerald-600" />
                                Form Informasi Dokumen
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">Isi detail dokumen di bawah ini.</p>
                        </div>
                        
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                <div>
                                    <InputLabel htmlFor="kategori" value="Kategori Dokumen" className="font-bold text-slate-700 mb-1" />
                                    <TextInput
                                        id="kategori"
                                        list="kategori-options"
                                        className="mt-1 block w-full"
                                        value={data.kategori}
                                        onChange={(e) => setData('kategori', e.target.value)}
                                        required
                                        placeholder="Ketik kategori baru atau pilih dari daftar..."
                                    />
                                    <datalist id="kategori-options">
                                        {suggestions.map((cat, idx) => (
                                            <option key={idx} value={cat} />
                                        ))}
                                    </datalist>
                                    <p className="text-xs text-slate-500 mt-1">Anda bisa memilih kategori yang sudah ada atau mengetik kategori baru.</p>
                                    <InputError message={errors.kategori} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="judul" value="Judul Dokumen" className="font-bold text-slate-700 mb-1" />
                                    <TextInput
                                        id="judul"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.judul}
                                        onChange={(e) => setData('judul', e.target.value)}
                                        required
                                        placeholder="Contoh: SK Pendirian Institusi IAI Persis Bandung"
                                    />
                                    <InputError message={errors.judul} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="file_path" value="File Dokumen (Hanya PDF)" className="font-bold text-slate-700 mb-2" />
                                    
                                    {isEdit && dokumen?.file_path && !data.file_path && (
                                        <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-md flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <FileText className="w-4 h-4 text-emerald-600" />
                                                <span>File saat ini: <a href={dokumen.file_path} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline font-medium">Lihat File ({dokumen.file_size})</a></span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center justify-center w-full px-4 py-6 bg-slate-50 border-2 border-dashed border-slate-300 rounded-[5px] cursor-pointer hover:bg-slate-100 hover:border-emerald-500 transition-colors group">
                                            <div className="flex flex-col items-center">
                                                <Upload className="w-8 h-8 text-slate-400 group-hover:text-emerald-500 transition-colors mb-2" />
                                                <span className="text-sm text-slate-600 group-hover:text-emerald-600 font-medium text-center">
                                                    {data.file_path ? data.file_path.name : (isEdit ? 'Klik untuk mengganti file dokumen...' : 'Klik untuk mengunggah file dokumen...')}
                                                </span>
                                                <span className="text-xs text-slate-400 mt-1">Maksimal 5MB</span>
                                            </div>
                                            <input 
                                                id="file_path" 
                                                type="file" 
                                                className="hidden" 
                                                accept=".pdf"
                                                onChange={(e) => setData('file_path', e.target.files[0])}
                                            />
                                        </label>
                                    </div>
                                    <InputError message={errors.file_path} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end pt-4 border-t border-slate-100">
                                    <Link 
                                        href={route('admin.profil.dokumen-institusi.index')}
                                        className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md mr-3 transition-colors"
                                    >
                                        Batal
                                    </Link>
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-700 active:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Menyimpan...' : (
                                            <>
                                                <Save className="w-4 h-4 mr-2" />
                                                {isEdit ? 'Simpan Perubahan' : 'Simpan Dokumen'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
