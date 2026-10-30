import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Clock, MapPin, BookOpen, User, Download, CalendarDays, Search, RotateCcw } from 'lucide-react';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function JadwalPerkuliahan({ pengaturan, periodes, programStudis }) {
    // Select first active periode by default
    const [activePeriodeId, setActivePeriodeId] = useState(periodes?.length > 0 ? periodes[0].id : null);
    
    // Filters
    const [filterProdi, setFilterProdi] = useState('Semua');
    const [filterSemester, setFilterSemester] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');

    const activePeriode = periodes?.find(p => p.id === activePeriodeId);

    // Derived states for options
    const semesterOptions = ['Semua', '1', '2', '3', '4'];
    
    // Extract unique Program Studi names from the actual data in this period
    const prodiOptions = useMemo(() => {
        if (!activePeriode?.mata_kuliahs) return ['Semua'];
        const uniqueProdis = [...new Set(activePeriode.mata_kuliahs.map(mk => mk.program_studi))];
        return ['Semua', ...uniqueProdis.filter(Boolean).sort()];
    }, [activePeriode]);

    // Filter logic
    const filteredJadwal = useMemo(() => {
        if (!activePeriode?.mata_kuliahs) return [];
        return activePeriode.mata_kuliahs.filter(mk => {
            const matchProdi = filterProdi === 'Semua' || mk.program_studi === filterProdi;
            const matchSemester = filterSemester === 'Semua' || mk.semester_ke.toString() === filterSemester;
            const matchSearch = mk.mata_kuliah.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                mk.dosen_pengampu.toLowerCase().includes(searchQuery.toLowerCase());
            return matchProdi && matchSemester && matchSearch;
        });
    }, [activePeriode, filterProdi, filterSemester, searchQuery]);

    // Grouping by Day for a cleaner display
    const groupedByDay = useMemo(() => {
        const order = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
        const grouped = filteredJadwal.reduce((acc, mk) => {
            if (!acc[mk.hari]) acc[mk.hari] = [];
            acc[mk.hari].push(mk);
            return acc;
        }, {});
        
        // Sort keys by days order
        return Object.keys(grouped).sort((a, b) => order.indexOf(a) - order.indexOf(b)).reduce(
            (obj, key) => { 
                // Sort by time inside day
                obj[key] = grouped[key].sort((x, y) => x.jam_mulai.localeCompare(y.jam_mulai));
                return obj;
            }, {}
        );
    }, [filteredJadwal]);

    return (
        <PublicLayout>
            <Head title="Jadwal Perkuliahan | Program Pascasarjana IAI Persis Bandung" />

            {/* Dark Minimalist Hero Section */}
            <div className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-[1.18] tracking-tight mb-4">
                        Jadwal <span className="font-serif italic font-normal text-emerald-300">Perkuliahan</span>
                    </h1>
                    <p className="text-slate-300/90 text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed">
                        {pengaturan?.deskripsi || 'Informasi jadwal perkuliahan, alokasi ruang kelas, dosen pengampu, dan waktu perkuliahan per semester.'}
                    </p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Akademik' },
                { label: 'Jadwal Perkuliahan' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFBFD] py-12 lg:py-16 border-b border-slate-200/80 min-h-[550px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {periodes && periodes.length > 0 ? (
                        <>
                            {/* Toolbar (Periode Tabs & Download) */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-thin">
                                    {periodes.map(p => (
                                        <button 
                                            key={p.id}
                                            onClick={() => setActivePeriodeId(p.id)}
                                            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                                                activePeriodeId === p.id 
                                                ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-600' 
                                                : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-200/80'
                                            }`}
                                        >
                                            <CalendarDays className="w-4 h-4" />
                                            <span>{p.tahun_akademik} — {p.semester_tipe}</span>
                                        </button>
                                    ))}
                                </div>

                                {activePeriode?.file_pdf && (
                                    <a 
                                        href={`/storage/${activePeriode.file_pdf}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/70 rounded-xl text-sm font-medium transition-colors shadow-xs shrink-0"
                                    >
                                        <Download className="w-4 h-4 text-emerald-600" />
                                        <span>Unduh PDF Jadwal</span>
                                    </a>
                                )}
                            </div>

                            {/* Filter Bar (Bento Control Card) */}
                            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 md:p-6 mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                    <div className="md:col-span-4">
                                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                            Program Studi
                                        </label>
                                        <select 
                                            className="w-full border-slate-200 rounded-xl text-sm font-medium text-slate-700 bg-slate-50/60 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors py-2.5 px-3"
                                            value={filterProdi}
                                            onChange={e => setFilterProdi(e.target.value)}
                                        >
                                            {prodiOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                                            Semester
                                        </label>
                                        <select 
                                            className="w-full border-slate-200 rounded-xl text-sm font-medium text-slate-700 bg-slate-50/60 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors py-2.5 px-3"
                                            value={filterSemester}
                                            onChange={e => setFilterSemester(e.target.value)}
                                        >
                                            {semesterOptions.map(opt => (
                                                <option key={opt} value={opt}>
                                                    {opt === 'Semua' ? 'Semua Semester' : `Semester ${opt}`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:col-span-5">
                                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                            <Search className="w-3.5 h-3.5 text-slate-400" />
                                            <span>Pencarian Cepat</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="Cari Mata Kuliah / Dosen Pengampu..."
                                            className="w-full border-slate-200 rounded-xl text-sm font-medium text-slate-800 placeholder-slate-400 bg-slate-50/60 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors py-2.5 px-3.5"
                                            value={searchQuery}
                                            onChange={e => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Table List View by Day */}
                            {filteredJadwal.length > 0 ? (
                                <div className="space-y-6">
                                    {Object.keys(groupedByDay).map(hari => (
                                        <div key={hari} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                                            <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between">
                                                <h3 className="text-sm font-semibold tracking-wider uppercase text-emerald-400">
                                                    Hari {hari}
                                                </h3>
                                                <span className="text-xs font-medium text-slate-400">
                                                    {groupedByDay[hari].length} Mata Kuliah
                                                </span>
                                            </div>
                                            <div className="divide-y divide-slate-100">
                                                {groupedByDay[hari].map(mk => (
                                                    <div key={mk.id} className="p-5 sm:p-6 flex flex-col md:flex-row gap-5 hover:bg-slate-50/70 transition-colors group">
                                                        {/* Waktu & Ruang */}
                                                        <div className="md:w-52 shrink-0 flex flex-col gap-2 border-l-2 border-emerald-500 pl-4">
                                                            <div className="flex items-center gap-2 text-slate-900 font-semibold text-base">
                                                                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                                                                <span>{mk.jam_mulai.slice(0,5)} – {mk.jam_selesai.slice(0,5)}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-slate-600 font-medium bg-slate-100 px-2.5 py-1 rounded-lg w-fit text-xs border border-slate-200/60">
                                                                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                                                                <span>{mk.ruangan}</span>
                                                            </div>
                                                        </div>

                                                        {/* Informasi Matkul */}
                                                        <div className="flex-1 space-y-3">
                                                            <div>
                                                                <h4 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-2">
                                                                    <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
                                                                    <span>{mk.mata_kuliah}</span>
                                                                </h4>
                                                                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1.5">
                                                                    <span className="font-medium text-slate-700">{mk.program_studi}</span>
                                                                    <span className="text-slate-300">&bull;</span>
                                                                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                                                                        Semester {mk.semester_ke}
                                                                    </span>
                                                                    <span className="text-slate-300">&bull;</span>
                                                                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                                                                        {mk.sks} SKS
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            
                                                            <div>
                                                                <div className="flex items-center gap-2.5 text-slate-700 bg-slate-50/80 px-3.5 py-2 rounded-xl border border-slate-200/60 w-fit">
                                                                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                                                                    <div className="text-xs">
                                                                        <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px] block">Dosen Pengampu</span>
                                                                        <span className="font-semibold text-slate-800">{mk.dosen_pengampu}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-16 text-center text-slate-500">
                                    <Search className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                                    <h3 className="text-lg font-semibold text-slate-800 mb-1">Jadwal Tidak Ditemukan</h3>
                                    <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                                        Tidak ada jadwal perkuliahan yang sesuai dengan kriteria filter pencarian Anda.
                                    </p>
                                    <button 
                                        onClick={() => { setFilterProdi('Semua'); setFilterSemester('Semua'); setSearchQuery(''); }}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors"
                                    >
                                        <RotateCcw className="w-3.5 h-3.5" />
                                        <span>Reset Filter</span>
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-16 text-center text-slate-500">
                            <CalendarDays className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                            <h3 className="text-lg font-semibold text-slate-800 mb-1">Belum Ada Jadwal Perkuliahan</h3>
                            <p className="text-sm text-slate-500 max-w-md mx-auto">
                                Jadwal perkuliahan untuk periode ini belum dipublikasikan oleh pihak akademik.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </PublicLayout>
    );
}
