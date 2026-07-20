<?php

namespace App\Http\Controllers;

use App\Models\LppmPengabdian;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class LppmPengabdianController extends Controller
{
    public function indexPublic()
    {
        $pengabdian = LppmPengabdian::firstOrCreate(
            ['id' => 1],
            [
                'judul' => 'Pengabdian Masyarakat (KKN)',
                'deskripsi_program' => 'Program Pengabdian kepada Masyarakat oleh dosen dan mahasiswa...',
                'alur_pendaftaran' => [['tahap' => '', 'deskripsi' => '']],
                'lokasi_mitra' => [['nama_mitra' => '', 'lokasi' => '', 'jenis_kerjasama' => '']],
                'kontak_koordinator' => ['nama' => '', 'email' => '', 'telepon' => ''],
                'rekap_pengabdian' => []
            ]
        );

        return Inertia::render('Public/LPPM/Pengabdian', [
            'pengabdian' => $pengabdian
        ]);
    }

    public function edit()
    {
        $pengabdian = LppmPengabdian::firstOrCreate(
            ['id' => 1],
            [
                'judul' => 'Pengabdian Masyarakat (KKN)',
                'deskripsi_program' => 'Program Pengabdian kepada Masyarakat oleh dosen dan mahasiswa...',
                'alur_pendaftaran' => [['tahap' => '', 'deskripsi' => '']],
                'lokasi_mitra' => [['nama_mitra' => '', 'lokasi' => '', 'jenis_kerjasama' => '']],
                'kontak_koordinator' => ['nama' => '', 'email' => '', 'telepon' => ''],
                'rekap_pengabdian' => []
            ]
        );

        return Inertia::render('Admin/LPPM/Pengabdian/Index', [
            'pengabdian' => $pengabdian
        ]);
    }

    public function update(Request $request)
    {
        $pengabdian = LppmPengabdian::firstOrFail();

        $validated = $request->validate([
            'judul' => 'nullable|string',
            'deskripsi_banner' => 'nullable|string',
            'banner_image' => 'nullable|image|max:2048',
            'deskripsi_program' => 'nullable|string',
            'periode_pelaksanaan' => 'nullable|string',
            'syarat_peserta' => 'nullable|string',
            'alur_pendaftaran' => 'nullable|array',
            'lokasi_mitra' => 'nullable|array',
            'kontak_koordinator' => 'nullable|array',
            'rekap_pengabdian' => 'nullable|array',
            'file_buku_panduan' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'file_template_proposal' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'file_template_laporan' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
        ]);

        if ($request->hasFile('banner_image')) {
            if ($pengabdian->banner_image && strpos($pengabdian->banner_image, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $pengabdian->banner_image));
            }
            $path = $request->file('banner_image')->store('lppm/banner', 'public');
            $validated['banner_image'] = '/storage/' . $path;
        }

        if ($request->hasFile('file_buku_panduan')) {
            if ($pengabdian->file_buku_panduan && strpos($pengabdian->file_buku_panduan, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $pengabdian->file_buku_panduan));
            }
            $path = $request->file('file_buku_panduan')->store('lppm/dokumen', 'public');
            $validated['file_buku_panduan'] = '/storage/' . $path;
        }

        if ($request->hasFile('file_template_proposal')) {
            if ($pengabdian->file_template_proposal && strpos($pengabdian->file_template_proposal, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $pengabdian->file_template_proposal));
            }
            $path = $request->file('file_template_proposal')->store('lppm/dokumen', 'public');
            $validated['file_template_proposal'] = '/storage/' . $path;
        }

        if ($request->hasFile('file_template_laporan')) {
            if ($pengabdian->file_template_laporan && strpos($pengabdian->file_template_laporan, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $pengabdian->file_template_laporan));
            }
            $path = $request->file('file_template_laporan')->store('lppm/dokumen', 'public');
            $validated['file_template_laporan'] = '/storage/' . $path;
        }

        $pengabdian->update($validated);

        return redirect()->back()->with('success', 'Halaman Pengabdian Masyarakat berhasil diperbarui.');
    }
}
