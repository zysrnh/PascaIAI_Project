<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TentangKampus extends Model
{
    protected $fillable = [
        'judul',
        'konten',
        'video_url',
        'pimpinan_nama',
        'pimpinan_quotes',
        'gambar_banner',
        'gambar_pimpinan',
        'tampilkan_pimpinan',
    ];
}
