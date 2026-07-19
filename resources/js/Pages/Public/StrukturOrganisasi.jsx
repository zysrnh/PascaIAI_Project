import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Users } from 'lucide-react';

export default function StrukturOrganisasi({ organisasi }) {
    // Dummy banner image
    const bannerImg = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop";

    return (
        <PublicLayout>
            <Head title="Struktur Organisasi | Pascasarjana IAI Persis Bandung" />

            {/* Hero Section / Banner */}
            <div className="relative w-full h-[350px] md:h-[450px] bg-emerald-950 flex flex-col justify-end">
                <div className="absolute inset-0">
                    <img 
                        src={bannerImg} 
                        alt="Struktur Organisasi Banner" 
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-md">
                        Struktur Organisasi
                    </h1>
                    <div className="w-20 h-1.5 bg-amber-500 rounded-sm"></div>
                </div>
            </div>

            {/* Main Content */}
            <div className="py-20 bg-slate-50 relative overflow-hidden min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-emerald-950 mb-4">Pimpinan & Pengurus</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Susunan pengelola Program Pascasarjana IAI Persis Bandung yang berkomitmen untuk menyelenggarakan pendidikan dan pelayanan akademik terbaik.
                        </p>
                    </div>

                    {organisasi && organisasi.length > 0 ? (
                        <div className="flex flex-col items-center w-full overflow-x-auto pb-10">
                            <div className="min-w-[800px] flex flex-col items-center">
                                {/* CSS untuk Garis Struktur (menggunakan pseudo-elements) */}
                                <style dangerouslySetInnerHTML={{__html: `
                                    .organogram ul {
                                        padding-top: 20px;
                                        position: relative;
                                        display: flex;
                                        justify-content: center;
                                    }
                                    .organogram li {
                                        float: left;
                                        text-align: center;
                                        list-style-type: none;
                                        position: relative;
                                        padding: 20px 10px 0 10px;
                                    }
                                    .organogram li::before, .organogram li::after {
                                        content: '';
                                        position: absolute;
                                        top: 0;
                                        right: 50%;
                                        border-top: 2px solid #34d399; /* emerald-400 */
                                        width: 50%;
                                        height: 20px;
                                    }
                                    .organogram li::after {
                                        right: auto;
                                        left: 50%;
                                        border-left: 2px solid #34d399;
                                    }
                                    .organogram li:only-child::after, .organogram li:only-child::before {
                                        display: none;
                                    }
                                    .organogram li:only-child {
                                        padding-top: 0;
                                    }
                                    .organogram li:first-child::before, .organogram li:last-child::after {
                                        border: 0 none;
                                    }
                                    .organogram li:last-child::before {
                                        border-right: 2px solid #34d399;
                                        border-radius: 0 5px 0 0;
                                    }
                                    .organogram li:first-child::after {
                                        border-radius: 5px 0 0 0;
                                    }
                                    .organogram ul ul::before {
                                        content: '';
                                        position: absolute;
                                        top: 0;
                                        left: 50%;
                                        border-left: 2px solid #34d399;
                                        width: 0;
                                        height: 20px;
                                    }
                                `}} />

                                <div className="organogram">
                                    <ul>
                                        {/* Level 1: Direktur / Top Pimpinan */}
                                        <li>
                                            <div className="inline-flex flex-col items-center bg-white rounded-xl shadow-lg border-2 border-emerald-500 p-5 w-72 relative z-10 transform transition-transform hover:-translate-y-1 hover:shadow-xl">
                                                <div className="w-24 h-24 mb-3 rounded-full overflow-hidden border-4 border-emerald-100 shadow-sm relative">
                                                    {organisasi[0].foto ? (
                                                        <img src={organisasi[0].foto} alt={organisasi[0].nama} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400"><Users className="w-10 h-10" /></div>
                                                    )}
                                                </div>
                                                <h3 className="text-md font-bold text-slate-800 mb-1 leading-tight">{organisasi[0].nama}</h3>
                                                <p className="text-xs font-semibold text-white bg-emerald-600 px-3 py-1.5 rounded-lg mt-1 block shadow-sm w-full text-center leading-snug">{organisasi[0].jabatan}</p>
                                            </div>
                                            
                                            {/* Anak-anaknya (Level 2 dan seterusnya) */}
                                            {organisasi.length > 1 && (
                                                <ul>
                                                    {organisasi.slice(1, 3).map((item, idx) => (
                                                        <li key={item.id}>
                                                            <div className="inline-flex flex-col items-center bg-white rounded-xl shadow-md border border-slate-200 p-4 w-64 relative z-10 transform transition-transform hover:-translate-y-1 hover:border-emerald-300">
                                                                <div className="w-20 h-20 mb-3 rounded-full overflow-hidden border-2 border-emerald-50 shadow-sm relative">
                                                                    {item.foto ? (
                                                                        <img src={item.foto} alt={item.nama} className="w-full h-full object-cover" />
                                                                    ) : (
                                                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400"><Users className="w-8 h-8" /></div>
                                                                    )}
                                                                </div>
                                                                <h3 className="text-sm font-bold text-slate-700 mb-1 leading-tight">{item.nama}</h3>
                                                                <p className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1.5 rounded-lg mt-1 w-full text-center leading-snug">{item.jabatan}</p>
                                                            </div>
                                                            
                                                            {/* Jika ada Level 3 (dibagi 2 kubu untuk di bawah Wadir 1 dan Wadir 2) */}
                                                            {organisasi.length > 3 && (
                                                                <ul>
                                                                    {idx === 0 
                                                                        ? organisasi.slice(3, 5).map(subItem => (
                                                                            <li key={subItem.id}>
                                                                                <div className="inline-flex flex-col items-center bg-white rounded-lg shadow-sm border border-slate-100 p-3 w-56 relative z-10 transform transition-transform hover:-translate-y-1 hover:border-emerald-200">
                                                                                    <div className="w-16 h-16 mb-2 rounded-full overflow-hidden border border-slate-100 relative">
                                                                                        {subItem.foto ? <img src={subItem.foto} alt={subItem.nama} className="w-full h-full object-cover" /> : <Users className="w-6 h-6 text-slate-300 m-auto mt-5" />}
                                                                                    </div>
                                                                                    <h3 className="text-xs font-bold text-slate-700 mb-1 leading-tight">{subItem.nama}</h3>
                                                                                    <p className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded-md w-full text-center leading-snug">{subItem.jabatan}</p>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                        : organisasi.slice(5).map(subItem => (
                                                                            <li key={subItem.id}>
                                                                                <div className="inline-flex flex-col items-center bg-white rounded-lg shadow-sm border border-slate-100 p-3 w-56 relative z-10 transform transition-transform hover:-translate-y-1 hover:border-emerald-200">
                                                                                    <div className="w-16 h-16 mb-2 rounded-full overflow-hidden border border-slate-100 relative">
                                                                                        {subItem.foto ? <img src={subItem.foto} alt={subItem.nama} className="w-full h-full object-cover" /> : <Users className="w-6 h-6 text-slate-300 m-auto mt-5" />}
                                                                                    </div>
                                                                                    <h3 className="text-xs font-bold text-slate-700 mb-1 leading-tight">{subItem.nama}</h3>
                                                                                    <p className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded-md w-full text-center leading-snug">{subItem.jabatan}</p>
                                                                                </div>
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Struktur Belum Tersedia</h3>
                            <p className="text-slate-500">Data struktur organisasi saat ini belum dimasukkan ke dalam sistem.</p>
                        </div>
                    )}

                </div>
            </div>
        </PublicLayout>
    );
}
