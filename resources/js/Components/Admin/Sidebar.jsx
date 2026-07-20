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
    Landmark,
    Info,
    Target,
    MessageSquare,
    Network,
    Award,
    Settings,
    ExternalLink,
} from 'lucide-react';

const navigation = [
    { type: 'link', name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    {
        type: 'group',
        name: 'Profil Kampus',
        icon: Landmark,
        children: [
            {
                type: 'group',
                name: 'Tentang Kampus',
                icon: Info,
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/profil/tentang-kampus', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/profil/tentang-kampus', icon: ExternalLink },
                ],
            },
            {
                type: 'group',
                name: 'Visi, Misi & Tujuan',
                icon: Target,
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/profil/visi-misi', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/profil/visi-misi', icon: ExternalLink },
                ],
            },
            {
                type: 'group',
                name: 'Sambutan Pimpinan',
                icon: MessageSquare,
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/profil/sambutan-pimpinan', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/profil/sambutan-pimpinan', icon: ExternalLink },
                ],
            },
            {
                type: 'group',
                name: 'Struktur Organisasi',
                icon: Users,
                children: [
                    { type: 'link', name: 'Kelola Anggota', href: '/admin/profil/struktur-organisasi', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/profil/struktur-organisasi', icon: ExternalLink },
                ],
            },

            {
                type: 'group',
                name: 'Dokumen Institusi',
                icon: FileText,
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/profil/dokumen-institusi', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/profil/dokumen-institusi', icon: ExternalLink },
                ],
            },
            {
                type: 'group',
                name: 'Akreditasi',
                icon: Award,
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/profil/akreditasi', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/profil/akreditasi', icon: ExternalLink },
                ],
            },
        ],
    },
    {
        type: 'group',
        name: 'Fakultas',
        icon: Building2,
        children: [
            {
                type: 'group',
                name: 'Daftar Fakultas',
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/fakultas', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/fakultas/daftarfakultas', icon: ExternalLink },
                ]
            },
            {
                type: 'group',
                name: 'Program Studi',
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/program-studi', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/fakultas/programstudi', icon: ExternalLink },
                ]
            },
            {
                type: 'group',
                name: 'Data Dosen',
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/fakultas/dosen', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/fakultas/dosen', icon: ExternalLink },
                ]
            },
            {
                type: 'group',
                name: 'Prospek Karir',
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/fakultas/prospek-karir', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/fakultas/prospek-karir', icon: ExternalLink },
                ]
            },
        ],
    },
    {
        type: 'group',
        name: 'Akademik',
        icon: GraduationCap,
        children: [
            {
                type: 'group',
                name: 'Pedoman Akademik',
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/akademik/pedoman', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/akademik/pedoman', icon: ExternalLink },
                ]
            },
            {
                type: 'group',
                name: 'Kalender Akademik',
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/akademik/kalender', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/akademik/kalender-akademik', icon: ExternalLink },
                ]
            },
            {
                type: 'group',
                name: 'Kurikulum',
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/akademik/kurikulum', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/akademik/kurikulum', icon: ExternalLink },
                ]
            },
            {
                type: 'group',
                name: 'Jadwal Kuliah',
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/akademik/jadwal', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/akademik/jadwal-perkuliahan', icon: ExternalLink },
                ]
            },
            {
                type: 'group',
                name: 'Sistem Akademik',
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/akademik/sistem', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/akademik/sistem-akademik', icon: ExternalLink },
                ]
            },
        ],
    },
    {
        type: 'group',
        name: 'Penelitian & Pengabdian',
        icon: Lightbulb,
        children: [
            {
                type: 'group',
                name: 'LPPM',
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/lppm/lppm', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/lppm/lppm', icon: ExternalLink },
                ]
            },
            {
                type: 'group',
                name: 'Penelitian',
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/lppm/penelitian', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/lppm/penelitian', icon: ExternalLink },
                ]
            },
            {
                type: 'group',
                name: 'Pengabdian Masyarakat',
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/lppm/pengabdian', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/lppm/pengabdian', icon: ExternalLink },
                ]
            },
            {
                type: 'group',
                name: 'Publikasi',
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/lppm/publikasi', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/lppm/publikasi', icon: ExternalLink },
                ]
            },
            {
                type: 'group',
                name: 'Repository',
                children: [
                    { type: 'link', name: 'Kelola Halaman', href: '/admin/lppm/repository', icon: Settings },
                    { type: 'link', name: 'Lihat Halaman', href: '/lppm/repository', icon: ExternalLink },
                ]
            },
        ],
    },
    { type: 'link', name: 'Berita', href: '/berita', icon: Newspaper, badge: 45 },
    { type: 'link', name: 'Dokumen Institusi', href: '/dokumen', icon: FileText },
    { type: 'link', name: 'Manajemen User', href: '/users', icon: Users },
];

function hasActiveDescendant(item, currentUrl) {
    if (item.type === 'link') return currentUrl.startsWith(item.href);
    return item.children.some((child) => hasActiveDescendant(child, currentUrl));
}

function NavLink({ item, currentUrl, nested = false }) {
    const isActive = currentUrl.startsWith(item.href);
    const Icon = item.icon;

    const base = 'flex items-center justify-between gap-3 rounded-[5px] px-3 py-2.5 text-sm transition-all duration-300 transform hover:translate-x-1';
    const weight = !nested || isActive ? 'font-medium' : 'font-normal';
    const color = isActive
        ? 'bg-blue-50 text-blue-600'
        : nested
            ? 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800';

    return (
        <Link href={item.href} className={`${base} ${weight} ${color}`}>
            <span className="flex items-center gap-3">
                {Icon && <Icon className={`h-[18px] w-[18px] ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />}
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

function NavGroup({ item, currentUrl, nested = false }) {
    const isActive = hasActiveDescendant(item, currentUrl);
    const [open, setOpen] = useState(isActive);
    const Icon = item.icon;

    const base = 'flex w-full items-center justify-between gap-3 rounded-[5px] px-3 py-2.5 text-sm transition-all duration-300 transform hover:translate-x-1';
    const weight = !nested || isActive ? 'font-medium' : 'font-normal';
    const color = isActive
        ? 'text-blue-600'
        : nested
            ? 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800';

    return (
        <div>
            <button type="button" onClick={() => setOpen(!open)} className={`${base} ${weight} ${color}`}>
                <span className="flex items-center gap-3">
                    {Icon && <Icon className={`h-[18px] w-[18px] ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />}
                    {item.name}
                </span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="space-y-1 border-l border-slate-200 pl-[27px]">
                        {item.children.map((child) => (
                            <NavItem key={child.name} item={child} currentUrl={currentUrl} nested />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function NavItem({ item, currentUrl, nested = false }) {
    return item.type === 'group' ? (
        <NavGroup item={item} currentUrl={currentUrl} nested={nested} />
    ) : (
        <NavLink item={item} currentUrl={currentUrl} nested={nested} />
    );
}

function SidebarContent() {
    const { url } = usePage();
    const user = usePage().props.auth.user;

    return (
        <div className="flex h-full flex-col bg-white">
            <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-[5px]">
                    <img src="/logi.jpeg" alt="Logo" className="w-9 h-9 object-contain" />
                </div>
                <div>
                    <p className="text-sm font-bold leading-tight text-slate-800">IAI Persis</p>
                    <p className="text-xs text-slate-500">Pascasarjana Bandung</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-4">
                {navigation.map((item) => (
                    <NavItem key={item.name} item={item} currentUrl={url} />
                ))}
            </nav>

            <div className="border-t border-slate-200 p-4">
                <div className="flex items-center gap-3 rounded-[5px] px-2 py-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-600 uppercase">
                        {user.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-800">{user.name}</p>
                        <p className="truncate text-xs text-slate-500 capitalize">{user.role.replace('_', ' ')}</p>
                    </div>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        title="Keluar"
                    >
                        <LogOut className="h-[18px] w-[18px]" />
                    </Link>
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
            <aside className="hidden shrink-0 lg:block lg:w-80">
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