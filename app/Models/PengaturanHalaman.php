<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PengaturanHalaman extends Model
{
    protected $fillable = [
        'halaman',
        'banner_image',
        'deskripsi',
        'whatsapp_lpm',
        'jumlah_mahasiswa',
        'jumlah_alumni',
        'jumlah_penelitian',
        'jumlah_publikasi',
    ];
}
