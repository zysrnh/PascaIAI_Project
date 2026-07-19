import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Users, GraduationCap, Award, BookOpen, User, ExternalLink, Search, Filter } from 'lucide-react';

export default function Index({ dosens, programStudis, pengaturan, stats, activeProdi }) {
    const defaultBanner = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop";
    const bannerUrl = pengaturan?.banner_image || defaultBanner;

    const [search, setSearch] = useState('');

    const handleProdiChange = (e) => {
        router.get(route('public.dosen'), { prodi: e.target.value }, { preserveState: true });
    };

    const filteredDosens = dosens.filter(dosen => 
        dosen.nama.toLowerCase().includes(search.toLowerCase()) || 
        (dosen.bidang_keahlian && dosen.bidang_keahlian.toLowerCase().includes(search.toLowerCase())) ||
        (dosen.nidn && dosen.nidn.includes(search))
    );

    return (
        <PublicLayout>
            <Head title="Data Dosen" />

            {/* Hero Section */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={bannerUrl} 
                        alt="Banner Data Dosen" 
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-emerald-950/40 mix-blend-multiply"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 uppercase tracking-tight">
                        Data Dosen
                    </h1>
                    <div className="w-16 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                    {pengaturan?.deskripsi && (
                        <p className="text-white/90 max-w-2xl text-base md:text-lg leading-relaxed drop-shadow">
                            {pengaturan.deskripsi}
                        </p>
                    )}
                </div>
            </div>

            <div className="bg-slate-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Statistik Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                            <Users className="w-6 h-6 text-emerald-600 mb-2" />
                            <p className="text-2xl font-bold text-slate-800 leading-none mb-1">{stats.total}</p>
                            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Total Dosen</p>
                        </div>
                        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                            <Award className="w-6 h-6 text-amber-500 mb-2" />
                            <p className="text-2xl font-bold text-slate-800 leading-none mb-1">{stats.guru_besar}</p>
                            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Guru Besar</p>
                        </div>
                        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                            <BookOpen className="w-6 h-6 text-blue-600 mb-2" />
                            <p className="text-2xl font-bold text-slate-800 leading-none mb-1">{stats.lektor_kepala}</p>
                            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Lektor Kepala</p>
                        </div>
                        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                            <GraduationCap className="w-6 h-6 text-purple-600 mb-2" />
                            <p className="text-2xl font-bold text-slate-800 leading-none mb-1">{stats.lektor}</p>
                            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Lektor</p>
                        </div>
                        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center col-span-2 md:col-span-1">
                            <User className="w-6 h-6 text-slate-600 mb-2" />
                            <p className="text-2xl font-bold text-slate-800 leading-none mb-1">{stats.asisten_ahli}</p>
                            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Asisten Ahli</p>
                        </div>
                    </div>

                    {/* Filter & Search */}
                    <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 mb-8">
                        <div className="flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari nama dosen, NIDN, atau bidang keahlian..."
                                className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="md:w-72 relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Filter className="h-4 w-4 text-slate-400" />
                            </div>
                            <select
                                className="block w-full pl-10 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md"
                                value={activeProdi}
                                onChange={handleProdiChange}
                            >
                                <option value="">Semua Program Studi</option>
                                {programStudis.map(prodi => (
                                    <option key={prodi.id} value={prodi.id}>{prodi.nama}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Dosen Grid */}
                    {filteredDosens.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredDosens.map((dosen) => (
                                <div key={dosen.id} className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200">
                                    {/* Image Container */}
                                    <div className="aspect-[4/5] w-full bg-slate-100 relative overflow-hidden group">
                                        {dosen.foto_url ? (
                                            <img 
                                                src={dosen.foto_url} 
                                                alt={dosen.nama} 
                                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                                                <User className="w-20 h-20" />
                                            </div>
                                        )}
                                        {/* Overlay badge for Jabatan */}
                                        {dosen.jabatan_fungsional && (
                                            <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] font-bold rounded uppercase tracking-wider shadow-sm">
                                                {dosen.jabatan_fungsional}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Info */}
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="text-base font-bold text-slate-800 mb-1 leading-tight">{dosen.nama}</h3>
                                        
                                        <div className="space-y-1 mt-2 mb-4 flex-1">
                                            {dosen.nidn && (
                                                <p className="text-xs text-slate-500 font-medium">
                                                    NIDN: <span className="text-slate-700">{dosen.nidn}</span>
                                                </p>
                                            )}
                                            {dosen.program_studi && (
                                                <p className="text-xs text-emerald-600 font-semibold">
                                                    {dosen.program_studi.nama}
                                                </p>
                                            )}
                                        </div>

                                        {/* External Links Buttons */}
                                        <div className="grid grid-cols-3 gap-2 mt-auto border-t border-slate-100 pt-4">
                                            {dosen.sinta_url ? (
                                                <a href={dosen.sinta_url} target="_blank" rel="noreferrer" className="flex items-center justify-center px-2 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-[10px] font-bold uppercase tracking-wider transition-colors">
                                                    Sinta
                                                </a>
                                            ) : (
                                                <div className="flex items-center justify-center px-2 py-1.5 bg-slate-50 text-slate-400 rounded text-[10px] font-bold uppercase tracking-wider cursor-not-allowed">
                                                    Sinta
                                                </div>
                                            )}
                                            
                                            {dosen.scopus_url ? (
                                                <a href={dosen.scopus_url} target="_blank" rel="noreferrer" className="flex items-center justify-center px-2 py-1.5 bg-orange-50 text-orange-700 hover:bg-orange-100 rounded text-[10px] font-bold uppercase tracking-wider transition-colors">
                                                    Scopus
                                                </a>
                                            ) : (
                                                <div className="flex items-center justify-center px-2 py-1.5 bg-slate-50 text-slate-400 rounded text-[10px] font-bold uppercase tracking-wider cursor-not-allowed">
                                                    Scopus
                                                </div>
                                            )}

                                            {dosen.gscholar_url ? (
                                                <a href={dosen.gscholar_url} target="_blank" rel="noreferrer" className="flex items-center justify-center px-2 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[10px] font-bold uppercase tracking-wider transition-colors">
                                                    GS
                                                </a>
                                            ) : (
                                                <div className="flex items-center justify-center px-2 py-1.5 bg-slate-50 text-slate-400 rounded text-[10px] font-bold uppercase tracking-wider cursor-not-allowed">
                                                    GS
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center bg-white rounded-lg border border-slate-200 border-dashed">
                            <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-slate-700 mb-1">Tidak Ada Data Dosen</h3>
                            <p className="text-slate-500 text-sm">
                                {search || activeProdi ? 'Tidak ada dosen yang sesuai dengan kriteria pencarian Anda.' : 'Data dosen sedang dalam proses pembaruan.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
