<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'NAO Developer',
                'email' => 'naodev@iaipibandung.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'dev',
            ],
            [
                'name' => 'Super Administrator KPI',
                'email' => 'superadmin@iaipibandung.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'superadmin',
            ],
            [
                'name' => 'Admin Prodi KPI',
                'email' => 'kpi@iaipibandung.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'admin_prodi',
            ],
            [
                'name' => 'Admin Akademik KPI',
                'email' => 'akademik.kpi@iaipibandung.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'admin_akademik',
            ],
            [
                'name' => 'Admin LPPM KPI',
                'email' => 'lppm@iaipibandung.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'admin_lppm',
            ],
            [
                'name' => 'Humas & Media KPI',
                'email' => 'humas.kpi@iaipibandung.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'editor',
            ]
        ];

        foreach ($users as $user) {
            User::updateOrCreate(['email' => $user['email']], $user);
        }
    }
}
