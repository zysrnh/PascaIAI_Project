import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import { Archive, Search, Filter, BookOpen, GraduationCap, ChevronRight } from 'lucide-react';

export default function Index({ repositories, prodis, tahuns, setting, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [prodi, setProdi] = useState(filters.prodi || '');
    const [jenis, setJenis] = useState(filters.jenis || '');
    const [tahun, setTahun] = useState(filters.tahun || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('public.lppm.repository'), { search, prodi, jenis, tahun }, { preserveState: true });
    };

    const resetFilters = () => {
        setSearch('');
        setProdi('');
        setJenis('');
        setTahun('');
        router.get(route('public.lppm.repository'));
    };

    return (
        <PublicLayout>
            <Head title={`${setting?.judul || 'Repository Karya Ilmiah'} | Pascasarjana IAI Persis Bandung`} />

            {/* Banner Section */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={setting?.banner_image || "/images/default-banner.jpg"} 
                        alt="Repository Banner" 
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md tracking-tight">
                        {setting?.judul || 'Repository'}
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                    <p className="text-white/90 max-w-2xl text-lg md:text-xl leading-relaxed drop-shadow">
                        {setting?.deskripsi || 'Arsip digital Tesis, Disertasi, dan karya ilmiah civitas akademika Pascasarjana IAI Persis Bandung.'}
                    </p>
                </div>
            </div>

            <Breadcrumb items={[
                { label: 'Penelitian & Pengabdian' },
                { label: 'Repository' }
            ]} />

            <div className="bg-slate-50 py-12 border-b border-slate-200 min-h-[600px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 items-start">
                    
                    {/* Sidebar / Filters */}
                    <div className="w-full lg:w-1/4 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24 animate-fade-in-up">
                        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Filter className="w-5 h-5 text-emerald-600" /> Filter Pencarian
                        </h2>
                        <form onSubmit={handleSearch} className="space-y-5">
                            
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Kata Kunci / Judul</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
                                        placeholder="Cari..."
                                    />
                                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Program Studi</label>
                                <select
                                    value={prodi}
                                    onChange={(e) => setProdi(e.target.value)}
                                    className="w-full border-slate-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
                                >
                                    <option value="">Semua Program Studi</option>
                                    {prodis.map(p => (
                                        <option key={p.id} value={p.id}>{p.jenjang} {p.nama}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Jenis Karya</label>
                                <select
                                    value={jenis}
                                    onChange={(e) => setJenis(e.target.value)}
                                    className="w-full border-slate-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
                                >
                                    <option value="">Semua Jenis</option>
                                    <option value="tesis">Tesis</option>
                                    <option value="disertasi">Disertasi</option>
                                    <option value="lainnya">Lainnya</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Tahun Lulus/Terbit</label>
                                <select
                                    value={tahun}
                                    onChange={(e) => setTahun(e.target.value)}
                                    className="w-full border-slate-300 rounded-lg text-sm focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
                                >
                                    <option value="">Semua Tahun</option>
                                    {tahuns.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="pt-4 flex flex-col gap-2">
                                <button type="submit" className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors shadow-md shadow-emerald-600/20 text-sm">
                                    Terapkan Filter
                                </button>
                                <button type="button" onClick={resetFilters} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors text-sm">
                                    Reset
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* Main Content Area */}
                    <div className="w-full lg:w-3/4 space-y-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                        
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-800">
                                Hasil Pencarian <span className="text-emerald-600 font-extrabold ml-1">({repositories.total})</span>
                            </h2>
                        </div>

                        {repositories.data.length > 0 ? (
                            <div className="space-y-4">
                                {repositories.data.map(repo => (
                                    <div key={repo.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors group">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            
                                            <div className="flex-1 space-y-3">
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md capitalize">
                                                        {repo.jenis}
                                                    </span>
                                                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md">
                                                        Tahun {repo.tahun}
                                                    </span>
                                                </div>
                                                
                                                <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors leading-tight">
                                                    <a href={route('public.lppm.repository.show', repo.id)} className="hover:underline focus:outline-none">
                                                        {repo.judul}
                                                    </a>
                                                </h3>
                                                
                                                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-slate-600">
                                                    <div className="flex items-center gap-1.5">
                                                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                                                        <span className="font-semibold text-slate-700">{repo.penulis_nama}</span> ({repo.penulis_nim})
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <BookOpen className="w-4 h-4 text-amber-600" />
                                                        <span>{repo.prodi?.jenjang} {repo.prodi?.nama}</span>
                                                    </div>
                                                </div>
                                                
                                                <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                                                    {repo.abstrak}
                                                </p>
                                            </div>

                                            <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 shrink-0">
                                                <a 
                                                    href={route('public.lppm.repository.show', repo.id)}
                                                    className="inline-flex items-center gap-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-colors"
                                                >
                                                    Lihat Detail <ChevronRight className="w-4 h-4" />
                                                </a>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                                <Archive className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-slate-700 mb-2">Tidak Ada Data Ditemukan</h3>
                                <p className="text-slate-500">Silakan gunakan kata kunci atau filter lain untuk mencari repository.</p>
                                <button onClick={resetFilters} className="mt-6 px-6 py-2 bg-emerald-100 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-200 transition-colors">
                                    Reset Pencarian
                                </button>
                            </div>
                        )}

                        {/* Pagination Component */}
                        {repositories.links.length > 3 && (
                            <div className="flex justify-center mt-10">
                                <div className="flex flex-wrap gap-1">
                                    {repositories.links.map((link, k) => (
                                        <button
                                            key={k}
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                link.active 
                                                    ? 'bg-emerald-600 text-white shadow-md' 
                                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-600'
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
            
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.4s ease-out forwards;
                }
            `}</style>
        </PublicLayout>
    );
}
