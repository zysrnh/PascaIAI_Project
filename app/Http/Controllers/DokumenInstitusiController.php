<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DokumenInstitusi;
use App\Models\PengaturanHalaman;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DokumenInstitusiController extends Controller
{
    // ADMIN: Tampilkan halaman dokumen institusi
    public function index()
    {
        $dokumen = DokumenInstitusi::orderBy('created_at', 'desc')->get();
        $pengaturan = PengaturanHalaman::firstOrCreate(['halaman' => 'dokumen-institusi']);

        return Inertia::render('Admin/Profil/DokumenInstitusi/Index', [
            'dokumen' => $dokumen,
            'pengaturan' => $pengaturan
        ]);
    }

    // ADMIN: Form Tambah
    public function create()
    {
        $existingCategories = DokumenInstitusi::select('kategori')->distinct()->pluck('kategori');
        return Inertia::render('Admin/Profil/DokumenInstitusi/Form', [
            'existingCategories' => $existingCategories
        ]);
    }

    // ADMIN: Proses Tambah
    public function store(Request $request)
    {
        $request->validate([
            'kategori' => 'required|string',
            'judul' => 'required|string|max:255',
            'file_path' => 'required|file|mimes:pdf|max:5120' // max 5MB
        ]);

        $file = $request->file('file_path');
        $path = $file->store('dokumen_institusi', 'public');
        $size = $file->getSize();

        // format size
        if ($size >= 1048576) {
            $formattedSize = number_format($size / 1048576, 1) . ' MB';
        } else {
            $formattedSize = number_format($size / 1024, 1) . ' KB';
        }

        DokumenInstitusi::create([
            'kategori' => $request->kategori,
            'judul' => $request->judul,
            'file_path' => '/storage/' . $path,
            'file_size' => $formattedSize,
        ]);

        return redirect()->route('admin.profil.dokumen-institusi.index')->with('success', 'Dokumen berhasil ditambahkan.');
    }

    // ADMIN: Form Edit
    public function edit($id)
    {
        $dokumen = DokumenInstitusi::findOrFail($id);
        $existingCategories = DokumenInstitusi::select('kategori')->distinct()->pluck('kategori');
        return Inertia::render('Admin/Profil/DokumenInstitusi/Form', [
            'dokumen' => $dokumen,
            'existingCategories' => $existingCategories
        ]);
    }

    // ADMIN: Proses Update
    public function update(Request $request, $id)
    {
        $dokumen = DokumenInstitusi::findOrFail($id);

        $request->validate([
            'kategori' => 'required|string',
            'judul' => 'required|string|max:255',
            'file_path' => 'nullable|file|mimes:pdf|max:5120' // max 5MB
        ]);

        $data = [
            'kategori' => $request->kategori,
            'judul' => $request->judul,
        ];

        if ($request->hasFile('file_path')) {
            if ($dokumen->file_path && !str_starts_with($dokumen->file_path, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $dokumen->file_path));
            }
            $file = $request->file('file_path');
            $path = $file->store('dokumen_institusi', 'public');
            $size = $file->getSize();
            
            if ($size >= 1048576) {
                $formattedSize = number_format($size / 1048576, 1) . ' MB';
            } else {
                $formattedSize = number_format($size / 1024, 1) . ' KB';
            }

            $data['file_path'] = '/storage/' . $path;
            $data['file_size'] = $formattedSize;
        }

        $dokumen->update($data);

        return redirect()->route('admin.profil.dokumen-institusi.index')->with('success', 'Dokumen berhasil diperbarui.');
    }

    // ADMIN: Hapus Dokumen
    public function destroy($id)
    {
        $dokumen = DokumenInstitusi::findOrFail($id);
        if ($dokumen->file_path && !str_starts_with($dokumen->file_path, 'http')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $dokumen->file_path));
        }
        $dokumen->delete();
        return redirect()->route('admin.profil.dokumen-institusi.index')->with('success', 'Dokumen berhasil dihapus.');
    }

    // ADMIN: Bulk Hapus Dokumen
    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:dokumen_institusis,id'
        ]);

        $dokumens = DokumenInstitusi::whereIn('id', $request->ids)->get();

        foreach ($dokumens as $dokumen) {
            if ($dokumen->file_path && !str_starts_with($dokumen->file_path, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $dokumen->file_path));
            }
            $dokumen->delete();
        }

        return redirect()->route('admin.profil.dokumen-institusi.index')->with('success', count($request->ids) . ' dokumen berhasil dihapus.');
    }

    // ADMIN: Proses Update Banner
    public function updateBanner(Request $request)
    {
        $request->validate([
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'deskripsi' => 'nullable|string'
        ]);

        $pengaturan = PengaturanHalaman::firstOrCreate(['halaman' => 'dokumen-institusi']);

        if ($request->hasFile('banner_image')) {
            if ($pengaturan->banner_image && !str_starts_with($pengaturan->banner_image, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $pengaturan->banner_image));
            }
            $path = $request->file('banner_image')->store('profil/halaman', 'public');
            $pengaturan->banner_image = '/storage/' . $path;
        }

        $pengaturan->deskripsi = $request->deskripsi;
        $pengaturan->save();

        return redirect()->route('admin.profil.dokumen-institusi.index')->with('success', 'Banner dan Deskripsi halaman berhasil diperbarui.');
    }

    // PUBLIK: Halaman Dokumen Institusi
    public function publicIndex()
    {
        $dokumens = DokumenInstitusi::orderBy('created_at', 'desc')->get();
        $pengaturan = PengaturanHalaman::where('halaman', 'dokumen-institusi')->first();

        return Inertia::render('Public/DokumenInstitusi', [
            'dokumens' => $dokumens,
            'pengaturan' => $pengaturan
        ]);
    }
}

