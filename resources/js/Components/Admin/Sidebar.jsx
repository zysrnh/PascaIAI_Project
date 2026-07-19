import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Building2,
    GraduationCap,
    Lightbulb,
    Newspaper,
    FileText,
    Users,
    LogOut,
    ChevronDown,
    Menu,
    X,
} from 'lucide-react';

const navigation = [
    { type: 'link', name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    {
        type: 'group',
        name: 'Fakultas',
        icon: Building2,
        children: [
            { name: 'Daftar Fakultas', href: '/fakultas' },
            { name: 'Program Studi', href: '/fakultas/prodi' },
            { name: 'Data Dosen', href: '/fakultas/dosen' },
        ],
    },
    {
        type: 'group',
        name: 'Akademik',
        icon: GraduationCap,
        children: [
            { name: 'Pedoman Akademik', href: '/akademik/pedoman' },
            { name: 'Kalender Akademik', href: '/akademik/kalender' },
            { name: 'Jadwal Kuliah', href: '/akademik/jadwal' },
        ],
    },
    {
        type: 'group',
        name: 'LPPM',
        icon: Lightbulb,
        children: [
            { name: 'Info Hibah', href: '/lppm/hibah', badge: 3 },
            { name: 'Penelitian', href: '/lppm/penelitian' },
            { name: 'Pengabdian Masyarakat', href: '/lppm/pengabdian' },
        ],
    },
    { type: 'link', name: 'Berita', href: '/berita', icon: Newspaper, badge: 45 },
    { type: 'link', name: 'Dokumen Institusi', href: '/dokumen', icon: FileText },
    { type: 'link', name: 'Manajemen User', href: '/users', icon: Users },
];

function NavLink({ item, currentUrl }) {
    const isActive = currentUrl.startsWith(item.href);

    return (
        <Link
            href={item.href}
            className={`flex items-center justify-between gap-3 rounded-[5px] px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
            }`}
        >
            <span className="flex items-center gap-3">
                <item.icon className={`h-[18px] w-[18px] ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                {item.name}
            </span>
            {item.badge && (
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                }`}>
                    {item.badge}
                </span>
            )}
        </Link>
    );
}

function NavGroup({ item, currentUrl }) {
    const hasActiveChild = item.children.some((child) => currentUrl.startsWith(child.href));
    const [open, setOpen] = useState(hasActiveChild);

    return (
        <div>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={`flex w-full items-center justify-between gap-3 rounded-[5px] px-3 py-2.5 text-sm font-medium transition-colors ${
                    hasActiveChild ? 'text-blue-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
            >
                <span className="flex items-center gap-3">
                    <item.icon className={`h-[18px] w-[18px] ${hasActiveChild ? 'text-blue-600' : 'text-slate-400'}`} />
                    {item.name}
                </span>
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <div className="mt-1 space-y-1 border-l border-slate-200 pl-[27px]">
                    {item.children.map((child) => {
                        const isActive = currentUrl.startsWith(child.href);
                        return (
                            <Link
                                key={child.href}
                                href={child.href}
                                className={`flex items-center justify-between gap-2 rounded-[5px] px-3 py-2 text-sm transition-colors ${
                                    isActive ? 'bg-blue-50 font-medium text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                                }`}
                            >
                                {child.name}
                                {child.badge && (
                                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                        isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                        {child.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function SidebarContent() {
    const { url } = usePage();

    return (
        <div className="flex h-full flex-col bg-white">
            <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-[5px] bg-emerald-500 text-sm font-bold text-white">
                    IP
                </div>
                <div>
                    <p className="text-sm font-bold leading-tight text-slate-800">IAI Persis</p>
                    <p className="text-xs text-slate-500">Pascasarjana Bandung</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
                {navigation.map((item) =>
                    item.type === 'group' ? (
                        <NavGroup key={item.name} item={item} currentUrl={url} />
                    ) : (
                        <NavLink key={item.name} item={item} currentUrl={url} />
                    )
                )}
            </nav>

            <div className="border-t border-slate-200 p-4">
                <div className="flex items-center gap-3 rounded-[5px] px-2 py-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600">
                        A
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-800">Admin User</p>
                        <p className="truncate text-xs text-slate-500">Super Admin</p>
                    </div>
                    <button type="button" className="text-slate-400 hover:text-red-500" title="Keluar">
                        <LogOut className="h-[18px] w-[18px]" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Sidebar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Desktop */}
            <aside className="hidden shrink-0 lg:block lg:w-64">
                <div className="sticky top-0 h-screen border-r border-slate-200">
                    <SidebarContent />
                </div>
            </aside>

            {/* Mobile trigger */}
            <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg lg:hidden"
            >
                <Menu className="h-5 w-5" />
            </button>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-slate-900/50" onClick={() => setMobileOpen(false)} />
                    <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl">
                        <button
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <SidebarContent />
                    </div>
                </div>
            )}
        </>
    );
}