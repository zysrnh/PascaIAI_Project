<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BerandaSetting extends Model
{
    //
    protected $fillable = [
        'pmb_gelombang_text',
        'pmb_hotline_number',
        'pmb_hotline_text',
        'pmb_link',
        'hero_title',
        'hero_subtitle',
        'pilar_1_title',
        'pilar_1_desc',
        'pilar_2_title',
        'pilar_2_desc',
        'pilar_3_title',
        'pilar_3_desc',
        'pilar_4_title',
        'pilar_4_desc',
        'hero_bg',
    ];
}
