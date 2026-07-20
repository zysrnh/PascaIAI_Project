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
    return (
        <PublicLayout>
            <Head title="Tentang Kampus | Pascasarjana IAI Persis Bandung" />

            {/* Hero Section / Banner */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={tentang?.gambar_banner || "/images/default-banner.jpg"} 
                        alt="Gedung Kampus" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md">
                        {tentang?.judul || 'Tentang Pascasarjana'}
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm-full mb-4"></div>
                    {tentang?.deskripsi_banner && (
                        <p className="text-white/90 max-w-3xl text-sm md:text-base leading-relaxed drop-shadow">
                            {tentang.deskripsi_banner}
                        </p>
                    )}
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Profil' },
                { label: 'Tentang Kampus' }
            ]} />

            {/* Content Section */}
            <div className="bg-white py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Deskripsi Singkat */}
                    <div className="text-center mb-20">
                        <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                            {tentang?.konten}
                        </p>
                    </div>

                    {/* Video Profil */}
                    <div className="mb-24">
                        <h2 className="text-2xl font-bold text-emerald-950 mb-6 border-b-2 border-slate-100 pb-3">Profil</h2>
                        {videoId ? (
                            <div className="relative rounded-sm overflow-hidden shadow-xl border-4 border-emerald-900 aspect-video bg-slate-900">
                                <iframe 
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${videoId}?rel=0`} 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <a href={tentang?.video_url} target="_blank" rel="noreferrer" className="block relative rounded-sm overflow-hidden shadow-xl border-4 border-emerald-900 group cursor-pointer aspect-video bg-slate-900">
                                <img 
                                    src="/images/default-banner.jpg" 
                                    alt="Video Thumbnail" 
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-sm flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <i className="fa-solid fa-play text-2xl md:text-3xl ml-1"></i>
                                    </div>
                                </div>
                                <div className="absolute top-4 left-4">
                                    <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-md">Video Profil {tentang?.judul}</h3>
                                </div>
                            </a>
                        )}
                    </div>

                    {/* Pimpinan */}
                    {tentang?.tampilkan_pimpinan !== false && (
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-emerald-950 mb-10 border-b-2 border-slate-100 pb-3">Pimpinan</h2>
                            
                            <div className="flex flex-col md:flex-row items-center gap-10">
                                {/* Quotes & Name */}
                                <div className="flex-1 order-2 md:order-1 text-center md:text-left">
                                    <span className="text-emerald-700 font-bold tracking-widest text-sm uppercase mb-2 block">DIREKTUR</span>
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-emerald-950 mb-4">{tentang?.pimpinan_nama}</h3>
                                    <div className="relative bg-slate-50 p-6 rounded-sm border border-slate-200 mb-6 shadow-sm">
                                        <i className="fa-solid fa-quote-left text-4xl text-emerald-100 absolute top-4 left-4"></i>
                                        <p className="text-slate-600 italic relative z-10 leading-relaxed font-medium whitespace-pre-wrap">
                                            "{tentang?.pimpinan_quotes}"
                                        </p>
                                    </div>
                                    <button onClick={() => setIsPimpinanModalOpen(true)} className="inline-block bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-2.5 rounded-sm text-sm font-semibold transition shadow-md">
                                        Profil Direktur
                                    </button>
                                </div>

                                {/* Image */}
                                <div className="w-64 h-64 md:w-80 md:h-80 shrink-0 relative order-1 md:order-2 cursor-pointer group" onClick={() => setIsPimpinanModalOpen(true)}>
                                    <div className="absolute inset-0 bg-emerald-800 rounded-sm-full translate-x-3 translate-y-3 opacity-20 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-300"></div>
                                    <img 
                                        src={tentang?.gambar_pimpinan || "https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=400&auto=format&fit=crop"} 
                                        alt="Direktur Pascasarjana" 
                                        className="w-full h-full object-cover rounded-sm-full border-8 border-white shadow-xl relative z-10 object-top group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute bottom-0 right-0 bg-amber-500 text-emerald-950 font-bold px-4 py-2 rounded-sm shadow-lg z-20 -rotate-3 text-sm">
                                        Direktur Pascasarjana
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Pimpinan Slide-over Modal (Rendered in Portal to escape stacking context) */}
            {mounted && typeof document !== 'undefined' && createPortal(
                <div className={`fixed inset-0 z-[999] overflow-hidden transition-opacity duration-300 ${isPimpinanModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-slate-900/60 " onClick={() => setIsPimpinanModalOpen(false)}></div>
                    
                    {/* Panel */}
                    <div className={`absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col transform transition-transform duration-500 ease-in-out ${isPimpinanModalOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-emerald-50/50">
                            <h3 className="text-xl font-bold text-emerald-950">Profil Direktur</h3>
                            <button 
                                onClick={() => setIsPimpinanModalOpen(false)}
                                className="text-slate-400 hover:text-emerald-700 transition-colors p-2 rounded-sm hover:bg-emerald-100/50"
                            >
                                <i className="fa-solid fa-xmark text-xl"></i>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-1">
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="w-32 h-32 rounded-sm-full border-4 border-emerald-100 shadow-lg overflow-hidden mb-4">
                                    <img 
                                        src={tentang?.gambar_pimpinan || "https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=400&auto=format&fit=crop"} 
                                        alt="Direktur Pascasarjana" 
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>
                                <h4 className="text-xl font-extrabold text-slate-800">{tentang?.pimpinan_nama}</h4>
                                <p className="text-sm font-bold text-emerald-600 mt-1 uppercase tracking-wider">Direktur Pascasarjana</p>
                            </div>
                            <div className="prose prose-emerald max-w-none text-slate-600">
                                {tentang?.pimpinan_detail ? (
                                    <p className="whitespace-pre-wrap leading-relaxed">{tentang.pimpinan_detail}</p>
                                ) : (
                                    <p className="whitespace-pre-wrap leading-relaxed italic text-slate-400">Belum ada profil detail pimpinan yang ditambahkan.</p>
                                )}
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-100 bg-slate-50">
                            <Link href="/profil/sambutan-pimpinan" className="block w-full text-center bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-3 rounded-sm font-semibold transition shadow-md">
                                Baca Sambutan Lengkap
                            </Link>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </PublicLayout>
    );
}
