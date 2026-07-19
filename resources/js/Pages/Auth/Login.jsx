import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function Login({ status, canResetPassword }) {
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
        <div className="admin-login-container">
            <Head title="Admin Login" />

            <div className="admin-login-glass">
                <div className="admin-logo-placeholder">
                    <span>IAI</span>
                </div>
                
                <h2 className="text-2xl font-bold text-center text-white mb-2">
                    Admin Portal
                </h2>
                <p className="text-slate-300 text-center mb-8 text-sm">
                    Pascasarjana IAI Persis Bandung
                </p>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-400 text-center bg-green-900/30 p-2 rounded">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="admin-input-group">
                        <label className="block text-slate-300 text-sm mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="admin-input"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="admin@pasca.iaipibandung.ac.id"
                        />
                        <InputError message={errors.email} className="mt-2 text-red-400" />
                    </div>

                    <div className="admin-input-group">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-slate-300 text-sm" htmlFor="password">
                                Password
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            )}
                        </div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="admin-input"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                        />
                        <InputError message={errors.password} className="mt-2 text-red-400" />
                    </div>

                    <div className="mb-6 flex items-center">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="rounded border-slate-600 bg-slate-800/50 text-blue-500 shadow-sm focus:ring-blue-500 focus:ring-offset-slate-900"
                            />
                            <span className="ms-2 text-sm text-slate-300">Remember me</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="admin-btn"
                        disabled={processing}
                    >
                        {processing ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
