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
            'pmb_gelombang_text' => 'Audit Mutu Internal (AMI) Siklus 2026',
            'pmb_hotline_number' => '6282116116133',
            'pmb_hotline_text' => '+62 821-1611-6133 (Helpdesk LPM)',
            'pmb_link' => '/profil/dokumen-institusi'
        ]
    );

    $umum = \App\Models\PengaturanUmum::first();
    if (!$umum) {
        $umum = \App\Models\PengaturanUmum::create([
            'email' => 'lpm@iaipibandung.ac.id',
            'telepon' => '(022) 5441951',
            'alamat' => 'Jl. Ciganitri No.2, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287',
            'facebook_url' => 'https://facebook.com',
            'instagram_url' => 'https://instagram.com',
            'youtube_url' => 'https://youtube.com',
            'twitter_url' => 'https://twitter.com',
        ]);
    } else if (str_contains($umum->email ?? '', 'pasca')) {
        $umum->email = 'lpm@iaipibandung.ac.id';
        $umum->save();
    }

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
    $heroSliders = \App\Models\HeroSlider::where('is_active', true)->orderBy('urutan', 'asc')->get();

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
        'heroSliders' => $heroSliders,
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

    // Admin Akademik - Pedoman Folder CRUD
    Route::post('/admin/akademik/pedoman-folder', [\App\Http\Controllers\PedomanFolderController::class, 'store'])->name('admin.akademik.pedoman.folder.store');
    Route::post('/admin/akademik/pedoman-folder/{id}', [\App\Http\Controllers\PedomanFolderController::class, 'update'])->name('admin.akademik.pedoman.folder.update');
    Route::delete('/admin/akademik/pedoman-folder/{id}', [\App\Http\Controllers\PedomanFolderController::class, 'destroy'])->name('admin.akademik.pedoman.folder.destroy');


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

    // Admin Beranda Hero Sliders
    Route::post('/admin/beranda/slider', [\App\Http\Controllers\HeroSliderController::class, 'store'])->name('admin.beranda.slider.store');
    Route::post('/admin/beranda/slider/{id}', [\App\Http\Controllers\HeroSliderController::class, 'update'])->name('admin.beranda.slider.update');
    Route::delete('/admin/beranda/slider/{id}', [\App\Http\Controllers\HeroSliderController::class, 'destroy'])->name('admin.beranda.slider.destroy');

    // Manajemen User
    Route::get('/users', [\App\Http\Controllers\UserController::class, 'index'])->name('admin.users.index');
    Route::post('/users', [\App\Http\Controllers\UserController::class, 'store'])->name('admin.users.store');
    Route::put('/users/{id}', [\App\Http\Controllers\UserController::class, 'update'])->name('admin.users.update');
    Route::delete('/users/{id}', [\App\Http\Controllers\UserController::class, 'destroy'])->name('admin.users.destroy');
});

require __DIR__.'/auth.php';

// ============================================================================
// Interactive Web Artisan Terminal & Deploy Suite (cPanel No-SSH)
// ============================================================================
Route::match(['get', 'post'], '/terminal/{secret?}', function ($secret = null) {
    $expectedKey = env('DEPLOY_SECRET_KEY', 'pasca2026persis');
    $providedKey = $secret ?: request('secret') ?: request()->cookie('terminal_secret');

    // 1. Authentication check
    if ($providedKey !== $expectedKey) {
        if (request()->isMethod('post')) {
            $inputKey = request('secret_input');
            if ($inputKey === $expectedKey) {
                return response()->json(['success' => true, 'redirect' => url('/terminal/' . $inputKey)])
                    ->cookie('terminal_secret', $inputKey, 120);
            }
            return response()->json(['success' => false, 'message' => 'Token akses ditolak!'], 403);
        }

        // Tampilan Login / Masukkan Token
        return response(<<<HTML
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Terminal Access Lock - Pascasarjana</title>
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #0b0f19; color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; }
                .card { background: #111827; border: 1px solid #1f2937; padding: 2.5rem; border-radius: 12px; width: 100%; max-width: 420px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); text-align: center; }
                .badge { background: #1e293b; color: #10b981; font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 999px; display: inline-block; margin-bottom: 1rem; border: 1px solid #334155; }
                h1 { font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: #fff; }
                p { color: #94a3b8; font-size: 0.85rem; margin-bottom: 1.5rem; line-height: 1.5; }
                input { width: 100%; background: #030712; border: 1px solid #374151; padding: 0.75rem 1rem; border-radius: 8px; color: #f8fafc; font-size: 0.95rem; font-family: monospace; text-align: center; margin-bottom: 1rem; outline: none; transition: border-color 0.2s; }
                input:focus { border-color: #10b981; box-shadow: 0 0 0 2px rgba(16,185,129,0.2); }
                button { width: 100%; background: #10b981; color: #042f2e; font-weight: 700; font-size: 0.9rem; padding: 0.75rem; border: none; border-radius: 8px; cursor: pointer; transition: background 0.2s; }
                button:hover { background: #059669; }
                .err { color: #ef4444; font-size: 0.8rem; margin-top: 0.75rem; display: none; }
            </style>
        </head>
        <body>
            <div class="card">
                <span class="badge">🔒 RESTRICTED CONSOLE</span>
                <h1>Pasca Web Terminal</h1>
                <p>Masukkan token secret untuk membuka konsol perintah server tanpa terminal SSH.</p>
                <form id="authForm">
                    <input type="password" id="secretInput" placeholder="Masukkan Secret Token..." required autofocus>
                    <button type="submit">Buka Terminal</button>
                    <div id="errMsg" class="err">Token tidak cocok!</div>
                </form>
            </div>
            <script>
                document.getElementById('authForm').addEventListener('submit', function(e) {
                    e.preventDefault();
                    var val = document.getElementById('secretInput').value.trim();
                    if (!val) return;
                    window.location.href = window.location.origin + '/terminal/' + encodeURIComponent(val);
                });
            </script>
        </body>
        </html>
        HTML);
    }

    // 2. POST Command Execution via AJAX
    if (request()->isMethod('post')) {
        $cmd = trim(request('command', ''));
        if (str_starts_with($cmd, 'php artisan ')) {
            $cmd = substr($cmd, 12);
        } elseif (str_starts_with($cmd, 'artisan ')) {
            $cmd = substr($cmd, 8);
        }

        // Action: Smart Storage Sync (Anti-Error 500 saat symlink dimatikan cPanel)
        if ($cmd === 'smart-storage' || $cmd === 'storage:link') {
            $target = storage_path('app/public');
            $link = public_path('storage');
            $log = [];

            $copied = 0;
            $copyRecursive = function($src, $dst) use (&$copyRecursive, &$copied) {
                if (!file_exists($src)) return;
                @mkdir($dst, 0755, true);
                $dir = @opendir($src);
                if (!$dir) return;
                while (false !== ($file = readdir($dir))) {
                    if ($file != '.' && $file != '..') {
                        if (is_dir($src . '/' . $file)) {
                            $copyRecursive($src . '/' . $file, $dst . '/' . $file);
                        } else {
                            if (@copy($src . '/' . $file, $dst . '/' . $file)) {
                                $copied++;
                            }
                        }
                    }
                }
                closedir($dir);
            };

            $symlinkCreated = false;
            if (function_exists('symlink') && !file_exists($link)) {
                try {
                    \Illuminate\Support\Facades\Artisan::call('storage:link');
                    $log[] = "[ARTISAN storage:link]
" . \Illuminate\Support\Facades\Artisan::output();
                    $symlinkCreated = file_exists($link);
                } catch (\Throwable $e) {
                    $log[] = "[INFO] Artisan storage:link dilewati: " . $e->getMessage();
                }
            }

            if (!$symlinkCreated && !is_link($link)) {
                @mkdir($link, 0755, true);
                if (file_exists($target)) {
                    $copyRecursive($target, $link);
                    $log[] = "✅ [SMART STORAGE SYNC SUCCESS]";
                    $log[] = "Hosting cPanel mematikan fungsi PHP symlink().";
                    $log[] = "Berhasil membuat folder 'public/storage' dan menyinkronkan {$copied} aset file gambar secara native!";
                } else {
                    $log[] = "ℹ️ [INFO] Folder 'storage/app/public' belum memiliki aset untuk disinkronkan.";
                }
            } else {
                $log[] = "✅ [STORAGE LINK ACTIVE] Symlink 'public/storage' aktif dan siap melayani file gambar!";
            }

            return response()->json([
                'success' => true,
                'command' => 'storage:link (smart-sync)',
                'output' => implode("
", $log),
                'timestamp' => date('H:i:s')
            ]);
        }

        // Action: All-in-One Automated Setup
        if ($cmd === 'all-setup') {
            $log = [];

            // 1. Migrate
            try {
                \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
                $log[] = "✅ [MIGRATE SUCCESS]
" . trim(\Illuminate\Support\Facades\Artisan::output());
            } catch (\Throwable $e) {
                $log[] = "❌ [MIGRATE FAILED] " . $e->getMessage();
            }

            // 2. Seed
            try {
                \Illuminate\Support\Facades\Artisan::call('db:seed', ['--force' => true]);
                $log[] = "✅ [SEED SUCCESS]
" . trim(\Illuminate\Support\Facades\Artisan::output());
            } catch (\Throwable $e) {
                $log[] = "⚠️ [SEED INFO] " . $e->getMessage();
            }

            // 3. Storage
            $target = storage_path('app/public');
            $link = public_path('storage');
            @mkdir($link, 0755, true);
            $copied = 0;
            $copyRecursive = function($src, $dst) use (&$copyRecursive, &$copied) {
                if (!file_exists($src)) return;
                @mkdir($dst, 0755, true);
                $dir = @opendir($src);
                if (!$dir) return;
                while (false !== ($file = readdir($dir))) {
                    if ($file != '.' && $file != '..') {
                        if (is_dir($src . '/' . $file)) {
                            $copyRecursive($src . '/' . $file, $dst . '/' . $file);
                        } else {
                            if (@copy($src . '/' . $file, $dst . '/' . $file)) $copied++;
                        }
                    }
                }
                closedir($dir);
            };
            if (file_exists($target)) $copyRecursive($target, $link);
            $log[] = "✅ [STORAGE SYNC] Direktori 'public/storage' siap ({$copied} aset tersinkronkan).";

            // 4. Optimize Clear
            try {
                \Illuminate\Support\Facades\Artisan::call('optimize:clear');
                $log[] = "✅ [CACHE CLEAR]
" . trim(\Illuminate\Support\Facades\Artisan::output());
            } catch (\Throwable $e) {
                $log[] = "❌ [CACHE ERROR] " . $e->getMessage();
            }

            return response()->json([
                'success' => true,
                'command' => 'all-setup (Migrate + Seed + Storage + Cache)',
                'output' => implode("

", $log),
                'timestamp' => date('H:i:s')
            ]);
        }

        // Action: Arbitrary Artisan Command Runner
        try {
            $parts = preg_split('/\s+/', $cmd, -1, PREG_SPLIT_NO_EMPTY);
            if (empty($parts)) {
                return response()->json(['success' => false, 'command' => '', 'output' => 'Perintah kosong.']);
            }
            $commandName = array_shift($parts);
            $parameters = [];
            foreach ($parts as $part) {
                if (str_starts_with($part, '--')) {
                    $opt = substr($part, 2);
                    if (str_contains($opt, '=')) {
                        [$k, $v] = explode('=', $opt, 2);
                        $parameters['--' . $k] = $v;
                    } else {
                        $parameters['--' . $opt] = true;
                    }
                } else {
                    $parameters[] = $part;
                }
            }

            \Illuminate\Support\Facades\Artisan::call($commandName, $parameters);
            $out = trim(\Illuminate\Support\Facades\Artisan::output());
            if (empty($out)) {
                $out = "Perintah '{$cmd}' berhasil dieksekusi tanpa pesan keluaran (exit code 0).";
            }

            return response()->json([
                'success' => true,
                'command' => $cmd,
                'output' => $out,
                'timestamp' => date('H:i:s')
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'command' => $cmd,
                'output' => "❌ [ERROR] " . $e->getMessage(),
                'timestamp' => date('H:i:s')
            ]);
        }
    }

    // 3. GET Dashboard Interface
    $phpVersion = PHP_VERSION;
    $laravelVersion = app()->version();

    $dbStatus = 'Terputus';
    $dbTablesCount = 0;
    try {
        $tables = \Illuminate\Support\Facades\DB::select('SHOW TABLES');
        $dbTablesCount = count($tables);
        $dbStatus = "Terhubung ({$dbTablesCount} tabel)";
    } catch (\Throwable $e) {
        $dbStatus = 'Gagal: ' . substr($e->getMessage(), 0, 45) . '...';
    }

    $linkPath = public_path('storage');
    $storageStatus = 'Belum Ada';
    if (is_link($linkPath)) {
        $storageStatus = 'Aktif (Symlink)';
    } elseif (is_dir($linkPath)) {
        $storageStatus = 'Aktif (Native Folder)';
    }

    $secretSafe = htmlspecialchars($providedKey, ENT_QUOTES, 'UTF-8');

    $html = <<<HTML
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>⚡ Pasca Artisan Web Terminal (cPanel Console)</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { background: #030712; color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 1.5rem; min-height: 100vh; }
            .container { max-width: 1000px; margin: 0 auto; }
            
            /* Header */
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid #1f2937; padding-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem; }
            .title-area h1 { font-size: 1.25rem; font-weight: 800; color: #f9fafb; display: flex; align-items: center; gap: 8px; }
            .title-area p { font-size: 0.8rem; color: #9ca3af; margin-top: 2px; }
            .badge-secure { background: #064e3b; color: #34d399; font-size: 0.7rem; font-weight: 700; padding: 3px 8px; border-radius: 4px; border: 1px solid #059669; }

            /* Stats Grid */
            .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-bottom: 1.25rem; }
            .stat-card { background: #111827; border: 1px solid #1f2937; border-radius: 8px; padding: 0.85rem 1rem; }
            .stat-label { font-size: 0.72rem; text-transform: uppercase; color: #6b7280; font-weight: 700; letter-spacing: 0.5px; }
            .stat-val { font-size: 0.95rem; font-weight: 700; color: #10b981; margin-top: 4px; font-family: monospace; }
            .stat-val.secondary { color: #60a5fa; }
            .stat-val.warning { color: #fbbf24; }

            /* Action Buttons Bar */
            .actions-bar { background: #111827; border: 1px solid #1f2937; border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem; }
            .actions-title { font-size: 0.75rem; font-weight: 700; color: #9ca3af; text-transform: uppercase; margin-bottom: 0.75rem; letter-spacing: 0.5px; }
            .btn-group { display: flex; flex-wrap: wrap; gap: 0.5rem; }
            .btn { background: #1f2937; color: #e5e7eb; border: 1px solid #374151; padding: 0.5rem 0.85rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s ease; }
            .btn:hover { background: #374151; border-color: #4b5563; color: #fff; }
            .btn-primary { background: #059669; border-color: #10b981; color: #ffffff; font-weight: 700; }
            .btn-primary:hover { background: #047857; }
            .btn-accent { background: #2563eb; border-color: #3b82f6; color: #fff; }
            .btn-accent:hover { background: #1d4ed8; }
            .btn-warning { background: #d97706; border-color: #f59e0b; color: #fff; }
            .btn-warning:hover { background: #b45309; }

            /* Terminal Window */
            .terminal-window { background: #090d16; border: 1px solid #1f2937; border-radius: 8px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); }
            .terminal-titlebar { background: #111827; border-bottom: 1px solid #1f2937; padding: 0.6rem 1rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #9ca3af; font-family: monospace; }
            .window-dots { display: flex; gap: 6px; }
            .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
            .dot.red { background: #ef4444; }
            .dot.yellow { background: #f59e0b; }
            .dot.green { background: #10b981; }

            /* Terminal Screen */
            .terminal-body { height: 380px; overflow-y: auto; padding: 1rem; font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace; font-size: 0.82rem; line-height: 1.6; color: #e5e7eb; background: #050811; }
            .log-entry { margin-bottom: 0.75rem; white-space: pre-wrap; word-break: break-all; }
            .log-entry .prompt-line { color: #38bdf8; font-weight: 700; }
            .log-entry .timestamp { color: #64748b; font-size: 0.75rem; margin-right: 6px; }
            .log-entry.success { color: #34d399; }
            .log-entry.error { color: #f87171; }
            .log-entry.system { color: #a78bfa; }

            /* Terminal Input */
            .terminal-input-bar { background: #111827; border-top: 1px solid #1f2937; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.5rem; }
            .input-prefix { font-family: monospace; color: #10b981; font-weight: 700; font-size: 0.85rem; white-space: nowrap; }
            .input-field { flex: 1; background: #030712; border: 1px solid #374151; padding: 0.55rem 0.85rem; border-radius: 6px; color: #f9fafb; font-family: monospace; font-size: 0.85rem; outline: none; }
            .input-field:focus { border-color: #10b981; }
            .btn-exec { background: #10b981; color: #042f2e; font-weight: 700; border: none; padding: 0.55rem 1rem; border-radius: 6px; font-size: 0.8rem; cursor: pointer; }
            .btn-exec:hover { background: #059669; color: #fff; }
            .btn-clear { background: #374151; color: #d1d5db; border: none; padding: 0.55rem 0.75rem; border-radius: 6px; font-size: 0.8rem; cursor: pointer; }
            .btn-clear:hover { background: #4b5563; }
        </style>
    </head>
    <body>
        <div class="container">
            
            <div class="header">
                <div class="title-area">
                    <h1>⚡ Pasca Artisan Web Terminal <span class="badge-secure">PROTECTED</span></h1>
                    <p>Live Console & Deployment Suite untuk Shared Hosting cPanel tanpa SSH Terminal</p>
                </div>
                <div>
                    <a href="/" target="_blank" class="btn">🌐 Buka Website Utama</a>
                </div>
            </div>

            <!-- Stats -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">PHP Version</div>
                    <div class="stat-val">{$phpVersion}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Laravel Framework</div>
                    <div class="stat-val secondary">v{$laravelVersion}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Status Database</div>
                    <div class="stat-val">{$dbStatus}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">Storage Public</div>
                    <div class="stat-val warning">{$storageStatus}</div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="actions-bar">
                <div class="actions-title">🚀 Tombol Pintas Tindakan (Quick Action 1-Klik)</div>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="runCmd('all-setup')">⚡ All-in-One (Migrate + Seed + Storage + Cache)</button>
                    <button class="btn btn-accent" onclick="runCmd('migrate --force')">🗄️ Migrate Database</button>
                    <button class="btn btn-accent" onclick="runCmd('db:seed --force')">🌱 Seed Data Awal</button>
                    <button class="btn btn-warning" onclick="runCmd('smart-storage')">🔗 Smart Storage Sync (Anti-Error 500)</button>
                    <button class="btn" onclick="runCmd('optimize:clear')">🧹 Clear Cache & Config</button>
                    <button class="btn" onclick="runCmd('migrate:status')">📊 Migrate Status</button>
                    <button class="btn" onclick="runCmd('route:list')">📜 List Routes</button>
                    <button class="btn" onclick="location.reload()">🔄 Refresh Status</button>
                </div>
            </div>

            <!-- Terminal Window -->
            <div class="terminal-window">
                <div class="terminal-titlebar">
                    <div class="window-dots">
                        <span class="dot red"></span>
                        <span class="dot yellow"></span>
                        <span class="dot green"></span>
                    </div>
                    <div>iais9713@pasca-cpanel: ~/public_html/pasca</div>
                    <div>bash / artisan v{$laravelVersion}</div>
                </div>

                <div class="terminal-body" id="termBody">
                    <div class="log-entry system">
                        <span class="timestamp">[" . date('H:i:s') . "]</span>
                        🚀 <strong>PASCA ARTISAN WEB CONSOLE v2.0 READY</strong><br>
                        Gunakan tombol di atas atau ketik perintah artisan bebas di bawah (contoh: <code>migrate</code>, <code>db:seed</code>, <code>optimize:clear</code>).
                    </div>
                </div>

                <form class="terminal-input-bar" id="cmdForm">
                    <span class="input-prefix">php artisan &gt;</span>
                    <input type="text" class="input-field" id="cmdInput" placeholder="ketik perintah artisan... (tekan enter)" autocomplete="off" autofocus>
                    <button type="submit" class="btn-exec" id="btnExec">Eksekusi</button>
                    <button type="button" class="btn-clear" onclick="clearTerminal()">Clear</button>
                </form>
            </div>

        </div>

        <script>
            var secretKey = '{$secretSafe}';
            var termBody = document.getElementById('termBody');
            var cmdInput = document.getElementById('cmdInput');
            var btnExec = document.getElementById('btnExec');
            var cmdHistory = [];
            var historyIdx = -1;

            function scrollToBottom() {
                termBody.scrollTop = termBody.scrollHeight;
            }

            function clearTerminal() {
                termBody.innerHTML = '<div class="log-entry system">Console cleared. Siap menerima perintah baru.</div>';
            }

            function runCmd(command) {
                if (!command) return;
                cmdInput.value = command;
                document.getElementById('cmdForm').dispatchEvent(new Event('submit'));
            }

            document.getElementById('cmdForm').addEventListener('submit', function(e) {
                e.preventDefault();
                var cmd = cmdInput.value.trim();
                if (!cmd) return;

                cmdHistory.unshift(cmd);
                historyIdx = -1;

                // Tampilkan command di terminal
                var time = new Date().toLocaleTimeString();
                var entry = document.createElement('div');
                entry.className = 'log-entry';
                entry.innerHTML = '<span class="timestamp">[' + time + ']</span> <span class="prompt-line">php artisan ' + escapeHtml(cmd) + '</span><br><span style="color:#94a3b8;">⏳ Sedang mengeksekusi...</span>';
                termBody.appendChild(entry);
                scrollToBottom();

                cmdInput.value = '';
                btnExec.disabled = true;
                btnExec.innerText = 'Running...';

                fetch('/terminal/' + encodeURIComponent(secretKey), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    body: 'command=' + encodeURIComponent(cmd)
                })
                .then(function(res) { return res.json(); })
                .then(function(data) {
                    var outClass = data.success ? 'success' : 'error';
                    entry.innerHTML = '<span class="timestamp">[' + (data.timestamp || time) + ']</span> <span class="prompt-line">php artisan ' + escapeHtml(data.command || cmd) + '</span><br>' + escapeHtml(data.output || '(No output)');
                    entry.className = 'log-entry ' + outClass;
                    scrollToBottom();
                })
                .catch(function(err) {
                    entry.innerHTML = '<span class="timestamp">[' + time + ']</span> <span class="prompt-line">php artisan ' + escapeHtml(cmd) + '</span><br>❌ Request Error: ' + escapeHtml(err.message);
                    entry.className = 'log-entry error';
                    scrollToBottom();
                })
                .finally(function() {
                    btnExec.disabled = false;
                    btnExec.innerText = 'Eksekusi';
                    cmdInput.focus();
                });
            });

            // Panah atas & bawah untuk riwayat perintah
            cmdInput.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowUp') {
                    if (cmdHistory.length > 0 && historyIdx < cmdHistory.length - 1) {
                        historyIdx++;
                        cmdInput.value = cmdHistory[historyIdx];
                    }
                } else if (e.key === 'ArrowDown') {
                    if (historyIdx > 0) {
                        historyIdx--;
                        cmdInput.value = cmdHistory[historyIdx];
                    } else if (historyIdx === 0) {
                        historyIdx = -1;
                        cmdInput.value = '';
                    }
                }
            });

            function escapeHtml(text) {
                var div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }
        </script>
    </body>
    </html>
    HTML;

    return response($html);
});

// Shortcut lama diarahkan ke terminal
Route::get('/jalankan-migrate-seed', function () {
    return redirect('/terminal/pasca2026persis');
});

