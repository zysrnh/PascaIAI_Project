<?php

namespace App\Http\Controllers;

use App\Models\SistemAkademik;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SistemAkademikController extends Controller
{
    /**
     * Display the public view for Sistem Akademik.
     */
    public function indexPublic()
    {
        $siakad = SistemAkademik::firstOrCreate(
            ['id' => 1],
            [
                'judul' => 'Sistem Informasi Akademik (SIAKAD)',
                'deskripsi_singkat' => 'Gerbang utama menuju portal akademik terpadu Pascasarjana IAI Persis Bandung. Melalui SIAKAD, seluruh aktivitas administrasi akademik dapat diakses secara mudah dan terpusat.',
                'fitur_list' => [
                    'Pengisian Kartu Rencana Studi (KRS) online',
                    'Melihat Kartu Hasil Studi (KHS) dan Transkrip Nilai',
                    'Mengecek Jadwal Kuliah personal',
                    'Pengajuan surat administrasi akademik (Cuti, Aktif Kuliah, dll)',
                    'Memantau progress bimbingan Tesis/Disertasi'
                ],
                'link_siakad' => 'https://siakad.iaipibandung.ac.id',
                'link_panduan' => '#',
                'kontak_bantuan' => '081234567890',
                'deskripsi_banner' => 'Portal Terpadu Layanan Akademik Mahasiswa Pascasarjana IAI Persis Bandung.',
                'banner_image' => null
            ]
        );

        return Inertia::render('Public/SistemAkademik', [
            'siakad' => $siakad
        ]);
    }

    /**
     * Show the form for editing the specified resource in the admin panel.
     */
    public function edit()
    {
        $siakad = SistemAkademik::firstOrCreate(
            ['id' => 1],
            [
                'judul' => 'Sistem Informasi Akademik (SIAKAD)',
                'deskripsi_singkat' => 'Gerbang utama menuju portal akademik terpadu Pascasarjana IAI Persis Bandung. Melalui SIAKAD, seluruh aktivitas administrasi akademik dapat diakses secara mudah dan terpusat.',
                'fitur_list' => [
                    'Pengisian Kartu Rencana Studi (KRS) online',
                    'Melihat Kartu Hasil Studi (KHS) dan Transkrip Nilai',
                    'Mengecek Jadwal Kuliah personal',
                    'Pengajuan surat administrasi akademik (Cuti, Aktif Kuliah, dll)',
                    'Memantau progress bimbingan Tesis/Disertasi'
                ],
                'link_siakad' => 'https://siakad.iaipibandung.ac.id',
                'link_panduan' => '#',
                'kontak_bantuan' => '081234567890',
                'deskripsi_banner' => 'Portal Terpadu Layanan Akademik Mahasiswa Pascasarjana IAI Persis Bandung.',
                'banner_image' => null
            ]
        );

        return Inertia::render('Admin/Akademik/SistemAkademik/Index', [
            'siakad' => $siakad
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $siakad = SistemAkademik::firstOrFail();

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi_singkat' => 'required|string',
            'fitur_list' => 'nullable|array',
            'fitur_list.*' => 'string',
            'link_siakad' => 'nullable|string|max:255',
            'link_panduan' => 'nullable|string|max:255',
            'kontak_bantuan' => 'nullable|string|max:255',
            'deskripsi_banner' => 'nullable|string',
            'banner_image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('banner_image')) {
            if ($siakad->banner_image && strpos($siakad->banner_image, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $siakad->banner_image));
            }
            $path = $request->file('banner_image')->store('akademik/banner', 'public');
            $validated['banner_image'] = '/storage/' . $path;
        }

        // To handle dynamic features, filter out null/empty values
        if (isset($validated['fitur_list'])) {
            $validated['fitur_list'] = array_values(array_filter($validated['fitur_list'], function($val) {
                return !empty(trim($val));
            }));
        } else {
            $validated['fitur_list'] = [];
        }

        $siakad->update($validated);

        return redirect()->back()->with('success', 'Pengaturan Sistem Akademik berhasil diperbarui.');
    }
}
