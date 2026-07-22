<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\ProgramStudi;
use App\Models\PengaturanHalaman;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class DosenController extends Controller
{
    /**
     * Display a listing of the resource for Admin.
     */
    public function indexAdmin()
    {
        $dosens = Dosen::with('programStudi')->latest()->get();
        $programStudis = ProgramStudi::all();
        $pengaturan = PengaturanHalaman::where('halaman', 'dosen')->first();

        return Inertia::render('Admin/Dosen/Index', [
            'dosens' => $dosens,
            'programStudis' => $programStudis,
            'pengaturan' => $pengaturan
        ]);
    }

    /**
     * Display a listing of the resource for Public.
     */
    public function indexPublic(Request $request)
    {
        $query = Dosen::with('programStudi')->where('status_aktif', true);
        
        // Filter by program studi if provided
        if ($request->has('prodi') && $request->prodi != '') {
            $query->where('program_studi_id', $request->prodi);
        }
        
        $dosens = $query->latest()->get();
        
        $programStudis = ProgramStudi::where('status', true)->get();
        $pengaturan = PengaturanHalaman::where('halaman', 'dosen')->first();

        if ($pengaturan && $pengaturan->banner_image) {
            $pengaturan->banner_image = Storage::url($pengaturan->banner_image);
        }

        // Calculate statistics
        $stats = [
            'total' => Dosen::where('status_aktif', true)->count(),
            'guru_besar' => Dosen::where('status_aktif', true)->where('jabatan_fungsional', 'Guru Besar')->count(),
            'lektor_kepala' => Dosen::where('status_aktif', true)->where('jabatan_fungsional', 'Lektor Kepala')->count(),
            'lektor' => Dosen::where('status_aktif', true)->where('jabatan_fungsional', 'Lektor')->count(),
            'asisten_ahli' => Dosen::where('status_aktif', true)->where('jabatan_fungsional', 'Asisten Ahli')->count(),
            
            'mahasiswa' => $pengaturan->jumlah_mahasiswa ?? 250,
            'alumni' => $pengaturan->jumlah_alumni ?? 180,
            'penelitian' => $pengaturan->jumlah_penelitian ?? 25,
            'publikasi' => $pengaturan->jumlah_publikasi ?? 42,
        ];

        return Inertia::render('Public/Dosen/Index', [
            'dosens' => $dosens,
            'programStudis' => $programStudis,
            'pengaturan' => $pengaturan,
            'stats' => $stats,
            'activeProdi' => $request->prodi ?? ''
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nidn' => 'nullable|string|max:255',
            'nip' => 'nullable|string|max:255',
            'program_studi_id' => 'nullable|exists:program_studis,id',
            'jabatan_fungsional' => 'nullable|string|max:255',
            'pendidikan_terakhir' => 'nullable|string|max:255',
            'bidang_keahlian' => 'nullable|string|max:255',
            'sinta_url' => 'nullable|url|max:255',
            'scopus_url' => 'nullable|url|max:255',
            'gscholar_url' => 'nullable|url|max:255',
            'status_aktif' => 'boolean',
            'foto' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            $validated['foto'] = $request->file('foto')->store('dosen', 'public');
        }

        Dosen::create($validated);

        return redirect()->back()->with('success', 'Data dosen berhasil ditambahkan!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $dosen = Dosen::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'nidn' => 'nullable|string|max:255',
            'nip' => 'nullable|string|max:255',
            'program_studi_id' => 'nullable|exists:program_studis,id',
            'jabatan_fungsional' => 'nullable|string|max:255',
            'pendidikan_terakhir' => 'nullable|string|max:255',
            'bidang_keahlian' => 'nullable|string|max:255',
            'sinta_url' => 'nullable|url|max:255',
            'scopus_url' => 'nullable|url|max:255',
            'gscholar_url' => 'nullable|url|max:255',
            'status_aktif' => 'boolean',
            'foto' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            if ($dosen->foto) {
                Storage::disk('public')->delete($dosen->foto);
            }
            $validated['foto'] = $request->file('foto')->store('dosen', 'public');
        }

        $dosen->update($validated);

        return redirect()->back()->with('success', 'Data dosen berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dosen = Dosen::findOrFail($id);
        
        if ($dosen->foto) {
            Storage::disk('public')->delete($dosen->foto);
        }
        
        $dosen->delete();

        return redirect()->back()->with('success', 'Data dosen berhasil dihapus!');
    }

    /**
     * Update settings (Banner & Stats).
     */
    public function updatePengaturan(Request $request)
    {
        $request->validate([
            'banner_image' => 'nullable|image|max:2048',
            'deskripsi' => 'nullable|string',
            'jumlah_mahasiswa' => 'nullable|integer|min:0',
            'jumlah_alumni' => 'nullable|integer|min:0',
            'jumlah_penelitian' => 'nullable|integer|min:0',
            'jumlah_publikasi' => 'nullable|integer|min:0',
        ]);

        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'dosen']
        );

        if ($request->hasFile('banner_image')) {
            if ($pengaturan->banner_image) {
                Storage::disk('public')->delete($pengaturan->banner_image);
            }
            
            $path = $request->file('banner_image')->store('pengaturan', 'public');
            $pengaturan->banner_image = $path;
        }

        $pengaturan->deskripsi = $request->deskripsi;
        $pengaturan->jumlah_mahasiswa = $request->jumlah_mahasiswa ?? 250;
        $pengaturan->jumlah_alumni = $request->jumlah_alumni ?? 180;
        $pengaturan->jumlah_penelitian = $request->jumlah_penelitian ?? 25;
        $pengaturan->jumlah_publikasi = $request->jumlah_publikasi ?? 42;
        $pengaturan->save();

        return redirect()->back()->with('success', 'Pengaturan Halaman dan Angka Statistik berhasil diperbarui!');
    }
}
