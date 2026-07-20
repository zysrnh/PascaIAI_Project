import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import { Newspaper, Calendar, ArrowRight, Eye, Image as ImageIcon } from 'lucide-react';

export default function Index({ beritas, pengaturan }) {
    const defaultBanner = "/images/default-banner.jpg";
    const bannerUrl = pengaturan?.banner_image || defaultBanner;

    return (
        <PublicLayout>
            <Head title="Berita & Artikel" />

            {/* Hero Section */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={bannerUrl} 
                        alt="Banner Berita" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md uppercase tracking-tight">
                        Berita & Artikel
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                    {pengaturan?.deskripsi && (
                        <p className="text-white/90 max-w-2xl text-base md:text-lg leading-relaxed drop-shadow">
                            {pengaturan.deskripsi}
                        </p>
                    )}
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Berita' }
            ]} />

            {/* Main Content */}
            <div className="bg-slate-50 py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {beritas.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {beritas.data.map((berita) => (
                                    <div key={berita.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col">
                                        <div className="aspect-video bg-slate-100 relative overflow-hidden">
                                            {berita.gambar_url ? (
                                                <img 
                                                    src={berita.gambar_url} 
                                                    alt={berita.judul} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <ImageIcon className="w-12 h-12" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-4 h-4 text-emerald-600" />
                                                    {new Date(berita.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Eye className="w-4 h-4 text-emerald-600" />
                                                    {berita.views} x
                                                </div>
                                            </div>
                                            
                                            <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                                                <Link href={`/berita/${berita.slug}`}>
                                                    {berita.judul}
                                                </Link>
                                            </h3>
                                            
                                            <p className="text-slate-600 text-sm line-clamp-3 mb-6">
                                                {berita.konten.replace(/<[^>]+>/g, '')}
                                            </p>
                                            
                                            <div className="mt-auto pt-4 border-t border-slate-100">
                                                <Link 
                                                    href={`/berita/${berita.slug}`}
                                                    className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700 group/link"
                                                >
                                                    Baca Selengkapnya
                                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {beritas.last_page > 1 && (
                                <div className="flex justify-center mt-12">
                                    <div className="flex gap-1">
                                        {beritas.links.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                                    link.active 
                                                        ? 'bg-emerald-600 text-white' 
                                                        : link.url
                                                            ? 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                                                            : 'bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-200'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-24 text-center">
                            <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-12 max-w-2xl mx-auto flex flex-col items-center justify-center">
                                <Newspaper className="w-16 h-16 text-slate-300 mb-4" />
                                <h3 className="text-2xl font-bold text-slate-700 mb-2">Belum Ada Berita</h3>
                                <p className="text-slate-500">
                                    Belum ada berita atau artikel yang dipublikasikan saat ini.
                                </p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </PublicLayout>
    );
}
