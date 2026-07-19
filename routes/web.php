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
});

require __DIR__.'/auth.php';
