<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LppmInformasiHibahSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('lppm_informasi_hibahs')->insert([
            [
                'judul' => 'Informasi Hibah LPPM',
                'deskripsi_banner' => 'Informasi terkait panduan dan pengajuan hibah.',
                'fokus_unggulan' => json_encode(['Pendidikan', 'Agama', 'Sosial']),
                'alur_pengajuan' => json_encode([
                    ['step' => 1, 'desc' => 'Pengajuan Proposal'],
                    ['step' => 2, 'desc' => 'Review Proposal'],
                    ['step' => 3, 'desc' => 'Pengumuman Penerimaan']
                ]),
                'rekap_penelitian' => json_encode([]),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
