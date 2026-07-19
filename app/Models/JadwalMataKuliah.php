<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JadwalMataKuliah extends Model
{
    protected $fillable = [
        'jadwal_periode_id',
        'program_studi',
        'semester_ke',
        'mata_kuliah',
        'sks',
        'dosen_pengampu',
        'hari',
        'jam_mulai',
        'jam_selesai',
        'ruangan',
    ];

    public function periode()
    {
        return $this->belongsTo(JadwalPeriode::class, 'jadwal_periode_id');
    }
}
