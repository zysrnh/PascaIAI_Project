<?php
/**
 * Auto-fix Storage Permissions & Missing Directories for Laravel
 */

header('Content-Type: text/html; charset=utf-8');

// Deteksi base path Laravel (bisa di __DIR__, __DIR__/Uploads, atau __DIR__/..)
$candidates = [
    __DIR__,
    __DIR__ . '/..',
    __DIR__ . '/Uploads',
    dirname(__DIR__) . '/Uploads',
    '/home/iais9713/public_html/kpi.iaipibandung.ac.id/Uploads',
    '/home/iais9713/public_html/kpi.iaipibandung.ac.id',
];

$basePath = null;
foreach ($candidates as $cand) {
    if (file_exists($cand . '/storage') && file_exists($cand . '/bootstrap')) {
        $basePath = realpath($cand) ?: $cand;
        break;
    }
}

if (!$basePath) {
    $basePath = __DIR__;
}

echo "<h2>🔧 Memperbaiki Storage & Cache Laravel di: " . htmlspecialchars($basePath) . "</h2>";
echo "<ul>";

$directories = [
    $basePath . '/storage',
    $basePath . '/storage/app',
    $basePath . '/storage/app/public',
    $basePath . '/storage/framework',
    $basePath . '/storage/framework/cache',
    $basePath . '/storage/framework/cache/data',
    $basePath . '/storage/framework/sessions',
    $basePath . '/storage/framework/views',
    $basePath . '/storage/logs',
    $basePath . '/bootstrap/cache',
];

foreach ($directories as $dir) {
    if (!is_dir($dir)) {
        if (@mkdir($dir, 0777, true)) {
            @chmod($dir, 0777);
            echo "<li style='color:green;'>✓ Direktori dibuat: <strong>" . htmlspecialchars($dir) . "</strong> (Permission 0777)</li>";
        } else {
            echo "<li style='color:red;'>✗ Gagal membuat: <strong>" . htmlspecialchars($dir) . "</strong></li>";
        }
    } else {
        @chmod($dir, 0777);
        echo "<li style='color:blue;'>✓ Direktori sudah ada, permission diatur ke 0777: <strong>" . htmlspecialchars($dir) . "</strong></li>";
    }
}

echo "</ul>";

// Hapus cache lama di bootstrap/cache (config.php, routes-v7.php, dll) jika ada
$cacheFiles = glob($basePath . '/bootstrap/cache/*.php');
if (!empty($cacheFiles)) {
    echo "<h3>🧹 Membersihkan cache bootstrap...</h3><ul>";
    foreach ($cacheFiles as $cf) {
        @unlink($cf);
        echo "<li>Dihapus: <strong>" . htmlspecialchars(basename($cf)) . "</strong></li>";
    }
    echo "</ul>";
}

// Bersihkan view cache lama
$viewFiles = glob($basePath . '/storage/framework/views/*.php');
if (!empty($viewFiles)) {
    foreach ($viewFiles as $vf) {
        @unlink($vf);
    }
    echo "<p style='color:green;'>✓ " . count($viewFiles) . " file cache view lama dibersihkan.</p>";
}

// Tes tulis file di storage/framework/views
$testFile = $basePath . '/storage/framework/views/test_write.txt';
if (@file_put_contents($testFile, 'OK ' . date('Y-m-d H:i:s'))) {
    @unlink($testFile);
    echo "<div style='background:#dcfce7; border:1px solid #86efac; padding:15px; border-radius:8px; margin-top:20px;'>";
    echo "<p style='color:#166534; font-weight:bold; font-size:18px; margin:0 0 10px 0;'>🎉 SUKSES BESAR! Folder storage/framework/views sudah ada dan BISA DITULISI (Writable 777)!</p>";
    echo "<p style='color:#15803d; margin:0 0 15px 0;'>Error tempnam() sudah sembuh total. Silakan klik tombol di bawah untuk kembali ke website.</p>";
    echo "<a href='/' style='display:inline-block; padding:10px 20px; background:#16a34a; color:white; text-decoration:none; border-radius:6px; font-weight:bold;'>Buka Website KPI Sekarang →</a>";
    echo "</div>";
} else {
    echo "<div style='background:#fee2e2; border:1px solid #fca5a5; padding:15px; border-radius:8px; margin-top:20px;'>";
    echo "<p style='color:#991b1b; font-weight:bold;'>⚠️ Folder masih belum bisa ditulisi otomatis oleh PHP.</p>";
    echo "<p>Di cPanel File Manager: Masuk ke folder <strong>Uploads/storage/framework</strong>, klik folder <strong>views</strong>, lalu klik menu Permissions di atas dan centang semua kotak (777).</p>";
    echo "</div>";
}
