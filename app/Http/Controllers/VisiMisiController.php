<?php

namespace App\Http\Controllers;

use App\Models\VisiMisi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VisiMisiController extends Controller
{
    public function edit()
    {
        $visimisi = VisiMisi::first();
        
        if (!$visimisi) {
            $visimisi = VisiMisi::create([
                'visi' => '',
                'misi' => [],
                'tujuan' => []
            ]);
        }

        return Inertia::render('Admin/Profil/VisiMisi', [
            'visimisi' => $visimisi
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'visi' => 'required|string',
            'misi' => 'required|array',
            'misi.*' => 'required|string',
            'tujuan' => 'required|array',
            'tujuan.*' => 'required|string',
            'gambar_banner' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'deskripsi_banner' => 'nullable|string',
            'gambar_bg' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $visimisi = VisiMisi::first();
        
        $data = [
            'visi' => $request->visi,
            'misi' => $request->misi,
            'tujuan' => $request->tujuan,
            'deskripsi_banner' => $request->deskripsi_banner,
        ];

        // Handle Banner Upload
        if ($request->hasFile('gambar_banner')) {
            if ($visimisi->gambar_banner && !str_starts_with($visimisi->gambar_banner, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $visimisi->gambar_banner));
            }
            $bannerPath = $request->file('gambar_banner')->store('profil', 'public');
            $data['gambar_banner'] = '/storage/' . $bannerPath;
        }

        // Handle Background Upload
        if ($request->hasFile('gambar_bg')) {
            if ($visimisi->gambar_bg && !str_starts_with($visimisi->gambar_bg, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $visimisi->gambar_bg));
            }
            $bgPath = $request->file('gambar_bg')->store('profil', 'public');
            $data['gambar_bg'] = '/storage/' . $bgPath;
        }

        $visimisi->update($data);

        return redirect()->back()->with('success', 'Halaman Visi, Misi & Tujuan berhasil diperbarui.');
    }
}
