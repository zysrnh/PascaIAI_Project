<?php
/**
 * Bootstrap Pure PHP GitHub Auto-Sync Script
 * Dapat diakses sekali via browser (misal: https://kpi.iaipibandung.ac.id/auto_sync.php)
 * untuk memperbarui seluruh berkas aplikasi dari GitHub tanpa butuh SSH/Terminal.
 */

// Tingkatkan limit waktu dan memori
@ini_set('max_execution_time', '300');
@ini_set('memory_limit', '256M');

header('Content-Type: text/html; charset=utf-8');

$repoUrl = 'https://github.com/zysrnh/PascaIAI_Project.git';
$repoZipUrl = 'https://codeload.github.com/zysrnh/PascaIAI_Project/zip/refs/heads/main';
$fallbackZipUrl = 'https://github.com/zysrnh/PascaIAI_Project/archive/refs/heads/main.zip';

// Deteksi base path aplikasi
$currentDir = __DIR__;
$basePath = dirname($currentDir);

// Jika index.php ada di public_html/kpi.iaipibandung.ac.id dan Laravel ada di folder Uploads/
if (file_exists($currentDir . '/Uploads/artisan')) {
    $basePath = $currentDir . '/Uploads';
} elseif (file_exists($currentDir . '/artisan')) {
    $basePath = $currentDir;
} elseif (file_exists($basePath . '/artisan')) {
    // $basePath tetap dirname(__DIR__)
} elseif (file_exists(dirname($basePath) . '/Uploads/artisan')) {
    $basePath = dirname($basePath) . '/Uploads';
}

$storageDir = $basePath . '/storage/app';
if (!is_dir($storageDir)) {
    @mkdir($storageDir, 0777, true);
}
$tempZipPath = $storageDir . '/github_auto_sync.zip';

$logs = [];
$logs[] = "=== PURE PHP GITHUB AUTO-SYNC BOOTSTRAP ===";
$logs[] = "Target Remote : {$repoUrl} (branch: main)";
$logs[] = "Waktu         : " . date('Y-m-d H:i:s');
$logs[] = "Base Path     : {$basePath}";

$startTime = microtime(true);

// 1. Download
$logs[] = "\n[1/4] Mengunduh arsip kode dari GitHub...";
$downloadSuccess = false;

if (function_exists('curl_init')) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $repoZipUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Laravel-PurePHP-SyncBootstrap/1.0');
    curl_setopt($ch, CURLOPT_TIMEOUT, 300);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

    $zipData = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode >= 200 && $httpCode < 400 && !empty($zipData)) {
        file_put_contents($tempZipPath, $zipData);
        $downloadSuccess = true;
        $sizeMb = number_format(strlen($zipData) / 1048576, 2);
        $logs[] = "  ✓ Berhasil diunduh via cURL ({$sizeMb} MB, HTTP {$httpCode}).";
    }
}

if (!$downloadSuccess) {
    $ctx = stream_context_create([
        'http' => ['timeout' => 300, 'user_agent' => 'Laravel-Bootstrap/1.0', 'follow_location' => 1],
        'ssl' => ['verify_peer' => false, 'verify_peer_name' => false]
    ]);
    $zipData = @file_get_contents($fallbackZipUrl, false, $ctx);
    if ($zipData !== false && !empty($zipData)) {
        file_put_contents($tempZipPath, $zipData);
        $downloadSuccess = true;
        $sizeMb = number_format(strlen($zipData) / 1048576, 2);
        $logs[] = "  ✓ Berhasil diunduh via stream_context ({$sizeMb} MB).";
    }
}

if (!$downloadSuccess || !file_exists($tempZipPath)) {
    $logs[] = "  ✗ GAGAL mengunduh berkas dari GitHub. Silakan periksa koneksi internet server.";
    renderPage(false, $logs);
    exit;
}

// 2. Ekstrak
$logs[] = "\n[2/4] Mengekstrak dan memperbarui berkas proyek...";
if (!class_exists('ZipArchive')) {
    $logs[] = "  ✗ Ekstensi ZipArchive PHP tidak tersedia!";
    renderPage(false, $logs);
    exit;
}

$zip = new ZipArchive();
if ($zip->open($tempZipPath) !== true) {
    $logs[] = "  ✗ Berkas ZIP tidak valid atau corrupt.";
    @unlink($tempZipPath);
    renderPage(false, $logs);
    exit;
}

$totalEntries = $zip->numFiles;
$updatedCount = 0;
$skippedProtected = 0;

for ($i = 0; $i < $totalEntries; $i++) {
    $entry = $zip->getNameIndex($i);
    $rel = preg_replace('#^[^/]+/#', '', $entry);
    if (empty($rel)) continue;

    $target = $basePath . '/' . $rel;

    if (str_ends_with($entry, '/')) {
        if (!is_dir($target)) @mkdir($target, 0755, true);
        continue;
    }

    // Proteksi: jangan timpa .env
    if (basename($rel) === '.env' || str_starts_with($rel, '.env.')) {
        $skippedProtected++;
        continue;
    }

    // Proteksi: jangan timpa storage/
    if (str_starts_with($rel, 'storage/') || str_starts_with($rel, 'storage\\')) {
        $skippedProtected++;
        continue;
    }

    $stream = $zip->getStream($entry);
    if ($stream) {
        $dir = dirname($target);
        if (!is_dir($dir)) @mkdir($dir, 0755, true);
        $fp = fopen($target, 'wb');
        if ($fp) {
            stream_copy_to_stream($stream, $fp);
            fclose($fp);
            $updatedCount++;
        }
        fclose($stream);
    }
}

$zip->close();
@unlink($tempZipPath);

$logs[] = "  ✓ {$updatedCount} berkas proyek berhasil diperbarui.";
$logs[] = "  ✓ {$skippedProtected} berkas diproteksi (file .env & folder storage/ tetap aman).";

// 3. Sinkronisasi folder build Vite ke public_html
$logs[] = "\n[3/4] Menyalin aset build Vite ke public_html...";
$sourceBuild = $basePath . '/public/build';
if (!is_dir($sourceBuild)) {
    $sourceBuild = $currentDir . '/build';
}

$targetBuilds = [
    $currentDir . '/build',
    $currentDir . '/Uploads/build',
    $basePath . '/../public_html/kpi.iaipibandung.ac.id/build',
    $basePath . '/../public_html/kpi.iaipibandung.ac.id/Uploads/build',
];

$copiedBuilds = 0;
if (is_dir($sourceBuild)) {
    foreach ($targetBuilds as $tb) {
        $tbNorm = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $tb);
        $sbNorm = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $sourceBuild);
        if ($tbNorm === $sbNorm) continue;

        if (is_dir(dirname($tbNorm))) {
            copyDirectory($sourceBuild, $tbNorm);
            $logs[] = "  -> Tersinkron ke: {$tbNorm}";
            $copiedBuilds++;
        }
    }
}
$logs[] = "  ✓ Aset build berhasil disalin ({$copiedBuilds} lokasi).";

// 4. Bersihkan Cache Laravel
$logs[] = "\n[4/4] Membersihkan cache Laravel...";
$bootstrapApp = $basePath . '/bootstrap/app.php';
if (file_exists($bootstrapApp)) {
    try {
        require_once $basePath . '/vendor/autoload.php';
        $app = require_once $bootstrapApp;
        $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
        $kernel->bootstrap();

        \Illuminate\Support\Facades\Artisan::call('optimize:clear');
        $logs[] = "  ✓ Artisan optimize:clear berhasil dieksekusi.";

        // Migrasi jika ada
        try {
            \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
            $logs[] = "  ✓ Database Migration: " . trim(\Illuminate\Support\Facades\Artisan::output() ?: 'Up-to-date.');
        } catch (\Throwable $e) {
            $logs[] = "  ℹ Migration: " . $e->getMessage();
        }
    } catch (\Throwable $e) {
        $logs[] = "  ℹ Note: " . $e->getMessage();
    }
}

$duration = number_format(microtime(true) - $startTime, 2) . 's';
$logs[] = "\n==================================================";
$logs[] = "✓ SELESAI dalam {$duration}!";
$logs[] = "Sekarang Anda dapat membuka https://kpi.iaipibandung.ac.id/admin/terminal";

renderPage(true, $logs);

function copyDirectory($src, $dst) {
    if (!is_dir($dst)) @mkdir($dst, 0755, true);
    $dir = opendir($src);
    while (false !== ($file = readdir($dir))) {
        if ($file != '.' && $file != '..') {
            if (is_dir($src . '/' . $file)) {
                copyDirectory($src . '/' . $file, $dst . '/' . $file);
            } else {
                copy($src . '/' . $file, $dst . '/' . $file);
            }
        }
    }
    closedir($dir);
}

function renderPage($success, $logs) {
    $statusText = $success ? 'Sinkronisasi Berhasil!' : 'Sinkronisasi Gagal';
    $statusColor = $success ? '#10b981' : '#f43f5e';
    $logContent = htmlspecialchars(implode("\n", $logs));

    echo <<<HTML
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Auto-Sync GitHub - Pasca IAI</title>
    <style>
        body { background: #0B111D; color: #E2E8F0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, monospace; margin: 0; padding: 2rem; display: flex; justify-content: center; }
        .card { max-width: 800px; width: 100%; background: #0F172A; border: 1px solid #1E293B; border-radius: 12px; padding: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 13px; font-weight: 600; color: #fff; background: {$statusColor}; margin-bottom: 12px; }
        h1 { margin: 0 0 8px 0; font-size: 20px; font-weight: 700; color: #F8FAFC; }
        p { margin: 0 0 16px 0; font-size: 13px; color: #94A3B8; }
        pre { background: #050811; border: 1px solid #1E293B; border-radius: 8px; padding: 16px; font-size: 12px; line-height: 1.6; color: #38BDF8; overflow-x: auto; white-space: pre-wrap; word-break: break-all; }
        .btn { display: inline-block; background: #2563EB; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-size: 13px; font-weight: 500; margin-top: 16px; transition: background 0.2s; }
        .btn:hover { background: #1D4ED8; }
    </style>
</head>
<body>
    <div class="card">
        <span class="badge">{$statusText}</span>
        <h1>Pure PHP GitHub Auto-Sync</h1>
        <p>Proses pembaruan otomatis dari repositori GitHub tanpa butuh SSH atau Git CLI.</p>
        <pre>{$logContent}</pre>
        <a href="/admin/terminal" class="btn">Buka Web Terminal &rarr;</a>
    </div>
</body>
</html>
HTML;
}
