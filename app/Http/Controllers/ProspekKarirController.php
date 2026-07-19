<?php

namespace App\Http\Controllers;

use App\Models\PengaturanHalaman;
use App\Models\ProspekKarir;
use App\Models\ProspekKarirKonten;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProspekKarirController extends Controller
{
    public function publicIndex()
    {
        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'prospek_karir'],
            ['banner_image' => null]
        );

        if ($pengaturan && !$pengaturan->banner_image) {
            $pengaturan->banner_image = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop";
        } elseif ($pengaturan && $pengaturan->banner_image) {
            $pengaturan->banner_image = Storage::url($pengaturan->banner_image);
        }

        $konten = ProspekKarirKonten::firstOrCreate(
            [],
            [
                'deskripsi_utama' => 'Di era globalisasi dan tantangan revolusi industri 4.0, kebutuhan akan pakar pendidikan Islam yang adaptif, inovatif, dan moderat semakin meningkat. Lulusan Program Pascasarjana IAI Persis Bandung dibekali tidak hanya dengan kedalaman ilmu agama (tafaqquh fiddin), tetapi juga dengan metodologi riset mutakhir dan kemampuan manajerial.',
                'deskripsi_pusat_karir' => 'Kami terus memantau dan memfasilitasi lulusan kami melalui jaringan alumni yang kuat dan kemitraan strategis dengan berbagai lembaga.',
                'tracer_study_url' => '#',
                'kualifikasi_global' => [
                    'Penguasaan Metodologi Riset Modern',
                    'Pemahaman Tafsir & Hadis Tematik',
                    'Manajemen Pendidikan Berbasis IT'
                ]
            ]
        );

        $karirs = ProspekKarir::orderBy('urutan')->get();

        return Inertia::render('Public/ProspekKarir', [
            'pengaturan' => $pengaturan,
            'konten' => $konten,
            'karirs' => $karirs
        ]);
    }

    public function index()
    {
        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'prospek_karir'],
            ['banner_image' => null]
        );

        $konten = ProspekKarirKonten::firstOrCreate(
            [],
            [
                'deskripsi_utama' => 'Di era globalisasi dan tantangan revolusi industri 4.0, kebutuhan akan pakar pendidikan Islam yang adaptif, inovatif, dan moderat semakin meningkat. Lulusan Program Pascasarjana IAI Persis Bandung dibekali tidak hanya dengan kedalaman ilmu agama (tafaqquh fiddin), tetapi juga dengan metodologi riset mutakhir dan kemampuan manajerial.',
                'deskripsi_pusat_karir' => 'Kami terus memantau dan memfasilitasi lulusan kami melalui jaringan alumni yang kuat dan kemitraan strategis dengan berbagai lembaga.',
                'tracer_study_url' => '#',
                'kualifikasi_global' => [
                    'Penguasaan Metodologi Riset Modern',
                    'Pemahaman Tafsir & Hadis Tematik',
                    'Manajemen Pendidikan Berbasis IT'
                ]
            ]
        );

        $karirs = ProspekKarir::orderBy('urutan')->get();

        return Inertia::render('Admin/Fakultas/ProspekKarir/Index', [
            'pengaturan' => $pengaturan,
            'konten' => $konten,
            'karirs' => $karirs
        ]);
    }

    public function updateKonten(Request $request)
    {
        $request->validate([
            'deskripsi_utama' => 'required|string',
            'deskripsi_pusat_karir' => 'nullable|string',
            'tracer_study_url' => 'nullable|string',
            'kualifikasi_global' => 'nullable|string' // we will receive this as string (newline separated)
        ]);

        $konten = ProspekKarirKonten::first();
        if (!$konten) {
            $konten = new ProspekKarirKonten();
        }
        
        $kualifikasi = array_filter(array_map('trim', explode("\n", $request->kualifikasi_global)));

        $konten->deskripsi_utama = $request->deskripsi_utama;
        $konten->deskripsi_pusat_karir = $request->deskripsi_pusat_karir;
        $konten->tracer_study_url = $request->tracer_study_url;
        $konten->kualifikasi_global = empty($kualifikasi) ? null : array_values($kualifikasi);
        $konten->save();

        return redirect()->back()->with('success', 'Konten Halaman Prospek Karir berhasil diperbarui.');
    }

    public function storeKarir(Request $request)
    {
        $request->validate([
            'judul' => 'required|string',
            'deskripsi' => 'required|string',
            'ikon' => 'nullable|string',
            'urutan' => 'nullable|integer'
        ]);

        ProspekKarir::create([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'ikon' => $request->ikon ?? 'Briefcase',
            'urutan' => $request->urutan ?? 0
        ]);

        return redirect()->back()->with('success', 'Karir baru berhasil ditambahkan.');
    }

    public function updateKarir(Request $request, $id)
    {
        $request->validate([
            'judul' => 'required|string',
            'deskripsi' => 'required|string',
            'ikon' => 'nullable|string',
            'urutan' => 'nullable|integer'
        ]);

        $karir = ProspekKarir::findOrFail($id);
        $karir->update([
            'judul' => $request->judul,
            'deskripsi' => $request->deskripsi,
            'ikon' => $request->ikon ?? 'Briefcase',
            'urutan' => $request->urutan ?? 0
        ]);

        return redirect()->back()->with('success', 'Karir berhasil diperbarui.');
    }

    public function destroyKarir($id)
    {
        $karir = ProspekKarir::findOrFail($id);
        $karir->delete();

        return redirect()->back()->with('success', 'Karir berhasil dihapus.');
    }

    public function updatePengaturan(Request $request)
    {
        $request->validate([
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'deskripsi' => 'nullable|string'
        ]);

        $pengaturan = PengaturanHalaman::firstOrCreate(['halaman' => 'prospek_karir']);

        if ($request->hasFile('banner_image')) {
            // Delete old image
            if ($pengaturan->banner_image && Storage::exists($pengaturan->banner_image)) {
                Storage::delete($pengaturan->banner_image);
            }
            
            $path = $request->file('banner_image')->store('banners', 'public');
            $pengaturan->banner_image = $path;
        }

        $pengaturan->deskripsi = $request->deskripsi;
        $pengaturan->save();

        return redirect()->back()->with('success', 'Banner dan Deskripsi Halaman Prospek Karir berhasil diperbarui.');
    }
}
