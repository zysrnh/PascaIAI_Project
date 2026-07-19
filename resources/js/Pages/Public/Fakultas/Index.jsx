import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { ChevronRight, ArrowRight, Building2 } from 'lucide-react';

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
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm"></div>
                </div>
            </div>

            {/* Main Content - Full width alternating rows */}
            <div className="w-full">
                {fakultas && fakultas.length > 0 ? (
                    fakultas.map((item, index) => {
                        // Alternate layout: text on right for even (0, 2, 4), text on left for odd
                        // But wait, the reference has the image ALWAYS on the left, but let's just make it visually distinct
                        // The reference actually has the image on the left mostly.
                        const bgColor = item.warna_bg || (index % 2 === 0 ? '#4a5d23' : '#6b4c3a'); // default olive and brown
                        
                        return (
                            <div 
                                key={item.id} 
                                className="w-full min-h-[500px] flex flex-col md:flex-row items-stretch relative group overflow-hidden"
                                style={{ backgroundColor: bgColor }}
                            >
                                {/* Left Side: Image & Title */}
                                <div className="w-full md:w-5/12 lg:w-1/2 relative overflow-hidden flex items-center justify-center p-12 lg:p-24 min-h-[400px]">
                                    {/* Image Background */}
                                    {item.gambar_url ? (
                                        <div 
                                            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 group-hover:opacity-80 transition-opacity duration-700 mix-blend-luminosity hover:mix-blend-normal"
                                            style={{ backgroundImage: `url(${item.gambar_url})` }}
                                        ></div>
                                    ) : (
                                        <div className="absolute inset-0 bg-black/20"></div>
                                    )}
                                    
                                    {/* Gradient overlay to blend with right side */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--bg-color)] opacity-90 hidden md:block" style={{ '--bg-color': bgColor }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] to-transparent opacity-90 md:hidden" style={{ '--bg-color': bgColor }}></div>

                                    {/* Title Content */}
                                    <div className="relative z-10 text-center md:text-left w-full max-w-md">
                                        <h2 className="text-3xl lg:text-4xl font-bold text-white uppercase tracking-wider drop-shadow-md">
                                            {item.nama}
                                        </h2>
                                    </div>
                                </div>

                                {/* Right Side: Content */}
                                <div className="w-full md:w-7/12 lg:w-1/2 flex items-center p-8 md:p-12 lg:p-24 text-white">
                                    <div className="max-w-xl w-full">
                                        {/* Description */}
                                        {item.deskripsi && (
                                            <div className="text-white/90 text-sm md:text-base leading-relaxed mb-8">
                                                <p>{item.deskripsi}</p>
                                            </div>
                                        )}

                                        {/* Program Studi / Visi Misi */}
                                        {item.visi_misi && (
                                            <div className="space-y-3">
                                                {/* Split the visi misi by newlines to render as bullet points */}
                                                {item.visi_misi.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                                                    <div key={i} className="flex items-start gap-3">
                                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/80 shrink-0"></div>
                                                        <p className="text-sm md:text-base text-white/90">{line.trim()}</p>
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
