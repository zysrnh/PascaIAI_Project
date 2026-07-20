<?php

namespace App\Http\Controllers;

use App\Models\KonsultasiPendaftaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KonsultasiPendaftaranController extends Controller
{
    public function index()
    {
        $konsultasi = KonsultasiPendaftaran::latest()->paginate(10);
        return Inertia::render('Admin/Konsultasi/Index', [
            'konsultasi' => $konsultasi
        ]);
    }

    public function destroy(KonsultasiPendaftaran $konsultasi)
    {
        $konsultasi->delete();
        return redirect()->back()->with('success', 'Data konsultasi berhasil dihapus.');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'no_hp' => 'required|string|max:20',
            'pesan' => 'required|string'
        ]);

        KonsultasiPendaftaran::create([
            'nama' => $request->nama,
            'no_hp' => $request->no_hp,
            'pesan' => $request->pesan,
            'status' => 'Menunggu'
        ]);

        return redirect()->back()->with('success', 'Pesan Anda telah terkirim. Admin kami akan segera menghubungi Anda melalui WhatsApp.');
    }
}
