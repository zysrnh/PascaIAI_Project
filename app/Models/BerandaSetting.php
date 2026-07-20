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
    ];
}
