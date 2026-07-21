<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DokumenInstitusiSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('dokumen_institusis')->insert([
            [
                'judul' => 'Statuta IAI Persis Bandung',
                'kategori' => 'Kebijakan',
                'file_path' => 'dummy.pdf',
                'file_size' => '2.5 MB',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
