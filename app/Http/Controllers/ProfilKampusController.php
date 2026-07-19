<?php

namespace App\Http\Controllers;

use App\Models\ProfilKampus;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProfilKampusController extends Controller
{
    public function index()
    {
        $profils = ProfilKampus::orderBy('kategori')->get();
        return Inertia::render('Admin/Profil/Index', [
            'profils' => $profils
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Profil/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kategori' => 'required|string|max:255',
            'judul' => 'required|string|max:255',
            'konten' => 'nullable|string',
            // Image handling could be added here
        ]);

        $validated['slug'] = Str::slug($validated['judul']);

        ProfilKampus::create($validated);

        return redirect()->route('admin.profil.index')->with('success', 'Profil berhasil ditambahkan.');
    }

    public function edit(ProfilKampus $profil)
    {
        return Inertia::render('Admin/Profil/Edit', [
            'profil' => $profil
        ]);
    }

    public function update(Request $request, ProfilKampus $profil)
    {
        $validated = $request->validate([
            'kategori' => 'required|string|max:255',
            'judul' => 'required|string|max:255',
            'konten' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['judul']);

        $profil->update($validated);

        return redirect()->route('admin.profil.index')->with('success', 'Profil berhasil diupdate.');
    }

    public function destroy(ProfilKampus $profil)
    {
        $profil->delete();
        return redirect()->back()->with('success', 'Profil dihapus.');
    }
}
