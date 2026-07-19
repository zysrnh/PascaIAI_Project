<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SambutanPimpinan extends Model
{
    protected $fillable = [
        'nama',
        'jabatan',
        'sambutan_singkat',
        'sambutan_lengkap',
        'foto',
        'gambar_banner',
        'deskripsi_banner',
    ];
}
