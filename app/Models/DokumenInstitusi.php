<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DokumenInstitusi extends Model
{
    protected $fillable = [
        'kategori',
        'judul',
        'file_path',
        'file_size',
    ];
}
