<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LppmInformasiHibah extends Model
{
    //
    protected $fillable = [
        'judul',
        'banner_image',
        'deskripsi_banner',
        'roadmap_text',
        'fokus_unggulan',
        'skema_internal',
        'skema_eksternal',
        'syarat_ketentuan',
        'alur_pengajuan',
        'file_template_proposal',
        'file_template_laporan',
        'rekap_penelitian'
    ];

    protected $casts = [
        'fokus_unggulan' => 'array',
        'alur_pengajuan' => 'array',
        'rekap_penelitian' => 'array',
    ];
}
