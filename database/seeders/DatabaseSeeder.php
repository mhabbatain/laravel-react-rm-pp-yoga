<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'admin',
                'password' => 'admin123',
                'email_verified_at' => now(),
                'role' => 'admin',
            ],
            // ['email' => 'admin@gmail.com'],
            // [
            //     'name' => 'admin',
            //     'password' => 'admin123',
            //     'email_verified_at' => now(),
            //     'role' => 'admin',
            // ]
        );

        $this->call([
            KategoriSeeder::class,
            MenuSeeder::class,
            KaryawanSeeder::class,
            PesananSeeder::class,
            DetailPesananSeeder::class
        ]);
    }
}
