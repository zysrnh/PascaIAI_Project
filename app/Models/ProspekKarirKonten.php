<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProspekKarirKonten extends Model
{
    use HasFactory;

    protected $fillable = [
        'deskripsi_utama',
        'deskripsi_pusat_karir',
        'tracer_study_url',
        'kualifikasi_global',
    ];

    protected $casts = [
        'kualifikasi_global' => 'array',
    ];
}
