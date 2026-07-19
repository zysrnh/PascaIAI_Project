<?php

namespace App\Http\Controllers;

use App\Models\TentangKampus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TentangKampusController extends Controller
{
    public function edit()
    {
        $tentang = TentangKampus::firstOrCreate(
            ['id' => 1],
            [
                'judul' => 'Tentang Pascasarjana',
                'konten' => 'Pascasarjana Institut Agama Islam Persatuan Islam (IAI PERSIS) Bandung merupakan sekolah tinggi Islam terkemuka yang didirikan dengan komitmen kuat untuk melahirkan intelektual muslim yang kritis, transformatif, dan inovatif.',
                'video_url' => 'https://youtube.com',
                'pimpinan_nama' => 'Dr. H. Latief Awaludin, MA.ME.',
                'pimpinan_quotes' => 'Kami mendedikasikan institusi ini untuk mencetak lulusan yang tidak hanya unggul secara akademik...',
            ]
        );

        return Inertia::render('Admin/Profil/TentangKampus', [
            'tentang' => $tentang
        ]);
    }

    public function update(Request $request)
    {
        $tentang = TentangKampus::firstOrFail();

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'konten' => 'required|string',
            'video_url' => 'nullable|url',
            'gambar_banner' => 'nullable|image|max:2048',
            'tampilkan_pimpinan' => 'boolean',
        ]);

        if ($request->hasFile('gambar_banner')) {
            if ($tentang->gambar_banner && strpos($tentang->gambar_banner, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $tentang->gambar_banner));
            }
            $path = $request->file('gambar_banner')->store('profil', 'public');
            $validated['gambar_banner'] = '/storage/' . $path;
        }

        $tentang->update($validated);

        return redirect()->back()->with('success', 'Halaman Tentang Kampus berhasil diperbarui.');
    }
}
