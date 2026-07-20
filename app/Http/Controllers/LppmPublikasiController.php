<?php

namespace App\Http\Controllers;

use App\Models\LppmPublikasi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class LppmPublikasiController extends Controller
{
    public function indexPublic()
    {
        $publikasi = LppmPublikasi::firstOrCreate(
            ['id' => 1],
            [
                'judul' => 'Publikasi (Jurnal & Buku)',
                'deskripsi_jurnal' => 'Daftar jurnal terbitan institusi...',
                'jurnals' => [['nama_jurnal' => '', 'issn' => '', 'link_ojs' => '', 'sinta' => '']],
                'deskripsi_buku' => 'Karya buku dosen...',
                'bukus' => [['judul' => '', 'penulis' => '', 'tahun' => '', 'penerbit' => '', 'isbn' => '', 'link' => '']],
                'deskripsi_artikel' => 'Profil publikasi dosen...',
                'links_scholar' => [['nama_dosen' => '', 'link_scholar' => '', 'link_scopus' => '']]
            ]
        );

        return Inertia::render('Public/LPPM/Publikasi', [
            'publikasi' => $publikasi
        ]);
    }

    public function edit()
    {
        $publikasi = LppmPublikasi::firstOrCreate(
            ['id' => 1],
            [
                'judul' => 'Publikasi (Jurnal & Buku)',
                'deskripsi_jurnal' => 'Daftar jurnal terbitan institusi...',
                'jurnals' => [['nama_jurnal' => '', 'issn' => '', 'link_ojs' => '', 'sinta' => '']],
                'deskripsi_buku' => 'Karya buku dosen...',
                'bukus' => [['judul' => '', 'penulis' => '', 'tahun' => '', 'penerbit' => '', 'isbn' => '', 'link' => '']],
                'deskripsi_artikel' => 'Profil publikasi dosen...',
                'links_scholar' => [['nama_dosen' => '', 'link_scholar' => '', 'link_scopus' => '']]
            ]
        );

        return Inertia::render('Admin/LPPM/Publikasi/Index', [
            'publikasi' => $publikasi
        ]);
    }

    public function update(Request $request)
    {
        $publikasi = LppmPublikasi::firstOrFail();

        $validated = $request->validate([
            'judul' => 'nullable|string',
            'deskripsi_banner' => 'nullable|string',
            'banner_image' => 'nullable|image|max:2048',
            'deskripsi_jurnal' => 'nullable|string',
            'jurnals' => 'nullable|array',
            'deskripsi_buku' => 'nullable|string',
            'bukus' => 'nullable|array',
            'deskripsi_artikel' => 'nullable|string',
            'links_scholar' => 'nullable|array',
        ]);

        if ($request->hasFile('banner_image')) {
            if ($publikasi->banner_image && strpos($publikasi->banner_image, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $publikasi->banner_image));
            }
            $path = $request->file('banner_image')->store('lppm/banner', 'public');
            $validated['banner_image'] = '/storage/' . $path;
        }

        $publikasi->update($validated);

        return redirect()->back()->with('success', 'Halaman Publikasi berhasil diperbarui.');
    }
}
