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
                'name' => 'Super Administrator',
                'email' => 'superadmin@pasca.iaipibandung.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'superadmin',
            ],
            [
                'name' => 'Admin Akademik',
                'email' => 'akademik@pasca.iaipibandung.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'admin_akademik',
            ],
            [
                'name' => 'Admin LPPM',
                'email' => 'lppm@pasca.iaipibandung.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'admin_lppm',
            ],
            [
                'name' => 'Admin Prodi PAI',
                'email' => 'prodi.pai@pasca.iaipibandung.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'admin_prodi',
            ],
            [
                'name' => 'Admin Prodi HK',
                'email' => 'prodi.hk@pasca.iaipibandung.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'admin_prodi',
            ],
            [
                'name' => 'Humas / Editor',
                'email' => 'humas@pasca.iaipibandung.ac.id',
                'password' => Hash::make('password123'),
                'role' => 'editor',
            ]
        ];

        foreach ($users as $user) {
            User::updateOrCreate(['email' => $user['email']], $user);
        }
    }
}
