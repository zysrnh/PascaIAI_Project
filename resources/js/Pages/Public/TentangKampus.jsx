import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function TentangKampus({ tentang }) {
    return (
        <PublicLayout>
            <Head title="Tentang Kampus | Pascasarjana IAI Persis Bandung" />

            {/* Hero Section / Banner */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={tentang?.gambar_banner || "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1600&auto=format&fit=crop"} 
                        alt="Gedung Kampus" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md">
                        {tentang?.judul || 'Tentang Pascasarjana'}
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-full"></div>
                </div>
            </div>

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
                        <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-emerald-900 group cursor-pointer aspect-video bg-slate-900">
                            <img 
                                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop" 
                                alt="Video Thumbnail" 
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <i className="fa-solid fa-play text-2xl md:text-3xl ml-1"></i>
                                </div>
                            </div>
                            <div className="absolute top-4 left-4">
                                <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-md">Video Profil {tentang?.judul}</h3>
                                <a href={tentang?.video_url} target="_blank" rel="noreferrer" className="text-slate-200 text-sm drop-shadow-md hover:text-amber-400">Lihat Video - YouTube</a>
                            </div>
                        </div>
                    </div>

                    {/* Pimpinan */}
                    <div className="mb-10">
                        <h2 className="text-2xl font-bold text-emerald-950 mb-10 border-b-2 border-slate-100 pb-3">Pimpinan</h2>
                        
                        <div className="flex flex-col md:flex-row items-center gap-10">
                            {/* Quotes & Name */}
                            <div className="flex-1 order-2 md:order-1 text-center md:text-left">
                                <span className="text-emerald-700 font-bold tracking-widest text-sm uppercase mb-2 block">DIREKTUR</span>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-emerald-950 mb-4">{tentang?.pimpinan_nama}</h3>
                                <div className="relative bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6">
                                    <i className="fa-solid fa-quote-left text-4xl text-emerald-100 absolute top-4 left-4"></i>
                                    <p className="text-slate-600 italic relative z-10 leading-relaxed font-medium whitespace-pre-wrap">
                                        "{tentang?.pimpinan_quotes}"
                                    </p>
                                </div>
                                <Link href="/profil/sambutan-pimpinan" className="inline-block bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition shadow-md">
                                    Profil Direktur
                                </Link>
                            </div>

                            {/* Image */}
                            <div className="w-64 h-64 md:w-80 md:h-80 shrink-0 relative order-1 md:order-2">
                                <div className="absolute inset-0 bg-emerald-800 rounded-full translate-x-3 translate-y-3 opacity-20"></div>
                                <img 
                                    src={tentang?.gambar_pimpinan || "https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=400&auto=format&fit=crop"} 
                                    alt="Direktur Pascasarjana" 
                                    className="w-full h-full object-cover rounded-full border-8 border-white shadow-xl relative z-10 object-top"
                                />
                                <div className="absolute bottom-0 right-0 bg-amber-500 text-emerald-950 font-bold px-4 py-2 rounded-xl shadow-lg z-20 -rotate-3 text-sm">
                                    Direktur Pascasarjana
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
