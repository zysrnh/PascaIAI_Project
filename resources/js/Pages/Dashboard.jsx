import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import StatCard from '@/Components/Admin/StatCard';
import RecentActivity from '@/Components/Admin/RecentActivity';
import { AlertCircle, CalendarClock, ExternalLink, ArrowRight, Settings, Database, Download, FileText, MessageSquare, Newspaper, Users } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Dashboard({ stats, activities, flash }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const { auth } = usePage().props;

    useEffect(() => {
        setIsLoaded(true);
        if (flash?.success) {
            Swal.fire({
                icon: 'success',
                title: 'Berhasil',
                text: flash.success,
                timer: 3000,
                showConfirmButton: false
            });
        }
        if (flash?.error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal',
                text: flash.error,
                timer: 3000,
                showConfirmButton: false
            });
        }
    }, [flash]);

    const handleOptimize = () => {
        Swal.fire({
            title: 'Optimasi Sistem?',
            text: 'Ini akan membersihkan cache aplikasi dan konfigurasi.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Optimasi',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#059669',
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('sys.optimize'));
            }
        });
    };

    const handleReset = () => {
        // Disabled for production
    };

    const greeting = (() => {
        const hour = new Date().getHours();
        if (hour < 11) return 'Selamat pagi';
        if (hour < 17) return 'Selamat siang';
        return 'Selamat malam';
    })();

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-xl font-semibold leading-tight text-white">
                        Dashboard
                    </h2>
                    <a href="/" target="_blank" className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white bg-emerald-800/50 hover:bg-emerald-800 px-4 py-2 rounded-[5px] transition-colors border border-emerald-700/50">
                        <ExternalLink className="w-4 h-4" />
                        Lihat sebagai pengunjung
                    </a>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="flex bg-slate-50">
                <Sidebar />

                <div className={`min-w-0 flex-1 transition-all duration-500 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="py-10">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                            {/* Greeting */}
                            <div className="mb-8">
                                <p className="text-lg text-slate-700">
                                    {greeting}, <span className="font-semibold text-slate-900">{auth?.user?.name}</span>.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <StatCard
                                    title="Konsultasi PMB"
                                    value={stats?.konsultasi || 0}
                                    href="/konsultasi"
                                    icon={<MessageSquare className="h-5 w-5" />}
                                    trendValue="Cek →"
                                />
                                <StatCard
                                    title="Dosen Aktif"
                                    value={stats?.dosen || 0}
                                    href="/admin/fakultas/dosen"
                                    icon={<Users className="h-5 w-5" />}
                                    trendValue="Terdata"
                                />
                                <StatCard
                                    title="Berita"
                                    value={stats?.berita || 0}
                                    href="/admin/berita"
                                    icon={<Newspaper className="h-5 w-5" />}
                                    trendValue="Terbaru"
                                />
                                <StatCard
                                    title="Program Studi"
                                    value={stats?.mahasiswa || 0}
                                    href="/admin/program-studi"
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
                                    trendValue="Aktif"
                                />
                            </div>

                            {/* Content Grid */}
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                                {/* Left column */}
                                <div className="lg:col-span-2 space-y-6">

                                    {/* Health Checks */}
                                    {stats?.healthChecks && stats.healthChecks.length > 0 && (
                                        <div className="rounded-[5px] border border-amber-200 bg-white shadow-sm">
                                            <div className="flex items-center gap-2 border-b border-amber-100 px-5 py-3">
                                                <AlertCircle className="h-4 w-4 text-amber-600" />
                                                <h3 className="text-sm font-semibold text-slate-800">Perlu Dilengkapi</h3>
                                            </div>
                                            <div className="divide-y divide-slate-100">
                                                {stats.healthChecks.map((check, i) => (
                                                    <a key={i} href={check.url} className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-amber-50/50 group">
                                                        <span className="text-sm text-slate-700 group-hover:text-amber-700">{check.message}</span>
                                                        <ArrowRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-amber-600 shrink-0 ml-3" />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Recent Activity */}
                                    <RecentActivity activities={activities || []} />
                                </div>

                                {/* Right column */}
                                <div className="space-y-6">

                                    {/* Reminders */}
                                    {stats?.upcomingReminders && stats.upcomingReminders.length > 0 && (
                                        <div className="rounded-[5px] border border-slate-200 bg-white shadow-sm">
                                            <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-3">
                                                <CalendarClock className="h-4 w-4 text-slate-500" />
                                                <h3 className="text-sm font-semibold text-slate-800">Jadwal Mendatang</h3>
                                            </div>
                                            <div className="divide-y divide-slate-100">
                                                {stats.upcomingReminders.map((reminder, i) => (
                                                    <div key={i} className="px-5 py-3">
                                                        <p className="text-sm font-medium text-slate-800">{reminder.title}</p>
                                                        <p className="mt-0.5 text-xs text-slate-500">{reminder.time}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                     {/* System Actions Disabled */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
