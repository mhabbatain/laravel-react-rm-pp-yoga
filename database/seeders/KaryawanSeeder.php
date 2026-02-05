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
                'role' => 'kasir',
                'no_telepon' => '081234567890',
                'email' => 'kasir@gmail.com', // Email untuk login
            ],
            [
                'nama' => 'Yoga',
                'role' => 'kasir',
                'no_telepon' => '081234533391',
                'email' => 'yoga@gmail.com', // Email untuk login
            ],
            // Removed other roles as requested: "role nya hanya satu yaitu kasir"
        ];

        foreach ($employees as $employee) {
            $userId = null;
                
            if ($employee['email']) {
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
                    'role' => $employee['role'],
                    'no_telepon' => $employee['no_telepon'],
                    'user_id' => $userId,
                ]
            );
        }
    }
}
