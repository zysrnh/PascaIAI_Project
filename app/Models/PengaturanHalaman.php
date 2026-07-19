<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PengaturanHalaman extends Model
{
    protected $fillable = [
        'halaman',
        'banner_image',
        'whatsapp_lpm',
    ];
}
