<?php

namespace App\Http\Controllers;

use App\Models\SambutanPimpinan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SambutanPimpinanController extends Controller
{
    public function edit()
    {
        $sambutan = SambutanPimpinan::firstOrCreate(
            ['id' => 1],
            [
                'nama' => 'Dr. H. Latief Awaludin, MA.ME.',
                'jabatan' => 'Direktur Pascasarjana',
                'sambutan_singkat' => 'Kami mendedikasikan institusi ini untuk mencetak lulusan yang tidak hanya unggul secara akademik, tetapi juga memiliki integritas moral yang kokoh berlandaskan Al-Qur\'an dan As-Sunnah.',
                'sambutan_lengkap' => 'Selamat datang di Pascasarjana IAI PERSIS Bandung. Kami menyelenggarakan pendidikan tingkat lanjut yang dirancang khusus untuk merespon dinamika global tanpa mencabut akar nilai Keislaman...',
                'foto' => 'https://web-persis.s3.ap-southeast-1.amazonaws.com/files/shares/persis-cd5-0c543921-d668-4ee6-ac15-4f0ff791007e.jpg?q=80&w=400&auto=format&fit=crop'
            ]
        );

        return Inertia::render('Admin/Profil/SambutanPimpinan', [
            'sambutan' => $sambutan
        ]);
    }

    public function update(Request $request)
    {
        $sambutan = SambutanPimpinan::firstOrFail();

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'sambutan_singkat' => 'required|string',
            'sambutan_lengkap' => 'required|string',
            'foto' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('foto')) {
            if ($sambutan->foto && strpos($sambutan->foto, '/storage/') === 0) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $sambutan->foto));
            }
            $path = $request->file('foto')->store('profil', 'public');
            $validated['foto'] = '/storage/' . $path;
        }

        $sambutan->update($validated);

        return redirect()->back()->with('success', 'Halaman Sambutan Pimpinan berhasil diperbarui.');
    }
}
