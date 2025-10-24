<?php

namespace Database\Seeders;

use App\Models\Kategori;
use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pastikan kategori sudah ada
        $kategoris = [
            'makanan' => Kategori::firstWhere('nama', 'Makanan')->id ?? Kategori::create(['nama' => 'Makanan'])->id,
            'minuman' => Kategori::firstWhere('nama', 'Minuman')->id ?? Kategori::create(['nama' => 'Minuman'])->id,
            'tambahan' => Kategori::firstWhere('nama', 'Tambahan')->id ?? Kategori::create(['nama' => 'Tambahan'])->id,
        ];

        $menus = [
            // Makanan
            [
                'nama_menu' => 'Nasi Goreng Special',
                'harga' => 25000,
                'gambar' => '/menu/nasi-goreng.jpg',
                'stok' => 12,
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Mie Goreng',
                'harga' => 20000,
                'gambar' => '/menu/mie-goreng.jpg',
                'stok' => 10,
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Ayam Geprek',
                'harga' => 22000,
                'gambar' => '/menu/ayam-geprek.jpg',
                'stok' => 8,
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Soto Ayam',
                'harga' => 18000,
                'gambar' => '/menu/soto-ayam.jpg',
                'stok' => 2,
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Nasi Uduk',
                'harga' => 15000,
                'gambar' => '/menu/nasi-uduk.jpg',
                'stok' => 3,
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Gado-Gado',
                'harga' => 17000,
                'gambar' => '/menu/gado-gado.jpg',
                'stok' => 4,
                'id_kategori' => $kategoris['makanan'],
            ],

            // Minuman
            [
                'nama_menu' => 'Es Teh Manis',
                'harga' => 5000,
                'gambar' => '/menu/es-teh.jpg',
                'stok' => 5,
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Es Jeruk',
                'harga' => 7000,
                'gambar' => '/menu/es-jeruk.jpg',
                'stok' => 10,
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Es Kelapa Muda',
                'harga' => 12000,
                'gambar' => '/menu/es-kelapa.jpg',
                'stok' => 10,
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Jus Alpukat',
                'harga' => 15000,
                'gambar' => '/menu/jus-alpukat.jpg',
                'stok' => 10,
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Kopi Hitam',
                'harga' => 8000,
                'gambar' => '/menu/kopi-hitam.jpg',
                'stok' => 10,
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Teh Poci',
                'harga' => 6000,
                'gambar' => '/menu/teh-poci.jpg',
                'stok' => 10,
                'id_kategori' => $kategoris['minuman'],
            ],

            // Tambahan
            [
                'nama_menu' => 'Kerupuk',
                'harga' => 2000,
                'gambar' => '/menu/kerupuk.jpg',
                'stok' => 10,
                'id_kategori' => $kategoris['tambahan'],
            ],
            [
                'nama_menu' => 'Telur Mata Sapi',
                'harga' => 5000,
                'gambar' => '/menu/telur.jpg',
                'stok' => 10,
                'id_kategori' => $kategoris['tambahan'],
            ],
            [
                'nama_menu' => 'Tempe Goreng',
                'harga' => 3000,
                'gambar' => '/menu/tempe.jpg',
                'stok' => 10,
                'id_kategori' => $kategoris['tambahan'],
            ],
            [
                'nama_menu' => 'Tahu Goreng',
                'harga' => 3000,
                'gambar' => '/menu/tahu.jpg',
                'stok' => 10,
                'id_kategori' => $kategoris['tambahan'],
            ],
        ];

        foreach ($menus as $menu) {
            Menu::updateOrCreate(
                ['nama_menu' => $menu['nama_menu']],
                $menu
            );
        }
    }
}
