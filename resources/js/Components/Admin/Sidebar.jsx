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
    FlaskConical,
    HeartHandshake,
    BookMarked,
    Archive,
    Terminal,
} from 'lucide-react';

const navigationSections = [
    {
        title: 'Utama',
        items: [
            { type: 'link', name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        ]
    },
    {
        title: 'Prodi KPI & Akademik',
        items: [
            {
                type: 'group',
                name: 'Profil Program Studi',
                icon: Landmark,
                children: [
                    { type: 'link', name: 'Tentang Prodi KPI', href: '/admin/profil/tentang-kampus', viewHref: '/profil/tentang-kampus', icon: Info },
                    { type: 'link', name: 'Visi, Misi & Tujuan', href: '/admin/profil/visi-misi', viewHref: '/profil/visi-misi', icon: Target },
                    { type: 'link', name: 'Sambutan Ketua Prodi', href: '/admin/profil/sambutan-pimpinan', viewHref: '/profil/sambutan-pimpinan', icon: MessageSquare },
                    { type: 'link', name: 'Struktur & Pengelola', href: '/admin/profil/struktur-organisasi', viewHref: '/profil/struktur-organisasi', icon: Network },
                    { type: 'link', name: 'Dokumen & SK Prodi', href: '/admin/profil/dokumen-institusi', viewHref: '/profil/dokumen-institusi', icon: FileText },
                ],
            },
            {
                type: 'group',
                name: 'Akademik & Perkuliahan',
                icon: GraduationCap,
                children: [
                    { type: 'link', name: 'Laboratorium & Praktik', href: '/admin/akademik/laboratorium', viewHref: '/laboratorium', icon: FlaskConical },
                    { type: 'link', name: 'Jadwal Kuliah & Siaran', href: '/admin/akademik/jadwal', viewHref: '/akademik/jadwal-perkuliahan', icon: Clock },
                    { type: 'link', name: 'Kalender Akademik', href: '/admin/akademik/kalender', viewHref: '/akademik/kalender-akademik', icon: Calendar },
                    { type: 'link', name: 'Pedoman Akademik', href: '/admin/akademik/pedoman', viewHref: '/akademik/pedoman', icon: FileText },
                ],
            },
            {
                type: 'group',
                name: 'Dosen & Kelembagaan',
                icon: Building2,
                children: [
                    { type: 'link', name: 'Dosen Homebase KPI', href: '/admin/fakultas/dosen', viewHref: '/fakultas/dosen', icon: Users },
                    { type: 'link', name: 'Profil Program Studi', href: '/admin/program-studi', viewHref: '/fakultas/programstudi', icon: BookOpen },
                    { type: 'link', name: 'Fakultas Dakwah', href: '/admin/fakultas', viewHref: '/fakultas/daftarfakultas', icon: Building2 },
                ],
            },
            {
                type: 'group',
                name: 'Riset & Media Dakwah',
                icon: Lightbulb,
                children: [
                    { type: 'link', name: 'Riset & Penelitian Media', href: '/admin/lppm/penelitian', viewHref: '/lppm/penelitian', icon: FlaskConical },
                    { type: 'link', name: 'Pengabdian Masyarakat', href: '/admin/lppm/pengabdian', viewHref: '/lppm/pengabdian', icon: HeartHandshake },
                    { type: 'link', name: 'Publikasi Jurnal & Media', href: '/admin/lppm/publikasi', viewHref: '/lppm/publikasi', icon: BookMarked },
                    { type: 'link', name: 'Repository Karya Mahasiswa', href: '/admin/lppm/repository', viewHref: '/lppm/repository', icon: Archive },
                ],
            },
            { type: 'link', name: 'Berita & Artikel KPI', href: '/admin/berita', icon: Newspaper },
        ]
    },
    {
        title: 'Layanan & Sistem',
        items: [
            { type: 'link', name: 'Pengaturan Beranda & Banner', href: '/admin/beranda', icon: Settings },
            { type: 'link', name: 'Konsultasi PMB (Pesan Masuk)', href: '/konsultasi', icon: MessageSquare },
            { type: 'link', name: 'Manajemen Pengguna', href: '/users', icon: Users },
            { type: 'link', name: 'Terminal & Git Console', href: '/admin/terminal', icon: Terminal },
        ]
    }
];

function isUrlActive(href, currentUrl) {
    return currentUrl === href || currentUrl.startsWith(`${href}/`) || currentUrl.startsWith(`${href}?`);
}

function groupHasActiveChild(group, currentUrl) {
    return group.children.some((child) => isUrlActive(child.href, currentUrl));
}

function findActiveGroupName(sections, currentUrl) {
    for (const section of sections) {
        for (const item of section.items) {
            if (item.type === 'group' && groupHasActiveChild(item, currentUrl)) {
                return item.name;
            }
        }
    }
    return null;
}

function NavItem({ item, currentUrl, onNavigate }) {
    const active = isUrlActive(item.href, currentUrl);
    const Icon = item.icon;

    return (
        <div className="group/item flex items-center justify-between rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-100">
            <Link
                href={item.href}
                onClick={onNavigate}
                className={`flex flex-1 items-center gap-3 truncate ${
                    active ? 'font-semibold text-emerald-800' : 'text-slate-600 group-hover/item:text-slate-900'
                }`}
            >
                <Icon className={`h-4 w-4 shrink-0 ${active ? 'text-emerald-700' : 'text-slate-400 group-hover/item:text-slate-600'}`} />
                <span className="truncate">{item.name}</span>
            </Link>
            {item.viewHref && (
                <a
                    href={item.viewHref}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 hidden rounded p-1 text-slate-300 transition-colors hover:bg-slate-200 hover:text-slate-600 group-hover/item:block"
                    title="Lihat halaman publik"
                >
                    <ExternalLink className="h-3.5 w-3.5" />
                </a>
            )}
        </div>
    );
}

function NavGroup({ group, currentUrl, isOpen, onToggle, onNavigate }) {
    const hasActiveChild = groupHasActiveChild(group, currentUrl);
    const Icon = group.icon;

    return (
        <div>
            <button
                type="button"
                onClick={onToggle}
                className={`flex w-full items-center justify-between rounded px-3 py-2 text-sm font-medium transition-colors ${
                    hasActiveChild ? 'bg-slate-50 font-semibold text-slate-900' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
            >
                <div className="flex items-center gap-3 truncate">
                    <Icon className={`h-4 w-4 shrink-0 ${hasActiveChild ? 'text-emerald-700' : 'text-slate-400'}`} />
                    <span className="truncate">{group.name}</span>
                </div>
                <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="relative mt-1 space-y-0.5 pl-6 before:absolute before:bottom-2 before:left-5 before:top-2 before:w-px before:bg-slate-200">
                    {group.children.map((child) => (
                        <NavItem key={child.name} item={child} currentUrl={currentUrl} onNavigate={onNavigate} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Sidebar() {
    const { url } = usePage();
    const user = usePage().props.auth.user;
    const [openGroup, setOpenGroup] = useState(() => findActiveGroupName(navigationSections, url));
    const [mobileOpen, setMobileOpen] = useState(false);

    const renderNavContent = (onNavigate) => (
        <div className="flex h-full flex-col bg-white select-none">
            {/* Header Instansi */}
            <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                <img src="/logo_kampus.png" alt="Logo IAI Persis" className="h-10 w-auto object-contain bg-white rounded p-0.5 border border-slate-100" />
                <div className="min-w-0">
                    <p className="text-sm font-bold leading-tight text-slate-900 truncate">Prodi S1 KPI</p>
                    <p className="text-[11px] text-slate-500 font-medium truncate">Fakultas Dakwah</p>
                </div>
            </div>

            {/* Menu Terkategori */}
            <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-5 scrollbar-thin">
                {navigationSections.map((section) => {
                    const filteredItems = section.items.filter((item) => {
                        if (item.href === '/admin/terminal') {
                            const isDev = user?.role === 'dev' || user?.role === 'admin_dev' || user?.email?.includes('naodev');
                            return isDev;
                        }
                        return true;
                    });

                    if (filteredItems.length === 0) return null;

                    return (
                        <div key={section.title} className="space-y-1">
                            <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                                {section.title}
                            </span>
                            
                            {filteredItems.map((item) =>
                                item.type === 'group' ? (
                                    <NavGroup
                                        key={item.name}
                                        group={item}
                                        currentUrl={url}
                                        isOpen={openGroup === item.name}
                                        onToggle={() => setOpenGroup((prev) => (prev === item.name ? null : item.name))}
                                        onNavigate={onNavigate}
                                    />
                                ) : (
                                    <NavItem key={item.name} item={item} currentUrl={url} onNavigate={onNavigate} />
                                )
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Footer Profile User */}
            <div className="border-t border-slate-100 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded bg-[#0F2E24] text-xs font-bold text-white shrink-0">
                            {user?.name?.[0]?.toUpperCase() || 'A'}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate">{user?.name}</p>
                            <p className="text-[10px] text-slate-500 truncate capitalize">{user?.role?.replace('_', ' ') || 'Admin'}</p>
                        </div>
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors shrink-0"
                        title="Keluar"
                    >
                        <LogOut className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* 1. Desktop Sidebar (Hidden on Mobile) */}
            <aside className="hidden md:flex h-full min-h-[calc(100vh-4rem)] flex-col bg-white border-r border-slate-200 w-64 shrink-0">
                {renderNavContent()}
            </aside>

            {/* 2. Floating Mobile Trigger Button */}
            <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="md:hidden fixed bottom-5 left-5 z-40 flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-full shadow-2xl border border-slate-700 text-xs font-semibold hover:bg-slate-800 active:scale-95 transition-all"
                aria-label="Buka Menu Admin"
            >
                <Menu className="w-4 h-4 text-emerald-400" />
                <span>Menu Admin</span>
            </button>

            {/* 3. Mobile Slide-Over Drawer Modal */}
            {mobileOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex animate-in fade-in duration-200">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setMobileOpen(false)}
                    />

                    {/* Drawer Content */}
                    <div className="relative flex flex-col w-72 max-w-[85vw] h-full bg-white shadow-2xl z-10 animate-in slide-in-from-left duration-250">
                        {/* Drawer Top Header with Close Button */}
                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 bg-slate-50/80">
                            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Navigasi Dashboard</span>
                            <button
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Navigation body */}
                        <div className="flex-1 overflow-hidden">
                            {renderNavContent(() => setMobileOpen(false))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
