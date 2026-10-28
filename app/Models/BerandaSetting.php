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
        'hero_btn_1_text',
        'hero_btn_1_url',
        'hero_btn_2_text',
        'hero_btn_2_url',
        'stat_1_val',
        'stat_1_label',
        'stat_2_val',
        'stat_2_label',
        'stat_3_val',
        'stat_3_label',
        'stat_4_val',
        'stat_4_label',
        'stat_5_val',
        'stat_5_label',
    ];
}
