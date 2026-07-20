import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Clock, MapPin, BookOpen, User, Filter, Download, CalendarDays, Search } from 'lucide-react';
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
            <Head title="Jadwal Perkuliahan - Pascasarjana IAI Persis Bandung" />

            {/* Banner Section */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={pengaturan?.banner_image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop"}
                        alt="Jadwal Perkuliahan Banner" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md tracking-tight">
                        Jadwal Perkuliahan
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                    {pengaturan?.deskripsi && (
                        <p className="text-white/90 max-w-2xl text-lg md:text-xl leading-relaxed drop-shadow">
                            {pengaturan.deskripsi}
                        </p>
                    )}
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Akademik' },
                { label: 'Jadwal Perkuliahan' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-slate-50 py-12 border-b border-slate-200 min-h-[500px]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {periodes && periodes.length > 0 ? (
                        <>
                            {/* Toolbar (Periode Tabs & Download) */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                                    {periodes.map(p => (
                                        <button 
                                            key={p.id}
                                            onClick={() => setActivePeriodeId(p.id)}
                                            className={`flex-shrink-0 px-5 py-2.5 rounded-full font-semibold transition-all shadow-sm flex items-center gap-2 ${
                                                activePeriodeId === p.id 
                                                ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-600 ring-offset-2 ring-offset-slate-50' 
                                                : 'bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200'
                                            }`}
                                        >
                                            <CalendarDays className="w-4 h-4" />
                                            {p.tahun_akademik} - {p.semester_tipe}
                                        </button>
                                    ))}
                                </div>

                                {activePeriode?.file_pdf && (
                                    <a 
                                        href={`/storage/${activePeriode.file_pdf}`} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        download={`Jadwal_Perkuliahan_${activePeriode.tahun_akademik.replace('/','-')}_${activePeriode.semester_tipe}.pdf`}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-colors shadow-sm whitespace-nowrap"
                                    >
                                        <Download className="w-4 h-4" /> Unduh Dokumen PDF
                                    </a>
                                )}
                            </div>

                            {/* Filters */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 items-end animate-fade-in">
                                <div className="w-full md:w-1/3">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                                        <Filter className="w-3 h-3" /> Program Studi
                                    </label>
                                    <select 
                                        className="w-full border-slate-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-slate-50"
                                        value={filterProdi}
                                        onChange={e => setFilterProdi(e.target.value)}
                                    >
                                        {prodiOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                </div>
                                <div className="w-full md:w-1/4">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                                        <Filter className="w-3 h-3" /> Semester
                                    </label>
                                    <select 
                                        className="w-full border-slate-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-slate-50"
                                        value={filterSemester}
                                        onChange={e => setFilterSemester(e.target.value)}
                                    >
                                        {semesterOptions.map(opt => <option key={opt} value={opt}>{opt === 'Semua' ? 'Semua Semester' : `Semester ${opt}`}</option>)}
                                    </select>
                                </div>
                                <div className="w-full md:w-5/12 relative">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                                        <Search className="w-3 h-3" /> Cari
                                    </label>
                                    <input 
                                        type="text" 
                                        placeholder="Cari Mata Kuliah / Dosen..."
                                        className="w-full border-slate-300 rounded-lg shadow-sm focus:border-emerald-500 focus:ring-emerald-500 bg-slate-50 pl-4"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Table List View */}
                            {filteredJadwal.length > 0 ? (
                                <div className="space-y-8 animate-fade-in-up">
                                    {Object.keys(groupedByDay).map(hari => (
                                        <div key={hari} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                            <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-4">
                                                <h3 className="text-lg font-bold text-emerald-900 uppercase tracking-wider">{hari}</h3>
                                            </div>
                                            <div className="divide-y divide-slate-100">
                                                {groupedByDay[hari].map(mk => (
                                                    <div key={mk.id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-slate-50 transition-colors group">
                                                        {/* Waktu & Ruang */}
                                                        <div className="md:w-48 shrink-0 flex flex-col gap-2 border-l-4 border-emerald-500 pl-4">
                                                            <div className="flex items-center gap-2 text-slate-800 font-bold text-lg">
                                                                <Clock className="w-5 h-5 text-emerald-600" />
                                                                {mk.jam_mulai.slice(0,5)} - {mk.jam_selesai.slice(0,5)}
                                                            </div>
                                                            <div className="flex items-center gap-2 text-slate-500 font-medium bg-slate-100 px-2 py-1 rounded w-fit text-sm">
                                                                <MapPin className="w-4 h-4 text-blue-500" />
                                                                {mk.ruangan}
                                                            </div>
                                                        </div>

                                                        {/* Informasi Matkul */}
                                                        <div className="flex-1 space-y-2">
                                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                                                <div>
                                                                    <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                                                        <BookOpen className="w-5 h-5 text-emerald-600" />
                                                                        {mk.mata_kuliah}
                                                                    </h4>
                                                                    <div className="text-slate-500 text-sm mt-1">
                                                                        {mk.program_studi} — Semester {mk.semester_ke} &bull; <span className="font-semibold">{mk.sks} SKS</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="pt-2">
                                                                <div className="flex items-start gap-2 text-slate-700 bg-blue-50/50 p-2 rounded-lg border border-blue-100/50">
                                                                    <User className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                                                    <div>
                                                                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600/80 block">Dosen Pengampu</span>
                                                                        <span className="font-semibold">{mk.dosen_pengampu}</span>
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
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-16 text-center text-slate-500 animate-fade-in">
                                    <Search className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                                    <h3 className="text-xl font-bold text-slate-700 mb-2">Jadwal Tidak Ditemukan</h3>
                                    <p className="max-w-md mx-auto">Tidak ada jadwal yang sesuai dengan filter pencarian Anda pada periode ini.</p>
                                    <button 
                                        onClick={() => { setFilterProdi('Semua'); setFilterSemester('Semua'); setSearchQuery(''); }}
                                        className="mt-6 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-medium transition-colors"
                                    >
                                        Reset Filter
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-16 text-center text-slate-500">
                            <CalendarDays className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Belum Ada Jadwal Perkuliahan</h3>
                            <p className="max-w-md mx-auto">Jadwal perkuliahan untuk periode ini belum dipublikasikan oleh administrator.</p>
                        </div>
                    )}

                </div>
            </div>
        </PublicLayout>
    );
}
