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
        $visimisi = VisiMisi::firstOrCreate(
            ['id' => 1],
            [
                'visi' => '',
                'misi' => [],
                'tujuan' => []
            ]
        );

        return Inertia::render('Admin/Profil/VisiMisi', [
            'visimisi' => $visimisi
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'visi' => 'required|string',
            'misi' => 'nullable|array',
            'tujuan' => 'nullable|array',
            'gambar_banner' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'deskripsi_banner' => 'nullable|string',
            'gambar_bg' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $visimisi = VisiMisi::firstOrCreate(
            ['id' => 1],
            [
                'visi' => '',
                'misi' => [],
                'tujuan' => []
            ]
        );

        $misiList = array_values(array_filter(
            (array) ($request->misi ?? []),
            fn($item) => !is_null($item) && trim((string)$item) !== ''
        ));

        $tujuanList = array_values(array_filter(
            (array) ($request->tujuan ?? []),
            fn($item) => !is_null($item) && trim((string)$item) !== ''
        ));
        
        $data = [
            'visi' => $request->visi,
            'misi' => $misiList,
            'tujuan' => $tujuanList,
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
