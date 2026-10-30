<?php
/**
 * Auto-fix Storage Permissions & Missing Directories for Laravel
 */

header('Content-Type: text/html; charset=utf-8');

// Deteksi base path Laravel (bisa 1 tingkat di atas public atau di direktori saat ini)
$basePath = file_exists(__DIR__ . '/../storage') ? __DIR__ . '/..' : __DIR__;

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

echo "<h2>🔧 Memperbaiki Direktori Storage & Permissions Laravel...</h2>";
echo "<ul>";

foreach ($directories as $dir) {
    if (!is_dir($dir)) {
        if (@mkdir($dir, 0777, true)) {
            echo "<li style='color:green;'>✓ Direktori dibuat: <strong>" . htmlspecialchars($dir) . "</strong> (Permission 0777)</li>";
        } else {
            echo "<li style='color:red;'>✗ Gagal membuat: <strong>" . htmlspecialchars($dir) . "</strong></li>";
        }
    } else {
        @chmod($dir, 0777);
        echo "<li style='color:blue;'>✓ Direktori sudah ada, permission diubah ke 0777: <strong>" . htmlspecialchars($dir) . "</strong></li>";
    }
}

echo "</ul>";

// Buat file tes tulis di storage/framework/views
$testFile = $basePath . '/storage/framework/views/test_write.txt';
if (@file_put_contents($testFile, 'OK ' . date('Y-m-d H:i:s'))) {
    @unlink($testFile);
    echo "<p style='color:green; font-weight:bold; font-size:18px;'>🎉 SUKSES! Folder storage/framework/views sudah ada dan bisa ditulisi. Error tempnam() sudah beres!</p>";
    echo "<p><a href='/' style='padding:10px 20px; background:#059669; color:white; text-decoration:none; border-radius:5px;'>Kembali ke Beranda Web</a></p>";
} else {
    echo "<p style='color:red; font-weight:bold;'>⚠️ Folder belum bisa ditulisi oleh PHP. Silakan klik kanan folder storage di cPanel File Manager lalu ubah Permissions ke 777.</p>";
}
