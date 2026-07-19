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

        // Level 1: Direktur
        $direktur = StrukturOrganisasi::create([
            'nama' => 'Dr. H. Taufik Rahman, M.Ag.',
            'jabatan' => 'Direktur Program Pascasarjana',
            'urutan' => '1',
            'foto' => 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop'
        ]);

        // Level 2: Wakil Direktur I
        $wadir1 = StrukturOrganisasi::create([
            'nama' => 'Dr. H. Ahmad Hasanuddin, M.Pd.',
            'jabatan' => 'Wakil Direktur I Bidang Akademik',
            'urutan' => '2A',
            'parent_id' => $direktur->id,
            'foto' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'
        ]);

        // Level 2: Wakil Direktur II
        $wadir2 = StrukturOrganisasi::create([
            'nama' => 'Dr. H. Dudung Abdul Rohman, M.Ag.',
            'jabatan' => 'Wakil Direktur II Bidang Administrasi Umum & Keuangan',
            'urutan' => '2B',
            'parent_id' => $direktur->id,
            'foto' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop'
        ]);

        // Level 3: Bawah Wadir I
        StrukturOrganisasi::create([
            'nama' => 'Dr. H. M. Yamin, M.A.',
            'jabatan' => 'Ketua Program Studi Magister (S2)',
            'urutan' => '3A',
            'parent_id' => $wadir1->id,
            'foto' => 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop'
        ]);

        StrukturOrganisasi::create([
            'nama' => 'Prof. Dr. H. M. Abdurrahman, M.A.',
            'jabatan' => 'Ketua Senat Pascasarjana',
            'urutan' => '3B',
            'parent_id' => $wadir1->id,
            'foto' => 'https://images.unsplash.com/photo-1566492031516-f3e4a5d78ce8?q=80&w=400&auto=format&fit=crop'
        ]);

        // Level 3: Bawah Wadir II
        StrukturOrganisasi::create([
            'nama' => 'Dra. Hj. Siti Maryam, M.Pd.',
            'jabatan' => 'Sekretaris Program Studi',
            'urutan' => '3C',
            'parent_id' => $wadir2->id,
            'foto' => 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'
        ]);
    }
}
