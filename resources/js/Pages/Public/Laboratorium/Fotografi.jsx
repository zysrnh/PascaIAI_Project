import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function Fotografi({ lab }) {
    const namaLab = lab?.nama_lab || 'Praktik Fotografi';
    const subjudul = lab?.subjudul || 'Studio fotografi berlatar cyclorama elektrik dan laboratorium digital untuk pengasahan insting visual, photo story dakwah, dan teknik pencahayaan studio Program Studi KPI IAI Persis Bandung.';
    const deskripsi = lab?.deskripsi || 'Dilengkapi dinding sudut lengkung tanpa batas (cyclorama) putih dan roll latar elektrik. Mahasiswa mempraktikkan penguasaan cahaya studio untuk portraiture tokoh, profil santri, dan foto esai jurnalistik.';
    const gambarUtama = lab?.gambar_utama || 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1200&auto=format&fit=crop';
    const badgeStatus = lab?.badge_status || 'Cyclorama Wall & Studio Strobe Suite';
    const jadwalLayanan = lab?.jadwal_layanan || 'Senin - Jumat, 08.30 - 16.00 WIB';
    const kontakLayanan = lab?.kontak_layanan || 'foto.kpi@iaipibandung.ac.id';

    const alatList = Array.isArray(lab?.spesifikasi_alat) && lab.spesifikasi_alat.length > 0 ? lab.spesifikasi_alat : [
        { nomor: '01', nama: 'Godox QT600III High Speed Strobe', deskripsi: 'Lampu studio flash 600Ws dengan HSS 1/8000s dan waktu daur ulang ultra-cepat.' },
        { nomor: '02', nama: 'Kamera Full-Frame Canon & Sony', deskripsi: 'Kamera mirrorless resolusi tinggi untuk kebutuhan cetak pameran galeri foto.' },
        { nomor: '03', nama: 'Lensa Pro 24-70mm & 70-200mm f/2.8', deskripsi: 'Lensa zoom bukaan lebar standar liputan jurnalistik dan foto portraiture studio.' },
        { nomor: '04', nama: 'Octabox 120cm & Strip Softboxes', deskripsi: 'Light modifier untuk menghasilkan gradasi bayangan lembut pada subjek manusia.' }
    ];

    const programList = Array.isArray(lab?.program_output) && lab.program_output.length > 0 ? lab.program_output : [
        { kategori: 'Pameran Foto', judul: 'Pameran Esai Visual Umat', deskripsi: 'Eksibisi tahunan karya fotografi mahasiswa memotret denyut kehidupan pesantren dan masyarakat.' },
        { kategori: 'Buku Karya', judul: 'Photo-Book Dakwah Visual', deskripsi: 'Katalog cetak kompilasi foto jurnalistik terbaik karya mahasiswa tingkat akhir KPI.' },
        { kategori: 'Galeri Digital', judul: 'Koleksi Arsip Visual Persis', deskripsi: 'Dokumentasi digital peristiwa bersejarah ormas Islam yang tersimpan rapi dengan metadata IPTC.' }
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

                    {/* Section 1: Studio Cyclorama Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-6 space-y-5">
                            <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">{badgeStatus}</span>
                            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-tight">
                                Studio Tata Cahaya Terkontrol dengan Cyclorama Infinity Wall
                            </h2>
                            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                {deskripsi}
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="p-4 bg-white border border-slate-200 rounded-xl">
                                    <p className="text-xs text-slate-500 font-medium">Lampu Studio Strobe</p>
                                    <p className="text-lg font-bold text-slate-900 mt-1">Godox 600Ws HSS</p>
                                </div>
                                <div className="p-4 bg-white border border-slate-200 rounded-xl">
                                    <p className="text-xs text-slate-500 font-medium">Lensa Kit Utama</p>
                                    <p className="text-lg font-bold text-slate-900 mt-1">24-70mm &amp; 70-200mm</p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6">
                            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-[4/3] bg-slate-900">
                                <img 
                                    src={gambarUtama} 
                                    alt={namaLab} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Peralatan */}
                    <div>
                        <div className="mb-8">
                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">Spesifikasi Kamera &amp; Pencahayaan</h3>
                            <p className="text-slate-500 text-sm mt-1">Daftar perlengkapan optik dan lighting studio yang tersedia.</p>
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

                    {/* Section 3: Kontak & SOP */}
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div className="space-y-1">
                            <h4 className="font-semibold text-slate-900 text-base">Jadwal Operasional Studio Fotografi</h4>
                            <p className="text-slate-600 text-xs sm:text-sm">
                                Pelayanan studio buka setiap {jadwalLayanan} di Gedung Dakwah Lt. 2.
                            </p>
                        </div>
                        <a 
                            href={`mailto:${kontakLayanan}`}
                            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors"
                        >
                            Hubungi Laboran ({kontakLayanan})
                        </a>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
