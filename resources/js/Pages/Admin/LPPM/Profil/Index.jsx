import React, { useState, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import { Save, Image as ImageIcon, ExternalLink, Globe, Book, Phone, Plus, Trash2, ShieldCheck, Activity, Upload, Users, FileText, MapPin, Mail, Lightbulb } from 'lucide-react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, lppm }) {
    const fileInputRef = useRef(null);
    const [bannerPreview, setBannerPreview] = useState(lppm?.banner_image || null);

    const { data, setData, post, processing, errors } = useForm({
        profil_singkat: lppm?.profil_singkat || '',
        sejarah: lppm?.sejarah || '',
        dasar_hukum: lppm?.dasar_hukum || '',
        tupoksi_utama: lppm?.tupoksi_utama || '',
        visi: lppm?.visi || '',
        misi: lppm?.misi || '',
        struktur_organisasi: lppm?.struktur_organisasi || [{ jabatan: '', nama: '' }],
        renstra_text: lppm?.renstra_text || '',
        kontak: lppm?.kontak || { email: '', telepon: '', alamat: '' },
        deskripsi_banner: lppm?.deskripsi_banner || '',
        banner_image: null,
        renstra_file: null,
        sk_ketua_file: null,
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

    const addStruktur = () => {
        setData('struktur_organisasi', [...data.struktur_organisasi, { jabatan: '', nama: '' }]);
    };

    const removeStruktur = (index) => {
        const newList = [...data.struktur_organisasi];
        newList.splice(index, 1);
        setData('struktur_organisasi', newList.length ? newList : [{ jabatan: '', nama: '' }]);
    };

    const updateStruktur = (index, field, value) => {
        const newList = [...data.struktur_organisasi];
        newList[index][field] = value;
        setData('struktur_organisasi', newList);
    };

    const updateKontak = (field, value) => {
        setData('kontak', { ...data.kontak, [field]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.lppm.profil.update'), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Kelola Profil LPPM</h2>}
        >
            <Head title="Kelola Profil LPPM" />

            <div className="flex bg-slate-50 min-h-screen">
                <Sidebar />
                <div className="min-w-0 flex-1 transition-all duration-700 ease-out transform opacity-100 translate-y-0">
                    <div className="py-8 px-4 sm:px-6 lg:px-8 space-y-6">
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-800">Profil LPPM</h1>
                                <p className="text-slate-500 mt-1">Kelola informasi profil Lembaga Penelitian dan Pengabdian kepada Masyarakat.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Panel 1: Pengaturan Banner & Header */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><ImageIcon className="w-5 h-5" /></div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Banner Halaman</h3>
                                    <p className="text-sm text-slate-500">Atur gambar latar belakang untuk halaman Profil LPPM.</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-slate-700">Gambar Banner Saat Ini</label>
                                    <div className="relative w-full h-64 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                        {bannerPreview ? (
                                            <img src={bannerPreview} alt="Preview" className="w-full h-full object-cover" />
                                        ) : (
                                            <img src={lppm?.banner_image || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop'} alt="Default Preview" className="w-full h-full object-cover" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6 z-10 text-white w-full pr-6">
                                            <h1 className="text-3xl font-extrabold mb-2 drop-shadow-md">Lembaga Penelitian dan Pengabdian kepada Masyarakat</h1>
                                            <div className="w-16 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                                            {data.deskripsi_banner && (
                                                <p className="text-white/90 max-w-2xl text-sm leading-relaxed drop-shadow">
                                                    {data.deskripsi_banner}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <InputLabel htmlFor="deskripsi_banner" value="Deskripsi Banner (Opsional)" />
                                        <textarea
                                            id="deskripsi_banner"
                                            rows="3"
                                            className="mt-1 block w-full border-slate-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Tuliskan deskripsi singkat LPPM..."
                                            value={data.deskripsi_banner}
                                            onChange={e => setData('deskripsi_banner', e.target.value)}
                                        ></textarea>
                                        {errors.deskripsi_banner && <p className="text-sm text-red-600 mt-1">{errors.deskripsi_banner}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-slate-700">Ganti Banner (Maks. 2MB, JPG/PNG)</label>
                                        <label className={`flex justify-center w-full h-32 px-4 transition bg-white border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-emerald-500 ${errors.banner_image ? 'border-red-500' : ''}`}>
                                            <span className="flex items-center space-x-2"><Upload className="w-6 h-6 text-slate-600" /><span className="font-medium text-slate-600">Klik untuk mengunggah file gambar</span></span>
                                            <input type="file" ref={fileInputRef} name="banner_image" className="hidden" accept="image/*" onChange={handleBannerChange} />
                                        </label>
                                        {errors.banner_image && <p className="text-sm text-red-600 mt-1">{errors.banner_image}</p>}
                                    </div>
                                </div>
                                <div className="flex justify-end pt-4 border-t border-slate-100">
                                    <PrimaryButton type="submit" disabled={processing}>
                                        Simpan Banner
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>

                        {/* Panel 2: Profil & Sejarah */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                            <div className="border-b border-slate-200 bg-slate-50/50 p-6 flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                                    <Lightbulb className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Profil & Identitas</h3>
                                    <p className="text-sm text-slate-500">Informasi utama mengenai sejarah dan identitas LPPM.</p>
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Profil Singkat</label>
                                    <textarea
                                        value={data.profil_singkat}
                                        onChange={e => setData('profil_singkat', e.target.value)}
                                        rows={4}
                                        className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                        placeholder="Tuliskan profil singkat LPPM..."
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Sejarah</label>
                                        <textarea
                                            value={data.sejarah}
                                            onChange={e => setData('sejarah', e.target.value)}
                                            rows={4}
                                            className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                            placeholder="Tuliskan sejarah berdirinya LPPM..."
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Dasar Hukum</label>
                                        <textarea
                                            value={data.dasar_hukum}
                                            onChange={e => setData('dasar_hukum', e.target.value)}
                                            rows={4}
                                            className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                            placeholder="Tuliskan dasar hukum pendirian LPPM (SK, UU, dll)..."
                                        ></textarea>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Tupoksi Utama</label>
                                    <textarea
                                        value={data.tupoksi_utama}
                                        onChange={e => setData('tupoksi_utama', e.target.value)}
                                        rows={4}
                                        className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                        placeholder="Tugas Pokok dan Fungsi LPPM..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Panel 3: Visi & Misi */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                            <div className="border-b border-slate-200 bg-slate-50/50 p-6 flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                    <Activity className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Visi & Misi</h3>
                                    <p className="text-sm text-slate-500">Tujuan dan arah gerak LPPM.</p>
                                </div>
                            </div>
                            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Visi LPPM</label>
                                    <textarea
                                        value={data.visi}
                                        onChange={e => setData('visi', e.target.value)}
                                        rows={5}
                                        className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                        placeholder="Tuliskan Visi LPPM..."
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Misi LPPM</label>
                                    <textarea
                                        value={data.misi}
                                        onChange={e => setData('misi', e.target.value)}
                                        rows={5}
                                        className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                        placeholder="Tuliskan Misi LPPM..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Panel 4: Struktur Organisasi */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                            <div className="border-b border-slate-200 bg-slate-50/50 p-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Struktur Organisasi</h3>
                                        <p className="text-sm text-slate-500">Daftar pengurus inti dan pusat-pusat di bawah LPPM.</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={addStruktur}
                                    className="inline-flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg font-semibold text-xs text-slate-700 uppercase tracking-widest shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-25 transition ease-in-out duration-150 gap-2"
                                >
                                    <Plus className="w-4 h-4" /> Tambah Pengurus
                                </button>
                            </div>
                            
                            <div className="p-6 space-y-4">
                                {data.struktur_organisasi.map((item, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm shrink-0">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                                            <input
                                                type="text"
                                                value={item.jabatan}
                                                onChange={e => updateStruktur(index, 'jabatan', e.target.value)}
                                                className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                                placeholder="Contoh: Ketua LPPM"
                                            />
                                            <input
                                                type="text"
                                                value={item.nama}
                                                onChange={e => updateStruktur(index, 'nama', e.target.value)}
                                                className="border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                                placeholder="Nama Pejabat beserta gelar"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeStruktur(index)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                                            title="Hapus"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Panel 5: Renstra & Kontak */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                                <div className="border-b border-slate-200 bg-slate-50/50 p-6 flex items-center gap-3">
                                    <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Dokumen Pendukung</h3>
                                        <p className="text-sm text-slate-500">Renstra dan SK Ketua LPPM.</p>
                                    </div>
                                </div>
                                <div className="p-6 space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Ringkasan Renstra</label>
                                        <textarea
                                            value={data.renstra_text}
                                            onChange={e => setData('renstra_text', e.target.value)}
                                            rows={3}
                                            className="w-full border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                            placeholder="Ringkasan arah kebijakan..."
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">File Renstra (PDF, Maks 10MB)</label>
                                        <input
                                            type="file"
                                            onChange={e => setData('renstra_file', e.target.files[0])}
                                            className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                            accept=".pdf"
                                        />
                                        {lppm?.renstra_file && (
                                            <a href={lppm.renstra_file} target="_blank" rel="noreferrer" className="text-emerald-600 text-sm mt-2 block hover:underline">Lihat File Renstra Saat Ini</a>
                                        )}
                                        {errors.renstra_file && <p className="text-sm text-red-600 mt-1">{errors.renstra_file}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700">File SK Pengangkatan Ketua (PDF, Maks 10MB)</label>
                                        <input
                                            type="file"
                                            onChange={e => setData('sk_ketua_file', e.target.files[0])}
                                            className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                            accept=".pdf"
                                        />
                                        {lppm?.sk_ketua_file && (
                                            <a href={lppm.sk_ketua_file} target="_blank" rel="noreferrer" className="text-emerald-600 text-sm mt-2 block hover:underline">Lihat File SK Saat Ini</a>
                                        )}
                                        {errors.sk_ketua_file && <p className="text-sm text-red-600 mt-1">{errors.sk_ketua_file}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-xl border border-slate-200">
                                <div className="border-b border-slate-200 bg-slate-50/50 p-6 flex items-center gap-3">
                                    <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Kontak Bantuan</h3>
                                        <p className="text-sm text-slate-500">Informasi kontak kantor LPPM.</p>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <input
                                                type="email"
                                                value={data.kontak.email}
                                                onChange={e => updateKontak('email', e.target.value)}
                                                className="w-full pl-10 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                                placeholder="lppm@iaipibandung.ac.id"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Telepon / WhatsApp</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Phone className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <input
                                                type="text"
                                                value={data.kontak.telepon}
                                                onChange={e => updateKontak('telepon', e.target.value)}
                                                className="w-full pl-10 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                                placeholder="081234567890"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-1">Alamat Kantor</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 pt-2 pointer-events-none">
                                                <MapPin className="h-5 w-5 text-slate-400" />
                                            </div>
                                            <textarea
                                                value={data.kontak.alamat}
                                                onChange={e => updateKontak('alamat', e.target.value)}
                                                rows={3}
                                                className="w-full pl-10 border-slate-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-lg shadow-sm"
                                                placeholder="Ruang LPPM Lt.1..."
                                            ></textarea>
                                        </div>
                                    </div>
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
            </div>
        </AuthenticatedLayout>
    );
}
