<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlider extends Model
{
    protected $fillable = [
        'judul',
        'subjudul',
        'gambar',
        'badge_text',
        'text_button_1',
        'link_button_1',
        'text_button_2',
        'link_button_2',
        'urutan',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
