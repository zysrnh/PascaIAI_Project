<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RepositorySetting extends Model
{
    //
    protected $fillable = [
        'judul',
        'deskripsi',
        'banner_image',
    ];
}
