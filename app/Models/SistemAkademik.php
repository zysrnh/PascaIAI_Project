<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SistemAkademik extends Model
{
    protected $fillable = [
        'judul',
        'deskripsi_singkat',
        'fitur_list',
        'link_siakad',
        'link_panduan',
        'kontak_bantuan',
        'banner_image',
        'deskripsi_banner'
    ];

    protected $casts = [
        'fitur_list' => 'array'
    ];
}
