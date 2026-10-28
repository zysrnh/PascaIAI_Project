import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
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
        <div className="flex min-h-screen bg-white">
            <Head title="Admin Login - Prodi KPI IAI Persis" />

            {/* Brand panel kiri */}
            <div className="hidden w-[45%] flex-col justify-between bg-[#0F2E24] p-10 lg:flex xl:p-12 select-none">
                <div className="flex items-center gap-3">
                    <img src="/logo_kampus.png" alt="Logo IAI Persis" className="h-11 w-auto object-contain bg-white rounded p-1" />
                    <div>
                        <span className="block text-sm font-bold text-white tracking-wide">PRODI S1 KPI</span>
                        <span className="block text-[11px] text-emerald-300 font-medium">IAI PERSIS BANDUNG</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="inline-block px-3 py-1 bg-emerald-900/60 border border-emerald-700/50 rounded text-emerald-200 text-xs font-semibold tracking-wider uppercase">
                        Fakultas Dakwah
                    </div>
                    <h1 className="text-3xl font-extrabold leading-snug text-white xl:text-4xl">
                        Portal Admin<br />Program Studi KPI
                    </h1>
                    <p className="max-w-md text-sm leading-relaxed text-emerald-200/90 font-normal">
                        Sistem Informasi & Manajemen Akademik Program Studi S1 Komunikasi dan Penyiaran Islam Institut Agama Islam Persatuan Islam Bandung.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        <span className="inline-block rounded bg-emerald-900/80 border border-emerald-700/60 px-3 py-1 text-xs font-medium text-emerald-200">Jenjang S1</span>
                        <span className="inline-block rounded bg-emerald-900/80 border border-emerald-700/60 px-3 py-1 text-xs font-medium text-emerald-200">Gelar S.Sos.</span>
                        <span className="inline-block rounded bg-emerald-900/80 border border-emerald-700/60 px-3 py-1 text-xs font-medium text-emerald-200">Terakreditasi BAN-PT</span>
                    </div>
                </div>

                <p className="text-xs text-emerald-300/60">&copy; {new Date().getFullYear()} Program Studi S1 KPI &mdash; IAI Persis Bandung</p>
            </div>

            {/* Form panel kanan */}
            <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-[55%]">
                <div className="w-full max-w-md">
                    {/* Header mobile */}
                    <div className="mb-8 flex items-center gap-3 lg:hidden">
                        <img src="/logo_kampus.png" alt="Logo IAI Persis" className="h-10 w-auto object-contain bg-white rounded p-1 shadow-sm ring-1 ring-slate-200" />
                        <div>
                            <span className="block text-sm font-bold text-slate-800">Prodi S1 KPI</span>
                            <span className="block text-xs text-slate-500">IAI Persis Bandung</span>
                        </div>
                    </div>

                    <h2 className="mb-1 text-2xl font-bold text-slate-800">Masuk ke Dashboard</h2>
                    <p className="mb-8 text-sm text-slate-500">Gunakan akun pengelola Prodi KPI yang terdaftar.</p>

                    {status && (
                        <div className="mb-6 rounded border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-700">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="email">
                                Email Pengguna
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full rounded border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="kpi@iaipibandung.ac.id"
                            />
                            <InputError message={errors.email} className="mt-1.5 text-xs text-red-600" />
                        </div>

                        <div>
                            <div className="mb-1.5 flex items-center justify-between">
                                <label className="block text-sm font-medium text-slate-700" htmlFor="password">
                                    Kata Sandi
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs font-medium text-emerald-700 transition-colors hover:text-emerald-800"
                                    >
                                        Lupa password?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className="w-full rounded border border-slate-300 bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-emerald-700 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-1.5 text-xs text-red-600" />
                        </div>

                        <label className="flex cursor-pointer items-center gap-2 pt-1">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:ring-offset-0"
                            />
                            <span className="text-sm text-slate-600">Ingat saya</span>
                        </label>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded bg-[#0F2E24] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-950 disabled:cursor-not-allowed disabled:opacity-60 shadow-sm"
                        >
                            {processing ? 'Memproses...' : 'Masuk ke Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
