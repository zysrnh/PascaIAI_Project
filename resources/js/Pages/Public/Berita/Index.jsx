import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import { Newspaper, Calendar, ArrowRight, Eye } from 'lucide-react';

export default function Index({ beritas, pengaturan }) {
    return (
        <PublicLayout>
            <Head title="Berita & Artikel | Program Studi KPI IAI Persis Bandung" />

            {/* Dark Minimalist Hero Section */}
            <div className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.18] tracking-tight mb-4">
                        Warta & <span className="font-serif italic font-normal text-emerald-300">Artikel Berita</span>
                    </h1>
                    <p className="text-slate-300/90 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
                        {pengaturan?.deskripsi || 'Kabar terkini, liputan kegiatan akademik, artikel ilmiah, dan pengumuman resmi Program Studi KPI IAI Persis Bandung.'}
                    </p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Berita & Artikel' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFBFD] py-12 lg:py-16 border-b border-slate-200/80 min-h-[550px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {beritas.data && beritas.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                                {beritas.data.map((berita) => (
                                    <div 
                                        key={berita.id} 
                                        className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1"
                                    >
                                        {/* Card Thumbnail / Editorial Fallback */}
                                        <div className="aspect-video relative overflow-hidden bg-slate-900">
                                            {berita.gambar_url ? (
                                                <img 
                                                    src={berita.gambar_url} 
                                                    alt={berita.judul} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-[#0B132B] via-[#1C2541] to-[#070D1F] flex items-center justify-center p-6 relative overflow-hidden">
                                                    <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-emerald-500/15 blur-xl pointer-events-none"></div>
                                                    <div className="relative text-center flex flex-col items-center">
                                                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-emerald-300 mb-2 shadow-xs group-hover:scale-110 transition-transform">
                                                            <Newspaper className="w-6 h-6" />
                                                        </div>
                                                        <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-300">
                                                            Kabar KPI Persis
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Body */}
                                        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                                                    <div className="flex items-center gap-1.5 font-medium">
                                                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                                                        <span>{new Date(berita.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</span>
                                                    </div>
                                                    <span>&bull;</span>
                                                    <div className="flex items-center gap-1.5">
                                                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                                                        <span>{berita.views || 0} dibaca</span>
                                                    </div>
                                                </div>
                                                
                                                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2.5 line-clamp-2 group-hover:text-emerald-700 transition-colors leading-snug">
                                                    <Link href={`/berita/${berita.slug}`}>
                                                        {berita.judul}
                                                    </Link>
                                                </h3>
                                                
                                                <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                                                    {berita.konten ? berita.konten.replace(/<[^>]+>/g, '') : ''}
                                                </p>
                                            </div>
                                            
                                            <div className="pt-3 border-t border-slate-100 mt-2">
                                                <Link 
                                                    href={`/berita/${berita.slug}`}
                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors group/link"
                                                >
                                                    <span>Baca Selengkapnya</span>
                                                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {beritas.last_page > 1 && (
                                <div className="flex justify-center pt-4">
                                    <div className="flex flex-wrap gap-1">
                                        {beritas.links.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.url || '#'}
                                                className={`px-3.5 py-2 text-xs font-medium rounded-xl transition-colors ${
                                                    link.active 
                                                        ? 'bg-emerald-600 text-white shadow-2xs' 
                                                        : link.url
                                                            ? 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/80 hover:border-emerald-300'
                                                            : 'bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-200/60'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white rounded-2xl border border-slate-200/80 p-16 text-center max-w-xl mx-auto shadow-2xs">
                            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-slate-800 mb-1">Belum Ada Warta</h3>
                            <p className="text-xs sm:text-sm text-slate-500">
                                Saat ini belum ada artikel atau berita yang dipublikasikan.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </PublicLayout>
    );
}
