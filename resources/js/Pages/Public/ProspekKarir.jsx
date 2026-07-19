import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { ArrowRight, Briefcase, GraduationCap, Building2, BookOpen, PenTool, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ProspekKarir({ pengaturan, konten, karirs }) {
    const renderIcon = (iconName) => {
        const icons = {
            'Briefcase': <Briefcase className="w-5 h-5" />,
            'GraduationCap': <GraduationCap className="w-5 h-5" />,
            'Building2': <Building2 className="w-5 h-5" />,
            'BookOpen': <BookOpen className="w-5 h-5" />,
            'PenTool': <PenTool className="w-5 h-5" />,
            'Users': <Users className="w-5 h-5" />
        };
        return icons[iconName] || <Briefcase className="w-5 h-5" />;
    };

    return (
        <PublicLayout>
            <Head title="Prospek Karir - Pascasarjana IAI Persis Bandung" />

            {/* Banner Section */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={pengaturan?.banner_image || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop"}
                        alt="Prospek Karir Banner" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 animate-fade-in-up">
                     
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md tracking-tight">
                        Prospek Karir Lulusan
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm"></div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-slate-50 py-16 lg:py-24 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                        
                        {/* Left Column: Descriptions (70%) */}
                        <div className="lg:col-span-8 space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">
                                    Profil Lulusan dan Kompetensi Karir
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-lg mb-8 whitespace-pre-wrap">
                                    {konten?.deskripsi_utama || "Di era globalisasi dan tantangan revolusi industri 4.0, kebutuhan akan pakar pendidikan Islam yang adaptif, inovatif, dan moderat semakin meningkat. Lulusan Program Pascasarjana IAI Persis Bandung dibekali tidak hanya dengan kedalaman ilmu agama (tafaqquh fiddin), tetapi juga dengan metodologi riset mutakhir dan kemampuan manajerial."}
                                </p>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    Berbekal jaringan alumni yang luas dan kurikulum berbasis kompetensi, lulusan kami siap berkarir di berbagai posisi strategis. Berikut adalah peluang karir utama bagi lulusan kami:
                                </p>
                            </div>

                            {/* Prospek List */}
                            <div className="space-y-6">
                                {karirs && karirs.length > 0 ? (
                                    karirs.map((item, index) => (
                                        <div key={item.id} className="bg-white p-6 md:p-8 border-l-4 border-emerald-600 shadow-sm hover:shadow-md transition-shadow group flex gap-5 md:gap-6">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="w-12 h-12 bg-slate-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                                    {renderIcon(item.ikon)}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                                                    {item.urutan || index + 1}. {item.judul}
                                                </h3>
                                                <p className="text-slate-600 leading-relaxed">
                                                    {item.deskripsi}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-slate-500 bg-white border-l-4 border-emerald-600 shadow-sm">
                                        Data prospek karir belum tersedia.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Sidebar CTA (30%) */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* CDC Card - Solid Dark */}
                            <div className="bg-slate-900 text-white p-8 relative overflow-hidden group">
                                <div className="absolute -right-10 -top-10 text-slate-800 opacity-50 transform rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                    <Briefcase className="w-48 h-48" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-4 leading-snug">
                                        Pusat Karir & <br/> Pengembangan Alumni
                                    </h3>
                                    <p className="text-slate-400 mb-8 text-sm leading-relaxed whitespace-pre-wrap">
                                        {konten?.deskripsi_pusat_karir || "Kami terus memantau dan memfasilitasi lulusan kami melalui jaringan alumni yang kuat dan kemitraan strategis dengan berbagai lembaga."}
                                    </p>
                                    <a 
                                        href={konten?.tracer_study_url || "#"} 
                                        target={konten?.tracer_study_url ? "_blank" : "_self"}
                                        rel={konten?.tracer_study_url ? "noopener noreferrer" : ""}
                                        className="inline-flex items-center justify-center w-full bg-emerald-600 text-white px-6 py-3 font-semibold hover:bg-emerald-500 transition-colors gap-2"
                                    >
                                        Tracer Study
                                        <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Additional Info Box */}
                            <div className="bg-emerald-50 border border-emerald-200 p-8">
                                <h4 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                    Kualifikasi Global
                                </h4>
                                <ul className="space-y-3 text-sm text-emerald-800/80">
                                    {konten?.kualifikasi_global && konten.kualifikasi_global.length > 0 ? (
                                        konten.kualifikasi_global.map((kualifikasi, idx) => (
                                            <li key={idx} className="flex gap-3">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                                {kualifikasi}
                                            </li>
                                        ))
                                    ) : (
                                        <>
                                            <li className="flex gap-3">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                                Penguasaan Metodologi Riset Modern
                                            </li>
                                            <li className="flex gap-3">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                                Pemahaman Tafsir & Hadis Tematik
                                            </li>
                                            <li className="flex gap-3">
                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                                Manajemen Pendidikan Berbasis IT
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom CTA - Solid & Sharp */}
            <div className="bg-emerald-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Mulai Perjalanan Akademismu Bersama Kami
                    </h2>
                    <p className="text-emerald-200 max-w-2xl mx-auto mb-10 text-lg">
                        Tingkatkan kualifikasi akademis dan profesional Anda melalui program magister unggulan kami.
                    </p>
                    <a 
                        href="/#pendaftaran" 
                        className="inline-flex items-center gap-2 bg-white text-emerald-900 px-8 py-4 font-bold hover:bg-emerald-50 transition-colors shadow-xl"
                    >
                        Daftar Sekarang
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </div>

        </PublicLayout>
    );
}
