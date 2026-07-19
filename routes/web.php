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
    Route::post('/admin/profil/struktur-organisasi/bulk-destroy', [\App\Http\Controllers\StrukturOrganisasiController::class, 'bulkDestroy'])->name('admin.profil.struktur-organisasi.bulk-destroy');
    Route::resource('/admin/profil/struktur-organisasi', \App\Http\Controllers\StrukturOrganisasiController::class)->names([
        'index' => 'admin.profil.struktur-organisasi.index',
        'create' => 'admin.profil.struktur-organisasi.create',
        'store' => 'admin.profil.struktur-organisasi.store',
        'edit' => 'admin.profil.struktur-organisasi.edit',
        'update' => 'admin.profil.struktur-organisasi.update',
        'destroy' => 'admin.profil.struktur-organisasi.destroy',
    ]);
});

require __DIR__.'/auth.php';
