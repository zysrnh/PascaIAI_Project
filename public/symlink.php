<?php
/**
 * Standalone Storage Symlink & Asset Synchronizer for cPanel
 * Khusus Program Studi S1 KPI - IAI Persis Bandung
 */
error_reporting(E_ALL);
ini_set('display_errors', 1);

$currentDir = __DIR__; // Di cPanel: /home/iais9713/public_html/kpi.iaipibandung.ac.id
$action = $_GET['action'] ?? 'status';

// Deteksi file .htaccess yang kehilangan titik di depan
$fixedHtaccess = false;
if (file_exists($currentDir . '/htaccess') && !file_exists($currentDir . '/.htaccess')) {
    @copy($currentDir . '/htaccess', $currentDir . '/.htaccess');
    $fixedHtaccess = true;
}

// Deteksi dan sinkronisasi logo KPI
$fixedLogo = false;
if (file_exists($currentDir . '/logo_kpi.png')) {
    @copy($currentDir . '/logo_kpi.png', $currentDir . '/logo_kampus.png');
    @copy($currentDir . '/logo_kpi.png', $currentDir . '/logo_lpm.png');
    $fixedLogo = true;
}

// Cari lokasi folder storage/app/public Laravel di server
$possibleTargets = [
    dirname($currentDir) . '/storage/app/public',
    dirname(dirname($currentDir)) . '/storage/app/public',
    '/home/iais9713/storage/app/public',
    '/home/iais9713/pasca.iaipibandung.ac.id/storage/app/public',
    '/home/iais9713/pasca/storage/app/public',
    '/home/iais9713/kpi/storage/app/public',
    '/home/iais9713/laravel/storage/app/public',
    $currentDir . '/../storage/app/public',
];

// Cari dari index.php jika ada
if (file_exists($currentDir . '/index.php')) {
    $indexContent = file_get_contents($currentDir . '/index.php');
    if (strpos($indexContent, 'bootstrap/app.php') !== false) {
        $laravelRoot = realpath($currentDir . '/../');
        if ($laravelRoot && file_exists($laravelRoot . '/storage/app/public')) {
            array_unshift($possibleTargets, $laravelRoot . '/storage/app/public');
        }
    }
}

// Glob search di parent jika belum ketemu
if (is_dir(dirname(dirname($currentDir)))) {
    $parentFolders = glob(dirname(dirname($currentDir)) . '/*', GLOB_ONLYDIR);
    foreach ($parentFolders as $pf) {
        if (file_exists($pf . '/storage/app/public')) {
            $possibleTargets[] = $pf . '/storage/app/public';
        }
    }
}

$target = null;
foreach ($possibleTargets as $pt) {
    if (file_exists($pt) && is_dir($pt)) {
        $target = realpath($pt);
        break;
    }
}

$link = $currentDir . '/storage';

// Fungsi Copy Rekursif
function copyDirRecursive($src, $dst, &$count = 0) {
    if (!file_exists($src)) return;
    @mkdir($dst, 0755, true);
    $dir = @opendir($src);
    if (!$dir) return;
    while (false !== ($file = readdir($dir))) {
        if ($file != '.' && $file != '..') {
            $srcFile = $src . '/' . $file;
            $dstFile = $dst . '/' . $file;
            if (is_dir($srcFile)) {
                copyDirRecursive($srcFile, $dstFile, $count);
            } else {
                if (@copy($srcFile, $dstFile)) {
                    @chmod($dstFile, 0644);
                    $count++;
                }
            }
        }
    }
    closedir($dir);
}

$message = '';
$messageType = 'info';

if ($action === 'delete_self') {
    @unlink(__FILE__);
    echo "<div style='font-family:sans-serif;padding:30px;text-align:center;'><h2>Script symlink.php berhasil dihapus.</h2><p>Keamanan server tetap terjaga.</p><a href='/'>Kembali ke Beranda</a></div>";
    exit;
}

if ($action === 'sync') {
    if (!$target) {
        $message = "Folder sumber 'storage/app/public' tidak ditemukan di server. Periksa kembali struktur folder Laravel.";
        $messageType = 'error';
    } else {
        $symlinkOk = false;
        if (function_exists('symlink')) {
            if (is_link($link)) {
                @unlink($link);
            }
            if (!file_exists($link)) {
                try {
                    $symlinkOk = @symlink($target, $link);
                } catch (\Throwable $e) {
                    $symlinkOk = false;
                }
            }
        }

        if ($symlinkOk && is_link($link)) {
            $message = "Symlink berhasil dibuat! Folder public_html/storage sekarang terhubung langsung ke storage/app/public.";
            $messageType = 'success';
        } else {
            // Mode Smart Copy (Mirroring)
            $copiedCount = 0;
            copyDirRecursive($target, $link, $copiedCount);
            $message = "Mode Smart-Sync Aktif: Seluruh aset ({$copiedCount} berkas) berhasil disinkronkan ke 'public_html/storage'. Berkas siap diakses.";
            $messageType = 'success';
        }
    }
}

// Cek status terkini
$isLink = is_link($link);
$storageExists = file_exists($link);
$fileCount = 0;
if ($storageExists && is_dir($link)) {
    try {
        $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($link, RecursiveDirectoryIterator::SKIP_DOTS));
        foreach ($iterator as $item) {
            if ($item->isFile()) $fileCount++;
        }
    } catch (\Throwable $e) {
        $fileCount = 0;
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Storage Symlink & Asset Synchronizer - Prodi KPI</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f8fafc; color: #1e293b; margin: 0; padding: 30px 15px; }
        .card { max-width: 680px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); padding: 30px; }
        h1 { font-size: 20px; font-weight: 700; color: #0F2E24; margin-top: 0; border-bottom: 2px solid #0F2E24; padding-bottom: 12px; }
        .item { margin-bottom: 15px; font-size: 14px; }
        .label { font-weight: 600; color: #475569; display: block; margin-bottom: 4px; }
        .val { background: #f1f5f9; padding: 8px 12px; border-radius: 3px; font-family: monospace; font-size: 13px; word-break: break-all; border: 1px solid #cbd5e1; }
        .badge { display: inline-block; padding: 4px 10px; font-size: 12px; font-weight: 600; border-radius: 3px; }
        .badge-success { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
        .badge-warning { background: #fef3c7; color: #b45309; border: 1px solid #fcd34d; }
        .badge-error { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
        .alert { padding: 12px 16px; border-radius: 3px; font-size: 14px; margin-bottom: 20px; font-weight: 500; }
        .alert-success { background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; }
        .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; }
        .alert-info { background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; }
        .btn-group { display: flex; gap: 10px; margin-top: 25px; flex-wrap: wrap; }
        .btn { display: inline-block; padding: 10px 18px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 3px; cursor: pointer; border: none; }
        .btn-primary { background: #0F2E24; color: #ffffff; }
        .btn-primary:hover { background: #164e3f; }
        .btn-danger { background: #dc2626; color: #ffffff; }
        .btn-danger:hover { background: #b91c1c; }
        .btn-secondary { background: #e2e8f0; color: #334155; }
        .btn-secondary:hover { background: #cbd5e1; }
        .footer { margin-top: 25px; border-top: 1px solid #f1f5f9; padding-top: 15px; font-size: 12px; color: #94a3b8; text-align: center; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Storage & Symlink Manager &mdash; Prodi KPI</h1>

        <?php if ($message): ?>
            <div class="alert alert-<?= $messageType ?>"><?= htmlspecialchars($message) ?></div>
        <?php endif; ?>

        <?php if ($fixedHtaccess): ?>
            <div class="alert alert-success">File <code>htaccess</code> tanpa titik otomatis diperbaiki menjadi <code>.htaccess</code>.</div>
        <?php endif; ?>

        <?php if ($fixedLogo): ?>
            <div class="alert alert-success">Logo KPI (<code>logo_kpi.png</code>) otomatis disinkronkan ke <code>logo_kampus.png</code> dan <code>logo_lpm.png</code>.</div>
        <?php endif; ?>

        <div class="item">
            <span class="label">Status Folder Storage Publik:</span>
            <?php if ($isLink): ?>
                <span class="badge badge-success">Aktif (Symlink Valid)</span>
            <?php elseif ($storageExists): ?>
                <span class="badge badge-success">Aktif (Smart Sync Mirroring &mdash; <?= $fileCount ?> File)</span>
            <?php else: ?>
                <span class="badge badge-error">Belum Terhubung</span>
            <?php endif; ?>
        </div>

        <div class="item">
            <span class="label">Folder Web Publik (Current):</span>
            <div class="val"><?= htmlspecialchars($currentDir) ?></div>
        </div>

        <div class="item">
            <span class="label">Target Sumber (Storage Laravel):</span>
            <div class="val"><?= $target ? htmlspecialchars($target) : '<span style="color:#dc2626;">Tidak ditemukan otomatis</span>' ?></div>
        </div>

        <div class="item">
            <span class="label">Tujuan Link (Public Storage):</span>
            <div class="val"><?= htmlspecialchars($link) ?></div>
        </div>

        <div class="btn-group">
            <a href="?action=sync" class="btn btn-primary">Sinkronkan Storage Sekarang</a>
            <a href="?" class="btn btn-secondary">Refresh Status</a>
            <a href="?action=delete_self" onclick="return confirm('Hapus script symlink.php ini demi keamanan?');" class="btn btn-danger">Hapus Script Ini</a>
        </div>

        <div class="footer">
            Program Studi S1 Komunikasi dan Penyiaran Islam &bull; IAI Persis Bandung
        </div>
    </div>
</body>
</html>
