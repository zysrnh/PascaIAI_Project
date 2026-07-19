<?php

namespace App\Http\Controllers;

use App\Models\KalenderAkademik;
use App\Models\PengaturanHalaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class KalenderAkademikController extends Controller
{
    public function publicIndex()
    {
        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'kalender_akademik'],
            ['banner_image' => null]
        );

        if ($pengaturan && !$pengaturan->banner_image) {
            $pengaturan->banner_image = "https://images.unsplash.com/photo-1506784365847-bbad939e9335?q=80&w=1600&auto=format&fit=crop";
        } elseif ($pengaturan && $pengaturan->banner_image) {
            $pengaturan->banner_image = Storage::url($pengaturan->banner_image);
        }

        $kalenders = KalenderAkademik::where('is_active', true)
            ->orderBy('tahun_akademik', 'desc')
            ->get();

        return Inertia::render('Public/KalenderAkademik', [
            'pengaturan' => $pengaturan,
            'kalenders' => $kalenders
        ]);
    }

    public function index()
    {
        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'kalender_akademik'],
            ['banner_image' => null]
        );

        $kalenders = KalenderAkademik::orderBy('tahun_akademik', 'desc')->get();

        return Inertia::render('Admin/Akademik/Kalender/Index', [
            'pengaturan' => $pengaturan,
            'kalenders' => $kalenders
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tahun_akademik' => 'required|string',
            'file_pdf' => 'required|file|mimes:pdf|max:10240', // max 10MB
            'is_active' => 'boolean'
        ]);

        $path = $request->file('file_pdf')->store('kalender_akademik', 'public');

        KalenderAkademik::create([
            'tahun_akademik' => $request->tahun_akademik,
            'file_pdf' => $path,
            'is_active' => $request->has('is_active') ? $request->is_active : true,
        ]);

        return redirect()->back()->with('success', 'Kalender Akademik berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'tahun_akademik' => 'required|string',
            'file_pdf' => 'nullable|file|mimes:pdf|max:10240',
            'is_active' => 'boolean'
        ]);

        $kalender = KalenderAkademik::findOrFail($id);

        if ($request->hasFile('file_pdf')) {
            if ($kalender->file_pdf && Storage::exists($kalender->file_pdf)) {
                Storage::delete($kalender->file_pdf);
            }
            $kalender->file_pdf = $request->file('file_pdf')->store('kalender_akademik', 'public');
        }

        $kalender->tahun_akademik = $request->tahun_akademik;
        $kalender->is_active = $request->has('is_active') ? $request->is_active : $kalender->is_active;
        $kalender->save();

        return redirect()->back()->with('success', 'Kalender Akademik berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $kalender = KalenderAkademik::findOrFail($id);
        
        if ($kalender->file_pdf && Storage::exists($kalender->file_pdf)) {
            Storage::delete($kalender->file_pdf);
        }
        
        $kalender->delete();

        return redirect()->back()->with('success', 'Kalender Akademik berhasil dihapus.');
    }

    public function updatePengaturan(Request $request)
    {
        $request->validate([
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'deskripsi' => 'nullable|string'
        ]);

        $pengaturan = PengaturanHalaman::firstOrCreate(['halaman' => 'kalender_akademik']);

        if ($request->hasFile('banner_image')) {
            if ($pengaturan->banner_image && Storage::exists($pengaturan->banner_image)) {
                Storage::delete($pengaturan->banner_image);
            }
            
            $path = $request->file('banner_image')->store('banners', 'public');
            $pengaturan->banner_image = $path;
        }

        $pengaturan->deskripsi = $request->deskripsi;
        $pengaturan->save();

        return redirect()->back()->with('success', 'Banner dan Deskripsi Halaman Kalender Akademik berhasil diperbarui.');
    }
}
