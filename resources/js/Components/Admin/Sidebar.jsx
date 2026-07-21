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
    BookOpen,
    Briefcase,
    Calendar,
    Layers,
    Clock,
    Laptop,
    FlaskConical,
    HeartHandshake,
    BookMarked,
    Archive,
} from 'lucide-react';

// Struktur navigasi dikelompokkan per kategori/seksi utama
const navigationSections = [
    {
        title: 'Utama',
        items: [
            { type: 'link', name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        ]
    },
    {
        title: 'Manajemen Konten',
        items: [
            {
                type: 'group',
                name: 'Profil Kampus',
                icon: Landmark,
                children: [
                    { type: 'link', name: 'Tentang Kampus', href: '/admin/profil/tentang-kampus', viewHref: '/profil/tentang-kampus', icon: Info },
                    { type: 'link', name: 'Visi, Misi & Tujuan', href: '/admin/profil/visi-misi', viewHref: '/profil/visi-misi', icon: Target },
                    { type: 'link', name: 'Sambutan Pimpinan', href: '/admin/profil/sambutan-pimpinan', viewHref: '/profil/sambutan-pimpinan', icon: MessageSquare },
                    { type: 'link', name: 'Struktur Organisasi', href: '/admin/profil/struktur-organisasi', viewHref: '/profil/struktur-organisasi', icon: Network },
                    { type: 'link', name: 'Dokumen Institusi', href: '/admin/profil/dokumen-institusi', viewHref: '/profil/dokumen-institusi', icon: FileText },
                    { type: 'link', name: 'Akreditasi', href: '/admin/profil/akreditasi', viewHref: '/profil/akreditasi', icon: Award },
                ],
            },
            {
                type: 'group',
                name: 'Fakultas',
                icon: Building2,
                children: [
                    { type: 'link', name: 'Daftar Fakultas', href: '/admin/fakultas', viewHref: '/fakultas/daftarfakultas', icon: Building2 },
                    { type: 'link', name: 'Program Studi', href: '/admin/program-studi', viewHref: '/fakultas/programstudi', icon: BookOpen },
                    { type: 'link', name: 'Data Dosen', href: '/admin/fakultas/dosen', viewHref: '/fakultas/dosen', icon: Users },
                    { type: 'link', name: 'Prospek Karir', href: '/admin/fakultas/prospek-karir', viewHref: '/fakultas/prospek-karir', icon: Briefcase },
                ],
            },
            {
                type: 'group',
                name: 'Akademik',
                icon: GraduationCap,
                children: [
                    { type: 'link', name: 'Pedoman Akademik', href: '/admin/akademik/pedoman', viewHref: '/akademik/pedoman', icon: FileText },
                    { type: 'link', name: 'Kalender Akademik', href: '/admin/akademik/kalender', viewHref: '/akademik/kalender-akademik', icon: Calendar },
                    { type: 'link', name: 'Kurikulum', href: '/admin/akademik/kurikulum', viewHref: '/akademik/kurikulum', icon: Layers },
                    { type: 'link', name: 'Jadwal Kuliah', href: '/admin/akademik/jadwal', viewHref: '/akademik/jadwal-perkuliahan', icon: Clock },
                    { type: 'link', name: 'Sistem Akademik', href: '/admin/akademik/sistem', viewHref: '/akademik/sistem-akademik', icon: Laptop },
                ],
            },
            {
                type: 'group',
                name: 'Penelitian & Pengabdian',
                icon: Lightbulb,
                children: [
                    { type: 'link', name: 'LPPM', href: '/admin/lppm/lppm', viewHref: '/lppm/lppm', icon: Landmark },
                    { type: 'link', name: 'Penelitian', href: '/admin/lppm/penelitian', viewHref: '/lppm/penelitian', icon: FlaskConical },
                    { type: 'link', name: 'Pengabdian Masyarakat', href: '/admin/lppm/pengabdian', viewHref: '/lppm/pengabdian', icon: HeartHandshake },
                    { type: 'link', name: 'Publikasi', href: '/admin/lppm/publikasi', viewHref: '/lppm/publikasi', icon: BookMarked },
                    { type: 'link', name: 'Repository', href: '/admin/lppm/repository', viewHref: '/lppm/repository', icon: Archive },
                ],
            },
            { type: 'link', name: 'Berita', href: '/admin/berita', icon: Newspaper },
        ]
    },
    {
        title: 'Sistem & Konfigurasi',
        items: [
            { type: 'link', name: 'Pengaturan Beranda', href: '/admin/beranda', icon: Settings },
            { type: 'link', name: 'Konsultasi PMB', href: '/konsultasi', icon: MessageSquare },
            { type: 'link', name: 'Manajemen User', href: '/users', icon: Users },
        ]
    }
];

function isUrlActive(href, currentUrl) {
    return currentUrl === href || currentUrl.startsWith(`${href}/`);
}

function groupHasActiveChild(group, currentUrl) {
    return group.children.some((child) => isUrlActive(child.href, currentUrl));
}

function findActiveGroupName(sections, currentUrl) {
    for (const section of sections) {
        const active = section.items.find((item) => item.type === 'group' && groupHasActiveChild(item, currentUrl));
        if (active) return active.name;
    }
    return null;
}

function NavLink({ item, currentUrl, nested = false }) {
    const isActive = isUrlActive(item.href, currentUrl);
    const Icon = item.icon;

    return (
        <div className={`group/item flex items-center rounded-lg transition-all duration-200 ${isActive ? 'bg-emerald-50/80 font-semibold' : 'hover:bg-slate-50'}`}>
            <Link
                href={item.href}
                    className={`flex flex-1 items-center justify-between gap-3 py-2 px-3 text-sm transition-transform duration-200 ${
                    isActive 
                        ? 'text-emerald-700 font-semibold' 
                        : nested 
                            ? 'text-slate-500 hover:text-slate-900 font-normal' 
                            : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
            >
                <span className="flex min-w-0 items-center gap-2.5">
                    {Icon && <Icon className={`h-4 w-4 shrink-0 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400 group-hover/item:text-slate-600'}`} />}
                    <span className="truncate">{item.name}</span>
                </span>
                {item.badge && (
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                        {item.badge}
                    </span>
                )}
            </Link>
            {item.viewHref && (
                <a
                    href={item.viewHref}
                    target="_blank"
                    rel="noreferrer"
                    title={`Lihat halaman ${item.name}`}
                    aria-label={`Lihat halaman ${item.name}`}
                    className="mr-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-300 transition-all duration-200 hover:bg-white hover:text-emerald-600 hover:shadow-sm group-hover/item:text-slate-400"
                >
                    <ExternalLink className="h-3.5 w-3.5" />
                </a>
            )}
        </div>
    );
}

function NavGroup({ item, currentUrl, isOpen, onToggle }) {
    const isActive = groupHasActiveChild(item, currentUrl);
    const Icon = item.icon;

    return (
        <div className="space-y-0.5">
            <button
                type="button"
                onClick={onToggle}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive 
                        ? 'text-emerald-700 bg-emerald-50/30' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
            >
                <span className="flex items-center gap-2.5">
                    {Icon && <Icon className={`h-4 w-4 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />}
                    {item.name}
                </span>
                <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-500' : ''}`} />
            </button>

            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                <div className="overflow-hidden">
                    <div className="mt-0.5 space-y-0.5 border-l border-slate-200/80 ml-[21px] pl-3">
                        {item.children.map((child) => (
                            <NavLink key={child.name} item={child} currentUrl={currentUrl} nested />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SidebarContent() {
    const { url } = usePage();
    const user = usePage().props.auth.user;

    const [openGroup, setOpenGroup] = useState(() => findActiveGroupName(navigationSections, url));

    return (
        <div className="flex h-full flex-col bg-white select-none">
            {/* Header Instansi */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 p-1 ring-1 ring-slate-200/50">
                    <img src="/logi.jpeg" alt="Logo" className="w-full h-full object-contain rounded" />
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-bold leading-tight text-slate-900 truncate">IAI Persis</p>
                    <p className="text-xs text-slate-500 font-medium truncate">Pascasarjana Bandung</p>
                </div>
            </div>

            {/* Menu Terkategori */}
            <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-5 scrollbar-thin">
                {navigationSections.map((section) => (
                    <div key={section.title} className="space-y-1">
                        <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                            {section.title}
                        </span>
                        
                        {section.items.map((item) =>
                            item.type === 'group' ? (
                                <NavGroup
                                    key={item.name}
                                    item={item}
                                    currentUrl={url}
                                    isOpen={openGroup === item.name}
                                    onToggle={() => setOpenGroup((prev) => (prev === item.name ? null : item.name))}
                                />
                            ) : (
                                <NavLink key={item.name} item={item} currentUrl={url} />
                            )
                        )}
                    </div>
                ))}
            </nav>

            {/* Footer Profile & Logout */}
            <div className="border-t border-slate-100 p-4 bg-slate-50/50">
                <div className="flex items-center gap-3 rounded-xl bg-white border border-slate-100 p-2.5 shadow-sm">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-700 text-sm font-semibold text-white uppercase shadow-sm">
                        {user.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-800 leading-snug">{user.name}</p>
                        <p className="truncate text-xs font-medium text-slate-400 capitalize mt-0.5">{user.role.replace('_', ' ')}</p>
                    </div>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
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
            {/* Desktop View */}
            <aside className="hidden shrink-0 lg:block lg:w-72">
                <div className="sticky top-0 h-screen border-r border-slate-100">
                    <SidebarContent />
                </div>
            </aside>

            {/* Mobile Trigger Button */}
            <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-700/20 active:scale-95 transition-transform lg:hidden"
            >
                <Menu className="h-5 w-5" />
            </button>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300" onClick={() => setMobileOpen(false)} />
                    
                    {/* Menu Body */}
                    <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl animate-in slide-in-from-left duration-300">
                        <button
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            className="absolute right-4 top-5 text-slate-400 hover:text-slate-600 z-50 p-1 rounded-md hover:bg-slate-50"
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