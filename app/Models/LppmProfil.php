<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LppmProfil extends Model
{
    //
    protected $fillable = [
        'profil_singkat',
        'sejarah',
        'dasar_hukum',
        'tupoksi_utama',
        'visi',
        'misi',
        'struktur_organisasi',
        'renstra_text',
        'renstra_file',
        'kontak',
        'sk_ketua_file',
        'banner_image',
        'deskripsi_banner'
    ];

    protected $casts = [
        'struktur_organisasi' => 'array',
        'kontak' => 'array',
    ];
}
