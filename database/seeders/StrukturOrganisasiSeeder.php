<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StrukturOrganisasi;

class StrukturOrganisasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Struktur Organisasi Fakultas Dakwah dan Komunikasi IAI Persis Bandung Periode 2023-2027
     */
    public function run(): void
    {
        StrukturOrganisasi::truncate();

        // 1. Pimpinan Tertinggi: Rektor
        $rektor = StrukturOrganisasi::create([
            'nama' => 'Prof. Dr. Jajang A Rohmana, M. Ag',
            'jabatan' => 'Rektor',
            'urutan' => '1',
            'parent_id' => null,
            'foto' => '/images/pejabat/rektor.jpg'
        ]);

        // 1S. Senat Institut (Pendamping Koordinatif Rektor)
        StrukturOrganisasi::create([
            'nama' => 'Senat Institut',
            'jabatan' => 'Senat',
            'urutan' => '1S',
            'parent_id' => $rektor->id,
            'foto' => null
        ]);

        // 2. Wakil Rektor (Jajaran Pimpinan Institut)
        StrukturOrganisasi::create([
            'nama' => 'Dr. Roni Nugraha, M. Ag',
            'jabatan' => 'W. Rektor I Bid. Akademik',
            'urutan' => '2A',
            'parent_id' => $rektor->id,
            'foto' => '/images/pejabat/warek1.jpg'
        ]);

        StrukturOrganisasi::create([
            'nama' => 'Dr. H. Arie Noviana, M.E',
            'jabatan' => 'W. Rektor II Bid. Keuangan',
            'urutan' => '2B',
            'parent_id' => $rektor->id,
            'foto' => '/images/pejabat/warek2.jpg'
        ]);

        StrukturOrganisasi::create([
            'nama' => 'Dr. Nurdin Qusyaeri, M. Si',
            'jabatan' => 'W. Rektor III Bid. Kemahasiswaan',
            'urutan' => '2C',
            'parent_id' => $rektor->id,
            'foto' => '/images/pejabat/warek3.jpg'
        ]);

        StrukturOrganisasi::create([
            'nama' => 'Dr. Lalan Sahlani, M.Ag',
            'jabatan' => 'W. Rektor IV Bid. Kerjasama',
            'urutan' => '2D',
            'parent_id' => $rektor->id,
            'foto' => '/images/pejabat/warek4.jpg'
        ]);

        // 3. Pimpinan Fakultas: Dekan (Turun vertikal ke bawah)
        $dekan = StrukturOrganisasi::create([
            'nama' => 'Hj. Nunung Nurhasanah, M.I.Kom',
            'jabatan' => 'Dekan Fakultas',
            'urutan' => '3',
            'parent_id' => $rektor->id,
            'foto' => '/images/pejabat/dekan.jpg'
        ]);

        // 4. Ketua Program Studi KPI
        $kaprodi = StrukturOrganisasi::create([
            'nama' => 'Hendi Rustandi, M. Sos',
            'jabatan' => 'Ketua Prodi KPI',
            'urutan' => '4',
            'parent_id' => $dekan->id,
            'foto' => '/images/pejabat/kaprodi.jpg'
        ]);

        // 5. Sekretaris Program Studi KPI
        $sekprodi = StrukturOrganisasi::create([
            'nama' => 'Siti Nurjanah, M. Pd',
            'jabatan' => 'Sekretaris Prodi',
            'urutan' => '5',
            'parent_id' => $kaprodi->id,
            'foto' => '/images/pejabat/sekprodi.jpg'
        ]);

        // 6. Dosen & Tenaga Pengajar
        StrukturOrganisasi::create([
            'nama' => 'Dosen & Tenaga Pendidik',
           'jabatan' => 'Dosen',
            'urutan' => '6',
            'parent_id' => $sekprodi->id,
            'foto' => null
        ]);
    }
}
