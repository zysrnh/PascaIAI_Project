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
Route::get('/laboratorium', function () {
    return redirect()->route('public.laboratorium.penyiaran');
})->name('public.laboratorium');

Route::get('/laboratorium/penyiaran', function () {
    return \Inertia\Inertia::render('Public/Laboratorium/Penyiaran');
})->name('public.laboratorium.penyiaran');

Route::get('/laboratorium/jurnalistik', function () {
    return \Inertia\Inertia::render('Public/Laboratorium/Jurnalistik');
})->name('public.laboratorium.jurnalistik');

Route::get('/laboratorium/podcast', function () {
    return \Inertia\Inertia::render('Public/Laboratorium/Podcast');
})->name('public.laboratorium.podcast');

Route::get('/laboratorium/film-pendek', function () {
    return \Inertia\Inertia::render('Public/Laboratorium/FilmPendek');
})->name('public.laboratorium.film-pendek');

Route::get('/laboratorium/fotografi', function () {
    return \Inertia\Inertia::render('Public/Laboratorium/Fotografi');
})->name('public.laboratorium.fotografi');

Route::get('/laboratorium/dakwah-digital', function () {
    return \Inertia\Inertia::render('Public/Laboratorium/DakwahDigital');
})->name('public.laboratorium.dakwah-digital');


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
    // Terminal & Git Console
    Route::get('/admin/terminal', [\App\Http\Controllers\TerminalController::class, 'index'])->name('admin.terminal.index');
    Route::post('/admin/terminal/execute', [\App\Http\Controllers\TerminalController::class, 'execute'])->name('admin.terminal.execute');
    Route::post('/admin/terminal/sync-build', [\App\Http\Controllers\TerminalController::class, 'syncBuild'])->name('admin.terminal.sync-build');
    Route::match(['get', 'post'], '/admin/terminal/pull-http', [\App\Http\Controllers\TerminalController::class, 'pullViaHttp'])->name('admin.terminal.pull-http');

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
    Route::match(['post', 'put'], '/admin/profil/tentang-kampus', [TentangKampusController::class, 'update'])->name('admin.profil.tentang-kampus.update');

    // Admin Profil - Sambutan Pimpinan
    Route::get('/admin/profil/sambutan-pimpinan', [\App\Http\Controllers\SambutanPimpinanController::class, 'edit'])->name('admin.profil.sambutan-pimpinan');
    Route::match(['post', 'put'], '/admin/profil/sambutan-pimpinan', [\App\Http\Controllers\SambutanPimpinanController::class, 'update'])->name('admin.profil.sambutan-pimpinan.update');

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

        // Tampilan Login / Masukkan Token (Flat Clean, Anti-Slop, No Emoji)
        return response(<<<HTML
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Terminal Access Lock - KPI Console</title>
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { background: #090d16; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 1rem; }
                .card { background: #0f172a; border: 1px solid #1e293b; padding: 2.25rem; border-radius: 12px; width: 100%; max-width: 400px; text-align: left; }
                .badge { font-family: monospace; color: #10b981; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.75rem; display: block; }
                h1 { font-size: 1.25rem; font-weight: 700; color: #f8fafc; margin-bottom: 0.35rem; }
                p { color: #94a3b8; font-size: 0.85rem; margin-bottom: 1.5rem; line-height: 1.5; }
                label { display: block; font-size: 0.75rem; font-weight: 600; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
                input { width: 100%; background: #020617; border: 1px solid #334155; padding: 0.75rem 1rem; border-radius: 8px; color: #f8fafc; font-size: 0.95rem; font-family: monospace; letter-spacing: 0.1em; margin-bottom: 1rem; outline: none; transition: border-color 0.15s; }
                input:focus { border-color: #10b981; }
                button { width: 100%; background: #10b981; color: #022c22; font-weight: 700; font-size: 0.9rem; padding: 0.75rem; border: none; border-radius: 8px; cursor: pointer; transition: background 0.15s, transform 0.1s; }
                button:hover { background: #059669; }
                button:active { transform: scale(0.98); }
                .err { color: #f43f5e; font-size: 0.8rem; margin-top: 0.75rem; display: none; }
            </style>
        </head>
        <body>
            <div class="card">
                <span class="badge">[ RESTRICTED CONSOLE ]</span>
                <h1>KPI Artisan Terminal</h1>
                <p>Masukkan token rahasia untuk membuka konsol perintah server tanpa terminal SSH.</p>
                <form id="authForm">
                    <label for="secretInput">Secret Access Token</label>
                    <input type="password" id="secretInput" placeholder="Masukkan token..." required autofocus>
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

        // Action: Git Pull / Auto-Sync via TerminalController (Pipeline 1-Klik)
        if (in_array(strtolower($cmd), ['git pull', 'pull', 'auto-sync', 'deploy', 'deploy:full', 'update'])) {
            return (new \App\Http\Controllers\TerminalController)->pullViaHttp(request());
        }

        // Action: Sync Build Assets
        if (in_array(strtolower($cmd), ['sync:build', 'sync-build', 'transfer-build'])) {
            return (new \App\Http\Controllers\TerminalController)->syncBuild(request());
        }

        // Action: View Logs
        if ($cmd === 'logs' || $cmd === 'tail-log' || $cmd === 'log' || $cmd === 'tail') {
            $logCandidates = [
                storage_path('logs/laravel.log'),
                '/home/iais9713/public_html/kpi.iaipibandung.ac.id/Uploads/storage/logs/laravel.log',
            ];
            $foundLog = null;
            foreach ($logCandidates as $cand) {
                if (file_exists($cand)) {
                    $foundLog = $cand;
                    break;
                }
            }
            if ($foundLog) {
                $lines = array_slice(file($foundLog), -100);
                return response()->json([
                    'success' => true,
                    'command' => 'tail -n 100 storage/logs/laravel.log',
                    'output' => trim(implode('', $lines)) ?: 'File log saat ini masih kosong.',
                    'timestamp' => date('H:i:s')
                ]);
            }
            return response()->json([
                'success' => false,
                'command' => 'tail laravel.log',
                'output' => 'File storage/logs/laravel.log belum ditemukan di server.'
            ]);
        }

        // Action: Smart Storage Sync
        if ($cmd === 'smart-storage' || $cmd === 'storage:link') {
            $target = storage_path('app/public');
            $targetCandidates = [
                storage_path('app/public'),
                '/home/iais9713/public_html/kpi.iaipibandung.ac.id/Uploads/storage/app/public',
                dirname(base_path()) . '/Uploads/storage/app/public',
            ];
            foreach ($targetCandidates as $tCand) {
                if (file_exists($tCand) && is_dir($tCand)) {
                    $target = $tCand;
                    break;
                }
            }
            $linkCandidates = [
                public_path('storage'),
                '/home/iais9713/public_html/kpi.iaipibandung.ac.id/storage',
                dirname(base_path()) . '/public_html/kpi.iaipibandung.ac.id/storage',
                dirname(dirname(base_path())) . '/public_html/kpi.iaipibandung.ac.id/storage',
            ];
            $link = public_path('storage');
            foreach ($linkCandidates as $cand) {
                if (file_exists(dirname($cand))) {
                    $link = $cand;
                    break;
                }
            }
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
                    $log[] = "[storage:link]\n" . \Illuminate\Support\Facades\Artisan::output();
                    $symlinkCreated = file_exists($link);
                } catch (\Throwable $e) {
                    $log[] = "[INFO] storage:link dilewati: " . $e->getMessage();
                }
            }

            if (!$symlinkCreated && !is_link($link)) {
                @mkdir($link, 0755, true);
                if (file_exists($target)) {
                    $copyRecursive($target, $link);
                    $log[] = "[STORAGE SYNC SUCCESS]";
                    $log[] = "Folder 'public/storage' siap dan {$copied} aset berkas tersinkronkan.";
                } else {
                    $log[] = "[INFO] Folder 'storage/app/public' belum memiliki aset file.";
                }
            } else {
                $log[] = "[STORAGE ACTIVE] Symlink 'public/storage' aktif dan siap melayani file berkas.";
            }

            return response()->json([
                'success' => true,
                'command' => 'storage:link (smart-sync)',
                'output' => implode("\n", $log),
                'timestamp' => date('H:i:s')
            ]);
        }

        // Action: All-in-One Automated Setup
        if ($cmd === 'all-setup') {
            $log = [];

            // 1. Migrate
            try {
                \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
                $log[] = "[MIGRATE SUCCESS]\n" . trim(\Illuminate\Support\Facades\Artisan::output());
            } catch (\Throwable $e) {
                $log[] = "[MIGRATE ERROR] " . $e->getMessage();
            }

            // 2. Seed (KpiSeeder)
            try {
                \Illuminate\Support\Facades\Artisan::call('db:seed', ['--class' => 'KpiSeeder', '--force' => true]);
                $log[] = "[SEED SUCCESS]\n" . trim(\Illuminate\Support\Facades\Artisan::output());
            } catch (\Throwable $e) {
                $log[] = "[SEED INFO] " . $e->getMessage();
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
            $log[] = "[STORAGE SYNC] Direktori 'public/storage' siap ({$copied} aset tersinkronkan).";

            // 4. Optimize Clear
            try {
                \Illuminate\Support\Facades\Artisan::call('optimize:clear');
                $log[] = "[CACHE CLEAR]\n" . trim(\Illuminate\Support\Facades\Artisan::output());
            } catch (\Throwable $e) {
                $log[] = "[CACHE ERROR] " . $e->getMessage();
            }

            return response()->json([
                'success' => true,
                'command' => 'all-setup (Migrate + Seed KPI + Storage + Cache)',
                'output' => implode("\n\n", $log),
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
                'output' => "[ERROR] " . $e->getMessage(),
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
        $driver = \Illuminate\Support\Facades\DB::connection()->getDriverName();
        if ($driver === 'sqlite') {
            $tables = \Illuminate\Support\Facades\DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
        } else {
            $tables = \Illuminate\Support\Facades\DB::select("SHOW TABLES");
        }
        $dbTablesCount = count($tables);
        $dbStatus = "Terhubung ({$dbTablesCount} tabel, {$driver})";
    } catch (\Throwable $e) {
        try {
            $tables = \Illuminate\Support\Facades\Schema::getTableListing();
            $dbTablesCount = count($tables);
            $dbStatus = "Terhubung ({$dbTablesCount} tabel, {$driver})";
        } catch (\Throwable $e2) {
            $dbStatus = 'Error: ' . substr($e->getMessage(), 0, 40);
        }
    }

    $linkPath = public_path('storage');
    $storageStatus = 'Belum Ada';
    if (is_link($linkPath)) {
        $storageStatus = 'Aktif (Symlink)';
    } elseif (is_dir($linkPath)) {
        $storageStatus = 'Aktif (Folder Native)';
    }

    $secretSafe = htmlspecialchars($providedKey, ENT_QUOTES, 'UTF-8');
    $currentTime = date('H:i:s');
    $csrfToken = csrf_token();

    $html = <<<HTML
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{$csrfToken}">
        <title>KPI Artisan Web Terminal (Deploy Console)</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { background: #090d16; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 1.5rem; min-height: 100vh; }
            .container { max-width: 1040px; margin: 0 auto; }
            
            /* Header */
            .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; border-bottom: 1px solid #1e293b; padding-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem; }
            .title-area h1 { font-size: 1.2rem; font-weight: 700; color: #f8fafc; display: flex; align-items: center; gap: 8px; letter-spacing: -0.01em; }
            .title-area p { font-size: 0.8rem; color: #94a3b8; margin-top: 3px; }
            .badge-secure { background: #064e3b; color: #34d399; font-size: 0.68rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; border: 1px solid #059669; font-family: monospace; letter-spacing: 0.05em; }

            /* Stats Grid */
            .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 0.75rem; margin-bottom: 1.25rem; }
            .stat-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 0.85rem 1rem; }
            .stat-label { font-size: 0.7rem; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.06em; font-family: monospace; }
            .stat-val { font-size: 0.95rem; font-weight: 600; color: #10b981; margin-top: 4px; font-family: 'JetBrains Mono', Consolas, monospace; }
            .stat-val.secondary { color: #38bdf8; }
            .stat-val.warning { color: #f59e0b; }

            /* Action Buttons Bar */
            .actions-bar { background: #0f172a; border: 1px solid #1e293b; border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem; }
            .actions-title { font-size: 0.72rem; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 0.75rem; letter-spacing: 0.06em; font-family: monospace; }
            .btn-group { display: flex; flex-wrap: wrap; gap: 0.5rem; }
            .btn { background: #1e293b; color: #e2e8f0; border: 1px solid #334155; padding: 0.5rem 0.85rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: all 0.15s ease; font-family: 'JetBrains Mono', Consolas, monospace; user-select: none; }
            .btn:hover { background: #334155; border-color: #475569; color: #fff; }
            .btn:active { transform: scale(0.96); }
            .btn-primary { background: #064e3b; border-color: #059669; color: #34d399; font-weight: 700; }
            .btn-primary:hover { background: #047857; color: #fff; }
            .btn-outline { background: transparent; border-color: #334155; color: #94a3b8; }
            .btn-outline:hover { background: #1e293b; color: #fff; border-color: #64748b; }

            /* Terminal Window */
            .terminal-window { background: #020617; border: 1px solid #1e293b; border-radius: 8px; overflow: hidden; }
            .terminal-titlebar { background: #0f172a; border-bottom: 1px solid #1e293b; padding: 0.6rem 1rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #94a3b8; font-family: 'JetBrains Mono', Consolas, monospace; }
            .window-dots { display: flex; gap: 6px; }
            .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
            .dot.red { background: #ef4444; }
            .dot.yellow { background: #f59e0b; }
            .dot.green { background: #10b981; }

            /* Terminal Screen */
            .terminal-body { height: 380px; overflow-y: auto; padding: 1rem; font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace; font-size: 0.82rem; line-height: 1.6; color: #e2e8f0; background: #020617; }
            .log-entry { margin-bottom: 0.75rem; white-space: pre-wrap; word-break: break-all; }
            .log-entry .prompt-line { color: #38bdf8; font-weight: 700; }
            .log-entry .timestamp { color: #475569; font-size: 0.75rem; margin-right: 6px; }
            .log-entry.success { color: #34d399; }
            .log-entry.error { color: #fb7185; }
            .log-entry.system { color: #94a3b8; }

            /* Terminal Input */
            .terminal-input-bar { background: #0f172a; border-top: 1px solid #1e293b; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.5rem; }
            .input-prefix { font-family: 'JetBrains Mono', Consolas, monospace; color: #10b981; font-weight: 700; font-size: 0.85rem; white-space: nowrap; }
            .input-field { flex: 1; background: #020617; border: 1px solid #334155; padding: 0.55rem 0.85rem; border-radius: 6px; color: #f8fafc; font-family: 'JetBrains Mono', Consolas, monospace; font-size: 0.85rem; outline: none; }
            .input-field:focus { border-color: #10b981; }
            .btn-exec { background: #10b981; color: #022c22; font-weight: 700; border: none; padding: 0.55rem 1rem; border-radius: 6px; font-size: 0.8rem; cursor: pointer; font-family: 'JetBrains Mono', Consolas, monospace; }
            .btn-exec:hover { background: #059669; }
            .btn-exec:active { transform: scale(0.96); }
            .btn-clear { background: #1e293b; color: #cbd5e1; border: 1px solid #334155; padding: 0.55rem 0.75rem; border-radius: 6px; font-size: 0.8rem; cursor: pointer; font-family: 'JetBrains Mono', Consolas, monospace; }
            .btn-clear:hover { background: #334155; color: #fff; }
        </style>
    </head>
    <body>
        <div class="container">
            
            <div class="header">
                <div class="title-area">
                    <h1>KPI Artisan Console <span class="badge-secure">AUTHENTICATED</span></h1>
                    <p>Live Console & Deployment Suite untuk cPanel tanpa SSH Terminal</p>
                </div>
                <div>
                    <a href="/" target="_blank" class="btn btn-outline">[ Buka Website Utama ]</a>
                </div>
            </div>

            <!-- Stats -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-label">PHP VERSION</div>
                    <div class="stat-val">{$phpVersion}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">LARAVEL FRAMEWORK</div>
                    <div class="stat-val secondary">v{$laravelVersion}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">DATABASE CONNECTION</div>
                    <div class="stat-val">{$dbStatus}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">STORAGE PUBLIC</div>
                    <div class="stat-val warning">{$storageStatus}</div>
                </div>
            </div>

            <!-- Action Buttons Bar (Clean Monospace Buttons) -->
            <div class="actions-bar">
                <div class="actions-title">PINTASAN PERINTAH DEPLOYMENT</div>
                <div class="btn-group">
                    <button type="button" class="btn btn-primary" onclick="window.runCmd('git pull')">[ 🚀 Auto-Sync GitHub (1-Klik Pipeline) ]</button>
                    <button type="button" class="btn" onclick="window.runCmd('sync:build')">[ 📦 Sync Build Assets ]</button>
                    <button type="button" class="btn" onclick="window.runCmd('all-setup')">[ All-in-One Setup ]</button>
                    <button type="button" class="btn" onclick="window.runCmd('migrate')">[ Migrate ]</button>
                    <button type="button" class="btn" onclick="window.runCmd('db:seed --class=KpiSeeder')">[ Seed KPI Data ]</button>
                    <button type="button" class="btn" onclick="window.runCmd('storage:link')">[ Storage Sync ]</button>
                    <button type="button" class="btn" onclick="window.runCmd('optimize:clear')">[ Clear Cache ]</button>
                    <button type="button" class="btn" onclick="window.runCmd('migrate:status')">[ Migrate Status ]</button>
                    <button type="button" class="btn" onclick="window.runCmd('route:list')">[ Route List ]</button>
                    <button type="button" class="btn btn-outline" onclick="location.reload()">[ Refresh ]</button>
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
                    <div>kpi@iaipersis-server: ~/public_html</div>
                    <div>artisan v{$laravelVersion}</div>
                </div>

                <div class="terminal-body" id="termBody">
                    <div class="log-entry system">
                        <span class="timestamp">[{$currentTime}]</span>
                        <strong>KPI ARTISAN WEB CONSOLE READY</strong><br>
                        Klik tombol pintasan di atas atau ketik perintah artisan di bawah (contoh: migrate, db:seed, optimize:clear).
                    </div>
                </div>

                <form class="terminal-input-bar" id="cmdForm">
                    <span class="input-prefix">php artisan &gt;</span>
                    <input type="text" class="input-field" id="cmdInput" placeholder="ketik perintah artisan... (tekan enter)" autocomplete="off" autofocus>
                    <button type="submit" class="btn-exec" id="btnExec">Eksekusi</button>
                    <button type="button" class="btn-clear" onclick="window.clearTerminal()">Clear</button>
                </form>
            </div>

        </div>

        <script>
            var secretKey = '{$secretSafe}';
            var csrfToken = '{$csrfToken}';

            function getEl(id) {
                return document.getElementById(id);
            }

            function escapeHtml(text) {
                if (!text) return '';
                var div = document.createElement('div');
                div.textContent = String(text);
                return div.innerHTML;
            }

            function scrollToBottom() {
                var tb = getEl('termBody');
                if (tb) tb.scrollTop = tb.scrollHeight;
            }

            window.clearTerminal = function() {
                var tb = getEl('termBody');
                if (tb) tb.innerHTML = '<div class="log-entry system">Console cleared. Siap menerima perintah baru.</div>';
            };

            // Global Command Execution Engine
            window.executeCommand = function(cmd) {
                if (!cmd) return;
                var trimmed = String(cmd).trim();
                if (!trimmed) return;

                var tb = getEl('termBody');
                var inp = getEl('cmdInput');
                var btn = getEl('btnExec');

                if (inp) inp.value = '';
                if (btn) {
                    btn.disabled = true;
                    btn.innerText = 'Running...';
                }

                var time = new Date().toLocaleTimeString();
                var entry = document.createElement('div');
                entry.className = 'log-entry';
                entry.innerHTML = '<span class="timestamp">[' + time + ']</span> <span class="prompt-line">php artisan ' + escapeHtml(trimmed) + '</span><br><span style="color:#64748b;">Menjalankan perintah ke server...</span>';
                if (tb) {
                    tb.appendChild(entry);
                    scrollToBottom();
                }

                fetch('/terminal/' + encodeURIComponent(secretKey), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': csrfToken
                    },
                    body: 'command=' + encodeURIComponent(trimmed) + '&_token=' + encodeURIComponent(csrfToken)
                })
                .then(function(res) {
                    if (!res.ok) {
                        return res.text().then(function(t) {
                            throw new Error('HTTP ' + res.status + ' - ' + t.substring(0, 120));
                        });
                    }
                    return res.json();
                })
                .then(function(data) {
                    var outClass = data.success ? 'success' : 'error';
                    var resTime = data.timestamp || new Date().toLocaleTimeString();
                    var resEntry = document.createElement('div');
                    resEntry.className = 'log-entry ' + outClass;
                    var formattedOutput = escapeHtml(data.output);
                    resEntry.innerHTML = '<span class="timestamp">[' + resTime + ']</span><br>' + formattedOutput;
                    if (tb) {
                        tb.appendChild(resEntry);
                        scrollToBottom();
                    }
                })
                .catch(function(err) {
                    var resEntry = document.createElement('div');
                    resEntry.className = 'log-entry error';
                    resEntry.innerHTML = '[ERROR EKSEKUSI] ' + escapeHtml(err.message);
                    if (tb) {
                        tb.appendChild(resEntry);
                        scrollToBottom();
                    }
                })
                .finally(function() {
                    if (btn) {
                        btn.disabled = false;
                        btn.innerText = 'Eksekusi';
                    }
                    if (inp) inp.focus();
                });
            };

            // Global Shortcut Caller
            window.runCmd = function(command) {
                window.executeCommand(command);
            };

            // Form Submit Listener
            document.addEventListener('DOMContentLoaded', function() {
                var form = getEl('cmdForm');
                if (form) {
                    form.addEventListener('submit', function(e) {
                        e.preventDefault();
                        var inp = getEl('cmdInput');
                        var cmd = inp ? inp.value : '';
                        window.executeCommand(cmd);
                    });
                }
            });
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

// Route Inisialisasi Akun Developer (naodev) Sekali Klik untuk Hosting
Route::get('/init-naodev', function () {
    $user = \App\Models\User::updateOrCreate(
        ['email' => 'naodev@iaipibandung.ac.id'],
        [
            'name' => 'NAO Developer',
            'password' => \Illuminate\Support\Facades\Hash::make('password123'),
            'role' => 'dev',
        ]
    );

    $html = <<<HTML
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Aktivasi Akun Developer - KPI IAI Persis</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #020617; color: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
            .card { background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 2.5rem 2rem; max-width: 480px; width: 100%; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); text-align: center; }
            .badge { display: inline-block; padding: 0.25rem 0.75rem; background: #064e3b; border: 1px solid #059669; color: #6ee7b7; border-radius: 4px; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 1rem; }
            h2 { font-size: 1.5rem; font-weight: 700; margin: 0 0 0.5rem 0; color: #ffffff; }
            p { font-size: 0.875rem; color: #94a3b8; line-height: 1.5; margin-bottom: 1.5rem; }
            .info-box { background: #020617; border: 1px solid #1e293b; border-radius: 8px; padding: 1.25rem; text-align: left; margin-bottom: 1.5rem; font-family: monospace; font-size: 0.85rem; }
            .info-row { display: flex; justify-content: space-between; padding: 0.35rem 0; border-bottom: 1px solid #0f172a; }
            .info-row:last-child { border-bottom: none; }
            .info-label { color: #64748b; }
            .info-val { color: #38bdf8; font-weight: 600; }
            .btn { display: block; background: #0284c7; color: white; padding: 0.75rem 1.5rem; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.875rem; transition: background 0.2s; }
            .btn:hover { background: #0369a1; }
        </style>
    </head>
    <body>
        <div class="card">
            <span class="badge">Aktivasi Sukses</span>
            <h2>Akun Developer Siap Digunakan!</h2>
            <p>Akun developer khusus untuk akses Terminal Console & Manajemen Sistem telah berhasil dibuat di database.</p>
            <div class="info-box">
                <div class="info-row"><span class="info-label">Nama:</span> <span class="info-val">NAO Developer</span></div>
                <div class="info-row"><span class="info-label">Email:</span> <span class="info-val">naodev@iaipibandung.ac.id</span></div>
                <div class="info-row"><span class="info-label">Role:</span> <span class="info-val">dev</span></div>
                <div class="info-row"><span class="info-label">Password:</span> <span class="info-val">password123</span></div>
            </div>
            <a href="/login" class="btn">Masuk ke Halaman Login &rarr;</a>
        </div>
    </body>
    </html>
HTML;

    return response($html);
});
