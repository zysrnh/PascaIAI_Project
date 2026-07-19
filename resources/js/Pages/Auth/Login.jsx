import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, GraduationCap, CheckCircle2 } from 'lucide-react';
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
            <Head title="Admin Login" />

            {/* Brand panel */}
            <div className="hidden w-1/2 flex-col justify-between bg-slate-800 p-12 lg:flex">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-emerald-500 text-sm font-bold text-white">
                        IAI
                    </div>
                    <span className="text-sm font-medium text-slate-300">Pascasarjana IAI Persis Bandung</span>
                </div>

                <div>
                    <GraduationCap className="mb-6 h-10 w-10 text-emerald-400" />
                    <h1 className="mb-3 text-3xl font-bold text-white">Admin Portal</h1>
                    <p className="mb-8 max-w-sm text-sm leading-relaxed text-slate-400">
                        Kelola seluruh konten dan layanan akademik Pascasarjana IAI Persis Bandung dalam satu portal.
                    </p>
                    <ul className="space-y-3">
                        {[
                            'Kelola konten Fakultas & Akademik',
                            'Publikasi berita & dokumen institusi',
                            'Monitoring hibah & kegiatan LPPM',
                        ].map((feature) => (
                            <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-300">
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="text-xs text-slate-500">© 2026 IAI Persis Bandung</p>
            </div>

            {/* Form panel */}
            <div className="flex w-full flex-col items-center justify-center bg-slate-50 px-6 py-12 lg:w-1/2 lg:bg-white">
                <div className="w-full max-w-sm">
                    {/* Mobile-only brand header */}
                    <div className="mb-8 flex items-center gap-3 lg:hidden">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-emerald-500 text-sm font-bold text-white">
                            IAI
                        </div>
                        <span className="text-sm font-medium text-slate-600">Pascasarjana IAI Persis Bandung</span>
                    </div>

                    <h2 className="mb-1 text-2xl font-bold text-slate-800">Selamat Datang</h2>
                    <p className="mb-8 text-sm text-slate-500">Masuk untuk mengakses admin portal.</p>

                    {status && (
                        <div className="mb-6 rounded-[5px] border border-emerald-200 bg-emerald-50 p-3 text-center text-sm font-medium text-emerald-700">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="w-full rounded-[5px] border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="admin@pasca.iaipibandung.ac.id"
                            />
                            <InputError message={errors.email} className="mt-1.5 text-xs text-red-600" />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label className="block text-sm font-medium text-slate-700" htmlFor="password">
                                    Password
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className="w-full rounded-[5px] border border-slate-300 bg-white px-3.5 py-2.5 pr-10 text-sm text-slate-800 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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

                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-1 focus:ring-blue-500 focus:ring-offset-0"
                            />
                            <span className="text-sm text-slate-600">Remember me</span>
                        </label>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-[5px] bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}