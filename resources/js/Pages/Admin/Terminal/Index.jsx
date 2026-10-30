import React, { useState, useRef, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Admin/Sidebar';
import axios from 'axios';
import {
    Terminal as TerminalIcon,
    GitPullRequest,
    RefreshCw,
    FolderSync,
    Trash2,
    Copy,
    Check,
    Play,
    Info,
    Sparkles,
    Server,
    Layers,
    Database,
    ShieldCheck
} from 'lucide-react';
import Swal from 'sweetalert2';

export default function Index({ auth, system }) {
    const [commandInput, setCommandInput] = useState('');
    const [history, setHistory] = useState([
        {
            type: 'system',
            content: `Selamat datang di Konsol Web Administrator!
Sistem: ${system.server_os} | PHP: ${system.php_version} | Laravel: ${system.laravel_version}
Metode Deployment: ${system.sync_method || 'Pure PHP GitHub Auto-Sync (1-Klik Pipeline)'}
Target Remote: ${system.repo_url} (branch: main)
Status Build: ${system.build_info?.exists ? `Tersedia (${system.build_info?.size})` : 'Belum dibangun'}

Ketik perintah manual atau gunakan tombol aksi cepat di atas untuk sinkronisasi otomatis 1-klik.`,
            timestamp: new Date().toLocaleTimeString('id-ID'),
        }
    ]);
    const [isRunning, setIsRunning] = useState(false);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [copied, setCopied] = useState(false);

    const terminalEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto scroll ke paling bawah saat ada output baru
    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history, isRunning]);

    // Fokus ke input terminal saat load
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const executeCommand = async (cmd) => {
        const trimmed = cmd.trim();
        if (!trimmed) return;

        // Tambah ke riwayat input command
        setCommandHistory((prev) => [trimmed, ...prev.filter((c) => c !== trimmed)]);
        setHistoryIndex(-1);

        // Tambah baris command ke output terminal
        setHistory((prev) => [
            ...prev,
            {
                type: 'command',
                content: trimmed,
                timestamp: new Date().toLocaleTimeString('id-ID'),
            }
        ]);

        setIsRunning(true);
        setCommandInput('');

        try {
            if (trimmed.toLowerCase() === 'clear' || trimmed.toLowerCase() === 'cls') {
                setHistory([]);
                setIsRunning(false);
                return;
            }

            const res = await axios.post('/admin/terminal/execute', {
                command: trimmed
            });

            const data = res.data;
            setHistory((prev) => [
                ...prev,
                {
                    type: data.success ? 'success' : 'error',
                    content: data.output,
                    duration: data.duration,
                    timestamp: new Date().toLocaleTimeString('id-ID'),
                }
            ]);
        } catch (err) {
            const errorMsg = err.response?.data?.output || err.response?.data?.message || err.message;
            setHistory((prev) => [
                ...prev,
                {
                    type: 'error',
                    content: `Gagal mengeksekusi: ${errorMsg}`,
                    timestamp: new Date().toLocaleTimeString('id-ID'),
                }
            ]);
        } finally {
            setIsRunning(false);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    };

    // Eksekusi Pure PHP GitHub Auto-Sync (1-Klik Pipeline)
    const handleGitPullAndSync = async () => {
        Swal.fire({
            title: 'Auto-Sync dari GitHub (1-Klik)?',
            text: 'Sistem akan otomatis menjalankan 4 tahapan berantai: (1) Mengunduh arsip kode terbaru dari GitHub via HTTP, (2) Auto-Migrate DB jika ada tabel/kolom baru, (3) Sinkronisasi asset build & gambar ke folder publik, dan (4) Bersihkan seluruh cache sistem.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Jalankan Full Auto-Sync!',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#0E1626',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await executeCommand('git pull');
            }
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            executeCommand(commandInput);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
                setHistoryIndex(nextIndex);
                setCommandInput(commandHistory[nextIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const nextIndex = historyIndex - 1;
                setHistoryIndex(nextIndex);
                setCommandInput(commandHistory[nextIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setCommandInput('');
            }
        }
    };

    const copyTerminalOutput = () => {
        const text = history
            .map((item) => {
                if (item.type === 'command') return `> ${item.content}`;
                return item.content;
            })
            .join('\n\n');

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-emerald-50 leading-tight">Terminal &amp; Git Console</h2>}
        >
            <Head title="Terminal & Git Console - Admin" />

            <div className="flex h-[calc(100vh-4rem)]">
                <Sidebar />
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
                    <div className="max-w-5xl mx-auto space-y-6">

                        {/* Top Info Bar */}
                        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                                        <TerminalIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h1 className="text-lg font-bold text-slate-900">Terminal &amp; Git Console</h1>
                                        <p className="text-xs text-slate-500">Pipeline otomatis 1-klik untuk pembaruan kode GitHub, migrasi database, dan sinkronisasi aset Vite.</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                        <span>Pure PHP Auto-Sync</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                                        <Server className="w-3.5 h-3.5 text-blue-600" />
                                        <span>PHP {system.php_version}</span>
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                                        <Layers className="w-3.5 h-3.5 text-amber-600" />
                                        <span>{system.build_info?.size || 'Build Ready'}</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Action Buttons Toolbar */}
                        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Aksi Cepat Deployment (1-Klik Pipeline)
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                {/* Tombol Utama: Pure PHP Auto-Sync 1-Klik */}
                                <button
                                    disabled={isRunning}
                                    onClick={handleGitPullAndSync}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0E1626] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition disabled:opacity-50 shadow-sm"
                                    title="Tarik GitHub + Migrate DB + Sync Build Assets + Clear Cache dalam 1 kali klik"
                                >
                                    <Sparkles className="w-4 h-4 text-amber-400" />
                                    <span>Auto-Sync dari GitHub (1-Klik Full Pipeline)</span>
                                </button>

                                {/* Tombol: Transfer / Sync Build ke folder publik */}
                                <button
                                    disabled={isRunning}
                                    onClick={() => executeCommand('sync:build')}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-lg text-xs font-medium transition disabled:opacity-50"
                                    title="Salin ulang aset public/build & images ke target root cPanel"
                                >
                                    <FolderSync className="w-3.5 h-3.5 text-blue-600" />
                                    <span>Sinkronkan Asset Build</span>
                                </button>

                                {/* Tombol: Artisan Migrate */}
                                <button
                                    disabled={isRunning}
                                    onClick={() => executeCommand('php artisan migrate --force')}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-lg text-xs font-medium transition disabled:opacity-50"
                                >
                                    <Database className="w-3.5 h-3.5 text-purple-600" />
                                    <span>Migrate DB</span>
                                </button>

                                {/* Tombol: Artisan Optimize Clear */}
                                <button
                                    disabled={isRunning}
                                    onClick={() => executeCommand('php artisan optimize:clear')}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-lg text-xs font-medium transition disabled:opacity-50"
                                >
                                    <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                                    <span>Bersihkan Cache</span>
                                </button>

                                {/* Tombol: Pemulihan Sistem (Fix) */}
                                <button
                                    disabled={isRunning}
                                    onClick={() => executeCommand('fix')}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-lg text-xs font-medium transition disabled:opacity-50"
                                    title="Bersihkan cache bootstrap corrupt & perbaiki izin folder storage/views"
                                >
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Pemulihan Sistem (Fix)</span>
                                </button>

                                {/* Tombol: Git Status */}
                                <button
                                    disabled={isRunning}
                                    onClick={() => executeCommand('git status')}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-lg text-xs font-medium transition disabled:opacity-50"
                                >
                                    <span>Status Deployment</span>
                                </button>
                            </div>
                        </div>

                        {/* Banner status Pure PHP Deployment */}
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs text-emerald-900 shadow-sm">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                                <div>
                                    <strong className="font-semibold text-emerald-800">
                                        Metode Pure PHP GitHub Auto-Sync Aktif
                                    </strong>
                                    <p className="text-[11px] text-emerald-700 mt-0.5">
                                        Kebal pembatasan cPanel hosting: beroperasi tanpa SSH, tanpa binary Git CLI, dan tanpa proc_open. Cukup klik tombol di atas kapan pun untuk memperbarui aplikasi seketika.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Minimalist Dark Console Window */}
                        <div className="bg-[#0B111D] border border-slate-800 rounded-xl shadow-xl overflow-hidden flex flex-col h-[520px]">
                            {/* Terminal Top Bar */}
                            <div className="bg-[#080D17] px-4 py-3 border-b border-slate-800 flex items-center justify-between shrink-0">
                                <div className="flex items-center space-x-2">
                                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                                    <span className="text-xs text-slate-400 font-mono ml-2">
                                        admin@server:~ ({system.git_branch})
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={copyTerminalOutput}
                                        title="Salin seluruh log"
                                        className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition flex items-center gap-1"
                                    >
                                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                        <span>{copied ? 'Tersalin' : 'Salin'}</span>
                                    </button>
                                    <button
                                        onClick={() => setHistory([])}
                                        title="Bersihkan layar terminal"
                                        className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition flex items-center gap-1"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Bersihkan</span>
                                    </button>
                                </div>
                            </div>

                            {/* Terminal Scrollable Logs */}
                            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs sm:text-sm space-y-3.5 text-slate-300 leading-relaxed selection:bg-slate-700">
                                {history.map((item, index) => (
                                    <div key={index} className="space-y-1">
                                        {item.type === 'command' && (
                                            <div className="flex items-center gap-2 text-white">
                                                <span className="text-emerald-400 font-bold">admin</span>
                                                <span className="text-slate-500">:</span>
                                                <span className="text-cyan-400">~</span>
                                                <span className="text-slate-500">$</span>
                                                <span className="font-semibold text-amber-300">{item.content}</span>
                                                <span className="text-[10px] text-slate-600 ml-auto">{item.timestamp}</span>
                                            </div>
                                        )}

                                        {item.type === 'system' && (
                                            <div className="text-slate-400 bg-slate-900/60 p-3 rounded border border-slate-800 whitespace-pre-wrap leading-relaxed">
                                                {item.content}
                                            </div>
                                        )}

                                        {item.type === 'success' && (
                                            <div className="text-slate-200 whitespace-pre-wrap pl-3 border-l-2 border-emerald-500/80">
                                                {item.content}
                                                {item.duration && (
                                                    <span className="block text-[10px] text-slate-500 mt-1">
                                                        Selesai dalam {item.duration}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {item.type === 'error' && (
                                            <div className="text-rose-400 whitespace-pre-wrap pl-3 border-l-2 border-rose-500/80">
                                                {item.content}
                                                {item.duration && (
                                                    <span className="block text-[10px] text-slate-500 mt-1">
                                                        Gagal dalam {item.duration}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {isRunning && (
                                    <div className="flex items-center gap-2 text-amber-400 py-1">
                                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                        <span>Menjalankan sinkronisasi di server hosting...</span>
                                    </div>
                                )}

                                <div ref={terminalEndRef} />
                            </div>

                            {/* Interactive Command Input Form */}
                            <div className="bg-[#080D17] p-3 border-t border-slate-800 flex items-center gap-2 shrink-0">
                                <span className="text-emerald-400 font-bold font-mono text-xs sm:text-sm shrink-0">
                                    admin:~$
                                </span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={commandInput}
                                    onChange={(e) => setCommandInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    disabled={isRunning}
                                    placeholder="Ketik perintah (contoh: git pull, sync:build, optimize:clear, dll) lalu tekan Enter..."
                                    className="flex-1 bg-transparent border-0 text-white font-mono text-xs sm:text-sm focus:outline-none focus:ring-0 placeholder:text-slate-600"
                                />
                                <button
                                    onClick={() => executeCommand(commandInput)}
                                    disabled={isRunning || !commandInput.trim()}
                                    className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white px-3 py-1.5 rounded text-xs font-medium transition flex items-center gap-1 shrink-0"
                                >
                                    <Play className="w-3 h-3 fill-white" />
                                    <span className="hidden sm:inline">Kirim</span>
                                </button>
                            </div>
                        </div>

                        {/* Helper Notes Card */}
                        <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 space-y-1.5">
                            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                                <Info className="w-4 h-4 text-blue-600" />
                                <span>Rantai Pipeline Otomatis (Pure PHP GitHub Auto-Sync):</span>
                            </div>
                            <p>
                                Saat Anda menekan tombol <strong>Auto-Sync dari GitHub</strong> atau mengetik <code>git pull</code>:
                            </p>
                            <ol className="list-decimal pl-5 space-y-0.5 font-mono text-[11px] text-slate-700">
                                <li>Laravel mengunduh arsip kode terbaru branch main via HTTP streaming.</li>
                                <li>Mengekstrak berkas secara otomatis dengan safe-overwrite (.env &amp; storage/ terlindungi).</li>
                                <li>Otomatis menjalankan <code>migrate --force</code> jika terdapat pembaruan skema database.</li>
                                <li>Otomatis menjalankan <code>sync:build</code> untuk menyalin aset Vite dan gambar ke direktori publik cPanel.</li>
                                <li>Otomatis membersihkan cache aplikasi dan cache bootstrap (<code>optimize:clear</code>).</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
