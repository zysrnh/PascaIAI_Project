<?php

namespace App\Http\Controllers;

use App\Models\JadwalPeriode;
use App\Models\JadwalMataKuliah;
use App\Models\PengaturanHalaman;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class JadwalPerkuliahanController extends Controller
{
    public function publicIndex()
    {
        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'jadwal_perkuliahan'],
            ['banner_image' => null]
        );

        if ($pengaturan && !$pengaturan->banner_image) {
            $pengaturan->banner_image = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop";
        } elseif ($pengaturan && $pengaturan->banner_image) {
            $pengaturan->banner_image = Storage::url($pengaturan->banner_image);
        }

        // Fetch active periodes with their mata kuliahs
        $periodes = JadwalPeriode::where('is_active', true)
            ->orderBy('tahun_akademik', 'desc')
            ->orderBy('semester_tipe', 'asc')
            ->with('mataKuliahs')
            ->get();
            
        $programStudis = ProgramStudi::all();

        return Inertia::render('Public/JadwalPerkuliahan', [
            'pengaturan' => $pengaturan,
            'periodes' => $periodes,
            'programStudis' => $programStudis
        ]);
    }

    public function index()
    {
        $pengaturan = PengaturanHalaman::firstOrCreate(
            ['halaman' => 'jadwal_perkuliahan'],
            ['banner_image' => null]
        );

        $periodes = JadwalPeriode::orderBy('tahun_akademik', 'desc')
            ->orderBy('semester_tipe', 'asc')
            ->with('mataKuliahs')
            ->get();
            
        $programStudis = ProgramStudi::all();

        return Inertia::render('Admin/Akademik/Jadwal/Index', [
            'pengaturan' => $pengaturan,
            'periodes' => $periodes,
            'programStudis' => $programStudis
        ]);
    }

    public function updatePengaturan(Request $request)
    {
        $request->validate([
            'banner_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $pengaturan = PengaturanHalaman::firstOrCreate(['halaman' => 'jadwal_perkuliahan']);

        if ($request->hasFile('banner_image')) {
            if ($pengaturan->banner_image && Storage::exists($pengaturan->banner_image)) {
                Storage::delete($pengaturan->banner_image);
            }
            $path = $request->file('banner_image')->store('banners', 'public');
            $pengaturan->banner_image = $path;
            $pengaturan->save();
        }

        return redirect()->back()->with('success', 'Banner Jadwal Perkuliahan berhasil diperbarui.');
    }

    // --- PERIODE CRUD ---

    public function storePeriode(Request $request)
    {
        $request->validate([
            'tahun_akademik' => 'required|string',
            'semester_tipe' => 'required|in:Ganjil,Genap',
            'file_pdf' => 'nullable|file|mimes:pdf|max:10240',
            'is_active' => 'boolean'
        ]);

        $path = null;
        if ($request->hasFile('file_pdf')) {
            $path = $request->file('file_pdf')->store('jadwal_perkuliahan', 'public');
        }

        JadwalPeriode::create([
            'tahun_akademik' => $request->tahun_akademik,
            'semester_tipe' => $request->semester_tipe,
            'file_pdf' => $path,
            'is_active' => $request->has('is_active') ? $request->is_active : true,
        ]);

        return redirect()->back()->with('success', 'Periode Jadwal berhasil ditambahkan.');
    }

    public function updatePeriode(Request $request, $id)
    {
        $request->validate([
            'tahun_akademik' => 'required|string',
            'semester_tipe' => 'required|in:Ganjil,Genap',
            'file_pdf' => 'nullable|file|mimes:pdf|max:10240',
            'is_active' => 'boolean'
        ]);

        $periode = JadwalPeriode::findOrFail($id);

        if ($request->hasFile('file_pdf')) {
            if ($periode->file_pdf && Storage::exists($periode->file_pdf)) {
                Storage::delete($periode->file_pdf);
            }
            $periode->file_pdf = $request->file('file_pdf')->store('jadwal_perkuliahan', 'public');
        }

        $periode->tahun_akademik = $request->tahun_akademik;
        $periode->semester_tipe = $request->semester_tipe;
        $periode->is_active = $request->has('is_active') ? $request->is_active : $periode->is_active;
        $periode->save();

        return redirect()->back()->with('success', 'Periode Jadwal berhasil diperbarui.');
    }

    public function destroyPeriode($id)
    {
        $periode = JadwalPeriode::findOrFail($id);
        
        if ($periode->file_pdf && Storage::exists($periode->file_pdf)) {
            Storage::delete($periode->file_pdf);
        }
        
        $periode->delete();

        return redirect()->back()->with('success', 'Periode Jadwal berhasil dihapus.');
    }

    // --- MATA KULIAH CRUD ---

    public function storeMataKuliah(Request $request)
    {
        $request->validate([
            'jadwal_periode_id' => 'required|exists:jadwal_periodes,id',
            'program_studi' => 'required|string',
            'semester_ke' => 'required|integer|min:1',
            'mata_kuliah' => 'required|string',
            'sks' => 'required|integer|min:1',
            'dosen_pengampu' => 'required|string',
            'hari' => 'required|string',
            'jam_mulai' => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i|after:jam_mulai',
            'ruangan' => 'required|string',
        ]);

        JadwalMataKuliah::create($request->all());

        return redirect()->back()->with('success', 'Mata Kuliah berhasil ditambahkan ke jadwal.');
    }

    public function updateMataKuliah(Request $request, $id)
    {
        $request->validate([
            'program_studi' => 'required|string',
            'semester_ke' => 'required|integer|min:1',
            'mata_kuliah' => 'required|string',
            'sks' => 'required|integer|min:1',
            'dosen_pengampu' => 'required|string',
            'hari' => 'required|string',
            'jam_mulai' => 'required|date_format:H:i',
            'jam_selesai' => 'required|date_format:H:i', // removed after:jam_mulai for simpler form handling on UI sometimes
            'ruangan' => 'required|string',
        ]);

        $mk = JadwalMataKuliah::findOrFail($id);
        $mk->update($request->all());

        return redirect()->back()->with('success', 'Jadwal Mata Kuliah berhasil diperbarui.');
    }

    public function destroyMataKuliah($id)
    {
        $mk = JadwalMataKuliah::findOrFail($id);
        $mk->delete();

        return redirect()->back()->with('success', 'Jadwal Mata Kuliah berhasil dihapus.');
    }

    public function downloadTemplate()
    {
        return \Maatwebsite\Excel\Facades\Excel::download(new \App\Exports\JadwalTemplateExport, 'template_import_jadwal.xlsx');
    }

    public function importCsv(Request $request, $periode_id)
    {
        $request->validate([
            'file_excel' => 'required|file|mimes:xlsx,xls,csv|max:5120',
        ]);

        $periode = JadwalPeriode::findOrFail($periode_id);
        
        $import = new \App\Imports\JadwalMatkulImport($periode->id);
        \Maatwebsite\Excel\Facades\Excel::import($import, $request->file('file_excel'));

        $logText = '';
        if ($import->count > 0) {
            $limit = 5; // Limit how many to show so it doesn't break UI
            $displayedLogs = array_slice($import->importedLog, 0, $limit);
            $logText = implode(', ', $displayedLogs);
            
            if ($import->count > $limit) {
                $sisa = $import->count - $limit;
                $logText .= " ... dan $sisa matkul lainnya";
            }
            $message = "Berhasil mengimpor {$import->count} Mata Kuliah: {$logText}.";
        } else {
            $message = "Tidak ada data yang diimpor. Pastikan file tidak kosong.";
        }

        return redirect()->back()->with('success', $message);
    }
}
