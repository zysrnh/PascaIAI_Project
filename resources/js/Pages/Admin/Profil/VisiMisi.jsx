import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Sidebar from '@/Components/Admin/Sidebar';
import { Save, Plus, Trash2, Upload, Target } from 'lucide-react';
import Swal from 'sweetalert2';

const safeParseArray = (val) => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
        try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed)) return parsed;
        } catch (e) {}
    }
    return [];
};

export default function VisiMisiEdit({ auth, visimisi }) {
    const initialMisi = safeParseArray(visimisi?.misi);
    const initialTujuan = safeParseArray(visimisi?.tujuan);

    const { data, setData, post, processing, errors } = useForm({
        gambar_banner: null,
        gambar_bg: null,
        deskripsi_banner: visimisi?.deskripsi_banner || '',
        visi: visimisi?.visi || '',
        misi: initialMisi.length > 0 ? initialMisi : [''],
        tujuan: initialTujuan.length > 0 ? initialTujuan : [''],
        _method: 'POST'
    });

    const [isLoaded, setIsLoaded] = useState(false);
    const [bannerPreview, setBannerPreview] = useState(null);
    const [bgPreview, setBgPreview] = useState(null);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('gambar_banner', file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    const handleBgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('gambar_bg', file);
            setBgPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.profil.visi-misi.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Halaman Visi, Misi & Tujuan berhasil disimpan.',
                    icon: 'success',
                    confirmButtonColor: '#0F2E24',
                });
            },
            onError: (errs) => {
                const firstErr = Object.values(errs)[0] || 'Terjadi kesalahan saat menyimpan data.';
                Swal.fire({
                    title: 'Gagal Menyimpan!',
                    text: firstErr,
                    icon: 'error',
                    confirmButtonColor: '#ef4444',
                });
            }
        });
    };

    const addMisi = () => {
        setData('misi', [...data.misi, '']);
    };

    const removeMisi = (index) => {
        const newMisi = [...data.misi];
        newMisi.splice(index, 1);
        setData('misi', newMisi.length > 0 ? newMisi : ['']);
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
        setData('tujuan', newTujuan.length > 0 ? newTujuan : ['']);
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
            <Head title="Kelola Visi Misi - Prodi KPI" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />

                <div className={`min-w-0 flex-1 transition-all duration-500 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="py-8 px-4 sm:px-6 lg:px-8">
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-slate-800">Kelola Halaman: Visi, Misi & Tujuan</h1>
                            <p className="text-sm text-slate-500">Ubah isi konten yang akan tampil di halaman publik Visi Misi Prodi KPI.</p>
                        </div>

                        <div className="bg-white rounded shadow-sm border border-slate-200 p-6 sm:p-8 max-w-5xl">
                            <form onSubmit={submit} className="space-y-8">
                            
                            {/* Images Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Banner Image */}
                                <div>
                                    <InputLabel htmlFor="gambar_banner" value="Gambar Banner Atas" className="font-bold text-slate-700 mb-2" />
                                    
                                    <div className="relative w-full h-48 bg-slate-100 rounded overflow-hidden border border-slate-200 mb-4">
                                        <img 
                                            src={bannerPreview || (visimisi?.gambar_banner || "/images/default-banner.jpg")} 
                                            alt="Preview Banner" 
                                            className="w-full h-full object-cover" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 z-10 text-white">
                                            <h2 className="text-xl font-extrabold mb-1 drop-shadow-md">Visi, Misi & Tujuan</h2>
                                            <div className="w-10 h-1 bg-amber-500 rounded-sm mb-2"></div>
                                            {data.deskripsi_banner && (
                                                <p className="text-white/90 max-w-2xl text-xs leading-relaxed drop-shadow line-clamp-2">
                                                    {data.deskripsi_banner}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel htmlFor="deskripsi_banner" value="Deskripsi Banner (Opsional)" className="font-bold text-slate-700 mb-2 text-sm" />
                                        <textarea
                                            id="deskripsi_banner"
                                            rows="2"
                                            className="w-full border-slate-300 focus:border-emerald-700 focus:ring-emerald-700 rounded shadow-sm text-sm"
                                            placeholder="Tuliskan deskripsi singkat..."
                                            value={data.deskripsi_banner}
                                            onChange={(e) => setData('deskripsi_banner', e.target.value)}
                                        ></textarea>
                                        <InputError className="mt-1" message={errors.deskripsi_banner} />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center justify-center w-full px-4 py-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded cursor-pointer hover:bg-slate-100 hover:border-emerald-700 transition-colors group">
                                            <div className="flex flex-col items-center">
                                                <Upload className="w-5 h-5 text-slate-400 group-hover:text-emerald-700 mb-1" />
                                                <span className="text-xs text-slate-600 group-hover:text-emerald-800 font-medium">Klik untuk unggah banner baru</span>
                                                <span className="text-[11px] text-slate-400 mt-0.5">JPG, PNG, WEBP (Max 2MB)</span>
                                            </div>
                                            <input
                                                type="file"
                                                id="gambar_banner"
                                                className="hidden"
                                                onChange={handleBannerChange}
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>
                                    <InputError className="mt-2" message={errors.gambar_banner} />
                                </div>

                                {/* Background Section */}
                                <div>
                                    <InputLabel htmlFor="gambar_bg" value="Gambar Latar Belakang (Section Misi)" className="font-bold text-slate-700 mb-2" />
                                    
                                    <div className="relative w-full h-48 bg-slate-100 rounded overflow-hidden border border-slate-200 mb-4">
                                        <img 
                                            src={bgPreview || (visimisi?.gambar_bg || "/images/default-banner.jpg")} 
                                            alt="Preview Background" 
                                            className="w-full h-full object-cover" 
                                        />
                                        <div className="absolute inset-0 bg-emerald-950/70 flex items-center justify-center">
                                            <p className="text-white text-xs font-semibold px-4 text-center">Background Area Daftar Misi & Tujuan</p>
                                        </div>
                                    </div>

                                    <div className="mt-10">
                                        <label className="flex items-center justify-center w-full px-4 py-3 bg-slate-50 border-2 border-dashed border-slate-300 rounded cursor-pointer hover:bg-slate-100 hover:border-emerald-700 transition-colors group">
                                            <div className="flex flex-col items-center">
                                                <Upload className="w-5 h-5 text-slate-400 group-hover:text-emerald-700 mb-1" />
                                                <span className="text-xs text-slate-600 group-hover:text-emerald-800 font-medium">Klik untuk unggah background baru</span>
                                                <span className="text-[11px] text-slate-400 mt-0.5">JPG, PNG, WEBP (Max 2MB)</span>
                                            </div>
                                            <input
                                                type="file"
                                                id="gambar_bg"
                                                className="hidden"
                                                onChange={handleBgChange}
                                                accept="image/*"
                                            />
                                        </label>
                                    </div>
                                    <InputError className="mt-2" message={errors.gambar_bg} />
                                </div>
                            </div>

                            <div className="border-t border-slate-200 pt-6">
                                <InputLabel htmlFor="visi" value="Teks Visi Program Studi" className="font-bold text-slate-700 mb-2 text-base" />
                                <textarea
                                    id="visi"
                                    value={data.visi}
                                    onChange={(e) => setData('visi', e.target.value)}
                                    className="w-full border-slate-300 focus:border-emerald-700 focus:ring-emerald-700 rounded shadow-sm min-h-[100px] text-sm"
                                    placeholder="Tuliskan Visi Program Studi KPI..."
                                ></textarea>
                                <InputError className="mt-2" message={errors.visi} />
                            </div>

                            <div className="border-t border-slate-200 pt-6">
                                <div className="flex justify-between items-center mb-4">
                                    <InputLabel value="Daftar Misi" className="font-bold text-slate-700 text-base" />
                                    <button 
                                        type="button" 
                                        onClick={addMisi}
                                        className="flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1.5 rounded text-xs font-semibold hover:bg-slate-200"
                                    >
                                        <Plus className="w-4 h-4" /> Tambah Misi
                                    </button>
                                </div>
                                
                                <div className="space-y-3">
                                    {data.misi.map((m, index) => (
                                        <div key={index} className="flex gap-2">
                                            <div className="flex-shrink-0 w-9 bg-slate-100 flex items-center justify-center rounded border border-slate-200 text-slate-600 font-bold text-xs">
                                                {index + 1}
                                            </div>
                                            <TextInput
                                                value={m}
                                                onChange={(e) => updateMisi(index, e.target.value)}
                                                className="w-full text-sm"
                                                placeholder={`Poin misi ke-${index + 1}`}
                                            />
                                            {data.misi.length > 1 && (
                                                <button 
                                                    type="button"
                                                    onClick={() => removeMisi(index)}
                                                    className="flex-shrink-0 px-3 bg-red-50 text-red-500 hover:bg-red-100 rounded border border-red-100 flex items-center justify-center"
                                                    title="Hapus poin ini"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <InputError className="mt-2" message={errors.misi} />
                            </div>

                            <div className="border-t border-slate-200 pt-6">
                                <div className="flex justify-between items-center mb-4">
                                    <InputLabel value="Daftar Tujuan" className="font-bold text-slate-700 text-base" />
                                    <button 
                                        type="button" 
                                        onClick={addTujuan}
                                        className="flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1.5 rounded text-xs font-semibold hover:bg-slate-200"
                                    >
                                        <Plus className="w-4 h-4" /> Tambah Tujuan
                                    </button>
                                </div>
                                
                                <div className="space-y-3">
                                    {data.tujuan.map((t, index) => (
                                        <div key={index} className="flex gap-2">
                                            <div className="flex-shrink-0 w-9 bg-slate-100 flex items-center justify-center rounded border border-slate-200 text-slate-600 font-bold text-xs">
                                                {index + 1}
                                            </div>
                                            <TextInput
                                                value={t}
                                                onChange={(e) => updateTujuan(index, e.target.value)}
                                                className="w-full text-sm"
                                                placeholder={`Poin tujuan ke-${index + 1}`}
                                            />
                                            {data.tujuan.length > 1 && (
                                                <button 
                                                    type="button"
                                                    onClick={() => removeTujuan(index)}
                                                    className="flex-shrink-0 px-3 bg-red-50 text-red-500 hover:bg-red-100 rounded border border-red-100 flex items-center justify-center"
                                                    title="Hapus poin ini"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <InputError className="mt-2" message={errors.tujuan} />
                            </div>

                            <div className="flex items-center justify-end pt-6 border-t border-slate-200">
                                <PrimaryButton className="gap-2 bg-[#0F2E24] hover:bg-emerald-950 font-semibold px-5 py-2.5 rounded shadow-sm" disabled={processing}>
                                    <Save className="w-4 h-4" />
                                    {processing ? 'Menyimpan...' : 'Simpan Perubahan Visi Misi'}
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
