<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PedomanFolder extends Model
{
    protected $fillable = [
        'nama',
        'parent_id',
        'urutan',
    ];

    /**
     * Parent folder relationship.
     */
    public function parent()
    {
        return $this->belongsTo(PedomanFolder::class, 'parent_id');
    }

    /**
     * Child folders relationship.
     */
    public function children()
    {
        return $this->hasMany(PedomanFolder::class, 'parent_id')->orderBy('urutan')->orderBy('nama');
    }

    /**
     * Documents inside this folder.
     */
    public function documents()
    {
        return $this->hasMany(PedomanAkademik::class, 'folder_id');
    }

    /**
     * Get breadcrumb path from root to this folder.
     */
    public function getBreadcrumbAttribute()
    {
        $path = collect([$this]);
        $current = $this;

        while ($current->parent_id) {
            $current = $current->parent;
            $path->prepend($current);
        }

        return $path;
    }
}
