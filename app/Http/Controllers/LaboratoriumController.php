<?php

namespace App\Http\Controllers;

use App\Models\Laboratorium;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class LaboratoriumController extends Controller
{
    // ==========================================
    // PUBLIC ROUTES (TAMPILAN MAHASISWA & PUBLIK)
    // ==========================================
    public function penyiaran()
    {
        $lab = Laboratorium::where('slug', 'penyiaran')->first();
        return Inertia::render('Public/Laboratorium/Penyiaran', ['lab' => $lab]);
    }

    public function jurnalistik()
    {
        $lab = Laboratorium::where('slug', 'jurnalistik')->first();
        return Inertia::render('Public/Laboratorium/Jurnalistik', ['lab' => $lab]);
    }

    public function podcast()
    {
        $lab = Laboratorium::where('slug', 'podcast')->first();
        return Inertia::render('Public/Laboratorium/Podcast', ['lab' => $lab]);
    }

    public function filmPendek()
    {
        $lab = Laboratorium::where('slug', 'film-pendek')->first();
        return Inertia::render('Public/Laboratorium/FilmPendek', ['lab' => $lab]);
    }

    public function fotografi()
    {
        $lab = Laboratorium::where('slug', 'fotografi')->first();
        return Inertia::render('Public/Laboratorium/Fotografi', ['lab' => $lab]);
    }

    public function dakwahDigital()
    {
        $lab = Laboratorium::where('slug', 'dakwah-digital')->first();
        return Inertia::render('Public/Laboratorium/DakwahDigital', ['lab' => $lab]);
    }

    // ==========================================
    // ADMIN ROUTES (MANAJEMEN DASHBOARD)
    // ==========================================
    public function indexAdmin(Request $request)
    {
        $labs = Laboratorium::all();
        $activeSlug = $request->query('slug', 'penyiaran');
        $activeLab = Laboratorium::where('slug', $activeSlug)->first() ?? $labs->first();

        return Inertia::render('Admin/Laboratorium/Index', [
            'labs' => $labs,
            'activeLab' => $activeLab,
            'activeSlug' => $activeLab ? $activeLab->slug : 'penyiaran'
        ]);
    }

    public function updateAdmin(Request $request, $slug)
    {
        $lab = Laboratorium::where('slug', $slug)->firstOrFail();

        $validated = $request->validate([
            'nama_lab' => 'required|string|max:255',
            'subjudul' => 'nullable|string',
            'deskripsi' => 'nullable|string',
            'badge_status' => 'nullable|string|max:255',
            'gambar_utama' => 'nullable',
            'jadwal_layanan' => 'nullable|string|max:255',
            'kontak_layanan' => 'nullable|string|max:255',
            'spesifikasi_alat' => 'nullable|array',
            'program_output' => 'nullable|array',
        ]);

        if ($request->hasFile('gambar_file')) {
            $request->validate([
                'gambar_file' => 'image|mimes:jpeg,png,jpg,webp|max:3072'
            ]);
            $path = $request->file('gambar_file')->store('laboratorium', 'public');
            $validated['gambar_utama'] = '/storage/' . $path;
        }

        $lab->update($validated);

        return redirect()->back()->with('success', 'Data ' . $lab->nama_lab . ' berhasil diperbarui!');
    }
}
