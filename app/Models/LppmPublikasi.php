<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LppmPublikasi extends Model
{
    //
    protected $fillable = [
        'judul',
        'banner_image',
        'deskripsi_banner',
        'deskripsi_jurnal',
        'jurnals',
        'deskripsi_buku',
        'bukus',
        'deskripsi_artikel',
        'links_scholar',
    ];

    protected $casts = [
        'jurnals' => 'array',
        'bukus' => 'array',
        'links_scholar' => 'array',
    ];
}
