<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuickAccess extends Model
{
    protected $fillable = [
        'nama',
        'url',
        'deskripsi',
        'ikon',
        'logo',
        'tampilkan_nama',
        'urutan',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'tampilkan_nama' => 'boolean',
        'urutan' => 'integer',
    ];
}
