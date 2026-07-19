import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { BookOpen, GraduationCap, Users, UserCheck, FileText, Download, Target, Award } from 'lucide-react';

export default function Index({ programStudis, pengaturan }) {
    // Default banner if not set
    const defaultBanner = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop";
    const bannerUrl = pengaturan?.banner_image || defaultBanner;

    return (
        <PublicLayout>
            <Head title="Program Studi" />

            {/* Hero Section */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={bannerUrl} 
                        alt="Program Studi Banner" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md uppercase tracking-tight">
                        Program Studi
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-slate-50 py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {programStudis && programStudis.length > 0 ? (
                        <div className="space-y-8">
                            {programStudis.map((prodi, index) => (
                                <div key={prodi.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative group hover:shadow-md transition-all duration-300">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full -z-10 opacity-50 group-hover:scale-105 transition-transform duration-500"></div>
                                    
                                    {/* Header Prodi */}
                                    <div className="p-6 md:p-7 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-lg uppercase tracking-wider">
                                                    {prodi.jenjang}
                                                </span>
                                                {prodi.fakultas && (
                                                    <span className="text-slate-500 font-semibold text-sm tracking-wider uppercase">
                                                        {prodi.fakultas.nama}
                                                    </span>
                                                )}
                                            </div>
                                            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">{prodi.nama}</h2>
                                            <p className="text-lg text-emerald-600 font-bold">Gelar: {prodi.gelar_lulusan}</p>
                                        </div>
                                        
                                        <div className="flex gap-4 md:min-w-[400px]">
                                            <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Ketua Program Studi</p>
                                                <p className="text-slate-800 font-semibold text-sm">{prodi.kaprodi}</p>
                                            </div>
                                            {prodi.sekretaris && (
                                                <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-200">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Sekretaris Prodi</p>
                                                    <p className="text-slate-800 font-semibold text-sm">{prodi.sekretaris}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content Grid */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
                                        {/* Kolom Kiri: Profil & Visi Misi */}
                                        <div className="p-6 md:p-7 lg:col-span-2 space-y-6">
                                            {prodi.deskripsi && (
                                                <section>
                                                    <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
                                                        <BookOpen className="w-4 h-4 text-amber-500" /> Profil Singkat
                                                    </h3>
                                                    <p className="text-slate-600 text-sm leading-snug text-justify">
                                                        {prodi.deskripsi}
                                                    </p>
                                                </section>
                                            )}

                                            {prodi.visi_misi && (
                                                <section>
                                                    <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
                                                        <Target className="w-4 h-4 text-amber-500" /> Visi & Misi
                                                    </h3>
                                                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                        <div className="space-y-2">
                                                            {prodi.visi_misi.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                                                                <div key={i} className="flex items-start gap-2">
                                                                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                                                                    <p className="text-slate-600 text-sm leading-snug">{line.trim()}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </section>
                                            )}

                                            {prodi.cpl && (
                                                <section>
                                                    <h3 className="text-base font-bold text-slate-800 mb-2 flex items-center gap-2">
                                                        <Award className="w-4 h-4 text-amber-500" /> Capaian Lulusan
                                                    </h3>
                                                    <div className="space-y-2">
                                                        {prodi.cpl.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                                                            <div key={i} className="flex items-start gap-2">
                                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0"></div>
                                                                <p className="text-slate-600 text-sm leading-snug">{line.trim()}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>
                                            )}
                                        </div>

                                        {/* Kolom Kanan: Statistik, Kurikulum, Kontak */}
                                        <div className="p-6 md:p-7 space-y-6 bg-slate-50/30">
                                            {/* Statistik */}
                                            <section>
                                                <h3 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest mb-3">Statistik Akademik</h3>
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                                            <Users className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xl font-black text-slate-800 leading-none mb-1">{prodi.jumlah_mahasiswa || '-'}</p>
                                                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Mahasiswa Aktif</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                                            <UserCheck className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xl font-black text-slate-800 leading-none mb-1">{prodi.jumlah_dosen || '-'}</p>
                                                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Dosen Tetap</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                                                            <GraduationCap className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-xl font-black text-slate-800 leading-none mb-1">{prodi.jumlah_lulusan || '-'}</p>
                                                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Total Lulusan</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            {/* Info Tambahan */}
                                            {(prodi.biaya_kuliah || prodi.email || prodi.telepon) && (
                                                <section className="pt-5 border-t border-slate-200">
                                                    <h3 className="text-[11px] font-bold text-slate-800 uppercase tracking-widest mb-3">Informasi Tambahan</h3>
                                                    <div className="space-y-2">
                                                        {prodi.biaya_kuliah && (
                                                            <div>
                                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Biaya Kuliah</p>
                                                                <p className="text-sm font-semibold text-slate-700 mt-0.5">{prodi.biaya_kuliah}</p>
                                                            </div>
                                                        )}
                                                        {prodi.email && (
                                                            <div>
                                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email</p>
                                                                <a href={`mailto:${prodi.email}`} className="text-sm font-semibold text-emerald-600 hover:underline mt-0.5 block">{prodi.email}</a>
                                                            </div>
                                                        )}
                                                        {prodi.telepon && (
                                                            <div>
                                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Kontak</p>
                                                                <p className="text-sm font-semibold text-slate-700 mt-0.5">{prodi.telepon}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </section>
                                            )}

                                            {/* Kurikulum Download */}
                                            {prodi.kurikulum_url && (
                                                <section className="pt-5 border-t border-slate-200">
                                                    <a 
                                                        href={prodi.kurikulum_url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="w-full inline-flex items-center justify-between px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors group shadow-sm"
                                                    >
                                                        <span className="flex items-center gap-2 text-sm font-bold">
                                                            <FileText className="w-4 h-4 opacity-90" />
                                                            Unduh Kurikulum
                                                        </span>
                                                        <Download className="w-4 h-4 opacity-70 group-hover:scale-110 transition-transform" />
                                                    </a>
                                                </section>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-24 text-center">
                            <div className="bg-white border border-slate-200 border-dashed rounded-2xl p-12 max-w-2xl mx-auto flex flex-col items-center justify-center">
                                <GraduationCap className="w-16 h-16 text-slate-300 mb-4" />
                                <h3 className="text-2xl font-bold text-slate-700 mb-2">Belum Ada Data Program Studi</h3>
                                <p className="text-slate-500">
                                    Informasi mengenai daftar program studi sedang dalam proses pembaruan. Silakan kembali lagi nanti.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
