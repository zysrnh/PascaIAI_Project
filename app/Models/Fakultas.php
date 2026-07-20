<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fakultas extends Model
{
    protected $fillable = [
        'nama',
        'kode',
        'dekan_nama',
        'wakil_dekan',
        'deskripsi',
        'visi_misi',
        'logo_path',
        'gambar_path',
        'warna_bg',
        'email',
        'telepon',
        'alamat',
        'sk_pendirian',
        'status',
    ];

    public function programStudis()
    {
        return $this->hasMany(ProgramStudi::class);
    }
}
