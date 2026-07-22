import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import { Settings, Save, Link2, Plus, Pencil, Trash2, X, ExternalLink } from 'lucide-react';

export default function Index({ auth, setting, umum, quickAccesses = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        pmb_gelombang_text: setting?.pmb_gelombang_text || '',
        pmb_hotline_number: setting?.pmb_hotline_number || '',
        pmb_hotline_text: setting?.pmb_hotline_text || '',
        pmb_link: setting?.pmb_link || '',
        hero_bg: null,
        hero_title: setting?.hero_title || '',
        hero_subtitle: setting?.hero_subtitle || '',
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
    const quickForm = useForm({
        nama: '',
        url: '',
        deskripsi: '',
        ikon: 'fa-laptop-code',
        urutan: 1,
        is_active: true,
    });

    const openQuickModal = (item = null) => {
        quickForm.clearErrors();
        if (item) {
            setEditingQuick(item);
            quickForm.setData({
                nama: item.nama || '',
                url: item.url || '',
                deskripsi: item.deskripsi || '',
                ikon: item.ikon || 'fa-link',
                urutan: item.urutan || 1,
                is_active: item.is_active ?? true,
            });
        } else {
            setEditingQuick(null);
            quickForm.setData({
                nama: '',
                url: '',
                deskripsi: '',
                ikon: 'fa-laptop-code',
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
                onSuccess: () => {
                    setQuickModalOpen(false);
                    quickForm.reset();
                },
                preserveScroll: true,
            });
        } else {
            quickForm.post(route('admin.quick-access.store'), {
                onSuccess: () => {
                    setQuickModalOpen(false);
                    quickForm.reset();
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
                                                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-lg shrink-0">
                                                    <i className={`fa-solid ${item.ikon || 'fa-link'}`}></i>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-bold text-slate-800 text-sm">{item.nama}</h4>
                                                        <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">#{item.urutan}</span>
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
                                {quickForm.errors.nama && <p className="text-red-500 text-xs mt-1">{quickForm.errors.nama}</p>}
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
                                {quickForm.errors.url && <p className="text-red-500 text-xs mt-1">{quickForm.errors.url}</p>}
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
                                {quickForm.errors.deskripsi && <p className="text-red-500 text-xs mt-1">{quickForm.errors.deskripsi}</p>}
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
        </AuthenticatedLayout>
    );
}
