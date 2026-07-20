<?php

namespace App\Http\Controllers;

use App\Models\LppmInformasiHibah;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class LppmInformasiHibahController extends Controller
{
    public function indexPublic()
    {
        $penelitian = LppmInformasiHibah::firstOrCreate(
            ['id' => 1],
            [
                'judul' => 'Penelitian (Hibah & Roadmap)',
                'roadmap_text' => 'Fokus penelitian unggulan Pascasarjana...',
                'fokus_unggulan' => [['bidang' => '', 'deskripsi' => '']],
                'alur_pengajuan' => [['tahap' => '', 'deskripsi' => '']],
                'rekap_penelitian' => []
            ]
        );

        return Inertia::render('Public/LPPM/Penelitian', [
            'penelitian' => $penelitian
        ]);
    }

    public function edit()
    {
        $penelitian = LppmInformasiHibah::firstOrCreate(
            ['id' => 1],
            [
                'judul' => 'Penelitian (Hibah & Roadmap)',
                'roadmap_text' => 'Fokus penelitian unggulan Pascasarjana...',
                'fokus_unggulan' => [['bidang' => '', 'deskripsi' => '']],
                'alur_pengajuan' => [['tahap' => '', 'deskripsi' => '']],
                'rekap_penelitian' => []
            ]
        );

        return Inertia::render('Admin/LPPM/Penelitian/Index', [
            'penelitian' => $penelitian
        ]);
    }

    public function update(Request $request)
    {
        $penelitian = LppmInformasiHibah::firstOrFail();

        $validated = $request->validate([
            'judul' => 'nullable|string',
            'deskripsi_banner' => 'nullable|string',
            'banner_image' => 'nullable|image|max:2048',
            'roadmap_text' => 'nullable|string',
            'fokus_unggulan' => 'nullable|array',
            'skema_internal' => 'nullable|string',
            'skema_eksternal' => 'nullable|string',
            'syarat_ketentuan' => 'nullable|string',
            'alur_pengajuan' => 'nullable|array',
            'file_template_proposal' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'file_template_laporan' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'rekap_penelitian' => 'nullable|array'
        ]);

        if ($request->hasFile('banner_image')) {
            if ($penelitian->banner_image && strpos($penelitian->banner_image, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $penelitian->banner_image));
            }
            $path = $request->file('banner_image')->store('lppm/banner', 'public');
            $validated['banner_image'] = '/storage/' . $path;
        }

        if ($request->hasFile('file_template_proposal')) {
            if ($penelitian->file_template_proposal && strpos($penelitian->file_template_proposal, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $penelitian->file_template_proposal));
            }
            $path = $request->file('file_template_proposal')->store('lppm/dokumen', 'public');
            $validated['file_template_proposal'] = '/storage/' . $path;
        }

        if ($request->hasFile('file_template_laporan')) {
            if ($penelitian->file_template_laporan && strpos($penelitian->file_template_laporan, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $penelitian->file_template_laporan));
            }
            $path = $request->file('file_template_laporan')->store('lppm/dokumen', 'public');
            $validated['file_template_laporan'] = '/storage/' . $path;
        }

        $penelitian->update($validated);

        return redirect()->back()->with('success', 'Halaman Informasi Penelitian berhasil diperbarui.');
    }
}
