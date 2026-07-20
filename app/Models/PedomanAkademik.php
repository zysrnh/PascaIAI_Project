<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PedomanAkademik extends Model
{
    protected $fillable = [
        'judul',
        'deskripsi',
        'file_path',
    ];
}
