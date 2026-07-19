import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Sidebar from '@/Components/Admin/Sidebar';
import { Save, Image as ImageIcon, Plus, Trash2, Upload, Image } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function VisiMisiEdit({ auth, visimisi }) {
    const { data, setData, post, processing, errors } = useForm({
        gambar_banner: null,
        gambar_bg: null,
        visi: visimisi.visi || '',
        misi: Array.isArray(visimisi.misi) ? visimisi.misi : JSON.parse(visimisi.misi || '[]'),
        tujuan: Array.isArray(visimisi.tujuan) ? visimisi.tujuan : JSON.parse(visimisi.tujuan || '[]'),
        _method: 'POST'
    });

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.profil.visi-misi.update'));
    };

    const addMisi = () => {
        setData('misi', [...data.misi, '']);
    };

    const removeMisi = (index) => {
        const newMisi = [...data.misi];
        newMisi.splice(index, 1);
        setData('misi', newMisi);
    };

    const updateMisi = (index, value) => {
        const newMisi = [...data.misi];
        newMisi[index] = value;
        setData('misi', newMisi);
    };

    const addTujuan = () => {
        setData('tujuan', [...data.tujuan, '']);
    };

    const removeTujuan = (index) => {
        const newTujuan = [...data.tujuan];
        newTujuan.splice(index, 1);
        setData('tujuan', newTujuan);
    };

    const updateTujuan = (index, value) => {
        const newTujuan = [...data.tujuan];
        newTujuan[index] = value;
        setData('tujuan', newTujuan);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="text-xl font-semibold leading-tight text-white">Manajemen Profil: Visi, Misi & Tujuan</h2>}
        >
            <Head title="Kelola Visi Misi" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />

                <div className={`min-w-0 flex-1 transition-all duration-700 ease-out transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-800">Kelola Halaman: Visi, Misi & Tujuan</h1>
                            <p className="text-sm text-slate-500">Ubah isi konten yang akan tampil di halaman publik Visi Misi.</p>
                        </div>

                        <div className="bg-white rounded-[5px] shadow-sm border border-slate-200 p-6 sm:p-8 max-w-5xl">
                            <form onSubmit={submit} className="space-y-8">
                            
                            {/* Images Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Banner Image */}
                                <div>
                                    <InputLabel htmlFor="gambar_banner" value="Gambar Banner Atas" className="font-bold text-slate-700 mb-2" />
                                    
                                    <div className="relative w-full h-48 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 mb-4">
                                        <img 
                                            src={data.gambar_banner ? URL.createObjectURL(data.gambar_banner) : (visimisi?.gambar_banner || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop")} 
                                            alt="Preview Banner" 
                                            className="w-full h-full object-cover" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 z-10 text-white">
                                            <h1 className="text-2xl font-extrabold mb-1 drop-shadow-md">Visi, Misi & Tujuan</h1>
                                            <div className="w-12 h-1 bg-amber-500 rounded-sm"></div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <label className={`flex items-center justify-center w-full px-4 py-3 bg-slate-50 border-2 border-dashed rounded-[5px] cursor-pointer hover:bg-slate-100 hover:border-emerald-500 transition-colors group ${errors.gambar_banner ? 'border-red-500' : 'border-slate-300'}`}>
                                            <div className="flex flex-col items-center">
                                                <Upload className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 mb-1" />
                                                <span className="text-sm text-slate-500 group-hover:text-emerald-600">Klik untuk unggah banner baru</span>
                                                <span className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP (Max 2MB)</span>
                                            </div>
                                            <input
                                                type="file"
                                                id="gambar_banner"
                                                className="hidden"
                                                onChange={(e) => setData('gambar_banner', e.target.files[0])}
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>
                                    <InputError className="mt-2" message={errors.gambar_banner} />
                                </div>

                                {/* Background Image */}
                                <div>
                                    <InputLabel htmlFor="gambar_bg" value="Gambar Latar Belakang Konten" className="font-bold text-slate-700 mb-2" />
                                    {visimisi.gambar_bg && (
                                        <div className="mb-4">
                                            <p className="text-sm text-slate-500 mb-2">Background saat ini:</p>
                                            <img src={visimisi.gambar_bg} alt="Background" className="w-full h-32 object-cover rounded-[5px] border border-slate-200" />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center justify-center w-full px-4 py-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded-[5px] cursor-pointer hover:bg-slate-100 hover:border-emerald-500 transition-colors group">
                                            <div className="flex flex-col items-center">
                                                <ImageIcon className="w-6 h-6 text-slate-400 group-hover:text-emerald-500 mb-1" />
                                                <span className="text-sm text-slate-500 group-hover:text-emerald-600">Klik untuk unggah background baru</span>
                                                <span className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP (Max 2MB)</span>
                                            </div>
                                            <input
                                                type="file"
                                                id="gambar_bg"
                                                className="hidden"
                                                onChange={(e) => setData('gambar_bg', e.target.files[0])}
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>
                                    {data.gambar_bg && (
                                        <div className="mt-4">
                                            <p className="text-sm text-emerald-600 mb-2 font-medium">Preview background baru:</p>
                                            <img src={URL.createObjectURL(data.gambar_bg)} alt="Background Preview" className="w-full h-32 object-cover rounded-[5px] border-2 border-emerald-500 shadow-sm" />
                                        </div>
                                    )}
                                    <InputError className="mt-2" message={errors.gambar_bg} />
                                </div>
                            </div>

                            <div className="border-t border-slate-200 pt-8">
                                <InputLabel htmlFor="visi" value="Teks Visi" className="font-bold text-slate-700 mb-2 text-lg" />
                                <textarea
                                    id="visi"
                                    value={data.visi}
                                    onChange={(e) => setData('visi', e.target.value)}
                                    className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-[5px] shadow-sm min-h-[100px]"
                                    placeholder="Tuliskan Visi..."
                                ></textarea>
                                <InputError className="mt-2" message={errors.visi} />
                            </div>

                            <div className="border-t border-slate-200 pt-8">
                                <div className="flex justify-between items-center mb-4">
                                    <InputLabel value="Daftar Misi" className="font-bold text-slate-700 text-lg" />
                                    <button 
                                        type="button" 
                                        onClick={addMisi}
                                        className="flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-[5px] text-sm hover:bg-slate-200"
                                    >
                                        <Plus className="w-4 h-4" /> Tambah Misi
                                    </button>
                                </div>
                                
                                <div className="space-y-3">
                                    {data.misi.map((m, index) => (
                                        <div key={index} className="flex gap-2">
                                            <div className="flex-shrink-0 w-10 bg-slate-100 flex items-center justify-center rounded-[5px] border border-slate-200 text-slate-500 font-semibold">
                                                {index + 1}
                                            </div>
                                            <TextInput
                                                value={m}
                                                onChange={(e) => updateMisi(index, e.target.value)}
                                                className="w-full"
                                                placeholder={`Misi ke-${index + 1}`}
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => removeMisi(index)}
                                                className="flex-shrink-0 px-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-[5px] border border-red-100 flex items-center justify-center"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <InputError className="mt-2" message={errors.misi} />
                            </div>

                            <div className="border-t border-slate-200 pt-8">
                                <div className="flex justify-between items-center mb-4">
                                    <InputLabel value="Daftar Tujuan" className="font-bold text-slate-700 text-lg" />
                                    <button 
                                        type="button" 
                                        onClick={addTujuan}
                                        className="flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-[5px] text-sm hover:bg-slate-200"
                                    >
                                        <Plus className="w-4 h-4" /> Tambah Tujuan
                                    </button>
                                </div>
                                
                                <div className="space-y-3">
                                    {data.tujuan.map((t, index) => (
                                        <div key={index} className="flex gap-2">
                                            <div className="flex-shrink-0 w-10 bg-slate-100 flex items-center justify-center rounded-[5px] border border-slate-200 text-slate-500 font-semibold">
                                                {index + 1}
                                            </div>
                                            <TextInput
                                                value={t}
                                                onChange={(e) => updateTujuan(index, e.target.value)}
                                                className="w-full"
                                                placeholder={`Tujuan ke-${index + 1}`}
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => removeTujuan(index)}
                                                className="flex-shrink-0 px-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-[5px] border border-red-100 flex items-center justify-center"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <InputError className="mt-2" message={errors.tujuan} />
                            </div>

                            <div className="flex items-center justify-end pt-8 border-t border-slate-200">
                                <PrimaryButton className="gap-2 bg-emerald-600 hover:bg-emerald-700" disabled={processing}>
                                    <Save className="w-4 h-4" />
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
