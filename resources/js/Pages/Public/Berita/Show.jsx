import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import { Calendar, Eye, ArrowLeft, Image as ImageIcon, ChevronRight } from 'lucide-react';

export default function Show({ berita, recentBeritas }) {
    return (
        <PublicLayout>
            <Head title={berita.judul} />

            <div className="bg-slate-50 min-h-screen py-12 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Breadcrumb items={[
                            { label: 'Berita', url: '/berita' },
                            { label: berita.judul }
                        ]} />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Main Content */}
                        <div className="flex-1">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                {berita.gambar_url && (
                                    <div className="w-full aspect-[2/1] md:aspect-[21/9] bg-slate-100 relative">
                                        <img 
                                            src={berita.gambar_url} 
                                            alt={berita.judul} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                
                                <div className="p-6 md:p-10">
                                    <div className="flex items-center gap-6 text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
                                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                            <Calendar className="w-4 h-4 text-emerald-600" />
                                            {new Date(berita.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
                                        </div>
                                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                            <Eye className="w-4 h-4 text-emerald-600" />
                                            {berita.views} kali dibaca
                                        </div>
                                    </div>
                                    
                                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-8 leading-tight">
                                        {berita.judul}
                                    </h1>
                                    
                                    {/* Content Formatting */}
                                    <div className="prose prose-slate prose-emerald max-w-none prose-img:rounded-xl prose-img:shadow-sm prose-a:text-emerald-600 hover:prose-a:text-emerald-700">
                                        {/* Split content by newlines and wrap in paragraphs to ensure proper formatting if it's plain text */}
                                        {berita.konten.split('\n').map((paragraph, index) => (
                                            paragraph.trim() ? <p key={index} className="text-slate-700 leading-relaxed mb-4 text-justify">{paragraph}</p> : <br key={index} />
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="p-6 md:p-10 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                    <Link 
                                        href="/berita"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        Kembali ke Daftar Berita
                                    </Link>
                                    
                                    {/* Share Buttons Placeholder */}
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Bagikan:</span>
                                        <button className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white transition-colors">
                                            <i className="fa-brands fa-whatsapp"></i>
                                        </button>
                                        <button className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white transition-colors">
                                            <i className="fa-brands fa-facebook-f"></i>
                                        </button>
                                        <button className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white transition-colors">
                                            <i className="fa-brands fa-twitter"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar: Berita Terbaru */}
                        <div className="w-full lg:w-80 shrink-0">
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
                                <div className="p-5 border-b border-slate-100 bg-slate-50">
                                    <h3 className="font-extrabold text-slate-800 flex items-center gap-2">
                                        <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
                                        Berita Terbaru
                                    </h3>
                                </div>
                                <div className="p-5 divide-y divide-slate-100">
                                    {recentBeritas.length > 0 ? recentBeritas.map((recent) => (
                                        <Link 
                                            key={recent.id} 
                                            href={`/berita/${recent.slug}`}
                                            className="group block py-4 first:pt-0 last:pb-0"
                                        >
                                            <div className="flex gap-4">
                                                <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                                                    {recent.gambar_url ? (
                                                        <img 
                                                            src={recent.gambar_url} 
                                                            alt={recent.judul} 
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                            <ImageIcon className="w-6 h-6" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-700 text-sm leading-snug line-clamp-2 group-hover:text-emerald-600 transition-colors mb-2">
                                                        {recent.judul}
                                                    </h4>
                                                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                                        <Calendar className="w-3 h-3" />
                                                        {new Date(recent.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    )) : (
                                        <p className="text-sm text-slate-500 text-center py-4">Belum ada berita lainnya.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
