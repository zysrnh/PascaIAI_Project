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
        // 1. Bersihkan folder public_html nyasar jika sempat terbuat
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
        $this->info(" 📦 PIAUD SYNC ASSETS & IMAGES CONSOLE");
        $this->info("=================================================");
        $this->line("Sumber Build  : <fg=cyan>{$sourceBuild}</>");
        $this->line("Jumlah Berkas : <fg=yellow>{$totalFiles} file</>");
        $this->line("-------------------------------------------------");

        // 3. Target tujuan build HANYA yang tepat di samping index.php
        $buildDestinations = [
            base_path('build'),
        ];

        if (File::isDirectory(base_path('Uploads'))) {
            $buildDestinations[] = base_path('Uploads' . DIRECTORY_SEPARATOR . 'build');
        }

        foreach ($buildDestinations as $dest) {
            if (realpath($dest) === realpath($sourceBuild)) {
                continue;
            }

            try {
                if (!File::exists($dest)) {
                    File::makeDirectory($dest, 0755, true, true);
                }

                // Bersihkan file build lama agar tidak campur aduk
                File::cleanDirectory($dest);

                File::copyDirectory($sourceBuild, $dest);
                $this->info("✅ Build disalin ke: <fg=green>{$dest}</>");
            } catch (\Throwable $e) {
                $this->error("❌ Gagal menyalin build ke: {$dest} ({$e->getMessage()})");
            }
        }

        // 4. Salin seluruh folder IMAGES (logo kampus & foto kegiatan) tepat di samping index.php
        $sourceImages = base_path('public' . DIRECTORY_SEPARATOR . 'images');
        if (File::isDirectory($sourceImages)) {
            $imgDestinations = [
                base_path('images'),
            ];

            if (File::isDirectory(base_path('Uploads'))) {
                $imgDestinations[] = base_path('Uploads' . DIRECTORY_SEPARATOR . 'images');
            }

            foreach ($imgDestinations as $imgDest) {
                if (realpath($imgDest) === realpath($sourceImages)) {
                    continue;
                }

                try {
                    if (!File::exists($imgDest)) {
                        File::makeDirectory($imgDest, 0755, true, true);
                    }
                    File::copyDirectory($sourceImages, $imgDest);
                    $this->info("🖼️ Images disalin ke: <fg=green>{$imgDest}</>");
                } catch (\Throwable $e) {
                    $this->error("❌ Gagal menyalin images ke: {$imgDest} ({$e->getMessage()})");
                }
            }
        }

        $this->line("-------------------------------------------------");
        $this->info("🎉 Selesai! Aset Build (33 file) dan seluruh Gambar kampus telah disinkronkan tepat di root web.");
        return Command::SUCCESS;
    }
}
