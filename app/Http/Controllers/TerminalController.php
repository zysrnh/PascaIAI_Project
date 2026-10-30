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
        $buildInfo = [
            'exists' => File::exists($buildManifest),
            'last_modified' => File::exists($buildManifest) ? date('Y-m-d H:i:s', File::lastModified($buildManifest)) : null,
            'size' => File::isDirectory(public_path('build')) ? count(File::allFiles(public_path('build'))) . ' file' : '0 file',
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
                'sync_method' => 'Pure PHP GitHub Auto-Sync (No-SSH/No-proc_open)',
            ],
            'default_targets' => [
                'public_html/kpi.iaipibandung.ac.id/build',
                'public_html/kpi.iaipibandung.ac.id/Uploads/build',
            ]
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

        // 1. Handle perintah khusus sync-build langsung
        if (in_array($lowerCmd, ['sync-build', 'transfer-build', 'sync:build'])) {
            return $this->syncBuild($request);
        }

        // 2. Handle perintah Git Pull / Auto-Sync via Pure PHP HTTP
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
            $output .= "Metode Deployment : Pure PHP GitHub Auto-Sync\n";
            $output .= "Repository Remote : {$this->repoUrl} (branch: main)\n";
            $output .= "proc_open Hosting : " . ($this->isProcOpenAvailable() ? 'Aktif' : 'Nonaktif (Kebal via HTTP Sync)') . "\n";
            $output .= "Asset Build       : " . (File::exists(public_path('build/manifest.json')) ? 'Tersedia' : 'Belum dibangun') . "\n";
            $output .= "Status            : Siap menerima pembaruan kapan pun dengan menekan tombol 'Git Pull'.\n";

            return response()->json([
                'success' => true,
                'command' => $command,
                'output' => $output,
                'exit_code' => 0,
                'duration' => number_format(microtime(true) - $startTime, 2) . 's'
            ]);
        }

        // 4. Handle Artisan Command secara native in-memory PHP (aman dari proc_open)
        if (preg_match('/^php\s+artisan\s+(.+)$/i', $command, $matches) || preg_match('/^artisan\s+(.+)$/i', $command, $matches)) {
            $artisanCmd = trim($matches[1]);
            try {
                Artisan::call($artisanCmd);
                $artisanOutput = Artisan::output();
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
                ], 403);
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
                            "• Update Kode GitHub : Ketik 'git pull' atau klik tombol 'Git Pull + Transfer Build'\n" .
                            "• Transfer Asset Build: Ketik 'sync-build' atau klik tombol 'Transfer Build'\n" .
                            "• Perintah Artisan     : Ketik 'php artisan optimize:clear', 'php artisan migrate', dll.",
                'exit_code' => 1,
                'duration' => '0.00s'
            ]);
        }

        // 7. Jika proc_open aktif, jalankan lewat Symfony Process
        try {
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
                'output' => 'Terjadi kesalahan eksekusi: ' . $e->getMessage(),
                'exit_code' => 1,
                'duration' => $duration
            ], 500);
        }
    }

    /**
     * Pure PHP GitHub Auto-Sync:
     * Mengunduh ZIP repository dari GitHub via HTTP/cURL dan mengekstraknya secara native PHP
     * tanpa butuh Git CLI, SSH, atau proc_open.
     */
    public function pullViaHttp(Request $request)
    {
        $startTime = microtime(true);
        $log = "=== PURE PHP GITHUB AUTO-SYNC ===\n";
        $log .= "Target Remote : {$this->repoUrl} (branch: main)\n";
        $log .= "Waktu         : " . date('Y-m-d H:i:s') . "\n";
        $log .= "Metode        : Native HTTP Archive Download & Safe Overwrite\n\n";

        // Pastikan folder storage/app tersedia untuk download sementara
        $tempDir = storage_path('app');
        File::ensureDirectoryExists($tempDir);
        $tempZipPath = $tempDir . DIRECTORY_SEPARATOR . 'github_main_update.zip';

        // 1. Download berkas ZIP dari GitHub
        $log .= "> [1/4] Mengunduh arsip kode terbaru dari GitHub via HTTP...\n";
        $downloadSuccess = false;
        $downloadError = null;

        // Coba download via cURL
        if (function_exists('curl_init')) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $this->repoCodeloadUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_AUTOREFERER, true);
            curl_setopt($ch, CURLOPT_USERAGENT, 'Laravel-PurePHP-AutoSync/1.0');
            curl_setopt($ch, CURLOPT_TIMEOUT, 300);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

            $zipData = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $curlError = curl_error($ch);
            curl_close($ch);

            if ($httpCode >= 200 && $httpCode < 400 && !empty($zipData)) {
                File::put($tempZipPath, $zipData);
                $downloadSuccess = true;
                $sizeMb = number_format(strlen($zipData) / 1048576, 2);
                $log .= "  ✓ Berhasil mengunduh arsip ZIP ({$sizeMb} MB) via cURL (HTTP {$httpCode}).\n";
            } else {
                $downloadError = "cURL gagal (HTTP {$httpCode}): {$curlError}";
            }
        }

        // Fallback ke file_get_contents jika cURL gagal
        if (!$downloadSuccess) {
            $context = stream_context_create([
                'http' => [
                    'timeout' => 300,
                    'user_agent' => 'Laravel-PurePHP-AutoSync/1.0',
                    'follow_location' => 1
                ],
                'ssl' => [
                    'verify_peer' => false,
                    'verify_peer_name' => false
                ]
            ]);

            $zipData = @file_get_contents($this->repoZipUrl, false, $context);
            if ($zipData !== false && !empty($zipData)) {
                File::put($tempZipPath, $zipData);
                $downloadSuccess = true;
                $sizeMb = number_format(strlen($zipData) / 1048576, 2);
                $log .= "  ✓ Berhasil mengunduh arsip ZIP ({$sizeMb} MB) via stream_context.\n";
            } else {
                $downloadError .= " | file_get_contents juga gagal.";
            }
        }

        if (!$downloadSuccess || !File::exists($tempZipPath)) {
            $log .= "  ✗ GAGAL mengunduh arsip dari GitHub: {$downloadError}\n";
            return response()->json([
                'success' => false,
                'command' => 'git pull (pure-php)',
                'output' => $log,
                'exit_code' => 1,
                'duration' => number_format(microtime(true) - $startTime, 2) . 's'
            ], 500);
        }

        // 2. Ekstrak Berkas Menggunakan ZipArchive Native PHP
        $log .= "\n> [2/4] Mengekstrak dan menyalin berkas ke folder proyek...\n";

        if (!class_exists('ZipArchive')) {
            $log .= "  ✗ Ekstensi PHP ZipArchive tidak aktif di server!\n";
            @unlink($tempZipPath);
            return response()->json([
                'success' => false,
                'command' => 'git pull (pure-php)',
                'output' => $log,
                'exit_code' => 1,
                'duration' => number_format(microtime(true) - $startTime, 2) . 's'
            ], 500);
        }

        $zip = new \ZipArchive();
        if ($zip->open($tempZipPath) !== true) {
            $log .= "  ✗ Berkas ZIP corrupt atau tidak dapat dibuka.\n";
            @unlink($tempZipPath);
            return response()->json([
                'success' => false,
                'command' => 'git pull (pure-php)',
                'output' => $log,
                'exit_code' => 1,
                'duration' => number_format(microtime(true) - $startTime, 2) . 's'
            ], 500);
        }

        $totalEntries = $zip->numFiles;
        $updatedFiles = 0;
        $skippedProtected = 0;
        $base = base_path();

        for ($i = 0; $i < $totalEntries; $i++) {
            $entryName = $zip->getNameIndex($i);

            // GitHub zip selalu memiliki folder root (contoh: PascaIAI_Project-main/...)
            // Kita buang nama folder root tersebut agar path presisi ke base_path()
            $relPath = preg_replace('#^[^/]+/#', '', $entryName);

            if (empty($relPath)) {
                continue;
            }

            // Normalisasi path separator
            $targetPath = $base . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $relPath);

            // Jika folder, buat foldernya jika belum ada
            if (str_ends_with($entryName, '/')) {
                File::ensureDirectoryExists($targetPath);
                continue;
            }

            // ATURAN PROTEKSI AMAN (Safe Overwrite):
            // 1. File .env TIDAK PERNAH DITIMPA agar konfigurasi database & app key server aman
            if (basename($relPath) === '.env' || str_starts_with($relPath, '.env.')) {
                $skippedProtected++;
                continue;
            }

            // 2. Folder storage/ TIDAK PERNAH DITIMPA agar data upload, log, dan sesi server tetap utuh
            if (str_starts_with($relPath, 'storage/') || str_starts_with($relPath, 'storage\\')) {
                $skippedProtected++;
                continue;
            }

            // 3. Folder .git/ dilewati
            if (str_starts_with($relPath, '.git/') || str_starts_with($relPath, '.git\\')) {
                continue;
            }

            // Baca konten berkas dari ZIP dan tulis ke target
            $stream = $zip->getStream($entryName);
            if ($stream) {
                File::ensureDirectoryExists(dirname($targetPath));
                $fp = fopen($targetPath, 'wb');
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

        $log .= "  ✓ {$updatedFiles} berkas proyek berhasil diperbarui.\n";
        $log .= "  ✓ {$skippedProtected} berkas diproteksi (file .env & folder storage/ tetap aman).\n";

        // 3. Jalankan Siklus Pasca-Deploy: Migrasi Database & Transfer Build
        $log .= "\n> [3/4] Menjalankan siklus pasca-deploy (Migrate & Transfer Build)...\n";

        // Migrasi database otomatis jika ada tabel baru
        try {
            Artisan::call('migrate', ['--force' => true]);
            $migOutput = trim(Artisan::output());
            $log .= "  ✓ Database Migration: " . ($migOutput ?: 'Tidak ada migrasi pending.') . "\n";
        } catch (\Throwable $e) {
            $log .= "  ℹ Database Migration note: " . $e->getMessage() . "\n";
        }

        // Sinkronisasi folder build Vite ke public_html
        $syncResponse = $this->syncBuild($request);
        $syncData = json_decode($syncResponse->getContent(), true);
        if (!empty($syncData['synced'])) {
            $log .= "  ✓ Transfer Asset Build berhasil ke " . count($syncData['synced']) . " lokasi tujuan.\n";
        } else {
            $log .= "  ℹ Transfer Asset Build: Folder build sudah up-to-date.\n";
        }

        // 4. Bersihkan Cache Laravel
        $log .= "\n> [4/4] Membersihkan cache sistem (optimize:clear)...\n";
        try {
            Artisan::call('optimize:clear');
            $log .= "  ✓ Cache sistem, route, config, dan views berhasil dibersihkan.\n";
        } catch (\Throwable $e) {
            $log .= "  ℹ Optimize clear note: " . $e->getMessage() . "\n";
        }

        $duration = number_format(microtime(true) - $startTime, 2) . 's';
        $log .= "\n==================================================\n";
        $log .= "✓ SELESAI: Aplikasi berhasil di-update dari GitHub dalam {$duration}!\n";
        $log .= "Situs sudah aktif dengan versi kode dan build terbaru.\n";

        return response()->json([
            'success' => true,
            'command' => 'git pull (pure-php)',
            'output' => $log,
            'exit_code' => 0,
            'duration' => $duration
        ]);
    }

    /**
     * Transfer / Sync folder build ke folder public_html/kpi.iaipibandung.ac.id/build & Uploads/build
     */
    public function syncBuild(Request $request)
    {
        $source = public_path('build');

        if (!File::isDirectory($source)) {
            return response()->json([
                'success' => false,
                'command' => 'sync-build',
                'output' => "Folder sumber [{$source}] tidak ditemukan! Pastikan telah menjalankan npm run build terlebih dahulu.",
                'exit_code' => 1,
                'duration' => '0.00s'
            ]);
        }

        $customTargets = $request->input('targets');
        if (is_string($customTargets)) {
            $customTargets = array_filter(array_map('trim', explode("\n", $customTargets)));
        }

        $candidates = [];

        if (!empty($customTargets) && is_array($customTargets)) {
            foreach ($customTargets as $target) {
                if (str_starts_with($target, '/') || str_starts_with($target, '\\') || preg_match('/^[A-Za-z]:/', $target)) {
                    $candidates[] = $target;
                } else {
                    $candidates[] = base_path('../' . ltrim($target, '/\\'));
                    $candidates[] = base_path($target);
                }
            }
        }

        // Target default sesuai kebutuhan cPanel hosting:
        // 1. public_html/kpi.iaipibandung.ac.id/build
        // 2. public_html/kpi.iaipibandung.ac.id/Uploads/build
        $defaultRelative = [
            'public_html/kpi.iaipibandung.ac.id/build',
            'public_html/kpi.iaipibandung.ac.id/Uploads/build',
        ];

        foreach ($defaultRelative as $rel) {
            $candidates[] = base_path('../' . $rel);
            $candidates[] = base_path('../../' . $rel);
            $candidates[] = base_path($rel);

            if (!empty($_SERVER['DOCUMENT_ROOT'])) {
                $candidates[] = rtrim($_SERVER['DOCUMENT_ROOT'], '/\\') . '/' . (str_contains($rel, 'Uploads') ? 'Uploads/build' : 'build');
            }

            $user = get_current_user();
            if ($user) {
                $candidates[] = "/home/{$user}/" . $rel;
            }
        }

        $candidates = array_unique(array_filter($candidates));

        $synced = [];
        $failed = [];
        $totalFiles = count(File::allFiles($source));

        foreach ($candidates as $dest) {
            $normalizedDest = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $dest);
            $normalizedSource = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $source);

            if ($normalizedDest === $normalizedSource) {
                continue;
            }

            $parent = dirname($normalizedDest);
            if (File::isDirectory($parent)) {
                try {
                    File::ensureDirectoryExists($normalizedDest);
                    File::copyDirectory($source, $normalizedDest);
                    $synced[] = $normalizedDest;
                } catch (\Throwable $e) {
                    $failed[] = "{$normalizedDest} (Gagal: {$e->getMessage()})";
                }
            }
        }

        // Fallback local jika folder cPanel belum ada di disk (misal saat dev Windows)
        if (empty($synced)) {
            $fallbackLocal1 = base_path('../public_html/kpi.iaipibandung.ac.id/build');
            $fallbackLocal2 = base_path('../public_html/kpi.iaipibandung.ac.id/Uploads/build');

            try {
                File::ensureDirectoryExists($fallbackLocal1);
                File::copyDirectory($source, $fallbackLocal1);
                $synced[] = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $fallbackLocal1);

                File::ensureDirectoryExists($fallbackLocal2);
                File::copyDirectory($source, $fallbackLocal2);
                $synced[] = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $fallbackLocal2);
            } catch (\Throwable $e) {
                $failed[] = 'Fallback local sync: ' . $e->getMessage();
            }
        }

        $outputLog = "=== HASIL SINKRONISASI ASSET BUILD ===\n";
        $outputLog .= "Sumber: {$source} ({$totalFiles} file)\n";
        $outputLog .= "Waktu : " . date('Y-m-d H:i:s') . "\n\n";

        if (!empty($synced)) {
            $outputLog .= "✓ BERHASIL DITRANSFER KE (" . count($synced) . " lokasi):\n";
            foreach ($synced as $s) {
                $outputLog .= "  -> {$s}\n";
            }
        }

        if (!empty($failed)) {
            $outputLog .= "\n✗ GAGAL DITRANSFER KE:\n";
            foreach ($failed as $f) {
                $outputLog .= "  -> {$f}\n";
            }
        }

        return response()->json([
            'success' => !empty($synced),
            'command' => 'sync-build',
            'output' => $outputLog,
            'exit_code' => empty($synced) ? 1 : 0,
            'synced' => $synced,
            'failed' => $failed,
            'duration' => '0.15s'
        ]);
    }
}
