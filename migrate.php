<?php
/**
 * Script Migrasi & Seeder Awal Otomatis (Single File Web Installer)
 * Program Studi S1 Komunikasi dan Penyiaran Islam (KPI) - IAI Persis Bandung
 * 
 * Cara Penggunaan:
 * 1. Unggah berkas ini ke direktori web hosting cPanel (bisa di public_html atau di folder public)
 * 2. Buka di browser: https://domain-anda.com/migrate.php
 * 3. Klik tombol 'Jalankan Migrasi & Seeder Awal'
 */

// 1. Deteksi Base Path Laravel
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    $basePath = __DIR__;
} elseif (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    $basePath = dirname(__DIR__);
} else {
    die("<div style='font-family:sans-serif;padding:2rem;color:#b91c1c;background:#fef2f2;border:1px solid #f87171;border-radius:8px;'><h3>Error: Autoload Laravel Tidak Ditemukan!</h3><p>Pastikan berkas <code>migrate.php</code> berada tepat di root proyek Laravel atau di dalam direktori <code>public/</code>.</p></div>");
}

// 2. Pastikan folder framework ada (mencegah error session/views di hosting)
foreach ([
    $basePath . '/storage/framework/views',
    $basePath . '/storage/framework/cache/data',
    $basePath . '/storage/framework/sessions',
    $basePath . '/storage/logs',
    $basePath . '/bootstrap/cache',
] as $sDir) {
    if (!is_dir($sDir)) {
        @mkdir($sDir, 0777, true);
    }
    @chmod($sDir, 0777);
}

// 3. Bootstrap Laravel
require $basePath . '/vendor/autoload.php';
$app = require_once $basePath . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

$action = $_POST['action'] ?? $_GET['action'] ?? null;
$logs = [];
$status = null;
$errorMessage = null;

if ($action === 'run_migrate' || $_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        set_time_limit(300);
        $dbName = config('database.connections.' . config('database.default') . '.database');
        $dbHost = config('database.connections.' . config('database.default') . '.host');
        $dbDriver = config('database.default');
        $logs[] = "[INFO] Menghubungkan ke database '{$dbName}' pada host '{$dbHost}' (Driver: {$dbDriver})...";
        DB::connection()->getPdo();
        $logs[] = "[SUCCESS] Koneksi database berhasil terhubung!";

        $logs[] = "[INFO] Menjalankan 'php artisan migrate --force'...";
        Artisan::call('migrate', ['--force' => true]);
        $migrateOutput = trim(Artisan::output());
        if (!empty($migrateOutput)) { $logs[] = $migrateOutput; }
        $logs[] = "[SUCCESS] Seluruh tabel database berhasil dimigrasi!";

        $logs[] = "[INFO] Menjalankan 'php artisan db:seed --force'...";
        Artisan::call('db:seed', ['--force' => true]);
        $seedOutput = trim(Artisan::output());
        if (!empty($seedOutput)) { $logs[] = $seedOutput; }
        $logs[] = "[SUCCESS] Data master dan seeder berhasil diisikan!";

        $logs[] = "[INFO] Memverifikasi akun Developer 'naodev@iaipibandung.ac.id'...";
        $devUser = User::updateOrCreate(
            ['email' => 'naodev@iaipibandung.ac.id'],
            [
                'name' => 'NAO Developer',
                'password' => Hash::make('password123'),
                'role' => 'dev',
            ]
        );
        $logs[] = "[SUCCESS] Akun Developer (Role: dev) aktif dengan email: " . $devUser->email;

        $logs[] = "[INFO] Membuat symlink public/storage...";
        $target = $basePath . '/storage/app/public';
        $link = $basePath . '/public/storage';
        if (!file_exists($link)) {
            @symlink($target, $link);
            $logs[] = "[SUCCESS] Symlink public/storage berhasil dibuat!";
        } else {
            $logs[] = "[INFO] Symlink public/storage sudah ada.";
        }

        $logs[] = "[INFO] Membershhkan cache aplikasi...";
        Artisan::call('optimize:clear');
        $logs[] = "[SUCCESS] Cache konfigurasi, rute, dan view dibershhkan!";

        $status = 'success';
    } catch (\Throwable $e) {
        $status = 'error';
        $errorMessage = $e->getMessage();
        $logs[] = "[ERROR] Terjadi kegagalan: " . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Migrasi & Seeder Awal - KPI IEIPersis Bandung</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #020617; color: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem 1rem; }
        .container { width: 100%; max-width: 680px; background: #0f172a; border:1px solid #1e293b; border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); overflow: hidden; }
        .header { padding: 2rem; border-bottom: 1px solid #1e293b; background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%); }
        .badge { display: inline-block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; padding: 0.25rem 0.65rem; border-radius: 4px; background: #064e3b; color: #34d399; border: 1px solid #059669; margin-bottom: 0.75rem; }
        h1 { font-size: 1.4rem; font-weight: 700; color: #ffffff; margin-bottom: 0.5rem; }
        p.subtitle { font-size: 0.875rem; color: #94a3b8; line-height: 1.5; }
        .content { padding: 2rem; }
        .db-info { background: #020617; border: 1px solid #1e293b; border-radius: 8px; padding: 1rem 1.25rem; margin-bottom: 1.5rem; font-size: 0.825rem; color: #94a3b8; }
        .db-info span { color: #38bdf8; font-family: monospace; font-weight: 600; }
        .btn-tun { display: block; width: 100%; background: #059669; color: white; font-weight: 700; font-size: 0.95rem; padding: 0.9rem; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s; text-align: center; text-decoration: none; }
        .btn-tun:hover { background: #047857; box-shadow: 0 4px 14px rgba(5, 150, 105, 0.4); }
        .btn-login { display: block; width: 100%; background: #0284c7; color: white; font-weight: 700; font-size: 0.95rem; padding: 0.9rem; border: none; border-radius: 8px; cursor: pointer; transition: all 0.2s; text-align: center; text-decoration: none; margin-top: 1rem; }
        .btn,ö«jin:hover { background: #0369a1; box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4); }
        .terminal-box { background: #020617; border: 1px solid #1e293b; border-radius: 8px; padding: 1rem; margin-top: 1.5rem; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 0.8rem; line-height: 1.6; max-height: 320px; overflow-y: auto; }
        .log-line { word-break: break-all; white-space: pre-wrap; }
        .log-line.success { color: #34d399; }
        .log-line.info { color: #94a3b8; }
        .log-line.error { color: #f87171; font-weight: 700; }
        .credentials-card { background: #020617; border: 1px solid #059669; border-radius: 8px; padding: 1rem 1.25rem; margin-top: 1.5rem; font-size: 0.85rem; }
        .credentials-card h3 { font-size: 0.9rem; color: #34d399; margin-bottom: 0.5rem; }
        .credentials-row { display: flex; justify-content: space-between; padding: 0.25rem 0; font-family: monospace; color: #cbd7e1; }
        .credentials-row span.val { color: #38bdf8; font-weight: 600; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <span class="badge">cPanel Auto-Installer</span>
            <h1>Migrasi & Seeder Awal Sistem</h1>
            <p class="subtitle">Program Studi S1 Komunikasi dan Penyiaran Islam (KPI) &mdash; Institut Agama Islam Persatuan Islam (IAI Persis) Bandung</p>
        </div>
        <div class="content">
            <div class="db-info">
                Database: <span><?= htmlspecialchars(config('database.connections.' . config('database.default') . '.database') ?? 'SQLite/Unknown') ?></span> | 
                Driver: <span><?= htmlspecialchars(config('database.default')) ?></span>
            </div>

            <?php if ($status === null): ?>
                <p style="color:#cbd7e1; font-size:0.875rem; margin-bottom:1.5rem; line-height:1.6;">
                    Klik tombol di bawah ini untuk memulai migrasi seluruh tabel database, pengisian data master/seeder, pembuatan symlink storage, dan inisialisasi akun developer secara otomatis.
                </p>
                <form method="POST">
                    <input type="hidden" name="action" value="run_migrate">
                    <button type="submit" class="btn-run">ðš€€ Jalankan Migrasi & Seeder Awal Sekarang</button>
                </form>
            <?php else: ?>
                <div class="terminal-box">
                    <?php foreach ($logs as $log): ?>
                        <?php
                            $class = 'info';
                            if (strpos($log, '[SUCCESS]') !== false) $class = 'success';
                            if (strpos($log, '[ERROR]') !== false) $class = 'error';
                        ?>
                        <div class="log-line <?= $class ?>"><?= htmlspecialchars($log) ?></div>
                    <?php endforeach; ?>
                </div>

                <?php if ($status === 'success'): ?>
                    <div class="credentials-card">
                        <h3>âœ… Migrasi & Seeder Sukses 100%!</h3>
                        <p style="color:#94a3b8; font-size:0.8rem; margin-bottom:0.75rem;">Gunakan akun Developer di bawah ini untuk mengelola sistem dan terminal cPanel:</p>
                        <div class="credentials-row"><span>Email:</span> <span class="val">naodev@iaipibandung.ac.id</span></div>
                        <div class="credentials-row"><span>Password:</span> <span class="val">password123</span></div>
                        <div class="credentials-row"><span>Role:</span> <span class="val">dev</span></div>
                    </div>

                    <a href="/login" class="btn,ö«jin">Menuju Halaman Login &rarr;</a>
                <?php else: ?>
                    <div style="margin-top:1.5rem; padding:1rem; background:#450a0a; border:1px solid #dc2626; border-radius:8px; color:#fca5a5; font-size:0.875rem;">
                        <strong>Migrasi Gagal:</strong> <?= htmlspecialchars($errorMessage) ?>
                    </div>
                    <form method="POST" style="margin-top:1rem;">
                        <input type="hidden" name="action" value="run_migrate">
                        <button type="submit" class="btn-run" style="background:#dc2626;">Coba Ulang Migrasi</button>
                    </form>
                <?php endif; ?>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>