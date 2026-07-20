import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';
import { Download, Users, Lightbulb, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Index({ lppm }) {
    // Default fallback values if no data yet
    const data = lppm || {
        profil_singkat: 'Lembaga Penelitian dan Pengabdian kepada Masyarakat (LPPM) IAI Persis Bandung...',
        sejarah: '',
        dasar_hukum: '',
        tupoksi_utama: '',
        visi: '',
        misi: '',
        struktur_organisasi: [],
        renstra_text: '',
        kontak: { email: '', telepon: '', alamat: '' },
        deskripsi_banner: '',
        banner_image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop'
    };

    return (
        <PublicLayout>
            <Head title={`LPPM | Pascasarjana IAI Persis Bandung`} />

            {/* Banner Section */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={data.banner_image || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1600&auto=format&fit=crop'} 
                        alt="LPPM Banner" 
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md tracking-tight">
                        Lembaga Penelitian dan Pengabdian kepada Masyarakat
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                    {data.deskripsi_banner && (
                        <p className="text-white/90 max-w-2xl text-lg md:text-xl leading-relaxed drop-shadow">
                            {data.deskripsi_banner}
                        </p>
                    )}
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Penelitian & Pengabdian' },
                { label: 'LPPM' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200 min-h-[500px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                        
                        {/* Main Info Column (Left 2/3) */}
                        <div className="lg:col-span-2 space-y-12 animate-fade-in-up">
                            
                            {/* Profil Singkat */}
                            <section>
                                <h2 className="text-3xl font-extrabold text-emerald-950 mb-6 tracking-tight flex items-center gap-3">
                                    <Lightbulb className="w-8 h-8 text-amber-500" />
                                    Profil LPPM
                                </h2>
                                <div className="prose prose-lg prose-emerald text-slate-700">
                                    <p className="whitespace-pre-line">{data.profil_singkat}</p>
                                </div>
                            </section>

                            {/* Visi Misi */}
                            {(data.visi || data.misi) && (
                                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {data.visi && (
                                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                            <h3 className="text-xl font-bold text-emerald-900 mb-4 border-b border-slate-100 pb-3">Visi</h3>
                                            <p className="text-slate-700 italic whitespace-pre-line">{data.visi}</p>
                                        </div>
                                    )}
                                    {data.misi && (
                                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                            <h3 className="text-xl font-bold text-emerald-900 mb-4 border-b border-slate-100 pb-3">Misi</h3>
                                            <p className="text-slate-700 whitespace-pre-line">{data.misi}</p>
                                        </div>
                                    )}
                                </section>
                            )}

                            {/* Sejarah & Dasar Hukum */}
                            {(data.sejarah || data.dasar_hukum || data.tupoksi_utama) && (
                                <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                                    <div className="p-8 space-y-8">
                                        {data.sejarah && (
                                            <div>
                                                <h3 className="text-xl font-bold text-emerald-900 mb-3">Sejarah Singkat</h3>
                                                <p className="text-slate-700 whitespace-pre-line">{data.sejarah}</p>
                                            </div>
                                        )}
                                        {data.dasar_hukum && (
                                            <div>
                                                <h3 className="text-xl font-bold text-emerald-900 mb-3">Dasar Hukum Pendirian</h3>
                                                <p className="text-slate-700 whitespace-pre-line">{data.dasar_hukum}</p>
                                            </div>
                                        )}
                                        {data.tupoksi_utama && (
                                            <div>
                                                <h3 className="text-xl font-bold text-emerald-900 mb-3">Tugas Pokok & Fungsi (Tupoksi)</h3>
                                                <p className="text-slate-700 whitespace-pre-line">{data.tupoksi_utama}</p>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Struktur Organisasi */}
                            {data.struktur_organisasi && data.struktur_organisasi.length > 0 && data.struktur_organisasi[0].jabatan && (
                                <section>
                                    <h2 className="text-2xl font-extrabold text-emerald-950 mb-6 tracking-tight flex items-center gap-3">
                                        <Users className="w-7 h-7 text-emerald-600" />
                                        Struktur Organisasi
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {data.struktur_organisasi.map((item, index) => (
                                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-emerald-200 transition-colors">
                                                <h4 className="text-sm font-bold text-amber-600 uppercase tracking-wider mb-1">{item.jabatan}</h4>
                                                <p className="text-lg font-semibold text-slate-800">{item.nama}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                        </div>

                        {/* Sidebar Column (Right 1/3) */}
                        <div className="space-y-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                            
                            {/* Renstra & SK Card */}
                            <div className="bg-emerald-900 rounded-3xl p-8 text-white shadow-xl">
                                <h3 className="text-2xl font-bold mb-4">Dokumen Penting</h3>
                                
                                {data.renstra_text && (
                                    <p className="text-emerald-100 mb-6 text-sm leading-relaxed">
                                        {data.renstra_text}
                                    </p>
                                )}
                                
                                <div className="space-y-3">
                                    {data.renstra_file && (
                                        <a href={data.renstra_file} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors group">
                                            <div className="bg-amber-500 p-2 rounded-lg text-emerald-950 group-hover:scale-110 transition-transform">
                                                <Download className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white group-hover:text-amber-300 transition-colors">Renstra Penelitian</h4>
                                                <p className="text-xs text-emerald-200/70">Unduh PDF</p>
                                            </div>
                                        </a>
                                    )}
                                    
                                    {data.sk_ketua_file && (
                                        <a href={data.sk_ketua_file} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-colors group">
                                            <div className="bg-emerald-700 p-2 rounded-lg text-emerald-100 group-hover:scale-110 transition-transform">
                                                <Download className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-white">SK Ketua LPPM</h4>
                                                <p className="text-xs text-emerald-200/70">Unduh PDF</p>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Kontak Card */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                                <h3 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Kontak LPPM</h3>
                                
                                <ul className="space-y-6">
                                    {data.kontak?.email && (
                                        <li className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-500">Email</h4>
                                                <a href={`mailto:${data.kontak.email}`} className="text-slate-800 hover:text-blue-600 font-medium">{data.kontak.email}</a>
                                            </div>
                                        </li>
                                    )}
                                    
                                    {data.kontak?.telepon && (
                                        <li className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-500">Telepon / WhatsApp</h4>
                                                <a href={`tel:${data.kontak.telepon}`} className="text-slate-800 hover:text-emerald-600 font-medium">{data.kontak.telepon}</a>
                                            </div>
                                        </li>
                                    )}

                                    {data.kontak?.alamat && (
                                        <li className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-500">Alamat Kantor</h4>
                                                <p className="text-slate-800 font-medium leading-relaxed">{data.kontak.alamat}</p>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>

                        </div>
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
