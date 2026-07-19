<?php

namespace App\Http\Controllers;

use App\Models\StrukturOrganisasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StrukturOrganisasiController extends Controller
{
    // ADMIN: Tampilkan daftar pengurus
    public function index()
    {
        $organisasi = StrukturOrganisasi::orderBy('urutan', 'asc')->get();
        $jabatanTree = StrukturOrganisasi::whereNull('parent_id')->with('children.children')->orderBy('urutan', 'asc')->get();

        return Inertia::render('Admin/Profil/StrukturOrganisasi/Index', [
            'organisasi' => $organisasi,
            'jabatanTree' => $jabatanTree
        ]);
    }

    // ADMIN: Form Tambah
    public function create(Request $request)
    {
        $defaultUrutan = $request->query('urutan', 0);
        $defaultParentId = $request->query('parent_id', null);
        return Inertia::render('Admin/Profil/StrukturOrganisasi/Form', [
            'defaultUrutan' => (int) $defaultUrutan,
            'defaultParentId' => $defaultParentId ? (int) $defaultParentId : null
        ]);
    }

    // ADMIN: Proses Tambah
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'urutan' => 'required|string|max:50',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'parent_id' => 'nullable|exists:struktur_organisasis,id',
        ]);

        $data = $request->except('foto');

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('profil/struktur', 'public');
            $data['foto'] = '/storage/' . $path;
        }

        StrukturOrganisasi::create($data);

        return redirect()->route('admin.profil.struktur-organisasi.index')->with('success', 'Anggota struktur berhasil ditambahkan.');
    }

    // ADMIN: Form Edit
    public function edit($id)
    {
        $anggota = StrukturOrganisasi::findOrFail($id);
        return Inertia::render('Admin/Profil/StrukturOrganisasi/Form', [
            'anggota' => $anggota
        ]);
    }

    // ADMIN: Proses Update
    public function update(Request $request, $id)
    {
        $anggota = StrukturOrganisasi::findOrFail($id);

        $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'urutan' => 'required|string|max:50',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'parent_id' => 'nullable|exists:struktur_organisasis,id',
        ]);

        $data = $request->except('foto');

        if ($request->hasFile('foto')) {
            if ($anggota->foto && !str_starts_with($anggota->foto, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $anggota->foto));
            }
            $path = $request->file('foto')->store('profil/struktur', 'public');
            $data['foto'] = '/storage/' . $path;
        }

        $anggota->update($data);

        return redirect()->route('admin.profil.struktur-organisasi.index')->with('success', 'Data anggota struktur berhasil diperbarui.');
    }

    // ADMIN: Proses Hapus
    public function destroy($id)
    {
        $anggota = StrukturOrganisasi::findOrFail($id);

        if ($anggota->foto && !str_starts_with($anggota->foto, 'http')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $anggota->foto));
        }

        $anggota->delete();

        return redirect()->route('admin.profil.struktur-organisasi.index')->with('success', 'Anggota struktur berhasil dihapus.');
    }

    // ADMIN: Proses Bulk Hapus
    public function bulkDestroy(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:struktur_organisasis,id'
        ]);

        $anggotas = StrukturOrganisasi::whereIn('id', $request->ids)->get();

        foreach ($anggotas as $anggota) {
            if ($anggota->foto && !str_starts_with($anggota->foto, 'http')) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $anggota->foto));
            }
            $anggota->delete();
        }

        return redirect()->route('admin.profil.struktur-organisasi.index')->with('success', count($request->ids) . ' anggota struktur berhasil dihapus.');
    }

    // PUBLIK: Halaman Struktur Organisasi
    public function publicIndex()
    {
        $organisasi = StrukturOrganisasi::orderBy('urutan', 'asc')->get();
        $jabatanTree = StrukturOrganisasi::whereNull('parent_id')->with('children.children')->orderBy('urutan', 'asc')->get();

        return Inertia::render('Public/StrukturOrganisasi', [
            'organisasi' => $organisasi,
            'jabatanTree' => $jabatanTree
        ]);
    }
}
