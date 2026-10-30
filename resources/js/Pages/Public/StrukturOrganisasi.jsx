import React, { useRef, useState, useLayoutEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Users } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import Breadcrumb from '@/Components/Public/Breadcrumb';

const TreeNode = ({ node }) => {
    const isLevel1 = node.urutan === '1';
    const isLevel2 = node.urutan === '2A' || node.urutan === '2B';

    const wrapperStyle = isLevel1 
        ? "inline-flex flex-col items-center bg-white rounded-2xl shadow-sm border border-slate-200/90 hover:border-slate-400 p-6 w-80 relative z-10 transition-all duration-200"
        : isLevel2
        ? "inline-flex flex-col items-center bg-white rounded-2xl shadow-sm border border-slate-200/90 hover:border-slate-300 p-5 w-72 relative z-10 transition-all duration-200"
        : "inline-flex flex-col items-center bg-white rounded-xl shadow-sm border border-slate-200/80 hover:border-slate-300 p-4 w-64 relative z-10 transition-all duration-200";

    const imgContainerStyle = isLevel1
        ? "w-28 h-36 mb-4 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative bg-slate-100 flex items-center justify-center"
        : isLevel2
        ? "w-24 h-32 mb-3.5 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative bg-slate-100 flex items-center justify-center"
        : "w-20 h-28 mb-3 rounded-lg overflow-hidden border border-slate-200 relative bg-slate-100 flex items-center justify-center";

    return (
        <li>
            <div className={wrapperStyle}>
                {node.foto && (
                    <div className={imgContainerStyle}>
                        <img 
                            src={node.foto} 
                            alt={node.nama} 
                            className="w-full h-full object-cover object-top" 
                        />
                    </div>
                )}
                <h3 className={`font-semibold text-slate-900 mb-1 leading-snug ${isLevel1 ? 'text-base sm:text-lg' : isLevel2 ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'}`}>
                    {node.nama}
                </h3>
                <span className={`text-xs font-semibold uppercase tracking-wider text-emerald-700 block w-full text-center ${isLevel1 ? 'mt-1 text-xs' : 'text-[11px]'}`}>
                    {node.jabatan}
                </span>
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
    const bannerImg = pengaturan?.banner_image;

    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [scaledHeight, setScaledHeight] = useState('auto');

    useLayoutEffect(() => {
        const updateScale = () => {
            if (containerRef.current && contentRef.current) {
                const containerWidth = containerRef.current.clientWidth - 40;
                const contentWidth = contentRef.current.scrollWidth;
                const contentHeight = contentRef.current.scrollHeight;
                
                if (contentWidth > containerWidth && containerWidth > 0) {
                    const newScale = containerWidth / contentWidth;
                    setScale(newScale);
                    setScaledHeight(`${contentHeight * newScale}px`);
                } else {
                    setScale(1);
                    setScaledHeight('auto');
                }
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, [jabatanTree]);

    return (
        <PublicLayout>
            <Head title="Struktur Organisasi & Tim | Prodi KPI IAI Persis Bandung" />

            {/* Minimalist Editorial Hero Section */}
            <section className="relative bg-gradient-to-b from-[#091122] via-[#0E1B38] to-[#070E1E] text-white pt-20 pb-20 md:pt-24 md:pb-24 border-b border-slate-800/80 overflow-hidden">
                {bannerImg && (
                    <div className="absolute inset-0 z-0">
                        <img 
                            src={bannerImg} 
                            alt="Banner Struktur Organisasi" 
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070E1E] via-[#091122]/80 to-[#091122]/90"></div>
                    </div>
                )}

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-4xl text-left">
                        <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-semibold text-white leading-tight tracking-tight mb-4">
                            Struktur Organisasi &amp; <span className="font-serif italic font-normal text-emerald-300">Tim Pengelola</span>
                        </h1>

                        {pengaturan?.deskripsi ? (
                            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                                {pengaturan.deskripsi}
                            </p>
                        ) : null}
                    </div>
                </div>
            </section>

            {/* Breadcrumb Navigation */}
            <Breadcrumb items={[
                { label: 'Profil' },
                { label: 'Struktur Organisasi' }
            ]} />

            {/* Main Content Area */}
            <div className="bg-[#FAFAFA] py-16 sm:py-24 border-b border-slate-200 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                    {/* Section Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Tata Kelola Institusi</span>
                            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight mt-1">
                                Bagan Struktur <span className="font-serif italic font-normal text-slate-700 ml-1.5">Kepengurusan</span>
                            </h2>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 max-w-md self-start sm:self-auto">
                            Susunan pengelola Program Studi KPI Fakultas Dakwah IAI Persis Bandung.
                        </p>
                    </div>

                    {/* Organogram Tree */}
                    {organisasi && organisasi.length > 0 ? (
                        <div 
                            ref={containerRef} 
                            className="flex flex-col items-center w-full py-8 overflow-x-auto min-h-[450px]" 
                            style={{ height: scaledHeight !== 'auto' ? `calc(${scaledHeight} + 4rem)` : 'auto' }}
                        >
                            <div 
                                ref={contentRef}
                                style={{
                                    transform: `scale(${scale})`,
                                    transformOrigin: 'top center',
                                    transition: 'transform 0.3s ease-out',
                                    width: 'max-content'
                                }}
                                className="flex flex-col items-center"
                            >
                                <style dangerouslySetInnerHTML={{__html: `
                                    .organogram ul {
                                        padding-top: 24px;
                                        position: relative;
                                        display: flex;
                                        justify-content: center;
                                    }
                                    .organogram li {
                                        float: left;
                                        text-align: center;
                                        list-style-type: none;
                                        position: relative;
                                        padding: 24px 12px 0 12px;
                                    }
                                    .organogram li::before, .organogram li::after {
                                        content: '';
                                        position: absolute;
                                        top: 0;
                                        right: 50%;
                                        border-top: 2px solid #cbd5e1;
                                        width: 50%;
                                        height: 24px;
                                    }
                                    .organogram li::after {
                                        right: auto;
                                        left: 50%;
                                        border-left: 2px solid #cbd5e1;
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
                                        border-right: 2px solid #cbd5e1;
                                        border-radius: 0 6px 0 0;
                                    }
                                    .organogram li:first-child::after {
                                        border-radius: 6px 0 0 0;
                                    }
                                    .organogram ul ul::before {
                                        content: '';
                                        position: absolute;
                                        top: 0;
                                        left: 50%;
                                        border-left: 2px solid #cbd5e1;
                                        width: 0;
                                        height: 24px;
                                    }
                                `}} />

                                <div className="organogram">
                                    <ul>
                                        {jabatanTree && jabatanTree.map(rootNode => (
                                            <TreeNode key={rootNode.id} node={rootNode} />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 max-w-xl mx-auto p-8">
                            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <h3 className="text-lg font-semibold text-slate-800 mb-1">Struktur Belum Tersedia</h3>
                            <p className="text-slate-500 text-sm">Data struktur organisasi saat ini belum dimasukkan ke dalam sistem.</p>
                        </div>
                    )}

                </div>
            </div>
        </PublicLayout>
    );
}
