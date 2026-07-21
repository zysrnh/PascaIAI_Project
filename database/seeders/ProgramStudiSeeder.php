<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProgramStudiSeeder extends Seeder
{
    public function run(): void
    {
        $fakultas = DB::table('fakultas')->first();
        if ($fakultas) {
            DB::table('program_studis')->insert([
                [
                    'nama' => 'Pendidikan Agama Islam',
                    'fakultas_id' => $fakultas->id,
                    'jenjang' => 'S2',
                    'kode' => 'PAI',
                    'gelar_lulusan' => 'M.Pd.',
                    'kaprodi' => 'Dr. Budi Santoso',
                    'deskripsi' => 'Program Studi Magister PAI berfokus pada pengembangan kurikulum dan pedagogi Islam kontemporer.',
                    'status' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'nama' => 'Hukum Keluarga',
                    'fakultas_id' => $fakultas->id,
                    'jenjang' => 'S2',
                    'kode' => 'HK',
                    'gelar_lulusan' => 'M.H.',
                    'kaprodi' => 'Dr. Asep Saepudin',
                    'deskripsi' => 'Program Studi Magister Hukum Keluarga mencetak praktisi hukum yang handal di peradilan agama.',
                    'status' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]
            ]);
        }
    }
}
