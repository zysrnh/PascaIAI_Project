<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgramStudi extends Model
{
    use HasFactory;

    protected $table = 'program_studis';

    protected $fillable = [
        'nama',
        'kode',
        'jenjang',
        'fakultas_id',
        'gelar_lulusan',
        'kaprodi',
        'sekretaris',
        'deskripsi',
        'visi_misi',
        'cpl',
        'kurikulum_file_path',
        'jumlah_mahasiswa',
        'jumlah_dosen',
        'jumlah_lulusan',
        'status',
        'email',
        'telepon',
        'biaya_kuliah',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function fakultas()
    {
        return $this->belongsTo(Fakultas::class);
    }
}
