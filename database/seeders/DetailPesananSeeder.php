<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DetailPesananSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('detail_pesanans')->insert([
            [
                'id_pesanan' => 1,
                'id_menu' => 1,
                'jumlah' => 2,
                'subtotal' => 50000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_pesanan' => 1,
                'id_menu' => 3,
                'jumlah' => 1,
                'subtotal' => 20000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_pesanan' => 2,
                'id_menu' => 2,
                'jumlah' => 3,
                'subtotal' => 75000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_pesanan' => 3,
                'id_menu' => 4,
                'jumlah' => 1,
                'subtotal' => 15000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_pesanan' => 3,
                'id_menu' => 5,
                'jumlah' => 2,
                'subtotal' => 30000,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
