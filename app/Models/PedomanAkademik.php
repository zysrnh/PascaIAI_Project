<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PedomanAkademik extends Model
{
    protected $fillable = [
        'judul',
        'deskripsi',
        'file_path',
        'folder_id',
        'tipe_file',
    ];

    /**
     * Folder relationship.
     */
    public function folder()
    {
        return $this->belongsTo(PedomanFolder::class, 'folder_id');
    }
}
