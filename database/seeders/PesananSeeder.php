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
        $menuItems = DB::table('menus')->get();
        
        // Gunakan tanggal hari ini sebagai referensi
        $now = Carbon::now();
        
        // Definisi range waktu yang bermacam-macam
        // Semua pesanan akan memiliki tanggal relatif terhadap hari ini
        $timeRanges = [
            // Hari ini (5 pesanan)
            ['date' => $now->copy(), 'count' => 5],
            // Kemarin (4 pesanan)
            ['date' => $now->copy()->subDay(), 'count' => 4],
            // 2 hari lalu (3 pesanan)
            ['date' => $now->copy()->subDays(2), 'count' => 3],
            // 3 hari lalu (3 pesanan) - masih minggu ini
            ['date' => $now->copy()->subDays(3), 'count' => 3],
            // 5 hari lalu (3 pesanan)
            ['date' => $now->copy()->subDays(5), 'count' => 3],
            // 10 hari lalu (3 pesanan) - sekitar minggu lalu/2 minggu lalu
            ['date' => $now->copy()->subDays(10), 'count' => 3],
            // 20 hari lalu (3 pesanan) - masih bulan ini
            ['date' => $now->copy()->subDays(20), 'count' => 3],
            // 40 hari lalu (3 pesanan) - bulan lalu
            ['date' => $now->copy()->subDays(40), 'count' => 3],
            // 90 hari lalu (3 pesanan) - 3 bulan lalu, masih tahun ini
            ['date' => $now->copy()->subDays(90), 'count' => 3],
            // 200 hari lalu (3 pesanan) - sekitar 6-7 bulan lalu, masih tahun ini
            ['date' => $now->copy()->subDays(200), 'count' => 3],
            // 400 hari lalu (2 pesanan) - tahun lalu
            ['date' => $now->copy()->subDays(400), 'count' => 2],
            // 800 hari lalu (2 pesanan) - 2 tahun lalu
            ['date' => $now->copy()->subDays(800), 'count' => 2],
        ];

        $orderNumber = 1;
        $pesananId = 1;

        foreach ($timeRanges as $range) {
            $baseDate = $range['date'];
            
            for ($i = 0; $i < $range['count']; $i++) {
                // Variasi jam dalam sehari
                $orderDate = $baseDate->copy()->setTime(
                    rand(10, 21), // jam 10 pagi - 9 malam
                    rand(0, 59),  // menit acak
                    rand(0, 59)   // detik acak
                );
                
                // Pilih 1-4 menu acak untuk pesanan ini
                $selectedMenus = $menuItems->random(rand(1, min(4, $menuItems->count())));
                $total = 0;
                $details = [];
                
                foreach ($selectedMenus as $menu) {
                    $jumlah = rand(1, 3);
                    $subtotal = $menu->harga * $jumlah;
                    $total += $subtotal;
                    
                    $details[] = [
                        'id_pesanan' => $pesananId,
                        'id_menu' => $menu->id,
                        'jumlah' => $jumlah,
                        'subtotal' => $subtotal,
                        'created_at' => $orderDate,
                        'updated_at' => $orderDate,
                    ];
                }
                
                // Insert pesanan
                DB::table('pesanans')->insert([
                    'id_karyawan' => fake()->randomElement($karyawanIds),
                    'nomor_pesanan' => 'ORD-' . $orderDate->format('Ymd') . '-' . str_pad($orderNumber, 3, '0', STR_PAD_LEFT),
                    'meja' => (string) rand(1, 7),
                    'waktu' => $orderDate,
                    'total' => $total,
                    'metode_pembayaran' => fake()->randomElement(['tunai', 'qris']),
                    'created_at' => $orderDate,
                    'updated_at' => $orderDate,
                ]);
                
                // Insert detail pesanan
                DB::table('detail_pesanans')->insert($details);
                
                $orderNumber++;
                $pesananId++;
            }
        }
    }
}
