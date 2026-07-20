<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BerandaSetting;
use Inertia\Inertia;

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

        return Inertia::render('Admin/Beranda/Index', [
            'setting' => $setting
        ]);
    }

    public function update(Request $request)
    {
        $setting = BerandaSetting::firstOrFail();

        $validated = $request->validate([
            'pmb_gelombang_text' => 'required|string|max:255',
            'pmb_hotline_number' => 'required|string|max:255',
            'pmb_hotline_text' => 'required|string|max:255',
            'pmb_link' => 'required|url|max:255',
        ]);

        $setting->update($validated);

        return redirect()->back()->with('success', 'Pengaturan beranda berhasil diperbarui.');
    }
}
