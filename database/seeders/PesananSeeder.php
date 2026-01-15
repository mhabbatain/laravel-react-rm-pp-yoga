<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PesananSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $karyawanIds = DB::table('karyawans')->pluck('id')->toArray();

        $orders = [
            [
                'nomor_pesanan' => 'ORD-2024-001',
                'total' => 148500,
                'waktu' => '2024-01-15 14:30:00',
                'meja' => '1',
                'metode_pembayaran' => 'tunai',
            ],
            [
                'nomor_pesanan' => 'ORD-2024-002',
                'total' => 85000,
                'waktu' => '2024-01-15 15:15:00',
                'meja' => '2',
                'metode_pembayaran' => 'qris',
            ],
            [
                'nomor_pesanan' => 'ORD-2024-003',
                'total' => 125000,
                'waktu' => '2024-01-15 15:45:00',
                'meja' => '3',
                'metode_pembayaran' => 'tunai',
            ],
            [
                'nomor_pesanan' => 'ORD-2024-004',
                'total' => 95000,
                'waktu' => '2024-01-15 16:20:00',
                'meja' => '4',
                'metode_pembayaran' => 'qris',
            ],
            [
                'nomor_pesanan' => 'ORD-2024-005',
                'total' => 75000,
                'waktu' => '2024-01-15 16:50:00',
                'meja' => '5',
                'metode_pembayaran' => 'tunai',
            ],
        ];

        foreach ($orders as $order) {
            DB::table('pesanans')->insert([
                'id_karyawan' => fake()->randomElement($karyawanIds), // acak karyawan
                'nomor_pesanan' => $order['nomor_pesanan'],
                'meja' => $order['meja'],
                'waktu' => Carbon::parse($order['waktu']),
                'total' => $order['total'],
                'metode_pembayaran' => $order['metode_pembayaran'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
