import React, { useState, useRef, useEffect } from 'react';
import { Head, useForm, router, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import { 
    Save, Image as ImageIcon, ExternalLink, Plus, Trash2, 
    Tv, Newspaper, Mic, Film, Camera, Share2, Clock, Mail, CheckCircle2 
} from 'lucide-react';
import Swal from 'sweetalert2';

export default function Index({ auth, labs, activeLab, activeSlug }) {
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(activeLab?.gambar_utama || null);

    // Form state
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_lab: activeLab?.nama_lab || '',
        subjudul: activeLab?.subjudul || '',
        badge_status: activeLab?.badge_status || '',
        deskripsi: activeLab?.deskripsi || '',
        jadwal_layanan: activeLab?.jadwal_layanan || '',
        kontak_layanan: activeLab?.kontak_layanan || '',
        gambar_file: null,
        spesifikasi_alat: Array.isArray(activeLab?.spesifikasi_alat) ? activeLab.spesifikasi_alat : [],
        program_output: Array.isArray(activeLab?.program_output) ? activeLab.program_output : [],
    });

    // Update form when activeLab changes
    useEffect(() => {
        setData({
            nama_lab: activeLab?.nama_lab || '',
            subjudul: activeLab?.subjudul || '',
            badge_status: activeLab?.badge_status || '',
            deskripsi: activeLab?.deskripsi || '',
            jadwal_layanan: activeLab?.jadwal_layanan || '',
            kontak_layanan: activeLab?.kontak_layanan || '',
            gambar_file: null,
            spesifikasi_alat: Array.isArray(activeLab?.spesifikasi_alat) ? activeLab.spesifikasi_alat : [],
            program_output: Array.isArray(activeLab?.program_output) ? activeLab.program_output : [],
        });
        setImagePreview(activeLab?.gambar_utama || null);
    }, [activeLab]);

    const handleTabChange = (slug) => {
        router.get('/admin/akademik/laboratorium', { slug }, { preserveState: false, preserveScroll: true });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('gambar_file', file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Alat handlers
    const addAlat = () => {
        const nextNum = String(data.spesifikasi_alat.length + 1).padStart(2, '0');
        setData('spesifikasi_alat', [
            ...data.spesifikasi_alat,
            { nomor: nextNum, nama: '', deskripsi: '' }
        ]);
    };

    const updateAlat = (index, field, value) => {
        const updated = [...data.spesifikasi_alat];
        updated[index][field] = value;
        setData('spesifikasi_alat', updated);
    };

    const removeAlat = (index) => {
        const updated = data.spesifikasi_alat.filter((_, i) => i !== index);
        setData('spesifikasi_alat', updated);
    };

    // Output program handlers
    const addOutput = () => {
        setData('program_output', [
            ...data.program_output,
            { kategori: '', judul: '', deskripsi: '' }
        ]);
    };

    const updateOutput = (index, field, value) => {
        const updated = [...data.program_output];
        updated[index][field] = value;
        setData('program_output', updated);
    };

    const removeOutput = (index) => {
        const updated = data.program_output.filter((_, i) => i !== index);
        setData('program_output', updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/akademik/laboratorium/${activeSlug}`, {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil Disimpan!',
                    text: `Data ${data.nama_lab} telah berhasil diperbarui di sistem.`,
                    confirmButtonColor: '#0F172A',
                    timer: 2500,
                });
            },
            onError: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Menyimpan',
                    text: 'Periksa kembali isian form Anda.',
                    confirmButtonColor: '#0F172A',
                });
            }
        });
    };

    const getLabIcon = (slug) => {
        switch (slug) {
            case 'penyiaran': return <Tv className="w-4 h-4" />;
            case 'jurnalistik': return <Newspaper className="w-4 h-4" />;
            case 'podcast': return <Mic className="w-4 h-4" />;
            case 'film-pendek': return <Film className="w-4 h-4" />;
            case 'fotografi': return <Camera className="w-4 h-4" />;
            case 'dakwah-digital': return <Share2 className="w-4 h-4" />;
            default: return <CheckCircle2 className="w-4 h-4" />;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Kelola Laboratorium &amp; Praktik Media</h2>}
        >
            <Head title={`Kelola ${activeLab?.nama_lab || 'Laboratorium'}`} />

            <div className="flex bg-slate-50 min-h-screen">
                {/* Standard Left Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="min-w-0 flex-1 transition-all duration-500 ease-out">
                    <div className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

                        {/* Top Header Card */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
                                    <span>Akademik &amp; Fasilitas Praktikum</span>
                                </div>
                                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                                    Kelola Laboratorium &amp; Praktik Media
                                </h1>
                                <p className="text-slate-500 text-xs sm:text-sm mt-1">
                                    Perbarui informasi fasilitas studio, foto, spesifikasi peralatan, dan jadwal layanan untuk 6 modul laboratorium.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                                <a
                                    href={`/laboratorium/${activeSlug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition"
                                >
                                    <span>Lihat Publik</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                                <button
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow transition disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{processing ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                                </button>
                            </div>
                        </div>

                        {/* 6 Tabs Laboratorium Selector (Horizontal Scroll on Mobile) */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-sm overflow-hidden">
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none sm:grid sm:grid-cols-3 lg:grid-cols-6">
                                {labs?.map((l) => {
                                    const isActive = l.slug === activeSlug;
                                    return (
                                        <button
                                            key={l.slug}
                                            type="button"
                                            onClick={() => handleTabChange(l.slug)}
                                            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                                                isActive
                                                    ? 'bg-slate-900 text-white shadow-sm'
                                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                            }`}
                                        >
                                            {getLabIcon(l.slug)}
                                            <span>{l.nama_lab.replace('Laboratorium ', '').replace('Produksi ', '').replace('Praktik ', '')}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Main Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* General Information Card */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 space-y-6 shadow-sm">
                                <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    Informasi Pokok Studio ({activeLab?.nama_lab})
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                            Nama Laboratorium / Modul *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nama_lab}
                                            onChange={(e) => setData('nama_lab', e.target.value)}
                                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition"
                                            required
                                        />
                                        {errors.nama_lab && <p className="text-red-500 text-xs mt-1">{errors.nama_lab}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                            Badge Subjudul / Tipe Ruangan
                                        </label>
                                        <input
                                            type="text"
                                            value={data.badge_status}
                                            onChange={(e) => setData('badge_status', e.target.value)}
                                            placeholder="Contoh: Broadcast TV & Radio On-Air Suite"
                                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                            Subjudul Banner Editorial (Header Hero)
                                        </label>
                                        <input
                                            type="text"
                                            value={data.subjudul}
                                            onChange={(e) => setData('subjudul', e.target.value)}
                                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                            Deskripsi Lengkap &amp; Peran Praktikum
                                        </label>
                                        <textarea
                                            rows={4}
                                            value={data.deskripsi}
                                            onChange={(e) => setData('deskripsi', e.target.value)}
                                            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Media & Operational Card */}
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                {/* Image Upload */}
                                <div className="md:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 space-y-4 shadow-sm">
                                    <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                                        <ImageIcon className="w-4 h-4 text-slate-600" />
                                        Foto Utama Studio / Ruangan
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="aspect-video rounded-xl border border-slate-200 overflow-hidden bg-slate-900 relative flex items-center justify-center">
                                            {imagePreview ? (
                                                <img src={imagePreview} alt="Preview Studio" className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-slate-400 text-xs">Belum ada gambar</span>
                                            )}
                                        </div>

                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/jpeg,image/png,image/jpg,image/webp"
                                            className="hidden"
                                        />

                                        <div className="flex flex-wrap items-center gap-3">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current.click()}
                                                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition"
                                            >
                                                Pilih Foto Baru
                                            </button>
                                            <span className="text-[11px] text-slate-500">Maks 3MB (JPG, PNG, WEBP)</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Operational & Contact */}
                                <div className="md:col-span-6 bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 space-y-6 shadow-sm">
                                    <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-slate-600" />
                                        Jadwal Operasional &amp; Penanggung Jawab
                                    </h2>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Jadwal Layanan / Jam Operasional
                                            </label>
                                            <input
                                                type="text"
                                                value={data.jadwal_layanan}
                                                onChange={(e) => setData('jadwal_layanan', e.target.value)}
                                                placeholder="Contoh: Senin - Jumat, 08.00 - 16.00 WIB"
                                                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                                                Email / Kontak Layanan Lab
                                            </label>
                                            <input
                                                type="text"
                                                value={data.kontak_layanan}
                                                onChange={(e) => setData('kontak_layanan', e.target.value)}
                                                placeholder="Contoh: kpi@iaipibandung.ac.id"
                                                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Repeater: Spesifikasi Peralatan */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 space-y-6 shadow-sm">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
                                    <div>
                                        <h2 className="text-base font-bold text-slate-900">Daftar Perangkat Studio &amp; Spesifikasi Teknis</h2>
                                        <p className="text-slate-500 text-xs mt-0.5">Alat dan hardware utama yang tersedia di modul laboratorium ini.</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addAlat}
                                        className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold transition"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>Tambah Alat</span>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {data.spesifikasi_alat?.map((item, idx) => (
                                        <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative group">
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="w-20">
                                                    <input
                                                        type="text"
                                                        value={item.nomor}
                                                        onChange={(e) => updateAlat(idx, 'nomor', e.target.value)}
                                                        placeholder="No"
                                                        className="w-full px-2 py-1.5 text-xs rounded-lg border border-slate-300 font-mono font-bold text-center"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        value={item.nama}
                                                        onChange={(e) => updateAlat(idx, 'nama', e.target.value)}
                                                        placeholder="Nama Peralatan..."
                                                        className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeAlat(idx)}
                                                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <textarea
                                                rows={2}
                                                value={item.deskripsi}
                                                onChange={(e) => updateAlat(idx, 'deskripsi', e.target.value)}
                                                placeholder="Deskripsi dan spesifikasi fungsi perangkat..."
                                                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Repeater: Program Output & Karya */}
                            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 space-y-6 shadow-sm">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 gap-2">
                                    <div>
                                        <h2 className="text-base font-bold text-slate-900">Program Unggulan &amp; Output Karya Mahasiswa</h2>
                                        <p className="text-slate-500 text-xs mt-0.5">Karya siaran, podcast, film, artikel, atau produk visual yang dihasilkan dari lab ini.</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={addOutput}
                                        className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold transition"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                        <span>Tambah Karya</span>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {data.program_output?.map((item, idx) => (
                                        <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3 relative group">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                                <div className="w-full sm:w-40">
                                                    <input
                                                        type="text"
                                                        value={item.kategori}
                                                        onChange={(e) => updateOutput(idx, 'kategori', e.target.value)}
                                                        placeholder="Kategori..."
                                                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 font-medium"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        value={item.judul}
                                                        onChange={(e) => updateOutput(idx, 'judul', e.target.value)}
                                                        placeholder="Judul Program / Karya..."
                                                        className="w-full px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeOutput(idx)}
                                                    className="self-end sm:self-auto p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <textarea
                                                rows={2}
                                                value={item.deskripsi}
                                                onChange={(e) => updateOutput(idx, 'deskripsi', e.target.value)}
                                                placeholder="Sinopsis atau ringkasan format karya mahasiswa..."
                                                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Fixed/Submit Bar */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-md transition disabled:opacity-50"
                                >
                                    <Save className="w-4 h-4" />
                                    <span>{processing ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
