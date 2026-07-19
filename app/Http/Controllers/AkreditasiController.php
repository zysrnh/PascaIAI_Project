<?php

namespace App\Http\Controllers;

use App\Models\Akreditasi;
use App\Models\PengaturanHalaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AkreditasiController extends Controller
{
    public function publicIndex()
    {
        $akreditasis = Akreditasi::all();
        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'akreditasi'],
            ['banner_image' => null, 'whatsapp_lpm' => '']
        );

        // Fix null values for image
        if ($pengaturan && !$pengaturan->banner_image) {
            $pengaturan->banner_image = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop";
        } elseif ($pengaturan && $pengaturan->banner_image) {
            $pengaturan->banner_image = Storage::url($pengaturan->banner_image);
        }

        $institusi = $akreditasis->where('type', 'institusi')->first();
        if ($institusi) {
            $institusi->sertifikat_url = $institusi->sertifikat_path ? Storage::url($institusi->sertifikat_path) : '#';
            $institusi->sk_url = $institusi->sk_path ? Storage::url($institusi->sk_path) : '#';
        }

        return Inertia::render('Public/Akreditasi', [
            'institusi' => $institusi,
            'prodis' => $akreditasis->where('type', 'prodi')->values(),
            'riwayats' => $akreditasis->where('type', 'riwayat')->sortByDesc('nama')->values(),
            'pengaturan' => $pengaturan
        ]);
    }

    public function index()
    {
        $akreditasis = Akreditasi::all();
        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'akreditasi'],
            ['banner_image' => null, 'whatsapp_lpm' => '']
        );

        return Inertia::render('Admin/Profil/Akreditasi/Index', [
            'institusi' => $akreditasis->where('type', 'institusi')->first(),
            'prodis' => $akreditasis->where('type', 'prodi')->values(),
            'riwayats' => $akreditasis->where('type', 'riwayat')->sortByDesc('nama')->values(),
            'pengaturan' => $pengaturan
        ]);
    }

    public function storeInstitusi(Request $request)
    {
        $request->validate([
            'peringkat' => 'required|string|max:255',
            'no_sk' => 'required|string|max:255',
            'tanggal_terbit' => 'nullable|string|max:255',
            'masa_berlaku' => 'nullable|string|max:255',
            'lembaga' => 'nullable|string|max:255',
            'sertifikat_path' => 'nullable|file|mimes:pdf|max:5120',
            'sk_path' => 'nullable|file|mimes:pdf|max:5120',
        ]);

        $institusi = Akreditasi::where('type', 'institusi')->first();
        if (!$institusi) {
            $institusi = new Akreditasi();
            $institusi->type = 'institusi';
        }

        $institusi->peringkat = $request->peringkat;
        $institusi->no_sk = $request->no_sk;
        $institusi->tanggal_terbit = $request->tanggal_terbit;
        $institusi->masa_berlaku = $request->masa_berlaku;
        $institusi->lembaga = $request->lembaga;

        if ($request->hasFile('sertifikat_path')) {
            if ($institusi->sertifikat_path) {
                Storage::disk('public')->delete($institusi->sertifikat_path);
            }
            $institusi->sertifikat_path = $request->file('sertifikat_path')->store('akreditasi', 'public');
        }

        if ($request->hasFile('sk_path')) {
            if ($institusi->sk_path) {
                Storage::disk('public')->delete($institusi->sk_path);
            }
            $institusi->sk_path = $request->file('sk_path')->store('akreditasi', 'public');
        }

        $institusi->save();

        return redirect()->back()->with('success', 'Data Akreditasi Institusi berhasil disimpan!');
    }

    public function storeProdi(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'peringkat' => 'required|string|max:255',
            'no_sk' => 'nullable|string|max:255',
            'masa_berlaku' => 'nullable|string|max:255',
            'lembaga' => 'nullable|string|max:255',
        ]);

        Akreditasi::create([
            'type' => 'prodi',
            'nama' => $request->nama,
            'peringkat' => $request->peringkat,
            'no_sk' => $request->no_sk,
            'masa_berlaku' => $request->masa_berlaku,
            'lembaga' => $request->lembaga,
        ]);

        return redirect()->back()->with('success', 'Data Prodi berhasil ditambahkan!');
    }

    public function updateProdi(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'peringkat' => 'required|string|max:255',
            'no_sk' => 'nullable|string|max:255',
            'masa_berlaku' => 'nullable|string|max:255',
            'lembaga' => 'nullable|string|max:255',
        ]);

        $prodi = Akreditasi::where('type', 'prodi')->findOrFail($id);
        $prodi->update($request->only('nama', 'peringkat', 'no_sk', 'masa_berlaku', 'lembaga'));

        return redirect()->back()->with('success', 'Data Prodi berhasil diperbarui!');
    }

    public function storeRiwayat(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'peringkat' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
            'lembaga' => 'nullable|string|max:255',
        ]);

        Akreditasi::create([
            'type' => 'riwayat',
            'nama' => $request->nama,
            'peringkat' => $request->peringkat,
            'keterangan' => $request->keterangan,
            'lembaga' => $request->lembaga,
        ]);

        return redirect()->back()->with('success', 'Riwayat berhasil ditambahkan!');
    }

    public function updateRiwayat(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'peringkat' => 'required|string|max:255',
            'keterangan' => 'nullable|string',
            'lembaga' => 'nullable|string|max:255',
        ]);

        $riwayat = Akreditasi::where('type', 'riwayat')->findOrFail($id);
        $riwayat->update($request->only('nama', 'peringkat', 'keterangan', 'lembaga'));

        return redirect()->back()->with('success', 'Riwayat berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $akreditasi = Akreditasi::findOrFail($id);
        
        if ($akreditasi->type === 'institusi') {
            if ($akreditasi->sertifikat_path) Storage::disk('public')->delete($akreditasi->sertifikat_path);
            if ($akreditasi->sk_path) Storage::disk('public')->delete($akreditasi->sk_path);
        }
        
        $akreditasi->delete();
        return redirect()->back()->with('success', 'Data berhasil dihapus!');
    }

    public function updatePengaturan(Request $request)
    {
        $request->validate([
            'whatsapp_lpm' => 'nullable|string|max:50',
            'banner_image' => 'nullable|image|max:2048'
        ]);

        $pengaturan = PengaturanHalaman::firstOrCreate(['halaman' => 'akreditasi']);
        
        if ($request->has('whatsapp_lpm')) {
            $pengaturan->whatsapp_lpm = $request->whatsapp_lpm;
        }

        if ($request->hasFile('banner_image')) {
            if ($pengaturan->banner_image) {
                Storage::disk('public')->delete($pengaturan->banner_image);
            }
            $pengaturan->banner_image = $request->file('banner_image')->store('banners', 'public');
        }

        $pengaturan->save();

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui!');
    }
}
