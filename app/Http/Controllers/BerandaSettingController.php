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

        $quickAccesses = \App\Models\QuickAccess::orderBy('urutan', 'asc')->get();
        $heroSliders = \App\Models\HeroSlider::orderBy('urutan', 'asc')->get();

        return Inertia::render('Admin/Beranda/Index', [
            'setting' => $setting,
            'umum' => $umum,
            'quickAccesses' => $quickAccesses,
            'heroSliders' => $heroSliders,
        ]);
    }

    public function update(Request $request)
    {
        $setting = BerandaSetting::firstOrCreate(
            ['id' => 1],
            [
                'pmb_gelombang_text' => 'Gelombang I',
                'pmb_hotline_number' => '6282116116133',
                'pmb_hotline_text' => '+62 821-1611-6133',
                'pmb_link' => 'https://iaipibdg.sevimaplatform.com/spmbfront',
                'hero_title' => 'Program Studi S1 KPI',
                'pilar_1_title' => 'Terakreditasi BAN-PT',
                'pilar_2_title' => 'Dosen Praktisi & Akademisi',
                'pilar_3_title' => 'Studio Podcast & Lab Penyiaran',
                'pilar_4_title' => 'Jejaring Kemitraan Media',
            ]
        );
        $umum = \App\Models\PengaturanUmum::firstOrCreate(
            ['id' => 1],
            [
                'email' => 'kpi@iaipibandung.ac.id',
                'telepon' => '(022) 5441951',
                'alamat' => 'Jl. Ciganitri No.2, Cipagalo, Kec. Bojongsoang, Kabupaten Bandung',
            ]
        );

        $validatedSetting = $request->validate([
            'pmb_gelombang_text' => 'nullable|string|max:255',
            'pmb_hotline_number' => 'nullable|string|max:255',
            'pmb_hotline_text' => 'nullable|string|max:255',
            'pmb_link' => 'nullable|string|max:255',
            'hero_title' => 'nullable|string|max:255',
            'hero_subtitle' => 'nullable|string',
            'pilar_1_title' => 'nullable|string|max:255',
            'pilar_1_desc' => 'nullable|string',
            'pilar_2_title' => 'nullable|string|max:255',
            'pilar_2_desc' => 'nullable|string',
            'pilar_3_title' => 'nullable|string|max:255',
            'pilar_3_desc' => 'nullable|string',
            'pilar_4_title' => 'nullable|string|max:255',
            'pilar_4_desc' => 'nullable|string',
            'hero_bg' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'hero_btn_1_text' => 'nullable|string|max:255',
            'hero_btn_1_url' => 'nullable|string|max:255',
            'hero_btn_2_text' => 'nullable|string|max:255',
            'hero_btn_2_url' => 'nullable|string|max:255',
            'stat_1_val' => 'nullable|string|max:255',
            'stat_1_label' => 'nullable|string|max:255',
            'stat_2_val' => 'nullable|string|max:255',
            'stat_2_label' => 'nullable|string|max:255',
            'stat_3_val' => 'nullable|string|max:255',
            'stat_3_label' => 'nullable|string|max:255',
            'stat_4_val' => 'nullable|string|max:255',
            'stat_4_label' => 'nullable|string|max:255',
            'stat_5_val' => 'nullable|string|max:255',
            'stat_5_label' => 'nullable|string|max:255',
        ]);

        $validatedUmum = $request->validate([
            'email' => 'nullable|string|max:255',
            'telepon' => 'nullable|string|max:255',
            'alamat' => 'nullable|string',
            'facebook_url' => 'nullable|string|max:255',
            'instagram_url' => 'nullable|string|max:255',
            'youtube_url' => 'nullable|string|max:255',
            'twitter_url' => 'nullable|string|max:255',
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
