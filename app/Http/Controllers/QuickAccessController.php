<?php

namespace App\Http\Controllers;

use App\Models\QuickAccess;
use Illuminate\Http\Request;

class QuickAccessController extends Controller
{
    /**
     * Store a newly created quick access item.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'deskripsi' => 'nullable|string|max:255',
            'ikon' => 'nullable|string|max:255',
            'urutan' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if (empty($validated['ikon'])) {
            $validated['ikon'] = 'fa-link';
        }

        QuickAccess::create($validated);

        return redirect()->back()->with('success', 'Akses Cepat (Quick Access) berhasil ditambahkan!');
    }

    /**
     * Update the specified quick access item.
     */
    public function update(Request $request, $id)
    {
        $item = QuickAccess::findOrFail($id);

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'deskripsi' => 'nullable|string|max:255',
            'ikon' => 'nullable|string|max:255',
            'urutan' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);

        if (empty($validated['ikon'])) {
            $validated['ikon'] = 'fa-link';
        }

        $item->update($validated);

        return redirect()->back()->with('success', 'Akses Cepat (Quick Access) berhasil diperbarui!');
    }

    /**
     * Remove the specified quick access item.
     */
    public function destroy($id)
    {
        $item = QuickAccess::findOrFail($id);
        $item->delete();

        return redirect()->back()->with('success', 'Akses Cepat (Quick Access) berhasil dihapus!');
    }
}
