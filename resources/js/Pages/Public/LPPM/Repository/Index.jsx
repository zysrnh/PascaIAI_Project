import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import { Archive, Search, Filter, BookOpen, GraduationCap, ChevronRight, RotateCcw } from 'lucide-react';

export default function Index({ repositories, prodis, tahuns, setting, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [prodi, setProdi] = useState(filters.prodi || '');
    const [jenis, setJenis] = useState(filters.jenis || '');
    const [tahun, setTahun] = useState(filters.tahun || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('public.lppm.repository'), {
            search: search || undefined,
            prodi: prodi || undefined,
            jenis: jenis || undefined,
            tahun: tahun || undefined,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        setSearch('');
        setProdi('');
        setJenis('');
        setTahun('');
        router.get(route('public.lppm.repository'), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <PublicLayout>
            <Head title="Arsip Digital & Repository Ilmiah | LPPM IAI Persis Bandung" />

            {/* Dark Minimalist Hero Section */}
            <div className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.18] tracking-tight mb-4">
                        Arsip Digital & <span className="font-serif italic font-normal text-emerald-300">Repository Ilmiah</span>
                    </h1>
                    <p className="text-slate-300/90 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
                        {setting?.deskripsi_banner || 'Arsip digital tesis, disertasi, laporan penelitian, dan karya ilmiah civitas akademika Pascasarjana IAI Persis Bandung.'}
                    </p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Riset & PkM' },
                { label: 'Repository Ilmiah' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFBFD] py-12 lg:py-16 border-b border-slate-200/80 min-h-[550px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        
                        {/* Sidebar Filter (Bento Card) */}
                        <div className="w-full lg:w-1/4 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 shrink-0">
                            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
                                <Filter className="w-4 h-4 text-emerald-600" />
                                <h3 className="font-semibold text-slate-900 text-sm">
                                    Filter Pencarian
                                </h3>
                            </div>

                            <form onSubmit={handleFilter} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                        Kata Kunci / Judul
                                    </label>
                                    <div className="relative">
                                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input 
                                            type="text" 
                                            placeholder="Cari judul / penulis..." 
                                            value={search}
                                            onChange={e => setSearch(e.target.value)}
                                            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                        Program Studi
                                    </label>
                                    <select 
                                        value={prodi}
                                        onChange={e => setProdi(e.target.value)}
                                        className="w-full px-3 py-2 text-sm bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    >
                                        <option value="">Semua Program Studi</option>
                                        {prodis.map(p => (
                                            <option key={p.id} value={p.id}>{p.jenjang} {p.nama}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                        Jenis Karya
                                    </label>
                                    <select 
                                        value={jenis}
                                        onChange={e => setJenis(e.target.value)}
                                        className="w-full px-3 py-2 text-sm bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    >
                                        <option value="">Semua Jenis</option>
                                        <option value="tesis">Tesis</option>
                                        <option value="disertasi">Disertasi</option>
                                        <option value="artikel">Artikel Jurnal</option>
                                        <option value="buku">Buku</option>
                                        <option value="laporan">Laporan Penelitian</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                        Tahun Lulus/Terbit
                                    </label>
                                    <select 
                                        value={tahun}
                                        onChange={e => setTahun(e.target.value)}
                                        className="w-full px-3 py-2 text-sm bg-slate-50/70 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                    >
                                        <option value="">Semua Tahun</option>
                                        {tahuns.map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="pt-2 space-y-2">
                                    <button 
                                        type="submit" 
                                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs transition-colors shadow-2xs"
                                    >
                                        Terapkan Filter
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={resetFilters} 
                                        className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                        <span>Reset Filter</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Main Results Column */}
                        <div className="w-full lg:w-3/4 space-y-5">
                            
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                                    <span>Hasil Repository</span>
                                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                        {repositories.total}
                                    </span>
                                </h2>
                            </div>

                            {repositories.data.length > 0 ? (
                                <div className="space-y-4">
                                    {repositories.data.map(repo => (
                                        <div key={repo.id} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 hover:border-emerald-300 transition-all duration-200 shadow-2xs hover:shadow-xs group">
                                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                                
                                                <div className="flex-1 space-y-2.5">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[11px] font-bold rounded-lg uppercase tracking-wider">
                                                            {repo.jenis}
                                                        </span>
                                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[11px] font-medium rounded-lg">
                                                            Tahun {repo.tahun}
                                                        </span>
                                                        {repo.prodi && (
                                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200/60 text-[11px] font-medium rounded-lg">
                                                                {repo.prodi.jenjang} {repo.prodi.nama}
                                                            </span>
                                                        )}
                                                    </div>
                                                    
                                                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                                                        <a href={route('public.lppm.repository.show', repo.id)} className="hover:underline focus:outline-none">
                                                            {repo.judul}
                                                        </a>
                                                    </h3>
                                                    
                                                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                                                        <div className="flex items-center gap-1.5">
                                                            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                                                            <span className="font-semibold text-slate-700">{repo.penulis_nama}</span>
                                                            {repo.penulis_nim && <span className="text-slate-400">({repo.penulis_nim})</span>}
                                                        </div>
                                                    </div>
                                                    
                                                    {repo.abstrak && (
                                                        <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 leading-relaxed pt-1">
                                                            {repo.abstrak}
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="shrink-0 self-end sm:self-center">
                                                    <a 
                                                        href={route('public.lppm.repository.show', repo.id)}
                                                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl transition-colors shadow-2xs"
                                                    >
                                                        <span>Lihat Berkas</span>
                                                        <ChevronRight className="w-3.5 h-3.5" />
                                                    </a>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
                                    <Archive className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                    <h3 className="text-base font-semibold text-slate-800 mb-1">Tidak Ada Data Ditemukan</h3>
                                    <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                                        Silakan gunakan kata kunci atau kriteria filter lain untuk menemukan karya ilmiah.
                                    </p>
                                    <button 
                                        onClick={resetFilters} 
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl text-xs transition-colors"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                        <span>Reset Pencarian</span>
                                    </button>
                                </div>
                            )}

                            {/* Pagination Component */}
                            {repositories.links && repositories.links.length > 3 && (
                                <div className="flex justify-center pt-6">
                                    <div className="flex flex-wrap gap-1">
                                        {repositories.links.map((link, k) => (
                                            <button
                                                key={k}
                                                onClick={() => link.url && router.get(link.url)}
                                                disabled={!link.url}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                                    link.active 
                                                        ? 'bg-emerald-600 text-white shadow-2xs' 
                                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-700 disabled:opacity-50 disabled:hover:bg-white'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
