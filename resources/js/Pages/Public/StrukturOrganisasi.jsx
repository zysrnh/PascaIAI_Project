import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';
const getInitials = (name) => {
    if (!name) return '??';
    return name.substring(0, 2).toUpperCase();
};

const TreeNode = ({ node }) => {
    // Tentukan style berdasarkan urutan/level
    const isLevel1 = node.urutan === '1';
    const isLevel2 = node.urutan === '2A' || node.urutan === '2B';
    
    // Style wrapper
    const wrapperStyle = isLevel1 
        ? "inline-flex flex-col items-center bg-white rounded-xl shadow-lg border-2 border-emerald-500 p-6 w-80 relative z-10 transform transition-transform hover:-translate-y-1 hover:shadow-xl"
        : isLevel2
        ? "inline-flex flex-col items-center bg-white rounded-xl shadow-md border border-slate-200 p-5 w-72 relative z-10 transform transition-transform hover:-translate-y-1 hover:border-emerald-300"
        : "inline-flex flex-col items-center bg-white rounded-lg shadow-sm border border-slate-100 p-4 w-64 relative z-10 transform transition-transform hover:-translate-y-1 hover:border-emerald-200";

    // Style image container
    const imgContainerStyle = isLevel1
        ? "w-32 h-40 mb-4 rounded-md overflow-hidden border-4 border-emerald-100 shadow-sm relative bg-slate-200 flex items-center justify-center"
        : isLevel2
        ? "w-28 h-36 mb-4 rounded-md overflow-hidden border-2 border-emerald-50 shadow-sm relative bg-slate-200 flex items-center justify-center"
        : "w-24 h-32 mb-3 rounded-md overflow-hidden border border-slate-100 relative bg-slate-200 flex items-center justify-center";

    // Style jabatan badge
    const badgeStyle = isLevel1
        ? "text-xs font-semibold text-white bg-emerald-600 px-3 py-1.5 rounded-lg mt-1 block shadow-sm w-full text-center leading-snug"
        : isLevel2
        ? "text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1.5 rounded-lg mt-1 w-full text-center leading-snug"
        : "text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded-md w-full text-center leading-snug";

    return (
        <li>
            <div className={wrapperStyle}>
                <div className={imgContainerStyle}>
                    {node.foto ? (
                        <img src={node.foto} alt={node.nama} className="w-full h-full object-cover" />
                    ) : (
                        <span className={`text-slate-600 font-bold ${isLevel1 ? 'text-2xl' : isLevel2 ? 'text-xl' : 'text-lg'}`}>
                            {getInitials(node.nama)}
                        </span>
                    )}
                </div>
                <h3 className={`font-bold text-slate-700 mb-1 leading-tight ${isLevel1 ? 'text-md text-slate-800' : isLevel2 ? 'text-sm' : 'text-xs'}`}>
                    {node.nama}
                </h3>
                <p className={badgeStyle}>{node.jabatan}</p>
            </div>
            
            {node.children && node.children.length > 0 && (
                <ul>
                    {node.children.map(child => (
                        <TreeNode key={child.id} node={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default function StrukturOrganisasi({ organisasi, jabatanTree, pengaturan }) {
    const bannerImg = pengaturan?.banner_image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop";

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
                { label: 'Profil' },
                { label: 'Struktur Organisasi' }
            ]} />

            {/* Main Content */}
            <div className="py-20 bg-slate-50 relative overflow-hidden min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-emerald-950 mb-4">Struktur Organisasi</h2>
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
                                        {jabatanTree.map(rootNode => (
                                            <TreeNode key={rootNode.id} node={rootNode} />
                                        ))}
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
