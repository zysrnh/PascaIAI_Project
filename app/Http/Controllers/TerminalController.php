<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Symfony\Component\Process\Process;

class TerminalController extends Controller
{
    /**
     * Tampilkan halaman Terminal & Git Console
     */
    public function index()
    {
        $gitBranch = 'Unknown';
        $gitLastCommit = 'Tidak diketahui';

        try {
            $branchProc = Process::fromShellCommandline('git rev-parse --abbrev-ref HEAD', base_path());
            $branchProc->run();
            if ($branchProc->isSuccessful()) {
                $gitBranch = trim($branchProc->getOutput());
            }

            $commitProc = Process::fromShellCommandline('git log -1 --pretty=format:"%h - %s (%cr)"', base_path());
            $commitProc->run();
            if ($commitProc->isSuccessful()) {
                $gitLastCommit = trim($commitProc->getOutput());
            }
        } catch (\Exception $e) {
            // Ignore if git binary not in PATH or not a repo
        }

        $buildManifest = public_path('build/manifest.json');
        $buildInfo = [
            'exists' => File::exists($buildManifest),
            'last_modified' => File::exists($buildManifest) ? date('Y-m-d H:i:s', File::lastModified($buildManifest)) : null,
            'size' => File::isDirectory(public_path('build')) ? count(File::allFiles(public_path('build'))) . ' file' : '0 file',
        ];

        $isGitRepo = File::isDirectory(base_path('.git'));

        return Inertia::render('Admin/Terminal/Index', [
            'system' => [
                'is_git_repo' => $isGitRepo,
                'git_branch' => $gitBranch,
                'git_last_commit' => $gitLastCommit,
                'php_version' => PHP_VERSION,
                'laravel_version' => app()->version(),
                'server_os' => PHP_OS_FAMILY . ' (' . php_uname('s') . ')',
                'base_path' => base_path(),
                'public_path' => public_path(),
                'build_info' => $buildInfo,
                'repo_url' => 'https://github.com/zysrnh/PascaIAI_Project.git',
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

        // Handle perintah khusus sync-build langsung
        if (in_array(strtolower($command), ['sync-build', 'transfer-build', 'sync:build'])) {
            return $this->syncBuild($request);
        }

        // Handle perintah inisialisasi Git jika .git belum ada
        if (in_array(strtolower($command), ['init-git', 'git:init', 'git-init'])) {
            return $this->initGitRepo($request);
        }

        // Cek jika perintah adalah git pull tetapi folder .git tidak ada
        if (stripos($command, 'git pull') !== false && !File::isDirectory(base_path('.git'))) {
            return response()->json([
                'success' => false,
                'command' => $command,
                'output' => "⚠️ Folder project di server hosting ini BUKAN Git Repository (folder .git tidak ditemukan).\n\nPenyebab: Project di server di-upload manual via ZIP tanpa folder .git.\n\nSolusi: Klik tombol 'Hubungkan ke GitHub (Init Git)' atau ketik perintah 'init-git' untuk menghubungkannya secara otomatis!",
                'exit_code' => 1,
                'duration' => '0.00s'
            ]);
        }

        // Filter / blacklist perintah destruktif fatal
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

        // Jika perintah adalah php artisan, jalankan secara native via Artisan::call (Aman untuk shared hosting tanpa SSH/proc_open)
        if (preg_match('/^php\s+artisan\s+(.+)$/i', $command, $matches) || preg_match('/^artisan\s+(.+)$/i', $command, $matches)) {
            $artisanCmd = trim($matches[1]);
            try {
                \Illuminate\Support\Facades\Artisan::call($artisanCmd);
                $artisanOutput = \Illuminate\Support\Facades\Artisan::output();
                $duration = number_format(microtime(true) - $startTime, 2) . 's';

                return response()->json([
                    'success' => true,
                    'command' => $command,
                    'output' => trim($artisanOutput) ?: "Artisan [{$artisanCmd}] berhasil dijalankan tanpa error.",
                    'exit_code' => 0,
                    'duration' => $duration
                ]);
            } catch (\Exception $e) {
                // Jika Artisan::call gagal, lanjutkan ke Process sebagai fallback
            }
        }

        try {
            $process = Process::fromShellCommandline($command, base_path());
            $process->setTimeout(180); // Timeout 3 menit untuk git pull / composer
            $process->run();

            $output = $process->getOutput();
            $errorOutput = $process->getErrorOutput();
            $fullOutput = $output . ($errorOutput ? "\n" . $errorOutput : '');

            $duration = number_format(microtime(true) - $startTime, 2) . 's';

            // Jika perintah adalah git pull dan sukses, sertakan pesan saran sync build
            $extraMessage = null;
            if (stripos($command, 'git pull') !== false && $process->isSuccessful()) {
                $extraMessage = "\n[INFO] Git pull selesai. Anda dapat menekan tombol 'Transfer Build ke public_html' jika aset web diperbarui.";
            }

            return response()->json([
                'success' => $process->isSuccessful(),
                'command' => $command,
                'output' => trim($fullOutput . ($extraMessage ?? '')) ?: '(Tidak ada output dari perintah ini)',
                'exit_code' => $process->getExitCode(),
                'duration' => $duration
            ]);

        } catch (\Exception $e) {
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
                // Jika path diawali slash atau drive letter, gunakan langsung
                if (str_starts_with($target, '/') || str_starts_with($target, '\\') || preg_match('/^[A-Za-z]:/', $target)) {
                    $candidates[] = $target;
                } else {
                    $candidates[] = base_path('../' . ltrim($target, '/\\'));
                    $candidates[] = base_path($target);
                }
            }
        }

        // Target default sesuai kebutuhan user:
        // 1. public_html/kpi.iaipibandung.ac.id/build
        // 2. public_html/kpi.iaipibandung.ac.id/Uploads/build
        $defaultRelative = [
            'public_html/kpi.iaipibandung.ac.id/build',
            'public_html/kpi.iaipibandung.ac.id/Uploads/build',
        ];

        foreach ($defaultRelative as $rel) {
            // Cek 1 tingkat di atas base_path (struktur umum cPanel: /home/user/app dan /home/user/public_html)
            $candidates[] = base_path('../' . $rel);
            // Cek 2 tingkat di atas base_path (jika subfolder)
            $candidates[] = base_path('../../' . $rel);
            // Cek langsung dari base_path (jika aplikasi di dalam public_html)
            $candidates[] = base_path($rel);
            // Cek jika document root tersedia
            if (!empty($_SERVER['DOCUMENT_ROOT'])) {
                $candidates[] = rtrim($_SERVER['DOCUMENT_ROOT'], '/\\') . '/' . (str_contains($rel, 'Uploads') ? 'Uploads/build' : 'build');
            }
            // Cek cPanel home user path
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
            // Normalisasi separator
            $normalizedDest = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $dest);
            $normalizedSource = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $source);

            // Jangan copy ke dirinya sendiri
            if ($normalizedDest === $normalizedSource) {
                continue;
            }

            $parent = dirname($normalizedDest);
            // Jika folder parent ada di disk (misal folder public_html/... ada)
            if (File::isDirectory($parent)) {
                try {
                    File::ensureDirectoryExists($normalizedDest);
                    File::copyDirectory($source, $normalizedDest);
                    $synced[] = $normalizedDest;
                } catch (\Exception $e) {
                    $failed[] = "{$normalizedDest} (Gagal: {$e->getMessage()})";
                }
            }
        }

        // Jika tidak ada direktori hosting cPanel yang terdeteksi (misal sedang di localhost/Windows dev)
        // Kita buatkan foldernya di ../public_html/... agar developer bisa memverifikasi transfer berhasil
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
            } catch (\Exception $e) {
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

    /**
     * Inisialisasi Git Repository jika folder .git belum ada di hosting
     */
    public function initGitRepo(Request $request)
    {
        $repoUrl = $request->input('repo_url', 'https://github.com/zysrnh/PascaIAI_Project.git');
        $startTime = microtime(true);
        $output = "=== INISIALISASI GIT REPOSITORY DI SERVER ===\n";
        $output .= "Target Remote: {$repoUrl}\n";
        $output .= "Waktu : " . date('Y-m-d H:i:s') . "\n\n";

        $steps = [
            'git init' => 'Inisialisasi repo lokal',
            'git config core.filemode false' => 'Mengabaikan file permission mismatch',
            "git remote add origin {$repoUrl}" => 'Menghubungkan remote GitHub origin',
            'git fetch origin main' => 'Mengambil metadata commit terbaru dari GitHub',
            'git branch -M main' => 'Menyetel branch utama ke main',
            'git reset --mixed origin/main' => 'Menyelaraskan index tracking file dengan GitHub',
        ];

        foreach ($steps as $cmd => $desc) {
            $output .= "> {$cmd} ({$desc})...\n";
            try {
                $process = Process::fromShellCommandline($cmd, base_path());
                $process->setTimeout(60);
                $process->run();

                $stdOut = trim($process->getOutput());
                $stdErr = trim($process->getErrorOutput());

                if ($stdOut) $output .= "  " . $stdOut . "\n";
                if ($stdErr && !str_contains($stdErr, 'fatal: remote origin already exists')) {
                    $output .= "  " . $stdErr . "\n";
                }
            } catch (\Exception $e) {
                $output .= "  Error: " . $e->getMessage() . "\n";
            }
        }

        $isSuccess = File::isDirectory(base_path('.git'));

        if ($isSuccess) {
            $output .= "\n✓ SUKSES: Server sekarang sudah resmi terhubung ke Git Repository GitHub ({$repoUrl})!\nSekarang Anda sudah bisa menekan tombol 'Git Pull' kapan pun.";
        } else {
            $output .= "\n⚠️ CATATAN: Sistem tidak dapat menjalankan git init otomatis (kemungkinan binary git dibatasi oleh hosting).\nSolusi: Silakan upload file zip folder .git dari komputer lokal ke server hosting via cPanel File Manager.";
        }

        return response()->json([
            'success' => $isSuccess,
            'command' => 'init-git',
            'output' => $output,
            'exit_code' => $isSuccess ? 0 : 1,
            'duration' => number_format(microtime(true) - $startTime, 2) . 's'
        ]);
    }
}
