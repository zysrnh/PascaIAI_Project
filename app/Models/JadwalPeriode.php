<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JadwalPeriode extends Model
{
    protected $fillable = [
        'tahun_akademik',
        'semester_tipe',
        'file_pdf',
        'is_active',
    ];

    public function mataKuliahs()
    {
        return $this->hasMany(JadwalMataKuliah::class, 'jadwal_periode_id');
    }
}
