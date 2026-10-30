import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import { Book, Bookmark, ExternalLink, GraduationCap, Library, FileText, CheckCircle2 } from 'lucide-react';

export default function Publikasi({ publikasi }) {
    const data = publikasi || {
        judul: 'Publikasi (Jurnal & Buku)',
        deskripsi_banner: '',
        banner_image: '/images/default-banner.jpg',
        deskripsi_jurnal: '',
        jurnals: [],
        deskripsi_buku: '',
        bukus: [],
        deskripsi_artikel: '',
        artikels: [],
    };

    return (
        <PublicLayout>
            <Head title="Publikasi Ilmiah, Jurnal & Buku | LPPM IAI Persis Bandung" />

            {/* Dark Minimalist Hero Section */}
            <div className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.18] tracking-tight mb-4">
                        Publikasi <span className="font-serif italic font-normal text-emerald-300">Jurnal & Buku</span>
                    </h1>
                    <p className="text-slate-300/90 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
                        {data.deskripsi_banner || 'Direktori jurnal ilmiah institusi, publikasi buku karya dosen, dan artikel hasil penelitian civitas akademika.'}
                    </p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Riset & PkM' },
                { label: 'Publikasi Ilmiah' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFBFD] py-12 lg:py-16 border-b border-slate-200/80 min-h-[550px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    
                    {/* 1. Jurnal Institusi Section */}
                    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 flex items-center justify-center shrink-0">
                                <Library className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
                                    Jurnal Ilmiah Institusi
                                </h2>
                                <p className="text-xs text-slate-500">
                                    {data.deskripsi_jurnal || 'Daftar jurnal ilmiah berkala terbitan Program Pascasarjana IAI Persis Bandung.'}
                                </p>
                            </div>
                        </div>

                        {data.jurnals && data.jurnals.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {data.jurnals.map((jurnal, idx) => (
                                    <div key={idx} className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-emerald-300 transition-all duration-200 hover:-translate-y-0.5 shadow-2xs flex flex-col justify-between group">
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-2">
                                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200/60">
                                                    ISSN: {jurnal.issn || '-'}
                                                </span>
                                                {jurnal.indexing && (
                                                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                                        {jurnal.indexing}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                                                {jurnal.nama}
                                            </h3>
                                            {jurnal.fokus_cakupan && (
                                                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                                                    {jurnal.fokus_cakupan}
                                                </p>
                                            )}
                                        </div>

                                        {jurnal.link && (
                                            <div className="pt-4 mt-4 border-t border-slate-200/60">
                                                <a 
                                                    href={jurnal.link} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                                                >
                                                    <span>Kunjungi Laman Jurnal (OJS)</span>
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400 italic">Belum ada data jurnal yang dipublikasikan.</p>
                        )}
                    </section>

                    {/* 2. Buku Karya Dosen Section */}
                    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center shrink-0">
                                <Book className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
                                    Buku Karya Dosen
                                </h2>
                                <p className="text-xs text-slate-500">
                                    {data.deskripsi_buku || 'Monograf, buku referensi, dan buku ajar yang ditulis oleh para dosen.'}
                                </p>
                            </div>
                        </div>

                        {data.bukus && data.bukus.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {data.bukus.map((buku, idx) => (
                                    <div key={idx} className="rounded-2xl border border-slate-200/80 hover:border-emerald-300 p-4 bg-slate-50/50 hover:bg-white transition-all duration-200 hover:-translate-y-0.5 shadow-2xs flex flex-col justify-between group">
                                        <div>
                                            <div className="aspect-3/4 rounded-xl overflow-hidden bg-slate-200 mb-3 border border-slate-200">
                                                {buku.cover_image ? (
                                                    <img src={buku.cover_image} alt={buku.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                                ) : (
                                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                                                        <Book className="w-10 h-10 mb-2 opacity-40" />
                                                        <span className="text-xs font-medium">Tanpa Sampul</span>
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                                                {buku.judul}
                                            </h3>
                                            <p className="text-xs text-slate-600 mt-1 font-medium truncate">
                                                {buku.penulis}
                                            </p>
                                            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                                                <span>{buku.penerbit || 'Penerbit'}</span>
                                                {buku.tahun && <span>&bull; {buku.tahun}</span>}
                                            </div>
                                        </div>

                                        {buku.isbn && (
                                            <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                                                <span>ISBN</span>
                                                <span className="font-mono text-slate-700 font-semibold">{buku.isbn}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-slate-400 italic">Belum ada data buku karya dosen yang dipublikasikan.</p>
                        )}
                    </section>

                    {/* 3. Artikel Ilmiah Section */}
                    {data.artikels && data.artikels.length > 0 && (
                        <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center shrink-0">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
                                        Artikel Ilmiah Terindeks
                                    </h2>
                                    <p className="text-xs text-slate-500">
                                        {data.deskripsi_artikel || 'Karya publikasi pada prosiding dan jurnal ilmiah bereputasi.'}
                                    </p>
                                </div>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {data.artikels.map((artikel, idx) => (
                                    <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm sm:text-base font-semibold text-slate-900 hover:text-emerald-700 transition-colors">
                                                {artikel.judul}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                                                <span className="font-medium text-slate-700">{artikel.penulis}</span>
                                                <span>&bull;</span>
                                                <span className="italic">{artikel.nama_jurnal}</span>
                                                {artikel.tahun && (
                                                    <>
                                                        <span>&bull;</span>
                                                        <span>{artikel.tahun}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        {artikel.link && (
                                            <a 
                                                href={artikel.link} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors shrink-0"
                                            >
                                                <span>Akses Artikel</span>
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </div>
        </PublicLayout>
    );
}
