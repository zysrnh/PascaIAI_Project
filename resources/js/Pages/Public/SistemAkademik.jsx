import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import { ExternalLink, CheckCircle2, MonitorSmartphone, ShieldCheck, PlayCircle, Phone, ArrowRight } from 'lucide-react';

export default function SistemAkademik({ siakad }) {
    // Default fallback values if no data yet
    const data = siakad || {
        judul: 'Sistem Informasi Akademik (SIAKAD)',
        deskripsi_singkat: 'Gerbang utama menuju portal akademik terpadu Pascasarjana IAI Persis Bandung. Melalui SIAKAD, seluruh aktivitas administrasi akademik dapat diakses secara mudah dan terpusat.',
        fitur_list: [
            'Pengisian Kartu Rencana Studi (KRS) online',
            'Melihat Kartu Hasil Studi (KHS) dan Transkrip Nilai',
            'Mengecek Jadwal Kuliah personal',
            'Pengajuan surat administrasi akademik (Cuti, Aktif Kuliah, dll)',
            'Memantau progress bimbingan Tesis/Tugas Akhir',
        ],
        link_siakad: 'https://siakad.iaipibandung.ac.id',
        link_panduan: null,
        kontak_bantuan: '081234567890',
    };

    // Clean phone number for WhatsApp
    const waNumber = data.kontak_bantuan ? data.kontak_bantuan.replace(/[^0-9]/g, '') : null;

    return (
        <PublicLayout>
            <Head title="Sistem Informasi Akademik (SIAKAD) | Program Pascasarjana IAI Persis Bandung" />

            {/* Dark Minimalist Hero Section */}
            <div className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.18] tracking-tight mb-4">
                        Sistem Informasi <span className="font-serif italic font-normal text-emerald-300">Akademik</span>
                    </h1>
                    <p className="text-slate-300/90 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
                        {data.deskripsi_singkat || 'Portal terpadu layanan akademik mahasiswa dan dosen Program Pascasarjana IAI Persis Bandung.'}
                    </p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Akademik' },
                { label: 'Sistem Akademik' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFBFD] py-12 lg:py-16 border-b border-slate-200/80 min-h-[550px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        
                        {/* Left Column: Description & Features (7 cols) */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* Card: Apa itu SIAKAD */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
                                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3 tracking-tight">
                                    Mengenal Layanan SIAKAD
                                </h2>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                    {data.deskripsi_singkat}
                                </p>
                            </div>

                            {/* Card: Layanan & Fitur */}
                            {data.fitur_list && data.fitur_list.length > 0 && (
                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
                                    <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
                                        <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shrink-0">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                                                Fitur & Layanan Utama
                                            </h3>
                                            <p className="text-xs text-slate-500">
                                                Fasilitas administrasi akademik digital terintegrasi
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                        {data.fitur_list.map((fitur, idx) => (
                                            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-200/60">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                                <span className="text-xs sm:text-sm font-medium text-slate-700 leading-snug">
                                                    {fitur}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Portal CTA & Support (5 cols) */}
                        <div className="lg:col-span-5 space-y-6">
                            
                            {/* Main CTA Card */}
                            <div className="bg-slate-900 rounded-2xl p-7 sm:p-8 text-white shadow-sm border border-slate-800 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                                    <MonitorSmartphone className="w-40 h-40 text-white" />
                                </div>
                                
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center mb-5">
                                        <ExternalLink className="w-6 h-6 text-emerald-400" />
                                    </div>
                                    
                                    <h3 className="text-xl sm:text-2xl font-semibold mb-2 tracking-tight text-white">
                                        Masuk ke Portal SIAKAD
                                    </h3>
                                    <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
                                        Gunakan Nomor Induk Mahasiswa (NIM) dan kata sandi yang telah terdaftar untuk mengakses seluruh layanan perkuliahan Anda.
                                    </p>
                                    
                                    {data.link_siakad ? (
                                        <a 
                                            href={data.link_siakad}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center w-full gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-sm group"
                                        >
                                            <span>Buka Portal SIAKAD</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    ) : (
                                        <span className="inline-flex items-center justify-center w-full px-6 py-3.5 bg-slate-800 text-slate-400 font-medium rounded-xl text-sm cursor-not-allowed">
                                            Tautan Belum Dikonfigurasi
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Help & Support Links */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {data.link_panduan && (
                                    <a 
                                        href={data.link_panduan} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex flex-col items-start p-5 bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-400 hover:shadow-sm transition-all group"
                                    >
                                        <div className="w-10 h-10 bg-blue-50 text-blue-600 border border-blue-200/60 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                                            <PlayCircle className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-semibold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">
                                            Panduan Sistem
                                        </h4>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            Tutorial login & pengisian KRS
                                        </p>
                                    </a>
                                )}
                                
                                {waNumber && (
                                    <a 
                                        href={`https://wa.me/${waNumber}?text=Halo%20Admin%20SIAKAD%20Pascasarjana,%20saya%20butuh%20bantuan...`}
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex flex-col items-start p-5 bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-400 hover:shadow-sm transition-all group"
                                    >
                                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 border border-emerald-200/60 rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-semibold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">
                                            Bantuan Teknis
                                        </h4>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            Konsultasi kendala & akun
                                        </p>
                                    </a>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
