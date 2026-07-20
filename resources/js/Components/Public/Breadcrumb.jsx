import React from 'react';
import { Link } from '@inertiajs/react';
import { Home, ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items }) {
    return (
        <div className="bg-white border-b border-slate-200 sticky top-[72px] lg:top-[80px] z-30 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex py-4 overflow-x-auto hide-scrollbar" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 text-sm whitespace-nowrap min-w-max">
                        <li>
                            <Link href="/" className="text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-1">
                                <Home className="w-4 h-4" />
                                <span className="hidden sm:inline">Beranda</span>
                            </Link>
                        </li>
                        
                        {items.map((item, index) => {
                            const isLast = index === items.length - 1;
                            
                            return (
                                <li key={index}>
                                    <div className="flex items-center">
                                        <ChevronRight className="w-4 h-4 text-slate-400 mx-1 flex-shrink-0" />
                                        {item.href && !isLast ? (
                                            <Link href={item.href} className="text-slate-500 hover:text-emerald-600 transition-colors">
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <span className={isLast ? "text-emerald-600 font-medium" : "text-slate-500"}>
                                                {item.label}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
