import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function Jurnalistik() {
    return (
        <PublicLayout>
            <Head title="Praktik Jurnalistik & Redaksi Media | Program Studi KPI IAI Persis Bandung" />

            {/* Dark Minimalist Hero Section */}
            <div className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.18] tracking-tight mb-4">
                        Praktik <span className="font-serif italic font-normal text-emerald-300">Jurnalistik</span>
                    </h1>
                    <p className="text-slate-300 font-normal leading-relaxed text-sm sm:text-base max-w-2xl">
                        Pusat simulasi ruang redaksi (newsroom), pelatihan investigasi berita, penulisan opini, dan penerbitan media cetak maupun portal siber dakwah Program Studi KPI IAI Persis Bandung.
                    </p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[{ label: 'Praktik & Lab' }, { label: 'Praktik Jurnalistik' }]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFBFD] py-14 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

                    {/* Section 1: Newsroom Desk Layout (Tampilan Ruang Redaksi) */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-sm">
                        <div className="border-b border-slate-200 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Simulasi Industri Media</span>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">Struktur & Operasional Ruang Redaksi (Newsroom)</h2>
                            </div>
                            <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-mono font-medium border border-slate-200 self-start sm:self-auto">
                                STANDAR AJI &amp; DEWAN PERS
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Tingkat 1</span>
                                <h3 className="font-semibold text-slate-900 text-base mt-1 mb-2">Pemimpin Redaksi</h3>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Memimpin rapat proyeksi harian, menentukan garis haluan kebijakan redaksi, dan memverifikasi integritas berita berperspektif dakwah Islam.
                                </p>
                            </div>
                            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Tingkat 2</span>
                                <h3 className="font-semibold text-slate-900 text-base mt-1 mb-2">Redaktur Rubrik (Editor)</h3>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Menyunting naskah liputan dari reporter lapangan, memastikan kepatuhan kode etik jurnalistik, dan memadukan akurasi data 5W+1H.
                                </p>
                            </div>
                            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Tingkat 3</span>
                                <h3 className="font-semibold text-slate-900 text-base mt-1 mb-2">Reporter Lapangan</h3>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Melakukan investigasi mendalam, reportase doorstop, wawancara narasumber terpercaya, dan pengumpulan bukti fakta primer.
                                </p>
                            </div>
                            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Tingkat 4</span>
                                <h3 className="font-semibold text-slate-900 text-base mt-1 mb-2">Layout &amp; Fact-Checker</h3>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Menata tata letak cetak majalah di Adobe InDesign serta memverifikasi silang keabsahan klaim berita sebelum terbit ke publik.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: 4 Desk Liputan Tematik */}
                    <div>
                        <div className="mb-8">
                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">4 Meja Desk Peliputan Mahasiswa</h3>
                            <p className="text-slate-500 text-sm mt-1">Fokus liputan praktikum jurnalisme investigatif dan humaniora KPI IAI Persis.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex items-start gap-5">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold shrink-0 text-lg">
                                    01
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-slate-900 text-lg">Desk Ormas &amp; Khazanah Dakwah</h4>
                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                        Peliputan muktamar, musyawarah kerja pimpinan Persatuan Islam, dinamika pesantren persis se-Jawa Barat, serta dokumentasi khutbah dan syiar ulama.
                                    </p>
                                    <div className="pt-2 flex flex-wrap gap-2">
                                        <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">Arsip Khutbah</span>
                                        <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">Dinamika Pesantren</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex items-start gap-5">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold shrink-0 text-lg">
                                    02
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-slate-900 text-lg">Desk Kebijakan Publik &amp; Sosial</h4>
                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                        Menganalisis dampak regulasi pemerintah terhadap kehidupan umat beragama, ekonomi syariah kerakyatan, dan perlindungan hak-hak masyarakat marjinal.
                                    </p>
                                    <div className="pt-2 flex flex-wrap gap-2">
                                        <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">Kebijakan Sosial</span>
                                        <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">Ekonomi Umat</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex items-start gap-5">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold shrink-0 text-lg">
                                    03
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-slate-900 text-lg">Desk Investigasi &amp; Cek Fakta</h4>
                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                        Pelatihan penelusuran rekam jejak digital, verifikasi informasi bohong (hoaks) yang mendiskreditkan nilai agama, dan investigasi data terbuka (OSINT).
                                    </p>
                                    <div className="pt-2 flex flex-wrap gap-2">
                                        <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">Anti-Hoaks</span>
                                        <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">OSINT Verification</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex items-start gap-5">
                                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold shrink-0 text-lg">
                                    04
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-slate-900 text-lg">Desk Feature &amp; Sastra Jurnalistik</h4>
                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                        Penulisan kisah inspiratif profil dai pedalaman, perjuangan guru madrasah terpencil, dan esai naratif yang menyentuh nurani pembaca.
                                    </p>
                                    <div className="pt-2 flex flex-wrap gap-2">
                                        <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">Human Interest</span>
                                        <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">Esai Naratif</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Media Output Cetak & Digital */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10">
                        <div className="mb-8">
                            <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Publikasi Mahasiswa</span>
                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mt-1">Produk Jurnalistik yang Diterbitkan</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 border border-slate-200 rounded-xl space-y-3">
                                <span className="text-xs font-mono font-semibold text-slate-500">TERBIT MINGGUAN</span>
                                <h4 className="font-bold text-slate-900 text-lg">Buletin Mimbar Jumat</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Lembaran khutbah dan warta ringkas yang didistribusikan ke masjid-masjid di sekitar kampus IAI Persis Bandung setiap pekan.
                                </p>
                            </div>
                            <div className="p-6 border border-slate-200 rounded-xl space-y-3">
                                <span className="text-xs font-mono font-semibold text-slate-500">TERBIT BULANAN</span>
                                <h4 className="font-bold text-slate-900 text-lg">Tabloid Persis Muda</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Penerbitan cetak 16 halaman berisi liputan mendalam, opini dosen-mahasiswa, resensi buku dakwah, dan ruang karya sastra islami.
                                </p>
                            </div>
                            <div className="p-6 border border-slate-200 rounded-xl space-y-3">
                                <span className="text-xs font-mono font-semibold text-slate-500">REAL-TIME PORTAL</span>
                                <h4 className="font-bold text-slate-900 text-lg">Warta KPI Online</h4>
                                <p className="text-slate-600 text-xs leading-relaxed">
                                    Situs berita siber yang dikelola mahasiswa tingkat akhir sebagai sarana pembuktian kapasitas liputan berkecepatan tinggi dengan etika ketat.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Sarana Ruang Komputer Redaksi */}
                    <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-3 max-w-xl">
                            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">Infrastruktur Laboratorium</span>
                            <h3 className="text-2xl font-bold">20 Workstation Redaksi Terintegrasi</h3>
                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                                Dilengkapi komputer berspesifikasi tinggi dengan lisensi perangkat lunak Adobe InDesign untuk layout majalah, peramban anti-pelacak untuk investigasi aman, dan server penyimpanan arsip berita lokal.
                            </p>
                        </div>
                        <div className="border border-slate-700 bg-slate-800/80 rounded-xl p-6 text-center shrink-0 w-full md:w-auto">
                            <p className="text-3xl font-bold text-emerald-400">100%</p>
                            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-medium">Bebas Plagiarisme (Turnitin)</p>
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
