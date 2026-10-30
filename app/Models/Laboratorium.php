<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Laboratorium extends Model
{
    protected $table = 'laboratoriums';
    protected $fillable = [
        'slug',
        'nama_lab',
        'subjudul',
        'deskripsi',
        'gambar_utama',
        'badge_status',
        'spesifikasi_alat',
        'program_output',
        'jadwal_layanan',
        'kontak_layanan',
    ];

    protected $casts = [
        'spesifikasi_alat' => 'array',
        'program_output' => 'array',
    ];
}
