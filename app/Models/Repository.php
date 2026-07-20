<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Repository extends Model
{
    //
    protected $fillable = [
        'judul',
        'penulis_nama',
        'penulis_nim',
        'prodi_id',
        'dosen_pembimbing',
        'tahun',
        'abstrak',
        'kata_kunci',
        'file_cover',
        'file_full_text',
        'jenis'
    ];

    public function prodi()
    {
        return $this->belongsTo(ProgramStudi::class, 'prodi_id');
    }
}
