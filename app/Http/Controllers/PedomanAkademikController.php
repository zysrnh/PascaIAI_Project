<?php

namespace App\Http\Controllers;

use App\Models\PedomanAkademik;
use App\Models\PengaturanHalaman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PedomanAkademikController extends Controller
{
    /**
     * Display the Admin page for Pedoman Akademik.
     */
    public function indexAdmin()
    {
        $pedomans = PedomanAkademik::orderBy('id', 'desc')->get();
        $pengaturan = PengaturanHalaman::where('halaman', 'pedoman_akademik')->first();

        return Inertia::render('Admin/Akademik/Pedoman/Index', [
            'pedomans' => $pedomans,
            'pengaturan' => $pengaturan
        ]);
    }

    /**
     * Display the Public page for Pedoman Akademik.
     */
    public function indexPublic()
    {
        $pedomans = PedomanAkademik::orderBy('id', 'desc')->get();
        $pengaturan = PengaturanHalaman::where('halaman', 'pedoman_akademik')->first();

        // Format banner image path if exists
        if ($pengaturan && $pengaturan->banner_image) {
            $pengaturan->banner_image = Storage::url($pengaturan->banner_image);
        }

        return Inertia::render('Public/PedomanAkademik', [
            'pedomans' => $pedomans,
            'pengaturan' => $pengaturan
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'file_pdf' => 'required|mimes:pdf|max:10240', // max 10MB
        ]);

        if ($request->hasFile('file_pdf')) {
            $path = $request->file('file_pdf')->store('pedoman', 'public');
            
            PedomanAkademik::create([
                'judul' => $validated['judul'],
                'deskripsi' => $validated['deskripsi'],
                'file_path' => $path,
            ]);
        }

        return redirect()->back()->with('success', 'Pedoman Akademik berhasil ditambahkan!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $pedoman = PedomanAkademik::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'file_pdf' => 'nullable|mimes:pdf|max:10240', // max 10MB
        ]);

        $pedoman->judul = $validated['judul'];
        $pedoman->deskripsi = $validated['deskripsi'];

        if ($request->hasFile('file_pdf')) {
            if ($pedoman->file_path) {
                Storage::disk('public')->delete($pedoman->file_path);
            }
            $pedoman->file_path = $request->file('file_pdf')->store('pedoman', 'public');
        }

        $pedoman->save();

        return redirect()->back()->with('success', 'Pedoman Akademik berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pedoman = PedomanAkademik::findOrFail($id);
        
        if ($pedoman->file_path) {
            Storage::disk('public')->delete($pedoman->file_path);
        }
        
        $pedoman->delete();

        return redirect()->back()->with('success', 'Pedoman Akademik berhasil dihapus!');
    }

    /**
     * Update the banner and description settings.
     */
    public function updatePengaturan(Request $request)
    {
        $request->validate([
            'banner_image' => 'nullable|image|max:2048',
            'deskripsi' => 'nullable|string'
        ]);

        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'pedoman_akademik']
        );

        if ($request->hasFile('banner_image')) {
            if ($pengaturan->banner_image) {
                Storage::disk('public')->delete($pengaturan->banner_image);
            }
            
            $path = $request->file('banner_image')->store('pengaturan', 'public');
            $pengaturan->banner_image = $path;
        }

        $pengaturan->deskripsi = $request->deskripsi;
        $pengaturan->save();

        return redirect()->back()->with('success', 'Pengaturan banner berhasil diperbarui!');
    }
}
