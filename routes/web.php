<?php

use App\Http\Controllers\ProfileController;

use App\Http\Controllers\TentangKampusController;
use App\Http\Controllers\StrukturOrganisasiController;
use App\Http\Controllers\KurikulumController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $setting = \App\Models\BerandaSetting::firstOrCreate(
        ['id' => 1],
        [
            'pmb_gelombang_text' => 'Gelombang I: Ditutup 30 Agustus 2026',
            'pmb_hotline_number' => '6282116116133',
            'pmb_hotline_text' => '+62 821-1611-6133 (Admin)',
            'pmb_link' => 'https://iaipibdg.sevimaplatform.com/spmbfront'
        ]
    );

    $umum = \App\Models\PengaturanUmum::firstOrCreate(
        ['id' => 1],
        [
            'email' => 'pascasarjana@iaipibandung.ac.id',
            'telepon' => '(022) 5441951',
            'alamat' => 'Jl. Ciganitri No.2, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287',
            'facebook_url' => 'https://facebook.com',
            'instagram_url' => 'https://instagram.com',
            'youtube_url' => 'https://youtube.com',
            'twitter_url' => 'https://twitter.com',
        ]
    );

    $programStudi = \App\Models\ProgramStudi::where('status', 1)->select('id', 'nama', 'jenjang', 'gelar_lulusan', 'deskripsi', 'gambar')->get();
    $sambutan = \App\Models\SambutanPimpinan::first();
    $beritas = \App\Models\Berita::where('is_published', true)->orderBy('created_at', 'desc')->take(3)->get();
    
    $beritas->transform(function ($item) {
        if ($item->gambar) {
            $item->gambar_url = \Illuminate\Support\Facades\Storage::url($item->gambar);
        }
        return $item;
    });

    $quickAccesses = \App\Models\QuickAccess::where('is_active', true)->orderBy('urutan', 'asc')->get();

    $pengaturanDosen = \App\Models\PengaturanHalaman::where('halaman', 'dosen')->first();
    $stats = [
        'total' => \App\Models\Dosen::where('status_aktif', true)->count(),
        'mahasiswa' => $pengaturanDosen->jumlah_mahasiswa ?? 111,
        'alumni' => $pengaturanDosen->jumlah_alumni ?? 180,
        'penelitian' => $pengaturanDosen->jumlah_penelitian ?? 25,
        'publikasi' => $pengaturanDosen->jumlah_publikasi ?? 42,
    ];

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'setting' => $setting,
        'umum' => $umum,
        'programStudi' => $programStudi,
        'sambutan' => $sambutan,
        'beritas' => $beritas,
        'quickAccesses' => $quickAccesses,
        'stats' => $stats,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Quick Access Routes
    Route::post('/admin/quick-access', [\App\Http\Controllers\QuickAccessController::class, 'store'])->name('admin.quick-access.store');
    Route::post('/admin/quick-access/{id}', [\App\Http\Controllers\QuickAccessController::class, 'update'])->name('admin.quick-access.update');
    Route::delete('/admin/quick-access/{id}', [\App\Http\Controllers\QuickAccessController::class, 'destroy'])->name('admin.quick-access.destroy');
});

Route::get('/profil/tentang-kampus', function () {
    $tentang = \App\Models\TentangKampus::first();
    return Inertia::render('Public/TentangKampus', [
        'tentang' => $tentang
    ]);
});

Route::get('/profil/visi-misi', function () {
    $visimisi = \App\Models\VisiMisi::first();
    return Inertia::render('Public/VisiMisi', [
        'visimisi' => $visimisi
    ]);
});

Route::get('/profil/sambutan-pimpinan', function () {
    $sambutan = \App\Models\SambutanPimpinan::first();
    return Inertia::render('Public/SambutanPimpinan', [
        'sambutan' => $sambutan
    ]);
});

Route::get('/profil/struktur-organisasi', [\App\Http\Controllers\StrukturOrganisasiController::class, 'publicIndex'])->name('public.profil.struktur-organisasi');

Route::get('/profil/dokumen-institusi', [\App\Http\Controllers\DokumenInstitusiController::class, 'publicIndex'])->name('public.profil.dokumen-institusi');
Route::get('/dokumen-institusi', function () {
    return redirect('/profil/dokumen-institusi');
})->name('public.dokumen-institusi');

Route::get('/profil/akreditasi', [\App\Http\Controllers\AkreditasiController::class, 'publicIndex'])->name('public.akreditasi');

Route::post('/konsultasi', [\App\Http\Controllers\KonsultasiPendaftaranController::class, 'store'])->name('public.konsultasi.store');

Route::get('/fakultas/daftarfakultas', [\App\Http\Controllers\FakultasController::class, 'publicIndex'])->name('public.fakultas');
Route::get('/fakultas/programstudi', [\App\Http\Controllers\ProgramStudiController::class, 'publicIndex'])->name('public.program_studi');
Route::get('/fakultas/dosen', [\App\Http\Controllers\DosenController::class, 'indexPublic'])->name('public.dosen');
Route::get('/fakultas/prospek-karir', [\App\Http\Controllers\ProspekKarirController::class, 'publicIndex'])->name('public.prospek-karir');

Route::get('/akademik/kalender-akademik', [\App\Http\Controllers\KalenderAkademikController::class, 'publicIndex'])->name('public.akademik.kalender');
Route::get('/akademik/jadwal-perkuliahan', [\App\Http\Controllers\JadwalPerkuliahanController::class, 'publicIndex'])->name('public.akademik.jadwal');
Route::get('/akademik/pedoman', [\App\Http\Controllers\PedomanAkademikController::class, 'indexPublic'])->name('public.akademik.pedoman');
Route::get('/akademik/kurikulum', [\App\Http\Controllers\KurikulumController::class, 'index'])->name('public.akademik.kurikulum');
Route::get('/akademik/sistem-akademik', [\App\Http\Controllers\SistemAkademikController::class, 'indexPublic'])->name('public.akademik.sistem');

// LPPM Public Routes
Route::get('/lppm/lppm', [\App\Http\Controllers\LppmProfilController::class, 'indexPublic'])->name('public.lppm.profil');
Route::get('/lppm/penelitian', [\App\Http\Controllers\LppmInformasiHibahController::class, 'indexPublic'])->name('public.lppm.penelitian');
Route::get('/lppm/pengabdian', [\App\Http\Controllers\LppmPengabdianController::class, 'indexPublic'])->name('public.lppm.pengabdian');
Route::get('/lppm/publikasi', [\App\Http\Controllers\LppmPublikasiController::class, 'indexPublic'])->name('public.lppm.publikasi');
Route::get('/lppm/repository', [\App\Http\Controllers\RepositoryController::class, 'indexPublic'])->name('public.lppm.repository');
Route::get('/lppm/repository/{id}', [\App\Http\Controllers\RepositoryController::class, 'showPublic'])->name('public.lppm.repository.show');

Route::get('/dashboard', function () {
    $mahasiswaCount = \App\Models\ProgramStudi::count();
    $dosenCount = \App\Models\Dosen::count();
    $konsultasiCount = \App\Models\KonsultasiPendaftaran::count();
    $beritaCount = \App\Models\Berita::count();

    $recentKonsultasi = \App\Models\KonsultasiPendaftaran::latest()->take(3)->get()->map(function($k) {
        return [
            'title' => 'Pesan dari: ' . $k->nama,
            'user' => 'Konsultasi PMB',
            'time' => $k->created_at->diffForHumans(),
            'type' => 'konsultasi',
            'url' => route('admin.konsultasi.index')
        ];
    });

    $recentBerita = \App\Models\Berita::latest()->take(2)->get()->map(function($b) {
        return [
            'title' => 'Berita: ' . $b->judul,
            'user' => 'Humas',
            'time' => $b->created_at->diffForHumans(),
            'type' => 'berita',
            'url' => route('admin.berita.index')
        ];
    });

    $activities = collect($recentKonsultasi)->concat($recentBerita)->sortByDesc('time')->values()->take(4);

    // Health Checks
    $healthChecks = [];
    $akreditasiMissing = \App\Models\Akreditasi::whereNull('sertifikat_path')->count();
    if ($akreditasiMissing > 0) {
        $healthChecks[] = [
            'message' => $akreditasiMissing . ' sertifikat akreditasi belum diunggah',
            'url' => route('admin.profil.akreditasi.index')
        ];
    }
    
    $prodiNoKurikulum = \App\Models\ProgramStudi::doesntHave('mataKuliahs')->count();
    if ($prodiNoKurikulum > 0) {
        $healthChecks[] = [
            'message' => $prodiNoKurikulum . ' program studi belum memiliki data kurikulum',
            'url' => route('admin.akademik.kurikulum.index')
        ];
    }

    $dosenNoPhoto = \App\Models\Dosen::whereNull('foto')->count();
    if ($dosenNoPhoto > 0) {
        $healthChecks[] = [
            'message' => $dosenNoPhoto . ' dosen belum memiliki foto profil',
            'url' => route('admin.dosen.index')
        ];
    }

    // Upcoming Reminders (Placeholder since KalenderAkademik only has pdf)
    $upcomingReminders = [];

    return Inertia::render('Dashboard', [
        'stats' => [
            'mahasiswa' => $mahasiswaCount,
            'berita' => $beritaCount,
            'dosen' => $dosenCount,
            'konsultasi' => $konsultasiCount
        ],
        'activities' => $activities,
        'healthChecks' => $healthChecks,
        'upcomingReminders' => $upcomingReminders
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Berita Public Routes
Route::get('/berita', [\App\Http\Controllers\BeritaController::class, 'publicIndex'])->name('public.berita.index');
Route::get('/berita/{slug}', [\App\Http\Controllers\BeritaController::class, 'showPublic'])->name('public.berita.show');

// Public/Secret Setup Route for Hosting
Route::get('/sys-setup/run/{token}', function ($token) {
    if ($token !== 'IAIPersis2026-Mantap') {
        abort(403, 'Token setup tidak valid.');
    }
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate:fresh', ['--seed' => true, '--force' => true]);
        $outputMigrate = \Illuminate\Support\Facades\Artisan::output();

        // Kita hapus Artisan::call('storage:link') karena hosting memblokir exec()
        // Proses symlink harus dilakukan manual via cron job atau symlink() script terpisah.

        return response()->json([
            'status' => 'success',
            'message' => 'Database berhasil di-reset & di-seed!',
            'log_migrate' => $outputMigrate
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
});

Route::get('/sys-setup/storage-link/{token}', function ($token) {
    if ($token !== 'IAIPersis2026-Mantap') {
        abort(403, 'Token setup tidak valid.');
    }
    try {
        $target = storage_path('app/public');
        $link = public_path('storage');

        if (file_exists($link)) {
            return response()->json([
                'status' => 'info',
                'message' => 'Storage link sudah ada.'
            ]);
        }

        if (symlink($target, $link)) {
            return response()->json([
                'status' => 'success',
                'message' => 'Storage berhasil di-link pakai fungsi native PHP!'
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal membuat symlink. Fungsi symlink() mungkin diblokir oleh hosting.'
            ], 500);
        }
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
});

Route::middleware('auth')->group(function () {
    // System Actions
    Route::post('/sys/optimize', function () {
        \Illuminate\Support\Facades\Artisan::call('optimize:clear');
        return back()->with('success', 'Sistem berhasil dioptimasi (Cache & Config dibersihkan).');
    })->name('sys.optimize');

    Route::post('/sys/migrate-seed', function () {
        if (auth()->user()->role !== 'superadmin') {
            abort(403, 'Hanya superadmin yang dapat melakukan aksi ini.');
        }
        \Illuminate\Support\Facades\Artisan::call('migrate:fresh', ['--seed' => true]);
        return back()->with('success', 'Database berhasil di-reset dan di-seed!');
    })->name('sys.migrate-seed');

    // Download Database Backup (.sql / .sqlite)
    Route::get('/sys/backup-db', function () {
        if (auth()->user()->role !== 'superadmin') {
            abort(403, 'Hanya superadmin yang dapat melakukan aksi ini.');
        }

        $connection = config('database.default');
        
        if ($connection === 'sqlite') {
            $dbPath = database_path('database.sqlite');
            if (file_exists($dbPath)) {
                return response()->download($dbPath, 'backup-iaipasca-' . date('Y-m-d_H-i') . '.sqlite');
            }
            return back()->with('error', 'Database SQLite tidak ditemukan.');
        }

        if ($connection === 'mysql') {
            try {
                $tables = array_map('reset', \Illuminate\Support\Facades\DB::select('SHOW TABLES'));
                $sql = "-- Backup Database MySQL\n-- Tanggal: " . now()->format('Y-m-d H:i:s') . "\n\n";
                $sql .= "SET FOREIGN_KEY_CHECKS=0;\n\n";
                
                foreach ($tables as $tableName) {
                    $sql .= "DROP TABLE IF EXISTS `{$tableName}`;\n";
                    $createTable = \Illuminate\Support\Facades\DB::select("SHOW CREATE TABLE `{$tableName}`");
                    $sql .= $createTable[0]->{'Create Table'} . ";\n\n";
                    
                    $rows = \Illuminate\Support\Facades\DB::table($tableName)->get();
                    foreach ($rows as $row) {
                        $row = (array) $row;
                        $values = [];
                        foreach ($row as $val) {
                            if (is_null($val)) {
                                $values[] = "NULL";
                            } else {
                                $values[] = "'" . addslashes($val) . "'";
                            }
                        }
                        $sql .= "INSERT INTO `{$tableName}` VALUES(" . implode(', ', $values) . ");\n";
                    }
                    $sql .= "\n\n";
                }
                $sql .= "SET FOREIGN_KEY_CHECKS=1;\n";
                
                $filename = 'backup-iaipasca-' . date('Y-m-d_H-i') . '.sql';
                $path = storage_path('app/' . $filename);
                file_put_contents($path, $sql);
                
                return response()->download($path)->deleteFileAfterSend(true);
            } catch (\Exception $e) {
                return back()->with('error', 'Gagal membackup MySQL: ' . $e->getMessage());
            }
        }

        return back()->with('error', 'Driver database tidak didukung untuk auto-backup.');
    })->name('sys.backup-db');

    // Download Log File
    Route::get('/sys/download-log', function () {
        if (auth()->user()->role !== 'superadmin') {
            abort(403, 'Hanya superadmin yang dapat melakukan aksi ini.');
        }
        $logPath = storage_path('logs/laravel.log');
        if (file_exists($logPath)) {
            return response()->download($logPath, 'log-iaipasca-' . date('Y-m-d') . '.log');
        }
        return back()->with('error', 'File log tidak ditemukan atau kosong.');
    })->name('sys.download-log');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Profil - Tentang Kampus
    Route::get('/admin/profil/tentang-campusr', function () {
        return redirect()->route('admin.profil.tentang-kampus');
    });
    Route::get('/admin/profil/tentang-kampus', [TentangKampusController::class, 'edit'])->name('admin.profil.tentang-kampus');
    Route::put('/admin/profil/tentang-kampus', [TentangKampusController::class, 'update'])->name('admin.profil.tentang-kampus.update');

    // Admin Profil - Sambutan Pimpinan
    Route::get('/admin/profil/sambutan-pimpinan', [\App\Http\Controllers\SambutanPimpinanController::class, 'edit'])->name('admin.profil.sambutan-pimpinan');
    Route::post('/admin/profil/sambutan-pimpinan', [\App\Http\Controllers\SambutanPimpinanController::class, 'update'])->name('admin.profil.sambutan-pimpinan.update');

    // Admin Profil - Visi Misi
    Route::get('/admin/profil/visi-misi', [\App\Http\Controllers\VisiMisiController::class, 'edit'])->name('admin.profil.visi-misi');
    Route::post('/admin/profil/visi-misi', [\App\Http\Controllers\VisiMisiController::class, 'update'])->name('admin.profil.visi-misi.update');

    // Admin Profil - Struktur Organisasi
    Route::get('/admin/profil/struktur-organisasi', [\App\Http\Controllers\StrukturOrganisasiController::class, 'index'])->name('admin.profil.struktur-organisasi.index');
    Route::post('/admin/profil/struktur-organisasi/update-banner', [\App\Http\Controllers\StrukturOrganisasiController::class, 'updateBanner'])->name('admin.profil.struktur-organisasi.update-banner');
    Route::get('/admin/profil/struktur-organisasi/create', [\App\Http\Controllers\StrukturOrganisasiController::class, 'create'])->name('admin.profil.struktur-organisasi.create');
    Route::post('/admin/profil/struktur-organisasi', [\App\Http\Controllers\StrukturOrganisasiController::class, 'store'])->name('admin.profil.struktur-organisasi.store');
    Route::get('/admin/profil/struktur-organisasi/{id}/edit', [\App\Http\Controllers\StrukturOrganisasiController::class, 'edit'])->name('admin.profil.struktur-organisasi.edit');
    Route::post('/admin/profil/struktur-organisasi/{id}', [\App\Http\Controllers\StrukturOrganisasiController::class, 'update'])->name('admin.profil.struktur-organisasi.update');
    Route::post('/admin/profil/struktur-organisasi/bulk-destroy', [\App\Http\Controllers\StrukturOrganisasiController::class, 'bulkDestroy'])->name('admin.profil.struktur-organisasi.bulk-destroy');
    Route::delete('/admin/profil/struktur-organisasi/{id}', [\App\Http\Controllers\StrukturOrganisasiController::class, 'destroy'])->name('admin.profil.struktur-organisasi.destroy');

    // Admin Profil - Dokumen Institusi
    Route::get('/admin/profil/dokumen-institusi', [\App\Http\Controllers\DokumenInstitusiController::class, 'index'])->name('admin.profil.dokumen-institusi.index');
    Route::post('/admin/profil/dokumen-institusi/update-banner', [\App\Http\Controllers\DokumenInstitusiController::class, 'updateBanner'])->name('admin.profil.dokumen-institusi.update-banner');
    Route::get('/admin/profil/dokumen-institusi/create', [\App\Http\Controllers\DokumenInstitusiController::class, 'create'])->name('admin.profil.dokumen-institusi.create');
    Route::post('/admin/profil/dokumen-institusi', [\App\Http\Controllers\DokumenInstitusiController::class, 'store'])->name('admin.profil.dokumen-institusi.store');
    Route::get('/admin/profil/dokumen-institusi/{id}/edit', [\App\Http\Controllers\DokumenInstitusiController::class, 'edit'])->name('admin.profil.dokumen-institusi.edit');
    Route::post('/admin/profil/dokumen-institusi/{id}', [\App\Http\Controllers\DokumenInstitusiController::class, 'update'])->name('admin.profil.dokumen-institusi.update');    
    // Konsultasi PMB
    Route::get('/konsultasi', [App\Http\Controllers\KonsultasiPendaftaranController::class, 'index'])->name('admin.konsultasi.index');
    Route::delete('/konsultasi/{konsultasi}', [App\Http\Controllers\KonsultasiPendaftaranController::class, 'destroy'])->name('admin.konsultasi.destroy');

    Route::post('/admin/profil/dokumen-institusi/bulk-destroy', [\App\Http\Controllers\DokumenInstitusiController::class, 'bulkDestroy'])->name('admin.profil.dokumen-institusi.bulk-destroy');
    Route::delete('/admin/profil/dokumen-institusi/{id}', [\App\Http\Controllers\DokumenInstitusiController::class, 'destroy'])->name('admin.profil.dokumen-institusi.destroy');

    // Admin Profil - Akreditasi
    Route::get('/admin/profil/akreditasi', [\App\Http\Controllers\AkreditasiController::class, 'index'])->name('admin.profil.akreditasi.index');
    Route::post('/admin/profil/akreditasi/institusi', [\App\Http\Controllers\AkreditasiController::class, 'storeInstitusi'])->name('admin.profil.akreditasi.institusi.store');
    Route::post('/admin/profil/akreditasi/prodi', [\App\Http\Controllers\AkreditasiController::class, 'storeProdi'])->name('admin.profil.akreditasi.prodi.store');
    Route::put('/admin/profil/akreditasi/prodi/{id}', [\App\Http\Controllers\AkreditasiController::class, 'updateProdi'])->name('admin.profil.akreditasi.prodi.update');
    Route::post('/admin/profil/akreditasi/riwayat', [\App\Http\Controllers\AkreditasiController::class, 'storeRiwayat'])->name('admin.profil.akreditasi.riwayat.store');
    Route::put('/admin/profil/akreditasi/riwayat/{id}', [\App\Http\Controllers\AkreditasiController::class, 'updateRiwayat'])->name('admin.profil.akreditasi.riwayat.update');
    Route::delete('/admin/profil/akreditasi/{id}', [\App\Http\Controllers\AkreditasiController::class, 'destroy'])->name('admin.profil.akreditasi.destroy');
    Route::post('/admin/profil/akreditasi/pengaturan', [\App\Http\Controllers\AkreditasiController::class, 'updatePengaturan'])->name('admin.profil.akreditasi.pengaturan');

    // Admin Prospek Karir
    Route::get('/admin/fakultas/prospek-karir', [\App\Http\Controllers\ProspekKarirController::class, 'index'])->name('admin.fakultas.prospek-karir');
    Route::post('/admin/fakultas/prospek-karir/pengaturan', [\App\Http\Controllers\ProspekKarirController::class, 'updatePengaturan'])->name('admin.fakultas.prospek-karir.pengaturan');
    Route::post('/admin/fakultas/prospek-karir/konten', [\App\Http\Controllers\ProspekKarirController::class, 'updateKonten'])->name('admin.fakultas.prospek-karir.konten');
    Route::post('/admin/fakultas/prospek-karir/karir', [\App\Http\Controllers\ProspekKarirController::class, 'storeKarir'])->name('admin.fakultas.prospek-karir.karir.store');
    Route::put('/admin/fakultas/prospek-karir/karir/{id}', [\App\Http\Controllers\ProspekKarirController::class, 'updateKarir'])->name('admin.fakultas.prospek-karir.karir.update');
    Route::delete('/admin/fakultas/prospek-karir/karir/{id}', [\App\Http\Controllers\ProspekKarirController::class, 'destroyKarir'])->name('admin.fakultas.prospek-karir.karir.destroy');

    // Admin Dosen
    Route::get('/admin/fakultas/dosen', [\App\Http\Controllers\DosenController::class, 'indexAdmin'])->name('admin.dosen.index');
    Route::post('/admin/fakultas/dosen', [\App\Http\Controllers\DosenController::class, 'store'])->name('admin.dosen.store');
    Route::post('/admin/fakultas/dosen/{id}', [\App\Http\Controllers\DosenController::class, 'update'])->name('admin.dosen.update');
    Route::delete('/admin/fakultas/dosen/{id}', [\App\Http\Controllers\DosenController::class, 'destroy'])->name('admin.dosen.destroy');
    Route::post('/admin/fakultas/dosen-pengaturan', [\App\Http\Controllers\DosenController::class, 'updatePengaturan'])->name('admin.dosen.pengaturan');

    // Admin Berita Routes
    Route::get('/admin/berita', [\App\Http\Controllers\BeritaController::class, 'index'])->name('admin.berita.index');
    Route::post('/admin/berita', [\App\Http\Controllers\BeritaController::class, 'store'])->name('admin.berita.store');
    Route::post('/admin/berita/{id}', [\App\Http\Controllers\BeritaController::class, 'update'])->name('admin.berita.update');
    Route::delete('/admin/berita/{id}', [\App\Http\Controllers\BeritaController::class, 'destroy'])->name('admin.berita.destroy');
    Route::post('/admin/berita/pengaturan', [\App\Http\Controllers\BeritaController::class, 'updatePengaturan'])->name('admin.berita.pengaturan');

    // Admin Fakultas
    Route::get('/admin/fakultas', [\App\Http\Controllers\FakultasController::class, 'index'])->name('admin.fakultas.index');
    Route::post('/admin/fakultas', [\App\Http\Controllers\FakultasController::class, 'store'])->name('admin.fakultas.store');
    Route::post('/admin/fakultas/{id}', [\App\Http\Controllers\FakultasController::class, 'update'])->name('admin.fakultas.update');
    Route::delete('/admin/fakultas/{id}', [\App\Http\Controllers\FakultasController::class, 'destroy'])->name('admin.fakultas.destroy');
    Route::post('/admin/fakultas-pengaturan', [\App\Http\Controllers\FakultasController::class, 'updatePengaturan'])->name('admin.fakultas.pengaturan');

    // Admin Program Studi
    Route::get('/admin/program-studi', [\App\Http\Controllers\ProgramStudiController::class, 'index'])->name('admin.program_studi.index');
    Route::post('/admin/program-studi', [\App\Http\Controllers\ProgramStudiController::class, 'store'])->name('admin.program_studi.store');
    Route::post('/admin/program-studi/{id}', [\App\Http\Controllers\ProgramStudiController::class, 'update'])->name('admin.program_studi.update');
    Route::delete('/admin/program-studi/{id}', [\App\Http\Controllers\ProgramStudiController::class, 'destroy'])->name('admin.program_studi.destroy');
    Route::post('/admin/program-studi-pengaturan', [\App\Http\Controllers\ProgramStudiController::class, 'updatePengaturan'])->name('admin.program_studi.pengaturan');

    // Admin Akademik - Pedoman Akademik
    Route::get('/admin/akademik/pedoman', [\App\Http\Controllers\PedomanAkademikController::class, 'indexAdmin'])->name('admin.akademik.pedoman.index');
    Route::post('/admin/akademik/pedoman', [\App\Http\Controllers\PedomanAkademikController::class, 'store'])->name('admin.akademik.pedoman.store');
    Route::post('/admin/akademik/pedoman/{id}', [\App\Http\Controllers\PedomanAkademikController::class, 'update'])->name('admin.akademik.pedoman.update');
    Route::delete('/admin/akademik/pedoman/{id}', [\App\Http\Controllers\PedomanAkademikController::class, 'destroy'])->name('admin.akademik.pedoman.destroy');
    Route::post('/admin/akademik/pedoman-pengaturan', [\App\Http\Controllers\PedomanAkademikController::class, 'updatePengaturan'])->name('admin.akademik.pedoman.pengaturan');

    // Admin Akademik - Kalender Akademik
    Route::get('/admin/akademik/kalender', [\App\Http\Controllers\KalenderAkademikController::class, 'index'])->name('admin.akademik.kalender.index');
    Route::post('/admin/akademik/kalender', [\App\Http\Controllers\KalenderAkademikController::class, 'store'])->name('admin.akademik.kalender.store');
    Route::post('/admin/akademik/kalender/{id}', [\App\Http\Controllers\KalenderAkademikController::class, 'update'])->name('admin.akademik.kalender.update');
    Route::delete('/admin/akademik/kalender/{id}', [\App\Http\Controllers\KalenderAkademikController::class, 'destroy'])->name('admin.akademik.kalender.destroy');
    Route::post('/admin/akademik/kalender-pengaturan', [\App\Http\Controllers\KalenderAkademikController::class, 'updatePengaturan'])->name('admin.akademik.kalender.pengaturan');

    // Admin Akademik - Jadwal Perkuliahan
    Route::get('/admin/akademik/jadwal', [\App\Http\Controllers\JadwalPerkuliahanController::class, 'index'])->name('admin.akademik.jadwal.index');
    Route::post('/admin/akademik/jadwal-pengaturan', [\App\Http\Controllers\JadwalPerkuliahanController::class, 'updatePengaturan'])->name('admin.akademik.jadwal.pengaturan');
    Route::post('/admin/akademik/jadwal/periode', [\App\Http\Controllers\JadwalPerkuliahanController::class, 'storePeriode'])->name('admin.akademik.jadwal.periode.store');
    Route::post('/admin/akademik/jadwal/periode/{id}', [\App\Http\Controllers\JadwalPerkuliahanController::class, 'updatePeriode'])->name('admin.akademik.jadwal.periode.update');
    Route::delete('/admin/akademik/jadwal/periode/{id}', [\App\Http\Controllers\JadwalPerkuliahanController::class, 'destroyPeriode'])->name('admin.akademik.jadwal.periode.destroy');
    
    Route::post('/admin/akademik/jadwal/mata-kuliah', [\App\Http\Controllers\JadwalPerkuliahanController::class, 'storeMataKuliah'])->name('admin.akademik.jadwal.mata-kuliah.store');
    Route::put('/admin/akademik/jadwal/mata-kuliah/{id}', [\App\Http\Controllers\JadwalPerkuliahanController::class, 'updateMataKuliah'])->name('admin.akademik.jadwal.mata-kuliah.update');
    Route::delete('/admin/akademik/jadwal/mata-kuliah/{id}', [\App\Http\Controllers\JadwalPerkuliahanController::class, 'destroyMataKuliah'])->name('admin.akademik.jadwal.mata-kuliah.destroy');

    Route::get('/admin/akademik/jadwal/template-csv', [\App\Http\Controllers\JadwalPerkuliahanController::class, 'downloadTemplate'])->name('admin.akademik.jadwal.template');
    Route::post('/admin/akademik/jadwal/import/{periode_id}', [\App\Http\Controllers\JadwalPerkuliahanController::class, 'importCsv'])->name('admin.akademik.jadwal.import');

    // Admin Akademik - Kurikulum
    Route::get('/admin/akademik/kurikulum', [\App\Http\Controllers\KurikulumController::class, 'adminIndex'])->name('admin.akademik.kurikulum.index');
    Route::post('/admin/akademik/kurikulum', [\App\Http\Controllers\KurikulumController::class, 'store'])->name('admin.akademik.kurikulum.store');
    Route::put('/admin/akademik/kurikulum/{id}', [\App\Http\Controllers\KurikulumController::class, 'update'])->name('admin.akademik.kurikulum.update');
    Route::delete('/admin/akademik/kurikulum/{id}', [\App\Http\Controllers\KurikulumController::class, 'destroy'])->name('admin.akademik.kurikulum.destroy');
    Route::post('/admin/akademik/kurikulum-pengaturan', [\App\Http\Controllers\KurikulumController::class, 'updatePengaturan'])->name('admin.akademik.kurikulum.pengaturan');
    
    Route::get('/admin/akademik/kurikulum/{id}/matakuliah', [\App\Http\Controllers\KurikulumController::class, 'manageMataKuliah'])->name('admin.akademik.kurikulum.matakuliah');
    Route::post('/admin/akademik/kurikulum/{id}/matakuliah', [\App\Http\Controllers\KurikulumController::class, 'storeMataKuliah'])->name('admin.akademik.kurikulum.matakuliah.store');
    Route::put('/admin/akademik/kurikulum/matakuliah/{id}', [\App\Http\Controllers\KurikulumController::class, 'updateMataKuliah'])->name('admin.akademik.kurikulum.matakuliah.update');
    Route::delete('/admin/akademik/kurikulum/matakuliah/{id}', [\App\Http\Controllers\KurikulumController::class, 'destroyMataKuliah'])->name('admin.akademik.kurikulum.matakuliah.destroy');

    // Admin Akademik - Sistem Akademik
    Route::get('/admin/akademik/sistem', [\App\Http\Controllers\SistemAkademikController::class, 'edit'])->name('admin.akademik.sistem.index');
    Route::post('/admin/akademik/sistem', [\App\Http\Controllers\SistemAkademikController::class, 'update'])->name('admin.akademik.sistem.update');

    // Admin LPPM - Profil
    Route::get('/admin/lppm/lppm', [\App\Http\Controllers\LppmProfilController::class, 'edit'])->name('admin.lppm.profil.index');
    Route::post('/admin/lppm/lppm', [\App\Http\Controllers\LppmProfilController::class, 'update'])->name('admin.lppm.profil.update');

    // Admin LPPM - Penelitian
    Route::get('/admin/lppm/penelitian', [\App\Http\Controllers\LppmInformasiHibahController::class, 'edit'])->name('admin.lppm.penelitian.index');
    Route::post('/admin/lppm/penelitian', [\App\Http\Controllers\LppmInformasiHibahController::class, 'update'])->name('admin.lppm.penelitian.update');

    // Admin LPPM - Pengabdian
    Route::get('/admin/lppm/pengabdian', [\App\Http\Controllers\LppmPengabdianController::class, 'edit'])->name('admin.lppm.pengabdian.index');
    Route::post('/admin/lppm/pengabdian', [\App\Http\Controllers\LppmPengabdianController::class, 'update'])->name('admin.lppm.pengabdian.update');

    // Admin LPPM - Publikasi
    Route::get('/admin/lppm/publikasi', [\App\Http\Controllers\LppmPublikasiController::class, 'edit'])->name('admin.lppm.publikasi.index');
    Route::post('/admin/lppm/publikasi', [\App\Http\Controllers\LppmPublikasiController::class, 'update'])->name('admin.lppm.publikasi.update');

    // Admin LPPM - Repository
    Route::get('/admin/lppm/repository', [\App\Http\Controllers\RepositoryController::class, 'index'])->name('admin.lppm.repository.index');
    Route::post('/admin/lppm/repository/setting', [\App\Http\Controllers\RepositoryController::class, 'updateSetting'])->name('admin.lppm.repository.setting');
    Route::post('/admin/lppm/repository', [\App\Http\Controllers\RepositoryController::class, 'store'])->name('admin.lppm.repository.store');
    Route::post('/admin/lppm/repository/{id}', [\App\Http\Controllers\RepositoryController::class, 'update'])->name('admin.lppm.repository.update');
    Route::delete('/admin/lppm/repository/{id}', [\App\Http\Controllers\RepositoryController::class, 'destroy'])->name('admin.lppm.repository.destroy');

    // Admin Beranda (PMB)
    Route::get('/admin/beranda', [\App\Http\Controllers\BerandaSettingController::class, 'edit'])->name('admin.beranda.index');
    Route::post('/admin/beranda', [\App\Http\Controllers\BerandaSettingController::class, 'update'])->name('admin.beranda.update');

    // Manajemen User
    Route::get('/users', [\App\Http\Controllers\UserController::class, 'index'])->name('admin.users.index');
    Route::post('/users', [\App\Http\Controllers\UserController::class, 'store'])->name('admin.users.store');
    Route::put('/users/{id}', [\App\Http\Controllers\UserController::class, 'update'])->name('admin.users.update');
    Route::delete('/users/{id}', [\App\Http\Controllers\UserController::class, 'destroy'])->name('admin.users.destroy');
});

require __DIR__.'/auth.php';

// Route helper sementara untuk jalankan migration & seeder di hosting tanpa SSH terminal
Route::get('/jalankan-migrate-seed', function () {
    $out = '<h2>Proses Migration & Seeder Akses Cepat (Quick Access)</h2>';
    
    // 1. Jalankan Migration
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        $out .= '<h3 style="color:green;">✓ Migration Berhasil:</h3><pre>' . e(\Illuminate\Support\Facades\Artisan::output()) . '</pre>';
    } catch (\Throwable $e) {
        $out .= '<h3 style="color:red;">✗ Migration Error / Already Ran:</h3><pre>' . e($e->getMessage()) . '</pre>';
    }

    // 2. Jalankan QuickAccessSeeder
    try {
        \Illuminate\Support\Facades\Artisan::call('db:seed', ['--class' => 'QuickAccessSeeder', '--force' => true]);
        $out .= '<h3 style="color:green;">✓ QuickAccessSeeder Berhasil:</h3><pre>' . e(\Illuminate\Support\Facades\Artisan::output()) . '</pre>';
    } catch (\Throwable $e) {
        $out .= '<h3 style="color:orange;">ℹ Info Seeder:</h3><pre>' . e($e->getMessage()) . '</pre>';
    }

    return $out;
});
