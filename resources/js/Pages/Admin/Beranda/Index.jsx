import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import { Settings, Save } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Index({ auth, setting }) {
    const { data, setData, post, processing, errors } = useForm({
        pmb_gelombang_text: setting.pmb_gelombang_text || '',
        pmb_hotline_number: setting.pmb_hotline_number || '',
        pmb_hotline_text: setting.pmb_hotline_text || '',
        pmb_link: setting.pmb_link || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.beranda.update'), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Pengaturan beranda berhasil diperbarui.',
                    timer: 2000,
                    showConfirmButton: false
                });
            },
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
