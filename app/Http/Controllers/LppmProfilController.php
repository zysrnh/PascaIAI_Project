<?php

namespace App\Http\Controllers;

use App\Models\LppmProfil;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class LppmProfilController extends Controller
{
    public function indexPublic()
    {
        $lppm = LppmProfil::firstOrCreate(
            ['id' => 1],
            [
                'profil_singkat' => 'Lembaga Penelitian dan Pengabdian kepada Masyarakat (LPPM) IAI Persis Bandung...',
                'visi' => 'Menjadi pusat riset dan pengabdian masyarakat yang unggul...',
                'misi' => '1. Menyelenggarakan penelitian...\n2. Melaksanakan pengabdian...',
                'kontak' => [
                    'email' => 'lppm@iaipibandung.ac.id',
                    'telepon' => '08123456789',
                    'alamat' => 'Ruang LPPM, Kampus IAI Persis Bandung'
                ]
            ]
        );

        return Inertia::render('Public/LPPM/Index', [
            'lppm' => $lppm
        ]);
    }

    public function edit()
    {
        $lppm = LppmProfil::firstOrCreate(
            ['id' => 1],
            [
                'profil_singkat' => 'Lembaga Penelitian dan Pengabdian kepada Masyarakat (LPPM) IAI Persis Bandung...',
                'visi' => 'Menjadi pusat riset dan pengabdian masyarakat yang unggul...',
                'misi' => '1. Menyelenggarakan penelitian...\n2. Melaksanakan pengabdian...',
                'kontak' => [
                    'email' => 'lppm@iaipibandung.ac.id',
                    'telepon' => '08123456789',
                    'alamat' => 'Ruang LPPM, Kampus IAI Persis Bandung'
                ]
            ]
        );

        return Inertia::render('Admin/LPPM/Profil/Index', [
            'lppm' => $lppm
        ]);
    }

    public function update(Request $request)
    {
        $lppm = LppmProfil::firstOrFail();

        $validated = $request->validate([
            'profil_singkat' => 'nullable|string',
            'sejarah' => 'nullable|string',
            'dasar_hukum' => 'nullable|string',
            'tupoksi_utama' => 'nullable|string',
            'visi' => 'nullable|string',
            'misi' => 'nullable|string',
            'struktur_organisasi' => 'nullable|array',
            'renstra_text' => 'nullable|string',
            'renstra_file' => 'nullable|mimes:pdf|max:10240',
            'kontak' => 'nullable|array',
            'sk_ketua_file' => 'nullable|mimes:pdf|max:10240',
            'banner_image' => 'nullable|image|max:2048',
            'deskripsi_banner' => 'nullable|string',
        ]);

        if ($request->hasFile('banner_image')) {
            if ($lppm->banner_image && strpos($lppm->banner_image, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $lppm->banner_image));
            }
            $path = $request->file('banner_image')->store('lppm/banner', 'public');
            $validated['banner_image'] = '/storage/' . $path;
        }

        if ($request->hasFile('renstra_file')) {
            if ($lppm->renstra_file && strpos($lppm->renstra_file, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $lppm->renstra_file));
            }
            $path = $request->file('renstra_file')->store('lppm/dokumen', 'public');
            $validated['renstra_file'] = '/storage/' . $path;
        }

        if ($request->hasFile('sk_ketua_file')) {
            if ($lppm->sk_ketua_file && strpos($lppm->sk_ketua_file, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $lppm->sk_ketua_file));
            }
            $path = $request->file('sk_ketua_file')->store('lppm/dokumen', 'public');
            $validated['sk_ketua_file'] = '/storage/' . $path;
        }

        $lppm->update($validated);

        return redirect()->back()->with('success', 'Profil LPPM berhasil diperbarui.');
    }
}
