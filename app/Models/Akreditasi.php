<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Akreditasi extends Model
{
    protected $fillable = [
        'type',
        'nama',
        'peringkat',
        'no_sk',
        'tanggal_terbit',
        'masa_berlaku',
        'lembaga',
        'keterangan',
        'sertifikat_path',
        'sk_path'
    ];
}
