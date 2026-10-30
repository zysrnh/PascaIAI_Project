import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function Penyiaran({ lab }) {
    const namaLab = lab?.nama_lab || 'Laboratorium Penyiaran';
    const subjudul = lab?.subjudul || 'Fasilitas produksi program televisi, radio komunitas streaming, dan simulasi penyiaran berita terintegrasi berstandar industri penyiaran modern Program Studi KPI IAI Persis Bandung.';
    const deskripsi = lab?.deskripsi || 'Laboratorium Penyiaran dirancang untuk mereplikasi atmosfer stasiun televisi berita dan radio streaming profesional. Mahasiswa mempraktikkan peran sebagai presenter berita, operator switcher video, floor director, sound engineer, hingga produser program siaran dakwah.';
    const gambarUtama = lab?.gambar_utama || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop';
    const badgeStatus = lab?.badge_status || 'Broadcast TV & Radio On-Air Suite';
    const jadwalLayanan = lab?.jadwal_layanan || 'Senin - Jumat, 08.00 - 16.00 WIB';
    const kontakLayanan = lab?.kontak_layanan || 'kpi@iaipibandung.ac.id';

    const alatList = Array.isArray(lab?.spesifikasi_alat) && lab.spesifikasi_alat.length > 0 ? lab.spesifikasi_alat : [
        { nomor: '01', nama: 'Blackmagic ATEM Television Studio', deskripsi: 'Video switcher multi-channel dengan kontrol SDI/HDMI, DVE transition, luma/chroma keyer untuk produksi berita langsung.' },
        { nomor: '02', nama: 'Sony 4K Studio Cameras & Teleprompter', deskripsi: 'Kamera studio multi-angle dengan monitor prompter kaca 17 inci untuk pembacaan naskah presenter berita secara profesional.' },
        { nomor: '03', nama: 'Behringer X32 Digital Audio Console', deskripsi: 'Mixer audio digital 32-channel dengan motor fader, kompresi dinamika suara, dan routing terpisah untuk siaran TV dan Radio.' },
        { nomor: '04', nama: 'Studio Lighting Grid DMX 512', deskripsi: 'Pencahayaan LED panel bi-color dan spot fresnel dengan konsol DMX untuk tata cahaya 3-titik (Key, Fill, Back light).' }
    ];

    const programList = Array.isArray(lab?.program_output) && lab.program_output.length > 0 ? lab.program_output : [
        { kategori: 'Program Televisi', judul: 'KPI News Channel', deskripsi: 'Program buletin warta berita harian yang menyajikan isu seputar dunia kampus, khazanah Islam, dan informasi ormas Persatuan Islam.' },
        { kategori: 'Radio Dakwah', judul: 'Radio Suara Persis Streaming', deskripsi: 'Kanal siaran radio digital interaktif berisi kajian tematik tafsir Al-Quran, hadis arbain, konsultasi keluarga sakinah, dan murottal merdu.' },
        { kategori: 'Talkshow Tematik', judul: 'Mimbar Aspirasi Kampus', deskripsi: 'Wadah dialog terbuka menghadirkan pimpinan kampus, pakar komunikasi nasional, dan tokoh pers Islam mendiskusikan dinamika umat.' }
    ];

    return (
        <PublicLayout>
            <Head title={`${namaLab} | Program Studi KPI IAI Persis Bandung`} />

            {/* Dark Minimalist Hero Section */}
            <div className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.18] tracking-tight mb-4">
                        Laboratorium <span className="font-serif italic font-normal text-emerald-300">Penyiaran</span>
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

                    {/* Section 1: Studio Highlight */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-sm">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-7 space-y-5">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide uppercase">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    {badgeStatus}
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-tight">
                                    Simulasi Kerja Nyata Penyiaran Televisi &amp; Radio Komunitas
                                </h2>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                    {deskripsi}
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                                        <p className="text-xs text-slate-500 font-medium">Resolusi Siaran</p>
                                        <p className="text-lg font-bold text-slate-900 mt-1">4K Ultra HD</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                                        <p className="text-xs text-slate-500 font-medium">Kapasitas Kursi</p>
                                        <p className="text-lg font-bold text-slate-900 mt-1">30 Praktikan</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl col-span-2 sm:col-span-1">
                                        <p className="text-xs text-slate-500 font-medium">Transmisi Radio</p>
                                        <p className="text-lg font-bold text-slate-900 mt-1">IP Streaming 24/7</p>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-5">
                                <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 aspect-video flex items-center justify-center group">
                                    <img 
                                        src={gambarUtama} 
                                        alt={namaLab} 
                                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 left-4 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded tracking-wider uppercase flex items-center gap-1.5 shadow">
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                                        LIVE ON AIR
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Peralatan Teknis */}
                    <div>
                        <div className="mb-8">
                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">Perangkat Studio &amp; Spesifikasi Teknis</h3>
                            <p className="text-slate-500 text-sm mt-1">Infrastruktur standar industri yang digunakan dalam setiap sesi praktikum mahasiswa KPI.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {alatList.map((alat, i) => (
                                <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-5 hover:border-slate-300 transition-colors">
                                    <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold mb-4">
                                        {alat.nomor || `0${i+1}`}
                                    </div>
                                    <h4 className="font-semibold text-slate-900 text-base mb-2">{alat.nama}</h4>
                                    <p className="text-slate-600 text-xs leading-relaxed">{alat.deskripsi}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 3: 4 Alur Produksi Siaran Berita */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10">
                        <div className="mb-8">
                            <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Silabus &amp; Prosedur</span>
                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mt-1">4 Tahapan Praktikum Siaran Televisi</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="relative pl-6 border-l-2 border-emerald-500 space-y-2">
                                <span className="text-xs font-bold text-emerald-600 uppercase">Tahap 1</span>
                                <h4 className="font-semibold text-slate-900 text-sm">Penyusunan Rundown &amp; Naskah</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">Penulisan naskah berita format split page (audio &amp; video cue) sesuai standar P3SPS KPI Pusat.</p>
                            </div>
                            <div className="relative pl-6 border-l-2 border-slate-300 space-y-2">
                                <span className="text-xs font-bold text-slate-400 uppercase">Tahap 2</span>
                                <h4 className="font-semibold text-slate-900 text-sm">Dry Run &amp; Rehearsal</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">Latihan blocking kamera, sinkronisasi audio clip mic presenter, dan pengetesan grafis lower third.</p>
                            </div>
                            <div className="relative pl-6 border-l-2 border-slate-300 space-y-2">
                                <span className="text-xs font-bold text-slate-400 uppercase">Tahap 3</span>
                                <h4 className="font-semibold text-slate-900 text-sm">Live Taping / On-Air Switching</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">Eksekusi siaran langsung atau rekaman multi-kamera dipandu penuh oleh Program Director (PD).</p>
                            </div>
                            <div className="relative pl-6 border-l-2 border-slate-300 space-y-2">
                                <span className="text-xs font-bold text-slate-400 uppercase">Tahap 4</span>
                                <h4 className="font-semibold text-slate-900 text-sm">Post-Broadcast Review</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">Evaluasi performa vokal presenter, transisi visual switcher, dan efektivitas pesan dakwah siaran.</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Output Siaran & Program Mahasiswa */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {programList.map((prog, idx) => (
                            <div key={idx} className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                                <div>
                                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">{prog.kategori}</span>
                                    <h4 className="text-xl font-bold mt-2 mb-3">{prog.judul}</h4>
                                    <p className="text-slate-300 text-xs leading-relaxed mb-6">
                                        {prog.deskripsi}
                                    </p>
                                </div>
                                <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-xs text-slate-400">
                                    <span>Program Mahasiswa KPI</span>
                                    <span>Tersertifikasi</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Section 5: Peminjaman & Kontak Laboran */}
                    <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h4 className="font-semibold text-slate-900 text-base">Butuh Jadwal Praktikum atau Peminjaman Studio?</h4>
                            <p className="text-slate-600 text-xs sm:text-sm">
                                Pengajuan jadwal siaran mandiri mahasiswa dibuka setiap {jadwalLayanan} di Ruang Laboran Gedung Dakwah Lt. 2.
                            </p>
                        </div>
                        <a 
                            href={`mailto:${kontakLayanan}`}
                            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors"
                        >
                            Hubungi Kepala Lab ({kontakLayanan})
                        </a>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
