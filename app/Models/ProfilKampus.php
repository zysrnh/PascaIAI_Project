<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfilKampus extends Model
{
    protected $fillable = [
        'kategori',
        'judul',
        'slug',
        'konten',
        'gambar',
        'file_lampiran',
    ];
}
