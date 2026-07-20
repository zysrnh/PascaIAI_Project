<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kurikulum;
use App\Models\MataKuliah;
use App\Models\ProgramStudi;
use App\Models\Fakultas;
use App\Models\PengaturanHalaman;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class KurikulumController extends Controller
{
    // --- ADMIN ROUTES ---

    public function adminIndex()
    {
        $kurikulums = Kurikulum::orderBy('created_at', 'desc')->get();
        $pengaturan = PengaturanHalaman::where('halaman', 'kurikulum')->first();

        return Inertia::render('Admin/Akademik/Kurikulum/Index', [
            'kurikulums' => $kurikulums,
            'pengaturan' => $pengaturan
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'tahun_akademik' => 'required|string|max:50',
            'is_active' => 'boolean'
        ]);

        if ($request->is_active) {
            Kurikulum::where('id', '>', 0)->update(['is_active' => false]);
        }

        Kurikulum::create($request->all());

        return back()->with('success', 'Kurikulum berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $kurikulum = Kurikulum::findOrFail($id);

        $request->validate([
            'nama' => 'required|string|max:255',
            'tahun_akademik' => 'required|string|max:50',
            'is_active' => 'boolean'
        ]);

        if ($request->is_active) {
            Kurikulum::where('id', '!=', $id)->update(['is_active' => false]);
        }

        $kurikulum->update($request->all());

        return back()->with('success', 'Kurikulum berhasil diperbarui.');
    }

    public function destroy($id)
    {
        Kurikulum::findOrFail($id)->delete();
        return back()->with('success', 'Kurikulum berhasil dihapus.');
    }

    public function manageMataKuliah($id)
    {
        $kurikulum = Kurikulum::findOrFail($id);
        $programStudis = ProgramStudi::with('fakultas')->get();
        $mataKuliahs = MataKuliah::where('kurikulum_id', $id)->get();

        return Inertia::render('Admin/Akademik/Kurikulum/MataKuliah', [
            'kurikulum' => $kurikulum,
            'programStudis' => $programStudis,
            'mataKuliahs' => $mataKuliahs
        ]);
    }

    public function storeMataKuliah(Request $request, $kurikulum_id)
    {
        $request->validate([
            'program_studi_id' => 'required|exists:program_studis,id',
            'semester' => 'required|integer|min:1',
            'jenis' => 'required|string',
            'kode_mk' => 'required|string',
            'nama_mk' => 'required|string',
            'sks' => 'required|integer|min:1'
        ]);

        MataKuliah::create(array_merge($request->all(), ['kurikulum_id' => $kurikulum_id]));

        return back()->with('success', 'Mata kuliah berhasil ditambahkan.');
    }

    public function updateMataKuliah(Request $request, $id)
    {
        $mataKuliah = MataKuliah::findOrFail($id);
        
        $request->validate([
            'program_studi_id' => 'required|exists:program_studis,id',
            'semester' => 'required|integer|min:1',
            'jenis' => 'required|string',
            'kode_mk' => 'required|string',
            'nama_mk' => 'required|string',
            'sks' => 'required|integer|min:1'
        ]);

        $mataKuliah->update($request->all());

        return back()->with('success', 'Mata kuliah berhasil diperbarui.');
    }

    public function destroyMataKuliah($id)
    {
        MataKuliah::findOrFail($id)->delete();
        return back()->with('success', 'Mata kuliah berhasil dihapus.');
    }

    public function updatePengaturan(Request $request)
    {
        $request->validate([
            'deskripsi' => 'nullable|string',
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048'
        ]);

        $pengaturan = PengaturanHalaman::firstOrNew(['halaman' => 'kurikulum']);
        
        $pengaturan->deskripsi = $request->deskripsi;

        if ($request->hasFile('banner_image')) {
            if ($pengaturan->banner_image && Storage::disk('public')->exists($pengaturan->banner_image)) {
                Storage::disk('public')->delete($pengaturan->banner_image);
            }
            $path = $request->file('banner_image')->store('pengaturan', 'public');
            $pengaturan->banner_image = $path;
        }

        $pengaturan->save();

        return back()->with('success', 'Pengaturan halaman kurikulum berhasil disimpan.');
    }

    // --- PUBLIC ROUTES ---

    public function index(Request $request)
    {
        $kurikulums = Kurikulum::orderBy('created_at', 'desc')->get();
        $activeKurikulum = null;
        
        if ($request->has('kurikulum_id')) {
            $activeKurikulum = Kurikulum::find($request->kurikulum_id);
        }
        
        if (!$activeKurikulum) {
            $activeKurikulum = Kurikulum::where('is_active', true)->first();
        }
        
        if (!$activeKurikulum && $kurikulums->count() > 0) {
            $activeKurikulum = $kurikulums->first();
        }

        $fakultas = Fakultas::with(['programStudis' => function($q) use ($activeKurikulum) {
            if ($activeKurikulum) {
                $q->with(['mataKuliahs' => function($q2) use ($activeKurikulum) {
                    $q2->where('kurikulum_id', $activeKurikulum->id)->orderBy('semester')->orderBy('jenis');
                }]);
            }
        }])->get();

        $pengaturan = PengaturanHalaman::where('halaman', 'kurikulum')->first();

        return Inertia::render('Public/Kurikulum', [
            'kurikulums' => $kurikulums,
            'activeKurikulum' => $activeKurikulum,
            'fakultas' => $fakultas,
            'pengaturan' => $pengaturan
        ]);
    }
}
