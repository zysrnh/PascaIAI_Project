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
                'pimpinan_detail' => 'Dr. H. Latief Awaludin, MA.ME. merupakan Direktur Pascasarjana IAI Persis Bandung. Beliau mendedikasikan hidupnya untuk pengembangan pendidikan Islam.',
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
            'pimpinan_nama' => 'nullable|string|max:255',
            'pimpinan_quotes' => 'nullable|string',
            'pimpinan_detail' => 'nullable|string',
            'gambar_pimpinan' => 'nullable|image|max:2048',
            'deskripsi_banner' => 'nullable|string',
        ]);

        if ($request->hasFile('gambar_banner')) {
            if ($tentang->gambar_banner && strpos($tentang->gambar_banner, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $tentang->gambar_banner));
            }
            $path = $request->file('gambar_banner')->store('profil', 'public');
            $validated['gambar_banner'] = '/storage/' . $path;
        }

        if ($request->hasFile('gambar_pimpinan')) {
            if ($tentang->gambar_pimpinan && strpos($tentang->gambar_pimpinan, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $tentang->gambar_pimpinan));
            }
            $path = $request->file('gambar_pimpinan')->store('profil', 'public');
            $validated['gambar_pimpinan'] = '/storage/' . $path;
        }

        $tentang->update($validated);

        return redirect()->back()->with('success', 'Halaman Tentang Kampus berhasil diperbarui.');
    }
}
