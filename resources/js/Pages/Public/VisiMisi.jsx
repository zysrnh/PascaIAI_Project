import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function VisiMisi({ visimisi }) {
    // Gunakan data dari backend, atau fallback kalau kosong
    const data = visimisi || {
        gambar_banner: "/images/default-banner.jpg",
        gambar_bg: "/images/default-banner.jpg",
        visi: "Visi belum diatur.",
        misi: ["Misi belum diatur."],
        tujuan: ["Tujuan belum diatur."]
    };

    // Pastikan array
    const misiList = Array.isArray(data.misi) ? data.misi : JSON.parse(data.misi || '[]');
    const tujuanList = Array.isArray(data.tujuan) ? data.tujuan : JSON.parse(data.tujuan || '[]');

    return (
        <PublicLayout>
            <Head title="Visi, Misi & Tujuan | Pascasarjana IAI Persis Bandung" />

            {/* Hero Section / Banner - Konsisten dengan halaman lain */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={data.gambar_banner} 
                        alt="Visi Misi Banner" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md">
                        Visi, Misi & Tujuan
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                    {data.deskripsi_banner && (
                        <p className="text-white/90 max-w-3xl text-sm md:text-base leading-relaxed drop-shadow">
                            {data.deskripsi_banner}
                        </p>
                    )}
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Profil' },
                { label: 'Visi, Misi & Tujuan' }
            ]} />

            {/* Main Content - Satu kesatuan background menyambung */}
            <div className="relative py-24 overflow-hidden bg-white">
                
                {/* Background Image memanjang untuk Visi, Misi, dan Tujuan */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={data.gambar_bg} 
                        alt="Background Pattern" 
                        className="w-full h-full object-cover opacity-15"
                    />
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-24">
                    
                    {/* Section Visi */}
                    <div className="text-center">
                        <div className="inline-flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-sm flex items-center justify-center text-xl shadow-sm border border-emerald-200">
                                <i className="fa-solid fa-eye"></i>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-950 tracking-tight">Visi</h2>
                        </div>
                        
                        <div className="relative max-w-4xl mx-auto">
                            <p className="text-xl md:text-3xl text-slate-800 leading-relaxed font-semibold italic relative z-10 px-4 md:px-8">
                                "{data.visi}"
                            </p>
                        </div>
                    </div>

                    {/* Section Misi */}
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-sm flex items-center justify-center text-xl shadow-sm border border-amber-200">
                                <i className="fa-solid fa-bullseye"></i>
                            </div>
                            <h2 className="text-3xl font-extrabold text-emerald-950">Misi</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {misiList.map((item, index) => (
                                <div key={index} className="bg-white/60 backdrop-blur-sm p-6 rounded-sm shadow-sm border border-slate-200 hover:shadow-md hover:border-emerald-300 transition-all flex gap-4 group">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-emerald-50 group-hover:bg-emerald-800 group-hover:text-white text-emerald-800 flex items-center justify-center font-bold text-lg transition-colors border border-emerald-100 group-hover:border-emerald-800">
                                        {index + 1}
                                    </div>
                                    <p className="text-slate-700 leading-relaxed pt-1">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section Tujuan */}
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-sm flex items-center justify-center text-xl shadow-sm border border-emerald-200">
                                <i className="fa-solid fa-flag-checkered"></i>
                            </div>
                            <h2 className="text-3xl font-extrabold text-emerald-950">Tujuan</h2>
                        </div>
                        
                        <div className="space-y-4">
                            {tujuanList.map((item, index) => (
                                <div key={index} className="flex items-start gap-5 p-5 bg-white/60 backdrop-blur-sm hover:bg-emerald-50/80 rounded-sm border border-slate-100 hover:border-emerald-200 transition-colors group">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-sm bg-amber-500 text-emerald-950 flex items-center justify-center font-bold text-sm mt-0.5 shadow-sm">
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed text-lg flex-1">
                                        <span className="font-semibold text-emerald-900 mr-2">{index + 1}.</span> 
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
