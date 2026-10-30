import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function VisiMisi({ visimisi }) {
    // Data murni dari database
    const data = visimisi || {};

    const visiText = data.visi || 'Visi belum diatur.';
    const misiList = Array.isArray(data.misi) 
        ? data.misi 
        : (typeof data.misi === 'string' ? JSON.parse(data.misi || '[]') : []);
    const tujuanList = Array.isArray(data.tujuan) 
        ? data.tujuan 
        : (typeof data.tujuan === 'string' ? JSON.parse(data.tujuan || '[]') : []);

    return (
        <PublicLayout>
            <Head title="Visi, Misi & Tujuan | Prodi KPI IAI Persis Bandung" />

            {/* Minimalist Hero Section */}
            <section className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                {/* Background Banner dari Admin jika tersedia */}
                {data.gambar_banner && (
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={data.gambar_banner} 
                            alt="Banner Visi Misi" 
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070E1E] via-[#091122]/80 to-[#091122]/90"></div>
                    </div>
                )}

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-3xl text-left">
                        {/* Title with Editorial Serif Touch */}
                        <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-semibold text-white leading-[1.18] tracking-tight mb-4">
                            Visi, Misi &amp; <span className="font-serif italic font-normal text-emerald-300">Tujuan</span>
                        </h1>

                        {/* Deskripsi banner murni dari database jika diisi admin */}
                        {data.deskripsi_banner ? (
                            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                                {data.deskripsi_banner}
                            </p>
                        ) : null}
                    </div>
                </div>
            </section>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Profil' },
                { label: 'Visi, Misi & Tujuan' }
            ]} />

            {/* Main Content Area */}
            <div className="relative bg-[#FAFAFA] py-16 sm:py-24 border-b border-slate-200">
                {/* Background image jika diupload dari admin */}
                {data.gambar_bg && (
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <img 
                            src={data.gambar_bg} 
                            alt="Background Pattern" 
                            className="w-full h-full object-cover opacity-5"
                        />
                    </div>
                )}

                <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16 sm:space-y-24 relative z-10">

                    {/* SECTION 1: VISI (Bento Card Murni Teks Database) */}
                    <div>
                        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">01</span>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight ml-2 inline-block">
                                    Visi <span className="font-serif italic font-normal text-slate-700">Program Studi</span>
                                </h2>
                            </div>
                        </div>

                        <div className="relative bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-sm overflow-hidden">
                            {/* Watermark Quote Icon */}
                            <div className="absolute -right-4 -bottom-6 text-slate-100 font-serif text-[160px] select-none pointer-events-none leading-none opacity-60">
                                &rdquo;
                            </div>

                            <div className="relative z-10 max-w-4xl">
                                <blockquote className="font-serif text-2xl sm:text-3xl lg:text-[32px] leading-snug sm:leading-relaxed text-slate-900 font-medium tracking-tight">
                                    &ldquo;{visiText}&rdquo;
                                </blockquote>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: MISI (Daftar Murni Database) */}
                    <div>
                        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">02</span>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight ml-2 inline-block">
                                    Misi <span className="font-serif italic font-normal text-slate-700">Program Studi</span>
                                </h2>
                            </div>
                        </div>

                        {misiList.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {misiList.map((item, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-white rounded-xl border border-slate-200/90 p-7 hover:border-slate-300 hover:shadow-sm transition-all duration-200 flex items-start gap-4"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0 border border-emerald-100 font-mono">
                                            0{index + 1}
                                        </div>
                                        <p className="text-slate-800 text-base leading-relaxed flex-1 pt-1">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-500 italic">Misi belum diatur.</p>
                        )}
                    </div>

                    {/* SECTION 3: TUJUAN (Daftar Murni Database) */}
                    <div>
                        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">03</span>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight ml-2 inline-block">
                                    Tujuan <span className="font-serif italic font-normal text-slate-700">Program Studi</span>
                                </h2>
                            </div>
                        </div>

                        {tujuanList.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {tujuanList.map((item, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-white rounded-xl border border-slate-200/90 p-6 hover:border-slate-300 transition-all flex items-start gap-4 shadow-sm"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-emerald-100">
                                            <i className="fa-solid fa-check text-emerald-700"></i>
                                        </div>
                                        <p className="text-slate-700 text-base leading-relaxed flex-1">
                                            <span className="font-semibold text-slate-900 mr-2">{index + 1}.</span>
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-slate-500 italic">Tujuan belum diatur.</p>
                        )}
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
