<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Symfony\Component\Process\Process;

class TerminalController extends Controller
{
    /**
     * URL repository GitHub target
     */
    protected $repoZipUrl = 'https://github.com/zysrnh/PascaIAI_Project/archive/refs/heads/main.zip';
    protected $repoCodeloadUrl = 'https://codeload.github.com/zysrnh/PascaIAI_Project/zip/refs/heads/main';
    protected $repoUrl = 'https://github.com/zysrnh/PascaIAI_Project.git';

    /**
     * Cek ketersediaan fungsi proc_open di hosting
     */
    protected function isProcOpenAvailable()
    {
        if (!function_exists('proc_open')) {
            return false;
        }
        $disabled = explode(',', ini_get('disable_functions') ?: '');
        $disabled = array_map('trim', $disabled);
        return !in_array('proc_open', $disabled);
    }

    /**
     * Tampilkan halaman Terminal & Git Console
     */
    public function index()
    {
        $hasProcOpen = $this->isProcOpenAvailable();
        $gitBranch = 'main (Pure PHP Auto-Sync)';
        $gitLastCommit = 'Tersinkronisasi dengan GitHub main';

        if ($hasProcOpen) {
            try {
                $branchProc = Process::fromShellCommandline('git rev-parse --abbrev-ref HEAD', base_path());
                $branchProc->run();
                if ($branchProc->isSuccessful() && trim($branchProc->getOutput())) {
                    $gitBranch = trim($branchProc->getOutput());
                }

                $commitProc = Process::fromShellCommandline('git log -1 --pretty=format:"%h - %s (%cr)"', base_path());
                $commitProc->run();
                if ($commitProc->isSuccessful() && trim($commitProc->getOutput())) {
                    $gitLastCommit = trim($commitProc->getOutput());
                }
            } catch (\Throwable $e) {
                // Abaikan jika git cli tidak tersedia
            }
        }

        $buildManifest = public_path('build/manifest.json');
        if (!File::exists($buildManifest)) {
            $buildManifest = base_path('build/manifest.json');
        }

        $buildInfo = [
            'exists' => File::exists($buildManifest),
            'last_modified' => File::exists($buildManifest) ? date('Y-m-d H:i:s', File::lastModified($buildManifest)) : null,
            'size' => File::isDirectory(public_path('build')) ? count(File::allFiles(public_path('build'))) . ' file' : (File::isDirectory(base_path('build')) ? count(File::allFiles(base_path('build'))) . ' file' : '0 file'),
        ];

        return Inertia::render('Admin/Terminal/Index', [
            'system' => [
                'is_git_repo' => File::isDirectory(base_path('.git')),
                'git_branch' => $gitBranch,
                'git_last_commit' => $gitLastCommit,
                'php_version' => PHP_VERSION,
                'laravel_version' => app()->version(),
                'server_os' => PHP_OS_FAMILY . ' (' . php_uname('s') . ')',
                'base_path' => base_path(),
                'public_path' => public_path(),
                'build_info' => $buildInfo,
                'repo_url' => $this->repoUrl,
                'has_proc_open' => $hasProcOpen,
                'sync_method' => 'Pure PHP GitHub Auto-Sync (1-Klik Full Pipeline)',
            ],
            'default_targets' => []
        ]);
    }

    /**
     * Eksekusi Perintah Terminal
     */
    public function execute(Request $request)
    {
        $request->validate([
            'command' => 'required|string|max:500'
        ]);

        $command = trim($request->input('command'));
        $startTime = microtime(true);
        $lowerCmd = strtolower($command);

        try {
            // 1. Handle perintah khusus sync-build langsung
            if (in_array($lowerCmd, ['sync-build', 'transfer-build', 'sync:build'])) {
                return $this->syncBuild($request);
            }

            // 2. Handle perintah Git Pull / Auto-Sync via Pure PHP HTTP (Pipeline 1-Klik)
            if (
                str_contains($lowerCmd, 'git pull') ||
                str_contains($lowerCmd, 'pull') ||
                str_contains($lowerCmd, 'init-git') ||
                str_contains($lowerCmd, 'auto-sync') ||
                str_contains($lowerCmd, 'deploy') ||
                str_contains($lowerCmd, 'update')
            ) {
                return $this->pullViaHttp($request);
            }

            // 3. Handle git status
            if ($lowerCmd === 'git status') {
                $output = "=== STATUS SISTEM & DEPLOYMENT ===\n";
                $output .= "Metode Deployment : Pure PHP GitHub Auto-Sync (1-Klik Pipeline)\n";
                $output .= "Repository Remote : {$this->repoUrl} (branch: main)\n";
                $output .= "proc_open Hosting : " . ($this->isProcOpenAvailable() ? 'Aktif' : 'Nonaktif (Kebal via HTTP Sync)') . "\n";
                $output .= "Asset Build       : " . (File::exists(public_path('build/manifest.json')) || File::exists(base_path('build/manifest.json')) ? 'Tersedia' : 'Belum dibangun') . "\n";
                $output .= "Status            : Siap menerima pembaruan kapan pun dengan menekan tombol 'Auto-Sync dari GitHub'.\n";

                return response()->json([
                    'success' => true,
                    'command' => $command,
                    'output' => $output,
                    'exit_code' => 0,
                    'duration' => number_format(microtime(true) - $startTime, 2) . 's'
                ]);
            }

            // 3.5 Handle Perintah Auto-Fix Permasalahan Container & Storage (fix / repair)
            if (in_array($lowerCmd, ['fix', 'repair', 'fix-storage', 'fix-view', 'fix-cache'])) {
                $bCache = base_path('bootstrap/cache');
                if (is_dir($bCache)) {
                    foreach (glob($bCache . '/*.php') as $cf) {
                        @unlink($cf);
                    }
                    @chmod($bCache, 0777);
                }
                $vDir = base_path('storage/framework/views');
                if (!is_dir($vDir)) {
                    @mkdir($vDir, 0777, true);
                }
                @chmod($vDir, 0777);
                foreach (glob($vDir . '/*.php') as $vf) {
                    @unlink($vf);
                }
                try {
                    Artisan::call('optimize:clear');
                } catch (\Throwable) {}

                return response()->json([
                    'success' => true,
                    'command' => $command,
                    'output' => "✅ PEMULIHAN SISTEM BERHASIL!\n• Seluruh file cache bootstrap (config, services, routes) dibersihkan.\n• Folder storage/framework/views & bootstrap/cache diset 0777 (Writable).\n• Cache view Blade lama telah dibersihkan.\n\nSitus siap dibuka kembali normal tanpa error 500.",
                    'exit_code' => 0,
                    'duration' => number_format(microtime(true) - $startTime, 2) . 's'
                ]);
            }

            // 4. Handle Artisan Command secara native in-memory PHP (aman dari proc_open)
            if (preg_match('/^php\s+artisan\s+(.+)$/i', $command, $matches) || preg_match('/^artisan\s+(.+)$/i', $command, $matches)) {
                $artisanCmd = trim($matches[1]);
                try {
                    if (str_starts_with($artisanCmd, 'sync:build')) {
                        return $this->syncBuild($request);
                    }

                    Artisan::call($artisanCmd);
                    $artisanOutput = Artisan::output();

                    // Jika menjalankan clear cache / config, bersihkan juga file fisiknya
                    if (str_contains($artisanCmd, 'clear')) {
                        @unlink(base_path('bootstrap/cache/config.php'));
                        if (str_contains($artisanCmd, 'optimize') || str_contains($artisanCmd, 'compiled')) {
                            foreach (glob(base_path('bootstrap/cache/*.php')) as $cf) {
                                @unlink($cf);
                            }
                        }
                    }

                    $duration = number_format(microtime(true) - $startTime, 2) . 's';

                    return response()->json([
                        'success' => true,
                        'command' => $command,
                        'output' => trim($artisanOutput) ?: "Artisan [{$artisanCmd}] berhasil dijalankan tanpa error.",
                        'exit_code' => 0,
                        'duration' => $duration
                    ]);
                } catch (\Throwable $e) {
                    return response()->json([
                        'success' => false,
                        'command' => $command,
                        'output' => "Error saat menjalankan artisan [{$artisanCmd}]: " . $e->getMessage(),
                        'exit_code' => 1,
                        'duration' => number_format(microtime(true) - $startTime, 2) . 's'
                    ]);
                }
            }

            // 5. Filter blacklist perintah destruktif fatal
            $blacklisted = [
                'rm -rf /',
                'rmdir /s /q c:',
                'mkfs',
                'dd if=',
                ':(){ :|:& };:',
                'shutdown',
                'reboot',
                'drop database',
            ];

            foreach ($blacklisted as $b) {
                if (stripos($command, $b) !== false) {
                    return response()->json([
                        'success' => false,
                        'command' => $command,
                        'output' => "Akses Ditolak: Perintah terindikasi destruktif ({$b}).",
                        'exit_code' => 1,
                        'duration' => '0.00s'
                    ]);
                }
            }

            // 6. Jika proc_open tidak tersedia dan perintah shell lain dijalankan
            if (!$this->isProcOpenAvailable()) {
                return response()->json([
                    'success' => false,
                    'command' => $command,
                    'output' => "⚠️ Hosting cPanel menonaktifkan proc_open di php.ini.\n" .
                                "Perintah shell OS umum dibatasi oleh server hosting.\n\n" .
                                "Fitur yang tetap bekerja 100% menggunakan PHP Native:\n" .
                                "• Update Kode GitHub : Ketik 'git pull' atau klik tombol 'Auto-Sync dari GitHub'\n" .
                                "• Transfer Asset Build: Ketik 'sync:build' atau klik tombol 'Sync Build Assets'\n" .
                                "• Perintah Artisan     : Ketik 'php artisan optimize:clear', 'php artisan migrate', dll.",
                    'exit_code' => 1,
                    'duration' => '0.00s'
                ]);
            }

            // 7. Jika proc_open aktif, jalankan lewat Symfony Process
            $process = Process::fromShellCommandline($command, base_path());
            $process->setTimeout(180);
            $process->run();

            $output = $process->getOutput();
            $errorOutput = $process->getErrorOutput();
            $fullOutput = $output . ($errorOutput ? "\n" . $errorOutput : '');
            $duration = number_format(microtime(true) - $startTime, 2) . 's';

            return response()->json([
                'success' => $process->isSuccessful(),
                'command' => $command,
                'output' => trim($fullOutput) ?: '(Tidak ada output dari perintah ini)',
                'exit_code' => $process->getExitCode(),
                'duration' => $duration
            ]);

        } catch (\Throwable $e) {
            $duration = number_format(microtime(true) - $startTime, 2) . 's';
            return response()->json([
                'success' => false,
                'command' => $command,
                'output' => 'Terjadi kesalahan eksekusi: ' . $e->getMessage() . "\nLokasi: " . $e->getFile() . ':' . $e->getLine(),
                'exit_code' => 1,
                'duration' => $duration
            ]);
        }
    }

    /**
     * Cari direktori sementara yang aman dan bisa ditulis
     */
    protected function getSafeTempZipPath()
    {
        $candidates = [
            storage_path('app'),
            storage_path('framework/cache'),
            storage_path(),
            sys_get_temp_dir(),
            base_path('storage/app'),
            base_path('storage'),
        ];

        foreach ($candidates as $dir) {
            try {
                if (!is_dir($dir)) {
                    @mkdir($dir, 0777, true);
                }
                if (is_dir($dir) && is_writable($dir)) {
                    return $dir . DIRECTORY_SEPARATOR . 'github_main_update.zip';
                }
            } catch (\Throwable $e) {
                // Coba candidate berikutnya
            }
        }

        return storage_path('github_main_update.zip');
    }

    /**
     * Pure PHP GitHub Auto-Sync:
     * Mengunduh ZIP repository dari GitHub via HTTP/cURL dan mengekstraknya secara native PHP
     * tanpa butuh Git CLI, SSH, atau proc_open.
     * Otomatis melanjutkan ke: migrate --force, sync:build, dan optimize:clear.
     */
    public function pullViaHttp(Request $request = null)
    {
        // Tingkatkan limit waktu dan memori untuk operasi sync
        @ini_set('max_execution_time', '300');
        @set_time_limit(300);
        @ini_set('memory_limit', '512M');

        $startTime = microtime(true);
        $log = "=================================================\n";
        $log .= " 🚀 PURE PHP GITHUB AUTO-SYNC & DEPLOYMENT\n";
        $log .= "=================================================\n";
        $log .= "Target Remote : {$this->repoUrl} (branch: main)\n";
        $log .= "Waktu         : " . date('Y-m-d H:i:s') . "\n";
        $log .= "Metode        : Native HTTP Streaming & Safe Overwrite\n\n";

        try {
            $tempZipPath = $this->getSafeTempZipPath();
            @unlink($tempZipPath);

            // 1. Download berkas ZIP dari GitHub langsung streaming ke file (hemat RAM)
            $log .= "> [1/4] Mengunduh arsip kode terbaru dari GitHub...\n";
            $downloadSuccess = false;
            $downloadError = '';

            // Prioritas 1: cURL streaming langsung ke file
            if (function_exists('curl_init')) {
                $fp = @fopen($tempZipPath, 'w+b');
                if ($fp) {
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, $this->repoCodeloadUrl);
                    curl_setopt($ch, CURLOPT_FILE, $fp);
                    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
                    curl_setopt($ch, CURLOPT_AUTOREFERER, true);
                    curl_setopt($ch, CURLOPT_TIMEOUT, 180);
                    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 20);
                    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
                    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
                    curl_setopt($ch, CURLOPT_HTTPHEADER, [
                        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                        'Connection: close',
                        'Accept: application/zip, application/octet-stream, */*'
                    ]);

                    curl_exec($ch);
                    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                    $curlError = curl_error($ch);
                    curl_close($ch);
                    fclose($fp);

                    $fileSize = file_exists($tempZipPath) ? filesize($tempZipPath) : 0;
                    if ($httpCode >= 200 && $httpCode < 400 && $fileSize > 10000) {
                        $downloadSuccess = true;
                        $sizeMb = number_format($fileSize / 1048576, 2);
                        $log .= "  ✅ Berhasil mengunduh arsip ZIP ({$sizeMb} MB) via cURL (HTTP {$httpCode}).\n";
                    } else {
                        $downloadError = "cURL (HTTP {$httpCode}, size: {$fileSize}B): " . ($curlError ?: 'Respons bukan ZIP yang valid');
                        @unlink($tempZipPath);
                    }
                } else {
                    $downloadError = "Gagal membuat file penampung sementara di {$tempZipPath}";
                }
            }

            // Prioritas 2: Fallback ke file_get_contents stream jika cURL gagal
            if (!$downloadSuccess) {
                $context = stream_context_create([
                    'http' => [
                        'timeout' => 180,
                        'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                        'follow_location' => 1,
                        'header' => "Connection: close\r\nAccept: application/zip, */*\r\n"
                    ],
                    'ssl' => [
                        'verify_peer' => false,
                        'verify_peer_name' => false
                    ]
                ]);

                $srcFp = @fopen($this->repoZipUrl, 'rb', false, $context);
                if ($srcFp) {
                    $dstFp = @fopen($tempZipPath, 'wb');
                    if ($dstFp) {
                        stream_copy_to_stream($srcFp, $dstFp);
                        fclose($dstFp);
                    }
                    fclose($srcFp);

                    $fileSize = file_exists($tempZipPath) ? filesize($tempZipPath) : 0;
                    if ($fileSize > 10000) {
                        $downloadSuccess = true;
                        $sizeMb = number_format($fileSize / 1048576, 2);
                        $log .= "  ✅ Berhasil mengunduh arsip ZIP ({$sizeMb} MB) via stream_context fallback.\n";
                    }
                }
            }

            if (!$downloadSuccess || !file_exists($tempZipPath) || filesize($tempZipPath) < 1000) {
                $log .= "  ❌ GAGAL mengunduh arsip dari GitHub: {$downloadError}\n";
                $log .= "  💡 Solusi: Pastikan hosting mengizinkan koneksi HTTPS keluar (outgoing port 443).\n";

                return response()->json([
                    'success' => false,
                    'command' => 'git pull (pure-php)',
                    'output' => $log,
                    'exit_code' => 1,
                    'duration' => number_format(microtime(true) - $startTime, 2) . 's'
                ]);
            }

            // 2. Ekstrak Berkas Menggunakan ZipArchive Native PHP
            $log .= "\n> [2/4] Mengekstrak dan menyalin berkas ke folder proyek...\n";

            if (!class_exists('ZipArchive')) {
                $log .= "  ❌ Ekstensi PHP ZipArchive tidak aktif di server hosting ini!\n";
                @unlink($tempZipPath);
                return response()->json([
                    'success' => false,
                    'command' => 'git pull (pure-php)',
                    'output' => $log,
                    'exit_code' => 1,
                    'duration' => number_format(microtime(true) - $startTime, 2) . 's'
                ]);
            }

            $zip = new \ZipArchive();
            $res = $zip->open($tempZipPath);
            if ($res !== true) {
                $log .= "  ❌ Berkas ZIP tidak valid atau corrupt (Kode ZipArchive: {$res}).\n";
                @unlink($tempZipPath);
                return response()->json([
                    'success' => false,
                    'command' => 'git pull (pure-php)',
                    'output' => $log,
                    'exit_code' => 1,
                    'duration' => number_format(microtime(true) - $startTime, 2) . 's'
                ]);
            }

            $totalEntries = $zip->numFiles;
            $updatedFiles = 0;
            $skippedProtected = 0;
            $base = base_path();

            for ($i = 0; $i < $totalEntries; $i++) {
                $entryName = $zip->getNameIndex($i);

                // Buang nama root folder zip (misal: PascaIAI_Project-main/...)
                $relPath = preg_replace('#^[^/]+/#', '', $entryName);

                if (empty($relPath)) {
                    continue;
                }

                $targetPath = $base . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $relPath);

                if (str_ends_with($entryName, '/')) {
                    File::ensureDirectoryExists($targetPath);
                    continue;
                }

                // ATURAN PROTEKSI AMAN (Safe Overwrite):
                // 1. File .env TIDAK PERNAH DITIMPA
                if (basename($relPath) === '.env' || str_starts_with($relPath, '.env.')) {
                    $skippedProtected++;
                    continue;
                }

                // 2. Folder storage/ TIDAK PERNAH DITIMPA
                if (str_starts_with($relPath, 'storage/') || str_starts_with($relPath, 'storage\\')) {
                    $skippedProtected++;
                    continue;
                }

                // 3. Folder .git/ dilewati
                if (str_starts_with($relPath, '.git/') || str_starts_with($relPath, '.git\\')) {
                    continue;
                }

                $stream = $zip->getStream($entryName);
                if ($stream) {
                    File::ensureDirectoryExists(dirname($targetPath));
                    $fp = @fopen($targetPath, 'wb');
                    if ($fp) {
                        stream_copy_to_stream($stream, $fp);
                        fclose($fp);
                        $updatedFiles++;
                    }
                    fclose($stream);
                }
            }

            $zip->close();
            @unlink($tempZipPath);

            $log .= "  ✅ {$updatedFiles} berkas proyek berhasil diperbarui.\n";
            $log .= "  ✅ {$skippedProtected} berkas diproteksi (file .env & folder storage/ tetap aman).\n";

            // 3. Jalankan Siklus Pasca-Deploy: Migrasi Database & Sync Build
            $log .= "\n> [3/4] Menjalankan siklus pasca-deploy (Migrate & Sync Build)...\n";

            try {
                Artisan::call('migrate', ['--force' => true]);
                $migOutput = trim(Artisan::output());
                $log .= "  ✅ Database Migration: " . ($migOutput ?: 'Tidak ada migrasi pending.') . "\n";
            } catch (\Throwable $e) {
                $log .= "  ⚠️ Database Migration: " . $e->getMessage() . "\n";
            }

            try {
                Artisan::call('sync:build');
                $syncOut = trim(Artisan::output());
                $log .= "  ✅ Sync Build & Images:\n" . ($syncOut ?: 'Aset build telah disinkronkan.') . "\n";
            } catch (\Throwable $e) {
                $log .= "  ⚠️ Sync Build: " . $e->getMessage() . "\n";
            }

            // 4. Bersihkan Cache Laravel & Pulihkan Direktori
            $log .= "\n> [4/4] Membersihkan cache sistem & memulihkan direktori...\n";
            try {
                Artisan::call('optimize:clear');
                $log .= "  ✅ optimize:clear berhasil dijalankan.\n";
            } catch (\Throwable $e) {
                // Abaikan jika artisan melempar notice
            }

            // Hapus seluruh file cache bootstrap agar Laravel membaca fresh providers
            $bCache = base_path('bootstrap/cache');
            if (is_dir($bCache)) {
                foreach (glob($bCache . '/*.php') as $cf) {
                    @unlink($cf);
                }
                @chmod($bCache, 0777);
            }

            // Pastikan folder storage view ada dan berizin 0777
            $vDir = base_path('storage/framework/views');
            if (!is_dir($vDir)) {
                @mkdir($vDir, 0777, true);
            }
            @chmod($vDir, 0777);
            foreach (glob($vDir . '/*.php') as $vf) {
                @unlink($vf);
            }

            $log .= "  ✅ Seluruh cache bootstrap & view dibersihkan.\n";
            $log .= "  ✅ Folder storage/framework/views & bootstrap/cache diset 0777 (Writable).\n";

            $duration = number_format(microtime(true) - $startTime, 2) . 's';
            $log .= "\n=================================================\n";
            $log .= "🎉 SELESAI: Aplikasi & Asset Build berhasil di-update dari GitHub dalam {$duration}!\n";
            $log .= "=================================================\n";

            return response()->json([
                'success' => true,
                'command' => 'git pull (pure-php)',
                'output' => $log,
                'exit_code' => 0,
                'duration' => $duration
            ]);

        } catch (\Throwable $e) {
            $duration = number_format(microtime(true) - $startTime, 2) . 's';
            $log .= "\n[CRITICAL ERROR] Terjadi kendala saat update: " . $e->getMessage() . "\n";
            $log .= "File: " . $e->getFile() . ':' . $e->getLine() . "\n";

            return response()->json([
                'success' => false,
                'command' => 'git pull (pure-php)',
                'output' => $log,
                'exit_code' => 1,
                'duration' => $duration
            ]);
        }
    }

    /**
     * Transfer / Sync folder build & images via Artisan sync:build
     */
    public function syncBuild(Request $request = null)
    {
        $startTime = microtime(true);
        try {
            Artisan::call('sync:build');
            $output = trim(Artisan::output());

            return response()->json([
                'success' => true,
                'command' => 'sync:build',
                'output' => $output ?: 'Aset build berhasil disinkronkan ke seluruh folder publik.',
                'exit_code' => 0,
                'duration' => number_format(microtime(true) - $startTime, 2) . 's'
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'command' => 'sync:build',
                'output' => 'Gagal menjalankan sync:build: ' . $e->getMessage(),
                'exit_code' => 1,
                'duration' => number_format(microtime(true) - $startTime, 2) . 's'
            ]);
        }
    }
}
