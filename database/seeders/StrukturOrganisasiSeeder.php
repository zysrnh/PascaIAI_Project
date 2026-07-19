<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StrukturOrganisasi;

class StrukturOrganisasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Bersihkan data lama jika ada
        StrukturOrganisasi::truncate();

        $data = [
            [
                'nama' => 'Dr. H. Taufik Rahman, M.Ag.',
                'jabatan' => 'Direktur Program Pascasarjana',
                'urutan' => 1,
                'foto' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop'
            ],
            [
                'nama' => 'Dr. H. Ahmad Hasanuddin, M.Pd.',
                'jabatan' => 'Wakil Direktur I Bidang Akademik',
                'urutan' => 2,
                'foto' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'
            ],
            [
                'nama' => 'Dr. H. Dudung Abdul Rohman, M.Ag.',
                'jabatan' => 'Wakil Direktur II Bidang Administrasi Umum & Keuangan',
                'urutan' => 3,
                'foto' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop'
            ],
            [
                'nama' => 'Dr. H. M. Yamin, M.A.',
                'jabatan' => 'Ketua Program Studi Magister (S2)',
                'urutan' => 4,
                'foto' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop'
            ],
            [
                'nama' => 'Prof. Dr. H. M. Abdurrahman, M.A.',
                'jabatan' => 'Ketua Senat Pascasarjana',
                'urutan' => 5,
                'foto' => 'https://images.unsplash.com/photo-1566492031516-f3e4a5d78ce8?q=80&w=400&auto=format&fit=crop'
            ],
            [
                'nama' => 'Dra. Hj. Siti Maryam, M.Pd.',
                'jabatan' => 'Sekretaris Program Studi',
                'urutan' => 6,
                'foto' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'
            ],
        ];

        foreach ($data as $item) {
            StrukturOrganisasi::create($item);
        }
    }
}
