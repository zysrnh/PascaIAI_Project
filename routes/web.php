<?php

use App\Http\Controllers\ProfileController;

use App\Http\Controllers\TentangKampusController;
use App\Http\Controllers\SambutanPimpinanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
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
Route::get('/fakultas/daftarfakultas', [\App\Http\Controllers\FakultasController::class, 'publicIndex'])->name('public.fakultas');
Route::get('/fakultas/programstudi', [\App\Http\Controllers\ProgramStudiController::class, 'publicIndex'])->name('public.program_studi');
Route::get('/fakultas/dosen', [\App\Http\Controllers\DosenController::class, 'indexPublic'])->name('public.dosen');
Route::get('/fakultas/prospek-karir', [\App\Http\Controllers\ProspekKarirController::class, 'publicIndex'])->name('public.prospek-karir');

Route::get('/akademik/kalender-akademik', [\App\Http\Controllers\KalenderAkademikController::class, 'publicIndex'])->name('public.akademik.kalender');
Route::get('/akademik/jadwal-perkuliahan', [\App\Http\Controllers\JadwalPerkuliahanController::class, 'publicIndex'])->name('public.akademik.jadwal');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Profil - Tentang Kampus
    Route::get('/admin/profil/tentang-kampus', [TentangKampusController::class, 'edit'])->name('admin.profil.tentang-kampus');
    Route::put('/admin/profil/tentang-kampus', [TentangKampusController::class, 'update'])->name('admin.profil.tentang-kampus.update');

    // Admin Profil - Sambutan Pimpinan
    Route::get('/admin/profil/sambutan-pimpinan', [SambutanPimpinanController::class, 'edit'])->name('admin.profil.sambutan-pimpinan');
    Route::post('/admin/profil/sambutan-pimpinan', [SambutanPimpinanController::class, 'update'])->name('admin.profil.sambutan-pimpinan.update');

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
});

require __DIR__.'/auth.php';
