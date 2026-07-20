<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BerandaSetting;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BerandaSettingController extends Controller
{
    public function edit()
    {
        $setting = BerandaSetting::firstOrCreate(
            ['id' => 1],
            [
                'pmb_gelombang_text' => 'Gelombang I: Ditutup 30 Agustus 2026',
                'pmb_hotline_number' => '6282116116133',
                'pmb_hotline_text' => '+62 821-1611-6133 (Admin)',
                'pmb_link' => 'https://iaipibdg.sevimaplatform.com/spmbfront'
            ]
        );

        $umum = \App\Models\PengaturanUmum::firstOrCreate(
            ['id' => 1],
            [
                'email' => 'pascasarjana@iaipibandung.ac.id',
                'telepon' => '(022) 5441951',
                'alamat' => 'Jl. Ciganitri No.2, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung, Jawa Barat 40287',
                'facebook_url' => 'https://facebook.com',
                'instagram_url' => 'https://instagram.com',
                'youtube_url' => 'https://youtube.com',
                'twitter_url' => 'https://twitter.com',
            ]
        );

        return Inertia::render('Admin/Beranda/Index', [
            'setting' => $setting,
            'umum' => $umum
        ]);
    }

    public function update(Request $request)
    {
        $setting = BerandaSetting::firstOrFail();
        $umum = \App\Models\PengaturanUmum::firstOrFail();

        $validatedSetting = $request->validate([
            'pmb_gelombang_text' => 'required|string|max:255',
            'pmb_hotline_number' => 'required|string|max:255',
            'pmb_hotline_text' => 'required|string|max:255',
            'pmb_link' => 'required|url|max:255',
            'hero_title' => 'required|string|max:255',
            'hero_subtitle' => 'nullable|string',
            'pilar_1_title' => 'required|string|max:255',
            'pilar_1_desc' => 'nullable|string',
            'pilar_2_title' => 'required|string|max:255',
            'pilar_2_desc' => 'nullable|string',
            'pilar_3_title' => 'required|string|max:255',
            'pilar_3_desc' => 'nullable|string',
            'pilar_4_title' => 'required|string|max:255',
            'pilar_4_desc' => 'nullable|string',
            'hero_bg' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $validatedUmum = $request->validate([
            'email' => 'nullable|email|max:255',
            'telepon' => 'nullable|string|max:255',
            'alamat' => 'nullable|string',
            'facebook_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'youtube_url' => 'nullable|url|max:255',
            'twitter_url' => 'nullable|url|max:255',
        ]);

        $setting->fill($validatedSetting);

        if ($request->hasFile('hero_bg')) {
            if ($setting->hero_bg && Storage::disk('public')->exists($setting->hero_bg)) {
                Storage::disk('public')->delete($setting->hero_bg);
            }
            $setting->hero_bg = $request->file('hero_bg')->store('beranda', 'public');
        }

        $setting->save();
        $umum->update($validatedUmum);

        return redirect()->back()->with('success', 'Pengaturan beranda & umum berhasil diperbarui.');
    }
}
