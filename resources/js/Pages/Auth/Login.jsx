import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, ShieldCheck, ArrowLeft, Lock, Mail } from 'lucide-react';
import InputError from '@/Components/InputError';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex min-h-screen bg-slate-50 selection:bg-slate-900 selection:text-white">
            <Head title="Login Admin - S1 Komunikasi dan Penyiaran Islam" />

            {/* Brand Panel Kiri (Nordic Dark Editorial) */}
            <div className="hidden lg:flex lg:w-[48%] xl:w-[45%] flex-col justify-between bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-12 text-white relative overflow-hidden border-r border-slate-800">
                {/* Subtle Geometric Texture */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                {/* Top Logo & Department */}
                <div className="relative z-10 flex items-center gap-3">
                    <img
                        src="/logo_kpi.png"
                        alt="Logo Prodi KPI"
                        className="h-12 w-auto object-contain bg-white/5 p-1 rounded border border-white/10"
                        onError={(e) => {
                            e.currentTarget.src = '/logo_kampus.png';
                        }}
                    />
                    <div>
                        <span className="block text-sm font-bold tracking-tight text-white">PRODI S1 KPI</span>
                        <span className="block text-[11px] font-medium text-slate-400">FAKULTAS DAKWAH &bull; IAI PERSIS BANDUNG</span>
                    </div>
                </div>

                {/* Center Editorial Messaging */}
                <div className="relative z-10 my-auto py-12 max-w-md">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-slate-800/80 border border-slate-700/80 rounded text-slate-300 text-[11px] font-mono tracking-wider uppercase mb-5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Sistem Manajemen Terpadu</span>
                    </div>

                    <h1 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
                        Portal Layanan <br />
                        <span className="font-serif italic font-normal text-slate-300">Administrasi Akademik</span>
                    </h1>

                    <p className="mt-4 text-sm text-slate-300 leading-relaxed font-normal">
                        Akses khusus pengelola program studi, pimpinan fakultas, admin penjaminan mutu, pengelola laboratorium siaran, dan redaksi media kampus KPI IAI Persis Bandung.
                    </p>

                    {/* Bento Mini Badges */}
                    <div className="flex flex-wrap gap-2 pt-6">
                        <span className="px-2.5 py-1 text-[11px] font-medium text-slate-300 bg-slate-900/90 border border-slate-800 rounded">
                            Broadcasting &amp; Jurnalistik
                        </span>
                        <span className="px-2.5 py-1 text-[11px] font-medium text-slate-300 bg-slate-900/90 border border-slate-800 rounded">
                            Akreditasi BAN-PT
                        </span>
                        <span className="px-2.5 py-1 text-[11px] font-medium text-slate-300 bg-slate-900/90 border border-slate-800 rounded">
                            Gelar S.Sos.
                        </span>
                    </div>
                </div>

                {/* Bottom Footer Note */}
                <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 pt-6 border-t border-slate-800/80">
                    <span>&copy; {new Date().getFullYear()} Prodi KPI IAI Persis Bandung</span>
                    <span className="font-mono text-[11px]">v2.5.0</span>
                </div>
            </div>

            {/* Form Panel Kanan */}
            <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 xl:px-20">
                <div className="mx-auto w-full max-w-sm sm:max-w-md">
                    {/* Top Link Kembali ke Beranda */}
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Kembali ke Beranda Utama</span>
                        </Link>
                    </div>

                    {/* Mobile Brand Header */}
                    <div className="mb-6 lg:hidden flex items-center gap-3">
                        <img src="/logo_kampus.png" alt="Logo IAI Persis" className="h-10 w-auto object-contain" />
                        <div>
                            <p className="text-sm font-bold text-slate-900">S1 KPI IAI Persis Bandung</p>
                            <p className="text-xs text-slate-500">Portal Administrasi Akademik</p>
                        </div>
                    </div>

                    {/* Header Text */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Masuk ke Portal
                        </h2>
                        <p className="mt-2 text-xs sm:text-sm text-slate-600">
                            Masukkan email dan kata sandi akun resmi Anda untuk mengelola sistem.
                        </p>
                    </div>

                    {/* Status Alert */}
                    {status && (
                        <div className="mb-6 rounded-md bg-emerald-50 border border-emerald-200 p-3 text-xs font-medium text-emerald-800">
                            {status}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={submit} className="space-y-4">
                        {/* Email Field */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5" htmlFor="email">
                                Alamat Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="block w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                                    autoComplete="username"
                                    autoFocus
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="nama@iaipibandung.ac.id"
                                    required
                                />
                            </div>
                            <InputError message={errors.email} className="mt-1.5 text-xs text-red-600" />
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="mb-1.5 flex items-center justify-between">
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700" htmlFor="password">
                                    Kata Sandi
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
                                    >
                                        Lupa sandi?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="h-4 w-4" />
                                </div>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className="block w-full rounded-lg border border-slate-300 bg-white pl-9 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-1.5 text-xs text-red-600" />
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex cursor-pointer items-center gap-2 select-none">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                                />
                                <span className="text-xs text-slate-600">Ingat sesi saya</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 shadow-sm"
                            >
                                {processing ? 'Memverifikasi Akun...' : 'Masuk ke Dashboard'}
                            </button>
                        </div>
                    </form>

                    {/* Footnote Security */}
                    <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                            Akses dibatasi hanya bagi civitas akademika &amp; staf berwenang. <br />
                            Mengalami kendala akun? Hubungi <span className="text-slate-800 font-semibold">Sekretariat KPI</span>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
