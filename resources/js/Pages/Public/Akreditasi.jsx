import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Award, FileCheck, History, Landmark, ShieldCheck, Download, Calendar, ArrowRight, CheckCircle2, AlertTriangle, XCircle, X } from 'lucide-react';
import Breadcrumb from '@/Components/Public/Breadcrumb';

// Validity status derived from a raw expiry date — used to badge both the
// institution-level card and each prodi card so visitors see at a glance
// whether an accreditation is still current.
const getValidityStatus = (dateString) => {
    if (!dateString || dateString === '-') return null;
    const end = new Date(dateString);
    if (isNaN(end.getTime())) return null;
    const diffDays = Math.ceil((end.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) return { label: 'Kadaluarsa', tone: 'red' };
    if (diffDays <= 90) return { label: 'Segera berakhir', tone: 'amber' };
    return { label: 'Berlaku', tone: 'emerald' };
};

// Literal Tailwind classes per tone — kept as lookup objects (not built with
// template strings) so Tailwind's JIT can see and keep them at build time.
const STATUS_ICON = {
    emerald: <CheckCircle2 className="w-3.5 h-3.5" />,
    amber: <AlertTriangle className="w-3.5 h-3.5" />,
    red: <XCircle className="w-3.5 h-3.5" />,
};
const STATUS_ON_DARK = {
    emerald: 'bg-white/10 text-emerald-50',
    amber: 'bg-amber-400/20 text-amber-100',
    red: 'bg-red-400/20 text-red-100',
};
const STATUS_ON_LIGHT = {
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    red: 'bg-red-50 text-red-700',
};
const TOP_BORDER = {
    emerald: 'border-t-emerald-500',
    amber: 'border-t-amber-400',
    red: 'border-t-red-400',
};

export default function Akreditasi({ institusi, prodis, riwayats, pengaturan }) {
    const [showWaPopup, setShowWaPopup] = useState(false);
    const [previewPdf, setPreviewPdf] = useState(null); // { url, title }
    const closeButtonRef = useRef(null);
    const pdfCloseRef = useRef(null);

    // Helper to format date
    const formatDate = (dateString) => {
        if (!dateString || dateString === '-') return '-';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; // fallback if not a valid date
        
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    // Default Fallbacks
    const akreditasiInstitusi = {
        peringkat: institusi?.peringkat || 'Belum Ada',
        sk: institusi?.no_sk || '-',
        tanggal: formatDate(institusi?.tanggal_terbit),
        berlaku: formatDate(institusi?.masa_berlaku),
        lembaga: institusi?.lembaga || '-',
        sertifikat_url: institusi?.sertifikat_url || null,
        sk_url: institusi?.sk_url || null,
        whatsapp_lpm: pengaturan?.whatsapp_lpm || '',
    };

    const institusiStatus = useMemo(() => getValidityStatus(institusi?.masa_berlaku), [institusi]);
    const akreditasiProdi = prodis || [];
    const riwayatAkreditasi = riwayats || [];

    // Normalized WhatsApp number — null when not configured, so the contact
    // button/popup simply don't render instead of pointing at a broken link.
    const waNumber = akreditasiInstitusi.whatsapp_lpm
        ? akreditasiInstitusi.whatsapp_lpm.replace(/\D/g, '').replace(/^0/, '62')
        : null;

    // Popup: lock body scroll, close on Escape, focus the close button.
    useEffect(() => {
        if (!showWaPopup) {
            document.body.style.overflow = 'unset';
            return;
        }
        document.body.style.overflow = 'hidden';
        closeButtonRef.current?.focus();
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setShowWaPopup(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [showWaPopup]);

    // PDF Preview Modal behavior
    useEffect(() => {
        if (!previewPdf) return;
        
        document.body.style.overflow = 'hidden';
        pdfCloseRef.current?.focus();
        
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setPreviewPdf(null);
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [previewPdf]);

    return (
        <PublicLayout>
            <Head title="Akreditasi | Pascasarjana IAI Persis Bandung" />
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.4s ease-out forwards;
                }
            `}</style>

            {/* Banner Section */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={pengaturan?.banner_image} 
                        alt="Akreditasi Banner" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md">
                        Akreditasi Institusi
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                    {pengaturan?.deskripsi && (
                        <p className="text-white/90 max-w-2xl text-lg leading-relaxed drop-shadow-md">
                            {pengaturan.deskripsi}
                        </p>
                    )}
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Tentang Kampus' },
                { label: 'Akreditasi' }
            ]} />

            <div className="py-16 bg-slate-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Intro Section */}
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-3xl font-extrabold text-emerald-950 mb-4">Status & Peringkat Akreditasi</h2>
                        <p className="text-slate-600 max-w-3xl mx-auto">
                            Program Pascasarjana IAI Persis Bandung berkomitmen penuh terhadap penjaminan mutu akademik yang diwujudkan melalui perolehan status akreditasi resmi dari lembaga berwenang.
                        </p>
                    </div>

                    {/* Section 1: Akreditasi Institusi (Highlight) */}
                    <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden mb-16 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="bg-emerald-800 p-8 flex flex-col items-center justify-center text-center text-white">
                                <Award className="w-20 h-20 text-amber-400 mb-4 drop-shadow-md" />
                                <h3 className="text-lg font-medium text-emerald-100 mb-1">Peringkat Akreditasi</h3>
                                <div className="text-4xl font-extrabold text-white tracking-tight mb-3">{akreditasiInstitusi.peringkat}</div>
                                <div className="flex flex-wrap items-center justify-center gap-2">
                                    <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm font-medium">
                                        Oleh {akreditasiInstitusi.lembaga}
                                    </span>
                                    {institusiStatus && (
                                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${STATUS_ON_DARK[institusiStatus.tone]}`}>
                                            {STATUS_ICON[institusiStatus.tone]}
                                            {institusiStatus.label}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Informasi SK Akreditasi Institusi</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                            <FileCheck className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium">Nomor SK</p>
                                            <p className="font-semibold text-slate-800">{akreditasiInstitusi.sk}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                            <Calendar className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-500 font-medium">Masa Berlaku</p>
                                            <p className="font-semibold text-slate-800">{akreditasiInstitusi.tanggal} - {akreditasiInstitusi.berlaku}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-4">
                                    {akreditasiInstitusi.sertifikat_url ? (
                                        <button 
                                            onClick={() => setPreviewPdf({ url: akreditasiInstitusi.sertifikat_url, title: 'Sertifikat Akreditasi' })}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                                        >
                                            <FileCheck className="w-4 h-4" /> Lihat Sertifikat
                                        </button>
                                    ) : (
                                        <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-400 rounded-lg font-semibold text-sm">
                                            Sertifikat belum tersedia
                                        </span>
                                    )}
                                    {akreditasiInstitusi.sk_url ? (
                                        <button 
                                            onClick={() => setPreviewPdf({ url: akreditasiInstitusi.sk_url, title: 'SK Akreditasi' })}
                                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-700 border border-emerald-200 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
                                        >
                                            Lihat SK Akreditasi
                                        </button>
                                    ) : (
                                        <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-400 rounded-lg font-semibold text-sm">
                                            SK belum tersedia
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        
                        {/* Section 2: Akreditasi Prodi */}
                        <div className="lg:col-span-2 space-y-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                                    <Landmark className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800">Akreditasi Program Studi</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {akreditasiProdi.length > 0 ? akreditasiProdi.map((prodi, index) => {
                                    const prodiStatus = getValidityStatus(prodi.masa_berlaku);
                                    const topBorder = TOP_BORDER[prodiStatus?.tone] || 'border-t-slate-200';
                                    return (
                                        <div key={prodi.id ?? `${prodi.nama}-${index}`} className={`bg-white rounded-xl shadow-sm border-x border-b border-slate-200 border-t-4 ${topBorder} p-6 hover:shadow-md transition-shadow relative overflow-hidden group`}>
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                                            <div className="flex items-start justify-between gap-3 mb-4">
                                                <h4 className="font-bold text-slate-800 text-lg">{prodi.nama}</h4>
                                                {prodiStatus && (
                                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold flex-shrink-0 ${STATUS_ON_LIGHT[prodiStatus.tone]}`}>
                                                        {STATUS_ICON[prodiStatus.tone]}
                                                        {prodiStatus.label}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-end border-b border-slate-50 pb-2">
                                                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Peringkat</span>
                                                    <span className="font-bold text-emerald-700">{prodi.peringkat}</span>
                                                </div>
                                                <div className="flex justify-between items-end border-b border-slate-50 pb-2">
                                                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Berlaku S.d</span>
                                                    <span className="font-semibold text-slate-700">{formatDate(prodi.masa_berlaku)}</span>
                                                </div>
                                                <div className="flex justify-between items-end">
                                                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Lembaga</span>
                                                    <span className="font-semibold text-slate-700">{prodi.lembaga}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }) : (
                                    <div className="col-span-1 sm:col-span-2 bg-white rounded-xl border border-slate-200 border-dashed p-8 text-center">
                                        <p className="text-slate-500">Belum ada data akreditasi program studi yang ditambahkan.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Section 3: Riwayat & SPMI */}
                        <div className="space-y-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                            {/* Riwayat Akreditasi */}
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        <History className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800">Riwayat Akreditasi</h3>
                                </div>
                                <div className="space-y-6">
                                    {riwayatAkreditasi.length > 0 ? riwayatAkreditasi.map((item, index) => (
                                        <div key={item.id ?? `${item.nama}-${index}`} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-emerald-500 before:rounded-full after:absolute after:left-1 after:top-4 after:w-0.5 after:h-full after:bg-emerald-100 last:after:hidden">
                                            <p className="text-sm font-bold text-slate-800">{item.nama}</p>
                                            <span className="inline-block mt-1 mb-0.5 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                                                {item.peringkat}
                                            </span>
                                            <p className="text-xs text-slate-500">{item.keterangan} ({item.lembaga})</p>
                                        </div>
                                    )) : (
                                        <div className="text-center py-4">
                                            <p className="text-sm text-slate-500 italic">Belum ada riwayat.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Unit Penjaminan Mutu */}
                            <div className="bg-slate-800 rounded-xl shadow-md p-6 text-white relative overflow-hidden">
                                <ShieldCheck className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5" />
                                <h3 className="text-lg font-bold mb-2 relative z-10">Unit Penjaminan Mutu (SPMI)</h3>
                                <p className="text-slate-300 text-sm mb-4 relative z-10 leading-relaxed">
                                    Lembaga internal yang bertugas memantau dan mengevaluasi mutu akademik di lingkungan Pascasarjana.
                                </p>
                                {waNumber ? (
                                    <button 
                                        onClick={() => setShowWaPopup(true)} 
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors relative z-10 group"
                                    >
                                        Hubungi LPM <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                ) : (
                                    <p className="text-sm text-slate-400 italic relative z-10">Kontak LPM belum tersedia</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* WA Popup */}
            {showWaPopup && waNumber && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 transition-opacity duration-300"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="wa-popup-title"
                >
                    <div 
                        className="absolute inset-0" 
                        onClick={() => setShowWaPopup(false)}
                    ></div>
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-sm overflow-hidden animate-fade-in-up relative z-10 border border-slate-200">
                        <div className="bg-emerald-600 p-4 text-white flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 id="wa-popup-title" className="font-bold">Admin LPM</h4>
                                <p className="text-xs text-emerald-100">Online</p>
                            </div>
                            <button
                                ref={closeButtonRef}
                                onClick={() => setShowWaPopup(false)}
                                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                aria-label="Tutup"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <p className="text-slate-600 text-sm mb-6 text-center">
                                Punya pertanyaan seputar akreditasi dan penjaminan mutu? Silakan hubungi kami via WhatsApp.
                            </p>
                            <a 
                                href={`https://wa.me/${waNumber}?text=Halo%20Admin%20LPM%20Pascasarjana%20IAI%20Persis%20Bandung`} 
                                target="_blank"
                                rel="noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 transition-colors shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                                </svg>
                                Lanjutkan ke Chat
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* PDF Preview Modal */}
            {previewPdf && typeof document !== 'undefined' && createPortal(
                <div 
                    className="fixed inset-0 z-[100] overflow-y-auto bg-slate-900/80 backdrop-blur-sm transition-opacity duration-300"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="preview-pdf-title"
                >
                    <div 
                        className="fixed inset-0" 
                        onClick={() => setPreviewPdf(null)}
                    ></div>
                    
                    <div className="flex min-h-full items-center justify-center p-4 sm:p-6 relative z-10">
                        <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl h-[85vh] min-h-[500px] flex flex-col overflow-hidden animate-fade-in-up border border-slate-200">
                        {/* Header Modal */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/80">
                            <div className="flex items-center gap-4 max-w-[70%] sm:max-w-[80%]">
                                <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-xl flex-shrink-0">
                                    <FileCheck className="w-6 h-6" />
                                </div>
                                <div className="overflow-hidden">
                                    <h3 id="preview-pdf-title" className="text-lg font-bold text-slate-800 truncate">{previewPdf.title}</h3>
                                    <p className="text-sm text-slate-500 mt-0.5 truncate">Pratinjau Dokumen PDF</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                                <a 
                                    href={previewPdf.url} 
                                    download 
                                    className="px-4 py-2 text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors flex items-center gap-2" 
                                    title="Unduh File"
                                >
                                    <Download className="w-4 h-4" />
                                    <span className="hidden sm:inline text-sm font-semibold">Unduh</span>
                                </a>
                                
                                <div className="w-px h-8 bg-slate-200 mx-1 hidden sm:block"></div>
                                
                                <button 
                                    ref={pdfCloseRef}
                                    onClick={() => setPreviewPdf(null)} 
                                    className="p-2 text-slate-400 hover:text-white hover:bg-red-500 rounded-lg transition-colors" 
                                    title="Tutup Preview"
                                    aria-label="Tutup preview"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                        
                        {/* Area Preview */}
                        <div className="flex-1 w-full bg-slate-800 p-0 sm:p-4 md:p-6 overflow-hidden">
                            <iframe 
                                src={previewPdf.url} 
                                className="w-full h-full sm:rounded-xl shadow-inner bg-white border-0"
                                title={previewPdf.title}
                            >
                                <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4">
                                    <p>Browser Anda tidak mendukung preview PDF secara langsung.</p>
                                    <a href={previewPdf.url} download className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium">
                                        Unduh Dokumen
                                    </a>
                                </div>
                            </iframe>
                        </div>
                    </div>
                    </div>
                </div>, document.body
            )}
        </PublicLayout>
    );
}