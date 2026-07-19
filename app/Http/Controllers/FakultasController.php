<?php

namespace App\Http\Controllers;

use App\Models\Fakultas;
use App\Models\PengaturanHalaman;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class FakultasController extends Controller
{
    public function index()
    {
        $fakultas = Fakultas::orderBy('nama', 'asc')->get();
        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'fakultas'],
            ['banner_image' => null]
        );

        // we map logo_url for convenience in frontend
        $fakultas->transform(function ($item) {
            if ($item->logo_path) {
                $item->logo_url = Storage::url($item->logo_path);
            }
            if ($item->gambar_path) {
                $item->gambar_url = Storage::url($item->gambar_path);
            }
            return $item;
        });

        return Inertia::render('Admin/Fakultas/Index', [
            'fakultas' => $fakultas,
            'pengaturan' => $pengaturan
        ]);
    }

    public function publicIndex()
    {
        $fakultas = Fakultas::where('status', true)->orderBy('nama', 'asc')->get();
        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'fakultas'],
            ['banner_image' => null]
        );

        if ($pengaturan && !$pengaturan->banner_image) {
            $pengaturan->banner_image = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop";
        } elseif ($pengaturan && $pengaturan->banner_image) {
            $pengaturan->banner_image = Storage::url($pengaturan->banner_image);
        }

        $fakultas->transform(function ($item) {
            if ($item->logo_path) {
                $item->logo_url = Storage::url($item->logo_path);
            }
            if ($item->gambar_path) {
                $item->gambar_url = Storage::url($item->gambar_path);
            }
            return $item;
        });

        return Inertia::render('Public/Fakultas/Index', [
            'fakultas' => $fakultas,
            'pengaturan' => $pengaturan
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'kode' => 'nullable|string|max:255',
            'dekan_nama' => 'nullable|string|max:255',
            'wakil_dekan' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'visi_misi' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'telepon' => 'nullable|string|max:255',
            'alamat' => 'nullable|string',
            'sk_pendirian' => 'nullable|string|max:255',
            'status' => 'boolean',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'warna_bg' => 'nullable|string|max:50',
        ]);

        $data = $request->except(['logo', 'gambar']);
        
        if ($request->hasFile('logo')) {
            $data['logo_path'] = $request->file('logo')->store('fakultas', 'public');
        }
        if ($request->hasFile('gambar')) {
            $data['gambar_path'] = $request->file('gambar')->store('fakultas', 'public');
        }

        Fakultas::create($data);

        return redirect()->back()->with('success', 'Fakultas berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'kode' => 'nullable|string|max:255',
            'dekan_nama' => 'nullable|string|max:255',
            'wakil_dekan' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'visi_misi' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'telepon' => 'nullable|string|max:255',
            'alamat' => 'nullable|string',
            'sk_pendirian' => 'nullable|string|max:255',
            'status' => 'boolean',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'warna_bg' => 'nullable|string|max:50',
        ]);

        $fakultas = Fakultas::findOrFail($id);
        $data = $request->except(['logo', 'gambar']);

        if ($request->hasFile('logo')) {
            if ($fakultas->logo_path) {
                Storage::disk('public')->delete($fakultas->logo_path);
            }
            $data['logo_path'] = $request->file('logo')->store('fakultas', 'public');
        }

        if ($request->hasFile('gambar')) {
            if ($fakultas->gambar_path) {
                Storage::disk('public')->delete($fakultas->gambar_path);
            }
            $data['gambar_path'] = $request->file('gambar')->store('fakultas', 'public');
        }

        $fakultas->update($data);

        return redirect()->back()->with('success', 'Fakultas berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $fakultas = Fakultas::findOrFail($id);
        if ($fakultas->logo_path) {
            Storage::disk('public')->delete($fakultas->logo_path);
        }
        if ($fakultas->gambar_path) {
            Storage::disk('public')->delete($fakultas->gambar_path);
        }
        $fakultas->delete();

        return redirect()->back()->with('success', 'Fakultas berhasil dihapus!');
    }

    public function updatePengaturan(Request $request)
    {
        $request->validate([
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'fakultas']
        );

        if ($request->hasFile('banner_image')) {
            if ($pengaturan->banner_image) {
                Storage::disk('public')->delete($pengaturan->banner_image);
            }
            $pengaturan->banner_image = $request->file('banner_image')->store('pengaturan', 'public');
        }
        $pengaturan->save();

        return redirect()->back()->with('success', 'Pengaturan Halaman Fakultas berhasil diperbarui!');
    }
}
