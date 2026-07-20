import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import { Settings, Save } from 'lucide-react';

export default function Index({ auth, setting, umum }) {
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
                                            <div className="mb-3">
                                                <img src={bgPreview} alt="Preview" className="w-full h-48 object-cover rounded-md shadow-sm border border-slate-200" />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            onChange={handleBgChange}
                                            accept="image/*"
                                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition"
                                        />
                                        {errors.hero_bg && <p className="text-red-500 text-sm mt-1">{errors.hero_bg}</p>}
                                    </div>
                                </div>

                                <div className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    <h4 className="font-semibold text-slate-800">Informasi PMB</h4>
                                    <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Teks Informasi Gelombang PMB</label>
                                    <input
                                        type="text"
                                        value={data.pmb_gelombang_text}
                                        onChange={e => setData('pmb_gelombang_text', e.target.value)}
                                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                        placeholder="Contoh: Gelombang I: Ditutup 30 Agustus 2026"
                                    />
                                    {errors.pmb_gelombang_text && <p className="text-red-500 text-sm mt-1">{errors.pmb_gelombang_text}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Teks Hotline PMB (Tampil di layar)</label>
                                    <input
                                        type="text"
                                        value={data.pmb_hotline_text}
                                        onChange={e => setData('pmb_hotline_text', e.target.value)}
                                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                        placeholder="Contoh: +62 821-1611-6133 (Admin)"
                                    />
                                    {errors.pmb_hotline_text && <p className="text-red-500 text-sm mt-1">{errors.pmb_hotline_text}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nomor WA Admin PMB (Untuk tombol WhatsApp)</label>
                                    <p className="text-xs text-slate-500 mb-2">Gunakan format 62 tanpa + atau 0. Contoh: 6282116116133</p>
                                    <input
                                        type="text"
                                        value={data.pmb_hotline_number}
                                        onChange={e => setData('pmb_hotline_number', e.target.value)}
                                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                        placeholder="62821..."
                                    />
                                    {errors.pmb_hotline_number && <p className="text-red-500 text-sm mt-1">{errors.pmb_hotline_number}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Link Pendaftaran (SIAKAD/SPMB)</label>
                                    <input
                                        type="url"
                                        value={data.pmb_link}
                                        onChange={e => setData('pmb_link', e.target.value)}
                                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                                        placeholder="https://..."
                                    />
                                    {errors.pmb_link && <p className="text-red-500 text-sm mt-1">{errors.pmb_link}</p>}
                                </div>
                                </div>

                                <hr className="my-6 border-slate-200" />
                                
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
        </AuthenticatedLayout>
    );
}
