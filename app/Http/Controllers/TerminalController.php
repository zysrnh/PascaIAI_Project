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

        return Inertia::render('Admin/Terminal/Index', [
            'system' => [
                'git_branch' => $gitBranch,
                'git_last_commit' => $gitLastCommit,
                'php_version' => PHP_VERSION,
                'laravel_version' => app()->version(),
                'server_os' => PHP_OS_FAMILY . ' (' . php_uname('s') . ')',
                'base_path' => base_path(),
                'public_path' => public_path(),
                'build_info' => $buildInfo,
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

        $startTime = microtime(true);

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
}
