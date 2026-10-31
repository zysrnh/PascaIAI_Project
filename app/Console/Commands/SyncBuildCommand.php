<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class SyncBuildCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sync:build';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Otomatis salin aset public/build dan public/images langsung ke samping index.php di cPanel';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        // 1. Bersihkan folder public_html nyasar jika sempat terbuat di dalam root project
        $accidentalPublicHtml = base_path('public_html');
        if (File::isDirectory($accidentalPublicHtml)) {
            try {
                File::deleteDirectory($accidentalPublicHtml);
                $this->line("🧹 Folder public_html nyasar di dalam project berhasil dihapus.");
            } catch (\Throwable $e) {}
        }

        // 2. Tentukan sumber aset build (ambil dari folder public/build hasil compile)
        $sourceBuild = base_path('public' . DIRECTORY_SEPARATOR . 'build');
        if (!File::isDirectory($sourceBuild)) {
            $sourceBuild = public_path('build');
        }

        if (!File::exists($sourceBuild) || !File::isDirectory($sourceBuild)) {
            $this->error("❌ Folder sumber build tidak ditemukan: {$sourceBuild}");
            return Command::FAILURE;
        }

        $sourceFiles = File::allFiles($sourceBuild);
        $totalFiles = count($sourceFiles);

        $this->info("=================================================");
        $this->info(" 📦 KPI SYNC ASSETS & IMAGES CONSOLE");
        $this->info("=================================================");
        $this->line("Sumber Build  : <fg=cyan>{$sourceBuild}</>");
        $this->line("Jumlah Berkas : <fg=yellow>{$totalFiles} file</>");
        $this->line("-------------------------------------------------");

        // 3. Target tujuan build (tepat di samping index.php cPanel)
        $parentDir = dirname(base_path());
        $buildDestinations = [
            base_path('build'),
            $parentDir . DIRECTORY_SEPARATOR . 'build',
        ];

        if (File::isDirectory(base_path('Uploads'))) {
            $buildDestinations[] = base_path('Uploads' . DIRECTORY_SEPARATOR . 'build');
        }

        foreach (array_unique($buildDestinations) as $dest) {
            if (!$dest || realpath($dest) === realpath($sourceBuild)) {
                continue;
            }

            try {
                if (!File::exists($dest)) {
                    File::makeDirectory($dest, 0755, true, true);
                }

                // Bersihkan file build lama agar tidak campur aduk
                File::cleanDirectory($dest);

                File::copyDirectory($sourceBuild, $dest);
                @chmod($dest, 0755);
                foreach (File::allFiles($dest) as $f) {
                    @chmod($f->getRealPath(), 0644);
                }
                $this->info("✅ Build disalin ke: <fg=green>{$dest}</>");
            } catch (\Throwable $e) {
                $this->error("❌ Gagal menyalin build ke: {$dest} ({$e->getMessage()})");
            }
        }

        // 4. Salin seluruh folder IMAGES (logo kampus, foto kegiatan, dan foto pejabat)
        $sourceImages = base_path('public' . DIRECTORY_SEPARATOR . 'images');
        if (File::isDirectory($sourceImages)) {
            $imgDestinations = [
                base_path('images'),
                $parentDir . DIRECTORY_SEPARATOR . 'images',
            ];

            if (File::isDirectory(base_path('Uploads'))) {
                $imgDestinations[] = base_path('Uploads' . DIRECTORY_SEPARATOR . 'images');
            }

            foreach (array_unique($imgDestinations) as $imgDest) {
                if (!$imgDest || realpath($imgDest) === realpath($sourceImages)) {
                    continue;
                }

                try {
                    if (!File::exists($imgDest)) {
                        File::makeDirectory($imgDest, 0755, true, true);
                    }
                    File::copyDirectory($sourceImages, $imgDest);
                    @chmod($imgDest, 0755);
                    foreach (File::allFiles($imgDest) as $f) {
                        @chmod($f->getRealPath(), 0644);
                    }
                    $this->info("🖼️ Images disalin ke: <fg=green>{$imgDest}</>");
                } catch (\Throwable $e) {
                    $this->error("❌ Gagal menyalin images ke: {$imgDest} ({$e->getMessage()})");
                }
            }
        }

        $this->line("-------------------------------------------------");
        $this->info("🎉 Selesai! Aset Build dan seluruh Gambar kampus telah disinkronkan ke root web.");
        return Command::SUCCESS;
    }
}
