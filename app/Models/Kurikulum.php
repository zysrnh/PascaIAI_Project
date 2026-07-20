<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kurikulum extends Model
{
    protected $fillable = [
        'nama',
        'tahun_akademik',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function mataKuliahs()
    {
        return $this->hasMany(MataKuliah::class);
    }
}
