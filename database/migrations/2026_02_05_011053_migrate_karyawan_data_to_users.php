<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Sync No Telepon dari Karyawan ke User
        $karyawans = \Illuminate\Support\Facades\DB::table('karyawans')->get();
        foreach ($karyawans as $karyawan) {
            if ($karyawan->user_id) {
                \Illuminate\Support\Facades\DB::table('users')
                    ->where('id', $karyawan->user_id)
                    ->update(['no_telepon' => $karyawan->no_telepon]);
                
                // 2. Update Transaksi yang masih pakai id_karyawan agar punya id_user yang benar
                \Illuminate\Support\Facades\DB::table('transaksis')
                    ->where('id_karyawan', $karyawan->id)
                    ->update(['id_user' => $karyawan->user_id]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Tidak perlu rollback data secara eksplisit
    }
};
