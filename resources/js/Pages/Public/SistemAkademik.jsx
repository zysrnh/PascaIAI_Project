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
            'Memantau progress bimbingan Tesis/Disertasi'
        ],
        link_siakad: 'https://siakad.iaipibandung.ac.id',
        link_panduan: '#',
        kontak_bantuan: '',
        deskripsi_banner: 'Portal Terpadu Layanan Akademik Mahasiswa',
        banner_image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1600&auto=format&fit=crop'
    };

    const waNumber = data.kontak_bantuan ? data.kontak_bantuan.replace(/\D/g, '').replace(/^0/, '62') : null;

    return (
        <PublicLayout>
            <Head title={`${data.judul} | Pascasarjana IAI Persis Bandung`} />

            {/* Banner Section */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={data.banner_image || 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1600&auto=format&fit=crop'} 
                        alt="Sistem Akademik Banner" 
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md tracking-tight">
                        {data.judul}
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                    {data.deskripsi_banner && (
                        <p className="text-white/90 max-w-2xl text-lg md:text-xl leading-relaxed drop-shadow">
                            {data.deskripsi_banner}
                        </p>
                    )}
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Akademik' },
                { label: 'Sistem Akademik' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200 min-h-[500px]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        
                        {/* Left Column: Description & Features */}
                        <div className="space-y-8 animate-fade-in-up">
                            <div>
                                <h2 className="text-3xl font-extrabold text-emerald-950 mb-4 tracking-tight">Apa itu SIAKAD?</h2>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    {data.deskripsi_singkat}
                                </p>
                            </div>

                            {data.fitur_list && data.fitur_list.length > 0 && (
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                                        <ShieldCheck className="w-6 h-6 text-emerald-600" /> 
                                        Layanan & Fitur
                                    </h3>
                                    <ul className="space-y-4">
                                        {data.fitur_list.map((fitur, idx) => (
                                            <li key={idx} className="flex items-start gap-3">
                                                <div className="mt-1 flex-shrink-0">
                                                    <CheckCircle2 className="w-5 h-5 text-amber-500" />
                                                </div>
                                                <span className="text-slate-700">{fitur}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Right Column: CTA & Help */}
                        <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                            
                            {/* Main CTA Card */}
                            <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <MonitorSmartphone className="w-48 h-48" />
                                </div>
                                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl"></div>
                                
                                <div className="relative z-10">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                                        <ExternalLink className="w-8 h-8 text-white" />
                                    </div>
                                    
                                    <h3 className="text-3xl font-bold mb-4">Masuk ke Portal</h3>
                                    <p className="text-emerald-100 mb-8 max-w-sm">
                                        Gunakan Nomor Induk Mahasiswa (NIM) dan password yang telah diberikan untuk mengakses layanan akademik Anda.
                                    </p>
                                    
                                    {data.link_siakad ? (
                                        <a 
                                            href={data.link_siakad}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center w-full sm:w-auto gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/30 group"
                                        >
                                            Login SIAKAD 
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    ) : (
                                        <span className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-500/50 text-white font-bold rounded-xl cursor-not-allowed">
                                            Sistem Belum Tersedia
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Help & Support Links */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                {data.link_panduan && (
                                    <a 
                                        href={data.link_panduan} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-center group"
                                    >
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <PlayCircle className="w-6 h-6" />
                                        </div>
                                        <h4 className="font-bold text-slate-800">Panduan Penggunaan</h4>
                                        <p className="text-xs text-slate-500 mt-1">Tutorial cara login & KRS</p>
                                    </a>
                                )}
                                
                                {waNumber && (
                                    <a 
                                        href={`https://wa.me/${waNumber}?text=Halo%20Admin%20SIAKAD%20Pascasarjana,%20saya%20butuh%20bantuan%20terkait...`}
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all text-center group"
                                    >
                                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <h4 className="font-bold text-slate-800">Bantuan Teknis</h4>
                                        <p className="text-xs text-slate-500 mt-1">Lupa password/kendala</p>
                                    </a>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.4s ease-out forwards;
                }
            `}</style>
        </PublicLayout>
    );
}
