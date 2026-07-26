<?php

namespace App\Http\Controllers;

use App\Models\HeroSlider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeroSliderController extends Controller
{
    /**
     * Store a newly created slide in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'nullable|string|max:255',
            'subjudul' => 'nullable|string',
            'gambar' => 'required|image|mimes:jpeg,png,jpg,webp|max:3072', // max 3MB
            'badge_text' => 'nullable|string|max:255',
            'text_button_1' => 'nullable|string|max:255',
            'link_button_1' => 'nullable|string|max:255',
            'text_button_2' => 'nullable|string|max:255',
            'link_button_2' => 'nullable|string|max:255',
            'urutan' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($request->hasFile('gambar')) {
            $validated['gambar'] = $request->file('gambar')->store('beranda/sliders', 'public');
        }

        $validated['urutan'] = $validated['urutan'] ?? 0;
        $validated['is_active'] = $request->has('is_active') ? (bool)$request->is_active : true;

        HeroSlider::create($validated);

        return redirect()->back()->with('success', 'Slide banner berhasil ditambahkan!');
    }

    /**
     * Update the specified slide in storage.
     */
    public function update(Request $request, string $id)
    {
        $slider = HeroSlider::findOrFail($id);

        $validated = $request->validate([
            'judul' => 'nullable|string|max:255',
            'subjudul' => 'nullable|string',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:3072',
            'badge_text' => 'nullable|string|max:255',
            'text_button_1' => 'nullable|string|max:255',
            'link_button_1' => 'nullable|string|max:255',
            'text_button_2' => 'nullable|string|max:255',
            'link_button_2' => 'nullable|string|max:255',
            'urutan' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($request->hasFile('gambar')) {
            if ($slider->gambar && Storage::disk('public')->exists($slider->gambar)) {
                Storage::disk('public')->delete($slider->gambar);
            }
            $slider->gambar = $request->file('gambar')->store('beranda/sliders', 'public');
        }

        $slider->judul = $validated['judul'];
        $slider->subjudul = $validated['subjudul'];
        $slider->badge_text = $validated['badge_text'];
        $slider->text_button_1 = $validated['text_button_1'];
        $slider->link_button_1 = $validated['link_button_1'];
        $slider->text_button_2 = $validated['text_button_2'];
        $slider->link_button_2 = $validated['link_button_2'];
        $slider->urutan = $validated['urutan'] ?? 0;
        $slider->is_active = $request->has('is_active') ? (bool)$request->is_active : true;

        $slider->save();

        return redirect()->back()->with('success', 'Slide banner berhasil diperbarui!');
    }

    /**
     * Remove the specified slide from storage.
     */
    public function destroy(string $id)
    {
        $slider = HeroSlider::findOrFail($id);

        if ($slider->gambar && Storage::disk('public')->exists($slider->gambar)) {
            Storage::disk('public')->delete($slider->gambar);
        }

        $slider->delete();

        return redirect()->back()->with('success', 'Slide banner berhasil dihapus!');
    }
}
