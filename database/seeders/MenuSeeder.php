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
            // ==================
            //      MAKANAN
            // ==================
            [
                'nama_menu' => 'Ayam Goreng',
                'harga' => 20000,
                'stok' => 15,
                'gambar' => 'menu-images/ayam-goreng.jpg',
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Ayam Kampung Goreng',
                'harga' => 28000,
                'stok' => 10,
                'gambar' => 'menu-images/ayam-kampung-goreng.jpg',
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Ayam Bakar',
                'harga' => 22000,
                'stok' => 15,
                'gambar' => 'menu-images/ayam-bakar.jpg',
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Ayam Gulai',
                'harga' => 23000,
                'stok' => 12,
                'gambar' => 'menu-images/ayam-gulai.jpg',
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Ayam Pop',
                'harga' => 24000,
                'stok' => 10,
                'gambar' => 'menu-images/ayam-pop.avif', // Perhatikan ekstensi
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Ayam Rendang',
                'harga' => 25000,
                'stok' => 10,
                'gambar' => 'menu-images/ayam-rendang.jpg',
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Ikan Nila Goreng',
                'harga' => 18000,
                'stok' => 15,
                'gambar' => 'menu-images/ikan-nila-goreng.jpeg', // Perhatikan ekstensi
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Ikan Lele Goreng',
                'harga' => 15000,
                'stok' => 20,
                'gambar' => 'menu-images/ikan-lele-goreng.webp', // Perhatikan ekstensi
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Ikan Patin Goreng',
                'harga' => 17000,
                'stok' => 15,
                'gambar' => 'menu-images/ikan-patin-goreng.jpg',
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Ikan Tongkol Goreng',
                'harga' => 16000,
                'stok' => 15,
                'gambar' => 'menu-images/ikan-tongkol-goreng.webp', // Perhatikan ekstensi
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Ikan Nila Bakar',
                'harga' => 20000,
                'stok' => 12,
                'gambar' => 'menu-images/ikan-nila-bakar.webp', // Perhatikan ekstensi
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Ikan Nila Gulai',
                'harga' => 21000,
                'stok' => 10,
                'gambar' => 'menu-images/ikan-nila-gulai.jpg',
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Ikan Patin Gulai',
                'harga' => 19000,
                'stok' => 10,
                'gambar' => 'menu-images/ikan-patin-gulai.jpg',
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Rendang', // Tidak ada gambar spesifik, mungkin ayam-rendang.jpg?
                'harga' => 26000,
                'stok' => 8,
                'gambar' => 'menu-images/ayam-rendang.jpg', // Gunakan gambar ayam rendang
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Gulai Tunjang',
                'harga' => 22000,
                'stok' => 7,
                'gambar' => 'menu-images/gulai-tunjang.jpg',
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Asam Padeh', // Tidak tahu ini ikan atau daging
                'harga' => 20000,
                'stok' => 8,
                'gambar' => 'menu-images/asam-padeh.jpg',
                'id_kategori' => $kategoris['makanan'],
            ],
            [
                'nama_menu' => 'Telur Dadar',
                'harga' => 7000,
                'stok' => 20,
                'gambar' => 'menu-images/telur-dadar.jpg',
                'id_kategori' => $kategoris['makanan'], // Atau Tambahan? Sesuaikan.
            ],
            [
                'nama_menu' => 'Mie Indomie', // Goreng? Rebus?
                'harga' => 10000,
                'stok' => 20,
                'gambar' => 'menu-images/mie-indomie.jpg', // Perhatikan ekstensi
                'id_kategori' => $kategoris['makanan'],
            ],

            // ==================
            //      MINUMAN
            // ==================
            [
                'nama_menu' => 'Es Teh', // Es Teh Manis?
                'harga' => 5000,
                'stok' => 30,
                'gambar' => 'menu-images/es-teh.jpg',
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Es Jeruk',
                'harga' => 7000,
                'stok' => 25,
                'gambar' => 'menu-images/es-jeruk.jpg',
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Es Sirup',
                'harga' => 6000,
                'stok' => 20,
                'gambar' => 'menu-images/es-sirup.jpg',
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Teh Hangat',
                'harga' => 4000,
                'stok' => 30,
                'gambar' => 'menu-images/teh-hangat.jpeg', // Perhatikan ekstensi
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Jeruk Hangat',
                'harga' => 6000,
                'stok' => 25,
                'gambar' => 'menu-images/jeruk-hangat.jpg',
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Air Mineral',
                'harga' => 4000,
                'stok' => 40,
                'gambar' => 'menu-images/air-mineral.jpeg', // Perhatikan ekstensi
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Sprite',
                'harga' => 6000,
                'stok' => 20,
                'gambar' => 'menu-images/sprite.jpg',
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Teh Botol Sosro',
                'harga' => 5000,
                'stok' => 25,
                'gambar' => 'menu-images/teh-botol-sosro.webp', // Perhatikan ekstensi
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Kuku Bima Susu',
                'harga' => 7000,
                'stok' => 15,
                'gambar' => 'menu-images/kuku-bima-susu.jpg',
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Kopi Hitam',
                'harga' => 8000,
                'stok' => 20,
                'gambar' => 'menu-images/kopi-hitam.jpg',
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Kopi Luwak',
                'harga' => 15000,
                'stok' => 10,
                'gambar' => 'menu-images/kopi-luwak.webp', // Perhatikan ekstensi
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Kopi Susu',
                'harga' => 10000,
                'stok' => 20,
                'gambar' => 'menu-images/kopi-susu.jpg',
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Teh Susu',
                'harga' => 7000,
                'stok' => 15,
                'gambar' => 'menu-images/teh-susu.jpg',
                'id_kategori' => $kategoris['minuman'],
            ],
            [
                'nama_menu' => 'Teh Talua',
                'harga' => 8000,
                'stok' => 10,
                'gambar' => 'menu-images/teh-talua.jpg',
                'id_kategori' => $kategoris['minuman'],
            ],

            // ==================
            //     TAMBAHAN
            // ==================
            [
                'nama_menu' => 'Nasi', // Putih?
                'harga' => 5000,
                'stok' => 100,
                'gambar' => 'menu-images/nasi.webp', // Perhatikan ekstensi
                'id_kategori' => $kategoris['tambahan'],
            ],
            [
                'nama_menu' => 'Sambal',
                'harga' => 2000,
                'stok' => 50,
                'gambar' => 'menu-images/sambal.jpeg', // Perhatikan ekstensi
                'id_kategori' => $kategoris['tambahan'],
            ],
            [
                'nama_menu' => 'Telur Asin',
                'harga' => 4000,
                'stok' => 30,
                'gambar' => 'menu-images/telur-asin.jpeg', // Perhatikan ekstensi
                'id_kategori' => $kategoris['tambahan'],
            ],
            [
                'nama_menu' => 'Kerupuk',
                'harga' => 2000,
                'stok' => 50,
                'gambar' => 'menu-images/kerupuk.jpg',
                'id_kategori' => $kategoris['tambahan'],
            ],
            [
                'nama_menu' => 'Timun',
                'harga' => 1000,
                'stok' => 40,
                'gambar' => 'menu-images/timun.jpg',
                'id_kategori' => $kategoris['tambahan'],
            ],
            [
                'nama_menu' => 'Kol Goreng',
                'harga' => 5000,
                'stok' => 15,
                'gambar' => 'menu-images/kol-goreng.jpg',
                'id_kategori' => $kategoris['tambahan'],
            ],
            [
                'nama_menu' => 'Tempe Goreng',
                'harga' => 3000,
                'stok' => 30,
                'gambar' => 'menu-images/tempe-goreng.webp', // Perhatikan ekstensi
                'id_kategori' => $kategoris['tambahan'],
            ],
            [
                'nama_menu' => 'Tahu Goreng',
                'harga' => 3000,
                'stok' => 30,
                'gambar' => 'menu-images/tahu.jpg', // Menggunakan tahu.jpg
                'id_kategori' => $kategoris['tambahan'],
            ],
        ];

        foreach ($menus as $menu) {
            Menu::updateOrCreate(
                ['nama_menu' => $menu['nama_menu']], // Cari berdasarkan nama
                $menu // Update atau create dengan data ini
            );
        }
    }
}
