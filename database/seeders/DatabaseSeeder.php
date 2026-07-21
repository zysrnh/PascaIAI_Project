<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();

        $this->call([
            RoleSeeder::class,
            FakultasSeeder::class,
            ProgramStudiSeeder::class,
            TentangKampusSeeder::class,
            VisiMisiSeeder::class,
            SambutanPimpinanSeeder::class,
            StrukturOrganisasiSeeder::class,
            JadwalPerkuliahanSeeder::class,
            DosenSeeder::class,
            BeritaSeeder::class,
            KonsultasiPendaftaranSeeder::class,
            AkreditasiSeeder::class,
            KalenderAkademikSeeder::class,
            DokumenInstitusiSeeder::class,
            LppmInformasiHibahSeeder::class,
        ]);
    }
}
