<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KaryawanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = [
            [
                'id' => 1,
                'nama' => 'Ahmad Fauzi',
                'jabatan' => 'kasir',
                'no_telepon' => '081234567890',
                'status' => 'aktif',
            ],
            [
                'id' => 2,
                'nama' => 'Siti Nurhaliza',
                'jabatan' => 'pelayan',
                'no_telepon' => '081234567891',
                'status' => 'aktif',
            ],
            [
                'id' => 3,
                'nama' => 'Budi Hartono',
                'jabatan' => 'koki',
                'no_telepon' => '081234567892',
                'status' => 'aktif',
            ],
            [
                'id' => 4,
                'nama' => 'Rina Wijaya',
                'jabatan' => 'manajer',
                'no_telepon' => '081234567893',
                'status' => 'aktif',
            ],
            [
                'id' => 5,
                'nama' => 'Dedi Susanto',
                'jabatan' => 'pelayan',
                'no_telepon' => '081234567894',
                'status' => 'nonaktif',
            ],
        ];

        DB::table('karyawans')->insert($employees);
    }
}
