import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function SambutanPimpinan({ sambutan }) {
    return (
        <PublicLayout>
            <Head title="Sambutan Pimpinan | Pascasarjana IAI Persis Bandung" />

            {/* Hero Section / Banner */}
            <div className="relative w-full h-[300px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop" 
                        alt="Sambutan Pimpinan" 
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md">
                        Sambutan Pimpinan
                    </h1>
                    <div className="w-16 h-1.5 bg-amber-500 rounded-full"></div>
                </div>
            </div>

            {/* Content Section */}
            <div className="bg-white py-16 md:py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        {/* Foto Pimpinan */}
                        <div className="w-full md:w-1/3 flex flex-col items-center">
                            <div className="w-64 h-64 md:w-72 md:h-72 relative mb-6">
                                <div className="absolute inset-0 bg-emerald-800 rounded-2xl translate-x-3 translate-y-3 opacity-20"></div>
                                <img 
                                    src={sambutan?.foto || "https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=400&auto=format&fit=crop"} 
                                    alt={sambutan?.nama} 
                                    className="w-full h-full object-cover rounded-2xl shadow-xl relative z-10 object-top border-4 border-slate-50"
                                />
                            </div>
                            <div className="text-center w-full">
                                <h3 className="text-xl font-bold text-emerald-950 mb-1">{sambutan?.nama}</h3>
                                <p className="text-emerald-700 font-semibold text-sm uppercase tracking-wider">{sambutan?.jabatan}</p>
                            </div>
                        </div>

                        {/* Teks Sambutan */}
                        <div className="w-full md:w-2/3">
                            <div className="relative bg-slate-50 p-8 rounded-2xl border border-slate-100 mb-8 shadow-sm">
                                <i className="fa-solid fa-quote-left text-5xl text-emerald-100/50 absolute top-4 left-6"></i>
                                <p className="text-slate-700 italic relative z-10 leading-relaxed font-medium text-lg whitespace-pre-wrap">
                                    "{sambutan?.sambutan_singkat}"
                                </p>
                            </div>

                            <div className="prose prose-lg prose-emerald max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {sambutan?.sambutan_lengkap}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
