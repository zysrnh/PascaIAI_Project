<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VisiMisi extends Model
{
    protected $fillable = [
        'gambar_banner',
        'gambar_bg',
        'visi',
        'misi',
        'tujuan'
    ];

    protected $casts = [
        'misi' => 'array',
        'tujuan' => 'array'
    ];
}
