import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { ChevronRight, ArrowRight, Building2, BookOpen, GraduationCap } from 'lucide-react';

export default function Index({ fakultas, pengaturan }) {
    // Default banner if not set
    const defaultBanner = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop";
    const bannerUrl = pengaturan?.banner_image || defaultBanner;

    return (
        <PublicLayout>
            <Head title="Daftar Fakultas" />

            {/* Hero Section with Dynamic Background */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={bannerUrl} 
                        alt="Fakultas Banner" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md uppercase tracking-tight">
                        Daftar Fakultas
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                    {pengaturan?.deskripsi && (
                        <p className="text-white/90 max-w-2xl text-base md:text-lg leading-relaxed drop-shadow">
                            {pengaturan.deskripsi}
                        </p>
                    )}
                </div>
            </div>

            {/* Main Content - Full width alternating rows */}
            <div className="w-full">
                {fakultas && fakultas.length > 0 ? (
                    fakultas.map((item, index) => {
                        // Alternate layout: zigzag pattern
                        const isEven = index % 2 === 0;
                        const bgColor = item.warna_bg || (isEven ? '#4a5d23' : '#6b4c3a');
                        const displayIndex = (index + 1).toString().padStart(2, '0');
                        
                        return (
                            <div 
                                key={item.id} 
                                className={`w-full min-h-[500px] flex flex-col items-stretch relative group overflow-hidden ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                style={{ backgroundColor: bgColor }}
                            >
                                {/* Left/Right Side: Image & Title */}
                                <div className="w-full md:w-5/12 lg:w-1/2 relative overflow-hidden flex items-center justify-center p-12 lg:p-24 min-h-[400px]">
                                    {/* Image Background */}
                                    {item.gambar_url ? (
                                        <div 
                                            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000 mix-blend-luminosity hover:mix-blend-normal"
                                            style={{ backgroundImage: `url(${item.gambar_url})` }}
                                        ></div>
                                    ) : (
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700"></div>
                                    )}
                                    
                                    {/* Gradient overlay to blend with content side */}
                                    <div className={`absolute inset-0 opacity-90 hidden md:block ${isEven ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-transparent to-[var(--bg-color)]`} style={{ '--bg-color': bgColor }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] to-transparent opacity-90 md:hidden" style={{ '--bg-color': bgColor }}></div>

                                    {/* Title Content */}
                                    <div className="relative z-10 text-center md:text-left w-full max-w-md">
                                        <h2 className="text-3xl lg:text-4xl font-bold text-white uppercase tracking-wider drop-shadow-md">
                                            {item.nama}
                                        </h2>
                                        <div className="w-16 h-1.5 bg-amber-500 rounded-sm mt-4 mx-auto md:mx-0"></div>
                                    </div>
                                </div>

                                {/* Right Side: Content */}
                                <div className="w-full md:w-7/12 lg:w-1/2 flex items-center p-8 md:p-12 lg:p-24 text-white relative">
                                    {/* Large decorative number */}
                                    <div className="absolute top-1/2 -translate-y-1/2 right-10 text-[180px] font-black text-white/5 select-none pointer-events-none hidden md:block">
                                        {displayIndex}
                                    </div>
                                    
                                    <div className="max-w-xl w-full relative z-10">
                                        {/* Description */}
                                        {item.deskripsi && (
                                            <div className="text-white/90 text-sm md:text-base leading-relaxed mb-8 font-medium">
                                                <p>{item.deskripsi}</p>
                                            </div>
                                        )}

                                        {/* Program Studi */}
                                        {item.visi_misi && (
                                            <div className="space-y-4">
                                                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                    <GraduationCap className="w-5 h-5" /> Program Studi
                                                </h3>
                                                {/* Split the visi misi by newlines to render as bullet points */}
                                                {item.visi_misi.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                                                    <div key={i} className="flex items-start gap-3 group/item">
                                                        <div className="mt-1 p-1 rounded-full bg-white/10 group-hover/item:bg-amber-500/20 text-amber-400 shrink-0 transition-colors">
                                                            <BookOpen className="w-3.5 h-3.5" />
                                                        </div>
                                                        <p className="text-sm md:text-base text-white/90 font-semibold group-hover/item:text-white transition-colors">{line.trim()}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Dekan Info if available */}
                                        {(item.dekan_nama || item.wakil_dekan) && (
                                            <div className="mt-12 pt-8 border-t border-white/20">
                                                {item.dekan_nama && (
                                                    <div className="mb-2">
                                                        <span className="text-xs font-bold text-white/60 uppercase tracking-wider block">Dekan</span>
                                                        <span className="text-base font-medium">{item.dekan_nama}</span>
                                                    </div>
                                                )}
                                                {item.wakil_dekan && (
                                                    <div>
                                                        <span className="text-xs font-bold text-white/60 uppercase tracking-wider block">Wakil Dekan</span>
                                                        <span className="text-base font-medium">{item.wakil_dekan}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="py-24 text-center">
                        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-12 max-w-2xl mx-auto flex flex-col items-center justify-center">
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Belum Ada Data Fakultas</h3>
                            <p className="text-slate-500">
                                Informasi mengenai daftar fakultas sedang dalam proses pembaruan. Silakan kembali lagi nanti.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
