import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Users, GraduationCap, Award, BookOpen, User, ExternalLink, Search, Filter, UserCheck } from 'lucide-react';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function Index({ dosens, programStudis, pengaturan, stats, activeProdi }) {
    const bannerUrl = pengaturan?.banner_image;
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
            <Head title="Direktori Dosen & Tenaga Pengajar | Prodi KPI IAI Persis Bandung" />

            {/* Minimalist Editorial Hero Section */}
            <section className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                {bannerUrl && (
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={bannerUrl} 
                            alt="Banner Dosen" 
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070E1E] via-[#091122]/80 to-[#091122]/90"></div>
                    </div>
                )}

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-3xl text-left">
                        <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-semibold text-white leading-[1.18] tracking-tight mb-4">
                            Direktori Dosen &amp; <span className="font-serif italic font-normal text-emerald-300">Tenaga Pengajar</span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                            {pengaturan?.deskripsi || 'Tenaga pendidik, akademisi, dan praktisi penyiaran Islam berkompeten dengan kualifikasi magister dan doktoral terkemuka.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Akademik' },
                { label: 'Direktori Dosen' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFAFA] py-12 sm:py-20 border-b border-slate-200 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                    
                    {/* Statistik Bento Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col items-center justify-center text-center">
                            <Users className="w-5 h-5 text-emerald-700 mb-2.5" />
                            <p className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-none mb-1 font-mono">
                                {stats?.total ?? 0}
                            </p>
                            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Dosen</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col items-center justify-center text-center">
                            <GraduationCap className="w-5 h-5 text-emerald-700 mb-2.5" />
                            <p className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-none mb-1 font-mono">
                                {stats?.mahasiswa ?? stats?.guru_besar ?? 0}
                            </p>
                            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Mahasiswa Aktif</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col items-center justify-center text-center">
                            <UserCheck className="w-5 h-5 text-emerald-700 mb-2.5" />
                            <p className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-none mb-1 font-mono">
                                {stats?.alumni ?? stats?.lektor_kepala ?? 0}
                            </p>
                            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Jumlah Alumni</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col items-center justify-center text-center">
                            <BookOpen className="w-5 h-5 text-emerald-700 mb-2.5" />
                            <p className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-none mb-1 font-mono">
                                {stats?.penelitian ?? stats?.lektor ?? 0}
                            </p>
                            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Riset &amp; Kajian</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col items-center justify-center text-center col-span-2 md:col-span-1">
                            <Award className="w-5 h-5 text-emerald-700 mb-2.5" />
                            <p className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-none mb-1 font-mono">
                                {stats?.publikasi ?? stats?.asisten_ahli ?? 0}
                            </p>
                            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Publikasi Ilmiah</p>
                        </div>
                    </div>

                    {/* Filter & Search Bento Bar */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="w-full md:flex-1 relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Cari nama dosen, NIDN, atau bidang keahlian..."
                                className="block w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl bg-slate-50/50 text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 transition"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="w-full md:w-72 relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Filter className="h-4 w-4 text-slate-400" />
                            </div>
                            <select
                                className="block w-full pl-10 pr-8 py-2.5 text-sm border-slate-300 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 rounded-xl"
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

                    {/* Dosen Bento Grid */}
                    {filteredDosens.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredDosens.map((dosen) => (
                                <div key={dosen.id} className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden flex flex-col hover:border-slate-300 hover:shadow-sm transition-all duration-200">
                                    {/* Image Container */}
                                    <div className="aspect-[4/5] w-full bg-slate-100 relative overflow-hidden group">
                                        {dosen.foto_url ? (
                                            <img 
                                                src={dosen.foto_url} 
                                                alt={dosen.nama} 
                                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                                                <User className="w-16 h-16" />
                                            </div>
                                        )}
                                        {/* Jabatan Tag */}
                                        {dosen.jabatan_fungsional && (
                                            <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-semibold rounded-md uppercase tracking-wider shadow-xs border border-slate-100">
                                                {dosen.jabatan_fungsional}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Info */}
                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="text-base font-semibold text-slate-900 mb-1 leading-snug">{dosen.nama}</h3>
                                        
                                        <div className="space-y-1 mt-1 mb-4 flex-1">
                                            {dosen.nidn && (
                                                <p className="text-xs text-slate-500 font-mono">
                                                    NIDN: <span className="text-slate-700">{dosen.nidn}</span>
                                                </p>
                                            )}
                                            {dosen.program_studi && (
                                                <p className="text-xs text-emerald-700 font-semibold mt-1">
                                                    {dosen.program_studi.nama}
                                                </p>
                                            )}
                                            {dosen.bidang_keahlian && (
                                                <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                                    {dosen.bidang_keahlian}
                                                </p>
                                            )}
                                        </div>

                                        {/* External Links Buttons */}
                                        <div className="grid grid-cols-3 gap-2 mt-auto border-t border-slate-100 pt-3">
                                            {dosen.sinta_url ? (
                                                <a href={dosen.sinta_url} target="_blank" rel="noreferrer" className="flex items-center justify-center px-2 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors">
                                                    Sinta
                                                </a>
                                            ) : (
                                                <div className="flex items-center justify-center px-2 py-1.5 bg-slate-50 text-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-not-allowed">
                                                    Sinta
                                                </div>
                                            )}
                                            
                                            {dosen.scopus_url ? (
                                                <a href={dosen.scopus_url} target="_blank" rel="noreferrer" className="flex items-center justify-center px-2 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors">
                                                    Scopus
                                                </a>
                                            ) : (
                                                <div className="flex items-center justify-center px-2 py-1.5 bg-slate-50 text-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-not-allowed">
                                                    Scopus
                                                </div>
                                            )}

                                            {dosen.gscholar_url ? (
                                                <a href={dosen.gscholar_url} target="_blank" rel="noreferrer" className="flex items-center justify-center px-2 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors">
                                                    Scholar
                                                </a>
                                            ) : (
                                                <div className="flex items-center justify-center px-2 py-1.5 bg-slate-50 text-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-wider cursor-not-allowed">
                                                    Scholar
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-slate-300 max-w-xl mx-auto p-8">
                            <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <h3 className="text-base font-semibold text-slate-800 mb-1">Dosen Tidak Ditemukan</h3>
                            <p className="text-slate-500 text-sm">Tidak ada dosen yang sesuai dengan kriteria pencarian atau filter yang dipilih.</p>
                        </div>
                    )}

                </div>
            </div>
        </PublicLayout>
    );
}
