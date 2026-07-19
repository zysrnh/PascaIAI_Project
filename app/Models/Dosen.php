<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Dosen extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'nidn',
        'nip',
        'program_studi_id',
        'jabatan_fungsional',
        'pendidikan_terakhir',
        'bidang_keahlian',
        'sinta_url',
        'scopus_url',
        'gscholar_url',
        'foto',
        'status_aktif'
    ];

    protected $appends = ['foto_url'];

    public function getFotoUrlAttribute()
    {
        return $this->foto ? Storage::url($this->foto) : null;
    }

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class);
    }
}
