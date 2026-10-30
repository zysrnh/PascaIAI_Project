import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { BookOpen, FileText, ChevronRight, School, Filter, Library, ChevronDown } from 'lucide-react';
import Breadcrumb from '@/Components/Public/Breadcrumb';

export default function KurikulumPublic({ kurikulums, activeKurikulum, fakultas, pengaturan }) {
    const [selectedFakultas, setSelectedFakultas] = useState(fakultas.length > 0 ? fakultas[0].id : null);
    
    // Find initial prodi
    const initialFakultas = fakultas.find(f => f.id === selectedFakultas);
    const [selectedProdi, setSelectedProdi] = useState(
        initialFakultas && initialFakultas.program_studis.length > 0 
            ? initialFakultas.program_studis[0].id 
            : null
    );

    // Update prodi when fakultas changes
    useEffect(() => {
        const currentFakultas = fakultas.find(f => f.id === selectedFakultas);
        if (currentFakultas && currentFakultas.program_studis.length > 0) {
            const isProdiInFakultas = currentFakultas.program_studis.some(p => p.id === selectedProdi);
            if (!isProdiInFakultas) {
                setSelectedProdi(currentFakultas.program_studis[0].id);
            }
        } else {
            setSelectedProdi(null);
        }
    }, [selectedFakultas, fakultas]);

    const handleKurikulumChange = (e) => {
        router.get(route('public.akademik.kurikulum'), { kurikulum_id: e.target.value }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    // Get current prodi and its courses
    const currentFakultasObj = fakultas.find(f => f.id === selectedFakultas);
    const currentProdiObj = currentFakultasObj?.program_studis.find(p => p.id === selectedProdi);
    const mataKuliahs = currentProdiObj?.mata_kuliahs || [];

    // Group by semester
    const groupedMataKuliahs = mataKuliahs.reduce((acc, mk) => {
        const sem = mk.semester || 1;
        if (!acc[sem]) acc[sem] = [];
        acc[sem].push(mk);
        return acc;
    }, {});

    const semesters = Object.keys(groupedMataKuliahs).sort((a, b) => Number(a) - Number(b));
    const totalSks = mataKuliahs.reduce((sum, mk) => sum + (Number(mk.sks) || 0), 0);

    return (
        <PublicLayout>
            <Head title="Kurikulum & Struktur Akademik | Prodi KPI IAI Persis Bandung" />

            {/* Minimalist Editorial Hero Section */}
            <section className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                {pengaturan?.banner_image && (
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={pengaturan.banner_image} 
                            alt="Banner Kurikulum" 
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070E1E] via-[#091122]/80 to-[#091122]/90"></div>
                    </div>
                )}

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-3xl text-left">
                        <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-semibold text-white leading-[1.18] tracking-tight mb-4">
                            Kurikulum &amp; <span className="font-serif italic font-normal text-emerald-300">Struktur Akademik</span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                            {pengaturan?.deskripsi || 'Struktur kurikulum, sebaran mata kuliah, dan capaian pembelajaran Program Studi di lingkungan IAI Persis Bandung.'}
                        </p>
                    </div>
                </div>
            </section>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Akademik' },
                { label: 'Kurikulum' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFAFA] py-12 sm:py-20 border-b border-slate-200 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Control Panel Bento Card */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100 shrink-0">
                                <Library className="w-6 h-6 text-emerald-700" />
                            </div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight">
                                    Struktur Kurikulum <span className="font-serif italic font-normal text-slate-700">Mata Kuliah</span>
                                </h2>
                                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                                    Pilih tahun akademik kurikulum dan program studi untuk melihat sebaran per semester.
                                </p>
                            </div>
                        </div>
                        
                        <div className="w-full md:w-auto min-w-[280px]">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                Tahun Kurikulum / Akademik
                            </label>
                            <select 
                                value={activeKurikulum?.id || ''} 
                                onChange={handleKurikulumChange}
                                className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-xl focus:ring-emerald-700 focus:border-emerald-700 block p-3 font-medium shadow-sm transition"
                            >
                                {kurikulums.map(k => (
                                    <option key={k.id} value={k.id}>
                                        {k.nama} — {k.tahun_akademik} {k.is_active ? '(Aktif)' : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Sidebar Filter Program Studi (30%) */}
                        <div className="lg:col-span-4 lg:sticky lg:top-28">
                            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                                <div className="p-5 bg-[#0E1626] text-white flex items-center gap-2.5 font-semibold text-sm">
                                    <Filter className="w-4 h-4 text-emerald-400" />
                                    <span>Pilih Fakultas &amp; Program Studi</span>
                                </div>
                                
                                <div className="p-2 space-y-1">
                                    {fakultas.map(fak => (
                                        <div key={fak.id} className="rounded-xl overflow-hidden">
                                            <button
                                                onClick={() => setSelectedFakultas(fak.id)}
                                                className={`w-full flex items-center justify-between p-3.5 text-left font-semibold text-sm transition-colors rounded-xl ${
                                                    selectedFakultas === fak.id 
                                                        ? 'bg-emerald-50 text-emerald-900' 
                                                        : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                <span className="flex items-center gap-2.5">
                                                    <School className="w-4 h-4 text-emerald-700" />
                                                    {fak.nama}
                                                </span>
                                                <ChevronDown className={`w-4 h-4 transition-transform ${selectedFakultas === fak.id ? 'rotate-180 text-emerald-700' : 'text-slate-400'}`} />
                                            </button>
                                            
                                            <div className={`overflow-hidden transition-all duration-200 ease-in-out ${selectedFakultas === fak.id ? 'max-h-96' : 'max-h-0'}`}>
                                                <div className="pl-6 pr-2 py-2 space-y-1">
                                                    {fak.program_studis.length > 0 ? (
                                                        fak.program_studis.map(prodi => (
                                                            <button
                                                                key={prodi.id}
                                                                onClick={() => setSelectedProdi(prodi.id)}
                                                                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                                                                    selectedProdi === prodi.id
                                                                        ? 'bg-slate-900 text-white shadow-sm'
                                                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                                                }`}
                                                            >
                                                                <span>{prodi.nama}</span>
                                                                <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                                                                    selectedProdi === prodi.id
                                                                        ? 'bg-white/20 text-white'
                                                                        : 'bg-slate-100 text-slate-500'
                                                                }`}>
                                                                    {prodi.jenjang}
                                                                </span>
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <div className="text-xs text-slate-400 italic p-2">Belum ada program studi</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Data Kurikulum & Mata Kuliah (70%) */}
                        <div className="lg:col-span-8">
                            {currentProdiObj ? (
                                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                                    
                                    {/* Header Info Prodi */}
                                    <div className="p-6 sm:p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Rincian Mata Kuliah</span>
                                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight mt-0.5">
                                                {currentProdiObj.nama} <span className="font-mono text-sm text-slate-500 font-normal">({currentProdiObj.jenjang})</span>
                                            </h3>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
                                                    Total Beban Studi: <strong className="font-bold text-emerald-900">{totalSks} SKS</strong>
                                                </span>
                                            </div>
                                        </div>

                                        {currentProdiObj.kurikulum_file_path && (
                                            <a 
                                                href={`/storage/${currentProdiObj.kurikulum_file_path}`} 
                                                target="_blank"
                                                rel="noreferrer" 
                                                download
                                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-xs sm:text-sm font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm"
                                            >
                                                <FileText className="w-4 h-4 text-emerald-400" />
                                                <span>Unduh Silabus PDF</span>
                                            </a>
                                        )}
                                    </div>
                                    
                                    {/* Tabel Mata Kuliah */}
                                    <div className="p-0 overflow-x-auto">
                                        {semesters.length === 0 ? (
                                            <div className="text-center py-16 px-6">
                                                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                                <h4 className="text-base font-semibold text-slate-800">Belum Ada Data Mata Kuliah</h4>
                                                <p className="text-slate-500 text-sm max-w-sm mx-auto mt-1">
                                                    Mata kuliah untuk program studi ini pada tahun kurikulum yang dipilih belum dimasukkan.
                                                </p>
                                            </div>
                                        ) : (
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                                                        <th className="py-3 px-4 font-semibold border-r border-slate-200 w-16 text-center">Smt</th>
                                                        <th className="py-3 px-4 font-semibold border-r border-slate-200 w-1/4">Jenis</th>
                                                        <th className="py-3 px-4 font-semibold border-r border-slate-200 w-24">Kode</th>
                                                        <th className="py-3 px-4 font-semibold border-r border-slate-200">Nama Mata Kuliah</th>
                                                        <th className="py-3 px-4 font-semibold w-20 text-center">SKS</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm">
                                                    {semesters.map(semester => {
                                                        const mks = groupedMataKuliahs[semester];
                                                        return mks.map((mk, idx) => (
                                                            <tr key={mk.id} className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors">
                                                                {idx === 0 && (
                                                                    <td 
                                                                        rowSpan={mks.length} 
                                                                        className="py-3 px-4 border-r border-slate-200 text-center font-bold text-slate-800 bg-slate-50/60 font-mono"
                                                                    >
                                                                        {semester}
                                                                    </td>
                                                                )}
                                                                <td className="py-3 px-4 border-r border-slate-200 text-slate-600 text-xs">
                                                                    <span className="inline-block px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-medium">
                                                                        {mk.jenis}
                                                                    </span>
                                                                </td>
                                                                <td className="py-3 px-4 border-r border-slate-200 font-mono text-xs text-slate-600">{mk.kode_mk}</td>
                                                                <td className="py-3 px-4 border-r border-slate-200 font-medium text-slate-900">{mk.nama_mk}</td>
                                                                <td className="py-3 px-4 text-center font-semibold text-emerald-800 bg-emerald-50/30">{mk.sks}</td>
                                                            </tr>
                                                        ));
                                                    })}
                                                </tbody>
                                                <tfoot>
                                                    <tr className="bg-[#0E1626] text-white">
                                                        <td colSpan="4" className="py-3.5 px-4 text-right font-semibold text-xs uppercase tracking-wider">
                                                            Total Beban SKS Keseluruhan :
                                                        </td>
                                                        <td className="py-3.5 px-4 text-center font-bold text-emerald-300 font-mono text-sm">
                                                            {totalSks}
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                                    <School className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                                    <h3 className="text-base font-semibold text-slate-800 mb-1">Pilih Program Studi</h3>
                                    <p className="max-w-md mx-auto text-sm text-slate-500">
                                        Silakan pilih fakultas dan program studi pada menu di sebelah kiri untuk melihat daftar kurikulum dan rincian mata kuliah.
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
