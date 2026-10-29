<?php

namespace App\Http\Controllers;

use App\Models\QuickAccess;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg,gif|max:2048',
            'tampilkan_nama' => 'nullable',
            'urutan' => 'nullable|integer',
            'is_active' => 'nullable',
        ]);

        if (empty($validated['ikon'])) {
            $validated['ikon'] = 'fa-link';
        }

        $validated['tampilkan_nama'] = $request->boolean('tampilkan_nama', true);
        $validated['is_active'] = $request->boolean('is_active', true);

        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('quick_access', 'public');
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
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp,svg,gif|max:2048',
            'tampilkan_nama' => 'nullable',
            'urutan' => 'nullable|integer',
            'is_active' => 'nullable',
        ]);

        if (empty($validated['ikon'])) {
            $validated['ikon'] = 'fa-link';
        }

        $validated['tampilkan_nama'] = $request->boolean('tampilkan_nama', true);
        $validated['is_active'] = $request->boolean('is_active', true);

        if ($request->hasFile('logo')) {
            if ($item->logo && Storage::disk('public')->exists($item->logo)) {
                Storage::disk('public')->delete($item->logo);
            }
            $validated['logo'] = $request->file('logo')->store('quick_access', 'public');
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
        if ($item->logo && Storage::disk('public')->exists($item->logo)) {
            Storage::disk('public')->delete($item->logo);
        }
        $item->delete();

        return redirect()->back()->with('success', 'Akses Cepat (Quick Access) berhasil dihapus!');
    }
}
