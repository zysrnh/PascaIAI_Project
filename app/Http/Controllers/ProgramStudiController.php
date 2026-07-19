<?php

namespace App\Http\Controllers;

use App\Models\ProgramStudi;
use App\Models\Fakultas;
use App\Models\PengaturanHalaman;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProgramStudiController extends Controller
{
    public function index()
    {
        $programStudis = ProgramStudi::with('fakultas')->orderBy('nama', 'asc')->get();
        $fakultas = Fakultas::orderBy('nama', 'asc')->get();
        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'program_studi'],
            ['banner_image' => null]
        );

        $programStudis->transform(function ($item) {
            if ($item->kurikulum_file_path) {
                $item->kurikulum_url = Storage::url($item->kurikulum_file_path);
            }
            return $item;
        });

        return Inertia::render('Admin/ProgramStudi/Index', [
            'programStudis' => $programStudis,
            'fakultas' => $fakultas,
            'pengaturan' => $pengaturan
        ]);
    }

    public function publicIndex()
    {
        $programStudis = ProgramStudi::with('fakultas')->where('status', true)->orderBy('nama', 'asc')->get();
        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'program_studi'],
            ['banner_image' => null]
        );

        if ($pengaturan && !$pengaturan->banner_image) {
            $pengaturan->banner_image = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1600&auto=format&fit=crop";
        } elseif ($pengaturan && $pengaturan->banner_image) {
            $pengaturan->banner_image = Storage::url($pengaturan->banner_image);
        }

        $programStudis->transform(function ($item) {
            if ($item->kurikulum_file_path) {
                $item->kurikulum_url = Storage::url($item->kurikulum_file_path);
            }
            return $item;
        });

        return Inertia::render('Public/ProgramStudi/Index', [
            'programStudis' => $programStudis,
            'pengaturan' => $pengaturan
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'kode' => 'nullable|string|max:255',
            'jenjang' => 'required|string|max:50',
            'fakultas_id' => 'required|exists:fakultas,id',
            'gelar_lulusan' => 'required|string|max:255',
            'kaprodi' => 'required|string|max:255',
            'sekretaris' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'visi_misi' => 'nullable|string',
            'cpl' => 'nullable|string',
            'kurikulum_file' => 'nullable|file|mimes:pdf|max:5120',
            'jumlah_mahasiswa' => 'nullable|integer',
            'jumlah_dosen' => 'nullable|integer',
            'jumlah_lulusan' => 'nullable|integer',
            'status' => 'boolean',
            'email' => 'nullable|email|max:255',
            'telepon' => 'nullable|string|max:255',
            'biaya_kuliah' => 'nullable|string|max:255',
        ]);

        $data = $request->except(['kurikulum_file']);
        
        // Handle optional integers
        $data['jumlah_mahasiswa'] = $data['jumlah_mahasiswa'] ?? 0;
        $data['jumlah_dosen'] = $data['jumlah_dosen'] ?? 0;
        $data['jumlah_lulusan'] = $data['jumlah_lulusan'] ?? 0;
        $data['status'] = $data['status'] ?? true;

        if ($request->hasFile('kurikulum_file')) {
            $data['kurikulum_file_path'] = $request->file('kurikulum_file')->store('program_studi', 'public');
        }

        ProgramStudi::create($data);

        return redirect()->back()->with('success', 'Program Studi berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'kode' => 'nullable|string|max:255',
            'jenjang' => 'required|string|max:50',
            'fakultas_id' => 'required|exists:fakultas,id',
            'gelar_lulusan' => 'required|string|max:255',
            'kaprodi' => 'required|string|max:255',
            'sekretaris' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'visi_misi' => 'nullable|string',
            'cpl' => 'nullable|string',
            'kurikulum_file' => 'nullable|file|mimes:pdf|max:5120',
            'jumlah_mahasiswa' => 'nullable|integer',
            'jumlah_dosen' => 'nullable|integer',
            'jumlah_lulusan' => 'nullable|integer',
            'status' => 'boolean',
            'email' => 'nullable|email|max:255',
            'telepon' => 'nullable|string|max:255',
            'biaya_kuliah' => 'nullable|string|max:255',
        ]);

        $prodi = ProgramStudi::findOrFail($id);
        $data = $request->except(['kurikulum_file']);

        // Handle optional integers
        $data['jumlah_mahasiswa'] = $data['jumlah_mahasiswa'] ?? 0;
        $data['jumlah_dosen'] = $data['jumlah_dosen'] ?? 0;
        $data['jumlah_lulusan'] = $data['jumlah_lulusan'] ?? 0;
        
        if ($request->hasFile('kurikulum_file')) {
            if ($prodi->kurikulum_file_path) {
                Storage::disk('public')->delete($prodi->kurikulum_file_path);
            }
            $data['kurikulum_file_path'] = $request->file('kurikulum_file')->store('program_studi', 'public');
        }

        $prodi->update($data);

        return redirect()->back()->with('success', 'Program Studi berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $prodi = ProgramStudi::findOrFail($id);
        
        if ($prodi->kurikulum_file_path) {
            Storage::disk('public')->delete($prodi->kurikulum_file_path);
        }
        
        $prodi->delete();
        
        return redirect()->back()->with('success', 'Program Studi berhasil dihapus!');
    }

    public function updatePengaturan(Request $request)
    {
        $request->validate([
            'banner_image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'deskripsi' => 'nullable|string'
        ]);

        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'program_studi'],
            ['banner_image' => null]
        );

        if ($pengaturan->banner_image) {
            Storage::disk('public')->delete($pengaturan->banner_image);
        }

        $path = $request->file('banner_image')->store('banners', 'public');
        $pengaturan->update([
            'banner_image' => $path,
            'deskripsi' => $request->deskripsi
        ]);

        return redirect()->back()->with('success', 'Banner dan Deskripsi halaman berhasil diperbarui!');
    }
}
