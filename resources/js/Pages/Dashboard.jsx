import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Sidebar from '@/Components/Admin/Sidebar';
import StatCard from '@/Components/Admin/StatCard';
import RecentActivity from '@/Components/Admin/RecentActivity';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    Overview Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="flex bg-slate-50">
                <Sidebar />

                <div className="min-w-0 flex-1">
                    <div className="py-12">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            {/* Stats Grid */}
                            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                <StatCard
                                    title="Total Mahasiswa"
                                    value="1,248"
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    }
                                    trend="up"
                                    trendValue="12%"
                                />
                                <StatCard
                                    title="Berita Publikasi"
                                    value="45"
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3L22 4" />
                                        </svg>
                                    }
                                    trend="up"
                                    trendValue="4%"
                                />
                                <StatCard
                                    title="Dokumen Institusi"
                                    value="18"
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    }
                                />
                                <StatCard
                                    title="Info Hibah LPPM"
                                    value="3"
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    }
                                    trend="down"
                                    trendValue="1"
                                />
                            </div>

                            {/* Main Content Area */}
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                <div className="lg:col-span-2 overflow-hidden rounded-[5px] border border-slate-200 bg-white shadow-sm">
                                    <div className="p-8">
                                        <h3 className="mb-2 text-xl font-bold text-slate-800">Selamat Datang di Portal Admin!</h3>
                                        <p className="mb-6 text-slate-600">
                                            Anda memiliki akses penuh untuk mengelola konten website Pascasarjana IAI Persis Bandung.
                                            Gunakan navigasi di samping untuk mengakses modul Fakultas, Akademik, dan LPPM.
                                        </p>
                                        <button className="rounded-[5px] bg-blue-600 px-6 py-2 font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
                                            Tulis Pengumuman Baru
                                        </button>
                                    </div>
                                </div>

                                <div className="lg:col-span-1">
                                    <RecentActivity
                                        activities={[
                                            { title: 'Mengupdate Pedoman Akademik', user: 'Admin Akademik', time: '2 jam yang lalu', type: 'update' },
                                            { title: 'Menambahkan Berita Baru', user: 'Humas', time: '5 jam yang lalu', type: 'create' },
                                            { title: 'Upload SK Rektor', user: 'Super Admin', time: '1 hari yang lalu', type: 'create' },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}