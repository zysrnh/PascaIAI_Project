import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import { Book, Bookmark, ExternalLink, GraduationCap, Library } from 'lucide-react';

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
        links_scholar: []
    };

    return (
        <PublicLayout>
            <Head title={`${data.judul} | Pascasarjana IAI Persis Bandung`} />

            {/* Banner Section */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={data.banner_image || '/images/default-banner.jpg'} 
                        alt="Publikasi Banner" 
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md tracking-tight">
                        {data.judul}
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                    {data.deskripsi_banner && (
                        <p className="text-white/90 max-w-2xl text-lg md:text-xl leading-relaxed drop-shadow">
                            {data.deskripsi_banner}
                        </p>
                    )}
                </div>
            </div>

            <Breadcrumb items={[
                { label: 'Penelitian & Pengabdian' },
                { label: 'Publikasi' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                    
                    {/* Jurnal Institusi */}
                    <section className="animate-fade-in-up">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <div className="inline-flex items-center justify-center p-3 bg-emerald-100 text-emerald-600 rounded-2xl mb-4">
                                <Library className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Jurnal Institusi</h2>
                            {data.deskripsi_jurnal && (
                                <p className="mt-4 text-slate-600 leading-relaxed text-lg">{data.deskripsi_jurnal}</p>
                            )}
                        </div>

                        {data.jurnals && data.jurnals.length > 0 && data.jurnals[0].nama_jurnal && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {data.jurnals.map((jurnal, idx) => (
                                    <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
                                        <div className="p-6 flex-1">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-xl font-bold text-emerald-900 group-hover:text-emerald-600 transition-colors">{jurnal.nama_jurnal}</h3>
                                                {jurnal.sinta && (
                                                    <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full whitespace-nowrap">
                                                        {jurnal.sinta}
                                                    </span>
                                                )}
                                            </div>
                                            {jurnal.issn && (
                                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                                                    <Bookmark className="w-4 h-4" />
                                                    <span>ISSN: {jurnal.issn}</span>
                                                </div>
                                            )}
                                        </div>
                                        {jurnal.link_ojs && (
                                            <a href={jurnal.link_ojs} target="_blank" rel="noreferrer" className="block w-full text-center py-4 bg-slate-50 text-emerald-700 font-semibold text-sm border-t border-slate-100 hover:bg-emerald-600 hover:text-white transition-colors">
                                                Kunjungi OJS <ExternalLink className="inline w-4 h-4 ml-1 mb-0.5" />
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Buku Karya Dosen */}
                    <section className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <div className="inline-flex items-center justify-center p-3 bg-amber-100 text-amber-600 rounded-2xl mb-4">
                                <Book className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Buku Karya Dosen</h2>
                            {data.deskripsi_buku && (
                                <p className="mt-4 text-slate-600 leading-relaxed text-lg">{data.deskripsi_buku}</p>
                            )}
                        </div>

                        {data.bukus && data.bukus.length > 0 && data.bukus[0].judul && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {data.bukus.map((buku, idx) => (
                                    <div key={idx} className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors">
                                        <div className="hidden sm:flex w-24 h-32 bg-slate-100 rounded-lg items-center justify-center text-slate-300 shrink-0">
                                            <Book className="w-10 h-10" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight">{buku.judul}</h3>
                                            <p className="text-emerald-700 font-medium mb-3">{buku.penulis}</p>
                                            
                                            <div className="grid grid-cols-2 gap-2 text-sm text-slate-600 mb-4">
                                                <div><span className="font-semibold text-slate-500">Tahun:</span> {buku.tahun || '-'}</div>
                                                <div><span className="font-semibold text-slate-500">Penerbit:</span> {buku.penerbit || '-'}</div>
                                                <div className="col-span-2"><span className="font-semibold text-slate-500">ISBN:</span> {buku.isbn || '-'}</div>
                                            </div>
                                            
                                            {buku.link && (
                                                <a href={buku.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-semibold text-amber-600 hover:text-amber-700">
                                                    Lihat Buku <ExternalLink className="w-4 h-4 ml-1" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Profil Riset Dosen */}
                    <section className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                        <div className="bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-3xl p-8 md:p-12 text-white shadow-xl">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
                                <div className="max-w-2xl text-center md:text-left">
                                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-2xl mb-4">
                                        <GraduationCap className="w-8 h-8 text-amber-400" />
                                    </div>
                                    <h2 className="text-3xl font-extrabold tracking-tight mb-4">Profil Riset & Artikel Dosen</h2>
                                    {data.deskripsi_artikel ? (
                                        <p className="text-emerald-100/90 text-lg leading-relaxed">{data.deskripsi_artikel}</p>
                                    ) : (
                                        <p className="text-emerald-100/90 text-lg leading-relaxed">
                                            Kunjungi profil akademik dosen kami untuk melihat seluruh publikasi artikel ilmiah yang telah diterbitkan pada berbagai jurnal nasional dan internasional.
                                        </p>
                                    )}
                                </div>
                            </div>

                            {data.links_scholar && data.links_scholar.length > 0 && data.links_scholar[0].nama_dosen && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {data.links_scholar.map((scholar, idx) => (
                                        <div key={idx} className="bg-white/10 hover:bg-white/20 p-5 rounded-2xl border border-white/10 transition-colors flex flex-col justify-between">
                                            <h4 className="font-bold text-lg mb-4">{scholar.nama_dosen}</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {scholar.link_scholar && (
                                                    <a href={scholar.link_scholar} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-emerald-900 rounded-lg text-sm font-semibold hover:bg-emerald-50 transition-colors">
                                                        Google Scholar
                                                    </a>
                                                )}
                                                {scholar.link_scopus && (
                                                    <a href={scholar.link_scopus} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white rounded-lg text-sm font-semibold hover:bg-amber-400 transition-colors">
                                                        Scopus / Sinta
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

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
