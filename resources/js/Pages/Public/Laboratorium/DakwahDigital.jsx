import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function DakwahDigital({ lab }) {
    const namaLab = lab?.nama_lab || 'Praktik Dakwah Digital';
    const subjudul = lab?.subjudul || 'Pusat kreasi konten media sosial, live streaming multi-kamera kajian Islam, perancangan infografis dakwah, dan analisis tren media siber masa kini Program Studi KPI IAI Persis Bandung.';
    const deskripsi = lab?.deskripsi || 'Mahasiswa dilatih memproduksi konten dakwah format mikro (TikTok, Reels, Shorts) dan format makro (webinar kajian, artikel siber SEO), memadukan dalil syar\'i dengan seni grafis modern.';
    const gambarUtama = lab?.gambar_utama || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop';
    const badgeStatus = lab?.badge_status || 'Multi-Platform Syiar Digital Lab';
    const jadwalLayanan = lab?.jadwal_layanan || 'Senin - Sabtu, 08.00 - 18.00 WIB';
    const kontakLayanan = lab?.kontak_layanan || 'digital.kpi@iaipibandung.ac.id';

    const alatList = Array.isArray(lab?.spesifikasi_alat) && lab.spesifikasi_alat.length > 0 ? lab.spesifikasi_alat : [
        { nomor: '01', nama: 'OBS Studio & vMix Multi-Kamera', deskripsi: 'Software switcher live streaming dengan dukungan NDI, overlay grafis, dan audio routing.' },
        { nomor: '02', nama: 'Adobe Creative Cloud Suite', deskripsi: 'Aplikasi standar desain infografis, animasi logo dakwah, dan editing micro-video.' },
        { nomor: '03', nama: 'Ring Light & Soft Key Lighting Kit', deskripsi: 'Pencahayaan khusus konten vertikal smartphone dengan color temperature akurat.' },
        { nomor: '04', nama: 'Wireless Lavalier Mic Hollyland', deskripsi: 'Mikrofon nirkabel 2.4GHz jernih anti-interferensi untuk produksi video reel lapangan.' }
    ];

    const programList = Array.isArray(lab?.program_output) && lab.program_output.length > 0 ? lab.program_output : [
        { kategori: 'Micro-Content', judul: 'Serial 60 Detik Fikih Ibadah', deskripsi: 'Video pendek vertikal merangkum tata cara ibadah sesuai sunnah dengan takarir teks dinamis.' },
        { kategori: 'Infografis', judul: 'Tafsir Hadis Tematik Visual', deskripsi: 'Slide grafis edukatif yang dipublikasikan setiap hari di Instagram resmi @kpi.iaipersis.' },
        { kategori: 'Live Broadcast', judul: 'Live Streaming Pengajian Akbar', deskripsi: 'Penyiaran langsung kajian ilmiah persis multi-kamera yang menjangkau ribuan pemirsa siber.' }
    ];

    return (
        <PublicLayout>
            <Head title={`${namaLab} | Program Studi KPI IAI Persis Bandung`} />

            {/* Dark Minimalist Hero Section */}
            <div className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.18] tracking-tight mb-4">
                        {namaLab}
                    </h1>
                    <p className="text-slate-300 font-normal leading-relaxed text-sm sm:text-base max-w-2xl">
                        {subjudul}
                    </p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[{ label: 'Praktik & Lab' }, { label: namaLab }]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFBFD] py-14 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                    {/* Section 1: Command Center Bento */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 flex flex-col justify-between shadow-sm">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide uppercase">
                                    {badgeStatus}
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-tight">
                                    Laboratorium Kreator Konten Dakwah Islam Berbasis Data &amp; Tren Algoritma
                                </h2>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                    {deskripsi}
                                </p>
                            </div>
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 mt-6">
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Format Konten</p>
                                    <p className="text-lg font-bold text-slate-900 mt-1">9:16 &amp; 16:9</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Software Stack</p>
                                    <p className="text-lg font-bold text-slate-900 mt-1">Adobe CC &amp; OBS</p>
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Target Audiens</p>
                                    <p className="text-lg font-bold text-slate-900 mt-1">Gen Z &amp; Millennial</p>
                                </div>
                            </div>
                        </div>

                        {/* Vertical Phone Preview Mockup */}
                        <div className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                            <div>
                                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block mb-4">MOCKUP REELS / TIKTOK DAKWAH</span>
                                <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 space-y-3">
                                    <div className="aspect-[9/12] bg-slate-950 rounded-lg overflow-hidden relative flex items-center justify-center p-4 text-center">
                                        <p className="text-xs text-slate-300 font-serif italic">
                                            "Barangsiapa menunjukkan kepada kebaikan, maka ia memperoleh pahala seperti orang yang melakukannya." (HR. Muslim)
                                        </p>
                                        <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-slate-400 font-mono">
                                            <span>#SyiarKPI</span>
                                            <span>@kpi.iaipersis</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                                        <span>❤️ 12.4K Suka</span>
                                        <span>💬 382 Komentar</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 mt-4 leading-normal">
                                Pelatihan storytelling cepat: Hook 3 detik pertama, penyampaian nilai fikih padat, dan call to action beradab.
                            </p>
                        </div>
                    </div>

                    {/* Section 2: Peralatan */}
                    <div>
                        <div className="mb-8">
                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">Perangkat &amp; Aplikasi Studio Digital</h3>
                            <p className="text-slate-500 text-sm mt-1">Teknologi produksi audio visual yang digunakan mahasiswa kreator.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {alatList.map((alat, i) => (
                                <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-colors">
                                    <span className="text-xs font-mono font-bold text-emerald-700">{alat.nomor || `0${i+1}`}</span>
                                    <h4 className="font-semibold text-slate-900 text-base mt-2 mb-1">{alat.nama}</h4>
                                    <p className="text-slate-600 text-xs leading-relaxed">{alat.deskripsi}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 3: Kontak & Informasi */}
                    <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h4 className="font-semibold text-slate-900 text-base">Jadwal Operasional Studio Dakwah Digital</h4>
                            <p className="text-slate-600 text-xs sm:text-sm">
                                Pelayanan konsultasi konten &amp; live streaming buka setiap {jadwalLayanan}.
                            </p>
                        </div>
                        <a 
                            href={`mailto:${kontakLayanan}`}
                            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors"
                        >
                            Hubungi Tim Kreatif ({kontakLayanan})
                        </a>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
