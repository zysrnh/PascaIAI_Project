<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LppmPengabdian extends Model
{
    //
    protected $fillable = [
        'judul',
        'banner_image',
        'deskripsi_banner',
        'deskripsi_program',
        'periode_pelaksanaan',
        'syarat_peserta',
        'alur_pendaftaran',
        'file_buku_panduan',
        'file_template_proposal',
        'file_template_laporan',
        'lokasi_mitra',
        'kontak_koordinator',
        'rekap_pengabdian'
    ];

    protected $casts = [
        'alur_pendaftaran' => 'array',
        'lokasi_mitra' => 'array',
        'kontak_koordinator' => 'array',
        'rekap_pengabdian' => 'array',
    ];
}
