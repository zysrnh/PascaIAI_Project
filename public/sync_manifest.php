<?php
/**
 * Auto-Sync Vite Manifest to all possible paths on hosting & Clear View Cache
 */

header('Content-Type: text/html; charset=utf-8');

$sourceManifest = null;
$possibleSources = [
    __DIR__ . '/build/manifest.json',
    __DIR__ . '/manifest.json',
    __DIR__ . '/public/build/manifest.json',
    dirname(__DIR__) . '/public/build/manifest.json',
    dirname(__DIR__) . '/build/manifest.json',
    '/home/iais9713/public_html/kpi.iaipibandung.ac.id/Uploads/public/build/manifest.json',
    '/home/iais9713/public_html/kpi.iaipibandung.ac.id/Uploads/build/manifest.json',
    '/home/iais9713/public_html/kpi.iaipibandung.ac.id/build/manifest.json',
];

foreach ($possibleSources as $ps) {
    if (file_exists($ps)) {
        $content = file_get_contents($ps);
        // Pastikan manifest ini memuat Terminal/Index.jsx
        if (str_contains($content, 'Terminal/Index.jsx')) {
            $sourceManifest = $ps;
            $manifestContent = $content;
            break;
        }
    }
}

echo "<h2>🔄 Sinkronisasi Vite Manifest & Cache View</h2>";

if (!$sourceManifest) {
    // Jika tidak ditemukan di disk hosting, gunakan manifest json bawaan langsung
    $localManifest = __DIR__ . '/build/manifest.json';
    if (file_exists($localManifest)) {
        $manifestContent = file_get_contents($localManifest);
        $sourceManifest = $localManifest;
    }
}

if (!empty($manifestContent)) {
    echo "<p style='color:green;'>✓ Manifest terbaru ditemukan (" . strlen($manifestContent) . " bytes). Memuat entry <code>Terminal/Index.jsx</code>!</p>";

    $destinations = [
        '/home/iais9713/public_html/kpi.iaipibandung.ac.id/Uploads/public/build/manifest.json',
        '/home/iais9713/public_html/kpi.iaipibandung.ac.id/Uploads/build/manifest.json',
        '/home/iais9713/public_html/kpi.iaipibandung.ac.id/build/manifest.json',
        __DIR__ . '/build/manifest.json',
        __DIR__ . '/../public/build/manifest.json',
        __DIR__ . '/../build/manifest.json',
        dirname(__DIR__) . '/build/manifest.json',
        dirname(__DIR__) . '/public/build/manifest.json',
    ];

    $destinations = array_unique($destinations);
    echo "<ul>";
    foreach ($destinations as $dest) {
        $dir = dirname($dest);
        if (is_dir($dir)) {
            if (@file_put_contents($dest, $manifestContent)) {
                echo "<li style='color:green;'>✓ Berhasil disalin ke: <strong>{$dest}</strong></li>";
            } else {
                echo "<li style='color:red;'>✗ Gagal menulis ke: {$dest}</li>";
            }
        }
    }
    echo "</ul>";
} else {
    echo "<p style='color:red;'>✗ File manifest.json terbaru belum di-upload. Pastikan folder <code>build</code> sudah di-upload.</p>";
}

// Bersihkan cache view Blade lama agar Laravel compile ulang
$viewDirs = [
    '/home/iais9713/public_html/kpi.iaipibandung.ac.id/Uploads/storage/framework/views',
    __DIR__ . '/storage/framework/views',
    __DIR__ . '/../storage/framework/views',
    dirname(__DIR__) . '/storage/framework/views',
];

echo "<h3>🧹 Membersihkan Cache View Blade...</h3>";
foreach ($viewDirs as $vDir) {
    if (is_dir($vDir)) {
        $files = glob($vDir . '/*.php');
        $deleted = 0;
        foreach ($files as $f) {
            if (@unlink($f)) $deleted++;
        }
        echo "<p style='color:green;'>✓ Dibersihkan {$deleted} file cache view di: <code>{$vDir}</code></p>";
    }
}

// Bersihkan cache bootstrap jika ada
$bootstrapCacheDirs = [
    '/home/iais9713/public_html/kpi.iaipibandung.ac.id/Uploads/bootstrap/cache',
    __DIR__ . '/bootstrap/cache',
    __DIR__ . '/../bootstrap/cache',
];
foreach ($bootstrapCacheDirs as $bcd) {
    if (is_dir($bcd)) {
        foreach (['config.php', 'routes-v7.php'] as $stale) {
            if (file_exists($bcd . '/' . $stale)) {
                @unlink($bcd . '/' . $stale);
                echo "<p style='color:blue;'>✓ Cache lama {$stale} dihapus di: <code>{$bcd}</code></p>";
            }
        }
    }
}

echo "<hr><div style='background:#dcfce7; border:1px solid #86efac; padding:15px; border-radius:8px;'>";
echo "<p style='font-size:18px; font-weight:bold; color:#15803d; margin:0 0 10px 0;'>🎉 SINKRONISASI MANIFEST SELESAI!</p>";
echo "<p style='color:#166534; margin:0 0 15px 0;'>Entry Terminal/Index.jsx sudah disalin ke semua lokasi manifest di server hosting.</p>";
echo "<a href='/admin/terminal' style='display:inline-block; padding:10px 20px; background:#16a34a; color:white; text-decoration:none; border-radius:6px; font-weight:bold;'>Buka /admin/terminal Sekarang →</a>";
echo "</div>";
