import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function TentangKampus({ tentang }) {
    const [isPimpinanModalOpen, setIsPimpinanModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const getYoutubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };
    const videoId = getYoutubeId(tentang?.video_url);

    // Dynamic title with editorial serif accent on the last word
    const renderTitle = (title) => {
        const rawTitle = title || 'Tentang Program Studi KPI';
        const words = rawTitle.trim().split(' ');
        if (words.length <= 1) return rawTitle;
        const lastWord = words.pop();
        return (
            <>
                {words.join(' ')} <span className="font-serif italic font-normal text-emerald-300">{lastWord}</span>
            </>
        );
    };

    return (
        <PublicLayout>
            <Head title={`${tentang?.judul || 'Tentang Program Studi KPI'} | IAI Persis Bandung`} />

            {/* Minimalist Editorial Hero Section */}
            <section className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                {/* Background Banner dari Admin jika ada */}
                {tentang?.gambar_banner && (
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={tentang.gambar_banner} 
                            alt="Banner Tentang Kampus" 
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070E1E] via-[#091122]/80 to-[#091122]/90"></div>
                    </div>
                )}

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-3xl text-left">
                        <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-semibold text-white leading-[1.18] tracking-tight mb-4">
                            {renderTitle(tentang?.judul)}
                        </h1>

                        {tentang?.deskripsi_banner ? (
                            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                                {tentang.deskripsi_banner}
                            </p>
                        ) : null}
                    </div>
                </div>
            </section>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Profil' },
                { label: 'Tentang & Sejarah' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFAFA] py-16 sm:py-24 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16 sm:space-y-24">

                    {/* SECTION 1: PROFIL & SEJARAH (Bento Card Murni Database) */}
                    <div>
                        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">01</span>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight ml-2 inline-block">
                                    Profil &amp; <span className="font-serif italic font-normal text-slate-700">Sejarah Singkat</span>
                                </h2>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
                            <div className="max-w-4xl">
                                <p className="text-slate-800 text-lg sm:text-xl leading-relaxed whitespace-pre-wrap font-normal">
                                    {tentang?.konten || 'Deskripsi profil prodi belum ditambahkan.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: VIDEO PROFIL (Jika Ada) */}
                    {tentang?.video_url && (
                        <div>
                            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">02</span>
                                    <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight ml-2 inline-block">
                                        Dokumentasi &amp; <span className="font-serif italic font-normal text-slate-700">Video Profil</span>
                                    </h2>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-sm overflow-hidden">
                                {videoId ? (
                                    <div className="relative rounded-xl overflow-hidden shadow-sm aspect-video bg-slate-950">
                                        <iframe 
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${videoId}?rel=0`} 
                                            title={`Video Profil ${tentang?.judul || 'KPI'}`}
                                            frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ) : (
                                    <a 
                                        href={tentang.video_url} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="block relative rounded-xl overflow-hidden shadow-sm aspect-video bg-slate-950 group cursor-pointer"
                                    >
                                        <img 
                                            src={tentang.gambar_banner || "/images/default-banner.jpg"} 
                                            alt="Video Thumbnail" 
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                                        />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                <i className="fa-solid fa-play text-xl ml-1 text-emerald-700"></i>
                                            </div>
                                            <span className="text-white text-sm font-medium mt-3 bg-black/40 px-3 py-1 rounded backdrop-blur-sm">
                                                Tonton di YouTube
                                            </span>
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {/* SECTION 3: PIMPINAN (Murni Data Database) */}
                    {tentang?.tampilkan_pimpinan !== false && (
                        <div>
                            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                                        {tentang?.video_url ? '03' : '02'}
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight ml-2 inline-block">
                                        Pimpinan <span className="font-serif italic font-normal text-slate-700">Program Studi</span>
                                    </h2>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-12">
                                    {/* Foto Pimpinan */}
                                    <div 
                                        className="w-48 h-48 sm:w-56 sm:h-56 shrink-0 relative cursor-pointer group"
                                        onClick={() => setIsPimpinanModalOpen(true)}
                                    >
                                        <div className="w-full h-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 group-hover:border-slate-400 transition-colors">
                                            <img 
                                                src={tentang?.gambar_pimpinan || "https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=400&auto=format&fit=crop"} 
                                                alt={tentang?.pimpinan_nama || "Pimpinan Prodi KPI"} 
                                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Konten Pimpinan */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mb-2">
                                            {tentang?.pimpinan_nama || 'Ketua Program Studi'}
                                        </h3>
                                        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-700 mb-6">
                                            Ketua Program Studi KPI
                                        </p>

                                        {tentang?.pimpinan_quotes && (
                                            <blockquote className="relative bg-slate-50 rounded-xl border border-slate-200/80 p-6 mb-6">
                                                <p className="font-serif italic text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                                                    &ldquo;{tentang.pimpinan_quotes}&rdquo;
                                                </p>
                                            </blockquote>
                                        )}

                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                            <button 
                                                type="button"
                                                onClick={() => setIsPimpinanModalOpen(true)}
                                                className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition inline-flex items-center gap-2"
                                            >
                                                <span>Biodata Lengkap</span>
                                                <i className="fa-solid fa-arrow-right text-xs"></i>
                                            </button>
                                            <Link
                                                href="/profil/sambutan-pimpinan"
                                                className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition inline-flex items-center gap-2"
                                            >
                                                <span>Baca Sambutan Resmi</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bottom CTA / Quick Links */}
                    <div className="bg-[#0E1626] rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="max-w-xl text-center md:text-left">
                            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Jelajahi Lebih Lanjut</span>
                            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white mt-1">
                                Pelajari Visi, Misi &amp; Sasaran Strategis Kami
                            </h3>
                            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                                Temukan komitmen mutu, target pencapaian tahun 2030, serta standar kurikulum akademik penyiaran Islam.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                            <Link
                                href="/profil/visi-misi"
                                className="bg-white text-slate-900 font-semibold px-5 py-3 rounded-xl hover:bg-slate-100 transition text-xs sm:text-sm inline-flex items-center gap-2 shadow-sm"
                            >
                                <span>Lihat Visi Misi</span>
                                <i className="fa-solid fa-arrow-right text-xs"></i>
                            </Link>
                            <Link
                                href="/akademik/kurikulum"
                                className="bg-white/10 text-white border border-white/20 font-medium px-5 py-3 rounded-xl hover:bg-white/20 transition text-xs sm:text-sm inline-flex items-center gap-2"
                            >
                                <span>Kurikulum</span>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* Pimpinan Slide-over Modal */}
            {mounted && typeof document !== 'undefined' && createPortal(
                <div className={`fixed inset-0 z-[999] overflow-hidden transition-opacity duration-300 ${isPimpinanModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsPimpinanModalOpen(false)}></div>
                    <div className={`absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${isPimpinanModalOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
                            <h3 className="text-lg font-semibold text-slate-900">Profil Pimpinan</h3>
                            <button 
                                onClick={() => setIsPimpinanModalOpen(false)}
                                className="text-slate-400 hover:text-slate-700 transition-colors p-2 rounded-lg hover:bg-slate-200/50"
                            >
                                <i className="fa-solid fa-xmark text-lg"></i>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1">
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="w-28 h-28 rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-4">
                                    <img 
                                        src={tentang?.gambar_pimpinan || "https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=400&auto=format&fit=crop"} 
                                        alt={tentang?.pimpinan_nama || "Pimpinan"} 
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <h4 className="text-xl font-semibold text-slate-900">{tentang?.pimpinan_nama}</h4>
                                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mt-1">Ketua Program Studi KPI</p>
                            </div>
                            <div className="text-slate-700 text-sm leading-relaxed border-t border-slate-100 pt-5">
                                {tentang?.pimpinan_detail ? (
                                    <p className="whitespace-pre-wrap">{tentang.pimpinan_detail}</p>
                                ) : (
                                    <p className="whitespace-pre-wrap italic text-slate-400">Belum ada profil detail pimpinan yang ditambahkan.</p>
                                )}
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-100 bg-slate-50">
                            <Link 
                                href="/profil/sambutan-pimpinan" 
                                className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl text-sm font-medium transition shadow-sm"
                            >
                                Baca Sambutan Resmi Pimpinan
                            </Link>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </PublicLayout>
    );
}
