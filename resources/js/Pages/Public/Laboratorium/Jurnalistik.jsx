import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function Jurnalistik({ lab }) {
    const namaLab = lab?.nama_lab || 'Praktik Jurnalistik';
    const subjudul = lab?.subjudul || 'Pusat simulasi ruang redaksi (newsroom), pelatihan investigasi berita, penulisan opini, dan penerbitan media cetak maupun portal siber dakwah Program Studi KPI IAI Persis Bandung.';
    const deskripsi = lab?.deskripsi || 'Laboratorium Jurnalistik melatih mahasiswa dalam manajemen dapur redaksi modern, peliputan lapangan beretika pers Islami, fact-checking data terbuka, dan penerbitan majalah dakwah.';
    const gambarUtama = lab?.gambar_utama || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop';
    const badgeStatus = lab?.badge_status || 'Newsroom & Meja Redaksi Editorial';
    const jadwalLayanan = lab?.jadwal_layanan || 'Senin - Jumat, 08.30 - 15.30 WIB';
    const kontakLayanan = lab?.kontak_layanan || 'redaksi.kpi@iaipibandung.ac.id';

    const alatList = Array.isArray(lab?.spesifikasi_alat) && lab.spesifikasi_alat.length > 0 ? lab.spesifikasi_alat : [
        { nomor: '01', nama: '20 Workstation Redaksi PC', deskripsi: 'Komputer spesifikasi tinggi dengan lisensi Adobe InDesign dan scanner dokumen arsip.' },
        { nomor: '02', nama: 'Akses Wire Service Kantor Berita', deskripsi: 'Akses langsung ke jaringan kantor berita nasional dan portal siber dakwah terverifikasi.' },
        { nomor: '03', nama: 'Voice Recorder Olympus Pro', deskripsi: 'Perekam suara wawancara doorstop dengan fitur noise-cancelation untuk liputan lapangan.' },
        { nomor: '04', nama: 'Sistem Verifikasi Plagiarisme', deskripsi: 'Integrasi Turnitin untuk menjamin keaslian dan integritas akademik setiap artikel mahasiswa.' }
    ];

    const programList = Array.isArray(lab?.program_output) && lab.program_output.length > 0 ? lab.program_output : [
        { kategori: 'Terbit Mingguan', judul: 'Buletin Mimbar Jumat', deskripsi: 'Lembaran khutbah dan warta ringkas yang didistribusikan ke masjid-masjid sekitar kampus.' },
        { kategori: 'Terbit Bulanan', judul: 'Tabloid Persis Muda', deskripsi: 'Penerbitan cetak 16 halaman berisi liputan mendalam, opini dosen-mahasiswa, dan resensi buku.' },
        { kategori: 'Real-time Portal', judul: 'Warta KPI Online', deskripsi: 'Portal berita siber dakwah mahasiswa yang mempublikasikan isu aktual dengan kecepatan dan akurasi tinggi.' }
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

                    {/* Section 1: Newsroom Desk Layout */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 shadow-sm">
                        <div className="border-b border-slate-200 pb-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">{badgeStatus}</span>
                                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">Struktur &amp; Operasional Ruang Redaksi (Newsroom)</h2>
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

                    {/* Section 2: Peralatan & Fasilitas Redaksi */}
                    <div>
                        <div className="mb-8">
                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">Perangkat &amp; Fasilitas Ruang Redaksi</h3>
                            <p className="text-slate-500 text-sm mt-1">Infrastruktur komputer dan verifikasi liputan yang digunakan mahasiswa praktikan.</p>
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

                    {/* Section 3: Media Output Cetak & Digital */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10">
                        <div className="mb-8">
                            <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Publikasi Mahasiswa</span>
                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mt-1">Produk Jurnalistik yang Diterbitkan</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {programList.map((prog, idx) => (
                                <div key={idx} className="p-6 border border-slate-200 rounded-xl space-y-3">
                                    <span className="text-xs font-mono font-semibold text-slate-500 uppercase">{prog.kategori}</span>
                                    <h4 className="font-bold text-slate-900 text-lg">{prog.judul}</h4>
                                    <p className="text-slate-600 text-xs leading-relaxed">
                                        {prog.deskripsi}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Section 4: Kontak & Informasi Peliputan */}
                    <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h4 className="font-semibold text-slate-900 text-base">Jam Operasional Newsroom &amp; Meja Redaksi</h4>
                            <p className="text-slate-600 text-xs sm:text-sm">
                                Pelayanan buka setiap {jadwalLayanan} di Gedung Dakwah Lt. 2.
                            </p>
                        </div>
                        <a 
                            href={`mailto:${kontakLayanan}`}
                            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors"
                        >
                            Hubungi Redaksi ({kontakLayanan})
                        </a>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
