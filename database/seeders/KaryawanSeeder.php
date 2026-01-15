<?php

namespace Database\Seeders;

use App\Models\Karyawan;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class KaryawanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = [
            [
                'nama' => 'Ahmad Fauzi',
                'jabatan' => 'kasir',
                'no_telepon' => '081234567890',
                'email' => 'kasir@gmail.com', // Email untuk login
            ],
            [
                'nama' => 'Siti Nurhaliza',
                'jabatan' => 'pelayan',
                'no_telepon' => '081234567891',
                'email' => null,
            ],
            [
                'nama' => 'Budi Hartono',
                'jabatan' => 'koki',
                'no_telepon' => '081234567892',
                'email' => null,
            ],
            [
                'nama' => 'Rina Wijaya',
                'jabatan' => 'manajer',
                'no_telepon' => '081234567893',
                'email' => null,
            ],
            [
                'nama' => 'Dedi Susanto',
                'jabatan' => 'pelayan',
                'no_telepon' => '081234567894',
                'email' => null,
            ],
        ];

        foreach ($employees as $employee) {
            $userId = null;
            
            // Jika karyawan adalah kasir, buat user untuk login
            if ($employee['jabatan'] === 'kasir' && $employee['email']) {
                $user = User::firstOrCreate(
                    ['email' => $employee['email']],
                    [
                        'name' => $employee['nama'],
                        'password' => Hash::make('kasir123'), // Password default
                        'email_verified_at' => now(),
                        'role' => 'kasir',
                    ]
                );
                $userId = $user->id;
            }
            
            Karyawan::firstOrCreate(
                ['no_telepon' => $employee['no_telepon']],
                [
                    'nama' => $employee['nama'],
                    'jabatan' => $employee['jabatan'],
                    'no_telepon' => $employee['no_telepon'],
                    'user_id' => $userId,
                ]
            );
        }
    }
}
