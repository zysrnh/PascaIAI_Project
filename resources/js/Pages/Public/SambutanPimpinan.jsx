import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function SambutanPimpinan({ sambutan }) {
    // Normalisasi newline jika tersimpan sebagai literal \n
    const formattedSambutan = (sambutan?.sambutan_lengkap || '')
        .replace(/\\n/g, '\n');

    return (
        <PublicLayout>
            <Head title={`Sambutan ${sambutan?.nama || 'Ketua Prodi KPI'} | IAI Persis Bandung`} />

            {/* Minimalist Editorial Hero Section */}
            <section className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                {/* Background Banner dari Admin jika ada */}
                {sambutan?.gambar_banner && (
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={sambutan.gambar_banner} 
                            alt="Banner Sambutan" 
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070E1E] via-[#091122]/80 to-[#091122]/90"></div>
                    </div>
                )}

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-3xl text-left">
                        <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-semibold text-white leading-[1.18] tracking-tight mb-4">
                            Sambutan <span className="font-serif italic font-normal text-emerald-300">Ketua Program Studi</span>
                        </h1>

                        {sambutan?.deskripsi_banner ? (
                            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                                {sambutan.deskripsi_banner}
                            </p>
                        ) : null}
                    </div>
                </div>
            </section>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Profil' },
                { label: 'Sambutan Pimpinan' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFAFA] py-16 sm:py-24 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        
                        {/* Kolom Kiri: Profil Pimpinan (Bento Card Sticky) */}
                        <div className="lg:col-span-4 lg:sticky lg:top-28">
                            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm text-center">
                                {/* Foto Pimpinan */}
                                <div className="w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 mb-6">
                                    <img 
                                        src={sambutan?.foto || "https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=400&auto=format&fit=crop"} 
                                        alt={sambutan?.nama || 'Foto Pimpinan'} 
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>

                                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                                    {sambutan?.nama || 'Ketua Program Studi KPI'}
                                </h3>
                                <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-700 mt-1 mb-6">
                                    {sambutan?.jabatan || 'Ketua Program Studi KPI Fakultas Dakwah'}
                                </p>

                                <div className="pt-6 border-t border-slate-100 flex flex-col gap-2.5">
                                    <Link 
                                        href="/profil/tentang-kampus"
                                        className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition"
                                    >
                                        Profil &amp; Sejarah Prodi
                                    </Link>
                                    <Link 
                                        href="/profil/visi-misi"
                                        className="w-full text-center bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition"
                                    >
                                        Visi, Misi &amp; Tujuan
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Kanan: Kutipan & Sambutan Lengkap */}
                        <div className="lg:col-span-8 space-y-8">
                            
                            {/* Kutipan Utama (Featured Editorial Bento) */}
                            {sambutan?.sambutan_singkat && (
                                <div className="relative bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-10 shadow-sm overflow-hidden">
                                    <div className="absolute -right-4 -bottom-6 text-slate-100 font-serif text-[160px] select-none pointer-events-none leading-none opacity-60">
                                        &rdquo;
                                    </div>
                                    <div className="relative z-10">
                                        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded mb-4">
                                            <i className="fa-solid fa-quote-left text-emerald-600"></i>
                                            Pesan Pimpinan
                                        </div>
                                        <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-[26px] leading-snug text-slate-900 font-medium tracking-tight">
                                            &ldquo;{sambutan.sambutan_singkat}&rdquo;
                                        </blockquote>
                                    </div>
                                </div>
                            )}

                            {/* Teks Sambutan Lengkap */}
                            <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
                                <div className="border-b border-slate-100 pb-4 mb-6">
                                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Amanat Resmi</span>
                                    <h2 className="text-2xl font-semibold text-slate-900 tracking-tight mt-1">
                                        Teks <span className="font-serif italic font-normal text-slate-700">Sambutan Lengkap</span>
                                    </h2>
                                </div>

                                <div className="text-slate-700 text-base sm:text-lg leading-relaxed sm:leading-loose whitespace-pre-line font-normal space-y-4">
                                    {formattedSambutan || 'Teks sambutan belum ditambahkan.'}
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
