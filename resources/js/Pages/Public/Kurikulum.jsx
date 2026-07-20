import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { BookOpen, FileText, ChevronRight, Home, School, Filter, Library, ChevronDown } from 'lucide-react';

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
            // Only update if current prodi is not in this fakultas
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
        if (!acc[mk.semester]) acc[mk.semester] = [];
        acc[mk.semester].push(mk);
        return acc;
    }, {});
    const semesters = Object.keys(groupedMataKuliahs).sort((a, b) => Number(a) - Number(b));
    
    const totalSks = mataKuliahs.reduce((total, mk) => total + mk.sks, 0);

    return (
        <PublicLayout>
            <Head title={`Kurikulum - ${activeKurikulum?.nama || 'Pascasarjana'}`} />

            {/* Hero Section with Banner */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={pengaturan?.banner_image ? `/storage/${pengaturan.banner_image}` : "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop"}
                        alt="Kurikulum Banner" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md tracking-tight">
                        Kurikulum {activeKurikulum ? activeKurikulum.tahun_akademik : ''}
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm mb-4"></div>
                    <p className="text-white/90 max-w-2xl text-lg md:text-xl leading-relaxed drop-shadow">
                        {pengaturan?.deskripsi || 'Struktur kurikulum dan sebaran mata kuliah Program Studi di Pascasarjana IAI Persis Bandung.'}
                    </p>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <div className="bg-white border-b border-slate-200 sticky top-[72px] z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex py-4" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2 text-sm">
                            <li>
                                <Link href="/" className="text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-1">
                                    <Home className="w-4 h-4" />
                                    <span className="hidden sm:inline">Beranda</span>
                                </Link>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
                                    <span className="text-slate-500">Akademik</span>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center">
                                    <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />
                                    <span className="text-emerald-600 font-medium">Kurikulum</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-slate-50 py-12 lg:py-20 border-b border-slate-200 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header & Controls */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8 animate-fade-in-up">
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                                    <Library className="w-8 h-8" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">Struktur Kurikulum</h2>
                                    <p className="text-slate-500 mt-1">Lihat daftar mata kuliah per program studi.</p>
                                </div>
                            </div>
                            
                            <div className="w-full md:w-auto min-w-[250px]">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Pilih Tahun Kurikulum / Akademik</label>
                                <select 
                                    value={activeKurikulum?.id || ''} 
                                    onChange={handleKurikulumChange}
                                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 font-medium shadow-sm"
                                >
                                    {kurikulums.map(k => (
                                        <option key={k.id} value={k.id}>
                                            {k.nama} - {k.tahun_akademik} {k.is_active ? '(Aktif)' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filter Berjenjang */}
                        <div className="w-full lg:w-1/4 flex-shrink-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-32">
                                <div className="p-4 bg-slate-800 text-white flex items-center gap-2 font-bold">
                                    <Filter className="w-5 h-5" />
                                    Filter Program Studi
                                </div>
                                
                                <div className="p-0">
                                    {fakultas.map(fak => (
                                        <div key={fak.id} className="border-b border-slate-100 last:border-0">
                                            <button
                                                onClick={() => setSelectedFakultas(fak.id)}
                                                className={`w-full flex items-center justify-between p-4 text-left font-semibold transition-colors ${
                                                    selectedFakultas === fak.id 
                                                        ? 'bg-emerald-50 text-emerald-700' 
                                                        : 'text-slate-700 hover:bg-slate-50'
                                                }`}
                                            >
                                                <span className="flex items-center gap-2">
                                                    <School className="w-4 h-4 text-emerald-600" />
                                                    {fak.nama}
                                                </span>
                                                <ChevronDown className={`w-4 h-4 transition-transform ${selectedFakultas === fak.id ? 'rotate-180 text-emerald-600' : 'text-slate-400'}`} />
                                            </button>
                                            
                                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${selectedFakultas === fak.id ? 'max-h-96' : 'max-h-0'}`}>
                                                <div className="bg-slate-50/50 p-2 space-y-1">
                                                    {fak.program_studis.length > 0 ? (
                                                        fak.program_studis.map(prodi => (
                                                            <button
                                                                key={prodi.id}
                                                                onClick={() => setSelectedProdi(prodi.id)}
                                                                className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:block ${
                                                                    selectedProdi === prodi.id
                                                                        ? 'bg-emerald-600 text-white before:bg-white shadow-sm'
                                                                        : 'text-slate-600 hover:bg-slate-200 before:bg-slate-300'
                                                                }`}
                                                            >
                                                                {prodi.nama} ({prodi.jenjang})
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <div className="text-xs text-slate-500 italic p-3 text-center">Belum ada program studi</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Data Kurikulum */}
                        <div className="w-full lg:w-3/4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            {currentProdiObj ? (
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                    <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-emerald-50 to-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                                <BookOpen className="w-6 h-6 text-emerald-600" />
                                                Kurikulum {currentProdiObj.nama} ({currentProdiObj.jenjang})
                                            </h3>
                                            <p className="text-slate-500 mt-1">Total beban studi: <strong className="text-emerald-700">{totalSks} SKS</strong></p>
                                        </div>
                                        {currentProdiObj.kurikulum_file_path && (
                                            <a 
                                                href={`/storage/${currentProdiObj.kurikulum_file_path}`} 
                                                target="_blank"
                                                rel="noreferrer"
                                                download
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-900 transition-colors shadow-sm"
                                            >
                                                <FileText className="w-4 h-4" /> Unduh PDF
                                            </a>
                                        )}
                                    </div>
                                    
                                    <div className="p-0 overflow-x-auto">
                                        {semesters.length === 0 ? (
                                            <div className="text-center py-16 px-4">
                                                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                                <h4 className="text-lg font-bold text-slate-700">Belum ada data mata kuliah</h4>
                                                <p className="text-slate-500 max-w-sm mx-auto mt-1">Mata kuliah untuk program studi ini pada kurikulum yang dipilih belum tersedia.</p>
                                            </div>
                                        ) : (
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-slate-100 text-slate-600 text-sm border-y border-slate-200">
                                                        <th className="py-3 px-4 font-bold border-r border-slate-200 w-16 text-center">Smt</th>
                                                        <th className="py-3 px-4 font-bold border-r border-slate-200 w-1/4">Jenis Mata Kuliah</th>
                                                        <th className="py-3 px-4 font-bold border-r border-slate-200 w-24">Kode</th>
                                                        <th className="py-3 px-4 font-bold border-r border-slate-200">Nama Mata Kuliah</th>
                                                        <th className="py-3 px-4 font-bold w-20 text-center">SKS</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-sm">
                                                    {semesters.map(semester => {
                                                        const mks = groupedMataKuliahs[semester];
                                                        return mks.map((mk, idx) => (
                                                            <tr key={mk.id} className="border-b border-slate-100 hover:bg-emerald-50/30 transition-colors">
                                                                {idx === 0 && (
                                                                    <td 
                                                                        rowSpan={mks.length} 
                                                                        className="py-3 px-4 border-r border-slate-200 text-center font-bold text-slate-700 bg-slate-50"
                                                                    >
                                                                        {semester}
                                                                    </td>
                                                                )}
                                                                <td className="py-3 px-4 border-r border-slate-200 text-slate-600 text-xs font-medium">
                                                                    <span className="inline-block px-2 py-1 bg-slate-100 rounded text-slate-700">
                                                                        {mk.jenis}
                                                                    </span>
                                                                </td>
                                                                <td className="py-3 px-4 border-r border-slate-200 font-medium text-slate-600">{mk.kode_mk}</td>
                                                                <td className="py-3 px-4 border-r border-slate-200 font-bold text-slate-800">{mk.nama_mk}</td>
                                                                <td className="py-3 px-4 text-center font-bold text-emerald-700 bg-emerald-50/50">{mk.sks}</td>
                                                            </tr>
                                                        ));
                                                    })}
                                                </tbody>
                                                <tfoot>
                                                    <tr className="bg-slate-800 text-white">
                                                        <td colSpan="4" className="py-3 px-4 text-right font-bold text-sm">TOTAL SKS :</td>
                                                        <td className="py-3 px-4 text-center font-bold">{totalSks}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center text-slate-500 animate-fade-in">
                                    <School className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                                    <h3 className="text-xl font-bold text-slate-700 mb-2">Pilih Program Studi</h3>
                                    <p className="max-w-md mx-auto">Silakan pilih fakultas dan program studi pada menu di samping untuk melihat daftar kurikulum dan mata kuliah.</p>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
