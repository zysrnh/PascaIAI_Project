import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import { Settings, Save, Link2, Plus, Pencil, Trash2, X, ExternalLink, Image as ImageIcon, Layers } from 'lucide-react';

export default function Index({ auth, setting, umum, quickAccesses = [], heroSliders = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        pmb_gelombang_text: setting?.pmb_gelombang_text || '',
        pmb_hotline_number: setting?.pmb_hotline_number || '',
        pmb_hotline_text: setting?.pmb_hotline_text || '',
        pmb_link: setting?.pmb_link || '',
        hero_bg: null,
        hero_title: setting?.hero_title || '',
        hero_subtitle: setting?.hero_subtitle || '',
        hero_btn_1_text: setting?.hero_btn_1_text ?? 'Status Akreditasi',
        hero_btn_1_url: setting?.hero_btn_1_url ?? '/profil/akreditasi',
        hero_btn_2_text: setting?.hero_btn_2_text ?? 'Survei Mutu',
        hero_btn_2_url: setting?.hero_btn_2_url ?? '#survei',
        stat_1_val: setting?.stat_1_val ?? '24',
        stat_1_label: setting?.stat_1_label ?? 'STANDAR MUTU',
        stat_2_val: setting?.stat_2_val ?? '3',
        stat_2_label: setting?.stat_2_label ?? 'PRODI TERAKREDITASI',
        stat_3_val: setting?.stat_3_val ?? '3',
        stat_3_label: setting?.stat_3_label ?? 'DOSEN & PENGAJAR',
        stat_4_val: setting?.stat_4_val ?? '25',
        stat_4_label: setting?.stat_4_label ?? 'PUBLIKASI & RISET',
        stat_5_val: setting?.stat_5_val ?? '94.8%',
        stat_5_label: setting?.stat_5_label ?? 'INDEKS KEPUASAN',
        pilar_1_title: setting?.pilar_1_title || '',
        pilar_1_desc: setting?.pilar_1_desc || '',
        pilar_2_title: setting?.pilar_2_title || '',
        pilar_2_desc: setting?.pilar_2_desc || '',
        pilar_3_title: setting?.pilar_3_title || '',
        pilar_3_desc: setting?.pilar_3_desc || '',
        pilar_4_title: setting?.pilar_4_title || '',
        pilar_4_desc: setting?.pilar_4_desc || '',
        email: umum?.email || '',
        telepon: umum?.telepon || '',
        alamat: umum?.alamat || '',
        facebook_url: umum?.facebook_url || '',
        instagram_url: umum?.instagram_url || '',
        youtube_url: umum?.youtube_url || '',
        twitter_url: umum?.twitter_url || '',
    });

    const [quickModalOpen, setQuickModalOpen] = useState(false);
    const [editingQuick, setEditingQuick] = useState(null);
    const [quickLogoPreview, setQuickLogoPreview] = useState(null);
    const quickForm = useForm({
        nama: '',
        url: '',
        deskripsi: '',
        ikon: 'fa-laptop-code',
        logo: null,
        tampilkan_nama: true,
        urutan: 1,
        is_active: true,
    });

    // Slider State
    const [sliderModalOpen, setSliderModalOpen] = useState(false);
    const [editingSlider, setEditingSlider] = useState(null);
    const [sliderImgPreview, setSliderImgPreview] = useState(null);
    const sliderForm = useForm({
        judul: '',
        subjudul: '',
        gambar: null,
        badge_text: '',
        text_button_1: '',
        link_button_1: '',
        text_button_2: '',
        link_button_2: '',
        urutan: 1,
        is_active: true,
    });

    const openSliderModal = (item = null) => {
        sliderForm.clearErrors();
        if (item) {
            setEditingSlider(item);
            setSliderImgPreview(item.gambar ? '/storage/' + item.gambar : null);
            sliderForm.setData({
                judul: item.judul || '',
                subjudul: item.subjudul || '',
                gambar: null,
                badge_text: item.badge_text || '',
                text_button_1: item.text_button_1 || '',
                link_button_1: item.link_button_1 || '',
                text_button_2: item.text_button_2 || '',
                link_button_2: item.link_button_2 || '',
                urutan: item.urutan || 1,
                is_active: item.is_active ?? true,
            });
        } else {
            setEditingSlider(null);
            setSliderImgPreview(null);
            sliderForm.setData({
                judul: '',
                subjudul: '',
                gambar: null,
                badge_text: 'Penerimaan Mahasiswa Baru Gelombang 1 Dibuka!',
                text_button_1: 'Jelajahi Program Studi',
                link_button_1: '#program',
                text_button_2: 'Prosedur Pendaftaran',
                link_button_2: '#pendaftaran',
                urutan: (heroSliders?.length || 0) + 1,
                is_active: true,
            });
        }
        setSliderModalOpen(true);
    };

    const handleSliderSubmit = (e) => {
        e.preventDefault();
        if (editingSlider) {
            sliderForm.post(route('admin.beranda.slider.update', editingSlider.id), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    setSliderModalOpen(false);
                    sliderForm.reset();
                }
            });
        } else {
            sliderForm.post(route('admin.beranda.slider.store'), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    setSliderModalOpen(false);
                    sliderForm.reset();
                }
            });
        }
    };

    const handleSliderDelete = (id) => {
        if (confirm('Yakin ingin menghapus Slide Banner ini?')) {
            router.delete(route('admin.beranda.slider.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const openQuickModal = (item = null) => {
        if (item) {
            setEditingQuick(item);
            setQuickLogoPreview(item.logo ? '/storage/' + item.logo : null);
            quickForm.setData({
                nama: item.nama || '',
                url: item.url || '',
                deskripsi: item.deskripsi || '',
                ikon: item.ikon || 'fa-link',
                logo: null,
                tampilkan_nama: item.tampilkan_nama !== undefined ? Boolean(item.tampilkan_nama) : true,
                urutan: item.urutan || 1,
                is_active: item.is_active ?? true,
            });
        } else {
            setEditingQuick(null);
            setQuickLogoPreview(null);
            quickForm.setData({
                nama: '',
                url: '',
                deskripsi: '',
                ikon: 'fa-laptop-code',
                logo: null,
                tampilkan_nama: true,
                urutan: (quickAccesses?.length || 0) + 1,
                is_active: true,
            });
        }
        setQuickModalOpen(true);
    };

    const handleQuickSubmit = (e) => {
        e.preventDefault();

        if (editingQuick) {
            quickForm.post(route('admin.quick-access.update', editingQuick.id), {
                forceFormData: true,
                onSuccess: () => {
                    setQuickModalOpen(false);
                    quickForm.reset();
                    setQuickLogoPreview(null);
                },
                preserveScroll: true,
            });
        } else {
            quickForm.post(route('admin.quick-access.store'), {
                forceFormData: true,
                onSuccess: () => {
                    setQuickModalOpen(false);
                    quickForm.reset();
                    setQuickLogoPreview(null);
                },
                preserveScroll: true,
            });
        }
    };

    const handleQuickDelete = (id) => {
        if (confirm('Yakin ingin menghapus item Akses Cepat ini?')) {
            router.delete(route('admin.quick-access.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    const [bgPreview, setBgPreview] = React.useState(
        setting?.hero_bg ? '/storage/' + setting.hero_bg : null
    );

    const handleBgChange = (e) => {
        const file = e.target.files[0];
        setData('hero_bg', file);
        if (file) {
            setBgPreview(URL.createObjectURL(file));
        } else {
            setBgPreview(setting?.hero_bg ? '/storage/' + setting.hero_bg : null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.beranda.update'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Pengaturan Beranda & PMB berhasil disimpan.',
                    timer: 2000,
                    showConfirmButton: false,
                });
            },
            onError: () => {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: 'Periksa kembali formulir Anda.',
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-emerald-50 leading-tight">Pengaturan Beranda & PMB</h2>}
        >
            <Head title="Pengaturan Beranda - Admin Pascasarjana" />

            <div className="flex h-[calc(100vh-4rem)]">
                <Sidebar />
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
                    <div className="max-w-4xl mx-auto space-y-6">

                        {/* ===== KELOLA HERO SLIDERS CAROUSEL ===== */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-amber-100 text-amber-700 rounded-lg">
                                        <Layers className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Kelola Slide Banner (Hero Carousel)</h3>
                                        <p className="text-sm text-slate-500">Atur beberapa gambar background slider & teks promosi di bagian paling atas Beranda.</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => openSliderModal()}
                                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-lg transition shadow-sm self-start sm:self-auto"
                                >
                                    <Plus className="w-4 h-4" />
                                    Tambah Slide Banner
                                </button>
                            </div>

                            {heroSliders && heroSliders.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {heroSliders.map((slide) => (
                                        <div key={slide.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition">
                                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                                <div className="w-24 h-16 rounded-lg bg-slate-200 overflow-hidden shrink-0 border border-slate-300 relative">
                                                    <img src={`/storage/${slide.gambar}`} alt={slide.judul || 'Slide'} className="w-full h-full object-cover" />
                                                    {!slide.is_active && (
                                                        <span className="absolute inset-0 bg-slate-900/60 text-white text-[10px] font-bold flex items-center justify-center">Non-Aktif</span>
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                                        <h4 className="font-bold text-slate-800 text-sm truncate">{slide.judul || 'Tanpa Judul'}</h4>
                                                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">Urutan #{slide.urutan}</span>
                                                        {slide.badge_text && (
                                                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full truncate max-w-[200px]">{slide.badge_text}</span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-slate-500 line-clamp-1">{slide.subjudul || 'Tidak ada deskripsi'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                                                <button
                                                    onClick={() => openSliderModal(slide)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-700 bg-white hover:bg-blue-50 border border-slate-200 rounded-lg transition"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" /> Edit
                                                </button>
                                                <button
                                                    onClick={() => handleSliderDelete(slide.id)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 bg-white border border-slate-200 rounded-lg transition"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" /> Hapus
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                                    <p className="text-sm text-slate-500 mb-2">Belum ada Slide Banner khusus. Banner default statis akan digunakan.</p>
                                    <button
                                        type="button"
                                        onClick={() => openSliderModal()}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-md transition"
                                    >
                                        <Plus className="w-3.5 h-3.5" /> Tambah Slide Pertama
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                                        <Link2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Kelola Akses Cepat (Quick Access)</h3>
                                        <p className="text-sm text-slate-500">Tautan cepat di halaman utama (Beranda) di atas Kata Sambutan.</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => openQuickModal()}
                                    className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg transition shadow-sm self-start sm:self-auto"
                                >
                                    <Plus className="w-4 h-4" />
                                    Tambah Akses Cepat
                                </button>
                            </div>

                            {quickAccesses && quickAccesses.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {quickAccesses.map((item) => (
                                        <div key={item.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 flex items-start justify-between gap-3 transition">
                                            <div className="flex items-start gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 p-1.5 flex items-center justify-center shrink-0 shadow-xs">
                                                    {item.logo ? (
                                                        <img src={`/storage/${item.logo}`} alt={item.nama} className="max-h-full max-w-full object-contain" />
                                                    ) : (
                                                        <div className="w-9 h-9 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg">
                                                            <i className={`fa-solid ${item.ikon || 'fa-link'}`}></i>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h4 className="font-bold text-slate-800 text-sm">{item.nama}</h4>
                                                        <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">#{item.urutan}</span>
                                                        {item.tampilkan_nama === false && (
                                                            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium">Hanya Logo</span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-slate-500 mb-1">{item.deskripsi || 'Tidak ada deskripsi'}</p>
                                                    <a href={item.url} target="_blank" rel="noreferrer" className="text-[11px] text-emerald-600 font-semibold hover:underline flex items-center gap-1">
                                                        {item.url} <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 shrink-0">
                                                <button
                                                    onClick={() => openQuickModal(item)}
                                                    className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
                                                    title="Edit Akses Cepat"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleQuickDelete(item.id)}
                                                    className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition"
                                                    title="Hapus Akses Cepat"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-300">
                                    <p className="text-sm text-slate-500">Belum ada item Akses Cepat. Klik "Tambah Akses Cepat" untuk menambahkan.</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                    <Settings className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Pengaturan Teks & Kontak PMB</h3>
                                    <p className="text-sm text-slate-500">Konfigurasi ini akan ditampilkan di halaman utama (Beranda) website.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    <h4 className="font-semibold text-slate-800">Judul & Subjudul Beranda (Hero Section)</h4>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Judul Utama</label>
                                        <input
                                            type="text"
                                            value={data.hero_title}
                                            onChange={e => setData('hero_title', e.target.value)}
                                            className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                        />
                                        {errors.hero_title && <p className="text-red-500 text-sm mt-1">{errors.hero_title}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Subjudul (Deskripsi Singkat)</label>
                                        <textarea
                                            value={data.hero_subtitle}
                                            onChange={e => setData('hero_subtitle', e.target.value)}
                                            className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                            rows="3"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-2">Background Image (Hero Section)</label>
                                        {bgPreview && (
                                            <div className="mb-2">
                                                <img src={bgPreview} alt="Hero Preview" className="h-32 w-auto object-cover rounded border" />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            onChange={handleBgChange}
                                            accept="image/*"
                                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                        />
                                        {errors.hero_bg && <p className="text-red-500 text-sm mt-1">{errors.hero_bg}</p>}
                                    </div>
                                </div>

                                {/* Dua Tombol Hero (CTA) */}
                                <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    <h4 className="font-semibold text-slate-800">Dua Tombol Aksi Banner Hero (CTA)</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-2.5">
                                            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Tombol 1 (Kiri)</span>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-600 mb-1">Teks Tombol</label>
                                                <input
                                                    type="text"
                                                    value={data.hero_btn_1_text}
                                                    onChange={e => setData('hero_btn_1_text', e.target.value)}
                                                    placeholder="Status Akreditasi"
                                                    className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-600 mb-1">Link / URL Tujuan</label>
                                                <input
                                                    type="text"
                                                    value={data.hero_btn_1_url}
                                                    onChange={e => setData('hero_btn_1_url', e.target.value)}
                                                    placeholder="/profil/akreditasi"
                                                    className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-2.5">
                                            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Tombol 2 (Kanan)</span>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-600 mb-1">Teks Tombol</label>
                                                <input
                                                    type="text"
                                                    value={data.hero_btn_2_text}
                                                    onChange={e => setData('hero_btn_2_text', e.target.value)}
                                                    placeholder="Survei Mutu"
                                                    className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-slate-600 mb-1">Link / URL Tujuan</label>
                                                <input
                                                    type="text"
                                                    value={data.hero_btn_2_url}
                                                    onChange={e => setData('hero_btn_2_url', e.target.value)}
                                                    placeholder="#survei"
                                                    className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 5 Card Statistik Ringkasan */}
                                <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                        <h4 className="font-semibold text-slate-800">5 Card Statistik Ringkasan Beranda</h4>
                                        <span className="text-xs text-slate-500">Angka & label yang tampil tepat di bawah banner hero</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {/* Stat 1 */}
                                        <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                                            <span className="text-xs font-bold text-emerald-700 block">Card 1 (Standar Mutu)</span>
                                            <div>
                                                <label className="block text-[11px] text-slate-500 mb-0.5">Angka / Nilai</label>
                                                <input
                                                    type="text"
                                                    value={data.stat_1_val}
                                                    onChange={e => setData('stat_1_val', e.target.value)}
                                                    placeholder="24"
                                                    className="w-full rounded-md border-slate-300 shadow-sm text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] text-slate-500 mb-0.5">Label Teks</label>
                                                <input
                                                    type="text"
                                                    value={data.stat_1_label}
                                                    onChange={e => setData('stat_1_label', e.target.value)}
                                                    placeholder="STANDAR MUTU"
                                                    className="w-full rounded-md border-slate-300 shadow-sm text-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* Stat 2 */}
                                        <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                                            <span className="text-xs font-bold text-amber-600 block">Card 2 (Program Studi)</span>
                                            <div>
                                                <label className="block text-[11px] text-slate-500 mb-0.5">Angka / Nilai</label>
                                                <input
                                                    type="text"
                                                    value={data.stat_2_val}
                                                    onChange={e => setData('stat_2_val', e.target.value)}
                                                    placeholder="3"
                                                    className="w-full rounded-md border-slate-300 shadow-sm text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] text-slate-500 mb-0.5">Label Teks</label>
                                                <input
                                                    type="text"
                                                    value={data.stat_2_label}
                                                    onChange={e => setData('stat_2_label', e.target.value)}
                                                    placeholder="PRODI TERAKREDITASI"
                                                    className="w-full rounded-md border-slate-300 shadow-sm text-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* Stat 3 */}
                                        <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                                            <span className="text-xs font-bold text-blue-700 block">Card 3 (Dosen & Pengajar)</span>
                                            <div>
                                                <label className="block text-[11px] text-slate-500 mb-0.5">Angka / Nilai</label>
                                                <input
                                                    type="text"
                                                    value={data.stat_3_val}
                                                    onChange={e => setData('stat_3_val', e.target.value)}
                                                    placeholder="3"
                                                    className="w-full rounded-md border-slate-300 shadow-sm text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] text-slate-500 mb-0.5">Label Teks</label>
                                                <input
                                                    type="text"
                                                    value={data.stat_3_label}
                                                    onChange={e => setData('stat_3_label', e.target.value)}
                                                    placeholder="DOSEN & PENGAJAR"
                                                    className="w-full rounded-md border-slate-300 shadow-sm text-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* Stat 4 */}
                                        <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                                            <span className="text-xs font-bold text-purple-700 block">Card 4 (Publikasi & Riset)</span>
                                            <div>
                                                <label className="block text-[11px] text-slate-500 mb-0.5">Angka / Nilai</label>
                                                <input
                                                    type="text"
                                                    value={data.stat_4_val}
                                                    onChange={e => setData('stat_4_val', e.target.value)}
                                                    placeholder="25"
                                                    className="w-full rounded-md border-slate-300 shadow-sm text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] text-slate-500 mb-0.5">Label Teks</label>
                                                <input
                                                    type="text"
                                                    value={data.stat_4_label}
                                                    onChange={e => setData('stat_4_label', e.target.value)}
                                                    placeholder="PUBLIKASI & RISET"
                                                    className="w-full rounded-md border-slate-300 shadow-sm text-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* Stat 5 */}
                                        <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                                            <span className="text-xs font-bold text-indigo-700 block">Card 5 (Indeks Kepuasan)</span>
                                            <div>
                                                <label className="block text-[11px] text-slate-500 mb-0.5">Angka / Nilai</label>
                                                <input
                                                    type="text"
                                                    value={data.stat_5_val}
                                                    onChange={e => setData('stat_5_val', e.target.value)}
                                                    placeholder="94.8%"
                                                    className="w-full rounded-md border-slate-300 shadow-sm text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[11px] text-slate-500 mb-0.5">Label Teks</label>
                                                <input
                                                    type="text"
                                                    value={data.stat_5_label}
                                                    onChange={e => setData('stat_5_label', e.target.value)}
                                                    placeholder="INDEKS KEPUASAN"
                                                    className="w-full rounded-md border-slate-300 shadow-sm text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                                        <Settings className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">4 Pilar Keunggulan</h3>
                                        <p className="text-sm text-slate-500">Konfigurasi ini akan ditampilkan di bagian Mengapa Kami.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Pilar 1 */}
                                    <div className="space-y-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                        <h4 className="font-semibold text-emerald-800">Pilar 1</h4>
                                        <input
                                            type="text"
                                            value={data.pilar_1_title}
                                            onChange={e => setData('pilar_1_title', e.target.value)}
                                            className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                                            placeholder="Judul Pilar 1"
                                        />
                                        <textarea
                                            value={data.pilar_1_desc}
                                            onChange={e => setData('pilar_1_desc', e.target.value)}
                                            className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                                            rows="2"
                                            placeholder="Deskripsi Pilar 1"
                                        />
                                    </div>

                                    {/* Pilar 2 */}
                                    <div className="space-y-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                        <h4 className="font-semibold text-emerald-800">Pilar 2</h4>
                                        <input
                                            type="text"
                                            value={data.pilar_2_title}
                                            onChange={e => setData('pilar_2_title', e.target.value)}
                                            className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                                            placeholder="Judul Pilar 2"
                                        />
                                        <textarea
                                            value={data.pilar_2_desc}
                                            onChange={e => setData('pilar_2_desc', e.target.value)}
                                            className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                                            rows="2"
                                            placeholder="Deskripsi Pilar 2"
                                        />
                                    </div>

                                    {/* Pilar 3 */}
                                    <div className="space-y-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                        <h4 className="font-semibold text-emerald-800">Pilar 3</h4>
                                        <input
                                            type="text"
                                            value={data.pilar_3_title}
                                            onChange={e => setData('pilar_3_title', e.target.value)}
                                            className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                                            placeholder="Judul Pilar 3"
                                        />
                                        <textarea
                                            value={data.pilar_3_desc}
                                            onChange={e => setData('pilar_3_desc', e.target.value)}
                                            className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                                            rows="2"
                                            placeholder="Deskripsi Pilar 3"
                                        />
                                    </div>

                                    {/* Pilar 4 */}
                                    <div className="space-y-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                        <h4 className="font-semibold text-emerald-800">Pilar 4</h4>
                                        <input
                                            type="text"
                                            value={data.pilar_4_title}
                                            onChange={e => setData('pilar_4_title', e.target.value)}
                                            className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                                            placeholder="Judul Pilar 4"
                                        />
                                        <textarea
                                            value={data.pilar_4_desc}
                                            onChange={e => setData('pilar_4_desc', e.target.value)}
                                            className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-sm"
                                            rows="2"
                                            placeholder="Deskripsi Pilar 4"
                                        />
                                    </div>
                                </div>

                                <hr className="my-6 border-slate-200" />

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                                        <Settings className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-800">Kontak & Media Sosial Kampus</h3>
                                        <p className="text-sm text-slate-500">Konfigurasi ini akan ditampilkan di header atas dan footer website.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Kampus</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="contoh@domain.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Telepon Utama (Footer)</label>
                                        <input
                                            type="text"
                                            value={data.telepon}
                                            onChange={e => setData('telepon', e.target.value)}
                                            className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="(022) 123456"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Lengkap</label>
                                    <textarea
                                        value={data.alamat}
                                        onChange={e => setData('alamat', e.target.value)}
                                        rows="2"
                                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        placeholder="Jl. Raya Kampus..."
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Link Facebook</label>
                                        <input type="url" value={data.facebook_url} onChange={e => setData('facebook_url', e.target.value)} className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="https://facebook.com/..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Link Instagram</label>
                                        <input type="url" value={data.instagram_url} onChange={e => setData('instagram_url', e.target.value)} className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="https://instagram.com/..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Link YouTube</label>
                                        <input type="url" value={data.youtube_url} onChange={e => setData('youtube_url', e.target.value)} className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="https://youtube.com/..." />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Link Twitter / X</label>
                                        <input type="url" value={data.twitter_url} onChange={e => setData('twitter_url', e.target.value)} className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" placeholder="https://twitter.com/..." />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 border-t border-slate-100">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors shadow-sm disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4" />
                                        Simpan Pengaturan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Access Modal */}
            {quickModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 space-y-4">
                        <div className="flex justify-between items-center border-b pb-3">
                            <h3 className="text-lg font-bold text-slate-800">
                                {editingQuick ? 'Edit Akses Cepat' : 'Tambah Akses Cepat Baru'}
                            </h3>
                            <button onClick={() => setQuickModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleQuickSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nama / Judul Akses Cepat *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: SIAKAD, PMB Online, E-Library..."
                                    value={quickForm.data.nama}
                                    onChange={e => quickForm.setData('nama', e.target.value)}
                                    className="w-full rounded-md border-slate-300 shadow-sm text-sm focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Target URL / Link *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: https://siakad.iaipibandung.ac.id atau /akademik/kalender"
                                    value={quickForm.data.url}
                                    onChange={e => quickForm.setData('url', e.target.value)}
                                    className="w-full rounded-md border-slate-300 shadow-sm text-sm focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Singkat (Opsional)</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Portal layanan akademik mahasiswa..."
                                    value={quickForm.data.deskripsi}
                                    onChange={e => quickForm.setData('deskripsi', e.target.value)}
                                    className="w-full rounded-md border-slate-300 shadow-sm text-sm focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Logo Website / Gambar (Opsional)
                                </label>
                                {quickLogoPreview && (
                                    <div className="mb-2 p-2 bg-slate-50 rounded-lg border border-slate-200 inline-block">
                                        <img src={quickLogoPreview} alt="Logo Preview" className="h-12 w-auto object-contain" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        quickForm.setData('logo', file);
                                        if (file) setQuickLogoPreview(URL.createObjectURL(file));
                                    }}
                                    className="w-full text-sm text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                />
                                <p className="text-[11px] text-slate-500 mt-1">Upload gambar/logo web (PNG transparan lebih rapi). Jika tidak ada logo gambar, sistem akan memakai Ikon FontAwesome di bawah.</p>
                            </div>

                            <div className="flex items-center gap-2 pt-1 pb-1">
                                <input
                                    type="checkbox"
                                    id="tampilkan_nama"
                                    checked={quickForm.data.tampilkan_nama}
                                    onChange={e => quickForm.setData('tampilkan_nama', e.target.checked)}
                                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4 cursor-pointer"
                                />
                                <label htmlFor="tampilkan_nama" className="text-sm font-medium text-slate-700 select-none cursor-pointer">
                                    Tampilkan Nama Web di Halaman Depan
                                </label>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Ikon FontAwesome</label>
                                    <select
                                        value={quickForm.data.ikon}
                                        onChange={e => quickForm.setData('ikon', e.target.value)}
                                        className="w-full rounded-md border-slate-300 shadow-sm text-sm focus:ring-emerald-500 focus:border-emerald-500"
                                    >
                                        <option value="fa-laptop-code">💻 fa-laptop-code (SIAKAD/Portal)</option>
                                        <option value="fa-user-graduate">🎓 fa-user-graduate (PMB/Wisuda)</option>
                                        <option value="fa-book-bookmark">📚 fa-book-bookmark (Jurnal/Perpus)</option>
                                        <option value="fa-calendar-days">📅 fa-calendar-days (Kalender)</option>
                                        <option value="fa-newspaper">📰 fa-newspaper (Berita)</option>
                                        <option value="fa-building-columns">🏛️ fa-building-columns (Kampus)</option>
                                        <option value="fa-file-lines">📄 fa-file-lines (Dokumen)</option>
                                        <option value="fa-link">🔗 fa-link (Tautan Umum)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Urutan Tampil</label>
                                    <input
                                        type="number"
                                        value={quickForm.data.urutan}
                                        onChange={e => quickForm.setData('urutan', e.target.value)}
                                        className="w-full rounded-md border-slate-300 shadow-sm text-sm focus:ring-emerald-500 focus:border-emerald-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => setQuickModalOpen(false)}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={quickForm.processing}
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm"
                                >
                                    {editingQuick ? 'Simpan Perubahan' : 'Tambah Akses Cepat'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Hero Slider Modal */}
            {sliderModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6 space-y-4 my-8">
                        <div className="flex justify-between items-center border-b pb-3">
                            <div className="flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-amber-600" />
                                <h3 className="text-lg font-bold text-slate-800">
                                    {editingSlider ? 'Edit Slide Banner' : 'Tambah Slide Banner Baru'}
                                </h3>
                            </div>
                            <button onClick={() => setSliderModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSliderSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Gambar Background Slide {!editingSlider && '*'}
                                </label>
                                {sliderImgPreview && (
                                    <div className="mb-2 relative rounded-lg overflow-hidden border border-slate-200 bg-slate-100 max-h-48">
                                        <img src={sliderImgPreview} alt="Preview" className="w-full h-44 object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    required={!editingSlider}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        sliderForm.setData('gambar', file);
                                        if (file) setSliderImgPreview(URL.createObjectURL(file));
                                    }}
                                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                                />
                                {sliderForm.errors.gambar && <p className="text-red-500 text-xs mt-1">{sliderForm.errors.gambar}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Teks Badge (Contoh: Banner Promosi PMB)</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Penerimaan Mahasiswa Baru Gelombang 1 Dibuka!"
                                    value={sliderForm.data.badge_text}
                                    onChange={e => sliderForm.setData('badge_text', e.target.value)}
                                    className="w-full rounded-md border-slate-300 shadow-sm text-sm focus:ring-amber-500 focus:border-amber-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Judul Utama Slide</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Membentuk Akademisi Islami Unggul & Berintegritas"
                                    value={sliderForm.data.judul}
                                    onChange={e => sliderForm.setData('judul', e.target.value)}
                                    className="w-full rounded-md border-slate-300 shadow-sm text-sm focus:ring-amber-500 focus:border-amber-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Subjudul / Deskripsi Slide</label>
                                <textarea
                                    rows="2"
                                    placeholder="Deskripsi singkat slide..."
                                    value={sliderForm.data.subjudul}
                                    onChange={e => sliderForm.setData('subjudul', e.target.value)}
                                    className="w-full rounded-md border-slate-300 shadow-sm text-sm focus:ring-amber-500 focus:border-amber-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tombol Utama 1 (Teks & Link)</label>
                                    <input
                                        type="text"
                                        placeholder="Teks Tombol 1 (misal: Jelajahi Program)"
                                        value={sliderForm.data.text_button_1}
                                        onChange={e => sliderForm.setData('text_button_1', e.target.value)}
                                        className="w-full rounded-md border-slate-300 shadow-sm text-xs mb-2 focus:ring-amber-500 focus:border-amber-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="URL Link (misal: #program atau https://...)"
                                        value={sliderForm.data.link_button_1}
                                        onChange={e => sliderForm.setData('link_button_1', e.target.value)}
                                        className="w-full rounded-md border-slate-300 shadow-sm text-xs focus:ring-amber-500 focus:border-amber-500 font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tombol Kedua 2 (Teks & Link)</label>
                                    <input
                                        type="text"
                                        placeholder="Teks Tombol 2 (misal: Prosedur Pendaftaran)"
                                        value={sliderForm.data.text_button_2}
                                        onChange={e => sliderForm.setData('text_button_2', e.target.value)}
                                        className="w-full rounded-md border-slate-300 shadow-sm text-xs mb-2 focus:ring-amber-500 focus:border-amber-500"
                                    />
                                    <input
                                        type="text"
                                        placeholder="URL Link (misal: #pendaftaran atau https://...)"
                                        value={sliderForm.data.link_button_2}
                                        onChange={e => sliderForm.setData('link_button_2', e.target.value)}
                                        className="w-full rounded-md border-slate-300 shadow-sm text-xs focus:ring-amber-500 focus:border-amber-500 font-mono"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 items-center">
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Urutan Tampil</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={sliderForm.data.urutan}
                                        onChange={e => sliderForm.setData('urutan', parseInt(e.target.value) || 1)}
                                        className="w-full rounded-md border-slate-300 shadow-sm text-sm focus:ring-amber-500 focus:border-amber-500"
                                    />
                                </div>
                                <div className="pt-5">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={sliderForm.data.is_active}
                                            onChange={e => sliderForm.setData('is_active', e.target.checked)}
                                            className="rounded border-slate-300 text-amber-600 shadow-sm focus:ring-amber-500 h-4 w-4"
                                        />
                                        <span className="ml-2 text-sm font-semibold text-slate-700">Tampilkan Slide ini (Aktif)</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => setSliderModalOpen(false)}
                                    className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition text-sm"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={sliderForm.processing}
                                    className="px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition text-sm disabled:opacity-50"
                                >
                                    {editingSlider ? 'Simpan Perubahan' : 'Tambah Slide'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
